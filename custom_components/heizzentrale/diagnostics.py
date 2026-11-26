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
    manager = entry.runtime_data.manager
    control = manager.control
    return {
        "entry": async_redact_data(
            {"title": entry.title, "version": entry.version, "data": dict(entry.data)},
            TO_REDACT,
        ),
        "mode": entry.runtime_data.mode.value,
        "parts": [
            {"type": subentry.subentry_type, "fields": sorted(subentry.data)}
            for subentry in entry.subentries.values()
        ],
        "balancing": {
            "state": manager.result.state.value,
            "target": manager.result.target,
            # Entity ids can contain names of people and rooms: values only.
            "offsets": sorted(manager.offsets.values()),
            "log_entries": len(manager.log),
        },
        # Counts and switches only; names, entity ids and rooms stay out.
        "control": {
            "apply": control.enabled,
            "schedules": len(control.schedules),
            "rules": len(control.rules),
            "stoves": len(control.stoves),
            "window": control.window,
            "preheat": control.preheat,
            "learned_rates": sorted(control.learner.rates.values()),
            "flow": {
                key: value
                for key, value in control.flow.settings.items()
                if key != "entity"
            }
            | {"configured": bool(control.flow.settings["entity"])},
            "switched": sorted(control.payload()["switched"].values()),
        },
    }
