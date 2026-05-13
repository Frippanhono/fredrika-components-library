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
