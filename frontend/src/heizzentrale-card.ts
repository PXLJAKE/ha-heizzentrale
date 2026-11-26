import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";
import { translator, type TextKey } from "./i18n";
import { actionLabel, type Control } from "./control";

// ---------------------------------------------------------------------------
// Types (only what the card needs from Home Assistant)
// ---------------------------------------------------------------------------

interface HassEntity {
  state: string;
  attributes: Record<string, any>;
}

interface Hass {
  states: Record<string, HassEntity | undefined>;
  language?: string;
  locale?: { language?: string };
  callWS<T>(message: Record<string, unknown>): Promise<T>;
  callService?(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  formatEntityAttributeValue?(state: HassEntity, attribute: string, value?: unknown): string;
}

interface Circuit {
  id: string;
  name: string;
  system_type: string;
  flow_entity?: string | null;
  return_entity?: string | null;
  valve_entity?: string | null;
  valve_type: string;
  spread_entity?: string | null;
  open_entity?: string | null;
  pump_group?: string | null;
}

interface Room {
  id: string;
  name: string;
  climate_entity?: string | null;
  window_entities?: string[];
  circuit?: string | null;
  floor?: string | null;
}

interface Buffer {
  id: string;
  name: string;
  sensor_entities: string[];
  volume?: number | null;
  mean_entity?: string | null;
}

interface HeatSource {
  id: string;
  name: string;
  kind: string;
  temperature_entity?: string | null;
  flow_entity?: string | null;
  status_entity?: string | null;
}

interface PumpGroup {
  id: string;
  name: string;
  flow_entity?: string | null;
  return_entity?: string | null;
  status_entity?: string | null;
  control_entity?: string | null;
  control_off_option?: string | null;
  control_on_option?: string | null;
}

interface Plant {
  entry_id: string;
  name: string;
  language?: string | null;
  mode_entity?: string | null;
  outdoor_entity?: string | null;
  heat_sources: HeatSource[];
  all_floors?: Plant["floors"];
  extra_sensors?: ExtraSensor[];
  placed_floors?: Record<string, string>;
  buffers: Buffer[];
  pump_groups?: PumpGroup[];
  circuits: Circuit[];
  rooms: Room[];
  floors: { id: string; name: string; level: number | null }[];
}

interface ExtraSensor {
  id: string;
  entity: string;
  label: string;
  place: string;
}

interface Drag {
  id: string;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  moved: boolean;
  overRoom?: string;
  after?: boolean;
  overFloor?: string;
}

interface CardConfig {
  type?: string;
  entry_id?: string;
  title?: string;
}

type Selection =
  | { kind: "circuit" | "room" | "buffer" | "source" | "pump"; id: string }
  | { kind: "mode" };

// Colours per circuit: taken from the theme where possible so the card fits
// light and dark themes.
const CIRCUIT_COLORS = [
  "#3b82f6",
  "#14b8a6",
  "#a855f7",
  "#f59e0b",
  "#ec4899",
  "#84cc16",
  "#6366f1",
  "#f97316",
];

/** One drawn pipe segment of the house view, in pixels inside the house. */
interface Pipe {
  d: string;
  color: string;
  active: boolean;
}

/** Path through the points with rounded corners. */
function roundedPath(points: [number, number][], radius = 7): string {
  const n = (value: number) => Math.round(value * 10) / 10;
  let d = `M${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const before = Math.hypot(x - px, y - py);
    const after = Math.hypot(nx - x, ny - y);
    const r = Math.min(radius, before / 2, after / 2);
    if (r < 0.5) {
      d += ` L${n(x)} ${n(y)}`;
      continue;
    }
    d += ` L${n(x - ((x - px) / before) * r)} ${n(y - ((y - py) / before) * r)}`;
    d += ` Q${n(x)} ${n(y)} ${n(x + ((nx - x) / after) * r)} ${n(y + ((ny - y) / after) * r)}`;
  }
  const last = points[points.length - 1];
  return `${d} L${n(last[0])} ${n(last[1])}`;
}

const ACTIVE_SOURCE_STATES = new Set(["on", "heat", "heating", "running", "true"]);

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

class HeizzentraleHouseCard extends LitElement {
  static properties = {
    _plants: { state: true },
    _error: { state: true },
    _selection: { state: true },
    _config: { state: true },
    _pipes: { state: true },
    _view: { state: true },
    _pendingTarget: { state: true },
    _control: { state: true },
    _edit: { state: true },
    _drag: { state: true },
    _sensorPlace: { state: true },
    _sensorFilter: { state: true },
  };

  private _hass?: Hass;
  private _config: CardConfig = {};
  private _plants?: Plant[];
  private _error?: string;
  private _selection?: Selection;
  private _loading = false;
  private _watched = new Set<string>();
  private _view: "house" | "settings" = "house";
  private _pendingTarget?: { entity: string; value: number };
  private _targetTimer?: number;
  private _control?: Control;
  private _adviceTimer?: number;
  private _edit = false;
  private _drag?: Drag;
  private _sensorPlace?: { place: string; name: string };
  private _sensorFilter = "";
  private _pipes: Pipe[] = [];
  private _pipeSignature = "";
  private _resize?: ResizeObserver;
  private _observed?: Element;

  static getStubConfig(): CardConfig {
    return {};
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("heizzentrale-house-card-editor");
  }

  setConfig(config: CardConfig): void {
    this._config = { ...config };
  }

  getCardSize(): number {
    return 8;
  }

  getGridOptions() {
    return { columns: "full", min_columns: 6 };
  }

  set hass(hass: Hass) {
    const previous = this._hass;
    this._hass = hass;
    if (!this._plants && !this._loading) {
      void this._load();
      return;
    }
    // Re-render only when an entity shown on the card changed.
    if (!previous) {
      this.requestUpdate();
      return;
    }
    for (const entityId of this._watched) {
      if (previous.states[entityId] !== hass.states[entityId]) {
        this.requestUpdate();
        // What would be switched depends on these states: ask again soon.
        window.clearTimeout(this._adviceTimer);
        this._adviceTimer = window.setTimeout(() => void this._loadControl(), 2500);
        return;
      }
    }
    if (previous.language !== hass.language) this.requestUpdate();
  }

  get hass(): Hass {
    return this._hass as Hass;
  }

  private async _load(): Promise<void> {
    if (!this._hass) return;
    this._loading = true;
    try {
      const result = await this._hass.callWS<{ plants: Plant[] }>({
        type: "heizzentrale/plants",
      });
      this._plants = result.plants;
      this._error = undefined;
      void this._loadControl();
    } catch (err: any) {
      this._error = err?.message ?? String(err);
      this._plants = [];
    } finally {
      this._loading = false;
    }
  }

  /** Schedules, absence rules and what they currently want per room. */
  private async _loadControl(): Promise<void> {
    const plant = this._plant();
    if (!plant || !this._hass) return;
    try {
      this._control = await this._hass.callWS<Control>({
        type: "heizzentrale/control/get",
        entry_id: plant.entry_id,
      });
    } catch {
      this._control = undefined;
    }
  }

  // -- pipes ---------------------------------------------------------------

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resize?.disconnect();
    this._observed = undefined;
    window.clearTimeout(this._adviceTimer);
  }

  protected updated(): void {
    // A native modal dialog sits above everything, whatever the theme or the
    // dashboard does with the card around it.
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog && !dialog.open) dialog.showModal();
    const house = this.renderRoot.querySelector(".house") ?? undefined;
    if (house !== this._observed) {
      this._resize?.disconnect();
      this._observed = house;
      if (house && typeof ResizeObserver !== "undefined") {
        this._resize ??= new ResizeObserver(() => this._measurePipes());
        this._resize.observe(house);
      }
    }
    this._measurePipes();
  }

  /** Circuits that supply at least one room, in the order of their lanes. */
  private _lanes(plant: Plant): Circuit[] {
    return plant.circuits.filter((circuit) =>
      plant.rooms.some((room) => room.circuit === circuit.id),
    );
  }

  /**
   * Work out the pipe routes from where the tiles ended up on screen: the
   * supply line through the plant room, one riser per circuit along the left
   * wall and a branch under every row of rooms it feeds.
   */
  private _measurePipes(): void {
    const house = this.renderRoot.querySelector<HTMLElement>(".house");
    const plant = this._plant();
    const pipes: Pipe[] = [];
    if (house && plant) {
      const origin = house.getBoundingClientRect();
      const box = (element: Element) => {
        const r = element.getBoundingClientRect();
        return {
          top: r.top - origin.top,
          bottom: r.bottom - origin.top,
          center: (r.left + r.right) / 2 - origin.left,
          left: r.left - origin.left,
        };
      };
      const rows = <T extends { bottom: number }>(items: T[]) => {
        const map = new Map<number, T[]>();
        for (const item of items) {
          const key = Math.round(item.bottom);
          map.set(key, [...(map.get(key) ?? []), item]);
        }
        return [...map.entries()].sort((a, b) => a[0] - b[0]).map((entry) => entry[1]);
      };

      // Supply line: heat source, buffer and circuits hang on one line.
      const parts = [...house.querySelectorAll("[data-part]")].map(box);
      const anyOpen = plant.circuits.some((c) => this._circuitOpen(c) !== false);
      const hot = "var(--hz-hot)";
      let previous: number | undefined;
      for (const row of rows(parts)) {
        const y = row[0].bottom + 8;
        const first = row[0];
        const last = row[row.length - 1];
        if (previous !== undefined) {
          pipes.push({ d: roundedPath([[first.center, previous], [first.center, y]]), color: hot, active: anyOpen });
        }
        if (row.length > 1) {
          pipes.push({
            d: roundedPath([
              [first.center, first.bottom - 6],
              [first.center, y],
              [last.center, y],
              [last.center, last.bottom - 6],
            ]),
            color: hot,
            active: anyOpen,
          });
        }
        for (const part of row.slice(1, -1)) {
          pipes.push({ d: roundedPath([[part.center, y], [part.center, part.bottom - 6]]), color: hot, active: anyOpen });
        }
        previous = y;
      }

      const lanes = this._lanes(plant);
      const walls = house.querySelector(".walls");
      const partsTop = house.querySelector(".parts");
      const wallLeft = walls ? box(walls).left + 2 : 0;
      const headerBase = partsTop ? box(partsTop).top : 0;
      lanes.forEach((circuit, lane) => {
        const color = CIRCUIT_COLORS[plant.circuits.indexOf(circuit) % CIRCUIT_COLORS.length];
        const open = this._circuitOpen(circuit) !== false;
        const x = wallLeft + 9 + lane * 6;
        const rooms = [...house.querySelectorAll(`[data-circuit="${circuit.id}"]`)].map(
          (element) => ({ ...box(element), heating: element.classList.contains("heating") }),
        );
        let top: number | undefined;
        for (const row of rows(rooms)) {
          const y = row[0].bottom + 6 + lane * 4;
          top = Math.min(top ?? y, y);
          row.sort((a, b) => a.center - b.center);
          const last = row[row.length - 1];
          pipes.push({
            d: roundedPath([[x, y], [last.center, y], [last.center, last.bottom - 6]]),
            color,
            active: open && row.some((room) => room.heating),
          });
          for (const room of row.slice(0, -1)) {
            pipes.push({
              d: roundedPath([[room.center, y], [room.center, room.bottom - 6]]),
              color,
              active: open && room.heating,
            });
          }
        }
        const tile = house.querySelector(`[data-part="circuit:${circuit.id}"]`);
        if (tile && top !== undefined) {
          const from = box(tile);
          const header = headerBase - 7 - lane * 4;
          const start = from.center + (lane - (lanes.length - 1) / 2) * 6;
          pipes.push({
            d: roundedPath([[start, from.top + 6], [start, header], [x, header], [x, top]]),
            color,
            active: open,
          });
        }
      });
    }
    const signature = JSON.stringify(pipes);
    if (signature !== this._pipeSignature) {
      this._pipeSignature = signature;
      this._pipes = pipes;
    }
  }

  private _renderPipes() {
    return html`<svg class="pipes" aria-hidden="true">
      ${this._pipes.map(
        (pipe) => svg`
          <path class="tube ${pipe.active ? "active" : ""}" d=${pipe.d} style="stroke:${pipe.color}"/>
          ${pipe.active ? svg`<path class="flow" d=${pipe.d} style="stroke:${pipe.color}"/>` : nothing}`,
      )}
    </svg>`;
  }

  // -- helpers --------------------------------------------------------------

  /** Language chosen for the plant, else the language of Home Assistant. */
  private get _language(): string {
    const chosen = this._plant()?.language;
    if (chosen === "de" || chosen === "en") return chosen;
    return this._hass?.locale?.language ?? this._hass?.language ?? "en";
  }

  private get _t() {
    return translator(this._language);
  }

  private async _setLanguage(plant: Plant, language: string): Promise<void> {
    await this._hass?.callWS({
      type: "heizzentrale/set_language",
      entry_id: plant.entry_id,
      language,
    });
    await this._load();
  }

  private _state(entityId?: string | null): HassEntity | undefined {
    if (!entityId) return undefined;
    this._watched.add(entityId);
    return this._hass?.states[entityId];
  }

  private _number(entityId?: string | null): number | undefined {
    const state = this._state(entityId);
    if (!state) return undefined;
    const value = Number(state.state);
    return state.state !== "" && Number.isFinite(value) ? value : undefined;
  }

  private _format(value: number | undefined, unit: string, digits = 1): string {
    if (value === undefined) return "–";
    const language = this._language;
    const text = new Intl.NumberFormat(language, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
    return unit ? `${text} ${unit}` : text;
  }

  private _temp(entityId?: string | null): string {
    const state = this._state(entityId);
    const unit = state?.attributes.unit_of_measurement ?? "°C";
    return this._format(this._number(entityId), unit);
  }

  private _plant(): Plant | undefined {
    if (!this._plants?.length) return undefined;
    return (
      this._plants.find((plant) => plant.entry_id === this._config.entry_id) ??
      this._plants[0]
    );
  }

  /** true = open, false = closed, undefined = unknown. No actuator = open. */
  private _circuitOpen(circuit: Circuit): boolean | undefined {
    if (!circuit.valve_entity) return true;
    const state = this._state(circuit.open_entity)?.state;
    if (state === "on") return true;
    if (state === "off") return false;
    return undefined;
  }

  private _windowOpen(room: Room): boolean {
    // Every contact is read so the card follows all of them.
    return (room.window_entities ?? [])
      .map((entityId) => this._state(entityId)?.state === "on")
      .includes(true);
  }

  private _select(selection: Selection): void {
    const same =
      this._selection &&
      this._selection.kind === selection.kind &&
      (this._selection as any).id === (selection as any).id;
    this._selection = same ? undefined : selection;
    if (!same && selection.kind === "room") void this._loadControl();
  }

  private _key(event: KeyboardEvent, selection: Selection): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._select(selection);
    }
  }

  private _isSelected(kind: string, id?: string): boolean {
    const selection = this._selection as any;
    return !!selection && selection.kind === kind && selection.id === id;
  }

  // -- render ---------------------------------------------------------------

  protected render() {
    this._watched.clear();
    const t = this._t;
    if (!this._plants) {
      return html`<ha-card><div class="note">${t("loading")}</div></ha-card>`;
    }
    const plant = this._plant();
    if (!plant) {
      return html`<ha-card
        ><div class="note">${this._error ?? t("no_plant")}</div></ha-card
      >`;
    }
    const empty =
      !plant.rooms.length &&
      !plant.circuits.length &&
      !plant.buffers.length &&
      !plant.pump_groups?.length &&
      !plant.heat_sources.length;

    const colors = new Map<string, string>();
    plant.circuits.forEach((circuit, index) =>
      colors.set(circuit.id, CIRCUIT_COLORS[index % CIRCUIT_COLORS.length]),
    );

    return html`
      <ha-card>
        ${this._renderHeader(plant)}
        ${empty && this._view === "house"
          ? html`<div class="settings">${this._renderSetup(plant)}</div>`
          : nothing}
        ${this._view === "settings"
          ? this._renderSettings(plant, colors)
          : html`${empty ? nothing : this._renderHouse(plant, colors)}
            ${this._renderExplanation(plant)} ${this._renderRoomDialog(plant, colors)}
            ${this._renderSensorDialog(plant)}`}
      </ha-card>
    `;
  }

  private _renderHeader(plant: Plant) {
    const t = this._t;
    const mode = this._state(plant.mode_entity)?.state;
    const outdoor = plant.outdoor_entity
      ? html`<span class="chip" title=${t("outdoor")}
          >${t("outdoor")} ${this._temp(plant.outdoor_entity)}</span
        >`
      : nothing;
    const modeChip =
      mode === "observe" || mode === "off"
        ? html`<button
            class="chip mode ${mode}"
            @click=${() => this._select({ kind: "mode" })}
          >
            ${t(mode === "observe" ? "mode_observe" : "mode_off")}
          </button>`
        : nothing;
    return html`
      <div class="header">
        <h2>${this._config.title || plant.name}</h2>
        <div class="chips">
          ${outdoor}${modeChip}
          ${this._view === "house" && plant.rooms.length
            ? html`<button
                class="chip ${this._edit ? "on" : "icon"}"
                aria-label=${t(this._edit ? "edit_done" : "edit_house")}
                title=${t(this._edit ? "edit_done" : "edit_house")}
                aria-pressed=${this._edit}
                @click=${() => {
                  this._selection = undefined;
                  this._edit = !this._edit;
                }}
              >
                ${this._edit ? t("edit_done") : ICON_PENCIL}
              </button>`
            : nothing}
          <button
            class="chip icon ${this._view === "settings" ? "on" : ""}"
            aria-label=${t(this._view === "settings" ? "back" : "settings")}
            title=${t(this._view === "settings" ? "back" : "settings")}
            @click=${() => {
              this._selection = undefined;
              this._view = this._view === "settings" ? "house" : "settings";
              this._edit = false;
              void this._loadControl();
            }}
          >
            ${this._view === "settings" ? ICON_HOME : ICON_GEAR}
          </button>
        </div>
      </div>
    `;
  }

  /**
   * The house as a cross-section: roof, one storey per floor, the ground
   * line, then everything below ground including the plant room.
   */
  private _renderHouse(plant: Plant, colors: Map<string, string>) {
    const t = this._t;
    const known = new Set(plant.floors.map((floor) => floor.id));
    const edit = this._edit;
    const floors = edit ? (plant.all_floors ?? plant.floors) : plant.floors;
    const hasStove = (floorId: string) =>
      (this._control?.stoves ?? []).some((stove) => !stove.room && stove.floor === floorId);
    const storey = (name: string, rooms: Room[], floorId = "") =>
      rooms.length || (floorId && (edit || hasStove(floorId)))
        ? html`
            <section
              class="storey ${this._drag?.moved && this._drag.overFloor === floorId
                ? "drop"
                : ""}"
              data-floor=${floorId}
            >
              ${name ? html`<div class="floor-name">${name}</div>` : nothing}
              <div class="rooms">
                ${rooms.map((room) => this._renderRoom(plant, room, colors))}
                ${floorId ? this._renderStoveTiles(floorId) : nothing}
                ${rooms.length || !edit ? nothing : html`<div class="drop-hint">${t("edit_drop")}</div>`}
              </div>
            </section>
          `
        : nothing;
    const roomsOf = (floorId: string) =>
      plant.rooms.filter((room) => room.floor === floorId);
    const above = floors.filter((floor) => (floor.level ?? 0) >= 0);
    const below = floors.filter((floor) => (floor.level ?? 0) < 0);
    const rest = plant.rooms.filter((room) => !room.floor || !known.has(room.floor));
    return html`
      <div class="house" style="--hz-lanes:${this._lanes(plant).length}">
        ${edit ? nothing : this._renderPipes()}
        ${edit ? html`<p class="edit-note">${t("edit_note")}</p>` : nothing}
        <div class="roof">${ROOF}</div>
        <div class="walls">
          ${above.map((floor) => storey(floor.name, roomsOf(floor.id), floor.id))}
          ${storey(floors.length ? t("other_rooms") : "", rest)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${below.map((floor) => storey(floor.name, roomsOf(floor.id), floor.id))}
          ${this._renderPlantRoom(plant, colors)}
        </div>
      </div>
    `;
  }

  private _renderRoom(plant: Plant, room: Room, colors: Map<string, string>) {
    const t = this._t;
    const climate = this._state(room.climate_entity);
    const attributes = climate?.attributes ?? {};
    const unavailable =
      !climate || climate.state === "unavailable" || climate.state === "unknown";
    const heating = attributes.hvac_action === "heating";
    const windowOpen = this._windowOpen(room);
    const unit = "°";
    const current = attributes.current_temperature as number | undefined;
    const target = attributes.temperature as number | undefined;
    const preset =
      attributes.preset_mode && attributes.preset_mode !== "none"
        ? String(attributes.preset_mode)
        : undefined;
    const circuit = plant.circuits.find((item) => item.id === room.circuit);
    const selection: Selection = { kind: "room", id: room.id };
    const drag = this._drag?.id === room.id && this._drag.moved ? this._drag : undefined;
    const dropSide =
      this._drag?.moved && this._drag.overRoom === room.id
        ? this._drag.after
          ? "drop-after"
          : "drop-before"
        : "";
    return html`
      <div
        class="room ${heating ? "heating" : ""} ${unavailable ? "off" : ""}
          ${this._isSelected("room", room.id) ? "selected" : ""}
          ${this._edit ? "editing" : ""} ${drag ? "dragging" : ""} ${dropSide}"
        style=${drag ? `transform:translate(${drag.dx}px,${drag.dy}px)` : nothing}
        role="button"
        tabindex="0"
        data-room=${room.id}
        data-circuit=${circuit?.id ?? nothing}
        @click=${() => !this._edit && this._select(selection)}
        @keydown=${(event: KeyboardEvent) => !this._edit && this._key(event, selection)}
        @pointerdown=${(event: PointerEvent) => this._dragStart(event, room)}
        @pointermove=${(event: PointerEvent) => this._dragMove(event)}
        @pointerup=${(event: PointerEvent) => this._dragEnd(event, plant)}
        @pointercancel=${() => (this._drag = undefined)}
      >
        <div class="room-top">
          <span class="room-name"
            >${circuit
              ? html`<span class="dot" style="background:${colors.get(circuit.id)}"></span>`
              : nothing}${room.name}</span
          >
          <span class="icons">
            ${this._edit ? html`<span class="grip" title=${t("edit_grip")}>⠿</span>` : nothing}
            ${windowOpen
              ? html`<span class="badge window" title=${t("window_open")}
                  >${ICON_WINDOW}</span
                >`
              : nothing}
            ${heating
              ? html`<span class="badge flame" title=${t("heating")}
                  >${ICON_FLAME}</span
                >`
              : nothing}
          </span>
        </div>
        <div class="room-temp">
          ${this._format(typeof current === "number" ? current : undefined, "")}<span
            class="unit"
            >${unit}</span
          >
        </div>
        <div class="room-bottom">
          <span
            >${t("target")}
            ${climate?.state === "off"
              ? "–"
              : this._format(typeof target === "number" ? target : undefined, "")}${unit}</span
          >
          ${preset
            ? html`<span class="preset">${this._presetLabel(climate, preset)}</span>`
            : nothing}
        </div>
        ${(this._control?.stoves ?? [])
          .filter((stove) => stove.room === room.id)
          .map((stove) => {
            const burning = this._control?.burning?.includes(stove.id);
            return html`<div class="stove ${burning ? "burning" : ""}">
              ${ICON_FLAME}<span class="stove-name">${stove.name || t("stove")}</span>
              <span>${this._format(this._number(stove.sensor), "°", 0)}</span>
            </div>`;
          })}
        ${this._renderExtras(plant, `room:${room.id}`)}
        ${this._edit
          ? html`<div class="edit-row">
              <button
                aria-label=${t("edit_left")}
                title=${t("edit_left")}
                @click=${() => this._nudge(plant, room, -1)}
              >
                ◀
              </button>
              <button
                class="grow"
                @click=${() =>
                  (this._sensorPlace = { place: `room:${room.id}`, name: room.name })}
              >
                + ${t("edit_sensor")}
              </button>
              <button
                aria-label=${t("edit_right")}
                title=${t("edit_right")}
                @click=${() => this._nudge(plant, room, 1)}
              >
                ▶
              </button>
            </div>`
          : nothing}
      </div>
    `;
  }

  /** Stoves standing in a room without a thermostat get a tile of their own. */
  private _renderStoveTiles(floorId: string) {
    const t = this._t;
    return (this._control?.stoves ?? [])
      .filter((stove) => !stove.room && stove.floor === floorId)
      .map((stove) => {
        const burning = !!this._control?.burning?.includes(stove.id);
        return html`<div class="room stove-tile ${burning ? "heating" : ""}">
          <div class="room-top">
            <span class="room-name">${stove.name || t("stove")}</span>
            <span class="icons"
              >${burning
                ? html`<span class="badge flame" title=${t("stove_burning")}>${ICON_FLAME}</span>`
                : nothing}</span
            >
          </div>
          <div class="room-temp">
            ${this._format(this._number(stove.sensor), "", 0)}<span class="unit">°</span>
          </div>
          <div class="room-bottom">
            <span>${t(burning ? "stove_burning" : "stove_out")}</span>
            <span class="preset">${t("stove")}</span>
          </div>
        </div>`;
      });
  }

  // -- edit mode ------------------------------------------------------------

  /** Extra sensors the user put on a tile. */
  private _renderExtras(plant: Plant, place: string) {
    const extras = (plant.extra_sensors ?? []).filter((item) => item.place === place);
    if (!extras.length) return nothing;
    return html`<div class="extras">
      ${extras.map((item) => {
        const state = this._state(item.entity);
        const number = this._number(item.entity);
        const unit = state?.attributes.unit_of_measurement ?? "";
        const value =
          number !== undefined
            ? this._format(number, unit, Math.abs(number) >= 100 ? 0 : 1)
            : (state?.state ?? "–");
        return html`<div class="extra">
          <span class="extra-name"
            >${item.label || state?.attributes.friendly_name || item.entity}</span
          ><span>${value}</span>
        </div>`;
      })}
    </div>`;
  }

  private async _saveLayout(plant: Plant, change: Record<string, unknown>): Promise<void> {
    try {
      const result = await this._hass!.callWS<{ plants: Plant[] }>({
        type: "heizzentrale/layout/save",
        entry_id: plant.entry_id,
        ...change,
      });
      this._plants = result.plants;
      this._error = undefined;
    } catch (err: any) {
      this._error = err?.message ?? String(err);
    }
  }

  /** Put a room before or after another one, or at the end of a floor. */
  private _moveRoom(
    plant: Plant,
    roomId: string,
    floorId: string | undefined,
    other?: string,
    after = false,
  ): void {
    const order = plant.rooms.map((room) => room.id).filter((id) => id !== roomId);
    const index = other ? order.indexOf(other) : -1;
    if (index >= 0) order.splice(index + (after ? 1 : 0), 0, roomId);
    else order.push(roomId);
    const floors = { ...(plant.placed_floors ?? {}) };
    if (floorId) floors[roomId] = floorId;
    else if (floorId === "") delete floors[roomId];
    // Show the result at once; the answer of the server confirms it.
    const byId = new Map(plant.rooms.map((room) => [room.id, room]));
    plant.rooms = order.map((id) => {
      const room = byId.get(id)!;
      return id === roomId && floorId ? { ...room, floor: floorId } : room;
    });
    this.requestUpdate();
    void this._saveLayout(plant, { order, floors });
  }

  /** Move a room one place to the left or right within its floor. */
  private _nudge(plant: Plant, room: Room, step: number): void {
    const same = plant.rooms.filter((item) => (item.floor ?? "") === (room.floor ?? ""));
    const other = same[same.indexOf(room) + step];
    if (other) this._moveRoom(plant, room.id, undefined, other.id, step > 0);
  }

  private _dragStart(event: PointerEvent, room: Room): void {
    if (!this._edit || event.button !== 0) return;
    if ((event.target as Element).closest("button")) return;
    // By touch only the grip drags, so the page can still be scrolled.
    if (event.pointerType !== "mouse" && !(event.target as Element).closest(".grip")) return;
    (event.currentTarget as Element).setPointerCapture(event.pointerId);
    this._drag = {
      id: room.id,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      dy: 0,
      moved: false,
    };
  }

  private _dragMove(event: PointerEvent): void {
    const drag = this._drag;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const next: Drag = { ...drag, dx, dy, moved: drag.moved || Math.hypot(dx, dy) > 6 };
    next.overRoom = next.overFloor = undefined;
    // The dragged tile lets the pointer through, so this finds what is below.
    const root = this.renderRoot as ShadowRoot;
    const below = root.elementsFromPoint?.(event.clientX, event.clientY) ?? [];
    for (const element of below) {
      const tile = element.closest?.(".room[data-room]") as HTMLElement | null;
      if (tile && tile.dataset.room !== drag.id) {
        const box = tile.getBoundingClientRect();
        next.overRoom = tile.dataset.room;
        next.after = event.clientX > box.left + box.width / 2;
      }
      const storey = element.closest?.(".storey[data-floor]") as HTMLElement | null;
      if (storey) {
        next.overFloor = storey.dataset.floor ?? "";
        break;
      }
    }
    this._drag = next;
  }

  private _dragEnd(_event: PointerEvent, plant: Plant): void {
    const drag = this._drag;
    this._drag = undefined;
    if (!drag?.moved || drag.overFloor === undefined) return;
    this._moveRoom(plant, drag.id, drag.overFloor, drag.overRoom, drag.after);
  }

  private _renderSensorDialog(plant: Plant) {
    const target = this._sensorPlace;
    if (!target) return nothing;
    const t = this._t;
    const extras = plant.extra_sensors ?? [];
    const here = extras.filter((item) => item.place === target.place);
    const close = () => {
      this._sensorPlace = undefined;
      this._sensorFilter = "";
    };
    const filter = this._sensorFilter.trim().toLowerCase();
    const name = (entityId: string) =>
      String(this._hass?.states[entityId]?.attributes.friendly_name ?? entityId);
    const candidates = Object.keys(this._hass?.states ?? {})
      .filter((entityId) => entityId.startsWith("sensor."))
      .filter(
        (entityId) =>
          !filter ||
          entityId.toLowerCase().includes(filter) ||
          name(entityId).toLowerCase().includes(filter),
      )
      .sort((a, b) => name(a).localeCompare(name(b)))
      .slice(0, 200);
    const add = () => {
      const select = this.renderRoot.querySelector<HTMLSelectElement>("#extra-entity");
      const label = this.renderRoot.querySelector<HTMLInputElement>("#extra-label");
      if (!select?.value) return;
      const item: ExtraSensor = {
        id: Math.random().toString(36).slice(2, 10),
        entity: select.value,
        label: label?.value.trim() ?? "",
        place: target.place,
      };
      if (label) label.value = "";
      void this._saveLayout(plant, { sensors: [...extras, item] });
    };
    return html`
      <dialog class="backdrop" aria-label=${t("edit_sensor")} @click=${close} @cancel=${close}>
        <div class="sheet" @click=${(event: Event) => event.stopPropagation()}>
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${t("edit_sensor_title", { name: target.name })}</div>
              <div class="sheet-sub">${t("edit_sensor_hint")}</div>
            </div>
            <button class="close" aria-label=${t("close")} @click=${close}>✕</button>
          </div>
          ${here.map(
            (item) =>
              html`<div class="extra-row">
                <span>${item.label || name(item.entity)}</span>
                <button
                  class="close"
                  aria-label=${t("remove")}
                  @click=${() =>
                    this._saveLayout(plant, {
                      sensors: extras.filter((other) => other.id !== item.id),
                    })}
                >
                  ✕
                </button>
              </div>`,
          )}
          <input
            class="field"
            type="search"
            placeholder=${t("edit_sensor_search")}
            aria-label=${t("edit_sensor_search")}
            .value=${this._sensorFilter}
            @input=${(event: Event) =>
              (this._sensorFilter = (event.target as HTMLInputElement).value)}
          />
          <select id="extra-entity" class="field" aria-label=${t("edit_sensor")}>
            ${candidates.map(
              (entityId) => html`<option value=${entityId}>${name(entityId)}</option>`,
            )}
          </select>
          <input
            id="extra-label"
            class="field"
            type="text"
            maxlength="30"
            placeholder=${t("edit_sensor_label")}
            aria-label=${t("edit_sensor_label")}
          />
          <button class="wide primary" ?disabled=${!candidates.length} @click=${add}>
            ${t("edit_sensor_add")}
          </button>
        </div>
      </dialog>
    `;
  }

  private _renderPlantRoom(plant: Plant, colors: Map<string, string>) {
    const t = this._t;
    if (
      !plant.heat_sources.length &&
      !plant.buffers.length &&
      !plant.circuits.length &&
      !plant.pump_groups?.length
    ) {
      return nothing;
    }
    const anyOpen = plant.circuits.some((circuit) => this._circuitOpen(circuit) !== false);
    return html`
      <section class="storey plant-room">
        <div class="floor-name">${t("plant_room")}</div>
        <div class="parts">
          ${plant.heat_sources.map((source) => this._renderSource(source, anyOpen))}
          ${plant.buffers.map((buffer) => this._renderBuffer(buffer, anyOpen))}
          ${(plant.pump_groups ?? []).map((group) => this._renderPumpGroup(plant, group))}
          ${plant.circuits.map((circuit) =>
            this._renderCircuit(circuit, colors.get(circuit.id) ?? "gray"),
          )}
        </div>
      </section>
    `;
  }

  private _part(
    selection: Selection & { id: string },
    flowing: boolean,
    body: TemplateResult,
    extraClass = "",
  ) {
    return html`
      <div
        class="part ${flowing ? "flowing" : ""} ${extraClass}
          ${this._isSelected(selection.kind, selection.id) ? "selected" : ""}"
        role="button"
        tabindex="0"
        data-part="${selection.kind}:${selection.id}"
        @click=${() => !this._edit && this._select(selection)}
        @keydown=${(event: KeyboardEvent) => !this._edit && this._key(event, selection)}
      >
        ${body}
        ${this._plant() ? this._renderExtras(this._plant()!, `${selection.kind}:${selection.id}`) : nothing}
        ${this._edit && selection.kind !== "mode"
          ? html`<button
              class="edit-add"
              @click=${(event: Event) => {
                event.stopPropagation();
                this._sensorPlace = {
                  place: `${selection.kind}:${selection.id}`,
                  name:
                    (event.currentTarget as Element)
                      .closest(".part")
                      ?.querySelector(".part-name")
                      ?.textContent?.trim() ?? "",
                };
              }}
            >
              + ${this._t("edit_sensor")}
            </button>`
          : nothing}
      </div>
    `;
  }

  private _sourceActive(source: HeatSource): boolean {
    const state = this._state(source.status_entity)?.state?.toLowerCase();
    return !!state && ACTIVE_SOURCE_STATES.has(state);
  }

  private _renderSource(source: HeatSource, flowing: boolean) {
    const t = this._t;
    const active = this._sourceActive(source);
    return this._part(
      { kind: "source", id: source.id },
      flowing,
      html`
        <div class="part-name">${source.name}</div>
        <div class="figure">${boilerFigure(active)}</div>
        <div class="big">
          ${source.temperature_entity
            ? this._temp(source.temperature_entity)
            : source.flow_entity
              ? this._temp(source.flow_entity)
              : "–"}
        </div>
        <div class="sub">
          ${active ? t("running") : t(`kind_${source.kind}` as TextKey)}
        </div>
      `,
    );
  }

  private _renderBuffer(buffer: Buffer, flowing: boolean) {
    const temps = buffer.sensor_entities.map((entityId) => this._number(entityId));
    return this._part(
      { kind: "buffer", id: buffer.id },
      flowing,
      html`
        <div class="part-name">${buffer.name}</div>
        <div class="figure buffer-figure">
          ${tankFigure(temps)}
          <div class="tank-values">
            ${buffer.sensor_entities.map(
              (entityId) => html`<span>${this._temp(entityId)}</span>`,
            )}
          </div>
        </div>
        <div class="sub">
          ${buffer.volume ? `${this._format(buffer.volume, "l", 0)}` : nothing}
        </div>
      `,
    );
  }

  /** true = running, false = stopped, undefined = no status entity. */
  private _pumpRunning(group: PumpGroup): boolean | undefined {
    const state = this._state(group.status_entity)?.state?.toLowerCase();
    if (!state || state === "unavailable" || state === "unknown") return undefined;
    return ACTIVE_SOURCE_STATES.has(state);
  }

  private _renderPumpGroup(plant: Plant, group: PumpGroup) {
    const t = this._t;
    const running = this._pumpRunning(group);
    const needed = plant.circuits
      .filter((circuit) => circuit.pump_group === group.id)
      .some((circuit) => this._circuitOpen(circuit) !== false);
    return this._part(
      { kind: "pump", id: group.id },
      needed,
      html`
        <div class="part-name">${group.name}</div>
        <div class="figure">${pumpFigure(running ?? needed)}</div>
        <div class="big">${group.flow_entity ? this._temp(group.flow_entity) : "–"}</div>
        ${group.return_entity
          ? html`<div class="pair">
              <span class="hot">${this._temp(group.flow_entity)}</span>
              <span class="cold">${this._temp(group.return_entity)}</span>
            </div>`
          : nothing}
        <div class="sub ${running ? "status-open" : ""}">
          ${running === undefined ? t("pump_group") : t(running ? "running" : "pump_stopped")}
        </div>
        ${this._renderWould(this._control?.advice?.pump_groups[group.id]?.action)}
      `,
    );
  }

  private _renderCircuit(circuit: Circuit, color: string) {
    const t = this._t;
    const open = this._circuitOpen(circuit);
    const spread = this._number(circuit.spread_entity);
    const status = open === undefined ? "unknown" : open ? "open" : "closed";
    return this._part(
      { kind: "circuit", id: circuit.id },
      open !== false,
      html`
        <div class="part-name">
          <span class="dot" style="background:${color}"></span>${circuit.name}
        </div>
        <div class="figure">${valveFigure(status)}</div>
        <div class="big">
          ${spread === undefined ? "–" : `Δ ${this._format(spread, "K")}`}
        </div>
        <div class="pair">
          <span class="hot">${this._temp(circuit.flow_entity)}</span>
          <span class="cold">${this._temp(circuit.return_entity)}</span>
        </div>
        <div class="sub status-${status}">${t(status)}</div>
        ${this._renderWould(this._control?.advice?.circuits[circuit.id]?.action)}
      `,
      `circuit-${status}`,
    );
  }

  /** "Would close now": what switching would do, shown while only observing. */
  private _renderWould(action?: string | null) {
    if (!action) return nothing;
    return html`<div class="would">${this._t(`would_${action}` as TextKey)}</div>`;
  }

  // -- explanations ---------------------------------------------------------

  private _explain(
    plant: Plant,
    selection: Selection,
  ): { title: string; lines: string[] } | undefined {
    const t = this._t;
    let title = "";
    let lines: string[] = [];

    if (selection.kind === "mode") {
      const mode = this._state(plant.mode_entity)?.state;
      title = t(mode === "off" ? "mode_off" : "mode_observe");
      lines = [t(mode === "off" ? "x_mode_off" : "x_mode_observe")];
    } else if (selection.kind === "circuit") {
      const circuit = plant.circuits.find((item) => item.id === selection.id);
      if (!circuit) return undefined;
      title = circuit.name;
      lines.push(
        t("x_what_circuit", {
          name: circuit.name,
          system: t(`system_${circuit.system_type}` as TextKey),
        }),
      );
      const spread = this._number(circuit.spread_entity);
      lines.push(
        spread === undefined
          ? t("x_no_spread")
          : t("x_spread", {
              flow: this._temp(circuit.flow_entity),
              ret: this._temp(circuit.return_entity),
              spread: this._format(spread, "K"),
            }),
      );
      const open = this._circuitOpen(circuit);
      if (!circuit.valve_entity) lines.push(t("x_no_valve"));
      else if (open === undefined) lines.push(t("x_valve_unknown"));
      else if (circuit.valve_entity.startsWith("valve."))
        lines.push(t(open ? "x_open_valve" : "x_closed_valve"));
      else
        lines.push(
          t(
            `x_${open ? "open" : "closed"}_${circuit.valve_type === "no" ? "no" : "nc"}` as TextKey,
          ),
        );
      const rooms = plant.rooms
        .filter((room) => room.circuit === circuit.id)
        .map((room) => room.name);
      if (rooms.length) lines.push(t("x_rooms_on", { rooms: rooms.join(", ") }));
      const advice = this._control?.advice?.circuits[circuit.id];
      if (advice) {
        lines.push(
          t(`x_adv_${advice.reason}` as TextKey, { rooms: advice.rooms.join(", ") }),
        );
        if (advice.action) lines.push(t(`x_adv_would_${advice.action}` as TextKey));
      }
    } else if (selection.kind === "room") {
      const room = plant.rooms.find((item) => item.id === selection.id);
      if (!room) return undefined;
      title = room.name;
      const climate = this._state(room.climate_entity);
      const attributes = climate?.attributes ?? {};
      const values = {
        name: room.name,
        current: this._format(attributes.current_temperature, "°C"),
        target: this._format(attributes.temperature, "°C"),
      };
      if (!climate || climate.state === "unavailable" || climate.state === "unknown")
        lines.push(t("x_room_unavailable", values));
      else if (climate.state === "off") lines.push(t("x_room_off", values));
      else if (attributes.hvac_action === "heating")
        lines.push(t("x_room_heating", values));
      else lines.push(t("x_room_idle", values));
      if (this._windowOpen(room))
        lines.push(t("x_room_window"));
      if (attributes.preset_mode && attributes.preset_mode !== "none")
        lines.push(
          t("x_room_preset", {
            preset: this._presetLabel(climate, String(attributes.preset_mode)),
          }),
        );
      const circuit = plant.circuits.find((item) => item.id === room.circuit);
      if (circuit) lines.push(t("x_room_circuit", { circuit: circuit.name }));
    } else if (selection.kind === "pump") {
      const group = plant.pump_groups?.find((item) => item.id === selection.id);
      if (!group) return undefined;
      title = group.name;
      lines.push(t("x_pump", { name: group.name }));
      if (group.flow_entity)
        lines.push(t("x_pump_flow", { temp: this._temp(group.flow_entity) }));
      const fed = plant.circuits.filter((circuit) => circuit.pump_group === group.id);
      if (fed.length) {
        const open = fed.filter((circuit) => this._circuitOpen(circuit) !== false);
        lines.push(
          open.length
            ? t("x_pump_needed", { circuits: open.map((c) => c.name).join(", ") })
            : t("x_pump_idle"),
        );
      }
      const running = this._pumpRunning(group);
      if (running !== undefined)
        lines.push(t(running ? "x_pump_running" : "x_pump_stopped"));
      lines.push(t(group.control_entity ? "x_pump_control" : "x_pump_no_control"));
      if (group.control_off_option && group.control_on_option)
        lines.push(
          t("x_pump_modes", { off: group.control_off_option, on: group.control_on_option }),
        );
      const advice = this._control?.advice?.pump_groups[group.id];
      if (advice?.reason === "manual") lines.push(t("x_padv_manual"));
      else if (advice?.action) lines.push(t(`x_padv_would_${advice.action}` as TextKey));
    } else if (selection.kind === "buffer") {
      const buffer = plant.buffers.find((item) => item.id === selection.id);
      if (!buffer) return undefined;
      title = buffer.name;
      lines.push(t("x_buffer", { name: buffer.name }));
      if (this._number(buffer.mean_entity) !== undefined)
        lines.push(t("x_buffer_mean", { mean: this._temp(buffer.mean_entity) }));
    } else {
      const source = plant.heat_sources.find((item) => item.id === selection.id);
      if (!source) return undefined;
      title = source.name;
      const raw = this._state(source.status_entity)?.state;
      lines.push(
        t("x_source", {
          name: source.name,
          status: this._sourceActive(source) ? t("running") : (raw ?? t("unknown")),
        }),
      );
      const tempEntity = source.temperature_entity ?? source.flow_entity;
      if (tempEntity) lines.push(t("x_source_temp", { temp: this._temp(tempEntity) }));
    }

    return { title, lines };
  }

  private _presetLabel(climate: HassEntity | undefined, preset: string): string {
    if (climate && this._hass?.formatEntityAttributeValue) {
      return this._hass.formatEntityAttributeValue(climate, "preset_mode", preset);
    }
    return preset;
  }

  private _renderExplanation(plant: Plant) {
    const selection = this._selection;
    if (!selection || selection.kind === "room") return nothing;
    const explained = this._explain(plant, selection);
    if (!explained) return nothing;
    return html`
      <div class="explain" role="status">
        <div class="explain-head">
          <strong>${explained.title}</strong>
          <button
            class="close"
            aria-label=${this._t("close")}
            @click=${() => (this._selection = undefined)}
          >
            ✕
          </button>
        </div>
        ${explained.lines.map((line) => html`<p>${line}</p>`)}
      </div>
    `;
  }

  // -- room window ----------------------------------------------------------

  private _call(domain: string, service: string, data: Record<string, unknown>): void {
    void this._hass?.callService?.(domain, service, data);
  }

  /** Change the setpoint; the call goes out once the taps have stopped. */
  private _setTarget(entity: string, value: number, min: number, max: number): void {
    const target = Math.round(Math.min(max, Math.max(min, value)) * 10) / 10;
    this._pendingTarget = { entity, value: target };
    window.clearTimeout(this._targetTimer);
    this._targetTimer = window.setTimeout(() => {
      this._call("climate", "set_temperature", { entity_id: entity, temperature: target });
      this._targetTimer = window.setTimeout(() => (this._pendingTarget = undefined), 2500);
    }, 700);
  }

  private _renderRoomDialog(plant: Plant, colors: Map<string, string>) {
    const selection = this._selection;
    if (!selection || selection.kind !== "room") return nothing;
    const room = plant.rooms.find((item) => item.id === selection.id);
    if (!room?.climate_entity) return nothing;
    const t = this._t;
    const entity = room.climate_entity;
    const climate = this._state(entity);
    const a = climate?.attributes ?? {};
    const available =
      !!climate && climate.state !== "unavailable" && climate.state !== "unknown";
    const off = climate?.state === "off";
    const step = Number(a.target_temp_step) || 0.5;
    const min = typeof a.min_temp === "number" ? a.min_temp : 5;
    const max = typeof a.max_temp === "number" ? a.max_temp : 30;
    const pending =
      this._pendingTarget?.entity === entity ? this._pendingTarget.value : undefined;
    const target = pending ?? (typeof a.temperature === "number" ? a.temperature : undefined);
    const presets: string[] = Array.isArray(a.preset_modes)
      ? a.preset_modes.filter((preset: string) => preset !== "none")
      : [];
    const modes: string[] = Array.isArray(a.hvac_modes) ? a.hvac_modes : [];
    const onMode = ["heat", "auto", "heat_cool"].find((mode) => modes.includes(mode));
    const circuit = plant.circuits.find((item) => item.id === room.circuit);
    const floor = plant.floors.find((item) => item.id === room.floor);
    const close = () => (this._selection = undefined);
    const lines = this._explain(plant, selection)?.lines ?? [];
    const where = [circuit ? `${t("circuit")} ${circuit.name}` : "", floor?.name ?? ""]
      .filter(Boolean)
      .join(" · ");
    return html`
      <dialog
        class="backdrop"
        aria-label=${room.name}
        @click=${close}
        @cancel=${close}
      >
        <div
          class="sheet"
          @click=${(event: Event) => event.stopPropagation()}
          @keydown=${(event: KeyboardEvent) => event.key === "Escape" && close()}
        >
          <div class="sheet-head">
            <div>
              <div class="sheet-title">${room.name}</div>
              <div class="sheet-sub">
                ${circuit
                  ? html`<span class="dot" style="background:${colors.get(circuit.id)}"></span>`
                  : nothing}${where}
              </div>
            </div>
            <button class="close" aria-label=${t("close")} @click=${close}>✕</button>
          </div>
          <div class="sheet-now ${a.hvac_action === "heating" ? "heating" : ""}">
            <span class="now-value"
              >${this._format(
                typeof a.current_temperature === "number" ? a.current_temperature : undefined,
                "",
              )}°</span
            >
            <span class="now-label"
              >${a.hvac_action === "heating" ? t("heating") : off ? t("mode_off") : t("idle")}</span
            >
          </div>
          <div class="stepper">
            <button
              aria-label="−"
              ?disabled=${!available || off || target === undefined || target <= min}
              @click=${() => this._setTarget(entity, (target ?? min) - step, min, max)}
            >
              −
            </button>
            <div class="stepper-value">
              <span>${off ? "–" : `${this._format(target, "")}°`}</span>
              <small>${t("target")}</small>
            </div>
            <button
              aria-label="+"
              ?disabled=${!available || off || target === undefined || target >= max}
              @click=${() => this._setTarget(entity, (target ?? min) + step, min, max)}
            >
              +
            </button>
          </div>
          ${presets.length
            ? html`<div class="choices">
                ${presets.map(
                  (preset) =>
                    html`<button
                      class="choice ${a.preset_mode === preset ? "on" : ""}"
                      ?disabled=${!available || off}
                      @click=${() =>
                        this._call("climate", "set_preset_mode", {
                          entity_id: entity,
                          preset_mode: preset,
                        })}
                    >
                      ${this._presetLabel(climate, preset)}
                    </button>`,
                )}
              </div>`
            : nothing}
          ${modes.includes("off") && onMode
            ? html`<button
                class="wide"
                ?disabled=${!available}
                @click=${() =>
                  this._call("climate", "set_hvac_mode", {
                    entity_id: entity,
                    hvac_mode: off ? onMode : "off",
                  })}
              >
                ${t(off ? "room_turn_on" : "room_turn_off")}
              </button>`
            : nothing}
          <div class="why">
            <div class="why-title">${t("why")}</div>
            ${lines.map((line) => html`<p>${line}</p>`)}
          </div>
          ${this._renderPlan(room)}
          <button
            class="link"
            @click=${() => {
              close();
              this.dispatchEvent(
                new CustomEvent("hass-more-info", {
                  detail: { entityId: entity },
                  bubbles: true,
                  composed: true,
                }),
              );
            }}
          >
            ${t("open_thermostat")}
          </button>
        </div>
      </dialog>
    `;
  }

  /** What the schedule or an absence rule wants for this room right now. */
  private _renderPlan(room: Room) {
    const control = this._control;
    if (
      !control ||
      (!control.schedules.length && !control.rules.length && !control.stoves?.length)
    )
      return nothing;
    const t = this._t;
    const plan = control.rooms[room.id];
    const action = plan
      ? actionLabel(plan.action, t, this._hass as any, room.climate_entity)
      : "";
    return html`
      <div class="why">
        <div class="why-title">${t("plan")}</div>
        ${plan
          ? html`<p>
                ${t(`plan_${plan.source}` as TextKey, {
                  name: plan.name,
                  action,
                })}
              </p>
              ${control.enabled ? nothing : html`<p>${t("plan_would")}</p>`}`
          : html`<p>${t("plan_none")}</p>`}
      </div>
    `;
  }

  // -- settings -------------------------------------------------------------

  private _navigate(path: string): void {
    history.pushState(null, "", path);
    window.dispatchEvent(
      new CustomEvent("location-changed", { bubbles: true, composed: true }),
    );
  }

  /** The setup as a short list in the order that makes sense. */
  private _renderSetup(plant: Plant) {
    const t = this._t;
    const steps: { key: string; done: boolean; optional: boolean }[] = [
      { key: "source", done: plant.heat_sources.length > 0, optional: false },
      { key: "buffer", done: plant.buffers.length > 0, optional: true },
      { key: "pump", done: (plant.pump_groups?.length ?? 0) > 0, optional: true },
      { key: "circuits", done: plant.circuits.length > 0, optional: false },
      { key: "rooms", done: plant.rooms.length > 0, optional: false },
    ];
    const open = steps.filter((step) => !step.done && !step.optional).length;
    return html`
      <section class="set setup">
        <h3>${t("setup_title")}</h3>
        <p class="hint first">${t(open ? "setup_intro" : "setup_done")}</p>
        <ol class="steps">
          ${steps.map(
            (step, index) => html`
              <li class=${step.done ? "done" : ""}>
                <span class="step-mark">${step.done ? "✓" : index + 1}</span>
                <div>
                  <div class="row-name">
                    ${t(`setup_${step.key}` as TextKey)}
                    ${step.optional && !step.done
                      ? html`<span class="row-detail">${t("setup_optional")}</span>`
                      : nothing}
                  </div>
                  <div class="row-detail">${t(`setup_${step.key}_hint` as TextKey)}</div>
                </div>
              </li>
            `,
          )}
        </ol>
        <button
          class="wide primary"
          @click=${() => this._navigate("/config/integrations/integration/heizzentrale")}
        >
          ${t("edit_parts")}
        </button>
        <p class="hint">${t("edit_hint")}</p>
      </section>
    `;
  }

  private _renderSettings(plant: Plant, colors: Map<string, string>) {
    const t = this._t;
    const modeState = this._state(plant.mode_entity);
    const options: string[] = Array.isArray(modeState?.attributes.options)
      ? modeState!.attributes.options
      : [];
    const row = (name: string, detail: string, warnings: string[], dot?: string) => html`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${dot ? html`<span class="dot" style="background:${dot}"></span>` : nothing}${name}</span
          >
          <span class="row-detail">${detail}</span>
        </div>
        ${warnings.map((warning) => html`<div class="row-warn">${warning}</div>`)}
      </li>
    `;
    const section = (title: string, rows: TemplateResult[]) => html`
      <section class="set">
        <h3>${title}</h3>
        ${rows.length ? html`<ul>${rows}</ul>` : html`<p class="hint">${t("none_yet")}</p>`}
      </section>
    `;
    const join = (parts: (string | false | undefined | null)[]) =>
      parts.filter(Boolean).join(" · ");
    return html`
      <div class="settings">
        ${this._renderSetup(plant)}
        <section class="set">
          <h3>${t("set_mode")}</h3>
          <div class="choices">
            ${options.map(
              (option) =>
                html`<button
                  class="choice ${modeState?.state === option ? "on" : ""}"
                  @click=${() =>
                    this._call("select", "select_option", {
                      entity_id: plant.mode_entity,
                      option,
                    })}
                >
                  ${t(`mode_${option}` as TextKey)}
                </button>`,
            )}
          </div>
          <p class="hint">
            ${t(modeState?.state === "off" ? "x_mode_off" : "x_mode_observe")}
            ${t("set_mode_active")}
          </p>
        </section>
        <section class="set">
          <h3>${t("set_language")}</h3>
          <div class="choices">
            ${["auto", "de", "en"].map(
              (language) =>
                html`<button
                  class="choice ${(plant.language ?? "auto") === language ? "on" : ""}"
                  @click=${() => this._setLanguage(plant, language)}
                >
                  ${t(`lang_${language}` as TextKey)}
                </button>`,
            )}
          </div>
          <p class="hint">${t("set_language_hint")}</p>
        </section>
        ${this._control
          ? html`<heizzentrale-control
              .hass=${this._hass}
              .plant=${plant}
              .control=${this._control}
              .t=${t}
              @control-changed=${(event: CustomEvent<Control>) => (this._control = event.detail)}
            ></heizzentrale-control>`
          : nothing}
        ${section(
          t("set_sources"),
          plant.heat_sources.map((source) =>
            row(
              source.name,
              t(`kind_${source.kind}` as TextKey),
              source.temperature_entity || source.flow_entity ? [] : [t("warn_no_sensor")],
            ),
          ),
        )}
        ${section(
          t("set_buffers"),
          plant.buffers.map((buffer) =>
            row(
              buffer.name,
              join([
                buffer.volume ? this._format(buffer.volume, "l", 0) : "",
                t("n_sensors", { count: String(buffer.sensor_entities.length) }),
              ]),
              buffer.sensor_entities.length ? [] : [t("warn_no_sensor")],
            ),
          ),
        )}
        ${section(
          t("set_pumps"),
          (plant.pump_groups ?? []).map((group) =>
            row(
              group.name,
              join([
                t("n_circuits", {
                  count: String(
                    plant.circuits.filter((circuit) => circuit.pump_group === group.id).length,
                  ),
                }),
                group.control_entity ? t("pump_switchable") : "",
              ]),
              [
                ...(group.flow_entity ? [] : [t("warn_no_sensor")]),
                ...(group.control_entity ? [] : [t("warn_no_control")]),
              ],
            ),
          ),
        )}
        ${section(
          t("set_circuits"),
          plant.circuits.map((circuit) => {
            const count = plant.rooms.filter((room) => room.circuit === circuit.id).length;
            return row(
              circuit.name,
              join([
                t(`system_${circuit.system_type}` as TextKey),
                circuit.valve_entity
                  ? t(circuit.valve_type === "no" ? "valve_no" : "valve_nc")
                  : t("valve_none"),
                count === 1 ? t("one_room") : t("n_rooms", { count: String(count) }),
              ]),
              [
                ...(circuit.flow_entity && circuit.return_entity ? [] : [t("warn_no_pipe_sensors")]),
                ...(count ? [] : [t("warn_no_rooms")]),
              ],
              colors.get(circuit.id),
            );
          }),
        )}
        ${section(
          t("set_rooms"),
          plant.rooms.map((room) => {
            const circuit = plant.circuits.find((item) => item.id === room.circuit);
            const floor = plant.floors.find((item) => item.id === room.floor);
            return row(
              room.name,
              join([
                circuit && `${t("circuit")} ${circuit.name}`,
                floor?.name,
                room.window_entities?.length === 1 && t("has_window"),
                (room.window_entities?.length ?? 0) > 1 &&
                  t("n_windows", { count: String(room.window_entities!.length) }),
              ]),
              [
                ...(circuit || !plant.circuits.length ? [] : [t("warn_no_circuit")]),
                ...(floor ? [] : [t("warn_no_floor")]),
              ],
              circuit ? colors.get(circuit.id) : undefined,
            );
          }),
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      --hz-hot: var(--heizzentrale-hot-color, #f2643d);
      --hz-cold: var(--heizzentrale-cold-color, #3b9dff);
      --hz-ok: var(--heizzentrale-ok-color, #22b07d);
      --hz-card: var(--ha-card-background, var(--card-background-color, #fff));
      --hz-soft: color-mix(in srgb, var(--primary-text-color) 5%, var(--hz-card));
      --hz-edge: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
      --hz-warn: var(--warning-color, #ffa600);
      --hz-tile: var(--secondary-background-color, #f3f3f3);
      --hz-muted: var(--secondary-text-color, #727272);
      display: block;
    }
    ha-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }
    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .chip {
      font: inherit;
      font-size: 0.8rem;
      color: var(--primary-text-color);
      background: var(--hz-tile);
      border: 0;
      border-radius: 999px;
      padding: 4px 10px;
    }
    button.chip {
      cursor: pointer;
    }
    .chip.mode.observe {
      background: color-mix(in srgb, var(--hz-warn) 22%, transparent);
    }
    .note {
      color: var(--hz-muted);
      padding: 8px 0;
    }
    .house {
      --hz-line: color-mix(in srgb, var(--primary-text-color) 55%, transparent);
      --hz-wall: 2px;
      position: relative;
      padding: 0 14px;
    }
    .pipes {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      overflow: visible;
    }
    .pipes path {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .tube {
      stroke-width: 3;
      opacity: 0.22;
    }
    .tube.active {
      opacity: 0.4;
    }
    .flow {
      stroke-width: 3;
      stroke-dasharray: 1 11;
      animation: hz-flow 0.9s linear infinite;
    }
    @keyframes hz-flow {
      to {
        stroke-dashoffset: -12;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .flow {
        animation: none;
      }
    }
    .roof {
      margin: 0 -14px;
      height: clamp(56px, 14vw, 132px);
      color: var(--hz-line);
    }
    .roof svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }
    .walls {
      border-left: var(--hz-wall) solid var(--hz-line);
      border-right: var(--hz-wall) solid var(--hz-line);
    }
    .walls:empty {
      display: none;
    }
    .storey {
      padding: 10px 12px calc(12px + var(--hz-lanes, 0) * 4px)
        calc(16px + var(--hz-lanes, 0) * 6px);
      border-top: var(--hz-wall) solid var(--hz-line);
    }
    .walls:not(.underground) > .storey:first-child {
      border-top: 0;
    }
    .ground {
      margin: 0 -14px;
      height: 3px;
      border-radius: 3px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--hz-ok) 6%,
        var(--hz-ok) 94%,
        transparent
      );
    }
    .underground {
      border-bottom: var(--hz-wall) solid var(--hz-line);
      border-radius: 0 0 14px 14px;
      background: repeating-linear-gradient(
        135deg,
        transparent 0 9px,
        color-mix(in srgb, var(--primary-text-color) 4%, transparent) 9px 10px
      );
    }
    .underground > .storey:first-child {
      border-top: 0;
    }
    .floor-name {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
      margin-bottom: 8px;
    }
    .rooms,
    .parts {
      display: grid;
      column-gap: 8px;
      row-gap: calc(10px + var(--hz-lanes, 0) * 4px);
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
    .room,
    .part {
      position: relative;
      z-index: 1;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
      cursor: pointer;
      outline: none;
      transition:
        box-shadow 0.15s ease,
        border-color 0.15s ease,
        transform 0.15s ease;
    }
    .room:active,
    .part:active {
      transform: scale(0.98);
    }
    .room:focus-visible,
    .part:focus-visible,
    .selected {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .room {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 78px;
    }
    .room.heating {
      border-color: color-mix(in srgb, var(--hz-hot) 55%, transparent);
      background: linear-gradient(
        160deg,
        color-mix(in srgb, var(--hz-hot) 20%, var(--hz-card)),
        color-mix(in srgb, var(--hz-hot) 6%, var(--hz-card))
      );
    }
    .room.off {
      opacity: 0.6;
    }
    .room-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      min-height: 20px;
    }
    .room-name {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      font-size: 0.85rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icons {
      display: flex;
      gap: 2px;
      flex: none;
    }
    .badge svg {
      width: 18px;
      height: 18px;
      display: block;
    }
    .flame {
      color: var(--hz-hot);
    }
    .window {
      color: var(--hz-cold);
    }
    .room-temp {
      font-size: 1.7rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      line-height: 1.15;
    }
    .unit {
      font-size: 1rem;
      color: var(--hz-muted);
    }
    .room-bottom > :first-child {
      white-space: nowrap;
    }
    .room-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: var(--hz-muted);
    }
    .preset {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      border-radius: 999px;
      padding: 1px 6px;
      font-size: 0.7rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .parts {
      margin-top: calc(10px + var(--hz-lanes, 0) * 4px);
      row-gap: 18px;
    }
    .plant-room {
      padding-bottom: 20px;
    }
    .part {
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      text-align: center;
    }
    .part-name {
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .figure {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .figure svg {
      height: 56px;
    }
    .tank-values {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 52px;
      font-size: 0.7rem;
      color: var(--hz-muted);
      text-align: left;
    }
    .big {
      font-size: 1.05rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .pair {
      display: flex;
      gap: 8px;
      font-size: 0.75rem;
    }
    .hot {
      color: var(--hz-hot);
    }
    .cold {
      color: var(--hz-cold);
    }
    .sub {
      font-size: 0.75rem;
      color: var(--hz-muted);
      min-height: 1em;
    }
    .status-open {
      color: var(--hz-ok);
    }
    .status-unknown {
      color: var(--hz-warn);
    }
    @media (max-width: 500px) {
      ha-card {
        padding: 12px;
      }
      .house {
        padding: 0 8px;
      }
      .roof,
      .ground {
        margin: 0 -8px;
      }
      .storey {
        padding-right: 8px;
        padding-left: calc(12px + var(--hz-lanes, 0) * 6px);
      }
      .rooms,
      .parts {
        grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      }
      .room {
        padding: 8px;
      }
    }
    .chip.icon {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
    }
    .chip.icon svg {
      width: 16px;
      height: 16px;
    }
    .chip.icon.on {
      background: color-mix(in srgb, var(--primary-color) 22%, transparent);
    }
    .backdrop {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
      margin: 0;
      border: 0;
      box-sizing: border-box;
      color: inherit;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: hz-fade 0.15s ease;
    }
    .backdrop:not([open]) {
      display: none;
    }
    .backdrop::backdrop {
      background: transparent;
    }
    .sheet {
      width: min(380px, 100%);
      max-height: 100%;
      overflow: auto;
      box-sizing: border-box;
      /* Solid on purpose: card backgrounds of some themes are see-through. */
      background: color-mix(
        in srgb,
        var(--primary-text-color) 7%,
        var(--primary-background-color, #fff)
      );
      color: var(--primary-text-color);
      border-radius: 22px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
      animation: hz-rise 0.2s ease;
    }
    @keyframes hz-fade {
      from {
        opacity: 0;
      }
    }
    @keyframes hz-rise {
      from {
        transform: translateY(14px);
        opacity: 0;
      }
    }
    @media (max-width: 500px) {
      .backdrop {
        align-items: flex-end;
        padding: 0;
      }
      .sheet {
        width: 100%;
        border-radius: 22px 22px 0 0;
        padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px));
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .sheet {
        animation: none;
      }
    }
    .sheet-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .sheet-title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .sheet-sub {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: var(--hz-muted);
      min-height: 1.1em;
    }
    .sheet-now {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .now-value {
      font-size: 3rem;
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .now-label {
      color: var(--hz-muted);
      font-size: 0.9rem;
    }
    .sheet-now.heating .now-label {
      color: var(--hz-hot);
    }
    .stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 18px;
      padding: 8px;
    }
    .stepper button {
      font: inherit;
      font-size: 1.6rem;
      line-height: 1;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      border: 0;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    .stepper-value {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .stepper-value span {
      font-size: 1.7rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .stepper-value small {
      color: var(--hz-muted);
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .would {
      margin-top: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--hz-warn) 24%, transparent);
    }
    .extras {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid var(--hz-edge);
      font-size: 0.75rem;
      color: var(--hz-muted);
      width: 100%;
    }
    .extra,
    .extra-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .extra-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .extra span:last-child {
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .edit-note {
      margin: 0 0 10px;
      font-size: 0.85rem;
      color: var(--hz-muted);
    }
    .grip {
      touch-action: none;
      cursor: grab;
      font-size: 1.1rem;
      line-height: 1;
      padding: 4px 6px;
      margin: -4px -4px -4px 0;
      color: var(--hz-muted);
    }
    .room.editing {
      cursor: grab;
      user-select: none;
      border-style: dashed;
    }
    .room.dragging {
      cursor: grabbing;
      pointer-events: none;
      z-index: 5;
      opacity: 0.9;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
    }
    .room.drop-before {
      box-shadow: -4px 0 0 var(--primary-color);
    }
    .room.drop-after {
      box-shadow: 4px 0 0 var(--primary-color);
    }
    .storey.drop {
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
    }
    .drop-hint {
      font-size: 0.8rem;
      color: var(--hz-muted);
      border: 1px dashed var(--hz-edge);
      border-radius: 14px;
      padding: 18px 14px;
    }
    .edit-row {
      display: flex;
      gap: 4px;
      margin-top: 8px;
    }
    .edit-row button,
    .edit-add {
      font: inherit;
      font-size: 0.72rem;
      color: var(--primary-text-color);
      background: var(--hz-card);
      border: 1px solid var(--hz-edge);
      border-radius: 8px;
      padding: 5px 7px;
      cursor: pointer;
      white-space: nowrap;
    }
    .edit-row {
      flex-wrap: wrap;
    }
    .edit-row button {
      flex: 1;
    }
    .edit-row .grow {
      flex: 1 0 100%;
      order: 2;
    }
    .edit-add {
      margin-top: 8px;
    }
    .sheet .field {
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      background: var(--hz-card);
      border: 1px solid var(--hz-edge);
      border-radius: 10px;
      padding: 9px 10px;
      width: 100%;
      box-sizing: border-box;
    }
    .chip.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
    }
    .stove-tile {
      cursor: default;
    }
    .stove {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid var(--hz-edge);
      font-size: 0.75rem;
      color: var(--hz-muted);
    }
    .stove svg {
      width: 13px;
      height: 13px;
      flex: none;
      opacity: 0.5;
    }
    .stove.burning {
      color: var(--hz-hot);
      font-weight: 600;
    }
    .stove.burning svg {
      opacity: 1;
    }
    .stove-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .choices {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .choice {
      font: inherit;
      font-size: 0.85rem;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 999px;
      padding: 7px 14px;
      cursor: pointer;
    }
    .choice.on {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .wide {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
      padding: 11px;
      cursor: pointer;
      width: 100%;
    }
    .wide.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
    .why {
      font-size: 0.88rem;
      line-height: 1.45;
    }
    .why p {
      margin: 4px 0 0;
    }
    .why-title {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
    }
    .link {
      font: inherit;
      font-size: 0.85rem;
      background: none;
      border: 0;
      padding: 0;
      color: var(--primary-color);
      cursor: pointer;
      align-self: flex-start;
    }
    .settings {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .set h3 {
      margin: 0 0 8px;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
    }
    .set ul {
      list-style: none;
      margin: 0;
      padding: 0;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
    }
    .set li {
      padding: 10px 12px;
    }
    .set li + li {
      border-top: 1px solid var(--hz-edge);
    }
    .row-main {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }
    .row-name {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
    }
    .row-detail {
      font-size: 0.8rem;
      color: var(--hz-muted);
    }
    .row-warn {
      margin-top: 4px;
      font-size: 0.8rem;
      color: color-mix(in srgb, var(--hz-warn) 75%, var(--primary-text-color));
    }
    .steps {
      list-style: none;
      margin: 10px 0 12px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .steps li {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .steps .row-name {
      gap: 8px;
      flex-wrap: wrap;
    }
    .step-mark {
      flex: none;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 600;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
    }
    .done .step-mark {
      background: var(--hz-ok);
      border-color: var(--hz-ok);
      color: #fff;
    }
    .hint.first {
      margin-top: 0;
    }
    .hint {
      margin: 8px 0 0;
      font-size: 0.82rem;
      line-height: 1.4;
      color: var(--hz-muted);
    }
    .explain {
      background: var(--hz-tile);
      border-radius: 14px;
      padding: 12px 14px;
      font-size: 0.9rem;
      line-height: 1.45;
    }
    .explain p {
      margin: 6px 0 0;
    }
    .explain-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close {
      font: inherit;
      background: none;
      border: 0;
      color: var(--hz-muted);
      cursor: pointer;
      padding: 4px 8px;
    }
  `;
}

// ---------------------------------------------------------------------------
// Small SVG figures
// ---------------------------------------------------------------------------

const ICON_FLAME = svg`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.5 5-2.5 7C8.4 11 9 12.5 9 12.5S7 12 6.6 9.8C4.9 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"/></svg>`;
const ICON_GEAR = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3h.1a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800v.1a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>`;
const ICON_PENCIL = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.500 6.500l4 4"/></svg>`;
const ICON_HOME = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.500"/><path d="M5.500 10v10h13V10"/></svg>`;
const ICON_WINDOW = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`;

// Gable roof with chimney. Stretched to the card width; strokes keep their width.
const ROOF = svg`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;

function pumpFigure(running: boolean) {
  const color = running ? "var(--hz-ok)" : "currentColor";
  const opacity = running ? "1" : "0.4";
  return svg`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M4 28 H14 M42 28 H52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="28" cy="28" r="14" fill="none" stroke=${color} stroke-width="2.5" opacity=${opacity}/>
    <path d="M22 19.500 L38 28 L22 36.500 Z" fill=${running ? color : "none"} stroke=${color} stroke-width="2.5" stroke-linejoin="round" opacity=${opacity}/>
  </svg>`;
}

function boilerFigure(active: boolean) {
  return svg`<svg viewBox="0 0 44 56" aria-hidden="true">
    <rect x="4" y="3" width="36" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
    <rect x="11" y="9" width="22" height="7" rx="2" fill="currentColor" opacity="0.25"/>
    <path transform="translate(10 22)" d="M12 2c1 3.5-1.500 5-2.500 7C8.400 11 9 12.500 9 12.500S7 12 6.600 9.800C4.900 11.600 4 13.700 4 15.500 4 19.100 7.600 22 12 22s8-2.900 8-6.500C20 10.500 14.500 8 12 2z"
      fill=${active ? "var(--hz-hot)" : "currentColor"} opacity=${active ? "1" : "0.25"}/>
  </svg>`;
}

/** Map a temperature to a colour between cold blue and hot red. */
function temperatureColor(value: number | undefined): string {
  if (value === undefined) return "var(--divider-color, #ccc)";
  const ratio = Math.max(0, Math.min(1, (value - 25) / 50));
  return `color-mix(in srgb, var(--hz-hot) ${(ratio * 100).toFixed(0)}%, var(--hz-cold))`;
}

function tankFigure(temps: (number | undefined)[]) {
  const layers = temps.length ? temps : [undefined];
  const height = 44 / layers.length;
  return svg`<svg viewBox="0 0 32 56" aria-hidden="true">
    <defs><clipPath id="hz-tank"><rect x="4" y="6" width="24" height="44" rx="9"/></clipPath></defs>
    <g clip-path="url(#hz-tank)">
      ${layers.map(
        (value, index) =>
          svg`<rect x="4" y=${6 + index * height} width="24" height=${height + 0.5} fill=${temperatureColor(value)}/>`,
      )}
    </g>
    <rect x="4" y="6" width="24" height="44" rx="9" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
  </svg>`;
}

function valveFigure(status: "open" | "closed" | "unknown") {
  const color =
    status === "open"
      ? "var(--hz-ok)"
      : status === "unknown"
        ? "var(--hz-warn)"
        : "currentColor";
  const opacity = status === "closed" ? "0.35" : "1";
  return svg`<svg viewBox="0 0 56 56" aria-hidden="true">
    <path d="M6 22 L28 34 L6 46 Z M50 22 L28 34 L50 46 Z" fill=${status === "open" ? color : "none"}
      stroke=${color} stroke-width="2.5" stroke-linejoin="round" opacity=${opacity}/>
    <path d="M28 34 V16 M19 16 H37" stroke=${color} stroke-width="2.5" stroke-linecap="round" opacity=${opacity}/>
    ${
      status === "closed"
        ? svg`<path d="M14 48 L42 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`
        : nothing
    }
  </svg>`;
}

// ---------------------------------------------------------------------------
// Sidebar page: the house view as a full page
// ---------------------------------------------------------------------------

class HeizzentralePanel extends LitElement {
  static properties = { narrow: { type: Boolean, reflect: true } };

  narrow = false;
  private _hass?: Hass;

  set hass(hass: Hass) {
    this._hass = hass;
    const card = this.renderRoot?.querySelector("heizzentrale-house-card") as any;
    if (card) card.hass = hass;
    // The menu button needs hass too; it only appears on narrow screens.
    const menu = this.renderRoot?.querySelector("ha-menu-button") as any;
    if (menu) menu.hass = hass;
  }

  protected firstUpdated(): void {
    const card = this.renderRoot.querySelector("heizzentrale-house-card") as any;
    card.setConfig({});
    if (this._hass) this.hass = this._hass;
  }

  protected render() {
    return html`
      <div class="bar">
        <ha-menu-button .narrow=${this.narrow}></ha-menu-button>
      </div>
      <main><heizzentrale-house-card></heizzentrale-house-card></main>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      box-sizing: border-box;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .bar {
      height: 0;
      position: relative;
      z-index: 2;
    }
    ha-menu-button {
      position: absolute;
      top: 4px;
      left: 4px;
    }
    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 16px;
    }
    :host([narrow]) main {
      padding: 52px 8px 8px;
    }
  `;
}

// ---------------------------------------------------------------------------
// Visual editor
// ---------------------------------------------------------------------------

class HeizzentraleHouseCardEditor extends LitElement {
  static properties = { _config: { state: true }, _plants: { state: true } };

  private _hass?: Hass;
  private _config: CardConfig = {};
  private _plants?: Plant[];

  setConfig(config: CardConfig): void {
    this._config = { ...config };
  }

  set hass(hass: Hass) {
    this._hass = hass;
    if (!this._plants) {
      this._plants = [];
      hass
        .callWS<{ plants: Plant[] }>({ type: "heizzentrale/plants" })
        .then((result) => (this._plants = result.plants))
        .catch(() => undefined);
    }
  }

  private _change(key: keyof CardConfig, value: string): void {
    const config: CardConfig = { ...this._config };
    if (value) (config as any)[key] = value;
    else delete config[key];
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    const t = translator(this._hass?.locale?.language ?? this._hass?.language);
    return html`
      <label>
        ${t("editor_plant")}
        <select
          @change=${(event: Event) =>
            this._change("entry_id", (event.target as HTMLSelectElement).value)}
        >
          <option value="" ?selected=${!this._config.entry_id}>
            ${t("editor_first")}
          </option>
          ${(this._plants ?? []).map(
            (plant) =>
              html`<option
                value=${plant.entry_id}
                ?selected=${plant.entry_id === this._config.entry_id}
              >
                ${plant.name}
              </option>`,
          )}
        </select>
      </label>
      <label>
        ${t("editor_title")}
        <input
          type="text"
          .value=${this._config.title ?? ""}
          @input=${(event: Event) =>
            this._change("title", (event.target as HTMLInputElement).value)}
        />
      </label>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    select,
    input {
      font: inherit;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
  `;
}

if (!customElements.get("heizzentrale-house-card")) {
  customElements.define("heizzentrale-house-card", HeizzentraleHouseCard);
  customElements.define("heizzentrale-house-card-editor", HeizzentraleHouseCardEditor);
  customElements.define("heizzentrale-panel", HeizzentralePanel);
  const cards = ((window as any).customCards ??= []);
  cards.push({
    type: "heizzentrale-house-card",
    name: "Heizzentrale",
    description: "House view: rooms per floor, heat source, buffer and circuits.",
    preview: false,
  });
}
