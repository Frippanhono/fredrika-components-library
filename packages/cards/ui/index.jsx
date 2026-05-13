import "./index.css";

/**
 * Card – container som grupperar relaterat innehåll med ram och bakgrund.
 *
 * Kombineras med `CardHeader`, `CardTitle`, `CardSubtitle`, `CardMedia`,
 * `CardBody`, `CardMeta`, `CardActions` och `CardFooter`.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {"default"|"elevated"|"outline"|"ghost"} [props.variant="default"]
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone="neutral"]
 * @param {boolean} [props.interactive=false]
 * @param {boolean} [props.selected=false]
 * @param {keyof JSX.IntrinsicElements} [props.as="div"]
 * @param {(e: any) => void} [props.onClick]
 * @param {string} [props.className]
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

/** CardHeader – övre sektion i ett kort. */
export function CardHeader({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__header ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** CardBody – huvudinnehåll. */
export function CardBody({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__body ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** CardFooter – nedre sektion. */
export function CardFooter({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__footer ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** CardTitle – semantisk rubrik. Default `<h3>`. */
export function CardTitle({ children, as: As = "h3", className = "", ...rest }) {
  return (
    <As className={`fc-card__title ${className}`} {...rest}>
      {children}
    </As>
  );
}

/** CardSubtitle – sekundär rubrik/etikett. */
export function CardSubtitle({ children, className = "", ...rest }) {
  return (
    <p className={`fc-card__subtitle ${className}`} {...rest}>
      {children}
    </p>
  );
}

/** CardMedia – plats för avatar, ikon eller bild i headern. */
export function CardMedia({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__media ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** CardMeta – diskret metadata (tidsstämpel, status). */
export function CardMeta({ children, className = "", ...rest }) {
  return (
    <span className={`fc-card__meta ${className}`} {...rest}>
      {children}
    </span>
  );
}

/** CardActions – grupp av knappar/länkar. */
export function CardActions({ children, className = "", ...rest }) {
  return (
    <div className={`fc-card__actions ${className}`} {...rest}>
      {children}
    </div>
  );
}

/**
 * PostCard – horisontellt kort för en "Senaste inlägg"-lista.
 *
 * Visar en bild till vänster, titel överst till höger och en rad med
 * datum + "Läs mer"-länk längst ner.
 *
 * @param {object} props
 * @param {string} props.image - URL/källa till bilden.
 * @param {string} [props.imageAlt=""] - Alt-text för bilden. Lämna tom för dekorativ bild.
 * @param {React.ReactNode} props.title - Rubriktext/inläggets titel.
 * @param {React.ReactNode} props.date - Datum att visa (t.ex. "23 april").
 * @param {string} [props.href="#"] - Mål för "Läs mer"-länken.
 * @param {string} [props.readMoreLabel="Läs mer"]
 * @param {(e: any) => void} [props.onClick] - Klick på hela kortet.
 * @param {(e: any) => void} [props.onReadMore] - Klick på "Läs mer"-länken.
 * @param {string} [props.className]
 */
export function PostCard({
  image,
  imageAlt = "",
  title,
  date,
  href = "#",
  readMoreLabel = "Läs mer",
  onClick,
  onReadMore,
  className = "",
  ...rest
}) {
  return (
    <Card
      className={`fc-card--row ${className}`}
      onClick={onClick}
      {...rest}
    >
      <CardMedia aria-hidden={imageAlt ? undefined : "true"}>
        <img src={image} alt={imageAlt} />
      </CardMedia>
      <div className="fc-card__content">
        <CardTitle>{title}</CardTitle>
        <div className="fc-card__row-footer">
          <span>{date}</span>
          <a
            href={href}
            className="fc-card__read-more"
            onClick={(e) => {
              e.stopPropagation();
              onReadMore?.(e);
            }}
          >
            {readMoreLabel}
          </a>
        </div>
      </div>
    </Card>
  );
}

/**
 * getInitials – returnerar 1–2 versaler från ett namn.
 * Delas av domänkort som behöver fallback-avatar.
 */
export function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
