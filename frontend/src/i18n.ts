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
