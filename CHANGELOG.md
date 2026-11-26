# Changelog

## 0.11.0-beta.1

- New operating mode "Switching": Heizzentrale closes circuits no room needs
  and switches the pump group off when no circuit needs heat. It has to be
  confirmed a second time; "Observe" stays the default.
- Safety: opening is always enforced, closing happens once per change, a
  pump group is only switched on again if Heizzentrale switched it off, the
  pump stops before its circuits close, nothing is touched after a restart
  until the stored mode is known, and leaving the mode opens everything.
- Frost guard: a room below 8 °C always counts as asking for heat.
- Open windows: the thermostat of a room is switched off after a wait
  (default 2 minutes) and put back when the window closes. Can be switched
  off in the settings.

## 0.10.2-beta.1

- Plant room pipes now read as a chain: heat source to buffer to pump group,
  and from each pump group a line to its circuits. Without a buffer the heat
  source feeds the pump group directly; circuits without a pump group hang on
  the buffer or heat source.

## 0.10.1-beta.1

- A stove can get a tile of its own on a floor, for stoves standing in a
  room without a thermostat such as a hallway.

## 0.10.0-beta.1

- "Would switch now": Heizzentrale works out which circuits are needed from
  the thermostats and window contacts of their rooms and shows on each
  circuit and pump group what it would do. Nothing is switched yet.
- A circuit would close after 10 minutes without demand and open at once when
  a room asks for heat. Circuits without rooms or with an unreadable
  thermostat always stay open. A pump group in a mode chosen by hand is left
  alone.
- Edit mode on phones: rooms are dragged by a grip, so the page still scrolls.

## 0.9.0-beta.1

- Arrange the house: the pencil in the house view starts an edit mode. Rooms
  can be dragged into another order or onto another floor, by mouse, touch or
  with arrow buttons. A room moved to another floor also follows the
  schedules of that floor.
- Extra sensors: any tile (room, heat source, buffer, pump group, circuit)
  can show further sensors with a short label, for example humidity or the
  flame temperature of the boiler.

## 0.8.0-beta.1

- Stoves: a wood stove with a temperature sensor and a threshold from which it
  counts as burning. Per room an action applies while it burns, for example
  the stove's room off and rooms further away on Eco. Once it has cooled down
  the schedule applies again. An absence rule still wins over a stove.
- The stove shows in its room in the house view with its temperature.

## 0.7.0-beta.1

- Schedules: named lists of switch points (weekdays, time, action) that set
  thermostats to a preset, a temperature, on or off. A schedule can be
  assigned to single rooms and to whole floors; a room schedule wins over the
  schedule of its floor.
- Absence rules: when chosen people, phones or presence sensors have all been
  away for a set time, chosen rooms or floors are turned down. On return the
  schedule applies again, or the thermostat goes back to how it was.
- Both are created in the settings of the card, without automations. They
  start in "Only show": the room window tells what would be set, and nothing
  is switched until "Apply" is chosen.
- A change made by hand stays until the next switch point.

## 0.6.2-beta.1

- Fixed: the room window was see-through and misplaced with some themes and
  dashboards. It is now a real modal dialog with a solid background.
- A room can have several window contacts.
- The language of the house view can be set per plant in the settings view
  (like Home Assistant, Deutsch, English).

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
