"""Constants for the Heizzentrale integration."""

from __future__ import annotations

from enum import StrEnum
from typing import Final

DOMAIN: Final = "heizzentrale"

CONF_OUTDOOR_TEMPERATURE: Final = "outdoor_temperature_entity"


class OperatingMode(StrEnum):
    """Operating mode of a heating plant.

    ``ACTIVE`` is intentionally missing: it is added together with the
    switching logic. Until then the integration can never actuate anything.
    """

    OFF = "off"
    OBSERVE = "observe"


DEFAULT_MODE: Final = OperatingMode.OBSERVE
