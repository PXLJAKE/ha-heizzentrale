"""The Heizzentrale integration."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import DEFAULT_MODE, OperatingMode

PLATFORMS: list[Platform] = [Platform.SELECT]


@dataclass
class HeizzentraleData:
    """Runtime data of one heating plant."""

    mode: OperatingMode = DEFAULT_MODE


type HeizzentraleConfigEntry = ConfigEntry[HeizzentraleData]


async def async_setup_entry(
    hass: HomeAssistant, entry: HeizzentraleConfigEntry
) -> bool:
    """Set up a heating plant from a config entry."""
    entry.runtime_data = HeizzentraleData()
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(
    hass: HomeAssistant, entry: HeizzentraleConfigEntry
) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
