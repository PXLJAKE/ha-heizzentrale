"""Tests for the flow temperature logic."""

from __future__ import annotations

from custom_components.heizzentrale.flowtemp import flow_step, room_lags, snap


def test_room_lags_only_when_calling_and_clearly_below() -> None:
    assert room_lags(True, 19.0, 21.0)
    assert not room_lags(True, 20.6, 21.0)
    assert not room_lags(False, 15.0, 21.0)
    assert not room_lags(None, 15.0, 21.0)
    assert not room_lags(True, None, 21.0)


def test_snap_avoids_float_noise() -> None:
    assert snap(21.700000000001, 0.1) == 21.7
    assert snap(21.74, 0.5) == 21.5


def test_raises_when_a_room_lags() -> None:
    advice = flow_step(21.0, 19.0, 23.0, 0.5, ["Bad"], 0, 120)
    assert (advice.reason, advice.target, advice.rooms) == ("lagging", 21.5, ["Bad"])


def test_waits_between_raises_and_stops_at_the_limit() -> None:
    assert flow_step(21.0, 19.0, 23.0, 0.5, ["Bad"], 0, 30).reason == "waiting"
    advice = flow_step(23.0, 19.0, 23.0, 0.5, ["Bad"], 0, 500)
    assert (advice.reason, advice.target) == ("at_max", None)


def test_lowers_only_after_long_covered_demand() -> None:
    assert flow_step(21.0, 19.0, 23.0, 0.5, [], 200, 500).reason == "hold"
    assert flow_step(21.0, 19.0, 23.0, 0.5, [], 500, 100).reason == "hold"
    advice = flow_step(21.0, 19.0, 23.0, 0.5, [], 240, 240)
    assert (advice.reason, advice.target) == ("covered", 20.5)
    advice = flow_step(19.0, 19.0, 23.0, 0.5, [], 500, 500)
    assert (advice.reason, advice.target) == ("at_min", None)


def test_never_leaves_the_limits() -> None:
    assert flow_step(22.8, 19.0, 23.0, 0.5, ["Bad"], 0, 500).target == 23.0
    assert flow_step(19.2, 19.0, 23.0, 0.5, [], 500, 500).target == 19.0
    assert flow_step(25.0, 19.0, 23.0, 0.5, [], 0, 0).target == 23.0
    assert flow_step(10.0, 19.0, 23.0, 0.5, ["Bad"], 0, 0).target == 19.0


def test_unknown_value_changes_nothing() -> None:
    assert flow_step(None, 19.0, 23.0, 0.5, ["Bad"], 0, 500).target is None
    assert flow_step(float("nan"), 19.0, 23.0, 0.5, [], 500, 500).target is None
    assert flow_step(21.0, 23.0, 19.0, 0.5, [], 500, 500).target is None
