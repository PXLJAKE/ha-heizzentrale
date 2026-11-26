"""Schedules and absence rules for rooms. Pure logic without Home Assistant.

A schedule is a list of switch points. A point names the weekdays and the
time it starts on and the action that applies from then on, until the next
point. An action is a thermostat preset such as ``comfort`` or ``off``.

An absence rule names people or devices. Once all of them have been away for
the given time, its rooms get the rule's action and the schedule waits.

A stove has a temperature sensor. While it burns, the rooms it warms get the
action chosen for each of them.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from dataclasses import dataclass
from typing import Any

ACTION_OFF = "off"
MINUTES_PER_DAY = 24 * 60
MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY

SOURCE_SCHEDULE = "schedule"
SOURCE_ABSENCE = "absence"
SOURCE_STOVE = "stove"

# A stove counts as out again once it is this much cooler than its threshold.
STOVE_HYSTERESIS = 5.0

_PRESENT_STATES = {"home", "on"}
_UNKNOWN_STATES = {"unavailable", "unknown", ""}
_TRACKER_DOMAINS = {"person", "device_tracker"}


def parse_time(value: str) -> int:
    """Turn ``HH:MM`` into minutes after midnight. Raises ValueError."""
    hours, _, minutes = value.partition(":")
    result = int(hours) * 60 + int(minutes)
    if not (0 <= int(hours) < 24 and 0 <= int(minutes) < 60):
        raise ValueError(value)
    return result


def action_at(
    points: Iterable[Mapping[str, Any]], weekday: int, minute: int
) -> str | None:
    """Action of the latest switch point at or before the given moment.

    ``weekday`` is 0 for Monday. The week wraps around, so early on Monday the
    last point of Sunday still applies. Without points there is no action.
    """
    now = weekday * MINUTES_PER_DAY + minute
    best: str | None = None
    best_age: int | None = None
    for point in points:
        start = parse_time(point["time"])
        for day in point["days"]:
            age = (now - (day * MINUTES_PER_DAY + start)) % MINUTES_PER_WEEK
            if best_age is None or age < best_age:
                best, best_age = point["action"], age
    return best


def is_present(entity_id: str, state: str | None) -> bool | None:
    """Whether a person or device counts as present. None means unknown.

    People and device trackers are present when ``home``; any other zone is
    away. Everything else (a switch, a helper, a network sensor) is present
    when ``on``.
    """
    if state is None or state.lower() in _UNKNOWN_STATES:
        return None
    if entity_id.split(".", 1)[0] in _TRACKER_DOMAINS:
        return state == "home"
    return state.lower() in _PRESENT_STATES


def rule_active(
    readings: Iterable[tuple[bool | None, float]], delay_seconds: float
) -> bool:
    """Whether an absence rule applies.

    ``readings`` holds, per person or device, whether it is present and for
    how many seconds it has been in that state. The rule applies only when
    every one of them is away and has been for at least the delay. Anything
    unknown counts as present: when in doubt the house stays warm.
    """
    items = list(readings)
    if not items:
        return False
    return all(present is False and age >= delay_seconds for present, age in items)


def stove_burning(
    temperature: float | None, threshold: float, was_burning: bool
) -> bool:
    """Whether a stove counts as burning.

    It starts at the threshold and stops a few degrees below it, so a reading
    that hovers around the threshold does not switch rooms back and forth.
    Without a reading the stove counts as out: the radiators keep working.
    """
    if temperature is None:
        return False
    if was_burning:
        return temperature > threshold - STOVE_HYSTERESIS
    return temperature >= threshold


@dataclass(frozen=True)
class Desired:
    """What a room should be set to right now and why."""

    action: str
    source: str
    name: str


def _targets(item: Mapping[str, Any], room_id: str, floor_id: str | None) -> int:
    """2 if the item names the room, 1 if it names its floor, else 0."""
    if room_id in item.get("rooms", ()):
        return 2
    if floor_id and floor_id in item.get("floors", ()):
        return 1
    return 0


def desired_for_room(
    room_id: str,
    floor_id: str | None,
    schedules: Iterable[Mapping[str, Any]],
    active_rules: Iterable[Mapping[str, Any]],
    weekday: int,
    minute: int,
    burning: Iterable[Mapping[str, Any]] = (),
) -> Desired | None:
    """Decide the action for one room.

    An active absence rule wins, then a burning stove, then the schedule.
    ``burning`` holds the stoves that burn right now; each names an action
    per room under ``actions``. A schedule assigned to the
    room itself wins over one assigned to its floor. None means nothing is
    set up for this room, so it is left alone.
    """
    for rule in active_rules:
        if _targets(rule, room_id, floor_id):
            return Desired(rule["action"], SOURCE_ABSENCE, rule.get("name", ""))

    for stove in burning:
        if action := stove.get("actions", {}).get(room_id):
            return Desired(action, SOURCE_STOVE, stove.get("name", ""))

    chosen: Mapping[str, Any] | None = None
    rank = 0
    for schedule in schedules:
        if (found := _targets(schedule, room_id, floor_id)) > rank:
            chosen, rank = schedule, found
    if chosen is None:
        return None
    action = action_at(chosen.get("points", ()), weekday, minute)
    if action is None:
        return None
    return Desired(action, SOURCE_SCHEDULE, chosen.get("name", ""))
