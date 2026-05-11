import { useId, useState } from "react";
import "./index.css";

/**
 * Navbar – responsiv toppnavigering med varumärke, länkar och åtgärder.
 *
 * På små skärmar kollapsas länkarna bakom en hamburgerknapp. Tillgänglighet:
 * - `<nav aria-label="Huvudnavigering">` ger landmark-kontext.
 * - Toggle-knappen exponerar `aria-expanded` och `aria-controls`.
 * - Aktiv länk markeras med `aria-current="page"`.
 *
 * @param {object} props
 * @param {React.ReactNode} props.brand - Logotyp eller varumärkesnamn till vänster.
 * @param {Array<{label: React.ReactNode, href?: string}>} [props.links=[]] - Navigeringslänkar.
 * @param {React.ReactNode} [props.actions] - Åtgärder till höger (t.ex. inloggningsknapp).
 * @param {string} [props.activeHref] - href som ska markeras som aktiv.
 * @param {(link: object) => void} [props.onNavigate] - Om angiven används den i stället för default-länknavigering (förhindrar omladdning).
 * @param {string} [props.ariaLabel="Huvudnavigering"] - Tillgänglig etikett för landmarken.
 *
 * @example
 * <Navbar
 *   brand="Fredrika"
 *   links={[{ label: "Hem", href: "/" }, { label: "Om", href: "/about" }]}
 *   activeHref="/"
 * />
 */
export function Navbar({
  brand,
  links = [],
  actions,
  activeHref,
  onNavigate,
  ariaLabel = "Huvudnavigering",
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <nav className="fc-navbar" aria-label={ariaLabel}>
      <div className="fc-navbar__inner">
        <div className="fc-navbar__brand">{brand}</div>

        <button
          type="button"
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
          aria-controls={menuId}
          className="fc-navbar__toggle"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <ul
          id={menuId}
          className={`fc-navbar__links ${open ? "is-open" : ""}`}
        >
          {links.map((link) => {
            const isActive = activeHref && activeHref === link.href;
            return (
              <li key={link.href ?? link.label}>
                <a
                  href={link.href ?? "#"}
                  aria-current={isActive ? "page" : undefined}
                  className={`fc-navbar__link ${isActive ? "is-active" : ""}`}
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
            );
          })}
        </ul>

        {actions && <div className="fc-navbar__actions">{actions}</div>}
      </div>
    </nav>
  );
}
