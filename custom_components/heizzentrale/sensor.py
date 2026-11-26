"""Sensor platform: spread per circuit, buffer mean and balancing state."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigSubentry
from homeassistant.const import UnitOfTemperature
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import HeizzentraleConfigEntry
from .balancing import BalancingState
from .const import (
    CONF_FLOW,
    CONF_RETURN,
    CONF_SENSORS,
    SUBENTRY_BUFFER,
    SUBENTRY_CIRCUIT,
)
from .entity import SourceTrackingEntity, plant_device_info, subentry_device_info
from .manager import PlantManager, signal_update
from .model import mean


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HeizzentraleConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Create the sensors of the plant, its circuits and buffers."""
    manager = entry.runtime_data.manager
    async_add_entities([BalancingSensor(entry, manager)])
    for subentry in entry.subentries.values():
        if (
            subentry.subentry_type == SUBENTRY_CIRCUIT
            and subentry.data.get(CONF_FLOW)
            and subentry.data.get(CONF_RETURN)
        ):
            async_add_entities(
                [CircuitSpreadSensor(manager, subentry)],
                config_subentry_id=subentry.subentry_id,
            )
        elif subentry.subentry_type == SUBENTRY_BUFFER and subentry.data.get(
            CONF_SENSORS
        ):
            async_add_entities(
                [BufferMeanSensor(manager, subentry)],
                config_subentry_id=subentry.subentry_id,
            )


class CircuitSpreadSensor(SourceTrackingEntity, SensorEntity):
    """Flow temperature minus return temperature of one circuit."""

    _attr_translation_key = "spread"
    _attr_device_class = SensorDeviceClass.TEMPERATURE_DELTA
    _attr_native_unit_of_measurement = UnitOfTemperature.KELVIN
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 1

    def __init__(self, manager: PlantManager, subentry: ConfigSubentry) -> None:
        """Initialize the sensor."""
        self._manager = manager
        self._subentry = subentry
        self._set_sources((subentry.data[CONF_FLOW], subentry.data[CONF_RETURN]))
        self._attr_unique_id = f"{subentry.subentry_id}_spread"
        self._attr_device_info = subentry_device_info(manager.entry.entry_id, subentry)

    @callback
    def _recalculate(self) -> None:
        self._attr_native_value = self._manager.circuit_spread(self._subentry)

    async def async_added_to_hass(self) -> None:
        """Also follow calibration changes."""
        await super().async_added_to_hass()

        @callback
        def _updated() -> None:
            previous = self._attr_native_value
            self._recalculate()
            if self._attr_native_value != previous:
                self.async_write_ha_state()

        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, signal_update(self._manager.entry.entry_id), _updated
            )
        )


class BufferMeanSensor(SourceTrackingEntity, SensorEntity):
    """Mean temperature of all buffer sensors."""

    _attr_translation_key = "buffer_mean"
    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 1

    def __init__(self, manager: PlantManager, subentry: ConfigSubentry) -> None:
        """Initialize the sensor."""
        self._manager = manager
        self._sensor_ids: list[str] = list(subentry.data[CONF_SENSORS])
        self._set_sources(self._sensor_ids)
        self._attr_unique_id = f"{subentry.subentry_id}_buffer_mean"
        self._attr_device_info = subentry_device_info(manager.entry.entry_id, subentry)

    @callback
    def _recalculate(self) -> None:
        self._attr_native_value = mean(
            self._manager.raw_celsius(entity_id) for entity_id in self._sensor_ids
        )


class BalancingSensor(SensorEntity):
    """Result of the hydraulic balancing analysis for the whole plant."""

    _attr_should_poll = False
    _attr_has_entity_name = True
    _attr_translation_key = "balancing"
    _attr_device_class = SensorDeviceClass.ENUM
    _attr_options = [state.value for state in BalancingState]  # noqa: RUF012
    # The details change every minute and are explained in the UI; keeping
    # them out of the recorder saves disk writes.
    _unrecorded_attributes = frozenset({"target", "recommendation", "circuits"})

    def __init__(self, entry: HeizzentraleConfigEntry, manager: PlantManager) -> None:
        """Initialize the sensor."""
        self._manager = manager
        self._attr_unique_id = f"{entry.entry_id}_balancing"
        self._attr_device_info = plant_device_info(entry.entry_id, entry.title)

    @property
    def native_value(self) -> str:
        """Return the overall state."""
        return self._manager.result.state.value

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the details of the analysis."""
        result = self._manager.result
        names = {item.circuit_id: item.name for item in result.circuits}
        recommendation = None
        if result.recommend_circuit:
            recommendation = {
                "circuit": names.get(result.recommend_circuit),
                "close_by_turns": result.recommend_turns,
            }
        return {
            "target": result.target,
            "recommendation": recommendation,
            "circuits": {
                item.name: {
                    "verdict": item.verdict.value,
                    "spread": item.spread,
                    "deviation": item.deviation,
                }
                for item in result.circuits
            },
        }

    async def async_added_to_hass(self) -> None:
        """Update whenever the manager has a new analysis."""
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                signal_update(self._manager.entry.entry_id),
                self.async_write_ha_state,
            )
        )
