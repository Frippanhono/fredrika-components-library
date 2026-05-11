import { useState } from "react";
import "./index.css";

/**
 * Tabs – flikkomponent som växlar mellan paneler.
 *
 * Använder `role="tablist"`, `role="tab"` och `aria-selected` för tillgänglighet.
 * Komponenten håller själv reda på aktiv flik; använd `onChange` för att reagera externt.
 *
 * @param {object} props
 * @param {Array<{label: React.ReactNode, content: React.ReactNode}>} [props.tabs=[]] - Flikar att visa.
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

  function select(i) {
    setActive(i);
    onChange?.(i);
  }

  return (
    <div className="fc-tabs">
      <div role="tablist" className="fc-tabs__list">
        {tabs.map((tab, i) => (
          <button
            key={tab.label ?? i}
            role="tab"
            type="button"
            aria-selected={active === i}
            className={`fc-tabs__tab ${active === i ? "is-active" : ""}`}
            onClick={() => select(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="fc-tabs__panel">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
