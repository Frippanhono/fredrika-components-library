import { useId } from "react";
import "./index.css";

/**
 * Input – textfält med inbyggd etikett, hjälptext och felmeddelande.
 *
 * Kopplar label/input via genererat id och sätter `aria-invalid` samt
 * `aria-describedby` automatiskt för tillgänglighet.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label] - Etikett som visas ovanför fältet.
 * @param {React.ReactNode} [props.hint] - Hjälptext under fältet (göms när fel visas).
 * @param {React.ReactNode} [props.error] - Felmeddelande; markerar fältet som ogiltigt.
 * @param {string} [props.type="text"] - HTML input-typ (text, email, password, m.fl.).
 * @param {string} [props.id] - Valfritt id; annars genereras ett unikt.
 * @param {string} [props.className] - Extra CSS-klasser på wrappern.
 *
 * Övriga props vidarebefordras till `<input>` (t.ex. value, onChange, placeholder).
 *
 * @example
 * <Input label="E-post" type="email" hint="Vi delar aldrig din adress" />
 */
export function Input({
  label,
  hint,
  error,
  type = "text",
  className = "",
  id,
  ...rest
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-err`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className={`fc-field ${error ? "has-error" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="fc-field__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className="fc-field__input"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {error ? (
        <span id={`${inputId}-err`} className="fc-field__error">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="fc-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Textarea – flerradigt textfält med samma etikett/hint/error-mönster som `Input`.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label] - Etikett.
 * @param {React.ReactNode} [props.hint] - Hjälptext.
 * @param {React.ReactNode} [props.error] - Felmeddelande.
 * @param {number} [props.rows=4] - Antal synliga textrader.
 * @param {string} [props.id] - Valfritt id; annars genereras ett unikt.
 * @param {string} [props.className] - Extra CSS-klasser på wrappern.
 *
 * @example
 * <Textarea label="Beskrivning" rows={6} />
 */
export function Textarea({
  label,
  hint,
  error,
  rows = 4,
  className = "",
  id,
  ...rest
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-err`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className={`fc-field ${error ? "has-error" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="fc-field__label">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className="fc-field__input fc-field__input--textarea"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {error ? (
        <span id={`${inputId}-err`} className="fc-field__error">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="fc-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
