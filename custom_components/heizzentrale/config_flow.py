"""Config flow for the Heizzentrale integration."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components.binary_sensor import BinarySensorDeviceClass
from homeassistant.components.sensor import SensorDeviceClass
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    ConfigSubentryFlow,
    SubentryFlowResult,
)
from homeassistant.const import CONF_NAME, UnitOfVolume
from homeassistant.core import callback
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import selector

from .const import (
    CONF_BOILER_TEMPERATURE,
    CONF_CIRCUIT,
    CONF_CLIMATE,
    CONF_CONTROL,
    CONF_FLOOR,
    CONF_FLOW,
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
    HEAT_SOURCE_KINDS,
    SUBENTRY_BUFFER,
    SUBENTRY_CIRCUIT,
    SUBENTRY_HEAT_SOURCE,
    SUBENTRY_PUMP_GROUP,
    SUBENTRY_ROOM,
    SYSTEM_TYPES,
    ValveType,
)

_TEMPERATURE = selector.EntitySelector(
    selector.EntitySelectorConfig(
        domain="sensor", device_class=SensorDeviceClass.TEMPERATURE
    )
)
_TEMPERATURES = selector.EntitySelector(
    selector.EntitySelectorConfig(
        domain="sensor", device_class=SensorDeviceClass.TEMPERATURE, multiple=True
    )
)
_NAME = selector.TextSelector()


def _dropdown(options: list[str], translation_key: str) -> selector.SelectSelector:
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=options,
            translation_key=translation_key,
            mode=selector.SelectSelectorMode.DROPDOWN,
        )
    )


def _clean(user_input: dict[str, Any]) -> dict[str, Any]:
    """Drop empty optional values so they are stored as absent."""
    return {
        key: value for key, value in user_input.items() if value not in (None, "", [])
    }


class HeizzentraleConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the setup of a heating plant."""

    VERSION = 1

    @classmethod
    @callback
    def async_get_supported_subentry_types(
        cls, config_entry: ConfigEntry
    ) -> dict[str, type[ConfigSubentryFlow]]:
        """Return the parts a plant can consist of."""
        return {
            SUBENTRY_HEAT_SOURCE: HeatSourceFlow,
            SUBENTRY_BUFFER: BufferFlow,
            SUBENTRY_PUMP_GROUP: PumpGroupFlow,
            SUBENTRY_CIRCUIT: CircuitFlow,
            SUBENTRY_ROOM: RoomFlow,
        }

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Ask for the plant name and the optional outdoor sensor."""
        if user_input is not None:
            data = _clean(user_input)
            data[CONF_NAME] = data[CONF_NAME].strip()
            self._async_abort_entries_match({CONF_NAME: data[CONF_NAME]})
            return self.async_create_entry(title=data[CONF_NAME], data=data)

        schema = vol.Schema(
            {
                vol.Required(CONF_NAME): _NAME,
                vol.Optional(CONF_OUTDOOR_TEMPERATURE): _TEMPERATURE,
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema)

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Change the outdoor sensor of an existing plant."""
        entry = self._get_reconfigure_entry()
        if user_input is not None:
            data = {CONF_NAME: entry.data[CONF_NAME], **_clean(user_input)}
            return self.async_update_reload_and_abort(entry, data=data)

        schema = self.add_suggested_values_to_schema(
            vol.Schema({vol.Optional(CONF_OUTDOOR_TEMPERATURE): _TEMPERATURE}),
            entry.data,
        )
        return self.async_show_form(step_id="reconfigure", data_schema=schema)


class _PartFlow(ConfigSubentryFlow):
    """Shared add and change flow for one part of the plant.

    Every part is a single form. Adding and changing use the same fields, so
    the user learns one screen per part.
    """

    def _schema(self) -> vol.Schema:
        raise NotImplementedError

    def _named(self, user_input: dict[str, Any]) -> dict[str, Any]:
        """Clean the input and make sure the part has a name."""
        data = _clean(user_input)
        name = str(data.get(CONF_NAME, "")).strip() or self._default_name(data)
        data[CONF_NAME] = name
        return data

    def _default_name(self, data: dict[str, Any]) -> str:
        """Name used when the form allows leaving it empty."""
        return ""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> SubentryFlowResult:
        """Add a new part."""
        if user_input is not None:
            data = self._named(user_input)
            return self.async_create_entry(title=data[CONF_NAME], data=data)
        return self.async_show_form(step_id="user", data_schema=self._schema())

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> SubentryFlowResult:
        """Change an existing part."""
        subentry = self._get_reconfigure_subentry()
        if user_input is not None:
            data = self._named(user_input)
            return self.async_update_and_abort(
                self._get_entry(), subentry, title=data[CONF_NAME], data=data
            )
        return self.async_show_form(
            step_id="reconfigure",
            data_schema=self.add_suggested_values_to_schema(
                self._schema(), subentry.data
            ),
        )


class HeatSourceFlow(_PartFlow):
    """Boiler, heat pump or any other heat source."""

    def _schema(self) -> vol.Schema:
        return vol.Schema(
            {
                vol.Required(CONF_NAME): _NAME,
                vol.Required(CONF_KIND, default="other"): _dropdown(
                    HEAT_SOURCE_KINDS, "heat_source_kind"
                ),
                vol.Optional(CONF_BOILER_TEMPERATURE): _TEMPERATURE,
                vol.Optional(CONF_FLOW): _TEMPERATURE,
                vol.Optional(CONF_STATUS): selector.EntitySelector(
                    selector.EntitySelectorConfig(
                        domain=["sensor", "binary_sensor", "climate", "switch"]
                    )
                ),
            }
        )


class BufferFlow(_PartFlow):
    """Buffer tank with any number of temperature sensors."""

    def _schema(self) -> vol.Schema:
        return vol.Schema(
            {
                vol.Required(CONF_NAME): _NAME,
                vol.Optional(CONF_SENSORS): _TEMPERATURES,
                vol.Optional(CONF_VOLUME): selector.NumberSelector(
                    selector.NumberSelectorConfig(
                        min=0,
                        max=100000,
                        step=1,
                        unit_of_measurement=UnitOfVolume.LITERS,
                        mode=selector.NumberSelectorMode.BOX,
                    )
                ),
            }
        )


class PumpGroupFlow(_PartFlow):
    """Pump group, with or without mixer, that feeds one or more circuits."""

    def _schema(self) -> vol.Schema:
        return vol.Schema(
            {
                vol.Required(CONF_NAME): _NAME,
                vol.Optional(CONF_FLOW): _TEMPERATURE,
                vol.Optional(CONF_RETURN): _TEMPERATURE,
                vol.Optional(CONF_STATUS): selector.EntitySelector(
                    selector.EntitySelectorConfig(
                        domain=["binary_sensor", "switch", "sensor", "climate"]
                    )
                ),
                vol.Optional(CONF_CONTROL): selector.EntitySelector(
                    selector.EntitySelectorConfig(
                        domain=["switch", "input_boolean", "climate", "select"]
                    )
                ),
            }
        )


class CircuitFlow(_PartFlow):
    """Heating circuit or one branch of a manifold."""

    def _schema(self) -> vol.Schema:
        groups = [
            selector.SelectOptionDict(value=subentry.subentry_id, label=subentry.title)
            for subentry in self._get_entry().subentries.values()
            if subentry.subentry_type == SUBENTRY_PUMP_GROUP
        ]
        feeder: dict[Any, Any] = {}
        if groups:
            feeder[vol.Optional(CONF_PUMP_GROUP)] = selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=groups, mode=selector.SelectSelectorMode.DROPDOWN
                )
            )
        return vol.Schema(
            {
                vol.Required(CONF_NAME): _NAME,
                vol.Required(CONF_SYSTEM_TYPE, default="two_pipe"): _dropdown(
                    SYSTEM_TYPES, "system_type"
                ),
                **feeder,
                vol.Optional(CONF_FLOW): _TEMPERATURE,
                vol.Optional(CONF_RETURN): _TEMPERATURE,
                vol.Optional(CONF_VALVE): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain=["switch", "valve"])
                ),
                vol.Required(
                    CONF_VALVE_TYPE, default=ValveType.NORMALLY_CLOSED.value
                ): _dropdown([item.value for item in ValveType], "valve_type"),
                vol.Optional(CONF_POWER): selector.EntitySelector(
                    selector.EntitySelectorConfig(
                        domain="sensor", device_class=SensorDeviceClass.POWER
                    )
                ),
            }
        )


class RoomFlow(_PartFlow):
    """Room with a thermostat, assigned to a circuit and a floor."""

    def _default_name(self, data: dict[str, Any]) -> str:
        """Area of the thermostat, else its friendly name."""
        entity_id: str = data[CONF_CLIMATE]
        item = er.async_get(self.hass).async_get(entity_id)
        area_id = item.area_id if item else None
        if item and area_id is None and item.device_id:
            device = dr.async_get(self.hass).async_get(item.device_id)
            area_id = device.area_id if device else None
        area = ar.async_get(self.hass).async_get_area(area_id) if area_id else None
        if area is not None:
            return area.name
        state = self.hass.states.get(entity_id)
        if state is not None and state.name:
            return state.name
        return entity_id.split(".", 1)[-1].replace("_", " ").title()

    def _schema(self) -> vol.Schema:
        circuits = [
            selector.SelectOptionDict(value=subentry.subentry_id, label=subentry.title)
            for subentry in self._get_entry().subentries.values()
            if subentry.subentry_type == SUBENTRY_CIRCUIT
        ]
        schema: dict[Any, Any] = {
            vol.Required(CONF_CLIMATE): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="climate")
            ),
            vol.Optional(CONF_NAME): _NAME,
        }
        if circuits:
            # With a single circuit there is nothing to choose.
            only = circuits[0]["value"] if len(circuits) == 1 else vol.UNDEFINED
            schema[vol.Optional(CONF_CIRCUIT, default=only)] = selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=circuits, mode=selector.SelectSelectorMode.DROPDOWN
                )
            )
        schema[vol.Optional(CONF_FLOOR)] = selector.FloorSelector()
        schema[vol.Optional(CONF_WINDOW)] = selector.EntitySelector(
            selector.EntitySelectorConfig(
                domain="binary_sensor",
                device_class=[
                    BinarySensorDeviceClass.WINDOW,
                    BinarySensorDeviceClass.DOOR,
                    BinarySensorDeviceClass.OPENING,
                ],
            )
        )
        return vol.Schema(schema)
