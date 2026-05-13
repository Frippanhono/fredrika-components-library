import { Card } from "@minilogg/cards";
import "./index.css";

/**
 * StatCard – kompakt nyckeltal för dashboards.
 *
 * @param {object} props
 * @param {React.ReactNode} props.label - Beskrivning av nyckeltalet.
 * @param {React.ReactNode} props.value - Värdet (siffra eller text).
 * @param {React.ReactNode} [props.delta] - Förändring/trend (t.ex. "+12%").
 * @param {"up"|"down"|"flat"} [props.trend] - Riktning på förändringen.
 * @param {React.ReactNode} [props.icon] - Ikon som visas bredvid värdet.
 * @param {"neutral"|"info"|"success"|"warning"|"danger"} [props.tone="neutral"] - Accentfärg.
 * @param {string} [props.className] - Extra CSS-klasser.
 *
 * @example
 * <StatCard label="Aktiva barn" value={128} delta="+4" trend="up" tone="success" />
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  icon,
  tone = "neutral",
  className = "",
  ...rest
}) {
  return (
    <Card tone={tone} className={`fc-card--stat ${className}`} {...rest}>
      <div className="fc-card__stat">
        <div className="fc-card__stat-head">
          <span className="fc-card__stat-label">{label}</span>
          {icon && (
            <span className="fc-card__stat-icon" aria-hidden="true">
              {icon}
            </span>
          )}
        </div>
        <span className="fc-card__stat-value">{value}</span>
        {delta != null && (
          <span
            className={[
              "fc-card__stat-delta",
              trend && `fc-card__stat-delta--${trend}`,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
