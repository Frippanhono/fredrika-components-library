import { useState } from "react";
import "./index.css";

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
