"""Tests for preheating."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta

from custom_components.heizzentrale.preheat import (
    Learner,
    blend,
    lead_minutes,
    phase_rate,
)
from custom_components.heizzentrale.scheduling import next_point

T0 = datetime(2026, 11, 26, 5, 0, tzinfo=UTC)


def test_phase_rate_needs_a_real_heating_phase() -> None:
    assert phase_rate(18.0, 20.0, 60) == 2.0
    assert phase_rate(18.0, 19.0, 30) == 2.0
    assert phase_rate(18.0, 20.0, 10) is None  # too short
    assert phase_rate(20.0, 20.2, 60) is None  # hardly warmer


def test_blend_clamps_and_weights() -> None:
    assert blend(None, 2.0) == 2.0
    assert blend(None, 50.0) == 6.0
    assert blend(None, 0.01) == 0.2
    assert blend(1.0, 2.0) == 1.3


def test_lead_minutes() -> None:
    assert lead_minutes(18.0, 21.0, 1.5, 180) == 120
    assert lead_minutes(18.0, 21.0, 0.5, 180) == 180  # capped
    assert lead_minutes(20.9, 21.0, 1.0, 180) == 0
    assert lead_minutes(22.0, 21.0, 1.0, 180) == 0
    assert lead_minutes(18.0, 21.0, None, 180) is None
    assert lead_minutes(None, 21.0, 1.0, 180) is None
    assert lead_minutes(18.0, 21.0, 0.0, 180) is None


def test_learner_measures_a_heating_phase() -> None:
    learner = Learner()
    assert not learner.observe("bad", True, 18.0, T0)
    assert not learner.observe("bad", True, 19.0, T0 + timedelta(minutes=30))
    assert learner.observe("bad", False, 20.0, T0 + timedelta(minutes=60))
    assert learner.rates == {"bad": 2.0}
    # A short cycle at the setpoint teaches nothing.
    learner.observe("bad", True, 20.0, T0 + timedelta(minutes=70))
    assert not learner.observe("bad", False, 20.1, T0 + timedelta(minutes=75))
    assert learner.rates == {"bad": 2.0}


def test_learner_closes_endless_phases() -> None:
    learner = Learner()
    learner.observe("bad", True, 16.0, T0)
    assert learner.observe("bad", True, 19.0, T0 + timedelta(minutes=180))
    assert learner.rates == {"bad": 1.0}
    # The next phase started right there.
    assert learner.observe("bad", False, 21.0, T0 + timedelta(minutes=240))
    assert learner.rates == {"bad": 1.3}


def test_learner_targets_and_cleanup() -> None:
    learner = Learner()
    assert learner.note_target("bad", "preset:comfort", 22.0)
    assert not learner.note_target("bad", "preset:comfort", 22.0)
    assert learner.target_for("bad", "preset:comfort") == 22.0
    assert learner.target_for("bad", "temperature:21.5") == 21.5
    assert learner.target_for("bad", "preset:eco") is None
    assert learner.target_for("bad", "off") is None
    learner.rates["weg"] = 1.0
    learner.forget({"bad"})
    assert "weg" not in learner.rates
    restored = Learner()
    restored.load({"rates": {"a": 1.5, "b": 99, "c": "x"}, "targets": {"a": {"on": 1}}})
    assert restored.rates == {"a": 1.5}


def test_next_point_wraps_around_the_week() -> None:
    points = [
        {"days": [0, 1, 2, 3, 4], "time": "06:00", "action": "preset:comfort"},
        {"days": [0, 1, 2, 3, 4], "time": "22:00", "action": "preset:eco"},
    ]
    assert next_point(points, 0, 5 * 60) == ("preset:comfort", 60, 360)
    assert next_point(points, 0, 6 * 60) == ("preset:eco", 16 * 60, 22 * 60)
    # Friday night: the next point is Monday morning.
    action, wait, _ = next_point(points, 4, 23 * 60)
    assert (action, wait) == ("preset:comfort", 24 * 60 * 2 + 7 * 60)
    assert next_point([], 0, 0) is None
