import "./index.css";

/**
 * Card – container som grupperar relaterat innehåll med ram och bakgrund.
 *
 * Kortet är medvetet flexibelt och återanvänds bl.a. för:
 * - **Barnkort** – profilliknande kort med avatar/ikon (`CardMedia`) och namn.
 * - **Aktivitet** – feed-rader med ikon, beskrivning och tidsstämpel (`CardMeta`).
 * - **Meddelanden** – avsändare, förhandsvisning, oläst-markering via `tone`/`selected`.
 * - **Dashboard** – nyckeltal via `StatCard` eller egna layouter inuti `CardBody`.
 *
 * Kombineras med `CardHeader`, `CardTitle`, `CardSubtitle`, `CardMedia`,
 * `CardBody`, `CardMeta`, `CardActions` och `CardFooter`.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Kortets innehåll.
 * @param {"default"|"elevated"|"outline"|"ghost"} [props.variant="default"] - Visuell stil.
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone="neutral"] - Accentfärg (vänsterkant + ikonton).
 * @param {boolean} [props.interactive=false] - Gör kortet klickbart (hover/fokus, role="button").
 * @param {boolean} [props.selected=false] - Markerar kortet som valt/aktivt.
 * @param {keyof JSX.IntrinsicElements} [props.as="div"] - Underliggande element.
 * @param {(e: React.MouseEvent|React.KeyboardEvent) => void} [props.onClick] - Klickhanterare (aktiverar tangentbordsstöd).
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * // Barnkort
 * <Card interactive onClick={openChild}>
 *   <CardHeader>
 *     <CardMedia><Avatar name="Alma" /></CardMedia>
 *     <div>
 *       <CardTitle>Alma</CardTitle>
 *       <CardSubtitle>5 år</CardSubtitle>
 *     </div>
 *   </CardHeader>
 * </Card>
 *
 * @example
 * // Meddelande
 * <Card tone="info" selected={unread}>
 *   <CardHeader>
 *     <CardTitle>Förskolan</CardTitle>
 *     <CardMeta>09:42</CardMeta>
 *   </CardHeader>
 *   <CardBody>Tack för dagens info!</CardBody>
 * </Card>
 */
export function Card({
  children,
  variant = "default",
  tone = "neutral",
  interactive = false,
  selected = false,
  as: As = "div",
  onClick,
  className = "",
  ...rest
}) {
  const isInteractive = interactive || typeof onClick === "function";

  const classes = [
    "fc-card",
    variant !== "default" && `fc-card--${variant}`,
    tone !== "neutral" && `fc-card--tone-${tone}`,
    isInteractive && "fc-card--interactive",
    selected && "fc-card--selected",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const { onKeyDown: userOnKeyDown, role, tabIndex, ...restProps } = rest;

  const interactiveProps = isInteractive
    ? {
        role: role ?? (As === "button" ? undefined : "button"),
        tabIndex: tabIndex ?? 0,
        onClick,
        onKeyDown: (e) => {
          userOnKeyDown?.(e);
          if (!onClick) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(e);
          }
        },
      }
    : { onClick, onKeyDown: userOnKeyDown, role, tabIndex };

  return (
    <As className={classes} {...restProps} {...interactiveProps}>
      {children}
    </As>
  );
}

/**
 * CardHeader – övre sektion i ett kort, ofta för rubrik, media och åtgärder.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardHeader({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__header ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardBody – huvudinnehållet i ett kort.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardBody({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__body ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardFooter – nedre sektion i ett kort, ofta för knappar eller metadata.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardFooter({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__footer ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardTitle – semantisk rubrik för ett kort. Default är `<h3>`.
 * @param {{children: React.ReactNode, as?: keyof JSX.IntrinsicElements, className?: string}} props
 */
export function CardTitle({ children, as: As = "h3", className = "", ...rest }) {
  return (
    <As className={`fc-card__title ${className}`} {...rest}>
      {children}
    </As>
  );
}

/**
 * CardSubtitle – sekundär rubrik/etikett (t.ex. ålder, roll, kategori).
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardSubtitle({ children, className = "", ...rest }) {
  return (
    <p className={`fc-card__subtitle ${className}`} {...rest}>
      {children}
    </p>
  );
}

/**
 * CardMedia – plats för avatar, ikon eller bild i kortets header.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardMedia({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__media ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * CardMeta – diskret metadata, t.ex. tidsstämpel eller status.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardMeta({ children, className = "", ...rest }) {
  return (
    <span className={`fc-card__meta ${className}`} {...rest}>
      {children}
    </span>
  );
}

/**
 * CardActions – grupp av knappar/länkar, vanligen i header eller footer.
 * @param {{children: React.ReactNode, className?: string}} props
 */
export function CardActions({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__actions ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * StatCard – kompakt nyckeltal för dashboards.
 *
 * @param {object} props
 * @param {React.ReactNode} props.label - Beskrivning av nyckeltalet.
 * @param {React.ReactNode} props.value - Värdet (siffra eller text).
 * @param {React.ReactNode} [props.delta] - Förändring/trend (t.ex. "+12%").
 * @param {"up"|"down"|"flat"} [props.trend] - Riktning på förändringen.
 * @param {React.ReactNode} [props.icon] - Ikon som visas bredvid värdet.
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone="neutral"] - Accentfärg.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <StatCard label="Aktiva barn" value={128} delta="+4" trend="up" tone="success" />
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  icon,
  tone = "neutral",
  className = "",
  ...rest
}) {
  return (
    <Card tone={tone} className={`fc-card--stat ${className}`} {...rest}>
      <div className="fc-card__stat">
        <div className="fc-card__stat-head">
          <span className="fc-card__stat-label">{label}</span>
          {icon && (
            <span className="fc-card__stat-icon" aria-hidden="true">
              {icon}
            </span>
          )}
        </div>
        <span className="fc-card__stat-value">{value}</span>
        {delta != null && (
          <span
            className={[
              "fc-card__stat-delta",
              trend && `fc-card__stat-delta--${trend}`,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}

/**
 * Fördefinierade närvarostatusar för `ChildCard`.
 * Mappar en kort nyckel till en svensk etikett och en visuell ton.
 *
 * Nyckeln kan användas direkt på `ChildCard`-propet `status`. Vill du visa
 * en helt egen status skickar du in ett objekt `{ label, tone }` istället.
 */
export const CHILD_STATUS_PRESETS = {
  present: { label: "På plats", tone: "success" },
  absent: { label: "Frånvarande", tone: "danger" },
  sick: { label: "Sjukanmäld", tone: "warning" },
  leave: { label: "Ledig", tone: "info" },
  arriving: { label: "På väg", tone: "info" },
  pickedup: { label: "Hämtad", tone: "neutral" },
};

function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function resolveStatus(status) {
  if (!status) return null;
  if (typeof status === "string") {
    return CHILD_STATUS_PRESETS[status] ?? { label: status, tone: "neutral" };
  }
  if (typeof status === "object" && status.label) {
    return { tone: "neutral", ...status };
  }
  return null;
}

/**
 * ChildCard – pedagogiskt kort för att presentera ett barn i förskole-UI.
 *
 * Sammanställer de vanligaste fälten – **namn**, **avdelning**, **status**
 * och **avatar** – ovanpå `Card`-primitiverna med tydliga defaultvärden,
 * automatiska initialer som avatarfallback och färgkodad statusetikett.
 *
 * @param {object} props
 * @param {string} props.name - Barnets namn (visas som rubrik). Används även för initialer.
 * @param {React.ReactNode} [props.department] - Avdelning eller grupp (visas som underrubrik).
 * @param {keyof typeof CHILD_STATUS_PRESETS | {label: React.ReactNode, tone?: "neutral"|"info"|"success"|"warning"|"danger"}} [props.status]
 *   - Närvarostatus. Antingen en fördefinierad nyckel (t.ex. `"present"`)
 *     eller ett objekt `{ label, tone }`.
 * @param {React.ReactNode | string} [props.avatar] - Avatar. Sträng tolkas som bild-URL,
 *   ReactNode renderas som-den-är. Saknas avatar visas automatiska initialer.
 * @param {string} [props.avatarAlt] - Alternativtext för bild-avatar (default = namnet).
 * @param {Array<string | {name: string}>} [props.guardians] - Vårdnadshavare som visas
 *   med en liten "V"-markör ovanför barnets namn. Strängar tolkas som namn.
 * @param {React.ReactNode} [props.children] - Valfritt extra innehåll (visas i `CardBody`).
 * @param {React.ReactNode} [props.footer] - Valfri footer, t.ex. knappar.
 * @param {(e: React.MouseEvent|React.KeyboardEvent) => void} [props.onClick] - Gör kortet klickbart.
 * @param {boolean} [props.selected=false] - Markerar kortet som valt.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <ChildCard
 *   name="Adam Persson"
 *   department="Solrosen"
 *   status="present"
 *   guardians={["Anja Persson", "Peter Persson"]}
 * />
 *
 * @example
 * <ChildCard
 *   name="Bruno Berg"
 *   department="Maskrosen"
 *   status={{ label: "Hämtas 14:30", tone: "info" }}
 *   avatar="/avatars/bruno.jpg"
 *   onClick={() => openChild(child.id)}
 * />
 */
export function ChildCard({
  name,
  department,
  status,
  avatar,
  avatarAlt,
  guardians,
  children,
  footer,
  onClick,
  selected = false,
  className = "",
  ...rest
}) {
  const resolvedStatus = resolveStatus(status);
  const guardianList = (guardians ?? [])
    .map((g) => (typeof g === "string" ? { name: g } : g))
    .filter((g) => g && g.name);

  let avatarContent;
  if (avatar == null) {
    avatarContent = (
      <span className="fc-card__child-avatar-initials" aria-hidden="true">
        {getInitials(name)}
      </span>
    );
  } else if (typeof avatar === "string") {
    avatarContent = (
      <img
        className="fc-card__child-avatar-img"
        src={avatar}
        alt={avatarAlt ?? name ?? ""}
      />
    );
  } else {
    avatarContent = avatar;
  }

  return (
    <Card
      onClick={onClick}
      selected={selected}
      className={`fc-card--child ${className}`}
      {...rest}
    >
      <CardHeader>
        <CardMedia className="fc-card__child-avatar">{avatarContent}</CardMedia>
        <div className="fc-card__child-identity">
          {guardianList.length > 0 && (
            <ul
              className="fc-card__child-guardians"
              aria-label="Vårdnadshavare"
            >
              {guardianList.map((g, i) => (
                <li key={`${g.name}-${i}`} className="fc-card__child-guardian">
                  <span className="fc-card__child-guardian-name">{g.name}</span>
                  <span
                    className="fc-card__role-badge fc-card__role-badge--guardian"
                    aria-label="Vårdnadshavare"
                    title="Vårdnadshavare"
                  >
                    V
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="fc-card__child-nameline">
            <CardTitle className="fc-card__child-name">{name}</CardTitle>
            <span
              className="fc-card__role-badge fc-card__role-badge--child"
              aria-label="Barn"
              title="Barn"
            >
              B
            </span>
          </div>
          {department && <CardSubtitle>{department}</CardSubtitle>}
        </div>
        {resolvedStatus && (
          <span
            className={`fc-card__child-status fc-card__child-status--${resolvedStatus.tone}`}
          >
            <span
              className="fc-card__child-status-dot"
              aria-hidden="true"
            />
            {resolvedStatus.label}
          </span>
        )}
      </CardHeader>
      {children != null && <CardBody>{children}</CardBody>}
      {footer != null && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

/**
 * Fördefinierade aktivitetstyper för `ActivityCard`.
 *
 * Varje preset innehåller en standardikon och en färgkodad ton. Kan användas
 * direkt via propet `type` på `ActivityCard`, eller refereras härifrån om du
 * behöver återanvända ikonen/etiketten någon annanstans.
 */
export const ACTIVITY_TYPE_PRESETS = {
  dropoff: { icon: "📥", tone: "info", label: "Lämning" },
  pickup: { icon: "📤", tone: "info", label: "Hämtning" },
  meal: { icon: "🍽️", tone: "success", label: "Måltid" },
  nap: { icon: "💤", tone: "neutral", label: "Vila" },
  outdoor: { icon: "🌳", tone: "success", label: "Utevistelse" },
  note: { icon: "📝", tone: "neutral", label: "Notering" },
  message: { icon: "💬", tone: "info", label: "Meddelande" },
  incident: { icon: "⚠️", tone: "warning", label: "Avvikelse" },
  sick: { icon: "🤒", tone: "danger", label: "Sjuk" },
};

/**
 * ActivityCard – feedrad för en aktivitet/händelse i förskolans loggflöde.
 *
 * Visar **aktivitet**, **tid**, **ikon** och färgkodning (`tone`) i ett
 * kompakt kort som bygger på `Card`-primitiverna. Använd `type` för att få en
 * fördefinierad ikon + ton, eller skicka in egna `icon` och `tone` för full
 * kontroll.
 *
 * @param {object} props
 * @param {React.ReactNode} props.activity - Aktivitetens beskrivning (rubrik).
 * @param {React.ReactNode} [props.time] - Tidpunkt (visas som metadata).
 * @param {React.ReactNode} [props.icon] - Ikon. Saknas den används ikonen från `type`.
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone] - Färgkodning. Saknas den används tonen från `type`.
 * @param {keyof typeof ACTIVITY_TYPE_PRESETS} [props.type] - Fördefinierad aktivitetstyp som ger ikon + ton.
 * @param {React.ReactNode} [props.description] - Valfri detaljtext under rubriken.
 * @param {React.ReactNode} [props.children] - Valfritt extra innehåll (renderas i `CardBody`).
 * @param {React.ReactNode} [props.footer] - Valfri footer.
 * @param {(e: React.MouseEvent|React.KeyboardEvent) => void} [props.onClick] - Gör kortet klickbart.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <ActivityCard
 *   type="dropoff"
 *   activity="Alma lämnad på förskolan"
 *   description="Lämnad av Pappa"
 *   time="08:14"
 * />
 *
 * @example
 * <ActivityCard
 *   icon="🌳"
 *   tone="success"
 *   activity="Utevistelse på gården"
 *   time="10:30"
 * />
 */
export function ActivityCard({
  activity,
  time,
  icon,
  tone,
  type,
  description,
  children,
  footer,
  onClick,
  className = "",
  ...rest
}) {
  const preset = type ? ACTIVITY_TYPE_PRESETS[type] : null;
  const resolvedIcon = icon ?? preset?.icon ?? null;
  const resolvedTone = tone ?? preset?.tone ?? "neutral";

  return (
    <Card
      tone={resolvedTone}
      onClick={onClick}
      className={`fc-card--activity ${className}`}
      {...rest}
    >
      <CardHeader>
        {resolvedIcon != null && (
          <CardMedia
            className={`fc-card__activity-icon fc-card__activity-icon--${resolvedTone}`}
            aria-hidden="true"
          >
            {resolvedIcon}
          </CardMedia>
        )}
        <div className="fc-card__activity-body">
          <CardTitle as="h4" className="fc-card__activity-title">
            {activity}
          </CardTitle>
          {description != null && (
            <CardSubtitle className="fc-card__activity-description">
              {description}
            </CardSubtitle>
          )}
        </div>
        {time != null && <CardMeta>{time}</CardMeta>}
      </CardHeader>
      {children != null && <CardBody>{children}</CardBody>}
      {footer != null && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
