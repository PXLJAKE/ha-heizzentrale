# Changelog

## 0.6.1-beta.1

- Pump group: the entity that switches it can be a selection with modes
  (for example the heating circuit mode of a boiler). The setup then asks
  which mode means off and which means on, with the real modes to pick from.

## 0.6.0-beta.1

- New part "Pump group": the pump, with or without mixer, that feeds one or
  more circuits. Flow and return temperature, pump status and the entity
  that will switch it. Shown in the house view and explained on tap. It is
  only measured for now; switching it off when all circuits are closed comes
  with the switching step.
- Sidebar entry "Heizzentrale": the house view as a full page.
- Simpler setup: a guided checklist in the card, numbered steps in the
  forms, optional fields marked as such, and a room only needs its
  thermostat (name from the thermostat's area, the only circuit preselected).
- German texts use "Strang" throughout.

## 0.5.0-beta.1

- Tapping a room opens a room window: change the setpoint, pick a preset,
  switch the room off or on, read what is happening and why, and jump to the
  thermostat details.
- Settings view in the card (gear button): switch the operating mode, see
  all heat sources, buffers, circuits and rooms with what is assigned, get
  hints for missing sensors, circuits or floors, and jump to the page where
  parts are added and changed.
- Preset names are shown in the language of Home Assistant.

## 0.4.0-beta.1

- Floors come from Home Assistant: a room appears on the floor of the area
  its thermostat (or window contact) is assigned to. Any number of floors
  works; a floor picked by hand in the room settings still wins.
- House view: pipe routes are worked out from the layout and drawn from the
  plant room to every room, one colour per circuit. Open circuits with
  heating rooms show moving dots (off with "reduce motion").
- House view: fresher look with softer tiles, own colour palette and
  rounded lines. The colours can be themed with
  `--heizzentrale-hot-color`, `--heizzentrale-cold-color` and
  `--heizzentrale-ok-color`.

## 0.3.0-beta.1

- House view redrawn as a cross-section of the house: roof, storeys, ground
  line and basement with the plant room, outlines only. Two columns on phones.
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
