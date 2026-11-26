"""Select platform: operating mode of the heating plant."""

from __future__ import annotations

from homeassistant.components.select import SelectEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.restore_state import RestoreEntity

from . import HeizzentraleConfigEntry
from .const import DEFAULT_MODE, OperatingMode
from .entity import plant_device_info


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HeizzentraleConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the mode select of a plant."""
    async_add_entities([OperatingModeSelect(entry)])


class OperatingModeSelect(SelectEntity, RestoreEntity):
    """Lets the user choose between off, observe and active."""

    _attr_has_entity_name = True
    _attr_translation_key = "operating_mode"
    _attr_entity_category = EntityCategory.CONFIG
    _attr_options = [mode.value for mode in OperatingMode]  # noqa: RUF012

    def __init__(self, entry: HeizzentraleConfigEntry) -> None:
        """Initialize the select."""
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_operating_mode"
        self._attr_device_info = plant_device_info(entry.entry_id, entry.title)

    @property
    def current_option(self) -> str:
        """Return the current mode."""
        return self._entry.runtime_data.mode.value

    async def async_added_to_hass(self) -> None:
        """Restore the last mode; unknown values fall back to the safe default."""
        await super().async_added_to_hass()
        mode = DEFAULT_MODE
        if (last := await self.async_get_last_state()) is not None:
            try:
                mode = OperatingMode(last.state)
            except ValueError:
                mode = DEFAULT_MODE
        self._entry.runtime_data.mode = mode
        self._entry.runtime_data.mode_restored = True

    async def async_select_option(self, option: str) -> None:
        """Change the mode."""
        self._entry.runtime_data.mode = OperatingMode(option)
        self.async_write_ha_state()
        # Switch right away, or hand everything back when switching ends.
        await self._entry.runtime_data.manager.control.async_run()
