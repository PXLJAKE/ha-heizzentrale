"""Tests for the balancing assistant inside Home Assistant."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

from freezegun.api import FrozenDateTimeFactory
from homeassistant.config_entries import ConfigSubentryData
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
)
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.heizzentrale.const import DOMAIN

C = {"unit_of_measurement": "°C", "device_class": "temperature"}
SENSOR = "sensor.heizung_balancing"


def _circuit(key: str) -> ConfigSubentryData:
    return ConfigSubentryData(
        subentry_type="circuit",
        title=key.upper(),
        unique_id=None,
        data={
            CONF_NAME: key.upper(),
            "system_type": "two_pipe",
            "flow_entity": f"sensor.{key}_flow",
            "return_entity": f"sensor.{key}_return",
            "valve_type": "nc",
        },
    )


def _set(hass: HomeAssistant, key: str, flow: float, ret: float) -> None:
    hass.states.async_set(f"sensor.{key}_flow", str(flow), C)
    hass.states.async_set(f"sensor.{key}_return", str(ret), C)


async def _setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Heizung",
        data={CONF_NAME: "Heizung"},
        subentries_data=[_circuit("eg"), _circuit("og")],
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def _run(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory, minutes: int
) -> None:
    for _ in range(minutes):
        freezer.tick(timedelta(minutes=1))
        async_fire_time_changed(hass)
        await hass.async_block_till_done()


async def _ws(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator, **message: Any
) -> dict[str, Any]:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(message)
    return await client.receive_json()


async def test_recommendation_after_settling(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """The sensor first measures, then recommends the circuit to throttle."""
    _set(hass, "eg", 55, 50)  # spread 5 K: too much flow
    _set(hass, "og", 55, 42)  # spread 13 K
    await _setup(hass)
    assert hass.states.get(SENSOR).state == "settling"

    await _run(hass, freezer, 21)
    state = hass.states.get(SENSOR)
    assert state.state == "adjust"
    assert state.attributes["target"] == 9.0
    assert state.attributes["recommendation"] == {
        "circuit": "EG",
        "close_by_turns": 0.5,
    }
    assert state.attributes["circuits"]["EG"]["verdict"] == "too_much_flow"

    _set(hass, "eg", 55, 46)  # throttled: spread 9 K
    await _run(hass, freezer, 31)
    assert hass.states.get(SENSOR).state == "balanced"


async def test_calibration_changes_spread_and_survives_reload(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """Offsets are applied to the spread and stored on disk."""
    _set(hass, "eg", 40.0, 40.6)
    _set(hass, "og", 39.8, 40.0)
    entry = await _setup(hass)
    assert hass.states.get("sensor.eg_spread").state == "-0.6"

    response = await _ws(
        hass,
        hass_ws_client,
        type="heizzentrale/balancing/calibrate",
        entry_id=entry.entry_id,
    )
    assert response["success"]
    offsets = response["result"]["offsets"]
    assert offsets["sensor.eg_return"] == -0.5
    assert hass.states.get("sensor.eg_spread").state == "0.0"

    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.runtime_data.manager.offsets == offsets
    assert hass.states.get("sensor.eg_spread").state == "0.0"

    response = await _ws(
        hass,
        hass_ws_client,
        type="heizzentrale/balancing/clear_calibration",
        entry_id=entry.entry_id,
    )
    assert response["result"]["offsets"] == {}
    assert hass.states.get("sensor.eg_spread").state == "-0.6"


async def test_calibration_refused_when_not_equalised(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """A real temperature difference is never calibrated away."""
    _set(hass, "eg", 55, 45)
    _set(hass, "og", 55, 44)
    entry = await _setup(hass)
    response = await _ws(
        hass,
        hass_ws_client,
        type="heizzentrale/balancing/calibrate",
        entry_id=entry.entry_id,
    )
    assert not response["success"]
    assert response["error"]["code"] == "not_equalised"
    assert entry.runtime_data.manager.offsets == {}


async def test_log_adjustment_restarts_measurement(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    freezer: FrozenDateTimeFactory,
) -> None:
    """Logging a valve change stores it and starts a fresh measurement."""
    _set(hass, "eg", 55, 50)
    _set(hass, "og", 55, 42)
    entry = await _setup(hass)
    await _run(hass, freezer, 21)
    assert hass.states.get(SENSOR).state == "adjust"
    circuit_id = next(iter(entry.subentries))

    response = await _ws(
        hass,
        hass_ws_client,
        type="heizzentrale/balancing/log_adjustment",
        entry_id=entry.entry_id,
        circuit=circuit_id,
        turns=0.5,
    )
    assert response["success"]
    (item,) = response["result"]["log"]
    assert item["name"] == "EG"
    assert item["turns"] == 0.5
    assert item["spreads"][circuit_id] == 5.0
    assert response["result"]["state"] == "settling"
    assert hass.states.get(SENSOR).state == "settling"


async def test_unknown_plant_and_circuit(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """Wrong ids give clean errors."""
    entry = await _setup(hass)
    response = await _ws(
        hass, hass_ws_client, type="heizzentrale/balancing/status", entry_id="nope"
    )
    assert response["error"]["code"] == "not_found"
    response = await _ws(
        hass,
        hass_ws_client,
        type="heizzentrale/balancing/log_adjustment",
        entry_id=entry.entry_id,
        circuit="nope",
        turns=1,
    )
    assert response["error"]["code"] == "not_found"


async def test_storage_removed_with_plant(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator, hass_storage: dict
) -> None:
    """Removing the plant removes its stored data."""
    _set(hass, "eg", 40.0, 40.2)
    _set(hass, "og", 40.0, 40.0)
    entry = await _setup(hass)
    await _ws(
        hass,
        hass_ws_client,
        type="heizzentrale/balancing/calibrate",
        entry_id=entry.entry_id,
    )
    key = f"heizzentrale.{entry.entry_id}"
    assert key in hass_storage
    assert await hass.config_entries.async_remove(entry.entry_id)
    await hass.async_block_till_done()
    assert key not in hass_storage
