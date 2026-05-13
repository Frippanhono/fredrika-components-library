import "./index.css";

/**
 * Navbar – responsiv navigering med ikon-baserade flikar.
 *
 * Visuellt fungerar komponenten som en flik-rad ("tab bar") med ikon ovanför
 * etikett. På mobila skärmar är raden fast förankrad längst ner i vyn så att
 * den alltid är inom tummens räckhåll. På större skärmar ersätter samma rad
 * den klassiska toppnavigeringen och sitter sticky i toppen av sidan.
 *
 * En länk kan markeras som `featured` för att framhävas i mitten av raden,
 * vilket är användbart för t.ex. ett barns avatar i en förskoleapp.
 *
 * Tillgänglighet:
 * - `<nav aria-label="Huvudnavigering">` ger landmark-kontext.
 * - Aktiv länk markeras med `aria-current="page"`.
 * - Ikoner döljs för skärmläsare (`aria-hidden`); etiketten används som
 *   tillgänglig text.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.brand] - Logotyp eller varumärkesnamn (visas endast i desktopvy).
 * @param {Array<{
 *   label: React.ReactNode,
 *   href?: string,
 *   icon?: React.ReactNode,
 *   avatar?: string,
 *   featured?: boolean,
 * }>} [props.links=[]] - Navigeringslänkar.
 * @param {React.ReactNode} [props.actions] - Åtgärder till höger i desktopvy.
 * @param {string} [props.activeHref] - href som ska markeras som aktiv.
 * @param {(link: object) => void} [props.onNavigate] - Anropas vid klick i stället för default-navigering.
 * @param {string} [props.ariaLabel="Huvudnavigering"] - Tillgänglig etikett för landmarken.
 *
 * @example
 * <Navbar
 *   activeHref="/clara"
 *   links={[
 *     { label: "Anmäla frånvaro", href: "/absence", icon: <PhoneIcon /> },
 *     { label: "Checka in/ut", href: "/checkin", icon: <CheckIcon /> },
 *     { label: "Clara", href: "/clara", avatar: "/clara.jpg", featured: true },
 *     { label: "Kontaktlista", href: "/contacts", icon: <ContactsIcon /> },
 *     { label: "Mer", href: "/more", icon: <MoreIcon /> },
 *   ]}
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
  return (
    <nav className="fc-navbar" aria-label={ariaLabel}>
      <div className="fc-navbar__inner">
        {brand && <div className="fc-navbar__brand">{brand}</div>}

        <ul className="fc-navbar__items">
          {links.map((link) => {
            const isActive = activeHref && activeHref === link.href;
            const isFeatured = Boolean(link.featured);
            return (
              <li
                key={link.href ?? String(link.label)}
                className={[
                  "fc-navbar__item",
                  isFeatured ? "is-featured" : "",
                  isActive ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <a
                  href={link.href ?? "#"}
                  aria-current={isActive ? "page" : undefined}
                  className="fc-navbar__link"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(link);
                    }
                  }}
                >
                  {link.avatar ? (
                    <span className="fc-navbar__avatar" aria-hidden="true">
                      <img src={link.avatar} alt="" />
                    </span>
                  ) : link.icon ? (
                    <span className="fc-navbar__icon" aria-hidden="true">
                      {link.icon}
                    </span>
                  ) : null}
                  <span className="fc-navbar__label">{link.label}</span>
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
