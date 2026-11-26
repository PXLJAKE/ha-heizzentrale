"""Config flow for the Heizzentrale integration."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components.sensor import SensorDeviceClass
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.const import CONF_NAME
from homeassistant.helpers import selector

from .const import CONF_OUTDOOR_TEMPERATURE, DOMAIN

_OUTDOOR_SELECTOR = selector.EntitySelector(
    selector.EntitySelectorConfig(
        domain="sensor", device_class=SensorDeviceClass.TEMPERATURE
    )
)


def _clean(user_input: dict[str, Any]) -> dict[str, Any]:
    """Drop empty optional values so they are stored as absent."""
    return {key: value for key, value in user_input.items() if value not in (None, "")}


class HeizzentraleConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the setup of a heating plant."""

    VERSION = 1

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
                vol.Required(CONF_NAME): selector.TextSelector(),
                vol.Optional(CONF_OUTDOOR_TEMPERATURE): _OUTDOOR_SELECTOR,
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
            vol.Schema({vol.Optional(CONF_OUTDOOR_TEMPERATURE): _OUTDOOR_SELECTOR}),
            entry.data,
        )
        return self.async_show_form(step_id="reconfigure", data_schema=schema)
