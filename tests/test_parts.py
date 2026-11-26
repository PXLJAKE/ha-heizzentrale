"""Tests for subentries, their entities and the websocket API."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import SOURCE_USER, ConfigSubentryData
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import floor_registry as fr
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.heizzentrale.const import DOMAIN

C = {"unit_of_measurement": "°C", "device_class": "temperature"}


def _entry(*subentries: dict[str, Any]) -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Heizung",
        data={CONF_NAME: "Heizung"},
        subentries_data=[
            ConfigSubentryData(
                subentry_type=item["type"],
                title=item["data"][CONF_NAME],
                data=item["data"],
                unique_id=None,
            )
            for item in subentries
        ],
    )


CIRCUIT = {
    "type": "circuit",
    "data": {
        CONF_NAME: "EG",
        "system_type": "one_pipe",
        "flow_entity": "sensor.eg_flow",
        "return_entity": "sensor.eg_return",
        "valve_entity": "switch.eg_valve",
        "valve_type": "nc",
    },
}


async def _setup(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


def _own(
    hass: HomeAssistant, platform: str, entry: MockConfigEntry, suffix: str
) -> str:
    subentry_id = next(iter(entry.subentries))
    entity_id = er.async_get(hass).async_get_entity_id(
        platform, DOMAIN, f"{subentry_id}_{suffix}"
    )
    assert entity_id is not None
    return entity_id


async def test_add_circuit_subentry(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """A circuit can be added in the UI; empty optional fields are dropped."""
    await _setup(hass, mock_entry)
    result = await hass.config_entries.subentries.async_init(
        (mock_entry.entry_id, "circuit"), context={"source": SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"],
        {
            CONF_NAME: " EG ",
            "system_type": "one_pipe",
            "flow_entity": "sensor.eg_flow",
            "return_entity": "sensor.eg_return",
            "valve_type": "nc",
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    subentry = next(iter(mock_entry.subentries.values()))
    assert subentry.title == "EG"
    assert subentry.subentry_type == "circuit"
    assert "valve_entity" not in subentry.data
    # The entry was reloaded and the spread sensor exists now.
    assert _own(hass, "sensor", mock_entry, "spread")


async def test_reconfigure_circuit(hass: HomeAssistant) -> None:
    """Changing a circuit replaces its data and title."""
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    subentry_id = next(iter(entry.subentries))
    result = await entry.start_subentry_reconfigure_flow(hass, subentry_id)
    assert result["step_id"] == "reconfigure"
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"],
        {CONF_NAME: "Erdgeschoss", "system_type": "two_pipe", "valve_type": "no"},
    )
    assert result["type"] is FlowResultType.ABORT
    subentry = entry.subentries[subentry_id]
    assert subentry.title == "Erdgeschoss"
    assert subentry.data == {
        CONF_NAME: "Erdgeschoss",
        "system_type": "two_pipe",
        "valve_type": "no",
    }


async def test_room_flow_offers_circuits(hass: HomeAssistant) -> None:
    """The room form lists the existing circuits."""
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    circuit_id = next(iter(entry.subentries))
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "room"), context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"],
        {CONF_NAME: "Bad", "climate_entity": "climate.bad", "circuit": circuit_id},
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"]["circuit"] == circuit_id


async def test_spread_sensor_follows_sources(hass: HomeAssistant) -> None:
    """The spread updates on every source change and handles outages."""
    hass.states.async_set("sensor.eg_flow", "56.0", C)
    hass.states.async_set("sensor.eg_return", "44.5", C)
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    entity_id = _own(hass, "sensor", entry, "spread")

    state = hass.states.get(entity_id)
    assert state.state == "11.5"
    assert state.attributes["unit_of_measurement"] == "K"
    assert state.attributes["device_class"] == "temperature_delta"

    hass.states.async_set("sensor.eg_return", "50.0", C)
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "6.0"

    hass.states.async_set("sensor.eg_return", "unavailable", C)
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "unknown"


async def test_spread_converts_fahrenheit(hass: HomeAssistant) -> None:
    """Sources in °F give the same spread in K."""
    f = {"unit_of_measurement": "°F", "device_class": "temperature"}
    hass.states.async_set("sensor.eg_flow", "140", f)  # 60 °C
    hass.states.async_set("sensor.eg_return", "122", f)  # 50 °C
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    assert hass.states.get(_own(hass, "sensor", entry, "spread")).state == "10.0"


async def test_open_sensor_respects_actuator_type(hass: HomeAssistant) -> None:
    """NC: relay on means open. Unknown relay state is never shown as closed."""
    hass.states.async_set("switch.eg_valve", "off")
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    entity_id = _own(hass, "binary_sensor", entry, "open")
    assert hass.states.get(entity_id).state == "off"

    hass.states.async_set("switch.eg_valve", "on")
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "on"

    hass.states.async_set("switch.eg_valve", "unavailable")
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "unknown"


async def test_open_sensor_normally_open(hass: HomeAssistant) -> None:
    """NO: relay off means open."""
    hass.states.async_set("switch.eg_valve", "off")
    circuit = {"type": "circuit", "data": {**CIRCUIT["data"], "valve_type": "no"}}
    entry = _entry(circuit)
    await _setup(hass, entry)
    assert hass.states.get(_own(hass, "binary_sensor", entry, "open")).state == "on"


async def test_buffer_mean(hass: HomeAssistant) -> None:
    """The buffer mean ignores sensors that are down."""
    hass.states.async_set("sensor.top", "62", C)
    hass.states.async_set("sensor.bottom", "unavailable", C)
    entry = _entry(
        {
            "type": "buffer",
            "data": {
                CONF_NAME: "Puffer",
                "sensor_entities": ["sensor.top", "sensor.bottom"],
            },
        }
    )
    await _setup(hass, entry)
    entity_id = _own(hass, "sensor", entry, "buffer_mean")
    assert hass.states.get(entity_id).state == "62.0"
    hass.states.async_set("sensor.bottom", "40", C)
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "51.0"


async def test_websocket_describes_plant(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """The card gets the structure with own entities and sorted floors."""
    floors = fr.async_get(hass)
    upper = floors.async_create("OG", level=1)
    ground = floors.async_create("EG", level=0)
    entry = _entry(
        CIRCUIT,
        {"type": "heat_source", "data": {CONF_NAME: "Kessel", "kind": "pellet"}},
        {
            "type": "room",
            "data": {
                CONF_NAME: "Bad",
                "climate_entity": "climate.bad",
                "floor": ground.floor_id,
            },
        },
        {
            "type": "room",
            "data": {
                CONF_NAME: "Saal",
                "climate_entity": "climate.saal",
                "floor": upper.floor_id,
            },
        },
    )
    await _setup(hass, entry)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "heizzentrale/plants"})
    response = await client.receive_json()
    assert response["success"]
    (plant,) = response["result"]["plants"]
    assert plant["name"] == "Heizung"
    assert plant["mode_entity"] == "select.heizung_operating_mode"
    assert [floor["name"] for floor in plant["floors"]] == ["OG", "EG"]
    (circuit,) = plant["circuits"]
    assert circuit["system_type"] == "one_pipe"
    assert circuit["spread_entity"] == "sensor.eg_spread"
    assert circuit["open_entity"] == "binary_sensor.eg_open"
    assert plant["heat_sources"][0]["kind"] == "pellet"
    assert {room["name"] for room in plant["rooms"]} == {"Bad", "Saal"}


async def test_floor_comes_from_thermostat_area(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """Without a chosen floor the area of the thermostat decides."""
    from homeassistant.helpers import area_registry as ar
    from homeassistant.helpers import entity_registry as er

    attic = fr.async_get(hass).async_create("DG", level=2)
    area = ar.async_get(hass).async_create("Bad oben", floor_id=attic.floor_id)
    registry = er.async_get(hass)
    item = registry.async_get_or_create("climate", "test", "bad")
    registry.async_update_entity(item.entity_id, area_id=area.id)
    entry = _entry(
        {
            "type": "room",
            "data": {CONF_NAME: "Bad", "climate_entity": item.entity_id},
        },
        {
            "type": "room",
            "data": {CONF_NAME: "Flur", "climate_entity": "climate.unknown"},
        },
    )
    await _setup(hass, entry)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "heizzentrale/plants"})
    (plant,) = (await client.receive_json())["result"]["plants"]
    assert [floor["name"] for floor in plant["floors"]] == ["DG"]
    rooms = {room["name"]: room["floor"] for room in plant["rooms"]}
    assert rooms == {"Bad": attic.floor_id, "Flur": None}


async def test_pump_group_feeds_circuits(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """A pump group is described and the only one feeds every circuit."""
    entry = _entry(
        {
            "type": "pump_group",
            "data": {
                CONF_NAME: "Pumpengruppe",
                "flow_entity": "sensor.mixed_flow",
                "control_entity": "switch.heating_circuit",
            },
        },
        CIRCUIT,
    )
    await _setup(hass, entry)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "heizzentrale/plants"})
    (plant,) = (await client.receive_json())["result"]["plants"]
    (group,) = plant["pump_groups"]
    assert group["name"] == "Pumpengruppe"
    assert group["flow_entity"] == "sensor.mixed_flow"
    assert group["control_entity"] == "switch.heating_circuit"
    assert plant["circuits"][0]["pump_group"] == group["id"]


async def test_circuit_flow_offers_pump_groups(hass: HomeAssistant) -> None:
    """The circuit form lists pump groups only when there are some."""
    entry = _entry({"type": "pump_group", "data": {CONF_NAME: "Pumpengruppe"}})
    await _setup(hass, entry)
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "circuit"), context={"source": SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert "pump_group" in result["data_schema"].schema

    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "pump_group"), context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"], {CONF_NAME: " Zweite ", "flow_entity": "sensor.flow2"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Zweite"


async def test_room_name_and_circuit_are_filled_in(hass: HomeAssistant) -> None:
    """A room only needs its thermostat: name and the only circuit follow."""
    from homeassistant.helpers import area_registry as ar

    area = ar.async_get(hass).async_create("Wohnzimmer")
    registry = er.async_get(hass)
    item = registry.async_get_or_create("climate", "test", "wz")
    registry.async_update_entity(item.entity_id, area_id=area.id)
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    circuit_id = next(iter(entry.subentries))
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "room"), context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"], {"climate_entity": item.entity_id}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Wohnzimmer"
    assert result["data"]["circuit"] == circuit_id

    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "room"), context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"], {"climate_entity": "climate.gaeste_bad"}
    )
    assert result["title"] == "Gaeste Bad"


async def test_pump_group_with_mode_select(hass: HomeAssistant) -> None:
    """A select as control entity asks which mode is off and which is on."""
    hass.states.async_set(
        "select.hk1_mode", "1_auto", {"options": ["0_aus", "1_auto", "2_heizen"]}
    )
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "pump_group"), context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"],
        {CONF_NAME: "Mischerkreis", "control_entity": "select.hk1_mode"},
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "control_options"

    same = {"control_off_option": "0_aus", "control_on_option": "0_aus"}
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"], same
    )
    assert result["errors"] == {"base": "same_option"}

    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"],
        {"control_off_option": "0_aus", "control_on_option": "1_auto"},
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"]["control_off_option"] == "0_aus"
    assert result["data"]["control_on_option"] == "1_auto"


async def test_pump_group_with_switch_skips_modes(hass: HomeAssistant) -> None:
    """A plain switch needs no second question."""
    entry = _entry(CIRCUIT)
    await _setup(hass, entry)
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, "pump_group"), context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.subentries.async_configure(
        result["flow_id"], {CONF_NAME: "Pumpe", "control_entity": "switch.pumpe"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert "control_off_option" not in result["data"]
