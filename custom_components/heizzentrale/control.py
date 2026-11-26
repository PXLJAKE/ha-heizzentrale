"""Applies schedules and absence rules to the thermostats of the rooms.

The engine runs once a minute and whenever a person or device of an absence
rule changes. It touches a thermostat only when the wanted action changes, so
a change made by hand stays until the next switch point. While it is not
enabled it only reports what it would do.
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

from .scheduling import (
    SOURCE_SCHEDULE,
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
        vol.Optional("actions", default=dict): vol.All(
            {_ID: _action}, vol.Length(max=100)
        ),
    }
)
SCHEDULES_SCHEMA = vol.All([SCHEDULE_SCHEMA], vol.Length(max=MAX_SCHEDULES))
RULES_SCHEMA = vol.All([RULE_SCHEMA], vol.Length(max=MAX_RULES))
STOVES_SCHEMA = vol.All([STOVE_SCHEMA], vol.Length(max=MAX_STOVES))


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
        # Stoves that currently burn; kept for the switch-off hysteresis.
        self._burning: list[str] = []
        # Last action the engine set per room; survives restarts.
        self._applied: dict[str, str] = {}
        # Thermostat state before an absence rule changed it, per room.
        self._restore: dict[str, dict[str, Any]] = {}
        # Rules that currently apply; kept so a restart does not reset them.
        self._active: list[str] = []
        self._status: dict[str, dict[str, Any]] = {}
        self._lock = asyncio.Lock()
        self._unsub_time: CALLBACK_TYPE | None = None
        self._unsub_state: CALLBACK_TYPE | None = None

    # -- storage ------------------------------------------------------------

    def load(self, data: dict[str, Any]) -> None:
        """Take over stored settings."""
        self.enabled = bool(data.get("enabled", False))
        self.schedules = list(data.get("schedules", []))
        self.rules = list(data.get("rules", []))
        self.stoves = list(data.get("stoves", []))
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

    @callback
    def _track_entities(self) -> None:
        if self._unsub_state is not None:
            self._unsub_state()
            self._unsub_state = None
        entities = sorted(
            {e for rule in self.rules for e in rule["entities"]}
            | {stove["sensor"] for stove in self.stoves if stove.get("sensor")}
        )
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
        self._track_entities()
        await self._manager.async_save()
        await self.async_run()

    # -- evaluation ---------------------------------------------------------

    def _rooms(self) -> list[dict[str, Any]]:
        """Rooms of the plant with thermostat and floor."""
        # Imported here: the websocket module imports the manager.
        from .websocket_api import async_describe_plants

        entry_id = self._manager.entry.entry_id
        for plant in async_describe_plants(self.hass):
            if plant["entry_id"] == entry_id:
                return plant["rooms"]
        return []

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
            for room in self._rooms():
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
                changed |= await self._async_apply(room_id, climate, desired)
                if desired is not None:
                    status[room_id] = {
                        "action": desired.action,
                        "source": desired.source,
                        "name": desired.name,
                        "applied": self._applied.get(room_id) == desired.action,
                    }
            self._status = status
            if changed:
                await self._manager.async_save()

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

    async def _async_heat(self, climate: str) -> None:
        """Switch a thermostat on if it is off."""
        state = self.hass.states.get(climate)
        if state is None or state.state != "off":
            return
        modes = [m for m in state.attributes.get("hvac_modes", []) if m != "off"]
        for mode in ("heat", "auto", *modes):
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
            "active_rules": self._active,
            "burning": self._burning,
            "rooms": self._status,
        }
