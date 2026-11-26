"""Websocket API used by the dashboard card.

The card asks once for the structure of the plant (which entity belongs to
which part). Live values are then read from the normal state stream, so this
API causes no extra traffic while the card is open.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import floor_registry as fr

from .const import (
    CONF_BOILER_TEMPERATURE,
    CONF_CIRCUIT,
    CONF_CLIMATE,
    CONF_FLOOR,
    CONF_FLOW,
    CONF_KIND,
    CONF_OUTDOOR_TEMPERATURE,
    CONF_POWER,
    CONF_RETURN,
    CONF_SENSORS,
    CONF_STATUS,
    CONF_SYSTEM_TYPE,
    CONF_VALVE,
    CONF_VALVE_TYPE,
    CONF_VOLUME,
    CONF_WINDOW,
    DOMAIN,
    SUBENTRY_BUFFER,
    SUBENTRY_CIRCUIT,
    SUBENTRY_HEAT_SOURCE,
    SUBENTRY_ROOM,
    ValveType,
)


@callback
def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    websocket_api.async_register_command(hass, ws_plants)


@callback
def async_describe_plants(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Describe all loaded plants for the card."""
    registry = er.async_get(hass)
    floors = fr.async_get(hass)

    def own(platform: Platform, unique_id: str) -> str | None:
        return registry.async_get_entity_id(platform, DOMAIN, unique_id)

    plants: list[dict[str, Any]] = []
    for entry in hass.config_entries.async_loaded_entries(DOMAIN):
        plant: dict[str, Any] = {
            "entry_id": entry.entry_id,
            "name": entry.title,
            "mode_entity": own(Platform.SELECT, f"{entry.entry_id}_operating_mode"),
            "outdoor_entity": entry.data.get(CONF_OUTDOOR_TEMPERATURE),
            "heat_sources": [],
            "buffers": [],
            "circuits": [],
            "rooms": [],
            "floors": [],
        }
        floor_ids: set[str] = set()
        for subentry in entry.subentries.values():
            sid, data = subentry.subentry_id, subentry.data
            base = {"id": sid, "name": subentry.title}
            if subentry.subentry_type == SUBENTRY_HEAT_SOURCE:
                plant["heat_sources"].append(
                    base
                    | {
                        "kind": data.get(CONF_KIND, "other"),
                        "temperature_entity": data.get(CONF_BOILER_TEMPERATURE),
                        "flow_entity": data.get(CONF_FLOW),
                        "status_entity": data.get(CONF_STATUS),
                    }
                )
            elif subentry.subentry_type == SUBENTRY_BUFFER:
                plant["buffers"].append(
                    base
                    | {
                        "sensor_entities": list(data.get(CONF_SENSORS, [])),
                        "volume": data.get(CONF_VOLUME),
                        "mean_entity": own(Platform.SENSOR, f"{sid}_buffer_mean"),
                    }
                )
            elif subentry.subentry_type == SUBENTRY_CIRCUIT:
                plant["circuits"].append(
                    base
                    | {
                        "system_type": data.get(CONF_SYSTEM_TYPE, "other"),
                        "flow_entity": data.get(CONF_FLOW),
                        "return_entity": data.get(CONF_RETURN),
                        "valve_entity": data.get(CONF_VALVE),
                        "valve_type": data.get(
                            CONF_VALVE_TYPE, ValveType.NORMALLY_CLOSED
                        ),
                        "power_entity": data.get(CONF_POWER),
                        "spread_entity": own(Platform.SENSOR, f"{sid}_spread"),
                        "open_entity": own(Platform.BINARY_SENSOR, f"{sid}_open"),
                    }
                )
            elif subentry.subentry_type == SUBENTRY_ROOM:
                floor_id = data.get(CONF_FLOOR)
                if floor_id:
                    floor_ids.add(floor_id)
                plant["rooms"].append(
                    base
                    | {
                        "climate_entity": data.get(CONF_CLIMATE),
                        "window_entity": data.get(CONF_WINDOW),
                        "circuit": data.get(CONF_CIRCUIT),
                        "floor": floor_id,
                    }
                )
        for floor_id in floor_ids:
            if (floor := floors.async_get_floor(floor_id)) is not None:
                plant["floors"].append(
                    {"id": floor_id, "name": floor.name, "level": floor.level}
                )
        plant["floors"].sort(
            key=lambda item: (item["level"] is None, -(item["level"] or 0))
        )
        plants.append(plant)
    return plants


@websocket_api.websocket_command({vol.Required("type"): "heizzentrale/plants"})
@callback
def ws_plants(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the structure of all plants."""
    connection.send_result(msg["id"], {"plants": async_describe_plants(hass)})
