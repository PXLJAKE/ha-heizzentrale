// Schedules and absence rules: the part of the settings where they are
// created, changed and assigned to rooms and floors.

import { LitElement, css, html, nothing } from "lit";
import type { TextKey } from "./i18n";

export interface SwitchPoint {
  days: number[];
  time: string;
  action: string;
}

export interface Schedule {
  id: string;
  name: string;
  points: SwitchPoint[];
  rooms: string[];
  floors: string[];
}

export interface AbsenceRule {
  id: string;
  name: string;
  entities: string[];
  delay_min: number;
  rooms: string[];
  floors: string[];
  action: string;
}

export interface Stove {
  id: string;
  name: string;
  sensor: string | null;
  on_above: number;
  room: string | null;
  actions: Record<string, string>;
}

export interface RoomPlan {
  action: string;
  source: "schedule" | "absence" | "stove";
  name: string;
  applied: boolean;
}

export interface Control {
  enabled: boolean;
  schedules: Schedule[];
  rules: AbsenceRule[];
  stoves?: Stove[];
  active_rules: string[];
  burning?: string[];
  rooms: Record<string, RoomPlan>;
}

interface Named {
  id: string;
  name: string;
}

interface PlantLike {
  entry_id: string;
  rooms: (Named & { climate_entity?: string | null; floor?: string | null })[];
  floors: Named[];
}

interface HassLike {
  states: Record<string, { state: string; attributes: Record<string, any> }>;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
  formatEntityAttributeValue?(state: any, attribute: string, value?: unknown): string;
}

type Translate = (key: TextKey, values?: Record<string, string>) => string;

const DAY_KEYS: TextKey[] = [
  "day_0",
  "day_1",
  "day_2",
  "day_3",
  "day_4",
  "day_5",
  "day_6",
];
const PRESENCE_CLASSES = new Set(["presence", "connectivity", "occupancy"]);

function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Text for an action such as "Eco", "Off" or "20 °C". */
export function actionLabel(
  action: string,
  t: Translate,
  hass: HassLike | undefined,
  climate?: string | null,
): string {
  if (action === "on") return t("act_on");
  if (action === "off") return t("act_off");
  if (action.startsWith("temperature:")) {
    return `${action.slice(12).replace(".", t("decimal"))} °C`;
  }
  const preset = action.slice(7);
  const state = climate ? hass?.states[climate] : undefined;
  if (state && hass?.formatEntityAttributeValue) {
    return hass.formatEntityAttributeValue(state, "preset_mode", preset);
  }
  return preset.charAt(0).toUpperCase() + preset.slice(1);
}

/** "Mon–Fri", "Sat, Sun", "daily". */
export function daysLabel(days: number[], t: Translate): string {
  const sorted = [...new Set(days)].sort();
  if (sorted.length === 7) return t("days_all");
  const runs: number[][] = [];
  for (const day of sorted) {
    const last = runs[runs.length - 1];
    if (last && last[last.length - 1] === day - 1) last.push(day);
    else runs.push([day]);
  }
  return runs
    .map((run) =>
      run.length > 2
        ? `${t(DAY_KEYS[run[0]])}–${t(DAY_KEYS[run[run.length - 1]])}`
        : run.map((day) => t(DAY_KEYS[day])).join(", "),
    )
    .join(", ");
}

export class HeizzentraleControl extends LitElement {
  static properties = {
    hass: { attribute: false },
    plant: { attribute: false },
    control: { attribute: false },
    t: { attribute: false },
    _schedule: { state: true },
    _rule: { state: true },
    _stove: { state: true },
    _error: { state: true },
    _busy: { state: true },
  };

  hass?: HassLike;
  plant?: PlantLike;
  control?: Control;
  t: Translate = (key) => key;
  private _schedule?: Schedule;
  private _rule?: AbsenceRule;
  private _stove?: Stove;
  private _error?: string;
  private _busy = false;

  private async _save(change: Partial<Control>): Promise<boolean> {
    if (!this.hass || !this.plant) return false;
    this._busy = true;
    try {
      const control = await this.hass.callWS<Control>({
        type: "heizzentrale/control/save",
        entry_id: this.plant.entry_id,
        ...change,
      });
      this._error = undefined;
      this.dispatchEvent(new CustomEvent("control-changed", { detail: control }));
      return true;
    } catch (err: any) {
      this._error = `${this.t("save_failed")} ${err?.message ?? ""}`;
      return false;
    } finally {
      this._busy = false;
    }
  }

  // -- shared pieces --------------------------------------------------------

  /** Presets every thermostat of the plant offers, in a stable order. */
  private _presets(): string[] {
    const found: string[] = [];
    for (const room of this.plant?.rooms ?? []) {
      const modes = room.climate_entity
        ? this.hass?.states[room.climate_entity]?.attributes.preset_modes
        : undefined;
      for (const mode of Array.isArray(modes) ? modes : []) {
        if (mode !== "none" && !found.includes(mode)) found.push(mode);
      }
    }
    return found;
  }

  private _climateWith(preset: string): string | undefined {
    return this.plant?.rooms.find(
      (room) =>
        room.climate_entity &&
        this.hass?.states[room.climate_entity]?.attributes.preset_modes?.includes(preset),
    )?.climate_entity as string | undefined;
  }

  private _label(action: string): string {
    const climate = action.startsWith("preset:")
      ? this._climateWith(action.slice(7))
      : undefined;
    return actionLabel(action, this.t, this.hass, climate);
  }

  private _actionPicker(
    action: string,
    change: (action: string) => void,
    none?: string,
  ) {
    const t = this.t;
    const isTemperature = action.startsWith("temperature:");
    const presets = this._presets().map((preset) => `preset:${preset}`);
    if (action.startsWith("preset:") && !presets.includes(action)) presets.push(action);
    return html`
      <select
        aria-label=${t("action")}
        @change=${(event: Event) => {
          const value = (event.target as HTMLSelectElement).value;
          change(value === "temperature" ? "temperature:20" : value);
        }}
      >
        ${none !== undefined
          ? html`<option value="" ?selected=${action === ""}>${none}</option>`
          : nothing}
        ${presets.map(
          (preset) =>
            html`<option value=${preset} ?selected=${action === preset}>
              ${this._label(preset)}
            </option>`,
        )}
        <option value="on" ?selected=${action === "on"}>${t("act_on")}</option>
        <option value="off" ?selected=${action === "off"}>${t("act_off")}</option>
        <option value="temperature" ?selected=${isTemperature}>${t("act_temperature")}</option>
      </select>
      ${isTemperature
        ? html`<input
            class="short"
            type="number"
            min="5"
            max="30"
            step="0.5"
            aria-label="°C"
            .value=${action.slice(12)}
            @change=${(event: Event) => {
              const value = Number((event.target as HTMLInputElement).value);
              if (Number.isFinite(value)) {
                const clamped = Math.round(Math.min(30, Math.max(5, value)) * 2) / 2;
                change(`temperature:${clamped}`);
              }
            }}
          />`
        : nothing}
    `;
  }

  private _targetPicker(
    item: { rooms: string[]; floors: string[] },
    change: (rooms: string[], floors: string[]) => void,
  ) {
    const t = this.t;
    const toggle = (list: string[], id: string) =>
      list.includes(id) ? list.filter((other) => other !== id) : [...list, id];
    const plant = this.plant;
    if (!plant) return nothing;
    return html`
      ${plant.floors.length
        ? html`<div class="label">${t("floors")}</div>
            <div class="choices">
              ${plant.floors.map(
                (floor) =>
                  html`<button
                    class="choice ${item.floors.includes(floor.id) ? "on" : ""}"
                    aria-pressed=${item.floors.includes(floor.id)}
                    @click=${() => change(item.rooms, toggle(item.floors, floor.id))}
                  >
                    ${floor.name}
                  </button>`,
              )}
            </div>`
        : nothing}
      <div class="label">${t("rooms_single")}</div>
      <div class="choices">
        ${plant.rooms.map((room) => {
          const viaFloor = !!room.floor && item.floors.includes(room.floor);
          const on = item.rooms.includes(room.id);
          return html`<button
            class="choice ${on ? "on" : viaFloor ? "via" : ""}"
            aria-pressed=${on}
            @click=${() => change(toggle(item.rooms, room.id), item.floors)}
          >
            ${room.name}
          </button>`;
        })}
      </div>
    `;
  }

  private _targetNames(item: { rooms: string[]; floors: string[] }): string {
    const plant = this.plant;
    const names = [
      ...item.floors.map((id) => plant?.floors.find((floor) => floor.id === id)?.name),
      ...item.rooms.map((id) => plant?.rooms.find((room) => room.id === id)?.name),
    ].filter(Boolean);
    return names.length ? names.join(", ") : this.t("assigned_none");
  }

  // -- schedules ------------------------------------------------------------

  private _renderSchedule(schedule: Schedule) {
    const t = this.t;
    const points = [...schedule.points].sort(
      (a, b) => Math.min(...a.days) - Math.min(...b.days) || a.time.localeCompare(b.time),
    );
    return html`
      <li>
        <div class="row-main">
          <span class="row-name">${schedule.name || t("unnamed")}</span>
          <button class="link" @click=${() => (this._schedule = structuredClone(schedule))}>
            ${t("edit")}
          </button>
        </div>
        ${points.length
          ? points.map(
              (point) =>
                html`<div class="row-detail">
                  ${daysLabel(point.days, t)} ${point.time} · ${this._label(point.action)}
                </div>`,
            )
          : html`<div class="row-warn">${t("no_points")}</div>`}
        <div class="row-detail">${t("applies_to")} ${this._targetNames(schedule)}</div>
      </li>
    `;
  }

  private _renderScheduleEditor(draft: Schedule) {
    const t = this.t;
    const update = (change: Partial<Schedule>) => (this._schedule = { ...draft, ...change });
    const setPoint = (index: number, change: Partial<SwitchPoint>) =>
      update({
        points: draft.points.map((point, i) => (i === index ? { ...point, ...change } : point)),
      });
    const existing = this.control?.schedules.some((item) => item.id === draft.id);
    const save = async () => {
      const clean = {
        ...draft,
        name: draft.name.trim(),
        points: draft.points.filter((point) => point.days.length),
      };
      const others = (this.control?.schedules ?? []).filter((item) => item.id !== draft.id);
      const list = existing
        ? (this.control?.schedules ?? []).map((item) => (item.id === draft.id ? clean : item))
        : [...others, clean];
      if (await this._save({ schedules: list })) this._schedule = undefined;
    };
    return html`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${draft.name}
            placeholder=${t("schedule_placeholder")}
            @input=${(event: Event) => update({ name: (event.target as HTMLInputElement).value })}
          />
        </label>
        <div class="label">${t("points")}</div>
        <p class="hint first">${t("points_hint")}</p>
        ${draft.points.map(
          (point, index) => html`
            <div class="point">
              <div class="days">
                ${DAY_KEYS.map(
                  (key, day) =>
                    html`<button
                      class="day ${point.days.includes(day) ? "on" : ""}"
                      aria-pressed=${point.days.includes(day)}
                      @click=${() =>
                        setPoint(index, {
                          days: point.days.includes(day)
                            ? point.days.filter((other) => other !== day)
                            : [...point.days, day].sort(),
                        })}
                    >
                      ${t(key)}
                    </button>`,
                )}
              </div>
              <div class="point-line">
                <input
                  type="time"
                  aria-label=${t("time")}
                  .value=${point.time}
                  @change=${(event: Event) =>
                    setPoint(index, {
                      time: (event.target as HTMLInputElement).value || point.time,
                    })}
                />
                ${this._actionPicker(point.action, (action) => setPoint(index, { action }))}
                <button
                  class="icon"
                  aria-label=${t("remove")}
                  @click=${() => update({ points: draft.points.filter((_, i) => i !== index) })}
                >
                  ✕
                </button>
              </div>
            </div>
          `,
        )}
        <button
          class="link"
          @click=${() =>
            update({
              points: [
                ...draft.points,
                {
                  days: draft.points[draft.points.length - 1]?.days ?? [0, 1, 2, 3, 4, 5, 6],
                  time: draft.points.length ? "22:00" : "06:00",
                  action: this._presets().length
                    ? `preset:${this._presets()[0]}`
                    : draft.points.length
                      ? "off"
                      : "on",
                },
              ],
            })}
        >
          + ${t("add_point")}
        </button>
        <div class="label">${t("applies_to")}</div>
        <p class="hint first">${t("assign_hint")}</p>
        ${this._targetPicker(draft, (rooms, floors) => update({ rooms, floors }))}
        ${this._renderEditorButtons(save, () => (this._schedule = undefined), existing
          ? async () => {
              const list = (this.control?.schedules ?? []).filter((item) => item.id !== draft.id);
              if (await this._save({ schedules: list })) this._schedule = undefined;
            }
          : undefined)}
      </div>
    `;
  }

  private _renderEditorButtons(
    save: () => void,
    cancel: () => void,
    remove?: () => void,
  ) {
    const t = this.t;
    return html`
      ${this._error ? html`<div class="row-warn">${this._error}</div>` : nothing}
      <div class="buttons">
        <button class="wide primary" ?disabled=${this._busy} @click=${save}>${t("save")}</button>
        <button class="wide" @click=${cancel}>${t("cancel")}</button>
        ${remove
          ? html`<button class="wide danger" ?disabled=${this._busy} @click=${remove}>
              ${t("delete")}
            </button>`
          : nothing}
      </div>
    `;
  }

  // -- absence --------------------------------------------------------------

  private _entityName(entityId: string): string {
    return this.hass?.states[entityId]?.attributes.friendly_name ?? entityId;
  }

  /** People, tracked devices and presence sensors a rule can watch. */
  private _candidates(): string[] {
    return Object.entries(this.hass?.states ?? {})
      .filter(([entityId, state]) => {
        const domain = entityId.split(".", 1)[0];
        if (domain === "person" || domain === "device_tracker") return true;
        if (domain === "input_boolean") return true;
        return (
          domain === "binary_sensor" && PRESENCE_CLASSES.has(state.attributes.device_class)
        );
      })
      .map(([entityId]) => entityId)
      .sort((a, b) => this._entityName(a).localeCompare(this._entityName(b)));
  }

  private _ruleSentence(rule: AbsenceRule): string {
    const t = this.t;
    const who = rule.entities.map((entity) => this._entityName(entity)).join(` ${t("and")} `);
    return t(rule.delay_min > 0 ? "rule_sentence_delay" : "rule_sentence", {
      who: who || "?",
      minutes: String(rule.delay_min),
      targets: this._targetNames(rule),
      action: this._label(rule.action),
    });
  }

  private _renderRule(rule: AbsenceRule) {
    const t = this.t;
    const active = this.control?.active_rules.includes(rule.id);
    return html`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${rule.name || t("unnamed")}${active
              ? html`<span class="badge">${t("rule_active")}</span>`
              : nothing}</span
          >
          <button class="link" @click=${() => (this._rule = structuredClone(rule))}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">${this._ruleSentence(rule)}</div>
        ${rule.entities.length ? nothing : html`<div class="row-warn">${t("no_entities")}</div>`}
      </li>
    `;
  }

  private _renderRuleEditor(draft: AbsenceRule) {
    const t = this.t;
    const update = (change: Partial<AbsenceRule>) => (this._rule = { ...draft, ...change });
    const existing = this.control?.rules.some((item) => item.id === draft.id);
    const candidates = this._candidates().filter((entity) => !draft.entities.includes(entity));
    const save = async () => {
      const clean = { ...draft, name: draft.name.trim() };
      const rules = this.control?.rules ?? [];
      const list = existing
        ? rules.map((item) => (item.id === draft.id ? clean : item))
        : [...rules, clean];
      if (await this._save({ rules: list })) this._rule = undefined;
    };
    return html`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${draft.name}
            placeholder=${t("rule_placeholder")}
            @input=${(event: Event) => update({ name: (event.target as HTMLInputElement).value })}
          />
        </label>
        <div class="label">${t("rule_who")}</div>
        <p class="hint first">${t("rule_who_hint")}</p>
        <div class="choices">
          ${draft.entities.map(
            (entity) =>
              html`<button
                class="choice on"
                title=${entity}
                @click=${() =>
                  update({ entities: draft.entities.filter((other) => other !== entity) })}
              >
                ${this._entityName(entity)} ✕
              </button>`,
          )}
        </div>
        <select
          aria-label=${t("rule_add_entity")}
          @change=${(event: Event) => {
            const select = event.target as HTMLSelectElement;
            if (select.value) update({ entities: [...draft.entities, select.value] });
            select.value = "";
          }}
        >
          <option value="">+ ${t("rule_add_entity")}</option>
          ${candidates.map(
            (entity) =>
              html`<option value=${entity}>
                ${this._entityName(entity)} (${entity.split(".", 1)[0]})
              </option>`,
          )}
        </select>
        <label class="field inline">
          <span class="label">${t("rule_delay")}</span>
          <input
            class="short"
            type="number"
            min="0"
            max="1440"
            step="1"
            .value=${String(draft.delay_min)}
            @change=${(event: Event) => {
              const value = Number((event.target as HTMLInputElement).value);
              update({ delay_min: Number.isFinite(value) ? Math.min(1440, Math.max(0, value)) : 0 });
            }}
          />
          <span class="row-detail">${t("minutes")}</span>
        </label>
        <div class="label">${t("rule_then")}</div>
        <div class="point-line">
          ${this._actionPicker(draft.action, (action) => update({ action }))}
        </div>
        <div class="label">${t("applies_to")}</div>
        ${this._targetPicker(draft, (rooms, floors) => update({ rooms, floors }))}
        <p class="hint">${this._ruleSentence(draft)} ${t("rule_back")}</p>
        ${this._renderEditorButtons(save, () => (this._rule = undefined), existing
          ? async () => {
              const list = (this.control?.rules ?? []).filter((item) => item.id !== draft.id);
              if (await this._save({ rules: list })) this._rule = undefined;
            }
          : undefined)}
      </div>
    `;
  }

  // -- stoves ---------------------------------------------------------------

  private _stoveTemp(stove: Stove): string {
    const state = stove.sensor ? this.hass?.states[stove.sensor] : undefined;
    const value = Number(state?.state);
    if (!state || !Number.isFinite(value)) return "";
    return `${Math.round(value)} ${state.attributes.unit_of_measurement ?? "°C"}`;
  }

  private _renderStove(stove: Stove) {
    const t = this.t;
    const burning = this.control?.burning?.includes(stove.id);
    const rooms = Object.entries(stove.actions)
      .map(([id, action]) => {
        const room = this.plant?.rooms.find((item) => item.id === id);
        return room ? `${room.name} ${this._label(action)}` : "";
      })
      .filter(Boolean);
    return html`
      <li>
        <div class="row-main">
          <span class="row-name"
            >${stove.name || t("unnamed")}${burning
              ? html`<span class="badge hot">${t("stove_burning")}</span>`
              : nothing}</span
          >
          <button class="link" @click=${() => (this._stove = structuredClone(stove))}>
            ${t("edit")}
          </button>
        </div>
        <div class="row-detail">
          ${t("stove_summary", { degrees: String(stove.on_above) })}
          ${this._stoveTemp(stove) ? `${t("stove_now")} ${this._stoveTemp(stove)}.` : ""}
        </div>
        ${rooms.length
          ? html`<div class="row-detail">${t("stove_while")} ${rooms.join(", ")}</div>`
          : html`<div class="row-warn">${t("stove_no_rooms")}</div>`}
        ${stove.sensor ? nothing : html`<div class="row-warn">${t("stove_no_sensor")}</div>`}
      </li>
    `;
  }

  private _renderStoveEditor(draft: Stove) {
    const t = this.t;
    const update = (change: Partial<Stove>) => (this._stove = { ...draft, ...change });
    const stoves = this.control?.stoves ?? [];
    const existing = stoves.some((item) => item.id === draft.id);
    const sensors = Object.entries(this.hass?.states ?? {})
      .filter(
        ([entityId, state]) =>
          entityId.startsWith("sensor.") && state.attributes.device_class === "temperature",
      )
      .map(([entityId]) => entityId)
      .sort((a, b) => this._entityName(a).localeCompare(this._entityName(b)));
    if (draft.sensor && !sensors.includes(draft.sensor)) sensors.unshift(draft.sensor);
    const save = async () => {
      const clean = { ...draft, name: draft.name.trim() };
      const list = existing
        ? stoves.map((item) => (item.id === draft.id ? clean : item))
        : [...stoves, clean];
      if (await this._save({ stoves: list })) this._stove = undefined;
    };
    return html`
      <div class="editor">
        <label class="field">
          <span class="label">${t("name")}</span>
          <input
            type="text"
            maxlength="60"
            .value=${draft.name}
            placeholder=${t("stove_placeholder")}
            @input=${(event: Event) => update({ name: (event.target as HTMLInputElement).value })}
          />
        </label>
        <div class="label">${t("stove_sensor")}</div>
        <p class="hint first">${t("stove_sensor_hint")}</p>
        <select
          aria-label=${t("stove_sensor")}
          @change=${(event: Event) =>
            update({ sensor: (event.target as HTMLSelectElement).value || null })}
        >
          <option value="" ?selected=${!draft.sensor}>${t("choose")}</option>
          ${sensors.map(
            (entity) =>
              html`<option value=${entity} ?selected=${draft.sensor === entity}>
                ${this._entityName(entity)}
              </option>`,
          )}
        </select>
        <label class="field inline">
          <span class="label">${t("stove_threshold")}</span>
          <input
            class="short"
            type="number"
            min="25"
            max="500"
            step="1"
            .value=${String(draft.on_above)}
            @change=${(event: Event) => {
              const value = Number((event.target as HTMLInputElement).value);
              update({ on_above: Number.isFinite(value) ? Math.min(500, Math.max(25, value)) : 40 });
            }}
          />
          <span class="row-detail"
            >°C ${this._stoveTemp(draft) ? `· ${t("stove_now")} ${this._stoveTemp(draft)}` : ""}</span
          >
        </label>
        <label class="field">
          <span class="label">${t("stove_room")}</span>
          <select
            @change=${(event: Event) =>
              update({ room: (event.target as HTMLSelectElement).value || null })}
          >
            <option value="" ?selected=${!draft.room}>${t("stove_room_none")}</option>
            ${this.plant?.rooms.map(
              (room) =>
                html`<option value=${room.id} ?selected=${draft.room === room.id}>
                  ${this._roomLabel(room)}
                </option>`,
            )}
          </select>
        </label>
        <div class="label">${t("stove_actions")}</div>
        <p class="hint first">${t("stove_actions_hint")}</p>
        ${this.plant?.rooms.map(
          (room) => html`
            <div class="room-line">
              <span>${this._roomLabel(room)}</span>
              <span class="point-line">
                ${this._actionPicker(
                  draft.actions[room.id] ?? "",
                  (action) => {
                    const actions = { ...draft.actions };
                    if (action) actions[room.id] = action;
                    else delete actions[room.id];
                    update({ actions });
                  },
                  t("stove_leave"),
                )}
              </span>
            </div>
          `,
        )}
        ${this._renderEditorButtons(save, () => (this._stove = undefined), existing
          ? async () => {
              const list = stoves.filter((item) => item.id !== draft.id);
              if (await this._save({ stoves: list })) this._stove = undefined;
            }
          : undefined)}
      </div>
    `;
  }

  /** Room name with its floor, because names like "Bad" repeat. */
  private _roomLabel(room: Named & { floor?: string | null }): string {
    const floor = this.plant?.floors.find((item) => item.id === room.floor);
    return floor ? `${room.name} (${floor.name})` : room.name;
  }

  // -- render ---------------------------------------------------------------

  protected render() {
    const t = this.t;
    const control = this.control;
    if (!control || !this.plant) return nothing;
    const away = this._presets().includes("away") ? "preset:away" : "off";
    const stoves = control.stoves ?? [];
    return html`
      <section class="set">
        <h3>${t("set_schedules")}</h3>
        <p class="hint first">${t("schedules_intro")}</p>
        ${control.schedules.length
          ? html`<ul>
              ${control.schedules.map((schedule) =>
                this._schedule?.id === schedule.id
                  ? html`<li>${this._renderScheduleEditor(this._schedule)}</li>`
                  : this._renderSchedule(schedule),
              )}
            </ul>`
          : nothing}
        ${this._schedule && !control.schedules.some((item) => item.id === this._schedule!.id)
          ? html`<div class="new">${this._renderScheduleEditor(this._schedule)}</div>`
          : html`<button
              class="wide"
              @click=${() => {
                this._error = undefined;
                this._schedule = { id: newId(), name: "", points: [], rooms: [], floors: [] };
              }}
            >
              + ${t("add_schedule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${t("set_absence")}</h3>
        <p class="hint first">${t("absence_intro")}</p>
        ${control.rules.length
          ? html`<ul>
              ${control.rules.map((rule) =>
                this._rule?.id === rule.id
                  ? html`<li>${this._renderRuleEditor(this._rule)}</li>`
                  : this._renderRule(rule),
              )}
            </ul>`
          : nothing}
        ${this._rule && !control.rules.some((item) => item.id === this._rule!.id)
          ? html`<div class="new">${this._renderRuleEditor(this._rule)}</div>`
          : html`<button
              class="wide"
              @click=${() => {
                this._error = undefined;
                this._rule = {
                  id: newId(),
                  name: "",
                  entities: [],
                  delay_min: 10,
                  rooms: [],
                  floors: [],
                  action: away,
                };
              }}
            >
              + ${t("add_rule")}
            </button>`}
      </section>
      <section class="set">
        <h3>${t("set_stoves")}</h3>
        <p class="hint first">${t("stoves_intro")}</p>
        ${stoves.length
          ? html`<ul>
              ${stoves.map((stove) =>
                this._stove?.id === stove.id
                  ? html`<li>${this._renderStoveEditor(this._stove)}</li>`
                  : this._renderStove(stove),
              )}
            </ul>`
          : nothing}
        ${this._stove && !stoves.some((item) => item.id === this._stove!.id)
          ? html`<div class="new">${this._renderStoveEditor(this._stove)}</div>`
          : html`<button
              class="wide"
              @click=${() => {
                this._error = undefined;
                this._stove = {
                  id: newId(),
                  name: "",
                  sensor: null,
                  on_above: 40,
                  room: null,
                  actions: {},
                };
              }}
            >
              + ${t("add_stove")}
            </button>`}
      </section>
      <section class="set">
        <h3>${t("set_apply")}</h3>
        <div class="choices">
          ${[false, true].map(
            (enabled) =>
              html`<button
                class="choice ${control.enabled === enabled ? "on" : ""}"
                aria-pressed=${control.enabled === enabled}
                ?disabled=${this._busy}
                @click=${() => this._save({ enabled })}
              >
                ${t(enabled ? "apply_on" : "apply_off")}
              </button>`,
          )}
        </div>
        <p class="hint">${t(control.enabled ? "apply_on_hint" : "apply_off_hint")}</p>
        ${this._error && !this._schedule && !this._rule && !this._stove
          ? html`<div class="row-warn">${this._error}</div>`
          : nothing}
      </section>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    h3 {
      margin: 0 0 8px;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--hz-muted);
    }
    ul {
      list-style: none;
      margin: 10px 0;
      padding: 0;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
    }
    li {
      padding: 10px 12px;
    }
    li + li {
      border-top: 1px solid var(--hz-edge);
    }
    .new {
      margin: 10px 0;
      padding: 12px;
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 14px;
    }
    .row-main {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .row-name {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-weight: 500;
    }
    .row-detail {
      font-size: 0.8rem;
      line-height: 1.5;
      color: var(--hz-muted);
    }
    .row-warn {
      margin-top: 4px;
      font-size: 0.8rem;
      color: color-mix(in srgb, var(--hz-warn) 75%, var(--primary-text-color));
    }
    .badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--hz-cold) 22%, transparent);
    }
    .badge.hot {
      background: color-mix(in srgb, var(--hz-hot) 24%, transparent);
    }
    .room-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 0.9rem;
      padding: 4px 0;
      border-top: 1px solid var(--hz-edge);
    }
    .room-line .point-line {
      flex: 0 1 260px;
    }
    .hint {
      margin: 8px 0 0;
      font-size: 0.82rem;
      line-height: 1.4;
      color: var(--hz-muted);
    }
    .hint.first {
      margin: 0 0 8px;
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .label {
      margin-top: 6px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field.inline {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .field.inline .label {
      margin: 0;
    }
    input,
    select {
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-text-color);
      background: var(--hz-card);
      border: 1px solid var(--hz-edge);
      border-radius: 10px;
      padding: 8px 10px;
      min-width: 0;
      box-sizing: border-box;
    }
    input[type="text"],
    .editor > select {
      width: 100%;
    }
    input.short {
      width: 84px;
    }
    .point {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 10px;
      border: 1px solid var(--hz-edge);
      border-radius: 12px;
      background: var(--hz-card);
    }
    .days {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .day {
      font: inherit;
      font-size: 0.78rem;
      min-width: 36px;
      padding: 6px 0;
      color: var(--primary-text-color);
      background: var(--hz-soft);
      border: 1px solid var(--hz-edge);
      border-radius: 8px;
      cursor: pointer;
    }
    .day.on,
    .choice.on {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .point-line {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .point-line select {
      flex: 1 1 90px;
    }
    .icon {
      font: inherit;
      width: 36px;
      height: 36px;
      color: var(--hz-muted);
      background: none;
      border: 0;
      border-radius: 50%;
      cursor: pointer;
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
    .editor .choice:not(.on) {
      background: var(--hz-card);
    }
    .choice.via {
      border-color: var(--primary-color);
      border-style: dashed;
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
    .wide.danger {
      color: var(--error-color, #db4437);
      background: none;
    }
    .buttons {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .buttons .wide {
      flex: 1 1 110px;
      width: auto;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
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
      flex: none;
    }
    button:focus-visible,
    input:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `;
}

if (!customElements.get("heizzentrale-control")) {
  customElements.define("heizzentrale-control", HeizzentraleControl);
}
