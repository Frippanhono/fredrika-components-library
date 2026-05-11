import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import "./index.css";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=\"hidden\"])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[contenteditable=\"true\"]",
  "[tabindex]:not([tabindex=\"-1\"])",
].join(",");

/**
 * Modal – tillgänglig dialogruta som renderas via portal.
 *
 * Beteenden:
 * - Stänger vid klick på bakgrunden eller `Escape`.
 * - Låser scrollning på `document.body` medan dialogen är öppen.
 * - Sätter `role="dialog"`, `aria-modal="true"` och kopplar `aria-labelledby` till titeln.
 * - Flyttar fokus in i dialogen vid öppning, fångar Tab-fokus inuti och återställer
 *   fokus till föregående element vid stängning.
 *
 * @param {object} props
 * @param {boolean} props.open - Styr om dialogen visas. När `false` renderas inget.
 * @param {() => void} props.onClose - Anropas när användaren stänger dialogen.
 * @param {React.ReactNode} [props.title] - Rubrik; visas i headern och kopplas via aria-labelledby.
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
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;

    function getFocusable() {
      if (!dialogRef.current) return [];
      return Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
    }

    function handleKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) {
          e.preventDefault();
          dialogRef.current?.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Sätt initialt fokus inuti dialogen.
    const focusable = getFocusable();
    (focusable[0] ?? dialogRef.current)?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
      // Återställ fokus till det element som hade fokus innan dialogen öppnades.
      const toRestore = previouslyFocused.current;
      if (toRestore && typeof toRestore.focus === "function") {
        toRestore.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fc-modal__backdrop" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? "Dialog" : undefined}
        tabIndex={-1}
        className={`fc-modal fc-modal--${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="fc-modal__header">
            <h3 id={titleId} className="fc-modal__title">{title}</h3>
            <button
              type="button"
              aria-label="Stäng dialog"
              className="fc-modal__close"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
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
