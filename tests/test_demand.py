"""Tests for the demand logic of strands and pumps."""

from __future__ import annotations

from custom_components.heizzentrale.demand import (
    RoomReading,
    circuit_advice,
    pump_advice,
    room_calls,
)

HEATING = RoomReading("Bad", "heat", "heating", 20, 22)
IDLE = RoomReading("Flur", "heat", "idle", 21, 20)


def test_room_calls() -> None:
    assert room_calls(HEATING) is True
    assert room_calls(IDLE) is False
    assert room_calls(RoomReading("x", "off", "heating")) is False
    assert room_calls(RoomReading("x", "heat", "heating", window_open=True)) is False
    assert room_calls(RoomReading("x", "unavailable")) is None
    assert room_calls(RoomReading("x", None)) is None
    # Without a heating state the temperatures decide.
    assert room_calls(RoomReading("x", "heat", None, 19.0, 20.0)) is True
    assert room_calls(RoomReading("x", "heat", None, 19.9, 20.0)) is False
    assert room_calls(RoomReading("x", "heat", None, None, 20.0)) is None


def test_circuit_opens_for_calling_room() -> None:
    advice = circuit_advice([HEATING, IDLE], False, True, 0)
    assert (advice.wanted, advice.action, advice.rooms) == (True, "open", ["Bad"])
    assert circuit_advice([HEATING], True, True, 0).action is None


def test_circuit_closes_only_after_waiting() -> None:
    waiting = circuit_advice([IDLE], True, True, 3)
    assert (waiting.wanted, waiting.reason, waiting.action) == (True, "waiting", None)
    done = circuit_advice([IDLE], True, True, 10)
    assert (done.wanted, done.action) == (False, "close")
    # Already closed and still within the wait: nothing reopens it.
    assert circuit_advice([IDLE], False, True, 3).action is None


def test_circuit_stays_open_when_in_doubt() -> None:
    assert circuit_advice([], True, True, 99).reason == "no_rooms"
    unknown = circuit_advice(
        [IDLE, RoomReading("Büro", "unavailable")], False, True, 99
    )
    assert (unknown.wanted, unknown.action, unknown.rooms) == (True, "open", ["Büro"])
    # Without an actuator there is never anything to switch.
    assert circuit_advice([IDLE], True, False, 99).action is None


def test_pump_follows_its_circuits() -> None:
    assert pump_advice([False, True], False, True).action == "on"
    assert pump_advice([False, False], True, True).action == "off"
    assert pump_advice([False, False], False, True).action is None
    assert pump_advice([], False, True).action == "on"
    # A mode set by hand is left alone, and so is a pump without a switch.
    manual = pump_advice([False], None, True)
    assert (manual.reason, manual.action) == ("manual", None)
    assert pump_advice([False], True, False).action is None
