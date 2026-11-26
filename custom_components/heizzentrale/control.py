"""Applies schedules and rules to the thermostats and switches strands.

The engine runs once a minute and whenever a person or device of an absence
rule changes. It touches a thermostat only when the wanted action changes, so
a change made by hand stays until the next switch point. While it is not
enabled it only reports what it would do.

In the operating mode ``active`` it also switches strands and pump groups.
Opening a strand is always enforced. Closing and switching a pump group off
happen once per change, and a pump group is only switched on again if the
engine itself switched it off. Leaving the mode opens everything again.
"""

from __future__ import annotations

import asyncio
import logging
import re
from datetime import datetime
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import (
    async_track_state_change_event,
    async_track_time_change,
)
from homeassistant.util import dt as dt_util

from .const import CONF_CONTROL_OFF, CONF_CONTROL_ON, OperatingMode
from .demand import RoomReading, circuit_advice, pump_advice
from .flow import FlowControl
from .model import circuit_open, parse_float
from .scheduling import (
    SOURCE_SCHEDULE,
    SOURCE_WINDOW,
    Desired,
    desired_for_room,
    is_present,
    parse_time,
    rule_active,
    stove_burning,
)

if TYPE_CHECKING:
    from .manager import PlantManager

_LOGGER = logging.getLogger(__name__)

ACTION_ON = "on"
ACTION_OFF = "off"
PREFIX_PRESET = "preset:"
PREFIX_TEMPERATURE = "temperature:"
_ACTION_PATTERN = re.compile(
    r"^(on|off|preset:[^\s].{0,39}|temperature:\d{1,2}(\.\d)?)$"
)

MAX_SCHEDULES = 30
MAX_RULES = 30
MAX_STOVES = 10
MAX_POINTS = 60


def _action(value: Any) -> str:
    if not isinstance(value, str) or not _ACTION_PATTERN.match(value):
        raise vol.Invalid("invalid action")
    return value


def _time(value: Any) -> str:
    try:
        minutes = parse_time(str(value))
    except ValueError as err:
        raise vol.Invalid("invalid time") from err
    return f"{minutes // 60:02d}:{minutes % 60:02d}"


_ID = vol.All(str, vol.Length(min=1, max=40))
_NAME = vol.All(str, vol.Length(max=60))
_TARGETS = vol.All([_ID], vol.Length(max=100))

POINT_SCHEMA = vol.Schema(
    {
        vol.Required("days"): vol.All(
            [vol.All(int, vol.Range(min=0, max=6))], vol.Length(min=1, max=7)
        ),
        vol.Required("time"): _time,
        vol.Required("action"): _action,
    }
)
SCHEDULE_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("name"): _NAME,
        vol.Optional("points", default=list): vol.All(
            [POINT_SCHEMA], vol.Length(max=MAX_POINTS)
        ),
        vol.Optional("rooms", default=list): _TARGETS,
        vol.Optional("floors", default=list): _TARGETS,
    }
)
RULE_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("name"): _NAME,
        vol.Optional("entities", default=list): vol.All(
            [cv.entity_id], vol.Length(max=20)
        ),
        vol.Optional("delay_min", default=0): vol.All(
            vol.Coerce(float), vol.Range(min=0, max=1440)
        ),
        vol.Optional("rooms", default=list): _TARGETS,
        vol.Optional("floors", default=list): _TARGETS,
        vol.Required("action"): _action,
    }
)
STOVE_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        vol.Required("name"): _NAME,
        vol.Optional("sensor", default=None): vol.Any(None, cv.entity_id),
        vol.Optional("on_above", default=40): vol.All(
            vol.Coerce(float), vol.Range(min=25, max=500)
        ),
        vol.Optional("room", default=None): vol.Any(None, _ID),
        # For a stove in a room without a thermostat: its own tile on a floor.
        vol.Optional("floor", default=None): vol.Any(None, _ID),
        vol.Optional("actions", default=dict): vol.All(
            {_ID: _action}, vol.Length(max=100)
        ),
    }
)
SCHEDULES_SCHEMA = vol.All([SCHEDULE_SCHEMA], vol.Length(max=MAX_SCHEDULES))
RULES_SCHEMA = vol.All([RULE_SCHEMA], vol.Length(max=MAX_RULES))
STOVES_SCHEMA = vol.All([STOVE_SCHEMA], vol.Length(max=MAX_STOVES))
# An open window switches the thermostat of its room off after a short wait.
WINDOW_SCHEMA = vol.Schema(
    {
        vol.Optional("enabled", default=True): bool,
        vol.Optional("delay_min", default=2): vol.All(
            vol.Coerce(float), vol.Range(min=0, max=60)
        ),
    }
)
DEFAULT_WINDOW = {"enabled": True, "delay_min": 2.0}


class ControlEngine:
    """Schedules and absence rules of one plant."""

    def __init__(self, hass: HomeAssistant, manager: PlantManager) -> None:
        """Initialize the engine."""
        self.hass = hass
        self._manager = manager
        self.enabled = False
        self.schedules: list[dict[str, Any]] = []
        self.rules: list[dict[str, Any]] = []
        self.stoves: list[dict[str, Any]] = []
        self.window: dict[str, Any] = dict(DEFAULT_WINDOW)
        self.flow = FlowControl(hass, manager)
        # Thermostat state before an open window switched it off, per room.
        self._window_saved: dict[str, dict[str, Any]] = {}
        # Strands the engine closed and pump groups it switched off.
        self._switched: dict[str, str] = {}
        # Stoves that currently burn; kept for the switch-off hysteresis.
        self._burning: list[str] = []
        # Last action the engine set per room; survives restarts.
        self._applied: dict[str, str] = {}
        # Thermostat state before an absence rule changed it, per room.
        self._restore: dict[str, dict[str, Any]] = {}
        # Rules that currently apply; kept so a restart does not reset them.
        self._active: list[str] = []
        self._status: dict[str, dict[str, Any]] = {}
        # What would be switched right now, per strand and pump group.
        self._advice: dict[str, dict[str, Any]] = {"circuits": {}, "pump_groups": {}}
        # Since when no room of a strand has asked for heat.
        self._idle_since: dict[str, datetime] = {}
        self._lock = asyncio.Lock()
        self._unsub_time: CALLBACK_TYPE | None = None
        self._unsub_state: CALLBACK_TYPE | None = None
        self._tracked: list[str] = []

    # -- storage ------------------------------------------------------------

    def load(self, data: dict[str, Any]) -> None:
        """Take over stored settings."""
        self.enabled = bool(data.get("enabled", False))
        self.schedules = list(data.get("schedules", []))
        self.rules = list(data.get("rules", []))
        self.stoves = list(data.get("stoves", []))
        self.window = {**DEFAULT_WINDOW, **data.get("window", {})}
        self.flow.load(data.get("flow", {}))
        self._window_saved = dict(data.get("window_saved", {}))
        self._switched = dict(data.get("switched", {}))
        self._burning = list(data.get("burning", []))
        self._applied = dict(data.get("applied", {}))
        self._restore = dict(data.get("restore", {}))
        self._active = list(data.get("active", []))

    def dump(self) -> dict[str, Any]:
        """Everything that has to survive a restart."""
        return {
            "enabled": self.enabled,
            "schedules": self.schedules,
            "rules": self.rules,
            "stoves": self.stoves,
            "window": self.window,
            "flow": self.flow.dump(),
            "window_saved": self._window_saved,
            "switched": self._switched,
            "burning": self._burning,
            "applied": self._applied,
            "restore": self._restore,
            "active": self._active,
        }

    # -- lifecycle ----------------------------------------------------------

    @callback
    def async_start(self) -> None:
        """Evaluate at every full minute and when a tracked entity changes."""
        self._unsub_time = async_track_time_change(self.hass, self._on_time, second=0)
        self._track_entities()
        self._schedule_run()

    @callback
    def async_stop(self) -> None:
        """Stop all listeners."""
        for unsub in (self._unsub_time, self._unsub_state):
            if unsub is not None:
                unsub()
        self._unsub_time = self._unsub_state = None
        self._tracked = []

    @callback
    def _track_entities(self, plant: dict[str, Any] | None = None) -> None:
        """Listen to everything a decision depends on."""
        plant = plant or self._plant()
        entities = sorted(
            {e for rule in self.rules for e in rule["entities"]}
            | {stove["sensor"] for stove in self.stoves if stove.get("sensor")}
            # Thermostats, windows and actuators decide which strands are needed.
            | {r["climate_entity"] for r in plant["rooms"] if r.get("climate_entity")}
            | {e for r in plant["rooms"] for e in r.get("window_entities", [])}
            | {c["valve_entity"] for c in plant["circuits"] if c.get("valve_entity")}
            | {
                g["control_entity"]
                for g in plant["pump_groups"]
                if g.get("control_entity")
            }
        )
        if entities == self._tracked:
            return
        self._tracked = entities
        if self._unsub_state is not None:
            self._unsub_state()
            self._unsub_state = None
        if entities:
            self._unsub_state = async_track_state_change_event(
                self.hass, entities, self._on_state
            )

    @callback
    def _on_time(self, now: datetime) -> None:
        self._schedule_run()

    @callback
    def _on_state(self, event: Event) -> None:
        self._schedule_run()

    @callback
    def _schedule_run(self) -> None:
        self._manager.entry.async_create_background_task(
            self.hass, self.async_run(), "heizzentrale control"
        )

    async def async_save(
        self,
        enabled: bool | None = None,
        schedules: list[dict[str, Any]] | None = None,
        rules: list[dict[str, Any]] | None = None,
        stoves: list[dict[str, Any]] | None = None,
        window: dict[str, Any] | None = None,
        flow: dict[str, Any] | None = None,
    ) -> None:
        """Store changed settings and apply them right away."""
        if enabled is not None:
            self.enabled = enabled
        if schedules is not None:
            self.schedules = schedules
        if rules is not None:
            self.rules = rules
        if stoves is not None:
            self.stoves = stoves
        if window is not None:
            self.window = window
        if flow is not None:
            await self.flow.async_save(flow)
        self._track_entities()
        await self._manager.async_save()
        await self.async_run()

    # -- evaluation ---------------------------------------------------------

    def _plant(self) -> dict[str, Any]:
        """The parts of the plant as the card sees them."""
        # Imported here: the websocket module imports the manager.
        from .websocket_api import async_describe_plants

        entry_id = self._manager.entry.entry_id
        for plant in async_describe_plants(self.hass):
            if plant["entry_id"] == entry_id:
                return plant
        return {"rooms": [], "circuits": [], "pump_groups": []}

    def _reading(self, room: dict[str, Any]) -> RoomReading:
        state = self.hass.states.get(room.get("climate_entity") or "")
        attrs = state.attributes if state else {}
        windows = (self.hass.states.get(e) for e in room.get("window_entities", []))
        return RoomReading(
            name=room["name"],
            state=state.state if state else None,
            hvac_action=attrs.get("hvac_action"),
            current=parse_float(attrs.get("current_temperature")),
            target=parse_float(attrs.get("temperature")),
            window_open=any(w is not None and w.state == "on" for w in windows),
        )

    def _pump_is_on(self, group: dict[str, Any]) -> bool | None:
        """State of a pump group; None if it is in a mode set by hand."""
        entity_id = group.get("control_entity")
        state = self.hass.states.get(entity_id) if entity_id else None
        if state is None or state.state in ("unavailable", "unknown"):
            return None
        domain = entity_id.split(".", 1)[0]
        if domain in ("select", "input_select"):
            if state.state == group.get(CONF_CONTROL_ON):
                return True
            if state.state == group.get(CONF_CONTROL_OFF):
                return False
            return None
        if domain == "climate":
            return state.state != "off"
        return state.state == "on"

    def _advise(self, plant: dict[str, Any], now: datetime) -> None:
        """Work out which strands and pump groups are needed."""
        circuits: dict[str, dict[str, Any]] = {}
        for circuit in plant["circuits"]:
            cid = circuit["id"]
            readings = [
                self._reading(room)
                for room in plant["rooms"]
                if room.get("circuit") == cid and room.get("climate_entity")
            ]
            valve = circuit.get("valve_entity")
            state = self.hass.states.get(valve) if valve else None
            is_open = (
                circuit_open(
                    state.state if state else None, circuit.get("valve_type") == "no"
                )
                if valve
                else True
            )
            idle = (now - self._idle_since.setdefault(cid, now)).total_seconds() / 60
            advice = circuit_advice(readings, is_open, bool(valve), idle)
            if advice.reason != "waiting" and advice.wanted:
                # Heat is asked for (or it cannot be told): the wait restarts.
                self._idle_since[cid] = now
            circuits[cid] = {
                "wanted": advice.wanted,
                "reason": advice.reason,
                "action": advice.action,
                "rooms": advice.rooms,
            }
        groups: dict[str, dict[str, Any]] = {}
        for group in plant["pump_groups"]:
            wanted = [
                circuits[c["id"]]["wanted"]
                for c in plant["circuits"]
                if c.get("pump_group") == group["id"]
            ]
            advice = pump_advice(
                wanted, self._pump_is_on(group), bool(group.get("control_entity"))
            )
            groups[group["id"]] = {
                "wanted": advice.wanted,
                "reason": advice.reason,
                "action": advice.action,
            }
        self._advice = {"circuits": circuits, "pump_groups": groups}

    def _active_rules(self, now: datetime) -> list[dict[str, Any]]:
        """Rules whose people and devices are all away for long enough."""
        active: list[dict[str, Any]] = []
        for rule in self.rules:
            readings: list[tuple[bool | None, float]] = []
            for entity_id in rule["entities"]:
                state = self.hass.states.get(entity_id)
                present = is_present(entity_id, state.state if state else None)
                age = (now - state.last_changed).total_seconds() if state else 0.0
                readings.append((present, age))
            # A rule that already applied keeps applying while everyone is
            # still away, so a restart does not heat up for the delay.
            delay = 0.0 if rule["id"] in self._active else rule["delay_min"] * 60
            if rule_active(readings, delay):
                active.append(rule)
        return active

    def _burning_stoves(self) -> list[dict[str, Any]]:
        """Stoves whose sensor says that they burn."""
        return [
            stove
            for stove in self.stoves
            if stove_burning(
                self._manager.celsius(stove.get("sensor")),
                stove["on_above"],
                stove["id"] in self._burning,
            )
        ]

    async def async_run(self) -> None:
        """Work out what every room should be set to and apply changes."""
        async with self._lock:
            now = dt_util.utcnow()
            local = dt_util.as_local(now)
            minute = local.hour * 60 + local.minute
            active = self._active_rules(now)
            changed = False
            active_ids = [rule["id"] for rule in active]
            if active_ids != self._active:
                self._active = active_ids
                changed = True
            burning = self._burning_stoves()
            burning_ids = [stove["id"] for stove in burning]
            if burning_ids != self._burning:
                self._burning = burning_ids
                changed = True

            status: dict[str, dict[str, Any]] = {}
            plant = self._plant()
            # The plant is not listed yet while it is still being set up.
            self._track_entities(plant)
            self._advise(plant, now)
            for room in plant["rooms"]:
                room_id = room["id"]
                climate = room.get("climate_entity")
                desired = desired_for_room(
                    room_id,
                    room.get("floor"),
                    self.schedules,
                    active,
                    local.weekday(),
                    minute,
                    burning,
                )
                if not climate:
                    continue
                airing = self._airing(room, now)
                changed |= await self._async_window(room_id, climate, airing)
                if airing:
                    status[room_id] = {
                        "action": ACTION_OFF,
                        "source": SOURCE_WINDOW,
                        "name": "",
                        "applied": room_id in self._window_saved,
                    }
                    continue
                changed |= await self._async_apply(room_id, climate, desired)
                if desired is not None:
                    status[room_id] = {
                        "action": desired.action,
                        "source": desired.source,
                        "name": desired.name,
                        "applied": self._applied.get(room_id) == desired.action,
                    }
            self._status = status
            changed |= await self._async_switch(plant)
            changed |= await self.flow.async_run(
                [
                    (room["id"], self._reading(room))
                    for room in plant["rooms"]
                    if room.get("climate_entity")
                ],
                now,
            )
            if changed:
                await self._manager.async_save()

    def _airing(self, room: dict[str, Any], now: datetime) -> bool:
        """Whether a window of the room has been open for long enough."""
        if not self.window["enabled"]:
            return False
        delay = self.window["delay_min"] * 60
        for entity_id in room.get("window_entities", []):
            state = self.hass.states.get(entity_id)
            if state is None or state.state != "on":
                continue
            # A room that is already switched off stays off until it closes.
            if room["id"] in self._window_saved:
                return True
            if (now - state.last_changed).total_seconds() >= delay:
                return True
        return False

    async def _async_window(self, room_id: str, climate: str, airing: bool) -> bool:
        """Switch a room off while it is aired and put it back afterwards."""
        if airing:
            if not self.enabled or room_id in self._window_saved:
                return False
            state = self.hass.states.get(climate)
            if state is None or state.state in ("unavailable", "unknown"):
                return False
            self._window_saved[room_id] = {
                "hvac_mode": state.state,
                "preset_mode": state.attributes.get("preset_mode"),
                "temperature": state.attributes.get("temperature"),
            }
            if state.state != "off":
                await self._async_action(climate, ACTION_OFF)
            return True
        if (previous := self._window_saved.pop(room_id, None)) is None:
            return False
        if previous.get("hvac_mode") != "off":
            # Only switch it on again; preset and setpoint were not touched.
            await self._async_heat(climate, previous.get("hvac_mode"))
        return True

    # -- strands and pump groups -------------------------------------------

    def _mode(self) -> OperatingMode | None:
        """The operating mode; None until the stored one has been restored."""
        data = getattr(self._manager.entry, "runtime_data", None)
        if data is None or not data.mode_restored:
            return None
        return data.mode

    def _switching(self) -> bool:
        return self._mode() is OperatingMode.ACTIVE

    async def _async_service(self, domain: str, service: str, **data: Any) -> bool:
        try:
            await self.hass.services.async_call(domain, service, data, blocking=True)
        except (HomeAssistantError, vol.Invalid, ValueError) as err:
            _LOGGER.warning("Could not call %s.%s: %s", domain, service, err)
            return False
        return True

    async def _async_valve(self, circuit: dict[str, Any], open_: bool) -> bool:
        """Open or close the actuator of a strand."""
        entity_id = circuit["valve_entity"]
        domain = entity_id.split(".", 1)[0]
        if domain == "valve":
            service = "open_valve" if open_ else "close_valve"
        else:
            # A normally closed actuator opens with power, a normally open
            # one closes with it.
            powered = open_ != (circuit.get("valve_type") == "no")
            domain, service = "homeassistant", "turn_on" if powered else "turn_off"
        return await self._async_service(domain, service, entity_id=entity_id)

    async def _async_pump(self, group: dict[str, Any], on: bool) -> bool:
        """Switch a pump group on or off through its control entity."""
        entity_id = group["control_entity"]
        domain = entity_id.split(".", 1)[0]
        if domain in ("select", "input_select"):
            option = group.get(CONF_CONTROL_ON if on else CONF_CONTROL_OFF)
            if not option:
                return False
            return await self._async_service(
                domain, "select_option", entity_id=entity_id, option=option
            )
        if domain == "climate":
            if not on:
                return await self._async_service(
                    "climate", "set_hvac_mode", entity_id=entity_id, hvac_mode="off"
                )
            await self._async_heat(entity_id)
            return True
        return await self._async_service(
            "homeassistant", "turn_on" if on else "turn_off", entity_id=entity_id
        )

    async def _async_switch(self, plant: dict[str, Any]) -> bool:
        """Carry out the advice for strands and pump groups. True if stored.

        Order matters: strands open before a pump starts, and a pump stops
        before its strands close, so it never runs against closed valves.
        """
        before = dict(self._switched)
        circuits = {c["id"]: c for c in plant["circuits"] if c.get("valve_entity")}
        groups = {g["id"]: g for g in plant["pump_groups"] if g.get("control_entity")}
        if self._mode() is None:
            # Right after a start the mode is not known yet: touch nothing.
            return False
        if not self._switching():
            # Hand everything back the way a plant without Heizzentrale runs.
            for part_id, action in before.items():
                if action == "close" and part_id in circuits:
                    await self._async_valve(circuits[part_id], True)
                elif (
                    action == "off"
                    and part_id in groups
                    and self._pump_is_on(groups[part_id]) is False
                ):
                    await self._async_pump(groups[part_id], True)
            self._switched = {}
            return bool(before)

        advice = self._advice
        for cid, circuit in circuits.items():
            item = advice["circuits"].get(cid, {})
            if item.get("action") == "open":
                await self._async_valve(circuit, True)
            if item.get("wanted", True):
                self._switched.pop(cid, None)
        for gid, group in groups.items():
            item = advice["pump_groups"].get(gid, {})
            action = item.get("action")
            if action == "off":
                if self._switched.get(gid) != "off" and await self._async_pump(
                    group, False
                ):
                    self._switched[gid] = "off"
            elif action == "on":
                # Only undo our own switching off: someone who switched the
                # heating off by hand wants it to stay off.
                if self._switched.get(gid) == "off" and await self._async_pump(
                    group, True
                ):
                    del self._switched[gid]
            elif item.get("wanted", True):
                self._switched.pop(gid, None)
        for cid, circuit in circuits.items():
            item = advice["circuits"].get(cid, {})
            if (
                item.get("action") == "close"
                and self._switched.get(cid) != "close"
                and await self._async_valve(circuit, False)
            ):
                self._switched[cid] = "close"
        for part_id in list(self._switched):
            if part_id not in circuits and part_id not in groups:
                del self._switched[part_id]
        return self._switched != before

    async def _async_apply(
        self, room_id: str, climate: str, desired: Desired | None
    ) -> bool:
        """Set one thermostat if its wanted action changed. True if stored."""
        if not self.enabled:
            return False
        if desired is None:
            # Nothing is planned any more: undo what a rule or stove did.
            had = self._applied.pop(room_id, None) is not None
            if (previous := self._restore.pop(room_id, None)) is not None:
                await self._async_restore(climate, previous)
                return True
            return had
        if self._applied.get(room_id) == desired.action:
            return False
        if desired.source != SOURCE_SCHEDULE:
            if room_id not in self._restore and (
                state := self.hass.states.get(climate)
            ):
                self._restore[room_id] = {
                    "hvac_mode": state.state,
                    "preset_mode": state.attributes.get("preset_mode"),
                    "temperature": state.attributes.get("temperature"),
                }
        else:
            # The schedule takes over again; nothing to put back.
            self._restore.pop(room_id, None)
        await self._async_action(climate, desired.action)
        self._applied[room_id] = desired.action
        return True

    async def _async_call(self, service: str, climate: str, **data: Any) -> None:
        try:
            await self.hass.services.async_call(
                "climate", service, {"entity_id": climate, **data}, blocking=True
            )
        except (HomeAssistantError, vol.Invalid, ValueError) as err:
            _LOGGER.warning("Could not set %s (%s): %s", climate, service, err)

    async def _async_heat(self, climate: str, prefer: str | None = None) -> None:
        """Switch a thermostat on if it is off."""
        state = self.hass.states.get(climate)
        if state is None or state.state != "off":
            return
        modes = [m for m in state.attributes.get("hvac_modes", []) if m != "off"]
        for mode in (prefer, "heat", "auto", *modes):
            if mode in modes:
                await self._async_call("set_hvac_mode", climate, hvac_mode=mode)
                return

    async def _async_action(self, climate: str, action: str) -> None:
        """Carry out one action on a thermostat."""
        if action == ACTION_OFF:
            await self._async_call("set_hvac_mode", climate, hvac_mode="off")
            return
        await self._async_heat(climate)
        if action.startswith(PREFIX_PRESET):
            preset = action.removeprefix(PREFIX_PRESET)
            state = self.hass.states.get(climate)
            if state and preset in (state.attributes.get("preset_modes") or []):
                await self._async_call("set_preset_mode", climate, preset_mode=preset)
            else:
                _LOGGER.warning("%s does not offer the preset %s", climate, preset)
        elif action.startswith(PREFIX_TEMPERATURE):
            await self._async_call(
                "set_temperature",
                climate,
                temperature=float(action.removeprefix(PREFIX_TEMPERATURE)),
            )

    async def _async_restore(self, climate: str, previous: dict[str, Any]) -> None:
        """Put a thermostat back to how it was before an absence rule."""
        if previous.get("hvac_mode") == "off":
            await self._async_call("set_hvac_mode", climate, hvac_mode="off")
            return
        await self._async_heat(climate)
        if preset := previous.get("preset_mode"):
            await self._async_action(climate, f"{PREFIX_PRESET}{preset}")
        elif (temperature := previous.get("temperature")) is not None:
            await self._async_call("set_temperature", climate, temperature=temperature)

    # -- card ---------------------------------------------------------------

    def payload(self) -> dict[str, Any]:
        """Settings and current state for the card."""
        return {
            "enabled": self.enabled,
            "schedules": self.schedules,
            "rules": self.rules,
            "stoves": self.stoves,
            "window": self.window,
            "flow": self.flow.payload(),
            "switching": self._switching(),
            "switched": self._switched,
            "active_rules": self._active,
            "burning": self._burning,
            "rooms": self._status,
            "advice": self._advice,
        }
