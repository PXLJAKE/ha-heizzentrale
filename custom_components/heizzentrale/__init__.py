"""The Heizzentrale integration."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.storage import Store
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from .const import CARD_FILENAME, DEFAULT_MODE, DOMAIN, FRONTEND_URL, OperatingMode
from .manager import PlantManager, storage_key
from .websocket_api import async_register_websocket_api

PLATFORMS: list[Platform] = [Platform.BINARY_SENSOR, Platform.SELECT, Platform.SENSOR]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


@dataclass
class HeizzentraleData:
    """Runtime data of one heating plant."""

    manager: PlantManager
    mode: OperatingMode = field(default=DEFAULT_MODE)


type HeizzentraleConfigEntry = ConfigEntry[HeizzentraleData]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the websocket API and serve the dashboard card."""
    async_register_websocket_api(hass)

    frontend_dir = Path(__file__).parent / "frontend"
    await hass.http.async_register_static_paths(
        [StaticPathConfig(FRONTEND_URL, str(frontend_dir), cache_headers=False)]
    )
    if "frontend" in hass.config.components:
        # Imported lazily: the card is optional and tests run without frontend.
        from homeassistant.components.frontend import (
            add_extra_js_url,
        )

        integration = await async_get_integration(hass, DOMAIN)
        add_extra_js_url(
            hass, f"{FRONTEND_URL}/{CARD_FILENAME}?v={integration.version}"
        )
    return True


async def async_setup_entry(
    hass: HomeAssistant, entry: HeizzentraleConfigEntry
) -> bool:
    """Set up a heating plant from a config entry."""
    manager = PlantManager(hass, entry)
    await manager.async_start()
    entry.async_on_unload(manager.async_stop)
    entry.runtime_data = HeizzentraleData(manager=manager)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_reload))
    return True


async def _async_reload(hass: HomeAssistant, entry: HeizzentraleConfigEntry) -> None:
    """Reload after a subentry was added, changed or removed."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(
    hass: HomeAssistant, entry: HeizzentraleConfigEntry
) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def async_remove_entry(
    hass: HomeAssistant, entry: HeizzentraleConfigEntry
) -> None:
    """Delete stored calibration and balancing data with the plant."""
    await Store[dict](hass, 1, storage_key(entry.entry_id)).async_remove()
