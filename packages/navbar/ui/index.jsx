import { useState } from "react";
import "./index.css";

/**
 * Navbar – responsiv toppnavigering med varumärke, länkar och åtgärder.
 *
 * På små skärmar kollapsas länkarna bakom en hamburgerknapp.
 *
 * @param {object} props
 * @param {React.ReactNode} props.brand - Logotyp eller varumärkesnamn till vänster.
 * @param {Array<{label: React.ReactNode, href?: string}>} [props.links=[]] - Navigeringslänkar.
 * @param {React.ReactNode} [props.actions] - Åtgärder till höger (t.ex. inloggningsknapp).
 * @param {string} [props.activeHref] - href som ska markeras som aktiv.
 * @param {(link: object) => void} [props.onNavigate] - Om angiven används den i stället för default-länknavigering (förhindrar omladdning).
 *
 * @example
 * <Navbar
 *   brand="Fredrika"
 *   links={[{ label: "Hem", href: "/" }, { label: "Om", href: "/about" }]}
 *   activeHref="/"
 * />
 */
export function Navbar({ brand, links = [], actions, activeHref, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fc-navbar">
      <div className="fc-navbar__inner">
        <div className="fc-navbar__brand">{brand}</div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="fc-navbar__toggle"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`fc-navbar__links ${open ? "is-open" : ""}`}>
          {links.map((link) => (
            <li key={link.href ?? link.label}>
              <a
                href={link.href ?? "#"}
                className={`fc-navbar__link ${
                  activeHref && activeHref === link.href ? "is-active" : ""
                }`}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(link);
                  }
                  setOpen(false);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {actions && <div className="fc-navbar__actions">{actions}</div>}
      </div>
    </nav>
  );
}
