"""Runtime manager of one plant: calibrated readings and balancing state."""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry, ConfigSubentry
from homeassistant.const import ATTR_UNIT_OF_MEASUREMENT, UnitOfTemperature
from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util
from homeassistant.util.unit_conversion import TemperatureConverter

from .balancing import (
    BalancingResult,
    CircuitInput,
    SpreadHistory,
    analyse,
    calibration_offsets,
)
from .const import (
    CONF_FLOW,
    CONF_RETURN,
    CONF_VALVE,
    CONF_VALVE_TYPE,
    DOMAIN,
    SUBENTRY_CIRCUIT,
    ValveType,
)
from .control import ControlEngine
from .model import circuit_open, parse_float, spread

STORAGE_VERSION = 1
SAMPLE_INTERVAL = timedelta(minutes=1)
MAX_LOG_ENTRIES = 200


def storage_key(entry_id: str) -> str:
    """Return the storage key of a plant."""
    return f"{DOMAIN}.{entry_id}"


def signal_update(entry_id: str) -> str:
    """Dispatcher signal sent when calibrated values or the analysis change."""
    return f"{DOMAIN}_update_{entry_id}"


class PlantManager:
    """Holds everything that lives longer than a single state change.

    Disk writes happen only when the user calibrates sensors or logs a valve
    adjustment, changes schedules or absence rules, or when such a rule or
    schedule switches a thermostat. Never periodically.
    """

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialize the manager."""
        self.hass = hass
        self.entry = entry
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, storage_key(entry.entry_id)
        )
        self.offsets: dict[str, float] = {}
        self.log: list[dict[str, Any]] = []
        self._histories: dict[str, SpreadHistory] = {}
        self._unsub: CALLBACK_TYPE | None = None
        self.result: BalancingResult = analyse([])
        self.control = ControlEngine(hass, self)
        # How the house view is arranged: room order, floors picked in the
        # card and extra sensors shown on tiles.
        self.layout: dict[str, Any] = {}

    # -- lifecycle ----------------------------------------------------------

    async def async_start(self) -> None:
        """Load stored data and start sampling once a minute."""
        if (data := await self._store.async_load()) is not None:
            self.offsets = {
                entity_id: float(value)
                for entity_id, value in data.get("offsets", {}).items()
            }
            self.log = list(data.get("log", []))
            self.control.load(data.get("control", {}))
            self.layout = dict(data.get("layout", {}))
        self._histories = {
            subentry.subentry_id: SpreadHistory() for subentry in self.circuits
        }
        self._unsub = async_track_time_interval(
            self.hass, self._async_sample, SAMPLE_INTERVAL
        )
        self._async_sample(dt_util.utcnow())
        self.control.async_start()

    @callback
    def async_stop(self) -> None:
        """Stop sampling."""
        self.control.async_stop()
        if self._unsub is not None:
            self._unsub()
            self._unsub = None

    async def async_save(self) -> None:
        """Write everything that has to survive a restart."""
        await self._store.async_save(
            {
                "offsets": self.offsets,
                "log": self.log,
                "control": self.control.dump(),
                "layout": self.layout,
            }
        )

    # -- readings -----------------------------------------------------------

    @property
    def circuits(self) -> list[ConfigSubentry]:
        """All circuit subentries of the plant."""
        return [
            subentry
            for subentry in self.entry.subentries.values()
            if subentry.subentry_type == SUBENTRY_CIRCUIT
        ]

    def raw_celsius(self, entity_id: str | None) -> float | None:
        """Temperature of a sensor in °C without calibration."""
        if not entity_id or (state := self.hass.states.get(entity_id)) is None:
            return None
        if (value := parse_float(state.state)) is None:
            return None
        unit = state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
        if unit in (UnitOfTemperature.FAHRENHEIT, UnitOfTemperature.KELVIN):
            return TemperatureConverter.convert(value, unit, UnitOfTemperature.CELSIUS)
        return value

    def celsius(self, entity_id: str | None) -> float | None:
        """Temperature of a sensor in °C including its calibration offset."""
        if (value := self.raw_celsius(entity_id)) is None:
            return None
        return value + self.offsets.get(entity_id or "", 0.0)

    def circuit_spread(self, subentry: ConfigSubentry) -> float | None:
        """Calibrated spread of a circuit."""
        return spread(
            self.celsius(subentry.data.get(CONF_FLOW)),
            self.celsius(subentry.data.get(CONF_RETURN)),
        )

    def circuit_is_open(self, subentry: ConfigSubentry) -> bool | None:
        """Whether a circuit is open. Without an actuator it always is."""
        valve = subentry.data.get(CONF_VALVE)
        if not valve:
            return True
        state = self.hass.states.get(valve)
        return circuit_open(
            state.state if state else None,
            subentry.data.get(CONF_VALVE_TYPE) == ValveType.NORMALLY_OPEN,
        )

    # -- balancing ----------------------------------------------------------

    @callback
    def _async_sample(self, now: datetime) -> None:
        """Record one spread sample per circuit and refresh the analysis."""
        timestamp = now.timestamp()
        inputs: list[CircuitInput] = []
        for subentry in self.circuits:
            history = self._histories.setdefault(subentry.subentry_id, SpreadHistory())
            is_open = self.circuit_is_open(subentry)
            # A closed circuit is not measured; its history restarts on opening.
            history.add(
                timestamp, None if is_open is False else self.circuit_spread(subentry)
            )
            inputs.append(
                CircuitInput(
                    circuit_id=subentry.subentry_id,
                    name=subentry.title,
                    is_open=is_open,
                    mean_spread=history.mean,
                    settled=history.settled,
                )
            )
        self.result = analyse(inputs)
        async_dispatcher_send(self.hass, signal_update(self.entry.entry_id))

    def calibration_sensors(self) -> list[str]:
        """All flow and return sensors of the plant."""
        sensors: list[str] = []
        for subentry in self.circuits:
            for key in (CONF_FLOW, CONF_RETURN):
                entity_id = subentry.data.get(key)
                if entity_id and entity_id not in sensors:
                    sensors.append(entity_id)
        return sensors

    async def async_calibrate(self) -> dict[str, float]:
        """Store offsets so that all pipe sensors read the same right now.

        Raises ``CalibrationError`` when the readings do not allow it.
        """
        readings = {
            entity_id: self.raw_celsius(entity_id)
            for entity_id in self.calibration_sensors()
        }
        self.offsets = calibration_offsets(readings)
        await self._async_after_change()
        return self.offsets

    async def async_clear_calibration(self) -> None:
        """Remove all calibration offsets."""
        self.offsets = {}
        await self._async_after_change()

    async def async_log_adjustment(
        self, circuit_id: str, turns: float, note: str | None = None
    ) -> dict[str, Any]:
        """Remember a manual valve adjustment so it can be undone by hand.

        Positive turns mean "closed further", negative "opened further".
        """
        subentry = self.entry.subentries[circuit_id]
        item: dict[str, Any] = {
            "time": dt_util.utcnow().isoformat(),
            "circuit": circuit_id,
            "name": subentry.title,
            "turns": turns,
            "spreads": {
                result.circuit_id: result.spread for result in self.result.circuits
            },
        }
        if note:
            item["note"] = note
        self.log = [*self.log, item][-MAX_LOG_ENTRIES:]
        await self._async_after_change()
        return item

    async def _async_after_change(self) -> None:
        """Persist, restart the measurement and publish the new state."""
        await self.async_save()
        for history in self._histories.values():
            history.clear()
        self._async_sample(dt_util.utcnow())
