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
 * Fördefinierade titlar (yrkesroller) för `TeacherCard`.
 * Värdet är en kort visuell ton som används för titel-etiketten.
 */
export const TEACHER_TITLE_PRESETS = {
  forskollarare: { label: "Förskollärare", tone: "primary" },
  barnskotare: { label: "Barnskötare", tone: "neutral" },
  specialpedagog: { label: "Specialpedagog", tone: "info" },
  vikarie: { label: "Vikarie", tone: "warning" },
  rektor: { label: "Rektor", tone: "primary" },
  kock: { label: "Kock", tone: "neutral" },
};

function resolveTitle(title) {
  if (!title) return null;
  if (typeof title === "string") {
    const preset = TEACHER_TITLE_PRESETS[title];
    if (preset) return preset;
    return { label: title, tone: "neutral" };
  }
  if (typeof title === "object" && title.label) {
    return { tone: "neutral", ...title };
  }
  return null;
}

/**
 * TeacherCard – kort för att presentera en pedagog/personal på en avdelning.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {keyof typeof TEACHER_TITLE_PRESETS | string | {label: React.ReactNode, tone?: string}} [props.title]
 * @param {React.ReactNode} [props.department]
 * @param {React.ReactNode | string} [props.avatar]
 * @param {string} [props.avatarAlt]
 * @param {React.ReactNode} [props.children]
 * @param {React.ReactNode} [props.footer]
 * @param {(e: any) => void} [props.onClick]
 * @param {boolean} [props.selected=false]
 * @param {string} [props.className]
 */
export function TeacherCard({
  name,
  title,
  department,
  avatar,
  avatarAlt,
  children,
  footer,
  onClick,
  selected = false,
  className = "",
  ...rest
}) {
  const resolvedTitle = resolveTitle(title);

  let avatarContent;
  if (avatar == null) {
    avatarContent = (
      <span className="fc-card__teacher-avatar-initials" aria-hidden="true">
        {getInitials(name)}
      </span>
    );
  } else if (typeof avatar === "string") {
    avatarContent = (
      <img
        className="fc-card__teacher-avatar-img"
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
      className={`fc-card--teacher ${className}`}
      {...rest}
    >
      <CardHeader>
        <CardMedia className="fc-card__teacher-avatar">
          {avatarContent}
        </CardMedia>
        <div className="fc-card__teacher-identity">
          {resolvedTitle && (
            <CardSubtitle
              className={`fc-card__teacher-title fc-card__teacher-title--${resolvedTitle.tone}`}
            >
              {resolvedTitle.label}
            </CardSubtitle>
          )}
          <div className="fc-card__teacher-nameline">
            <CardTitle className="fc-card__teacher-name">{name}</CardTitle>
            <span
              className="fc-card__role-badge fc-card__role-badge--teacher"
              aria-label="Pedagog"
              title="Pedagog"
            >
              P
            </span>
          </div>
          {department && (
            <span className="fc-card__teacher-department">{department}</span>
          )}
        </div>
      </CardHeader>
      {children != null && <CardBody>{children}</CardBody>}
      {footer != null && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
