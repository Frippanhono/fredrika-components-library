import { useId, useRef, useState } from "react";
import "./index.css";

/**
 * Tabs – flikkomponent som växlar mellan paneler.
 *
 * Tillgänglighet:
 * - `role="tablist"`, `role="tab"` och `role="tabpanel"` med kopplade `aria-controls`/`aria-labelledby`.
 * - Roving `tabIndex`: endast aktiv flik är fokuserbar med Tab.
 * - Tangentbord i tablisten: ←/→, Home, End för att byta flik.
 *
 * @param {object} props
 * @param {Array<{label: React.ReactNode, content: React.ReactNode, icon?: React.ReactNode}>} [props.tabs=[]] - Flikar att visa.
 * @param {number} [props.defaultIndex=0] - Index på flik som visas initialt.
 * @param {(index: number) => void} [props.onChange] - Anropas när användaren byter flik.
 *
 * @example
 * <Tabs tabs={[
 *   { label: "Översikt", content: <p>...</p> },
 *   { label: "Detaljer", content: <p>...</p> },
 * ]} />
 */
export function Tabs({ tabs = [], defaultIndex = 0, onChange }) {
  const [active, setActive] = useState(defaultIndex);
  const baseId = useId();
  const tabRefs = useRef([]);

  function select(i) {
    setActive(i);
    onChange?.(i);
  }

  function focusTab(i) {
    select(i);
    tabRefs.current[i]?.focus();
  }

  function onKeyDown(e) {
    if (tabs.length === 0) return;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab((active + 1) % tabs.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab((active - 1 + tabs.length) % tabs.length);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="fc-tabs">
      <div role="tablist" className="fc-tabs__list" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => {
          const tabId = `${baseId}-tab-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          const selected = active === i;
          return (
            <button
              key={tab.label ?? i}
              id={tabId}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`fc-tabs__tab ${selected ? "is-active" : ""}`}
              onClick={() => select(i)}
            >
              {tab.icon != null && (
                <span className="fc-tabs__icon" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span className="fc-tabs__label">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => {
        const tabId = `${baseId}-tab-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        const selected = active === i;
        return (
          <div
            key={tab.label ?? i}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            tabIndex={0}
            className="fc-tabs__panel"
          >
            {selected ? tab.content : null}
          </div>
        );
      })}
    </div>
  );
}
