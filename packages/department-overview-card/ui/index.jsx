import { Card } from "@minilogg/cards";
import "./index.css";

/**
 * DepartmentOverviewCard – hero/header för en avdelning i en pedagogisk
 * lärplattform. Visar avdelningens namn, antal inskrivna barn, antal
 * pedagoger samt ett aktuellt tema/pågående arbete.
 *
 * @param {object} props
 * @param {React.ReactNode} props.name - Avdelningens namn (visas som stor rubrik).
 * @param {number|string} [props.childrenCount] - Antal inskrivna barn.
 * @param {number|string} [props.teachersCount] - Antal pedagoger.
 * @param {React.ReactNode} [props.theme] - Tema eller pågående arbete.
 * @param {string} [props.themeLabel="Tema arbete"] - Etikett för temat.
 * @param {string} [props.childrenLabel] - Anpassad etikett för antal barn.
 * @param {string} [props.teachersLabel] - Anpassad etikett för antal pedagoger.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <DepartmentOverviewCard
 *   name="Snäckan"
 *   childrenCount={16}
 *   teachersCount={3}
 *   theme="Färger och former"
 * />
 */
export function DepartmentOverviewCard({
  name,
  childrenCount,
  teachersCount,
  theme,
  themeLabel = "Tema arbete",
  childrenLabel,
  teachersLabel,
  className = "",
  ...rest
}) {
  const formatChildren = (n) => {
    if (childrenLabel) return childrenLabel;
    const num = Number(n);
    return Number.isFinite(num)
      ? `${num} ${num === 1 ? "inskrivet barn" : "inskrivna barn"}`
      : `${n} inskrivna barn`;
  };

  const formatTeachers = (n) => {
    if (teachersLabel) return teachersLabel;
    const num = Number(n);
    return Number.isFinite(num)
      ? `${num} ${num === 1 ? "pedagog" : "pedagoger"}`
      : `${n} pedagoger`;
  };

  const hasChildren = childrenCount != null && childrenCount !== "";
  const hasTeachers = teachersCount != null && teachersCount !== "";
  const hasStats = hasChildren || hasTeachers;

  return (
    <Card
      as="section"
      className={`fc-card--department-overview ${className}`}
      aria-label={typeof name === "string" ? `Avdelning ${name}` : undefined}
      {...rest}
    >
      <div className="fc-card__department">
        <h1 className="fc-card__department-title">{name}</h1>

        {hasStats && (
          <p className="fc-card__department-stats">
            {hasChildren && (
              <span className="fc-card__department-stat">
                {formatChildren(childrenCount)}
              </span>
            )}
            {hasChildren && hasTeachers && (
              <span
                className="fc-card__department-separator"
                aria-hidden="true"
              >
                |
              </span>
            )}
            {hasTeachers && (
              <span className="fc-card__department-stat">
                {formatTeachers(teachersCount)}
              </span>
            )}
          </p>
        )}

        {theme && (
          <p className="fc-card__department-theme">
            <span className="fc-card__department-theme-label">
              {themeLabel}:
            </span>{" "}
            <span className="fc-card__department-theme-value">{theme}</span>
          </p>
        )}
      </div>
    </Card>
  );
}
