"""Constants for the Heizzentrale integration."""

from __future__ import annotations

from enum import StrEnum
from typing import Final

DOMAIN: Final = "heizzentrale"

CONF_OUTDOOR_TEMPERATURE: Final = "outdoor_temperature_entity"

# Options of a plant
OPT_LANGUAGE: Final = "language"
LANGUAGES: Final = ["auto", "de", "en"]

# Subentry types
SUBENTRY_HEAT_SOURCE: Final = "heat_source"
SUBENTRY_BUFFER: Final = "buffer"
SUBENTRY_PUMP_GROUP: Final = "pump_group"
SUBENTRY_CIRCUIT: Final = "circuit"
SUBENTRY_ROOM: Final = "room"

# Heat source
CONF_KIND: Final = "kind"
CONF_BOILER_TEMPERATURE: Final = "boiler_temperature_entity"
CONF_STATUS: Final = "status_entity"

# Buffer
CONF_SENSORS: Final = "sensor_entities"
CONF_VOLUME: Final = "volume"

# Pump group (shares CONF_FLOW, CONF_RETURN and CONF_STATUS)
CONF_FLOW_SETPOINT: Final = "flow_setpoint_entity"
CONF_CONTROL: Final = "control_entity"
CONF_CONTROL_OFF: Final = "control_off_option"
CONF_CONTROL_ON: Final = "control_on_option"

# Circuit
CONF_PUMP_GROUP: Final = "pump_group"
CONF_SYSTEM_TYPE: Final = "system_type"
CONF_FLOW: Final = "flow_entity"
CONF_RETURN: Final = "return_entity"
CONF_VALVE: Final = "valve_entity"
CONF_VALVE_TYPE: Final = "valve_type"
CONF_POWER: Final = "power_entity"

# Room
CONF_CLIMATE: Final = "climate_entity"
CONF_WINDOW: Final = "window_entity"
CONF_CIRCUIT: Final = "circuit"
CONF_FLOOR: Final = "floor"

HEAT_SOURCE_KINDS: Final = [
    "pellet",
    "wood",
    "gas",
    "oil",
    "heat_pump",
    "district",
    "other",
]
SYSTEM_TYPES: Final = ["two_pipe", "one_pipe", "underfloor", "other"]


class ValveType(StrEnum):
    """How an actuator behaves without power."""

    NORMALLY_CLOSED = "nc"
    NORMALLY_OPEN = "no"


class OperatingMode(StrEnum):
    """Operating mode of a heating plant.

    Only ``ACTIVE`` switches strands and pump groups. The default is
    ``OBSERVE``; an unknown stored value falls back to it.
    """

    OFF = "off"
    OBSERVE = "observe"
    ACTIVE = "active"


DEFAULT_MODE: Final = OperatingMode.OBSERVE

FRONTEND_URL: Final = "/heizzentrale_static"
CARD_FILENAME: Final = "heizzentrale-card.js"
PANEL_URL_PATH: Final = "heizzentrale"
PANEL_ELEMENT: Final = "heizzentrale-panel"
