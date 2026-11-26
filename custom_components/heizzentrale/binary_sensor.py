"""Binary sensor platform: is a circuit open."""

from __future__ import annotations

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.config_entries import ConfigSubentry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import HeizzentraleConfigEntry
from .const import CONF_VALVE, CONF_VALVE_TYPE, SUBENTRY_CIRCUIT, ValveType
from .entity import SourceTrackingEntity, subentry_device_info
from .model import circuit_open


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HeizzentraleConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Create an "open" sensor for every circuit with an actuator."""
    for subentry in entry.subentries.values():
        if subentry.subentry_type == SUBENTRY_CIRCUIT and subentry.data.get(CONF_VALVE):
            async_add_entities(
                [CircuitOpenBinarySensor(entry.entry_id, subentry)],
                config_subentry_id=subentry.subentry_id,
            )


class CircuitOpenBinarySensor(SourceTrackingEntity, BinarySensorEntity):
    """On while the circuit is open, taking NO/NC actuators into account."""

    _attr_translation_key = "circuit_open"
    _attr_device_class = BinarySensorDeviceClass.OPENING

    def __init__(self, entry_id: str, subentry: ConfigSubentry) -> None:
        """Initialize the binary sensor."""
        self._valve = subentry.data[CONF_VALVE]
        self._normally_open = (
            subentry.data.get(CONF_VALVE_TYPE, ValveType.NORMALLY_CLOSED)
            == ValveType.NORMALLY_OPEN
        )
        self._set_sources((self._valve,))
        self._attr_unique_id = f"{subentry.subentry_id}_open"
        self._attr_device_info = subentry_device_info(entry_id, subentry)

    @callback
    def _recalculate(self) -> None:
        # None (unknown) is shown as "unknown", never as "closed".
        self._attr_is_on = circuit_open(
            self._source_state(self._valve), self._normally_open
        )
