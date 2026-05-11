import "./index.css";

/**
 * Badge – liten etikett för att visa status, kategori eller räknare.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Innehåll som visas i etiketten (text, ikon eller siffra).
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.variant="neutral"] - Färgvariant som signalerar betydelse.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Storlek på etiketten.
 * @param {string} [props.className] - Extra CSS-klasser för anpassning.
 *
 * @example
 * <Badge variant="success">Aktiv</Badge>
 */
export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  ...rest
}) {
  return (
    <span
      className={`fc-badge fc-badge--${variant} fc-badge--${size} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
