"""Websocket API used by the dashboard card.

The card asks once for the structure of the plant (which entity belongs to
which part). Live values are then read from the normal state stream, so this
API causes no extra traffic while the card is open.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntryState
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import floor_registry as fr

from .balancing import CalibrationError
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
from .manager import PlantManager


@callback
def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    websocket_api.async_register_command(hass, ws_plants)
    websocket_api.async_register_command(hass, ws_balancing_status)
    websocket_api.async_register_command(hass, ws_balancing_calibrate)
    websocket_api.async_register_command(hass, ws_balancing_clear_calibration)
    websocket_api.async_register_command(hass, ws_balancing_log)


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
            "balancing_entity": own(Platform.SENSOR, f"{entry.entry_id}_balancing"),
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


def _manager(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> PlantManager | None:
    """Return the manager of the requested plant or send an error."""
    entry = hass.config_entries.async_get_entry(msg["entry_id"])
    if (
        entry is None
        or entry.domain != DOMAIN
        or entry.state is not ConfigEntryState.LOADED
    ):
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Plant not found")
        return None
    return entry.runtime_data.manager


def _balancing_payload(manager: PlantManager) -> dict[str, Any]:
    result = manager.result
    return {
        "state": result.state.value,
        "target": result.target,
        "recommend_circuit": result.recommend_circuit,
        "recommend_turns": result.recommend_turns,
        "settling": list(result.settling),
        "circuits": [
            {
                "id": item.circuit_id,
                "name": item.name,
                "verdict": item.verdict.value,
                "spread": item.spread,
                "deviation": item.deviation,
            }
            for item in result.circuits
        ],
        "offsets": manager.offsets,
        "calibration_sensors": manager.calibration_sensors(),
        "log": manager.log,
    }


@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/balancing/status",
        vol.Required("entry_id"): str,
    }
)
@callback
def ws_balancing_status(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the current balancing analysis, offsets and adjustment log."""
    if (manager := _manager(hass, connection, msg)) is not None:
        connection.send_result(msg["id"], _balancing_payload(manager))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/balancing/calibrate",
        vol.Required("entry_id"): str,
    }
)
@websocket_api.async_response
async def ws_balancing_calibrate(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Calibrate all pipe sensors against each other."""
    if (manager := _manager(hass, connection, msg)) is None:
        return
    try:
        await manager.async_calibrate()
    except CalibrationError as err:
        connection.send_error(msg["id"], str(err), "Calibration not possible")
        return
    connection.send_result(msg["id"], _balancing_payload(manager))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/balancing/clear_calibration",
        vol.Required("entry_id"): str,
    }
)
@websocket_api.async_response
async def ws_balancing_clear_calibration(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Remove all calibration offsets."""
    if (manager := _manager(hass, connection, msg)) is None:
        return
    await manager.async_clear_calibration()
    connection.send_result(msg["id"], _balancing_payload(manager))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/balancing/log_adjustment",
        vol.Required("entry_id"): str,
        vol.Required("circuit"): str,
        vol.Required("turns"): vol.All(vol.Coerce(float), vol.Range(min=-20, max=20)),
        vol.Optional("note"): vol.All(str, vol.Length(max=200)),
    }
)
@websocket_api.async_response
async def ws_balancing_log(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Record a manual valve adjustment and restart the measurement."""
    if (manager := _manager(hass, connection, msg)) is None:
        return
    if msg["circuit"] not in {item.subentry_id for item in manager.circuits}:
        connection.send_error(
            msg["id"], websocket_api.ERR_NOT_FOUND, "Circuit not found"
        )
        return
    await manager.async_log_adjustment(msg["circuit"], msg["turns"], msg.get("note"))
    connection.send_result(msg["id"], _balancing_payload(manager))
