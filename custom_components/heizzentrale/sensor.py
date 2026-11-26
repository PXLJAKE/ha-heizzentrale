"""Sensor platform: spread per circuit and mean buffer temperature."""

from __future__ import annotations

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigSubentry
from homeassistant.const import ATTR_UNIT_OF_MEASUREMENT, UnitOfTemperature
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.util.unit_conversion import TemperatureConverter

from . import HeizzentraleConfigEntry
from .const import (
    CONF_FLOW,
    CONF_RETURN,
    CONF_SENSORS,
    SUBENTRY_BUFFER,
    SUBENTRY_CIRCUIT,
)
from .entity import SourceTrackingEntity, subentry_device_info
from .model import mean, parse_float, spread


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HeizzentraleConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Create the sensors of all circuits and buffers."""
    for subentry in entry.subentries.values():
        if (
            subentry.subentry_type == SUBENTRY_CIRCUIT
            and subentry.data.get(CONF_FLOW)
            and subentry.data.get(CONF_RETURN)
        ):
            async_add_entities(
                [CircuitSpreadSensor(entry.entry_id, subentry)],
                config_subentry_id=subentry.subentry_id,
            )
        elif subentry.subentry_type == SUBENTRY_BUFFER and subentry.data.get(
            CONF_SENSORS
        ):
            async_add_entities(
                [BufferMeanSensor(entry.entry_id, subentry)],
                config_subentry_id=subentry.subentry_id,
            )


class _TemperatureSourceSensor(SourceTrackingEntity, SensorEntity):
    """Base for sensors calculated from temperature sensors."""

    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 1

    def _celsius(self, entity_id: str | None) -> float | None:
        """Return the temperature of a source sensor in °C."""
        if not entity_id or (state := self.hass.states.get(entity_id)) is None:
            return None
        if (value := parse_float(state.state)) is None:
            return None
        unit = state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
        if unit in (UnitOfTemperature.FAHRENHEIT, UnitOfTemperature.KELVIN):
            return TemperatureConverter.convert(value, unit, UnitOfTemperature.CELSIUS)
        return value


class CircuitSpreadSensor(_TemperatureSourceSensor):
    """Flow temperature minus return temperature of one circuit."""

    _attr_translation_key = "spread"
    _attr_device_class = SensorDeviceClass.TEMPERATURE_DELTA
    _attr_native_unit_of_measurement = UnitOfTemperature.KELVIN

    def __init__(self, entry_id: str, subentry: ConfigSubentry) -> None:
        """Initialize the sensor."""
        self._flow = subentry.data[CONF_FLOW]
        self._return = subentry.data[CONF_RETURN]
        self._set_sources((self._flow, self._return))
        self._attr_unique_id = f"{subentry.subentry_id}_spread"
        self._attr_device_info = subentry_device_info(entry_id, subentry)

    @callback
    def _recalculate(self) -> None:
        self._attr_native_value = spread(
            self._celsius(self._flow), self._celsius(self._return)
        )


class BufferMeanSensor(_TemperatureSourceSensor):
    """Mean temperature of all buffer sensors."""

    _attr_translation_key = "buffer_mean"
    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS

    def __init__(self, entry_id: str, subentry: ConfigSubentry) -> None:
        """Initialize the sensor."""
        self._sensor_ids: list[str] = list(subentry.data[CONF_SENSORS])
        self._set_sources(self._sensor_ids)
        self._attr_unique_id = f"{subentry.subentry_id}_buffer_mean"
        self._attr_device_info = subentry_device_info(entry_id, subentry)

    @callback
    def _recalculate(self) -> None:
        self._attr_native_value = mean(
            self._celsius(entity_id) for entity_id in self._sensor_ids
        )
