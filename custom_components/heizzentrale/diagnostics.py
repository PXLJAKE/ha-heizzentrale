"""Diagnostics support for Heizzentrale."""

from __future__ import annotations

from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant

from . import HeizzentraleConfigEntry

TO_REDACT = {CONF_NAME, "title"}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: HeizzentraleConfigEntry
) -> dict[str, Any]:
    """Return diagnostics with personal names removed."""
    return {
        "entry": async_redact_data(
            {"title": entry.title, "version": entry.version, "data": dict(entry.data)},
            TO_REDACT,
        ),
        "mode": entry.runtime_data.mode.value,
    }
