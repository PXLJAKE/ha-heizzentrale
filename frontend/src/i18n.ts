// UI texts of the card. German and English; everything else falls back to English.

const en = {
  loading: "Loading plant…",
  no_plant:
    "No plant found. Add the Heizzentrale integration under Settings → Devices & services.",
  empty:
    "This plant has no parts yet. Open the integration and add a heat source, circuits and rooms.",
  mode_observe: "Observing",
  mode_off: "Off",
  outdoor: "Outdoor",
  other_rooms: "Other rooms",
  plant_room: "Plant room",
  flow: "Flow",
  return: "Return",
  spread: "Spread",
  target: "Target",
  heating: "heating",
  idle: "idle",
  window_open: "Window open",
  open: "open",
  closed: "closed",
  unknown: "unknown",
  running: "running",
  close: "Close",
  system_two_pipe: "two-pipe",
  system_one_pipe: "one-pipe",
  system_underfloor: "underfloor heating",
  system_other: "circuit",
  kind_pellet: "Pellet boiler",
  kind_wood: "Wood boiler",
  kind_gas: "Gas boiler",
  kind_oil: "Oil boiler",
  kind_heat_pump: "Heat pump",
  kind_district: "District heating",
  kind_other: "Heat source",
  x_what_circuit:
    "{name} is a {system} circuit. Hot water flows to the radiators (flow) and comes back cooler (return).",
  x_spread:
    "Flow {flow}, return {ret}: the spread is {spread}. A larger spread means the water gives off more heat on its way.",
  x_no_spread: "Flow and return sensors are needed to show the spread.",
  x_open_nc:
    "The circuit is open because its actuator is powered. Without power this actuator closes (NC).",
  x_closed_nc:
    "The circuit is closed because its actuator has no power. Without power this actuator closes (NC).",
  x_open_no:
    "The circuit is open because its actuator has no power. Without power this actuator opens (NO).",
  x_closed_no:
    "The circuit is closed because its actuator is powered. Without power this actuator opens (NO).",
  x_open_valve: "The valve reports that it is open.",
  x_closed_valve: "The valve reports that it is closed.",
  x_valve_unknown:
    "The actuator does not report a state right now. Heizzentrale treats the circuit as possibly open.",
  x_no_valve: "This circuit has no actuator, so it is always open.",
  x_rooms_on: "Rooms on this circuit: {rooms}.",
  x_room_heating:
    "{name} is heating: it is {current} and should be {target}.",
  x_room_idle: "{name} is not heating: it is {current}, target {target}.",
  x_room_off: "{name} is switched off.",
  x_room_unavailable: "The thermostat of {name} is not reachable right now.",
  x_room_window: "A window is open, so heating is paused here.",
  x_room_preset: "Active preset: {preset}.",
  x_room_circuit: "Its radiators are supplied by the circuit {circuit}.",
  x_buffer:
    "{name} stores hot water so the heat source does not have to start for every small demand. Hot water collects at the top.",
  x_buffer_mean: "Mean temperature: {mean}.",
  x_source:
    "{name} produces the heat for the house. Status: {status}.",
  x_source_temp: "Temperature: {temp}.",
  x_mode_observe:
    "Observe mode: Heizzentrale measures and explains but does not switch anything.",
  x_mode_off: "Off: Heizzentrale only measures.",
  settings: "Settings",
  back: "Back to the house",
  circuit: "Circuit",
  why: "What is happening",
  room_turn_off: "Switch heating off in this room",
  room_turn_on: "Switch heating on in this room",
  open_thermostat: "Open thermostat details",
  set_mode: "Operating mode",
  set_mode_active:
    "A mode that switches on its own follows later and only after your OK.",
  set_sources: "Heat sources",
  set_buffers: "Buffer tanks",
  set_circuits: "Circuits",
  set_rooms: "Rooms",
  none_yet: "Nothing added yet.",
  n_rooms: "{count} rooms",
  one_room: "1 room",
  n_sensors: "{count} sensors",
  valve_nc: "actuator closes without power",
  valve_no: "actuator opens without power",
  valve_none: "no actuator",
  has_window: "window contact",
  warn_no_sensor: "No temperature sensor assigned.",
  warn_no_pipe_sensors: "Flow or return sensor missing, so no spread can be shown.",
  warn_no_rooms: "No room uses this circuit yet.",
  warn_no_circuit: "No circuit assigned, so no pipe is drawn to this room.",
  warn_no_floor:
    "No floor found. Assign the thermostat to an area with a floor in Home Assistant.",
  edit_parts: "Add or change parts",
  edit_hint:
    "Opens the Heizzentrale page of Home Assistant. Heat sources, buffers, circuits and rooms are added and changed there.",
  pump_group: "Pump group",
  pump_stopped: "stopped",
  set_pumps: "Pump groups",
  n_circuits: "{count} circuits",
  pump_switchable: "can be switched",
  warn_no_control:
    "No entity to switch it chosen. Heizzentrale will not be able to turn it off when all circuits are closed.",
  x_pump:
    "{name} pushes the heating water into the circuits behind it. A mixer, if there is one, sets how hot that water is.",
  x_pump_flow: "Flow temperature behind the mixer: {temp}.",
  x_pump_needed: "It is needed right now because these circuits are open: {circuits}.",
  x_pump_idle:
    "All circuits behind it are closed, so it has nothing to do. Once switching is enabled, Heizzentrale turns it off in this situation.",
  x_pump_running: "The pump reports that it is running.",
  x_pump_stopped: "The pump reports that it is stopped.",
  x_pump_control:
    "An entity to switch it is chosen. Heizzentrale only observes for now and does not use it yet.",
  x_pump_modes: "Off is the mode “{off}”, on is the mode “{on}”.",
  x_pump_no_control: "No entity to switch it is chosen yet.",
  setup_title: "Setup",
  setup_intro:
    "Add the parts of your heating in this order. Only the name is required each time; sensors can be filled in later.",
  setup_done: "The basics are set up. You can add or change parts at any time.",
  setup_optional: "only if you have one",
  setup_source: "Heat source",
  setup_source_hint: "Your boiler or heat pump.",
  setup_buffer: "Buffer tank",
  setup_buffer_hint: "The tank that stores hot water, with its temperature sensors.",
  setup_pump: "Pump group",
  setup_pump_hint: "The pump, with or without mixer, that feeds the circuits.",
  setup_circuits: "Circuits",
  setup_circuits_hint:
    "Every branch that can be opened and closed on its own, for example one per floor.",
  setup_rooms: "Rooms",
  setup_rooms_hint:
    "One per thermostat. Name and floor come from Home Assistant on their own.",
  n_windows: "{count} window contacts",
  set_language: "Language",
  lang_auto: "Like Home Assistant",
  lang_de: "Deutsch",
  lang_en: "English",
  set_language_hint:
    "Applies to this view for everyone. The setup dialogs of Home Assistant always follow the language in your user profile.",
  editor_plant: "Plant",
  editor_title: "Title (optional)",
  editor_first: "First plant",
};

const de: typeof en = {
  loading: "Anlage wird geladen …",
  no_plant:
    "Keine Anlage gefunden. Füge die Integration Heizzentrale unter Einstellungen → Geräte & Dienste hinzu.",
  empty:
    "Diese Anlage hat noch keine Teile. Öffne die Integration und füge Wärmeerzeuger, Kreise und Räume hinzu.",
  mode_observe: "Beobachtet",
  mode_off: "Aus",
  outdoor: "Außen",
  other_rooms: "Weitere Räume",
  plant_room: "Heizraum",
  flow: "Vorlauf",
  return: "Rücklauf",
  spread: "Spreizung",
  target: "Soll",
  heating: "heizt",
  idle: "ruht",
  window_open: "Fenster offen",
  open: "offen",
  closed: "zu",
  unknown: "unbekannt",
  running: "läuft",
  close: "Schließen",
  system_two_pipe: "Zweirohr",
  system_one_pipe: "Einrohr",
  system_underfloor: "Fußbodenheizung",
  system_other: "Kreis",
  kind_pellet: "Pelletkessel",
  kind_wood: "Holzkessel",
  kind_gas: "Gastherme",
  kind_oil: "Ölkessel",
  kind_heat_pump: "Wärmepumpe",
  kind_district: "Fernwärme",
  kind_other: "Wärmeerzeuger",
  x_what_circuit:
    "{name} ist ein Strang ({system}). Heißes Wasser fließt zu den Heizkörpern (Vorlauf) und kommt kühler zurück (Rücklauf).",
  x_spread:
    "Vorlauf {flow}, Rücklauf {ret}: Die Spreizung beträgt {spread}. Eine größere Spreizung heißt, das Wasser gibt unterwegs mehr Wärme ab.",
  x_no_spread:
    "Für die Spreizung braucht es einen Vorlauf- und einen Rücklauffühler.",
  x_open_nc:
    "Der Strang ist offen, weil sein Stellantrieb Strom bekommt. Ohne Strom schließt dieser Antrieb (NC).",
  x_closed_nc:
    "Der Strang ist zu, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom schließt dieser Antrieb (NC).",
  x_open_no:
    "Der Strang ist offen, weil sein Stellantrieb keinen Strom bekommt. Ohne Strom öffnet dieser Antrieb (NO).",
  x_closed_no:
    "Der Strang ist zu, weil sein Stellantrieb Strom bekommt. Ohne Strom öffnet dieser Antrieb (NO).",
  x_open_valve: "Das Ventil meldet, dass es offen ist.",
  x_closed_valve: "Das Ventil meldet, dass es zu ist.",
  x_valve_unknown:
    "Der Stellantrieb meldet gerade keinen Zustand. Heizzentrale behandelt den Strang als möglicherweise offen.",
  x_no_valve: "Dieser Strang hat keinen Stellantrieb und ist deshalb immer offen.",
  x_rooms_on: "Räume an diesem Strang: {rooms}.",
  x_room_heating:
    "{name} heizt gerade: Es hat {current} und soll {target} haben.",
  x_room_idle: "{name} heizt nicht: Es hat {current}, Soll {target}.",
  x_room_off: "{name} ist ausgeschaltet.",
  x_room_unavailable: "Das Thermostat von {name} ist gerade nicht erreichbar.",
  x_room_window: "Ein Fenster ist offen, deshalb pausiert die Heizung hier.",
  x_room_preset: "Aktives Preset: {preset}.",
  x_room_circuit: "Die Heizkörper hängen am Strang {circuit}.",
  x_buffer:
    "{name} speichert heißes Wasser, damit der Wärmeerzeuger nicht für jeden kleinen Bedarf starten muss. Oben sammelt sich das heiße Wasser.",
  x_buffer_mean: "Mittlere Temperatur: {mean}.",
  x_source: "{name} erzeugt die Wärme für das Haus. Status: {status}.",
  x_source_temp: "Temperatur: {temp}.",
  x_mode_observe:
    "Beobachtungsmodus: Heizzentrale misst und erklärt, schaltet aber nichts.",
  x_mode_off: "Aus: Heizzentrale misst nur.",
  settings: "Einstellungen",
  back: "Zurück zum Haus",
  circuit: "Strang",
  why: "Was gerade passiert",
  room_turn_off: "Heizung in diesem Raum ausschalten",
  room_turn_on: "Heizung in diesem Raum einschalten",
  open_thermostat: "Details zum Thermostat öffnen",
  set_mode: "Betriebsart",
  set_mode_active:
    "Eine Betriebsart, die selbst schaltet, kommt später und erst nach deinem OK.",
  set_sources: "Wärmeerzeuger",
  set_buffers: "Pufferspeicher",
  set_circuits: "Stränge",
  set_rooms: "Räume",
  none_yet: "Noch nichts angelegt.",
  n_rooms: "{count} Räume",
  one_room: "1 Raum",
  n_sensors: "{count} Fühler",
  valve_nc: "Stellantrieb stromlos zu",
  valve_no: "Stellantrieb stromlos offen",
  valve_none: "kein Stellantrieb",
  has_window: "Fensterkontakt",
  warn_no_sensor: "Kein Temperaturfühler zugewiesen.",
  warn_no_pipe_sensors:
    "Vorlauf- oder Rücklauffühler fehlt, deshalb gibt es keine Spreizung.",
  warn_no_rooms: "Noch kein Raum hängt an diesem Strang.",
  warn_no_circuit: "Kein Strang zugewiesen, deshalb führt keine Leitung zu diesem Raum.",
  warn_no_floor:
    "Kein Stockwerk gefunden. Weise das Thermostat in Home Assistant einem Bereich mit Stockwerk zu.",
  edit_parts: "Teile hinzufügen oder ändern",
  edit_hint:
    "Öffnet die Heizzentrale-Seite von Home Assistant. Dort werden Wärmeerzeuger, Puffer, Stränge und Räume angelegt und geändert.",
  pump_group: "Pumpengruppe",
  pump_stopped: "steht",
  set_pumps: "Pumpengruppen",
  n_circuits: "{count} Stränge",
  pump_switchable: "schaltbar",
  warn_no_control:
    "Keine Entität zum Schalten gewählt. Heizzentrale kann sie dann nicht ausschalten, wenn alle Stränge zu sind.",
  x_pump:
    "{name} drückt das Heizwasser in die Stränge dahinter. Ein Mischer, falls vorhanden, bestimmt, wie heiß dieses Wasser ist.",
  x_pump_flow: "Vorlauftemperatur hinter dem Mischer: {temp}.",
  x_pump_needed: "Sie wird gerade gebraucht, weil diese Stränge offen sind: {circuits}.",
  x_pump_idle:
    "Alle Stränge dahinter sind zu, sie hat also nichts zu tun. Sobald das Schalten freigegeben ist, schaltet Heizzentrale sie in dieser Lage aus.",
  x_pump_running: "Die Pumpe meldet, dass sie läuft.",
  x_pump_stopped: "Die Pumpe meldet, dass sie steht.",
  x_pump_control:
    "Eine Entität zum Schalten ist gewählt. Heizzentrale beobachtet vorerst nur und benutzt sie noch nicht.",
  x_pump_modes: "Aus ist der Modus „{off}“, An ist der Modus „{on}“.",
  x_pump_no_control: "Es ist noch keine Entität zum Schalten gewählt.",
  setup_title: "Einrichtung",
  setup_intro:
    "Lege die Teile deiner Heizung in dieser Reihenfolge an. Pflicht ist jeweils nur der Name, Fühler kannst du nachtragen.",
  setup_done:
    "Die Grundeinrichtung steht. Du kannst jederzeit Teile hinzufügen oder ändern.",
  setup_optional: "nur falls vorhanden",
  setup_source: "Wärmeerzeuger",
  setup_source_hint: "Dein Kessel oder deine Wärmepumpe.",
  setup_buffer: "Pufferspeicher",
  setup_buffer_hint: "Der Speicher für heißes Wasser mit seinen Temperaturfühlern.",
  setup_pump: "Pumpengruppe",
  setup_pump_hint: "Die Pumpe, mit oder ohne Mischer, die die Stränge versorgt.",
  setup_circuits: "Stränge",
  setup_circuits_hint:
    "Jeder Teil, der sich einzeln öffnen und schließen lässt, zum Beispiel einer pro Stockwerk.",
  setup_rooms: "Räume",
  setup_rooms_hint:
    "Einer pro Thermostat. Name und Stockwerk kommen von selbst aus Home Assistant.",
  n_windows: "{count} Fensterkontakte",
  set_language: "Sprache",
  lang_auto: "Wie Home Assistant",
  lang_de: "Deutsch",
  lang_en: "English",
  set_language_hint:
    "Gilt für diese Ansicht bei allen. Die Einrichtungsdialoge von Home Assistant folgen immer der Sprache in deinem Benutzerprofil.",
  editor_plant: "Anlage",
  editor_title: "Titel (optional)",
  editor_first: "Erste Anlage",
};

export type TextKey = keyof typeof en;

export function translator(language: string | undefined) {
  const table = (language ?? "en").toLowerCase().startsWith("de") ? de : en;
  return (key: TextKey, values: Record<string, string> = {}): string =>
    (table[key] ?? en[key] ?? key).replace(
      /\{(\w+)\}/g,
      (_match, name: string) => values[name] ?? "",
    );
}
