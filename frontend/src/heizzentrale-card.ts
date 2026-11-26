import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";
import { translator, type TextKey } from "./i18n";

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
}

interface Room {
  id: string;
  name: string;
  climate_entity?: string | null;
  window_entity?: string | null;
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

interface Plant {
  entry_id: string;
  name: string;
  mode_entity?: string | null;
  outdoor_entity?: string | null;
  heat_sources: HeatSource[];
  buffers: Buffer[];
  circuits: Circuit[];
  rooms: Room[];
  floors: { id: string; name: string; level: number | null }[];
}

interface CardConfig {
  type?: string;
  entry_id?: string;
  title?: string;
}

type Selection =
  | { kind: "circuit" | "room" | "buffer" | "source"; id: string }
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
  };

  private _hass?: Hass;
  private _config: CardConfig = {};
  private _plants?: Plant[];
  private _error?: string;
  private _selection?: Selection;
  private _loading = false;
  private _watched = new Set<string>();
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
    } catch (err: any) {
      this._error = err?.message ?? String(err);
      this._plants = [];
    } finally {
      this._loading = false;
    }
  }

  // -- pipes ---------------------------------------------------------------

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resize?.disconnect();
    this._observed = undefined;
  }

  protected updated(): void {
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

  private get _t() {
    return translator(this._hass?.locale?.language ?? this._hass?.language);
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
    const language = this._hass?.locale?.language ?? this._hass?.language ?? "en";
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

  private _select(selection: Selection): void {
    const same =
      this._selection &&
      this._selection.kind === selection.kind &&
      (this._selection as any).id === (selection as any).id;
    this._selection = same ? undefined : selection;
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
      !plant.heat_sources.length;

    const colors = new Map<string, string>();
    plant.circuits.forEach((circuit, index) =>
      colors.set(circuit.id, CIRCUIT_COLORS[index % CIRCUIT_COLORS.length]),
    );

    return html`
      <ha-card>
        ${this._renderHeader(plant)}
        ${empty ? html`<div class="note">${t("empty")}</div>` : nothing}
        ${empty ? nothing : this._renderHouse(plant, colors)}
        ${this._renderExplanation(plant)}
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
        <div class="chips">${outdoor}${modeChip}</div>
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
    const storey = (name: string, rooms: Room[]) =>
      rooms.length
        ? html`
            <section class="storey">
              ${name ? html`<div class="floor-name">${name}</div>` : nothing}
              <div class="rooms">
                ${rooms.map((room) => this._renderRoom(plant, room, colors))}
              </div>
            </section>
          `
        : nothing;
    const roomsOf = (floorId: string) =>
      plant.rooms.filter((room) => room.floor === floorId);
    const above = plant.floors.filter((floor) => (floor.level ?? 0) >= 0);
    const below = plant.floors.filter((floor) => (floor.level ?? 0) < 0);
    const rest = plant.rooms.filter((room) => !room.floor || !known.has(room.floor));
    return html`
      <div class="house" style="--hz-lanes:${this._lanes(plant).length}">
        ${this._renderPipes()}
        <div class="roof">${ROOF}</div>
        <div class="walls">
          ${above.map((floor) => storey(floor.name, roomsOf(floor.id)))}
          ${storey(plant.floors.length ? t("other_rooms") : "", rest)}
        </div>
        <div class="ground"></div>
        <div class="walls underground">
          ${below.map((floor) => storey(floor.name, roomsOf(floor.id)))}
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
    const windowOpen = this._state(room.window_entity)?.state === "on";
    const unit = "°";
    const current = attributes.current_temperature as number | undefined;
    const target = attributes.temperature as number | undefined;
    const preset =
      attributes.preset_mode && attributes.preset_mode !== "none"
        ? String(attributes.preset_mode)
        : undefined;
    const circuit = plant.circuits.find((item) => item.id === room.circuit);
    const selection: Selection = { kind: "room", id: room.id };
    return html`
      <div
        class="room ${heating ? "heating" : ""} ${unavailable ? "off" : ""}
          ${this._isSelected("room", room.id) ? "selected" : ""}"
        role="button"
        tabindex="0"
        data-circuit=${circuit?.id ?? nothing}
        @click=${() => this._select(selection)}
        @keydown=${(event: KeyboardEvent) => this._key(event, selection)}
      >
        <div class="room-top">
          <span class="room-name"
            >${circuit
              ? html`<span class="dot" style="background:${colors.get(circuit.id)}"></span>`
              : nothing}${room.name}</span
          >
          <span class="icons">
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
          ${preset ? html`<span class="preset">${preset}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _renderPlantRoom(plant: Plant, colors: Map<string, string>) {
    const t = this._t;
    if (!plant.heat_sources.length && !plant.buffers.length && !plant.circuits.length) {
      return nothing;
    }
    const anyOpen = plant.circuits.some((circuit) => this._circuitOpen(circuit) !== false);
    return html`
      <section class="storey plant-room">
        <div class="floor-name">${t("plant_room")}</div>
        <div class="parts">
          ${plant.heat_sources.map((source) => this._renderSource(source, anyOpen))}
          ${plant.buffers.map((buffer) => this._renderBuffer(buffer, anyOpen))}
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
        @click=${() => this._select(selection)}
        @keydown=${(event: KeyboardEvent) => this._key(event, selection)}
      >
        ${body}
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
      `,
      `circuit-${status}`,
    );
  }

  // -- explanations ---------------------------------------------------------

  private _renderExplanation(plant: Plant) {
    const selection = this._selection;
    if (!selection) return nothing;
    const t = this._t;
    let title = "";
    let lines: string[] = [];

    if (selection.kind === "mode") {
      const mode = this._state(plant.mode_entity)?.state;
      title = t(mode === "off" ? "mode_off" : "mode_observe");
      lines = [t(mode === "off" ? "x_mode_off" : "x_mode_observe")];
    } else if (selection.kind === "circuit") {
      const circuit = plant.circuits.find((item) => item.id === selection.id);
      if (!circuit) return nothing;
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
    } else if (selection.kind === "room") {
      const room = plant.rooms.find((item) => item.id === selection.id);
      if (!room) return nothing;
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
      if (this._state(room.window_entity)?.state === "on")
        lines.push(t("x_room_window"));
      if (attributes.preset_mode && attributes.preset_mode !== "none")
        lines.push(t("x_room_preset", { preset: String(attributes.preset_mode) }));
      const circuit = plant.circuits.find((item) => item.id === room.circuit);
      if (circuit) lines.push(t("x_room_circuit", { circuit: circuit.name }));
    } else if (selection.kind === "buffer") {
      const buffer = plant.buffers.find((item) => item.id === selection.id);
      if (!buffer) return nothing;
      title = buffer.name;
      lines.push(t("x_buffer", { name: buffer.name }));
      if (this._number(buffer.mean_entity) !== undefined)
        lines.push(t("x_buffer_mean", { mean: this._temp(buffer.mean_entity) }));
    } else {
      const source = plant.heat_sources.find((item) => item.id === selection.id);
      if (!source) return nothing;
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

    return html`
      <div class="explain" role="status">
        <div class="explain-head">
          <strong>${title}</strong>
          <button
            class="close"
            aria-label=${t("close")}
            @click=${() => (this._selection = undefined)}
          >
            ✕
          </button>
        </div>
        ${lines.map((line) => html`<p>${line}</p>`)}
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
const ICON_WINDOW = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16"/></svg>`;

// Gable roof with chimney. Stretched to the card width; strokes keep their width.
const ROOF = svg`<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path vector-effect="non-scaling-stroke" d="M0 20 L50 1 L100 20 Z"/>
    <path vector-effect="non-scaling-stroke" d="M72 9.360 V3 H78 V11.620"/>
  </g>
</svg>`;

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
  const cards = ((window as any).customCards ??= []);
  cards.push({
    type: "heizzentrale-house-card",
    name: "Heizzentrale",
    description: "House view: rooms per floor, heat source, buffer and circuits.",
    preview: false,
  });
}
