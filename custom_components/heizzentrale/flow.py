"""Nudges one number of the heat source so the flow is no hotter than needed.

The rules live in ``flowtemp``. This part reads the rooms, keeps the timers
and, only when the user chose to apply it, sets the number. While it only
shows, nothing is written anywhere.
"""

from __future__ import annotations

import logging
from datetime import datetime
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util

from .demand import RoomReading, room_calls
from .flowtemp import LAG_AFTER_MINUTES, FlowAdvice, flow_step, room_lags
from .model import parse_float

if TYPE_CHECKING:
    from .manager import PlantManager

_LOGGER = logging.getLogger(__name__)

# Time between two runs that still counts; longer gaps (a restart, a stalled
# event loop) are not credited as covered demand.
MAX_CREDIT_MINUTES = 5.0
MAX_HISTORY = 20


def _limits(value: dict[str, Any]) -> dict[str, Any]:
    if value["min"] > value["max"]:
        raise vol.Invalid("min is above max")
    return value


FLOW_SCHEMA = vol.All(
    vol.Schema(
        {
            vol.Optional("entity", default=None): vol.Any(
                None, cv.entity_domain(["number", "input_number"])
            ),
            vol.Optional("min", default=19.0): vol.All(
                vol.Coerce(float), vol.Range(min=-50, max=100)
            ),
            vol.Optional("max", default=22.0): vol.All(
                vol.Coerce(float), vol.Range(min=-50, max=100)
            ),
            vol.Optional("step", default=0.5): vol.All(
                vol.Coerce(float), vol.Range(min=0.1, max=5)
            ),
            vol.Optional("apply", default=False): bool,
        }
    ),
    _limits,
)
DEFAULT_FLOW: dict[str, Any] = FLOW_SCHEMA({})


class FlowControl:
    """Flow temperature by demand for one plant."""

    def __init__(self, hass: HomeAssistant, manager: PlantManager) -> None:
        """Initialize."""
        self.hass = hass
        self._manager = manager
        self.settings: dict[str, Any] = dict(DEFAULT_FLOW)
        # Value of the number before the first change, to put it back later.
        self._base: float | None = None
        self._changed_at: datetime | None = None
        self._lag_since: dict[str, datetime] = {}
        self._covered = 0.0
        self._last_run: datetime | None = None
        self._advice = FlowAdvice("unknown")
        self._value: float | None = None
        # The last changes, shown in the card so they can be followed.
        self._history: list[dict[str, Any]] = []

    def load(self, data: dict[str, Any]) -> None:
        """Take over stored settings."""
        try:
            self.settings = FLOW_SCHEMA(data.get("settings", {}))
        except vol.Invalid:
            self.settings = dict(DEFAULT_FLOW)
        self._base = parse_float(data.get("base"))
        changed = data.get("changed_at")
        self._changed_at = dt_util.parse_datetime(changed) if changed else None
        self._history = list(data.get("history", []))[-MAX_HISTORY:]

    def dump(self) -> dict[str, Any]:
        """Everything that has to survive a restart."""
        return {
            "settings": self.settings,
            "base": self._base,
            "changed_at": self._changed_at.isoformat() if self._changed_at else None,
            "history": self._history,
        }

    async def async_save(self, settings: dict[str, Any]) -> None:
        """Take over new settings; hand the number back if applying ends."""
        old = self.settings
        if self._base is not None and (
            not settings["apply"] or settings["entity"] != old["entity"]
        ):
            await self._async_set(old["entity"], self._base)
            self._base = None
        if settings["entity"] != old["entity"]:
            self._changed_at = None
            self._covered = 0.0
        self.settings = settings

    def _bounds(self, attrs: dict[str, Any]) -> tuple[float, float, float]:
        """Limits and step, never wider or finer than the number allows."""
        low, high, step = (
            self.settings["min"],
            self.settings["max"],
            self.settings["step"],
        )
        if (entity_min := parse_float(attrs.get("min"))) is not None:
            low = max(low, entity_min)
        if (entity_max := parse_float(attrs.get("max"))) is not None:
            high = min(high, entity_max)
        if (entity_step := parse_float(attrs.get("step"))) and entity_step > step:
            step = entity_step
        return low, high, step

    async def async_run(
        self, rooms: list[tuple[str, RoomReading]], now: datetime
    ) -> bool:
        """Evaluate once. True if something has to be stored."""
        entity_id = self.settings["entity"]
        if not entity_id:
            self._advice, self._value = FlowAdvice("unknown"), None
            self._last_run = None
            return False

        calling = False
        lag_now = False
        lagging: list[str] = []
        seen: set[str] = set()
        for room_id, reading in rooms:
            seen.add(room_id)
            calls = room_calls(reading)
            calling = calling or bool(calls)
            if room_lags(calls, reading.current, reading.target):
                lag_now = True
                since = self._lag_since.setdefault(room_id, now)
                if (now - since).total_seconds() / 60 >= LAG_AFTER_MINUTES:
                    lagging.append(reading.name)
            else:
                self._lag_since.pop(room_id, None)
        for room_id in set(self._lag_since) - seen:
            del self._lag_since[room_id]

        if lag_now:
            self._covered = 0.0
        elif calling and self._last_run is not None:
            elapsed = (now - self._last_run).total_seconds() / 60
            self._covered += min(max(elapsed, 0.0), MAX_CREDIT_MINUTES)
        self._last_run = now

        state = self.hass.states.get(entity_id)
        self._value = parse_float(state.state) if state else None
        low, high, step = self._bounds(dict(state.attributes) if state else {})
        if self._changed_at is None:
            # Unknown history counts as "just changed": wait before acting.
            self._changed_at = now
        since_change = (now - self._changed_at).total_seconds() / 60
        self._advice = flow_step(
            self._value, low, high, step, lagging, self._covered, since_change
        )
        target = self._advice.target
        if target is None or not self.settings["apply"] or target == self._value:
            return False
        if not await self._async_set(entity_id, target):
            return False
        if self._base is None:
            self._base = self._value
        self._changed_at = now
        self._covered = 0.0
        self._history = [
            *self._history,
            {
                "time": now.isoformat(),
                "from": self._value,
                "to": target,
                "reason": self._advice.reason,
            },
        ][-MAX_HISTORY:]
        return True

    async def _async_set(self, entity_id: str | None, value: float) -> bool:
        if not entity_id:
            return False
        try:
            await self.hass.services.async_call(
                entity_id.split(".", 1)[0],
                "set_value",
                {"entity_id": entity_id, "value": value},
                blocking=True,
            )
        except (HomeAssistantError, vol.Invalid, ValueError) as err:
            _LOGGER.warning("Could not set %s: %s", entity_id, err)
            return False
        return True

    def payload(self) -> dict[str, Any]:
        """Settings and current state for the card."""
        return {
            **self.settings,
            "value": self._value,
            "target": self._advice.target,
            "reason": self._advice.reason,
            "rooms": self._advice.rooms,
            "base": self._base,
            "covered_min": round(self._covered),
            "history": self._history,
        }
