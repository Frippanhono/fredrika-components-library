import { useEffect, useRef, useState } from "react";
import "./index.css";

export function Dropdown({
  label = "Menu",
  items = [],
  onSelect,
  align = "left",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="fc-dropdown" ref={ref}>
      <button
        type="button"
        className="fc-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <span className={`fc-dropdown__caret ${open ? "is-open" : ""}`}>▾</span>
      </button>
      {open && (
        <ul
          role="menu"
          className={`fc-dropdown__menu fc-dropdown__menu--${align}`}
        >
          {items.map((item, i) => (
            <li key={item.value ?? i} role="none">
              <button
                role="menuitem"
                type="button"
                disabled={item.disabled}
                className="fc-dropdown__item"
                onClick={() => {
                  if (item.disabled) return;
                  onSelect?.(item);
                  setOpen(false);
                }}
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
