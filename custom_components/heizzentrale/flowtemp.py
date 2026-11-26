"""Flow temperature by demand. Pure logic without Home Assistant.

A heating curve that is set too high wastes heat in the pipes and makes the
heat source start more often. This module nudges one number of the heat
source, for example a room setpoint or a curve shift, in small steps:

* down while the rooms that ask for heat all reach their setpoint,
* up as soon as a room stays too cold for a long time.

Raising is quick, lowering is slow, and both stay inside fixed limits.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field

# A room lags when it is this far below its setpoint ...
LAG_BELOW_TARGET = 0.5
# ... for at least this long while it asks for heat. The time also covers
# the normal heating up after a switch point.
LAG_AFTER_MINUTES = 90.0
# Wait this long after any change before raising again.
RAISE_WAIT_MINUTES = 60.0
# Demand has to be covered for this long before lowering, and this long has
# to pass after any change.
LOWER_AFTER_MINUTES = 240.0

REASON_UNKNOWN = "unknown"
REASON_LAGGING = "lagging"
REASON_COVERED = "covered"
REASON_AT_MAX = "at_max"
REASON_AT_MIN = "at_min"
REASON_WAITING = "waiting"
REASON_HOLD = "hold"


@dataclass(frozen=True)
class FlowAdvice:
    """What should happen with the number and why."""

    reason: str
    target: float | None = None
    rooms: list[str] = field(default_factory=list)


def room_lags(calls: bool | None, current: float | None, target: float | None) -> bool:
    """Whether a room asks for heat and is clearly below its setpoint."""
    if not calls or current is None or target is None:
        return False
    return current < target - LAG_BELOW_TARGET


def snap(value: float, step: float) -> float:
    """Round to the grid of the number, without float noise."""
    if step <= 0:
        return value
    return round(round(value / step) * step, 4)


def flow_step(
    value: float | None,
    minimum: float,
    maximum: float,
    step: float,
    lagging: list[str],
    covered_minutes: float,
    since_change_minutes: float,
) -> FlowAdvice:
    """Decide the next value of the number.

    ``lagging`` names the rooms that have been too cold for long enough.
    ``covered_minutes`` counts the time rooms asked for heat and none lagged.
    A value outside the limits is brought back inside right away.
    """
    if value is None or not math.isfinite(value) or step <= 0 or minimum > maximum:
        return FlowAdvice(REASON_UNKNOWN)
    if value > maximum:
        return FlowAdvice(REASON_AT_MAX, snap(maximum, step))
    if value < minimum:
        return FlowAdvice(REASON_AT_MIN, snap(minimum, step))
    if lagging:
        if value >= maximum:
            return FlowAdvice(REASON_AT_MAX, rooms=lagging)
        if since_change_minutes < RAISE_WAIT_MINUTES:
            return FlowAdvice(REASON_WAITING, rooms=lagging)
        return FlowAdvice(
            REASON_LAGGING, min(maximum, snap(value + step, step)), lagging
        )
    if (
        covered_minutes >= LOWER_AFTER_MINUTES
        and since_change_minutes >= LOWER_AFTER_MINUTES
    ):
        if value <= minimum:
            return FlowAdvice(REASON_AT_MIN)
        return FlowAdvice(REASON_COVERED, max(minimum, snap(value - step, step)))
    return FlowAdvice(REASON_HOLD)
