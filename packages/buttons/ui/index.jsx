import "./index.css";

/**
 * Button – standardknapp med varianter och storlekar.
 *
 * Använd `variant` för att signalera åtgärdens vikt (primary för huvudåtgärd,
 * secondary för sekundära, danger för destruktiva åtgärder).
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Knappens etikett eller innehåll.
 * @param {"primary"|"secondary"|"ghost"|"danger"} [props.variant="primary"] - Visuell stil.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Storlek på knappen.
 * @param {"button"|"submit"|"reset"} [props.type="button"] - HTML-typ för knappen.
 * @param {boolean} [props.disabled=false] - Inaktiverar knappen och förhindrar klick.
 * @param {(e: React.MouseEvent) => void} [props.onClick] - Klickhanterare.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <Button variant="primary" onClick={save}>Spara</Button>
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  const classes = ["fc-btn", `fc-btn--${variant}`, `fc-btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
