"""Tests for the pure calculation helpers."""

from __future__ import annotations

import pytest

from custom_components.heizzentrale.model import (
    circuit_open,
    mean,
    parse_float,
    spread,
)


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("21.5", 21.5),
        (3, 3.0),
        ("unknown", None),
        ("unavailable", None),
        ("", None),
        (None, None),
        ("abc", None),
        ("nan", None),
        ("inf", None),
    ],
)
def test_parse_float(value: object, expected: float | None) -> None:
    """Only real numbers are accepted."""
    assert parse_float(value) == expected


def test_spread() -> None:
    """Spread is flow minus return and unknown if one side is missing."""
    assert spread(56.0, 44.25) == 11.8
    assert spread(40.0, 42.0) == -2.0
    assert spread(None, 40.0) is None
    assert spread(40.0, None) is None


def test_mean_ignores_missing_values() -> None:
    """Missing sensors do not distort the mean."""
    assert mean([60.0, None, 40.0]) == 50.0
    assert mean([None, None]) is None
    assert mean([]) is None


@pytest.mark.parametrize(
    ("state", "normally_open", "expected"),
    [
        ("on", False, True),  # NC actuator powered -> open
        ("off", False, False),  # NC actuator without power -> closed
        ("on", True, False),  # NO actuator powered -> closed
        ("off", True, True),  # NO actuator without power -> open
        ("open", False, True),  # valve entities are never inverted
        ("open", True, True),
        ("closed", True, False),
        ("unavailable", False, None),
        ("unknown", True, None),
        (None, False, None),
    ],
)
def test_circuit_open(
    state: str | None, normally_open: bool, expected: bool | None
) -> None:
    """Relay state is translated according to the actuator type."""
    assert circuit_open(state, normally_open) is expected
