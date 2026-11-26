"""Tests for setup, the mode select and diagnostics."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    mock_restore_cache,
)

from custom_components.heizzentrale.const import OperatingMode
from custom_components.heizzentrale.diagnostics import (
    async_get_config_entry_diagnostics,
)


def _mode_entity_id(hass: HomeAssistant, entry: MockConfigEntry) -> str:
    entity_id = er.async_get(hass).async_get_entity_id(
        "select", "heizzentrale", f"{entry.entry_id}_operating_mode"
    )
    assert entity_id is not None
    return entity_id


async def test_setup_and_unload(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """The entry loads in observe mode and unloads cleanly."""
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    await hass.async_block_till_done()
    assert mock_entry.state is ConfigEntryState.LOADED

    state = hass.states.get(_mode_entity_id(hass, mock_entry))
    assert state is not None
    assert state.state == OperatingMode.OBSERVE
    assert state.attributes["options"] == ["off", "observe"]

    assert await hass.config_entries.async_unload(mock_entry.entry_id)
    assert mock_entry.state is ConfigEntryState.NOT_LOADED


async def test_select_changes_mode(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """Selecting an option updates the runtime data."""
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    entity_id = _mode_entity_id(hass, mock_entry)

    await hass.services.async_call(
        "select",
        "select_option",
        {"entity_id": entity_id, "option": "off"},
        blocking=True,
    )
    assert hass.states.get(entity_id).state == "off"
    assert mock_entry.runtime_data.mode is OperatingMode.OFF


async def test_mode_is_restored(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """The mode survives a restart."""
    mock_entry.add_to_hass(hass)
    # Entity id is derived from the device name and the English entity name.
    mock_restore_cache(hass, [State("select.heizung_operating_mode", "off")])
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    entity_id = _mode_entity_id(hass, mock_entry)
    assert entity_id == "select.heizung_operating_mode"
    assert hass.states.get(entity_id).state == "off"


async def test_unknown_restored_mode_falls_back(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """A stored mode this version does not know becomes observe."""
    mock_entry.add_to_hass(hass)
    mock_restore_cache(hass, [State("select.heizung_operating_mode", "active")])
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    assert hass.states.get(_mode_entity_id(hass, mock_entry)).state == "observe"


async def test_diagnostics_redacts_name(
    hass: HomeAssistant, mock_entry: MockConfigEntry
) -> None:
    """Diagnostics never contain the plant name."""
    mock_entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(mock_entry.entry_id)
    diag = await async_get_config_entry_diagnostics(hass, mock_entry)
    assert "Heizung" not in str(diag)
    assert diag["mode"] == "observe"


async def test_card_is_served(hass: HomeAssistant, hass_client) -> None:
    """The bundled card is reachable for the frontend."""
    from homeassistant.setup import async_setup_component

    assert await async_setup_component(hass, "heizzentrale", {})
    client = await hass_client()
    response = await client.get("/heizzentrale_static/heizzentrale-card.js")
    assert response.status == 200
    assert "heizzentrale-house-card" in await response.text()


async def test_sidebar_page_registered_with_frontend(hass: HomeAssistant) -> None:
    """With the frontend loaded the card script and the sidebar page are added."""
    from unittest.mock import AsyncMock, patch

    from homeassistant.setup import async_setup_component

    hass.config.components.add("frontend")
    with (
        patch("homeassistant.components.frontend.add_extra_js_url") as add_js,
        patch(
            "homeassistant.components.panel_custom.async_register_panel",
            AsyncMock(),
        ) as register,
    ):
        assert await async_setup_component(hass, "heizzentrale", {})
    url = add_js.call_args.args[1]
    assert url.startswith("/heizzentrale_static/heizzentrale-card.js?v=")
    kwargs = register.call_args.kwargs
    assert kwargs["frontend_url_path"] == "heizzentrale"
    assert kwargs["webcomponent_name"] == "heizzentrale-panel"
    assert kwargs["module_url"] == url
    assert kwargs["embed_iframe"] is False
