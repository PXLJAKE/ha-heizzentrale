"""Start heating early enough. Pure logic without Home Assistant.

A schedule says when a room should be warm, not when heating has to start.
This module watches how fast each room warms up while it heats and works out
how many minutes before a switch point the thermostat has to change.

Nothing is guessed: a room without a measured rate is never preheated.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any

# A heating phase teaches something only if it is long enough and the room
# got clearly warmer; short on/off cycles at the setpoint say nothing.
MIN_PHASE_MINUTES = 20.0
MIN_RISE = 0.3
# A phase is closed after this long, so one endless phase still teaches.
MAX_PHASE_MINUTES = 180.0
# Plausible heating rates in kelvin per hour; anything else is clamped.
RATE_MIN = 0.2
RATE_MAX = 6.0
# Weight of a new measurement against what was learned before.
ALPHA = 0.3
# Below this difference a room counts as warm enough already.
CLOSE_ENOUGH = 0.2


def blend(old: float | None, measured: float) -> float:
    """Mix a new rate into the learned one."""
    measured = min(RATE_MAX, max(RATE_MIN, measured))
    if old is None:
        return round(measured, 2)
    return round(old + ALPHA * (measured - old), 2)


def phase_rate(start_temp: float, end_temp: float, minutes: float) -> float | None:
    """Heating rate of one phase in K/h, None if it teaches nothing."""
    if minutes < MIN_PHASE_MINUTES or end_temp - start_temp < MIN_RISE:
        return None
    return (end_temp - start_temp) / (minutes / 60)


def lead_minutes(
    current: float | None,
    target: float | None,
    rate: float | None,
    max_minutes: float,
) -> float | None:
    """How long before a switch point heating has to start. None if unknown."""
    if current is None or target is None or rate is None or rate <= 0:
        return None
    if target - current <= CLOSE_ENOUGH:
        return 0.0
    return min(max_minutes, (target - current) / rate * 60)


class Learner:
    """Remembers heating rates and what setpoint an action leads to."""

    def __init__(self) -> None:
        """Initialize."""
        self.rates: dict[str, float] = {}
        self.targets: dict[str, dict[str, float]] = {}
        self._phase: dict[str, tuple[datetime, float]] = {}

    def load(self, data: dict[str, Any]) -> None:
        """Take over what was learned before a restart."""
        self.rates = {
            str(room): float(rate)
            for room, rate in data.get("rates", {}).items()
            if isinstance(rate, (int, float)) and RATE_MIN <= rate <= RATE_MAX
        }
        self.targets = {
            str(room): {
                str(action): float(value)
                for action, value in actions.items()
                if isinstance(value, (int, float))
            }
            for room, actions in data.get("targets", {}).items()
            if isinstance(actions, dict)
        }

    def dump(self) -> dict[str, Any]:
        """Everything that has to survive a restart."""
        return {"rates": self.rates, "targets": self.targets}

    def observe(
        self, room_id: str, heating: bool, current: float | None, now: datetime
    ) -> bool:
        """Feed one reading of a room. True if a rate was learned."""
        phase = self._phase.get(room_id)
        if phase is None:
            if heating and current is not None:
                self._phase[room_id] = (now, current)
            return False
        minutes = (now - phase[0]).total_seconds() / 60
        if heating and current is not None and minutes < MAX_PHASE_MINUTES:
            return False
        del self._phase[room_id]
        if current is None:
            return False
        if heating:
            # Closed only because it ran long: the next phase starts here.
            self._phase[room_id] = (now, current)
        rate = phase_rate(phase[1], current, minutes)
        if rate is None:
            return False
        new = blend(self.rates.get(room_id), rate)
        if new == self.rates.get(room_id):
            return False
        self.rates[room_id] = new
        return True

    def note_target(self, room_id: str, action: str, target: float | None) -> bool:
        """Remember the setpoint an action led to. True if it is new."""
        if target is None:
            return False
        known = self.targets.setdefault(room_id, {})
        if known.get(action) == target:
            return False
        known[action] = target
        return True

    def target_for(self, room_id: str, action: str) -> float | None:
        """Setpoint an action leads to, if known."""
        if action.startswith("temperature:"):
            try:
                return float(action.removeprefix("temperature:"))
            except ValueError:
                return None
        return self.targets.get(room_id, {}).get(action)

    def forget(self, room_ids: set[str]) -> None:
        """Drop everything about rooms that no longer exist."""
        for store in (self.rates, self.targets, self._phase):
            for room_id in set(store) - room_ids:
                del store[room_id]
