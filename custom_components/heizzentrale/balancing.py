"""Pure logic of the hydraulic balancing assistant.

The method: all circuits should end up with roughly the same spread (flow
minus return). A circuit with a small spread gets more water than it needs,
so it is throttled a little, then everything is measured again.

This module must not import Home Assistant.
"""

from __future__ import annotations

from collections import deque
from collections.abc import Mapping
from dataclasses import dataclass, field
from enum import StrEnum

DEFAULT_TOLERANCE = 2.0  # K, circuits within +/- this of the mean are fine
DEFAULT_WINDOW = 30 * 60  # s, measurements are averaged over this time
MIN_COVERAGE = 20 * 60  # s, history needed before a judgement is made
MAX_FLUCTUATION = 1.5  # K, larger swings mean "not settled yet"
MIN_SPREAD = 1.0  # K, below this there is no real heat flow to judge
MAX_CALIBRATION_RANGE = 3.0  # K, sensors further apart are not equalised
DEFAULT_TURNS = 0.5  # recommended throttle step in turns


class BalancingState(StrEnum):
    """Overall result of the analysis."""

    NOT_ENOUGH_CIRCUITS = "not_enough_circuits"
    SETTLING = "settling"
    ADJUST = "adjust"
    BALANCED = "balanced"


class CircuitVerdict(StrEnum):
    """Result for one circuit."""

    NO_DATA = "no_data"
    CLOSED = "closed"
    NO_FLOW = "no_flow"
    SETTLING = "settling"
    OK = "ok"
    TOO_MUCH_FLOW = "too_much_flow"  # spread too small -> throttle
    TOO_LITTLE_FLOW = "too_little_flow"  # spread too large -> open up


class SpreadHistory:
    """Recent spread samples of one circuit."""

    def __init__(self, window: float = DEFAULT_WINDOW) -> None:
        """Create an empty history covering ``window`` seconds."""
        self._window = window
        self._samples: deque[tuple[float, float]] = deque()

    def add(self, timestamp: float, value: float | None) -> None:
        """Add a sample. A missing value clears the history: no guessing."""
        if value is None:
            self._samples.clear()
            return
        self._samples.append((timestamp, value))
        while self._samples and self._samples[0][0] < timestamp - self._window:
            self._samples.popleft()

    def clear(self) -> None:
        """Forget everything, e.g. after a valve was adjusted."""
        self._samples.clear()

    @property
    def coverage(self) -> float:
        """Seconds between the oldest and the newest sample."""
        if len(self._samples) < 2:
            return 0.0
        return self._samples[-1][0] - self._samples[0][0]

    @property
    def mean(self) -> float | None:
        """Mean spread over the window."""
        if not self._samples:
            return None
        return sum(value for _, value in self._samples) / len(self._samples)

    @property
    def fluctuation(self) -> float | None:
        """Difference between the largest and the smallest sample."""
        if not self._samples:
            return None
        values = [value for _, value in self._samples]
        return max(values) - min(values)

    @property
    def settled(self) -> bool:
        """True when there is enough steady history to judge the circuit."""
        fluctuation = self.fluctuation
        return (
            self.coverage >= MIN_COVERAGE
            and fluctuation is not None
            and fluctuation <= MAX_FLUCTUATION
        )


@dataclass(frozen=True)
class CircuitInput:
    """What the analysis needs to know about one circuit."""

    circuit_id: str
    name: str
    is_open: bool | None
    mean_spread: float | None
    settled: bool


@dataclass(frozen=True)
class CircuitResult:
    """Analysis result of one circuit."""

    circuit_id: str
    name: str
    verdict: CircuitVerdict
    spread: float | None = None
    deviation: float | None = None


@dataclass(frozen=True)
class BalancingResult:
    """Analysis result of the whole plant."""

    state: BalancingState
    target: float | None = None
    circuits: tuple[CircuitResult, ...] = ()
    recommend_circuit: str | None = None
    recommend_turns: float = 0.0
    settling: tuple[str, ...] = field(default_factory=tuple)


def analyse(
    circuits: list[CircuitInput], tolerance: float = DEFAULT_TOLERANCE
) -> BalancingResult:
    """Compare the spreads of all open circuits and recommend one step.

    Only one valve is recommended per round: the circuit with the smallest
    spread. Changing one valve shifts the flow in all others, so everything
    has to be measured again afterwards.
    """
    results: dict[str, CircuitResult] = {}
    candidates: list[CircuitInput] = []
    settling: list[str] = []

    for circuit in circuits:
        verdict: CircuitVerdict | None = None
        if circuit.is_open is False:
            verdict = CircuitVerdict.CLOSED
        elif circuit.mean_spread is None:
            verdict = CircuitVerdict.NO_DATA
        elif circuit.mean_spread < MIN_SPREAD:
            verdict = CircuitVerdict.NO_FLOW
        if verdict is not None:
            results[circuit.circuit_id] = CircuitResult(
                circuit.circuit_id, circuit.name, verdict, _round(circuit.mean_spread)
            )
            continue
        candidates.append(circuit)
        if not circuit.settled:
            settling.append(circuit.circuit_id)

    def ordered() -> tuple[CircuitResult, ...]:
        return tuple(results[circuit.circuit_id] for circuit in circuits)

    if len(candidates) < 2:
        for circuit in candidates:
            results[circuit.circuit_id] = CircuitResult(
                circuit.circuit_id,
                circuit.name,
                CircuitVerdict.SETTLING if not circuit.settled else CircuitVerdict.OK,
                _round(circuit.mean_spread),
            )
        return BalancingResult(BalancingState.NOT_ENOUGH_CIRCUITS, circuits=ordered())

    spreads = [circuit.mean_spread for circuit in candidates]
    target = sum(spreads) / len(spreads)  # type: ignore[arg-type]

    if settling:
        for circuit in candidates:
            results[circuit.circuit_id] = CircuitResult(
                circuit.circuit_id,
                circuit.name,
                CircuitVerdict.OK if circuit.settled else CircuitVerdict.SETTLING,
                _round(circuit.mean_spread),
                _round(circuit.mean_spread - target),  # type: ignore[operator]
            )
        return BalancingResult(
            BalancingState.SETTLING,
            target=_round(target),
            circuits=ordered(),
            settling=tuple(settling),
        )

    for circuit in candidates:
        deviation = circuit.mean_spread - target  # type: ignore[operator]
        if deviation < -tolerance:
            verdict = CircuitVerdict.TOO_MUCH_FLOW
        elif deviation > tolerance:
            verdict = CircuitVerdict.TOO_LITTLE_FLOW
        else:
            verdict = CircuitVerdict.OK
        results[circuit.circuit_id] = CircuitResult(
            circuit.circuit_id,
            circuit.name,
            verdict,
            _round(circuit.mean_spread),
            _round(deviation),
        )

    if all(
        results[circuit.circuit_id].verdict is CircuitVerdict.OK
        for circuit in candidates
    ):
        return BalancingResult(
            BalancingState.BALANCED, target=_round(target), circuits=ordered()
        )

    smallest = min(candidates, key=lambda circuit: circuit.mean_spread or 0.0)
    return BalancingResult(
        BalancingState.ADJUST,
        target=_round(target),
        circuits=ordered(),
        recommend_circuit=smallest.circuit_id,
        recommend_turns=DEFAULT_TURNS,
    )


class CalibrationError(ValueError):
    """Calibration is not possible with these readings."""


def calibration_offsets(readings: Mapping[str, float | None]) -> dict[str, float]:
    """Return an offset per sensor so that all of them show the same value.

    Call this while all sensors should measure the same temperature: heat
    source off, pump running, all circuits open, after 20 to 30 minutes.

    Raises ``CalibrationError`` with a reason code when a sensor is missing,
    fewer than two sensors exist or the readings are too far apart to be
    explained by sensor tolerance.
    """
    if len(readings) < 2:
        raise CalibrationError("too_few_sensors")
    if any(value is None for value in readings.values()):
        raise CalibrationError("sensor_unavailable")
    values = [value for value in readings.values() if value is not None]
    if max(values) - min(values) > MAX_CALIBRATION_RANGE:
        raise CalibrationError("not_equalised")
    mean = sum(values) / len(values)
    return {
        entity_id: round(mean - value, 2)
        for entity_id, value in readings.items()
        if value is not None
    }


def _round(value: float | None) -> float | None:
    return None if value is None else round(value, 1)
