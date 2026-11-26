"""Tests for the config flow."""

from __future__ import annotations

from homeassistant.config_entries import SOURCE_USER
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.heizzentrale.const import CONF_OUTDOOR_TEMPERATURE, DOMAIN


async def test_user_flow_creates_entry(hass: HomeAssistant) -> None:
    """The user step creates an entry and trims the name."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {CONF_NAME: " Heizung ", CONF_OUTDOOR_TEMPERATURE: "sensor.outside"},
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Heizung"
    assert result["data"] == {
        CONF_NAME: "Heizung",
        CONF_OUTDOOR_TEMPERATURE: "sensor.outside",
    }


async def test_user_flow_without_outdoor_sensor(hass: HomeAssistant) -> None:
    """The outdoor sensor is optional."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_NAME: "Heizung"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"] == {CONF_NAME: "Heizung"}


async def test_duplicate_name_aborts(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """A second plant with the same name is rejected."""
    mock_entry.add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_NAME: "Heizung"}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "already_configured"


async def test_reconfigure_sets_and_clears_sensor(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """Reconfigure can set and remove the outdoor sensor, the name stays."""
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)

    result = await mock_entry.start_reconfigure_flow(hass)
    assert result["step_id"] == "reconfigure"
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_OUTDOOR_TEMPERATURE: "sensor.outside"}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "reconfigure_successful"
    assert mock_entry.data == {
        CONF_NAME: "Heizung",
        CONF_OUTDOOR_TEMPERATURE: "sensor.outside",
    }

    result = await mock_entry.start_reconfigure_flow(hass)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    await hass.async_block_till_done()
    assert mock_entry.data == {CONF_NAME: "Heizung"}
