import { useId, useRef, useState } from "react";
import "./index.css";

const DEFAULT_OPTIONS = [
  { value: "bra", label: "Bra", icon: "🟢", tone: "good" },
  { value: "okej", label: "Okej", icon: "🟡", tone: "ok" },
  { value: "inte-bra", label: "Inte bra", icon: "🔴", tone: "bad" },
];

/**
 * MealStatusSelector – horisontell väljare med tre rundade knappar för
 * att rapportera hur en måltid gick: Bra, Okej eller Inte bra.
 *
 * Tillgänglighet:
 * - `role="radiogroup"` med `aria-label` eller `aria-labelledby`.
 * - Varje knapp har `role="radio"` och `aria-checked`.
 * - Tangentbord: ←/→ och ↑/↓ flyttar valet, Home/End hoppar till första/sista.
 * - Färg är inte enda signalen – ikon + text + tydlig vald-state används.
 *
 * @param {object} props
 * @param {string} [props.value] - Kontrollerat värde ("bra" | "okej" | "inte-bra").
 * @param {string} [props.defaultValue] - Initialt värde i okontrollerat läge.
 * @param {(value: string) => void} [props.onChange] - Anropas när valet ändras.
 * @param {string} [props.label="Hur gick måltiden?"] - Synlig etikett för gruppen.
 * @param {boolean} [props.hideLabel=false] - Dölj etiketten visuellt (kvar för skärmläsare).
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Storlek på knapparna.
 * @param {boolean} [props.disabled=false] - Inaktivera hela kontrollen.
 * @param {Array<{value:string,label:string,icon?:React.ReactNode,tone?:"good"|"ok"|"bad"}>} [props.options]
 *   - Anpassa val. Standard är Bra / Okej / Inte bra.
 * @param {string} [props.name] - Namn (om komponenten används i ett formulär).
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <MealStatusSelector defaultValue="bra" onChange={(v) => console.log(v)} />
 */
export function MealStatusSelector({
  value,
  defaultValue,
  onChange,
  label = "Hur gick måltiden?",
  hideLabel = false,
  size = "md",
  disabled = false,
  options = DEFAULT_OPTIONS,
  name,
  className = "",
  ...rest
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const btnRefs = useRef([]);

  function select(next) {
    if (disabled) return;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function focusIndex(i) {
    const el = btnRefs.current[i];
    if (el) {
      el.focus();
      select(options[i].value);
    }
  }

  function onKeyDown(e, i) {
    if (disabled) return;
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusIndex(i === last ? 0 : i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusIndex(i === 0 ? last : i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(last);
        break;
      default:
        break;
    }
  }

  const selectedIndex = options.findIndex((o) => o.value === current);

  return (
    <div
      className={`fc-meal-status fc-meal-status--${size} ${
        disabled ? "is-disabled" : ""
      } ${className}`}
      {...rest}
    >
      <span
        id={labelId}
        className={`fc-meal-status__label ${
          hideLabel ? "fc-meal-status__label--sr" : ""
        }`}
      >
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="fc-meal-status__group"
      >
        {options.map((opt, i) => {
          const selected = opt.value === current;
          const isFocusable =
            selectedIndex === -1 ? i === 0 : selected;
          return (
            <button
              key={opt.value}
              ref={(el) => (btnRefs.current[i] = el)}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={isFocusable ? 0 : -1}
              disabled={disabled}
              data-tone={opt.tone}
              data-name={name}
              className={`fc-meal-status__option ${
                selected ? "is-selected" : ""
              }`}
              onClick={() => select(opt.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="fc-meal-status__icon" aria-hidden="true">
                {opt.icon}
              </span>
              <span className="fc-meal-status__text">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
