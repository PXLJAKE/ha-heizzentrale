"""Shared entity helpers."""

from __future__ import annotations

from collections.abc import Iterable

from homeassistant.config_entries import ConfigSubentry
from homeassistant.core import Event, EventStateChangedData, callback
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.event import async_track_state_change_event

from .const import DOMAIN


def plant_device_info(entry_id: str, title: str) -> DeviceInfo:
    """Device that represents the whole plant."""
    return DeviceInfo(
        identifiers={(DOMAIN, entry_id)},
        name=title,
        manufacturer="Heizzentrale",
        entry_type=DeviceEntryType.SERVICE,
    )


def subentry_device_info(entry_id: str, subentry: ConfigSubentry) -> DeviceInfo:
    """Device that represents one circuit, buffer, room or heat source."""
    return DeviceInfo(
        identifiers={(DOMAIN, subentry.subentry_id)},
        name=subentry.title,
        manufacturer="Heizzentrale",
        model=subentry.subentry_type,
        entry_type=DeviceEntryType.SERVICE,
        via_device=(DOMAIN, entry_id),
    )


class SourceTrackingEntity(Entity):
    """Entity that is recalculated whenever one of its source entities changes.

    Purely event driven: there is no polling and no timer.
    """

    _attr_should_poll = False
    _attr_has_entity_name = True
    _sources: tuple[str, ...] = ()

    def _set_sources(self, sources: Iterable[str | None]) -> None:
        self._sources = tuple(source for source in sources if source)

    def _source_state(self, entity_id: str | None) -> str | None:
        if not entity_id or (state := self.hass.states.get(entity_id)) is None:
            return None
        return state.state

    @callback
    def _recalculate(self) -> None:
        """Update the entity attributes from the source states."""
        raise NotImplementedError

    async def async_added_to_hass(self) -> None:
        """Start listening to the source entities."""
        await super().async_added_to_hass()
        self._recalculate()
        if not self._sources:
            return

        @callback
        def _changed(event: Event[EventStateChangedData]) -> None:
            self._recalculate()
            self.async_write_ha_state()

        self.async_on_remove(
            async_track_state_change_event(self.hass, self._sources, _changed)
        )
