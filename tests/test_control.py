"""Tests for schedules and absence rules applied to thermostats."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

import pytest
from freezegun.api import FrozenDateTimeFactory
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
)
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from .test_parts import _entry, _setup

ROOM = {"type": "room", "data": {CONF_NAME: "Bad", "climate_entity": "climate.bad"}}
ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]
ATTRS = {"hvac_modes": ["off", "heat"], "preset_modes": ["comfort", "eco"]}


@pytest.fixture
def calls(hass: HomeAssistant) -> list[tuple[str, dict[str, Any]]]:
    """Fake climate services that record calls and update the state."""
    made: list[tuple[str, dict[str, Any]]] = []

    async def handle(call: ServiceCall) -> None:
        data = dict(call.data)
        made.append((call.service, data))
        entity_id = data["entity_id"]
        state = hass.states.get(entity_id)
        attrs = dict(state.attributes) if state else dict(ATTRS)
        value = state.state if state else "heat"
        if call.service == "set_hvac_mode":
            value = data["hvac_mode"]
        elif call.service == "set_preset_mode":
            attrs["preset_mode"] = data["preset_mode"]
        else:
            attrs["temperature"] = data["temperature"]
        hass.states.async_set(entity_id, value, attrs)

    for service in ("set_hvac_mode", "set_preset_mode", "set_temperature"):
        hass.services.async_register("climate", service, handle)
    return made


async def _plant(hass: HomeAssistant) -> tuple[MockConfigEntry, str]:
    hass.states.async_set("climate.bad", "heat", {**ATTRS, "preset_mode": "comfort"})
    entry = _entry(ROOM)
    await _setup(hass, entry)
    return entry, next(iter(entry.subentries))


def _schedule(room_id: str, action: str) -> dict[str, Any]:
    return {
        "id": "s1",
        "name": "Immer",
        "rooms": [room_id],
        "floors": [],
        "points": [{"days": ALL_DAYS, "time": "00:00", "action": action}],
    }


async def test_observing_reports_without_switching(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    calls: list[tuple[str, dict[str, Any]]],
) -> None:
    entry, room_id = await _plant(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {
            "type": "heizzentrale/control/save",
            "entry_id": entry.entry_id,
            "schedules": [_schedule(room_id, "preset:eco")],
        }
    )
    result = (await client.receive_json())["result"]
    assert result["enabled"] is False
    assert result["rooms"][room_id] == {
        "action": "preset:eco",
        "source": "schedule",
        "name": "Immer",
        "applied": False,
    }
    assert calls == []

    await client.send_json_auto_id(
        {
            "type": "heizzentrale/control/save",
            "entry_id": entry.entry_id,
            "enabled": True,
        }
    )
    result = (await client.receive_json())["result"]
    assert result["rooms"][room_id]["applied"] is True
    assert calls == [
        ("set_preset_mode", {"entity_id": "climate.bad", "preset_mode": "eco"})
    ]


async def test_manual_change_stays_until_next_switch_point(
    hass: HomeAssistant, calls: list[tuple[str, dict[str, Any]]]
) -> None:
    entry, room_id = await _plant(hass)
    control = entry.runtime_data.manager.control
    await control.async_save(True, [_schedule(room_id, "off")], None)
    assert calls == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "off"})
    ]

    hass.states.async_set("climate.bad", "heat", ATTRS)
    await control.async_run()
    assert len(calls) == 1


async def test_invalid_input_is_rejected(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    entry, room_id = await _plant(hass)
    client = await hass_ws_client(hass)
    bad = _schedule(room_id, "preset:eco")
    bad["points"][0]["time"] = "25:00"
    await client.send_json_auto_id(
        {
            "type": "heizzentrale/control/save",
            "entry_id": entry.entry_id,
            "schedules": [bad],
        }
    )
    assert (await client.receive_json())["success"] is False


async def test_absence_rule_switches_off_and_restores(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    calls: list[tuple[str, dict[str, Any]]],
) -> None:
    hass.states.async_set("person.jake", "home")
    entry, room_id = await _plant(hass)
    control = entry.runtime_data.manager.control
    rule = {
        "id": "r1",
        "name": "Jake weg",
        "entities": ["person.jake"],
        "delay_min": 10,
        "rooms": [room_id],
        "floors": [],
        "action": "off",
    }
    await control.async_save(True, None, [rule])
    assert calls == []

    hass.states.async_set("person.jake", "not_home")
    await hass.async_block_till_done()
    assert calls == []  # not away for long enough yet

    freezer.tick(timedelta(minutes=11))
    async_fire_time_changed(hass, dt_util.utcnow())
    await hass.async_block_till_done(wait_background_tasks=True)
    assert calls == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "off"})
    ]
    assert control.payload()["active_rules"] == ["r1"]

    hass.states.async_set("person.jake", "home")
    await hass.async_block_till_done(wait_background_tasks=True)
    assert calls[1:] == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "heat"}),
        ("set_preset_mode", {"entity_id": "climate.bad", "preset_mode": "comfort"}),
    ]
    assert control.payload()["active_rules"] == []


async def test_settings_survive_reload(hass: HomeAssistant) -> None:
    entry, room_id = await _plant(hass)
    control = entry.runtime_data.manager.control
    await control.async_save(None, [_schedule(room_id, "preset:eco")], None)
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.runtime_data.manager.control.schedules[0]["name"] == "Immer"


async def test_stove_turns_rooms_down_while_burning(
    hass: HomeAssistant, calls: list[tuple[str, dict[str, Any]]]
) -> None:
    hass.states.async_set("sensor.ofen", "22", {"unit_of_measurement": "°C"})
    entry, room_id = await _plant(hass)
    control = entry.runtime_data.manager.control
    stove = {
        "id": "o1",
        "name": "Schwedenofen",
        "sensor": "sensor.ofen",
        "on_above": 40.0,
        "room": room_id,
        "actions": {room_id: "off"},
    }
    await control.async_save(True, None, None, [stove])
    assert calls == []

    hass.states.async_set("sensor.ofen", "85", {"unit_of_measurement": "°C"})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert calls == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "off"})
    ]
    assert control.payload()["burning"] == ["o1"]
    assert control.payload()["rooms"][room_id]["source"] == "stove"

    # Slightly below the threshold it still counts as burning.
    hass.states.async_set("sensor.ofen", "37", {"unit_of_measurement": "°C"})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert len(calls) == 1

    hass.states.async_set("sensor.ofen", "30", {"unit_of_measurement": "°C"})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert calls[1:] == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "heat"}),
        ("set_preset_mode", {"entity_id": "climate.bad", "preset_mode": "comfort"}),
    ]
    assert control.payload()["burning"] == []
