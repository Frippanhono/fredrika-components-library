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
 * @param {boolean} [props.loading=false] - Visar en spinner och inaktiverar knappen.
 * @param {string} [props.loadingLabel="Laddar"] - Tillgänglighetstext för spinner-läget.
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
  loading = false,
  loadingLabel = "Laddar",
  onClick,
  className = "",
  ...rest
}) {
  const classes = [
    "fc-btn",
    `fc-btn--${variant}`,
    `fc-btn--${size}`,
    loading && "fc-btn--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {loading && (
        <span className="fc-btn__spinner" aria-hidden="true" />
      )}
      <span className="fc-btn__label">{children}</span>
      {loading && <span className="fc-sr-only">{loadingLabel}</span>}
    </button>
  );
}
