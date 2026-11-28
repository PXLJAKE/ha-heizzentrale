"""Websocket API used by the dashboard card.

The card asks once for the structure of the plant (which entity belongs to
which part). Live values are then read from the normal state stream, so this
API causes no extra traffic while the card is open.
"""

from __future__ import annotations

import re
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntryState
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import floor_registry as fr

from .balancing import CalibrationError
from .const import (
    CONF_BOILER_TEMPERATURE,
    CONF_CIRCUIT,
    CONF_CLIMATE,
    CONF_CONTROL,
    CONF_CONTROL_OFF,
    CONF_CONTROL_ON,
    CONF_FLOOR,
    CONF_FLOW,
    CONF_FLOW_SETPOINT,
    CONF_KIND,
    CONF_OUTDOOR_TEMPERATURE,
    CONF_POWER,
    CONF_PUMP_GROUP,
    CONF_RETURN,
    CONF_SENSORS,
    CONF_STATUS,
    CONF_SYSTEM_TYPE,
    CONF_VALVE,
    CONF_VALVE_TYPE,
    CONF_VOLUME,
    CONF_WINDOW,
    DOMAIN,
    LANGUAGES,
    OPT_LANGUAGE,
    SUBENTRY_BUFFER,
    SUBENTRY_CIRCUIT,
    SUBENTRY_HEAT_SOURCE,
    SUBENTRY_PUMP_GROUP,
    SUBENTRY_ROOM,
    ValveType,
)
from .control import (
    PREHEAT_SCHEMA,
    RULES_SCHEMA,
    SCHEDULES_SCHEMA,
    STOVES_SCHEMA,
    WINDOW_SCHEMA,
)
from .flow import FLOW_SCHEMA
from .manager import PlantManager


@callback
def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    websocket_api.async_register_command(hass, ws_plants)
    websocket_api.async_register_command(hass, ws_set_language)
    websocket_api.async_register_command(hass, ws_balancing_status)
    websocket_api.async_register_command(hass, ws_balancing_calibrate)
    websocket_api.async_register_command(hass, ws_balancing_clear_calibration)
    websocket_api.async_register_command(hass, ws_balancing_log)
    websocket_api.async_register_command(hass, ws_control_get)
    websocket_api.async_register_command(hass, ws_control_save)
    websocket_api.async_register_command(hass, ws_layout_save)


# "preset_eco" as Better Thermostat names it, "comfort_temperature" as many
# Zigbee thermostats do.
_PRESET_IDS = (
    re.compile(r"(?:^|_)preset_([a-z0-9_]+)$"),
    re.compile(
        r"(?:^|_)(eco|comfort|away|sleep|home|holiday)_temperature(?:_zigbee2mqtt)?$"
    ),
)


@callback
def preset_numbers(registry: er.EntityRegistry, climate: str | None) -> dict[str, str]:
    """Numbers of the thermostat's device that hold a preset temperature.

    Better Thermostat and similar thermostats offer one number per preset,
    for example "preset_eco". The key is the preset as the thermostat names
    it, the value the number entity. Other thermostats give an empty result.
    """
    item = registry.async_get(climate) if climate else None
    if item is None or not item.device_id:
        return {}
    found: dict[str, str] = {}
    for other in er.async_entries_for_device(registry, item.device_id):
        if other.domain != Platform.NUMBER or other.platform != item.platform:
            continue
        for text in (other.translation_key or "", other.unique_id):
            match = next((m for p in _PRESET_IDS if (m := p.search(text))), None)
            if match:
                found.setdefault(match.group(1), other.entity_id)
                break
    return found


def as_list(value: Any) -> list[str]:
    """Entity ids as a list; older entries stored a single id."""
    if not value:
        return []
    return [value] if isinstance(value, str) else list(value)


@callback
def async_describe_plants(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Describe all loaded plants for the card."""
    registry = er.async_get(hass)
    floors = fr.async_get(hass)
    areas = ar.async_get(hass)
    devices = dr.async_get(hass)

    def floor_of(*entity_ids: str | None) -> str | None:
        """Floor of the first entity whose area sits on a floor."""
        for entity_id in entity_ids:
            if not entity_id or (item := registry.async_get(entity_id)) is None:
                continue
            area_id = item.area_id
            if area_id is None and item.device_id:
                device = devices.async_get(item.device_id)
                area_id = device.area_id if device else None
            area = areas.async_get_area(area_id) if area_id else None
            if area is not None and area.floor_id:
                return area.floor_id
        return None

    def own(platform: Platform, unique_id: str) -> str | None:
        return registry.async_get_entity_id(platform, DOMAIN, unique_id)

    plants: list[dict[str, Any]] = []
    for entry in hass.config_entries.async_loaded_entries(DOMAIN):
        plant: dict[str, Any] = {
            "entry_id": entry.entry_id,
            "name": entry.title,
            "language": entry.options.get(OPT_LANGUAGE, "auto"),
            "mode_entity": own(Platform.SELECT, f"{entry.entry_id}_operating_mode"),
            "balancing_entity": own(Platform.SENSOR, f"{entry.entry_id}_balancing"),
            "outdoor_entity": entry.data.get(CONF_OUTDOOR_TEMPERATURE),
            "heat_sources": [],
            "buffers": [],
            "pump_groups": [],
            "circuits": [],
            "rooms": [],
            "floors": [],
        }
        floor_ids: set[str] = set()
        runtime = getattr(entry, "runtime_data", None)
        layout: dict[str, Any] = runtime.manager.layout if runtime else {}
        placed: dict[str, str] = layout.get("floors", {})
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
            elif subentry.subentry_type == SUBENTRY_PUMP_GROUP:
                plant["pump_groups"].append(
                    base
                    | {
                        "flow_entity": data.get(CONF_FLOW),
                        "flow_setpoint_entity": data.get(CONF_FLOW_SETPOINT),
                        "return_entity": data.get(CONF_RETURN),
                        "status_entity": data.get(CONF_STATUS),
                        "control_entity": data.get(CONF_CONTROL),
                        "control_off_option": data.get(CONF_CONTROL_OFF),
                        "control_on_option": data.get(CONF_CONTROL_ON),
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
                        "pump_group": data.get(CONF_PUMP_GROUP),
                        "spread_entity": own(Platform.SENSOR, f"{sid}_spread"),
                        "open_entity": own(Platform.BINARY_SENSOR, f"{sid}_open"),
                    }
                )
            elif subentry.subentry_type == SUBENTRY_ROOM:
                # A floor picked by hand wins; otherwise the floor comes from
                # the area of the thermostat or the window contact.
                floor_id = data.get(CONF_FLOOR) or floor_of(
                    data.get(CONF_CLIMATE), *as_list(data.get(CONF_WINDOW))
                )
                # A room dragged to another floor in the card stays there.
                if (moved := placed.get(sid)) and floors.async_get_floor(moved):
                    floor_id = moved
                if floor_id:
                    floor_ids.add(floor_id)
                plant["rooms"].append(
                    base
                    | {
                        "climate_entity": data.get(CONF_CLIMATE),
                        "preset_entities": preset_numbers(
                            registry, data.get(CONF_CLIMATE)
                        ),
                        "window_entities": as_list(data.get(CONF_WINDOW)),
                        "circuit": data.get(CONF_CIRCUIT),
                        "floor": floor_id,
                    }
                )
        # A circuit without a chosen pump group hangs on the only one there is.
        group_ids = {group["id"] for group in plant["pump_groups"]}
        for circuit in plant["circuits"]:
            if circuit["pump_group"] not in group_ids:
                circuit["pump_group"] = (
                    next(iter(group_ids)) if len(group_ids) == 1 else None
                )
        for floor_id in floor_ids:
            if (floor := floors.async_get_floor(floor_id)) is not None:
                plant["floors"].append(
                    {"id": floor_id, "name": floor.name, "level": floor.level}
                )
        plant["floors"].sort(
            key=lambda item: (item["level"] is None, -(item["level"] or 0))
        )
        order = {room_id: i for i, room_id in enumerate(layout.get("order", []))}
        plant["rooms"].sort(key=lambda room: order.get(room["id"], len(order)))
        plant["all_floors"] = sorted(
            (
                {"id": floor.floor_id, "name": floor.name, "level": floor.level}
                for floor in floors.async_list_floors()
            ),
            key=lambda item: (item["level"] is None, -(item["level"] or 0)),
        )
        plant["extra_sensors"] = layout.get("sensors", [])
        plant["placed_floors"] = placed
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


@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/set_language",
        vol.Required("entry_id"): str,
        vol.Required("language"): vol.In(LANGUAGES),
    }
)
@websocket_api.require_admin
@callback
def ws_set_language(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Choose the language of the house view for one plant."""
    entry = hass.config_entries.async_get_entry(msg["entry_id"])
    if entry is None or entry.domain != DOMAIN:
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Plant not found")
        return
    hass.config_entries.async_update_entry(
        entry, options={**entry.options, OPT_LANGUAGE: msg["language"]}
    )
    connection.send_result(msg["id"], {})


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


@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/control/get",
        vol.Required("entry_id"): str,
    }
)
@callback
def ws_control_get(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return schedules, absence rules and what applies to each room now."""
    if (manager := _manager(hass, connection, msg)) is not None:
        connection.send_result(msg["id"], manager.control.payload())


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/control/save",
        vol.Required("entry_id"): str,
        vol.Optional("enabled"): bool,
        vol.Optional("schedules"): SCHEDULES_SCHEMA,
        vol.Optional("rules"): RULES_SCHEMA,
        vol.Optional("stoves"): STOVES_SCHEMA,
        vol.Optional("window"): WINDOW_SCHEMA,
        vol.Optional("flow"): FLOW_SCHEMA,
        vol.Optional("preheat"): PREHEAT_SCHEMA,
    }
)
@websocket_api.async_response
async def ws_control_save(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Store schedules and absence rules edited in the card."""
    if (manager := _manager(hass, connection, msg)) is None:
        return
    await manager.control.async_save(
        msg.get("enabled"),
        msg.get("schedules"),
        msg.get("rules"),
        msg.get("stoves"),
        msg.get("window"),
        msg.get("flow"),
        msg.get("preheat"),
    )
    connection.send_result(msg["id"], manager.control.payload())


_LAYOUT_ID = vol.All(str, vol.Length(min=1, max=40))
_EXTRA_SENSOR = vol.Schema(
    {
        vol.Required("id"): _LAYOUT_ID,
        vol.Required("entity"): cv.entity_id,
        vol.Optional("label", default=""): vol.All(str, vol.Length(max=30)),
        # The tile it is shown on, such as "room:<id>" or "source:<id>".
        vol.Required("place"): vol.All(
            str, vol.Match(r"^(room|source|buffer|pump|circuit):.{1,40}$")
        ),
    }
)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "heizzentrale/layout/save",
        vol.Required("entry_id"): str,
        vol.Optional("order"): vol.All([_LAYOUT_ID], vol.Length(max=300)),
        vol.Optional("floors"): vol.All({_LAYOUT_ID: _LAYOUT_ID}, vol.Length(max=300)),
        vol.Optional("sensors"): vol.All([_EXTRA_SENSOR], vol.Length(max=60)),
    }
)
@websocket_api.async_response
async def ws_layout_save(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Store how the house view is arranged."""
    if (manager := _manager(hass, connection, msg)) is None:
        return
    manager.layout = {
        **manager.layout,
        **{key: msg[key] for key in ("order", "floors", "sensors") if key in msg},
    }
    await manager.async_save()
    # Floors of rooms feed schedules and absence rules, so evaluate again.
    await manager.control.async_run()
    connection.send_result(msg["id"], {"plants": async_describe_plants(hass)})
