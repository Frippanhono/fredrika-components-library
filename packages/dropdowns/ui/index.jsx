import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import "./index.css";

/**
 * Dropdown – meny som öppnas vid klick och stängs vid klick utanför eller Escape.
 *
 * State management:
 * - Okontrollerat läge: komponenten håller själv reda på om menyn är öppen.
 * - Kontrollerat läge: skicka in `open` + `onOpenChange` för att styra utifrån.
 * - `defaultOpen` används endast i okontrollerat läge.
 *
 * Tillgänglighet & tangentbord:
 * - `aria-haspopup`, `aria-expanded` och `aria-controls` på utlösaren.
 * - `role="menu"`/`menuitem` med tangentbordsnavigering: ↑/↓, Home/End,
 *   Enter/Space, Esc, Tab samt typeahead (skriv första bokstaven för att hoppa).
 * - Fokus flyttas till första (eller senast aktiva) alternativet när menyn öppnas
 *   och tillbaka till utlösaren när menyn stängs.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label="Menu"] - Innehåll på utlösarknappen.
 * @param {Array<{label: React.ReactNode, value?: any, disabled?: boolean}>} [props.items=[]] - Menyalternativ.
 * @param {(item: object) => void} [props.onSelect] - Anropas när ett alternativ väljs.
 * @param {"left"|"right"} [props.align="left"] - Justering av menyn relativt utlösaren.
 * @param {boolean} [props.disabled=false] - Inaktiverar utlösaren.
 * @param {boolean} [props.open] - Kontrollerat öppet-läge.
 * @param {boolean} [props.defaultOpen=false] - Startvärde i okontrollerat läge.
 * @param {(open: boolean) => void} [props.onOpenChange] - Anropas vid öppna/stänga.
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
  disabled = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}) {
  const isControlled = openProp !== undefined;
  const [openState, setOpenState] = useState(defaultOpen);
  const open = isControlled ? openProp : openState;

  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const typeaheadRef = useRef({ query: "", timer: 0 });
  const menuId = useId();

  const enabledIndexes = useMemo(
    () => items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i !== -1),
    [items],
  );

  const firstEnabled = useCallback(
    () => enabledIndexes[0] ?? -1,
    [enabledIndexes],
  );
  const lastEnabled = useCallback(
    () => enabledIndexes[enabledIndexes.length - 1] ?? -1,
    [enabledIndexes],
  );
  const nextEnabled = useCallback(
    (from) => enabledIndexes.find((i) => i > from) ?? firstEnabled(),
    [enabledIndexes, firstEnabled],
  );
  const prevEnabled = useCallback(
    (from) =>
      [...enabledIndexes].reverse().find((i) => i < from) ?? lastEnabled(),
    [enabledIndexes, lastEnabled],
  );

  const setOpen = useCallback(
    (next) => {
      if (!isControlled) setOpenState(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const openMenu = useCallback(
    (initialIndex) => {
      if (disabled) return;
      setOpen(true);
      setActiveIndex(initialIndex ?? firstEnabled());
    },
    [disabled, firstEnabled, setOpen],
  );

  const closeMenu = useCallback(
    ({ returnFocus = true } = {}) => {
      setOpen(false);
      setActiveIndex(-1);
      if (returnFocus) triggerRef.current?.focus();
    },
    [setOpen],
  );

  // Stäng vid pointer-tryck utanför (mus + touch).
  useEffect(() => {
    if (!open) return;
    function handlePointer(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [open, setOpen]);

  // Flytta fokus till aktivt menyobjekt när det ändras.
  useEffect(() => {
    if (open && activeIndex >= 0) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  // Rensa eventuell pågående typeahead-buffer när menyn stängs.
  useEffect(() => {
    if (!open) {
      window.clearTimeout(typeaheadRef.current.timer);
      typeaheadRef.current = { query: "", timer: 0 };
    }
  }, [open]);

  function onTriggerKeyDown(e) {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu(firstEnabled());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(lastEnabled());
    }
  }

  function handleTypeahead(key) {
    const buffer = typeaheadRef.current;
    window.clearTimeout(buffer.timer);
    buffer.query = (buffer.query + key).toLowerCase();
    buffer.timer = window.setTimeout(() => {
      typeaheadRef.current = { query: "", timer: 0 };
    }, 500);

    const startFrom = activeIndex >= 0 ? activeIndex : -1;
    const order = [
      ...enabledIndexes.filter((i) => i > startFrom),
      ...enabledIndexes.filter((i) => i <= startFrom),
    ];
    const match = order.find((i) => {
      const itemLabel = items[i]?.label;
      const text = typeof itemLabel === "string" ? itemLabel.toLowerCase() : "";
      return text.startsWith(buffer.query);
    });
    if (match !== undefined) setActiveIndex(match);
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
        if (
          e.key.length === 1 &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          /\S/.test(e.key)
        ) {
          handleTypeahead(e.key);
        }
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
        disabled={disabled}
        onClick={() =>
          open ? closeMenu({ returnFocus: false }) : openMenu()
        }
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
                data-active={activeIndex === i ? "true" : undefined}
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
