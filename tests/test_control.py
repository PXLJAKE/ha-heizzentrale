"""Tests for schedules and absence rules applied to thermostats."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

import pytest
from freezegun.api import FrozenDateTimeFactory
from homeassistant.config_entries import ConfigSubentry
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


async def test_advice_for_strands_and_pump(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "hvac_action": "idle", "temperature": 20}
    )
    hass.states.async_set("switch.eg_valve", "on")
    hass.states.async_set("select.hk", "1_auto")
    entry = _entry(
        {
            "type": "pump_group",
            "data": {
                CONF_NAME: "Pumpe",
                "control_entity": "select.hk",
                "control_off_option": "0_aus",
                "control_on_option": "1_auto",
            },
        },
        {
            "type": "circuit",
            "data": {
                CONF_NAME: "EG",
                "system_type": "one_pipe",
                "valve_entity": "switch.eg_valve",
                "valve_type": "nc",
            },
        },
    )
    await _setup(hass, entry)
    circuit_id = list(entry.subentries)[1]
    hass.config_entries.async_add_subentry(
        entry,
        ConfigSubentry(
            data={
                CONF_NAME: "Bad",
                "climate_entity": "climate.bad",
                "circuit": circuit_id,
            },
            subentry_type="room",
            title="Bad",
            unique_id=None,
        ),
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    control = entry.runtime_data.manager.control
    await control.async_run()
    advice = control.payload()["advice"]
    assert advice["circuits"][circuit_id]["reason"] == "waiting"
    assert advice["circuits"][circuit_id]["action"] is None

    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    advice = control.payload()["advice"]
    assert advice["circuits"][circuit_id]["action"] == "close"
    assert next(iter(advice["pump_groups"].values()))["action"] == "off"

    # A mode set by hand on the heating circuit is left alone.
    hass.states.async_set("select.hk", "2_heizen")
    await control.async_run()
    group = next(iter(control.payload()["advice"]["pump_groups"].values()))
    assert (group["reason"], group["action"]) == ("manual", None)

    # The room asks for heat again: the strand would open at once.
    hass.states.async_set("switch.eg_valve", "off")
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "hvac_action": "heating", "temperature": 22}
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    advice = control.payload()["advice"]["circuits"][circuit_id]
    assert (advice["action"], advice["rooms"]) == ("open", ["Bad"])


def _fake_switches(hass: HomeAssistant) -> list[tuple[str, str, str]]:
    """Fake switch and select services that record calls and set the state.

    Registered after the plant is set up, because loading the select platform
    registers the real ``select.select_option``.
    """
    made: list[tuple[str, str, str]] = []

    async def handle(call: ServiceCall) -> None:
        entity_ids = call.data["entity_id"]
        for entity_id in [entity_ids] if isinstance(entity_ids, str) else entity_ids:
            if call.service == "select_option":
                value = call.data["option"]
            else:
                value = "on" if call.service == "turn_on" else "off"
            made.append((call.service, entity_id, value))
            hass.states.async_set(entity_id, value)

    hass.services.async_register("homeassistant", "turn_on", handle)
    hass.services.async_register("homeassistant", "turn_off", handle)
    hass.services.async_register("select", "select_option", handle)
    return made


async def _switching_plant(hass: HomeAssistant) -> tuple[MockConfigEntry, Any]:
    hass.states.async_set(
        "climate.bad",
        "heat",
        {**ATTRS, "hvac_action": "idle", "temperature": 20, "current_temperature": 21},
    )
    hass.states.async_set("switch.eg_valve", "on")
    hass.states.async_set("select.hk", "1_auto")
    entry = _entry(
        {
            "type": "pump_group",
            "data": {
                CONF_NAME: "Pumpe",
                "control_entity": "select.hk",
                "control_off_option": "0_aus",
                "control_on_option": "1_auto",
            },
        },
        {
            "type": "circuit",
            "data": {
                CONF_NAME: "EG",
                "system_type": "one_pipe",
                "valve_entity": "switch.eg_valve",
                "valve_type": "nc",
            },
        },
    )
    await _setup(hass, entry)
    group_id, circuit_id = list(entry.subentries)
    hass.config_entries.async_add_subentry(
        entry,
        ConfigSubentry(
            data={
                CONF_NAME: "Bad",
                "climate_entity": "climate.bad",
                "window_entity": ["binary_sensor.bad_fenster"],
                "circuit": circuit_id,
                "pump_group": group_id,
            },
            subentry_type="room",
            title="Bad",
            unique_id=None,
        ),
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    return entry, entry.runtime_data.manager.control


async def _set_mode(hass: HomeAssistant, entry: MockConfigEntry, mode: str) -> None:
    from custom_components.heizzentrale.const import OperatingMode

    entry.runtime_data.mode = OperatingMode(mode)
    entry.runtime_data.mode_restored = True
    await entry.runtime_data.manager.control.async_run()


async def test_observe_mode_never_switches_strands(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    _, control = await _switching_plant(hass)
    switches = _fake_switches(hass)
    await control.async_run()
    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    assert control.payload()["switching"] is False
    assert switches == []


async def test_active_mode_closes_and_reopens(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    entry, control = await _switching_plant(hass)
    switches = _fake_switches(hass)
    await _set_mode(hass, entry, "active")
    assert switches == []  # still inside the ten minutes of waiting

    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    # The pump stops before its strand closes.
    assert switches == [
        ("select_option", "select.hk", "0_aus"),
        ("turn_off", "switch.eg_valve", "off"),
    ]
    switches.clear()

    # Someone opens the strand by hand: it is not closed a second time.
    hass.states.async_set("switch.eg_valve", "on")
    await control.async_run()
    assert switches == []
    hass.states.async_set("switch.eg_valve", "off")

    # The room asks for heat: strand first, then the pump.
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "hvac_action": "heating", "temperature": 22}
    )
    await control.async_run()
    assert switches == [
        ("turn_on", "switch.eg_valve", "on"),
        ("select_option", "select.hk", "1_auto"),
    ]
    assert control.payload()["switched"] == {}


async def test_heating_switched_off_by_hand_stays_off(
    hass: HomeAssistant,
) -> None:
    entry, _ = await _switching_plant(hass)
    switches = _fake_switches(hass)
    hass.states.async_set("select.hk", "0_aus")
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "hvac_action": "heating", "temperature": 22}
    )
    await _set_mode(hass, entry, "active")
    assert switches == []


async def test_leaving_active_mode_hands_everything_back(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    entry, control = await _switching_plant(hass)
    switches = _fake_switches(hass)
    await _set_mode(hass, entry, "active")
    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    switches.clear()
    await _set_mode(hass, entry, "observe")
    assert sorted(switches) == [
        ("select_option", "select.hk", "1_auto"),
        ("turn_on", "switch.eg_valve", "on"),
    ]
    assert control.payload()["switched"] == {}


async def test_nothing_is_touched_before_the_mode_is_restored(
    hass: HomeAssistant,
) -> None:
    entry, control = await _switching_plant(hass)
    switches = _fake_switches(hass)
    control._switched = {list(entry.subentries)[1]: "close"}
    entry.runtime_data.mode_restored = False
    await control.async_run()
    assert switches == []
    assert control.payload()["switched"] != {}


async def test_cold_room_keeps_its_strand_open(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    entry, control = await _switching_plant(hass)
    switches = _fake_switches(hass)
    hass.states.async_set("climate.bad", "off", {**ATTRS, "current_temperature": 6})
    await _set_mode(hass, entry, "active")
    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    assert switches == []


async def test_open_window_switches_room_off_and_back(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    calls: list[tuple[str, dict[str, Any]]],
) -> None:
    entry, control = await _switching_plant(hass)
    room_id = list(entry.subentries)[2]
    await control.async_save(enabled=True)
    hass.states.async_set("binary_sensor.bad_fenster", "on")
    await control.async_run()
    assert calls == []  # a short airing changes nothing

    freezer.tick(timedelta(minutes=3))
    await control.async_run()
    assert calls == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "off"})
    ]
    assert control.payload()["rooms"][room_id]["source"] == "window"

    hass.states.async_set("binary_sensor.bad_fenster", "off")
    await control.async_run()
    assert calls[-1] == (
        "set_hvac_mode",
        {"entity_id": "climate.bad", "hvac_mode": "heat"},
    )
    assert room_id not in control.payload()["rooms"]

    # Switched off in the settings: the window no longer changes anything.
    calls.clear()
    await control.async_save(window={"enabled": False, "delay_min": 0})
    hass.states.async_set("binary_sensor.bad_fenster", "on")
    await control.async_run()
    assert calls == []


async def test_flow_by_demand_shows_then_applies_and_hands_back(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    _, control = await _switching_plant(hass)
    made: list[float] = []

    async def handle(call: ServiceCall) -> None:
        made.append(call.data["value"])
        hass.states.async_set(
            call.data["entity_id"], str(call.data["value"]), {"min": 0, "max": 100}
        )

    hass.services.async_register("input_number", "set_value", handle)
    hass.states.async_set("input_number.kurve", "22", {"min": 0, "max": 100})
    # The room asks for heat and stays a whole degree too cold.
    hass.states.async_set(
        "climate.bad",
        "heat",
        {
            **ATTRS,
            "hvac_action": "heating",
            "temperature": 22,
            "current_temperature": 20,
        },
    )
    settings = {
        "entity": "input_number.kurve",
        "min": 20.0,
        "max": 23.0,
        "step": 0.5,
        "apply": False,
    }
    await control.async_save(flow=settings)
    for _ in range(25):
        freezer.tick(timedelta(minutes=4))
        await control.async_run()
    flow = control.payload()["flow"]
    assert (flow["reason"], flow["target"], flow["rooms"]) == ("lagging", 22.5, ["Bad"])
    assert made == []  # only shown

    await control.async_save(flow={**settings, "apply": True})
    assert made == [22.5]
    # Right after a change it waits before raising again.
    freezer.tick(timedelta(minutes=10))
    await control.async_run()
    assert made == [22.5]
    assert control.payload()["flow"]["reason"] == "waiting"

    # Switching it off puts the number back to where it was.
    await control.async_save(flow={**settings, "apply": False})
    assert made == [22.5, 22.0]
    assert control.payload()["flow"]["base"] is None


async def test_flow_by_demand_lowers_slowly_when_demand_is_covered(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    _, control = await _switching_plant(hass)
    made: list[float] = []

    async def handle(call: ServiceCall) -> None:
        made.append(call.data["value"])
        hass.states.async_set(call.data["entity_id"], str(call.data["value"]))

    hass.services.async_register("input_number", "set_value", handle)
    hass.states.async_set("input_number.kurve", "22")
    hass.states.async_set(
        "climate.bad",
        "heat",
        {
            **ATTRS,
            "hvac_action": "heating",
            "temperature": 22,
            "current_temperature": 21.8,
        },
    )
    await control.async_save(
        flow={
            "entity": "input_number.kurve",
            "min": 21.5,
            "max": 23.0,
            "step": 0.5,
            "apply": True,
        }
    )
    for _ in range(59):
        freezer.tick(timedelta(minutes=4))
        await control.async_run()
    assert made == []
    for _ in range(3):
        freezer.tick(timedelta(minutes=4))
        await control.async_run()
    assert made == [21.5]
    # It never goes below the limit.
    for _ in range(140):
        freezer.tick(timedelta(minutes=4))
        await control.async_run()
    assert made == [21.5]
    assert control.payload()["flow"]["reason"] == "at_min"


async def test_preheat_brings_the_switch_point_forward(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    calls: list[tuple[str, dict[str, Any]]],
) -> None:
    # 04:00 local time on a Thursday.
    freezer.move_to(dt_util.as_utc(dt_util.parse_datetime("2026-11-26 04:00:00")))
    hass.states.async_set(
        "climate.bad",
        "heat",
        {**ATTRS, "preset_mode": "eco", "temperature": 18, "current_temperature": 18},
    )
    entry = _entry(ROOM)
    await _setup(hass, entry)
    room_id = next(iter(entry.subentries))
    control = entry.runtime_data.manager.control
    schedule = {
        "id": "s1",
        "name": "Werktage",
        "rooms": [room_id],
        "floors": [],
        "points": [
            {"days": ALL_DAYS, "time": "06:00", "action": "temperature:21"},
            {"days": ALL_DAYS, "time": "22:00", "action": "temperature:18"},
        ],
    }
    await control.async_save(
        enabled=True, schedules=[schedule], preheat={"enabled": True, "max_min": 180}
    )
    assert calls[-1] == (
        "set_temperature",
        {"entity_id": "climate.bad", "temperature": 18.0},
    )
    calls.clear()

    # Without a measured heating rate nothing is brought forward.
    freezer.tick(timedelta(minutes=100))  # 05:40
    await control.async_run()
    assert calls == []

    # The room warms 2 K per hour: 3 K need 90 minutes, so 04:30 at the latest.
    control.learner.rates[room_id] = 2.0
    await control.async_run()
    assert calls == [
        ("set_temperature", {"entity_id": "climate.bad", "temperature": 21.0})
    ]
    assert control.payload()["rooms"][room_id]["source"] == "preheat"

    # It stays, even when the room is already warm, and the point changes nothing.
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "temperature": 21, "current_temperature": 21}
    )
    freezer.tick(timedelta(minutes=10))
    await control.async_run()
    freezer.tick(timedelta(minutes=15))  # 06:05
    await control.async_run()
    assert len(calls) == 1
    assert control.payload()["rooms"][room_id]["source"] == "schedule"


async def test_preheat_never_starts_early_towards_colder(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    calls: list[tuple[str, dict[str, Any]]],
) -> None:
    freezer.move_to(dt_util.as_utc(dt_util.parse_datetime("2026-11-26 21:30:00")))
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "temperature": 21, "current_temperature": 19}
    )
    entry = _entry(ROOM)
    await _setup(hass, entry)
    room_id = next(iter(entry.subentries))
    control = entry.runtime_data.manager.control
    control.learner.rates[room_id] = 1.0
    schedule = {
        "id": "s1",
        "name": "Werktage",
        "rooms": [room_id],
        "floors": [],
        "points": [
            {"days": ALL_DAYS, "time": "06:00", "action": "temperature:21"},
            {"days": ALL_DAYS, "time": "22:00", "action": "temperature:18"},
        ],
    }
    await control.async_save(
        enabled=True, schedules=[schedule], preheat={"enabled": True, "max_min": 180}
    )
    assert control.payload()["rooms"][room_id]["action"] == "temperature:21"
    assert control.payload()["rooms"][room_id]["source"] == "schedule"


async def test_switching_apply_off_hands_thermostats_back(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    calls: list[tuple[str, dict[str, Any]]],
) -> None:
    hass.states.async_set("person.jake", "not_home")
    entry, room_id = await _plant(hass)
    control = entry.runtime_data.manager.control
    rule = {
        "id": "r1",
        "name": "Jake weg",
        "entities": ["person.jake"],
        "delay_min": 0,
        "rooms": [room_id],
        "floors": [],
        "action": "off",
    }
    await control.async_save(True, None, [rule])
    assert calls == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "off"})
    ]

    # "Only show" must not leave the room switched off.
    await control.async_save(enabled=False)
    assert calls[1:] == [
        ("set_hvac_mode", {"entity_id": "climate.bad", "hvac_mode": "heat"}),
        ("set_preset_mode", {"entity_id": "climate.bad", "preset_mode": "comfort"}),
    ]
    assert hass.states.get("climate.bad").state == "heat"


async def test_fahrenheit_thermostats_are_compared_in_celsius(
    hass: HomeAssistant,
) -> None:
    from homeassistant.util.unit_system import US_CUSTOMARY_SYSTEM

    hass.config.units = US_CUSTOMARY_SYSTEM
    entry, _ = await _plant(hass)
    control = entry.runtime_data.manager.control
    # 50 °F is 10 °C: cold, but far from the frost guard at 8 °C.
    hass.states.async_set(
        "climate.bad", "heat", {**ATTRS, "temperature": 68, "current_temperature": 50}
    )
    reading = control._reading({"name": "Bad", "climate_entity": "climate.bad"})
    assert round(reading.current, 1) == 10.0
    assert round(reading.target, 1) == 20.0


async def test_room_without_strand_keeps_the_pump_running(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    entry, control = await _switching_plant(hass)
    switches = _fake_switches(hass)
    # A second room that hangs on no strand and asks for heat.
    hass.states.async_set(
        "climate.flur", "heat", {**ATTRS, "hvac_action": "heating", "temperature": 21}
    )
    hass.config_entries.async_add_subentry(
        entry,
        ConfigSubentry(
            data={CONF_NAME: "Flur", "climate_entity": "climate.flur"},
            subentry_type="room",
            title="Flur",
            unique_id=None,
        ),
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    control = entry.runtime_data.manager.control
    await _set_mode(hass, entry, "active")
    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    # The strand closes, the pump keeps running for the loose room.
    assert switches == [("turn_off", "switch.eg_valve", "off")]

    hass.states.async_set(
        "climate.flur", "heat", {**ATTRS, "hvac_action": "idle", "temperature": 21}
    )
    await control.async_run()
    freezer.tick(timedelta(minutes=11))
    await control.async_run()
    assert switches[-1] == ("select_option", "select.hk", "0_aus")


async def test_preset_number_gives_the_target(hass: HomeAssistant) -> None:
    """A preset temperature shown by the thermostat wins over a learned one."""
    hass.states.async_set("climate.bad", "heat", {**ATTRS, "preset_mode": "eco"})
    entry = _entry(ROOM)
    await _setup(hass, entry)
    room_id = next(iter(entry.subentries))
    control = entry.runtime_data.manager.control
    room = {"id": room_id, "preset_entities": {"comfort": "number.bad_comfort"}}
    control.learner.targets[room_id] = {"preset:comfort": 20.0, "preset:eco": 17.0}
    assert control._action_target(room, "preset:comfort") == 20.0
    hass.states.async_set("number.bad_comfort", "21.5")
    assert control._action_target(room, "preset:comfort") == 21.5
    assert control._action_target(room, "preset:eco") == 17.0
    hass.states.async_set("number.bad_comfort", "unavailable")
    assert control._action_target(room, "preset:comfort") == 20.0
