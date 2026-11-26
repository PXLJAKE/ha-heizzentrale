"""Tests for the pure schedule and absence logic."""

from __future__ import annotations

import pytest

from custom_components.heizzentrale.scheduling import (
    SOURCE_ABSENCE,
    SOURCE_SCHEDULE,
    action_at,
    desired_for_room,
    is_present,
    parse_time,
    rule_active,
    stove_burning,
)

WORKDAYS = [0, 1, 2, 3, 4]
POINTS = [
    {"days": WORKDAYS, "time": "06:00", "action": "preset:comfort"},
    {"days": WORKDAYS, "time": "22:00", "action": "preset:eco"},
    {"days": [5, 6], "time": "08:00", "action": "preset:comfort"},
    {"days": [5, 6], "time": "23:00", "action": "off"},
]


def test_parse_time() -> None:
    assert parse_time("06:30") == 390
    for bad in ("24:00", "6", "aa:bb", "10:60"):
        with pytest.raises(ValueError):
            parse_time(bad)


def test_action_at_follows_the_latest_point() -> None:
    assert action_at(POINTS, 0, 6 * 60) == "preset:comfort"
    assert action_at(POINTS, 0, 21 * 60 + 59) == "preset:comfort"
    assert action_at(POINTS, 0, 22 * 60) == "preset:eco"
    # Early on a workday the evening point of the day before still applies.
    assert action_at(POINTS, 2, 5 * 60) == "preset:eco"
    # Saturday morning before the first weekend point: Friday evening.
    assert action_at(POINTS, 5, 7 * 60) == "preset:eco"
    # Monday before six: Sunday night wraps around the week.
    assert action_at(POINTS, 0, 60) == "off"
    assert action_at([], 0, 0) is None


def test_is_present() -> None:
    assert is_present("person.jake", "home") is True
    assert is_present("person.jake", "not_home") is False
    assert is_present("device_tracker.phone", "Work") is False
    assert is_present("binary_sensor.phone_online", "on") is True
    assert is_present("binary_sensor.phone_online", "off") is False
    assert is_present("person.jake", "unavailable") is None
    assert is_present("person.jake", None) is None


def test_rule_needs_everyone_away_for_the_delay() -> None:
    assert rule_active([(False, 700)], 600)
    assert not rule_active([(False, 500)], 600)
    assert not rule_active([(False, 700), (True, 5000)], 600)
    # Unknown counts as present and no entities means no rule.
    assert not rule_active([(None, 5000)], 600)
    assert not rule_active([], 0)


def test_room_schedule_wins_over_floor_and_absence_over_both() -> None:
    floor = {"name": "OG", "floors": ["og"], "rooms": [], "points": POINTS}
    room = {
        "name": "Bad",
        "floors": [],
        "rooms": ["bad"],
        "points": [{"days": [0], "time": "00:00", "action": "temperature:23"}],
    }
    rule = {"name": "Weg", "rooms": [], "floors": ["og"], "action": "off"}

    got = desired_for_room("bad", "og", [floor, room], [], 0, 600)
    assert got is not None and (got.action, got.name) == ("temperature:23", "Bad")
    got = desired_for_room("flur", "og", [floor, room], [], 0, 600)
    assert got is not None and got.source == SOURCE_SCHEDULE
    assert got.action == "preset:comfort"
    got = desired_for_room("bad", "og", [floor, room], [rule], 0, 600)
    assert got is not None and (got.action, got.source) == ("off", SOURCE_ABSENCE)
    assert desired_for_room("keller", "ug", [floor, room], [rule], 0, 600) is None


def test_stove_has_hysteresis() -> None:
    assert not stove_burning(39.9, 40, False)
    assert stove_burning(40, 40, False)
    assert stove_burning(36, 40, True)
    assert not stove_burning(35, 40, True)
    assert not stove_burning(None, 40, True)


def test_stove_beats_schedule_but_not_absence() -> None:
    schedule = {"name": "EG", "floors": ["eg"], "rooms": [], "points": POINTS}
    stove = {"name": "Ofen", "actions": {"wohnen": "off", "bad": "preset:eco"}}
    rule = {"name": "Weg", "rooms": ["wohnen"], "floors": [], "action": "preset:away"}

    got = desired_for_room("wohnen", "eg", [schedule], [], 0, 600, [stove])
    assert got is not None and (got.action, got.source) == ("off", "stove")
    got = desired_for_room("kueche", "eg", [schedule], [], 0, 600, [stove])
    assert got is not None and got.source == SOURCE_SCHEDULE
    got = desired_for_room("wohnen", "eg", [schedule], [rule], 0, 600, [stove])
    assert got is not None and got.source == SOURCE_ABSENCE
