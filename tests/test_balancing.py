"""Tests for the pure balancing logic."""

from __future__ import annotations

import pytest

from custom_components.heizzentrale.balancing import (
    BalancingState,
    CalibrationError,
    CircuitInput,
    CircuitVerdict,
    SpreadHistory,
    analyse,
    calibration_offsets,
)


def _c(
    cid: str, spread: float | None, is_open: bool | None = True, settled: bool = True
) -> CircuitInput:
    return CircuitInput(cid, cid.upper(), is_open, spread, settled)


def test_history_needs_steady_coverage() -> None:
    """A circuit is settled after 20 steady minutes, not before."""
    history = SpreadHistory()
    for minute in range(19):
        history.add(minute * 60, 10.0)
    assert not history.settled
    for minute in range(19, 22):
        history.add(minute * 60, 10.4)
    assert history.settled
    assert history.mean == pytest.approx(10.05, abs=0.01)


def test_history_detects_swings_and_gaps() -> None:
    """Large swings or a missing value mean "not settled"."""
    history = SpreadHistory()
    for minute in range(25):
        history.add(minute * 60, 10.0 if minute % 2 else 13.0)
    assert not history.settled
    history.add(26 * 60, None)
    assert history.mean is None
    assert history.coverage == 0.0


def test_history_drops_old_samples() -> None:
    """Only the window counts."""
    history = SpreadHistory(window=600)
    history.add(0, 30.0)
    for second in range(700, 1300, 60):
        history.add(second, 10.0)
    assert history.mean == 10.0


def test_balanced() -> None:
    """All circuits within the tolerance are fine."""
    result = analyse([_c("eg", 10.0), _c("og", 11.5), _c("dg", 9.0)])
    assert result.state is BalancingState.BALANCED
    assert result.target == pytest.approx(10.2, abs=0.05)
    assert result.recommend_circuit is None


def test_recommends_smallest_spread() -> None:
    """The circuit with the smallest spread is throttled by half a turn."""
    result = analyse([_c("eg", 5.0), _c("og", 12.0), _c("dg", 13.0)])
    assert result.state is BalancingState.ADJUST
    assert result.recommend_circuit == "eg"
    assert result.recommend_turns == 0.5
    verdicts = {item.circuit_id: item.verdict for item in result.circuits}
    assert verdicts == {
        "eg": CircuitVerdict.TOO_MUCH_FLOW,
        "og": CircuitVerdict.OK,
        "dg": CircuitVerdict.TOO_LITTLE_FLOW,
    }
    assert result.circuits[0].deviation == -5.0


def test_closed_and_dead_circuits_are_left_out() -> None:
    """Closed circuits and circuits without heat flow do not distort the mean."""
    result = analyse(
        [
            _c("eg", 10.0),
            _c("og", 11.0),
            _c("dg", 1.4, is_open=False),
            _c("saal", 0.5),
            _c("x", None),
        ]
    )
    assert result.state is BalancingState.BALANCED
    assert result.target == 10.5
    verdicts = {item.circuit_id: item.verdict for item in result.circuits}
    assert verdicts["dg"] is CircuitVerdict.CLOSED
    assert verdicts["saal"] is CircuitVerdict.NO_FLOW
    assert verdicts["x"] is CircuitVerdict.NO_DATA


def test_unknown_valve_state_counts_as_open() -> None:
    """A circuit whose actuator state is unknown is still measured."""
    result = analyse([_c("eg", 10.0, is_open=None), _c("og", 10.5)])
    assert result.state is BalancingState.BALANCED


def test_no_recommendation_while_settling() -> None:
    """No valve is recommended before every circuit has settled."""
    result = analyse([_c("eg", 5.0), _c("og", 12.0, settled=False)])
    assert result.state is BalancingState.SETTLING
    assert result.settling == ("og",)
    assert result.recommend_circuit is None


def test_needs_two_circuits() -> None:
    """One circuit cannot be balanced against anything."""
    result = analyse([_c("eg", 10.0), _c("og", None)])
    assert result.state is BalancingState.NOT_ENOUGH_CIRCUITS


def test_calibration_offsets() -> None:
    """Offsets bring every sensor to the common mean."""
    offsets = calibration_offsets({"a": 40.0, "b": 40.6, "c": 39.4})
    assert offsets == {"a": 0.0, "b": -0.6, "c": 0.6}


@pytest.mark.parametrize(
    ("readings", "reason"),
    [
        ({"a": 40.0}, "too_few_sensors"),
        ({"a": 40.0, "b": None}, "sensor_unavailable"),
        ({"a": 40.0, "b": 45.0}, "not_equalised"),
    ],
)
def test_calibration_refuses_bad_readings(
    readings: dict[str, float | None], reason: str
) -> None:
    """Calibration never hides a real temperature difference."""
    with pytest.raises(CalibrationError, match=reason):
        calibration_offsets(readings)
