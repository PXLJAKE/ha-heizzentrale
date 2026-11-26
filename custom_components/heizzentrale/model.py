"""Pure calculation helpers.

This module must not import Home Assistant. Everything in here works on
plain values so it can be tested without a running instance.
"""

from __future__ import annotations

from collections.abc import Iterable

_UNKNOWN = {"unknown", "unavailable", "none", ""}
_ON_STATES = {"on", "open", "opening"}
_OFF_STATES = {"off", "closed", "closing"}


def parse_float(value: object) -> float | None:
    """Return ``value`` as float, or ``None`` if it is not a usable number."""
    if value is None:
        return None
    if isinstance(value, str) and value.strip().lower() in _UNKNOWN:
        return None
    try:
        number = float(value)  # type: ignore[arg-type]
    except (TypeError, ValueError):
        return None
    if number != number or number in (float("inf"), float("-inf")):
        return None
    return number


def spread(flow: float | None, ret: float | None) -> float | None:
    """Return flow minus return in the unit of the inputs, rounded to 0.1."""
    if flow is None or ret is None:
        return None
    return round(flow - ret, 1)


def mean(values: Iterable[float | None]) -> float | None:
    """Return the mean of all usable values, ``None`` if there are none."""
    usable = [value for value in values if value is not None]
    if not usable:
        return None
    return round(sum(usable) / len(usable), 1)


def circuit_open(actuator_state: str | None, normally_open: bool) -> bool | None:
    """Translate the state of an actuator relay or valve into "circuit open".

    A switch that powers a normally closed actuator opens the circuit when it
    is on. With a normally open actuator it is the other way round. Valve
    entities report open/closed directly and are not inverted.

    Returns ``None`` when the state is unknown, so callers can treat the
    circuit as "possibly open" instead of guessing.
    """
    if actuator_state is None:
        return None
    state = actuator_state.strip().lower()
    if state in ("open", "opening"):
        return True
    if state in ("closed", "closing"):
        return False
    if state in _ON_STATES:
        return not normally_open
    if state in _OFF_STATES:
        return normally_open
    return None
