import { useEffect, useId, useRef, useState } from "react";
import "./index.css";

/**
 * Dropdown – meny som öppnas vid klick och stängs vid klick utanför eller Escape.
 *
 * Tillgänglighet:
 * - `aria-haspopup`, `aria-expanded` och `aria-controls` på utlösaren.
 * - `role="menu"`/`menuitem` med tangentbordsnavigering: ↑/↓, Home/End, Enter/Space, Esc, Tab.
 * - Fokus flyttas till första (eller senast aktiva) alternativet när menyn öppnas
 *   och tillbaka till utlösaren när menyn stängs.
 *
 * @param {object} props
 * @param {string} [props.label="Menu"] - Text på utlösarknappen.
 * @param {Array<{label: React.ReactNode, value?: any, disabled?: boolean}>} [props.items=[]] - Menyalternativ.
 * @param {(item: object) => void} [props.onSelect] - Anropas när ett alternativ väljs.
 * @param {"left"|"right"} [props.align="left"] - Justering av menyn relativt utlösaren.
 *
 * @example
 * <Dropdown
 *   label="Välj"
 *   items={[{ label: "Ett", value: 1 }, { label: "Två", value: 2 }]}
 *   onSelect={(item) => console.log(item.value)}
 * />
 */
export function Dropdown({
  label = "Menu",
  items = [],
  onSelect,
  align = "left",
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();

  const enabledIndexes = items
    .map((it, i) => (it.disabled ? -1 : i))
    .filter((i) => i !== -1);

  function firstEnabled() {
    return enabledIndexes[0] ?? -1;
  }
  function lastEnabled() {
    return enabledIndexes[enabledIndexes.length - 1] ?? -1;
  }
  function nextEnabled(from) {
    const after = enabledIndexes.find((i) => i > from);
    return after ?? firstEnabled();
  }
  function prevEnabled(from) {
    const before = [...enabledIndexes].reverse().find((i) => i < from);
    return before ?? lastEnabled();
  }

  function openMenu(initialIndex = firstEnabled()) {
    setOpen(true);
    setActiveIndex(initialIndex);
  }

  function closeMenu({ returnFocus = true } = {}) {
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  }

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Flytta fokus till aktivt menyobjekt när det ändras.
  useEffect(() => {
    if (open && activeIndex >= 0) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  function onTriggerKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu(firstEnabled());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(lastEnabled());
    }
  }

  function onMenuKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => nextEnabled(i));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => prevEnabled(i));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(firstEnabled());
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(lastEnabled());
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu({ returnFocus: false });
        break;
      default:
        break;
    }
  }

  return (
    <div className="fc-dropdown" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        className="fc-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? closeMenu({ returnFocus: false }) : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
        <span className={`fc-dropdown__caret ${open ? "is-open" : ""}`} aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={typeof label === "string" ? label : undefined}
          className={`fc-dropdown__menu fc-dropdown__menu--${align}`}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, i) => (
            <li key={item.value ?? i} role="none">
              <button
                ref={(el) => (itemRefs.current[i] = el)}
                role="menuitem"
                type="button"
                disabled={item.disabled}
                tabIndex={activeIndex === i ? 0 : -1}
                className="fc-dropdown__item"
                onClick={() => {
                  if (item.disabled) return;
                  onSelect?.(item);
                  closeMenu();
                }}
                onMouseEnter={() => !item.disabled && setActiveIndex(i)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
