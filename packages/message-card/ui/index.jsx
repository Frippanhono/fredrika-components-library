import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardMedia,
  CardMeta,
  getInitials,
} from "@minilogg/cards";
import "./index.css";

/**
 * Fördefinierade avsändar-/mottagarroller för `MessageCard`.
 */
export const MESSAGE_ROLE_PRESETS = {
  teacher: { label: "Pedagog", short: "P", className: "fc-card__role-badge--teacher" },
  guardian: { label: "Vårdnadshavare", short: "V", className: "fc-card__role-badge--guardian" },
  child: { label: "Barn", short: "B", className: "fc-card__role-badge--child" },
  admin: { label: "Administratör", short: "A", className: "fc-card__role-badge--admin" },
  system: { label: "System", short: "S", className: "fc-card__role-badge--system" },
};

function resolveParticipant(input) {
  if (!input) return null;
  if (typeof input === "string") return { name: input };
  if (typeof input === "object" && input.name) return input;
  return null;
}

function resolveRole(role) {
  if (!role) return null;
  if (typeof role === "string") {
    return (
      MESSAGE_ROLE_PRESETS[role] ?? {
        label: role,
        short: role.slice(0, 1).toUpperCase(),
        className: "",
      }
    );
  }
  if (typeof role === "object" && role.label) {
    return {
      short: role.short ?? String(role.label).slice(0, 1).toUpperCase(),
      className: role.className ?? "",
      ...role,
    };
  }
  return null;
}

function formatTimestamp(ts) {
  if (ts == null) return null;
  if (ts instanceof Date) {
    return ts.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return ts;
}

/**
 * MessageCard – kort för meddelanden mellan pedagog och vårdnadshavare.
 *
 * Exporteras även som `NoticeCard` när du föredrar den semantiken
 * (t.ex. för enkelriktade aviseringar/anslag).
 */
export function MessageCard({
  sender,
  recipient,
  subject,
  preview,
  children,
  timestamp,
  unread = false,
  priority = "normal",
  tone,
  attachments = 0,
  actions,
  onClick,
  selected = false,
  className = "",
  ...rest
}) {
  const senderObj = resolveParticipant(sender) ?? { name: "" };
  const recipientObj = resolveParticipant(recipient);
  const senderRole = resolveRole(senderObj.role);
  const recipientRole = resolveRole(recipientObj?.role);

  const resolvedTone =
    tone ?? (priority === "high" ? "warning" : unread ? "info" : "neutral");

  const formattedTs = formatTimestamp(timestamp);
  const body = preview ?? children;

  let avatarContent;
  if (senderObj.avatar == null) {
    avatarContent = (
      <span className="fc-card__msg-avatar-initials" aria-hidden="true">
        {getInitials(senderObj.name)}
      </span>
    );
  } else if (typeof senderObj.avatar === "string") {
    avatarContent = (
      <img
        className="fc-card__msg-avatar-img"
        src={senderObj.avatar}
        alt={senderObj.name || ""}
      />
    );
  } else {
    avatarContent = senderObj.avatar;
  }

  const classes = [
    "fc-card--message",
    unread && "fc-card--message-unread",
    priority === "high" && "fc-card--message-priority",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card
      tone={resolvedTone}
      onClick={onClick}
      selected={selected}
      className={classes}
      aria-label={
        subject
          ? `Meddelande från ${senderObj.name}: ${typeof subject === "string" ? subject : ""}`
          : undefined
      }
      {...rest}
    >
      <CardHeader>
        <CardMedia className="fc-card__msg-avatar">{avatarContent}</CardMedia>
        <div className="fc-card__msg-identity">
          <div className="fc-card__msg-senderline">
            <span className="fc-card__msg-sender">{senderObj.name}</span>
            {senderRole && (
              <span
                className={`fc-card__role-badge ${senderRole.className}`}
                aria-label={senderRole.label}
                title={senderRole.label}
              >
                {senderRole.short}
              </span>
            )}
            {unread && (
              <span
                className="fc-card__msg-unread-dot"
                aria-label="Oläst"
                title="Oläst"
              />
            )}
            {priority === "high" && (
              <span
                className="fc-card__msg-priority"
                aria-label="Hög prioritet"
                title="Hög prioritet"
              >
                Viktigt
              </span>
            )}
          </div>
          {recipientObj && (
            <div className="fc-card__msg-recipientline">
              <span className="fc-card__msg-recipient-label">Till:</span>
              <span className="fc-card__msg-recipient">{recipientObj.name}</span>
              {recipientRole && (
                <span
                  className={`fc-card__role-badge ${recipientRole.className}`}
                  aria-label={recipientRole.label}
                  title={recipientRole.label}
                >
                  {recipientRole.short}
                </span>
              )}
            </div>
          )}
        </div>
        {formattedTs && (
          <CardMeta className="fc-card__msg-time">
            <time>{formattedTs}</time>
          </CardMeta>
        )}
      </CardHeader>
      {(subject || body || attachments > 0) && (
        <CardBody className="fc-card__msg-body">
          {subject && (
            <p className="fc-card__msg-subject">{subject}</p>
          )}
          {body && <p className="fc-card__msg-preview">{body}</p>}
          {attachments > 0 && (
            <p
              className="fc-card__msg-attachments"
              aria-label={`${attachments} bilagor`}
            >
              <span aria-hidden="true">📎</span>
              <span>
                {attachments} {attachments === 1 ? "bilaga" : "bilagor"}
              </span>
            </p>
          )}
        </CardBody>
      )}
      {actions != null && <CardFooter>{actions}</CardFooter>}
    </Card>
  );
}

/**
 * NoticeCard – alias för {@link MessageCard}. Använd när det semantiska
 * sammanhanget är en avisering/anslag snarare än en konversation.
 */
export const NoticeCard = MessageCard;
