"""Which strands and pumps are needed right now. Pure logic.

Nothing in here switches anything. The result says what Heizzentrale would
do, so it can be shown and checked before switching is ever enabled.
"""

from __future__ import annotations

from collections.abc import Iterable
from dataclasses import dataclass, field

# A strand is only closed after its rooms have not asked for heat this long,
# so actuators and the boiler are not switched back and forth.
CLOSE_AFTER_MINUTES = 10.0
# Without a reported heating state a room calls when it is this far below
# its setpoint.
CALL_BELOW_TARGET = 0.2
# A room this cold always counts as asking for heat, whatever its thermostat
# is set to, so its strand stays open and pipes cannot freeze.
FROST_BELOW = 8.0

ACTION_OPEN = "open"
ACTION_CLOSE = "close"
ACTION_ON = "on"
ACTION_OFF = "off"

REASON_CALLING = "rooms_calling"
REASON_UNKNOWN = "unknown_room"
REASON_NO_ROOMS = "no_rooms"
REASON_WAITING = "waiting"
REASON_NO_DEMAND = "no_demand"
REASON_MANUAL = "manual"

_UNKNOWN = {"unavailable", "unknown", ""}


@dataclass(frozen=True)
class RoomReading:
    """What a room thermostat reports."""

    name: str
    state: str | None
    hvac_action: str | None = None
    current: float | None = None
    target: float | None = None
    window_open: bool = False


def room_calls(room: RoomReading) -> bool | None:
    """Whether a room asks for heat. None means it cannot be told."""
    if room.state is None or room.state.lower() in _UNKNOWN:
        return None
    if room.current is not None and room.current < FROST_BELOW:
        return True
    if room.state == "off" or room.window_open:
        return False
    if room.hvac_action:
        return room.hvac_action == "heating"
    if room.current is None or room.target is None:
        return None
    return room.current < room.target - CALL_BELOW_TARGET


@dataclass(frozen=True)
class Advice:
    """What should happen with a strand or a pump and why."""

    wanted: bool
    reason: str
    action: str | None = None
    rooms: list[str] = field(default_factory=list)


def circuit_advice(
    rooms: Iterable[RoomReading],
    is_open: bool | None,
    has_valve: bool,
    idle_minutes: float,
) -> Advice:
    """Decide whether a strand is needed.

    When in doubt the strand stays open: a strand without rooms or with a
    thermostat that cannot be read is always wanted. ``idle_minutes`` says
    for how long no room has asked for heat.
    """
    readings = list(rooms)
    calls = [(room, room_calls(room)) for room in readings]
    calling = [room.name for room, call in calls if call]
    if not readings:
        wanted, reason = True, REASON_NO_ROOMS
    elif calling:
        wanted, reason = True, REASON_CALLING
    elif any(call is None for _, call in calls):
        wanted, reason = True, REASON_UNKNOWN
        calling = [room.name for room, call in calls if call is None]
    elif idle_minutes < CLOSE_AFTER_MINUTES:
        wanted, reason = True, REASON_WAITING
    else:
        wanted, reason = False, REASON_NO_DEMAND

    action: str | None = None
    if has_valve:
        if wanted and is_open is False and reason != REASON_WAITING:
            action = ACTION_OPEN
        elif not wanted and is_open is not False:
            action = ACTION_CLOSE
    return Advice(wanted, reason, action, calling)


def pump_advice(
    circuits_wanted: Iterable[bool], is_on: bool | None, switchable: bool
) -> Advice:
    """Decide whether a pump group is needed.

    It is needed while at least one of its strands is. ``is_on`` is None when
    its control entity is in a mode Heizzentrale does not manage, for example
    one set by hand; then it is left alone.
    """
    wanted_list = list(circuits_wanted)
    wanted = any(wanted_list) or not wanted_list
    reason = REASON_CALLING if wanted else REASON_NO_DEMAND
    if not wanted_list:
        reason = REASON_NO_ROOMS
    if not switchable:
        return Advice(wanted, reason)
    if is_on is None:
        return Advice(wanted, REASON_MANUAL)
    if wanted and not is_on:
        return Advice(wanted, reason, ACTION_ON)
    if not wanted and is_on:
        return Advice(wanted, reason, ACTION_OFF)
    return Advice(wanted, reason)
