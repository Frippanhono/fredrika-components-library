import { useId } from "react";
import "./index.css";

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
