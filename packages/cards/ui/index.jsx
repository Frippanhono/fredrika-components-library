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
 * Fördefinierade avsändar-/mottagarroller för `MessageCard`.
 * Mappar en kort nyckel till en svensk etikett samt initial och färg
 * för rollmarkören (samma visuella språk som `ChildCard`).
 */
export const MESSAGE_ROLE_PRESETS = {
  teacher: { label: "Pedagog", short: "P", className: "fc-card__role-badge--teacher" },
  guardian: { label: "Vårdnadshavare", short: "V", className: "fc-card__role-badge--guardian" },
  child: { label: "Barn", short: "B", className: "fc-card__role-badge--child" },
  admin: { label: "Administratör", short: "A", className: "fc-card__role-badge--admin" },
  system: { label: "System", short: "S", className: "fc-card__role-badge--system" },
};

function resolveParticipant(input) {
  if (!input) return null;
  if (typeof input === "string") return { name: input };
  if (typeof input === "object" && input.name) return input;
  return null;
}

function resolveRole(role) {
  if (!role) return null;
  if (typeof role === "string") {
    return (
      MESSAGE_ROLE_PRESETS[role] ?? {
        label: role,
        short: role.slice(0, 1).toUpperCase(),
        className: "",
      }
    );
  }
  if (typeof role === "object" && role.label) {
    return {
      short: role.short ?? String(role.label).slice(0, 1).toUpperCase(),
      className: role.className ?? "",
      ...role,
    };
  }
  return null;
}

function formatTimestamp(ts) {
  if (ts == null) return null;
  if (ts instanceof Date) {
    return ts.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return ts;
}

/**
 * MessageCard – kort för meddelanden mellan pedagog och vårdnadshavare.
 *
 * Visar avsändare (med rollmarkör och avatar), valfri mottagare, ämne,
 * en kort förhandsvisning, tidsstämpel och eventuella bilagor. Markerar
 * olästa meddelanden visuellt och stödjer prioritet samt egna åtgärder.
 *
 * Exporteras även som `NoticeCard` när du föredrar den semantiken
 * (t.ex. för enkelriktade aviseringar/anslag).
 *
 * @param {object} props
 * @param {string | {name: string, role?: keyof typeof MESSAGE_ROLE_PRESETS | object, avatar?: string}} props.sender
 *   - Avsändare. Sträng tolkas som namn. Objekt kan ange `role` och `avatar`.
 * @param {string | {name: string, role?: keyof typeof MESSAGE_ROLE_PRESETS | object}} [props.recipient]
 *   - Valfri mottagare (visas som "Till: …").
 * @param {React.ReactNode} [props.subject] - Ämne (visas som rubrik).
 * @param {React.ReactNode} [props.preview] - Kort förhandsvisning. Kan även skickas som `children`.
 * @param {React.ReactNode} [props.children] - Alternativ till `preview`; visas som meddelandetext.
 * @param {string | Date} [props.timestamp] - Tidsstämpel (formateras om `Date`).
 * @param {boolean} [props.unread=false] - Markerar meddelandet som oläst.
 * @param {"normal"|"high"} [props.priority="normal"] - Höjd prioritet ger en synlig markering.
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone] - Accentfärg.
 *   Om utelämnad väljs `"warning"` för `priority="high"`, annars `"info"` när `unread`.
 * @param {number} [props.attachments=0] - Antal bilagor (visas som ikon + räknare).
 * @param {React.ReactNode} [props.actions] - Åtgärder i kortets footer.
 * @param {(e: React.MouseEvent|React.KeyboardEvent) => void} [props.onClick] - Gör kortet klickbart.
 * @param {boolean} [props.selected=false] - Markerar kortet som valt.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <MessageCard
 *   sender={{ name: "Anna Lärare", role: "teacher" }}
 *   recipient={{ name: "Per Persson", role: "guardian" }}
 *   subject="Utvecklingssamtal"
 *   preview="Hej Per! Vill du boka tid nästa vecka?"
 *   timestamp="09:42"
 *   unread
 * />
 *
 * @example
 * // Anslag/avisering
 * <NoticeCard
 *   sender={{ name: "Förskolan Solrosen", role: "system" }}
 *   subject="Stängt fredag den 7 juni"
 *   priority="high"
 *   timestamp={new Date()}
 * >
 *   Förskolan håller stängt för planeringsdag.
 * </NoticeCard>
 */
export function MessageCard({
  sender,
  recipient,
  subject,
  preview,
  children,
  timestamp,
  unread = false,
  priority = "normal",
  tone,
  attachments = 0,
  actions,
  onClick,
  selected = false,
  className = "",
  ...rest
}) {
  const senderObj = resolveParticipant(sender) ?? { name: "" };
  const recipientObj = resolveParticipant(recipient);
  const senderRole = resolveRole(senderObj.role);
  const recipientRole = resolveRole(recipientObj?.role);

  const resolvedTone =
    tone ?? (priority === "high" ? "warning" : unread ? "info" : "neutral");

  const formattedTs = formatTimestamp(timestamp);
  const body = preview ?? children;

  let avatarContent;
  if (senderObj.avatar == null) {
    avatarContent = (
      <span className="fc-card__msg-avatar-initials" aria-hidden="true">
        {getInitials(senderObj.name)}
      </span>
    );
  } else if (typeof senderObj.avatar === "string") {
    avatarContent = (
      <img
        className="fc-card__msg-avatar-img"
        src={senderObj.avatar}
        alt={senderObj.name || ""}
      />
    );
  } else {
    avatarContent = senderObj.avatar;
  }

  const classes = [
    "fc-card--message",
    unread && "fc-card--message-unread",
    priority === "high" && "fc-card--message-priority",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card
      tone={resolvedTone}
      onClick={onClick}
      selected={selected}
      className={classes}
      aria-label={
        subject
          ? `Meddelande från ${senderObj.name}: ${typeof subject === "string" ? subject : ""}`
          : undefined
      }
      {...rest}
    >
      <CardHeader>
        <CardMedia className="fc-card__msg-avatar">{avatarContent}</CardMedia>
        <div className="fc-card__msg-identity">
          <div className="fc-card__msg-senderline">
            <span className="fc-card__msg-sender">{senderObj.name}</span>
            {senderRole && (
              <span
                className={`fc-card__role-badge ${senderRole.className}`}
                aria-label={senderRole.label}
                title={senderRole.label}
              >
                {senderRole.short}
              </span>
            )}
            {unread && (
              <span
                className="fc-card__msg-unread-dot"
                aria-label="Oläst"
                title="Oläst"
              />
            )}
            {priority === "high" && (
              <span
                className="fc-card__msg-priority"
                aria-label="Hög prioritet"
                title="Hög prioritet"
              >
                Viktigt
              </span>
            )}
          </div>
          {recipientObj && (
            <div className="fc-card__msg-recipientline">
              <span className="fc-card__msg-recipient-label">Till:</span>
              <span className="fc-card__msg-recipient">{recipientObj.name}</span>
              {recipientRole && (
                <span
                  className={`fc-card__role-badge ${recipientRole.className}`}
                  aria-label={recipientRole.label}
                  title={recipientRole.label}
                >
                  {recipientRole.short}
                </span>
              )}
            </div>
          )}
        </div>
        {formattedTs && (
          <CardMeta className="fc-card__msg-time">
            <time>{formattedTs}</time>
          </CardMeta>
        )}
      </CardHeader>
      {(subject || body || attachments > 0) && (
        <CardBody className="fc-card__msg-body">
          {subject && (
            <p className="fc-card__msg-subject">{subject}</p>
          )}
          {body && <p className="fc-card__msg-preview">{body}</p>}
          {attachments > 0 && (
            <p
              className="fc-card__msg-attachments"
              aria-label={`${attachments} bilagor`}
            >
              <span aria-hidden="true">📎</span>
              <span>
                {attachments} {attachments === 1 ? "bilaga" : "bilagor"}
              </span>
            </p>
          )}
        </CardBody>
      )}
      {actions != null && <CardFooter>{actions}</CardFooter>}
    </Card>
  );
}

/**
 * NoticeCard – alias för {@link MessageCard}. Använd när det semantiska
 * sammanhanget är en avisering/anslag snarare än en konversation.
 */
export const NoticeCard = MessageCard;
