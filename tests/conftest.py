"""Shared fixtures."""

from __future__ import annotations

import pytest
from homeassistant.const import CONF_NAME
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.heizzentrale.const import DOMAIN


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """Allow loading the custom integration in every test."""


@pytest.fixture
def mock_entry() -> MockConfigEntry:
    """Return a config entry for one plant."""
    return MockConfigEntry(domain=DOMAIN, title="Heizung", data={CONF_NAME: "Heizung"})
