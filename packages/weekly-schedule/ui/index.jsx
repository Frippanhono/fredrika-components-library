import "./index.css";

/**
 * Standardveckodagar (mån–sön) på svenska. Kort etikett och fullt namn.
 */
/**
 * Veckans färger (svensk tradition):
 * måndag = grön, tisdag = blå, onsdag = vit, torsdag = brun,
 * fredag = gul, lördag = rosa, söndag = röd.
 *
 * Färgerna sätts som CSS-variabler (`--fc-week-day-bg` / `--fc-week-day-fg`)
 * per kolumn så att de kan användas i bakgrund och rubrik.
 */
export const WEEKDAYS_SV = [
  { key: "mon", short: "Mån", label: "Måndag", color: "#7cc36e", fg: "#1a1a1a" },
  { key: "tue", short: "Tis", label: "Tisdag", color: "#7ec8f2", fg: "#1a1a1a" },
  { key: "wed", short: "Ons", label: "Onsdag", color: "#ffffff", fg: "#1a1a1a" },
  { key: "thu", short: "Tor", label: "Torsdag", color: "#a55a18", fg: "#ffffff" },
  { key: "fri", short: "Fre", label: "Fredag", color: "#f7e84a", fg: "#1a1a1a" },
  { key: "sat", short: "Lör", label: "Lördag", color: "#f3a6c4", fg: "#1a1a1a" },
  { key: "sun", short: "Sön", label: "Söndag", color: "#d94b4b", fg: "#ffffff" },
];

const TONE_CLASSES = {
  neutral: "",
  info: "fc-week__event--info",
  success: "fc-week__event--success",
  warning: "fc-week__event--warning",
  danger: "fc-week__event--danger",
};

function formatTimeRange(start, end) {
  if (start && end) return `${start}–${end}`;
  if (start) return start;
  if (end) return end;
  return "";
}

/**
 * ScheduleEvent – ett enskilt händelsekort i veckovyn.
 *
 * @param {object} props
 * @param {React.ReactNode} props.title - Rubrik på händelsen.
 * @param {string} [props.start] - Starttid, t.ex. "09:00".
 * @param {string} [props.end] - Sluttid, t.ex. "10:30".
 * @param {React.ReactNode} [props.description] - Valfri beskrivning.
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone="neutral"] - Färgton.
 * @param {(e: React.MouseEvent|React.KeyboardEvent) => void} [props.onClick] - Klickhanterare.
 * @param {string} [props.className] - Extra klasser.
 */
export function ScheduleEvent({
  title,
  start,
  end,
  description,
  tone = "neutral",
  onClick,
  className = "",
  ...rest
}) {
  const interactive = typeof onClick === "function";
  const toneClass = TONE_CLASSES[tone] ?? "";
  const classes = [
    "fc-week__event",
    toneClass,
    interactive ? "fc-week__event--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function handleKeyDown(e) {
    if (!interactive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(e);
    }
  }

  const Tag = interactive ? "button" : "div";
  const interactiveProps = interactive
    ? { type: "button", onClick, onKeyDown: handleKeyDown }
    : {};
  const range = formatTimeRange(start, end);

  return (
    <Tag className={classes} {...interactiveProps} {...rest}>
      {range && <span className="fc-week__event-time">{range}</span>}
      <span className="fc-week__event-title">{title}</span>
      {description != null && description !== "" && (
        <span className="fc-week__event-desc">{description}</span>
      )}
    </Tag>
  );
}

/**
 * WeeklySchedule – enkel veckovy som visar händelser per dag.
 *
 * Vyn är medvetet lättviktig och fokuserar på:
 * - **Kort** per händelse (rubrik, tid, beskrivning, färgton).
 * - **Tidsspann** som textetiketter (ingen tidslinje-kalkyl).
 * - **Layout** som CSS-grid – en kolumn per dag på bred skärm.
 * - **Responsivitet** – staplar till en kolumn på smala skärmar med dagens
 *   namn som rubrik.
 *
 * Händelser sorteras automatiskt på starttid inom varje dag.
 *
 * @param {object} props
 * @param {Array<{key?: string, short?: string, label?: React.ReactNode}>} [props.days=WEEKDAYS_SV.slice(0,5)] - Dagar att visa.
 * @param {Array<{day: string, title: React.ReactNode, start?: string, end?: string, description?: React.ReactNode, tone?: string, onClick?: Function, id?: string}>} [props.events=[]] - Händelser där `day` matchar `days[i].key`.
 * @param {React.ReactNode} [props.title] - Valfri rubrik ovanför schemat.
 * @param {React.ReactNode} [props.emptyLabel="Inga händelser"] - Visas i tomma dagar.
 * @param {string} [props.className] - Extra klasser på containern.
 *
 * @example
 * <WeeklySchedule
 *   events={[
 *     { day: "mon", start: "09:00", end: "10:30", title: "Samling", tone: "info" },
 *     { day: "wed", start: "14:00", title: "Skapande", tone: "success" },
 *   ]}
 * />
 */
export function WeeklySchedule({
  days = WEEKDAYS_SV.slice(0, 5),
  events = [],
  title,
  emptyLabel = "Inga händelser",
  className = "",
  ...rest
}) {
  const eventsByDay = new Map();
  for (const day of days) {
    eventsByDay.set(day.key, []);
  }
  for (const ev of events) {
    if (eventsByDay.has(ev.day)) {
      eventsByDay.get(ev.day).push(ev);
    }
  }
  for (const list of eventsByDay.values()) {
    list.sort((a, b) => String(a.start ?? "").localeCompare(String(b.start ?? "")));
  }

  const classes = ["fc-week", className].filter(Boolean).join(" ");

  return (
    <section
      className={classes}
      style={{ "--fc-week-cols": days.length }}
      {...rest}
    >
      {title != null && <h3 className="fc-week__title">{title}</h3>}
      <div className="fc-week__grid" role="list">
        {days.map((day) => {
          const list = eventsByDay.get(day.key) ?? [];
          const dayStyle = day.color
            ? {
                "--fc-week-day-bg": day.color,
                "--fc-week-day-fg": day.fg ?? "#1a1a1a",
              }
            : undefined;
          return (
            <div
              key={day.key}
              className="fc-week__day"
              role="listitem"
              style={dayStyle}
            >
              <header className="fc-week__day-head">
                <span className="fc-week__day-short" aria-hidden="true">
                  {day.short ?? day.label}
                </span>
                <span className="fc-week__day-label">
                  {day.label ?? day.short}
                </span>
              </header>
              <div className="fc-week__events">
                {list.length === 0 ? (
                  <p className="fc-week__empty">{emptyLabel}</p>
                ) : (
                  list.map((ev, i) => (
                    <ScheduleEvent
                      key={ev.id ?? `${day.key}-${i}`}
                      title={ev.title}
                      start={ev.start}
                      end={ev.end}
                      description={ev.description}
                      tone={ev.tone}
                      onClick={ev.onClick}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
