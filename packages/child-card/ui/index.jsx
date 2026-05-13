import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardMedia,
  getInitials,
} from "@minilogg/cards";
import "./index.css";

/**
 * Fördefinierade närvarostatusar för `ChildCard`.
 * Mappar en kort nyckel till en svensk etikett och en visuell ton.
 */
export const CHILD_STATUS_PRESETS = {
  present: { label: "På plats", tone: "success" },
  absent: { label: "Frånvarande", tone: "danger" },
  sick: { label: "Sjukanmäld", tone: "warning" },
  leave: { label: "Ledig", tone: "info" },
  arriving: { label: "På väg", tone: "info" },
  pickedup: { label: "Hämtad", tone: "neutral" },
};

function resolveStatus(status) {
  if (!status) return null;
  if (typeof status === "string") {
    return CHILD_STATUS_PRESETS[status] ?? { label: status, tone: "neutral" };
  }
  if (typeof status === "object" && status.label) {
    return { tone: "neutral", ...status };
  }
  return null;
}

/**
 * ChildCard – pedagogiskt kort för att presentera ett barn i förskole-UI.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {React.ReactNode} [props.department]
 * @param {keyof typeof CHILD_STATUS_PRESETS | {label: React.ReactNode, tone?: string}} [props.status]
 * @param {React.ReactNode | string} [props.avatar]
 * @param {string} [props.avatarAlt]
 * @param {Array<string | {name: string}>} [props.guardians]
 * @param {React.ReactNode} [props.children]
 * @param {React.ReactNode} [props.footer]
 * @param {(e: any) => void} [props.onClick]
 * @param {boolean} [props.selected=false]
 * @param {string} [props.className]
 */
export function ChildCard({
  name,
  department,
  status,
  avatar,
  avatarAlt,
  guardians,
  children,
  footer,
  onClick,
  selected = false,
  className = "",
  ...rest
}) {
  const resolvedStatus = resolveStatus(status);
  const guardianList = (guardians ?? [])
    .map((g) => (typeof g === "string" ? { name: g } : g))
    .filter((g) => g && g.name);

  let avatarContent;
  if (avatar == null) {
    avatarContent = (
      <span className="fc-card__child-avatar-initials" aria-hidden="true">
        {getInitials(name)}
      </span>
    );
  } else if (typeof avatar === "string") {
    avatarContent = (
      <img
        className="fc-card__child-avatar-img"
        src={avatar}
        alt={avatarAlt ?? name ?? ""}
      />
    );
  } else {
    avatarContent = avatar;
  }

  return (
    <Card
      onClick={onClick}
      selected={selected}
      className={`fc-card--child ${className}`}
      {...rest}
    >
      <CardHeader>
        <CardMedia className="fc-card__child-avatar">{avatarContent}</CardMedia>
        <div className="fc-card__child-identity">
          {guardianList.length > 0 && (
            <ul
              className="fc-card__child-guardians"
              aria-label="Vårdnadshavare"
            >
              {guardianList.map((g, i) => (
                <li key={`${g.name}-${i}`} className="fc-card__child-guardian">
                  <span className="fc-card__child-guardian-name">{g.name}</span>
                  <span
                    className="fc-card__role-badge fc-card__role-badge--guardian"
                    aria-label="Vårdnadshavare"
                    title="Vårdnadshavare"
                  >
                    V
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="fc-card__child-nameline">
            <CardTitle className="fc-card__child-name">{name}</CardTitle>
            <span
              className="fc-card__role-badge fc-card__role-badge--child"
              aria-label="Barn"
              title="Barn"
            >
              B
            </span>
          </div>
          {department && <CardSubtitle>{department}</CardSubtitle>}
        </div>
        {resolvedStatus && (
          <span
            className={`fc-card__child-status fc-card__child-status--${resolvedStatus.tone}`}
          >
            <span
              className="fc-card__child-status-dot"
              aria-hidden="true"
            />
            {resolvedStatus.label}
          </span>
        )}
      </CardHeader>
      {children != null && <CardBody>{children}</CardBody>}
      {footer != null && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
