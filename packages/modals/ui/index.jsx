import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./index.css";

/**
 * Modal – tillgänglig dialogruta som renderas via portal.
 *
 * Beteenden:
 * - Stänger vid klick på bakgrunden eller `Escape`.
 * - Låser scrollning på `document.body` medan dialogen är öppen.
 * - Sätter `role="dialog"` och `aria-modal="true"`.
 *
 * @param {object} props
 * @param {boolean} props.open - Styr om dialogen visas. När `false` renderas inget.
 * @param {() => void} props.onClose - Anropas när användaren stänger dialogen.
 * @param {React.ReactNode} [props.title] - Rubrik; visas i headern och används som aria-label.
 * @param {React.ReactNode} props.children - Dialogens brödinnehåll.
 * @param {React.ReactNode} [props.footer] - Innehåll i footern, t.ex. knappar.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Bredd på dialogen.
 *
 * @example
 * <Modal open={open} onClose={() => setOpen(false)} title="Bekräfta">
 *   Är du säker?
 * </Modal>
 */
export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fc-modal__backdrop" onClick={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={`fc-modal fc-modal--${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="fc-modal__header">
            <h3 className="fc-modal__title">{title}</h3>
            <button
              type="button"
              aria-label="Close"
              className="fc-modal__close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="fc-modal__body">{children}</div>
        {footer && <div className="fc-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
