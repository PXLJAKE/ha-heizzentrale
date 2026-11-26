# Changelog

## Unreleased

- Balancing assistant, backend: sensor calibration (offsets so all pipe
  sensors agree), 30 minute spread averages with a settling check, analysis
  of all open circuits and one recommended valve step per round, log of
  manual adjustments. New sensor "Balancing" on the plant.
- Calibration offsets and the adjustment log are stored per plant and removed
  with it. Disk writes only happen on calibration or a logged adjustment.

## 0.2.0-beta.1

- Measuring: heat sources, buffer tanks, circuits and rooms can be added,
  changed and removed in the UI.
- New entities: spread per circuit (K), circuit open (respects NO/NC
  actuators), mean buffer temperature. All event driven, no polling.
- House view card `custom:heizzentrale-house-card`: rooms per floor, heat
  source, buffer, circuits with flow, return and spread. Tap any element for
  an explanation. German and English, light and dark themes.
- Release workflow: a new version in manifest.json on main creates the release with ZIP.
- Still read only: the integration does not switch anything.

## 0.1.0

- Repository scaffold: manifest, HACS metadata, config flow (plant name,
  optional outdoor temperature sensor, reconfigure), operating mode select
  (off / observe), diagnostics with redaction, German and English texts,
  tests and CI.
