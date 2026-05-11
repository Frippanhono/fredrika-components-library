import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./index.css";

const ToastContext = createContext(null);

let idCounter = 0;

/**
 * ToastProvider – tillhandahåller toast-API:t via React context.
 *
 * Wrappa applikationen (eller en del av den) i denna provider. Komponenter under
 * kan sedan anropa `useToast()` för att visa notifieringar. Toasts renderas via
 * portal till `document.body` och försvinner automatiskt efter `duration` ms.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Applikationsträdet.
 * @param {"top-right"|"top-left"|"bottom-right"|"bottom-left"} [props.position="top-right"] - Position på skärmen.
 *
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export function ToastProvider({ children, position = "top-right" }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const handle = timers.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (message, options = {}) => {
      const id = ++idCounter;
      const toast = {
        id,
        message,
        variant: options.variant ?? "info",
        duration: options.duration ?? 3500,
      };
      setToasts((list) => [...list, toast]);
      if (toast.duration > 0) {
        const handle = setTimeout(() => remove(id), toast.duration);
        timers.current.set(id, handle);
      }
      return id;
    },
    [remove],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((h) => clearTimeout(h));
      map.clear();
    };
  }, []);

  const api = useMemo(
    () => ({
      show,
      success: (m, o) => show(m, { ...o, variant: "success" }),
      error: (m, o) => show(m, { ...o, variant: "error" }),
      info: (m, o) => show(m, { ...o, variant: "info" }),
      warning: (m, o) => show(m, { ...o, variant: "warning" }),
      dismiss: remove,
    }),
    [show, remove],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div
          className={`fc-toast__container fc-toast__container--${position}`}
          role="region"
          aria-label="Notifieringar"
        >
          {toasts.map((t) => {
            const assertive = t.variant === "error" || t.variant === "warning";
            return (
              <div
                key={t.id}
                role={assertive ? "alert" : "status"}
                aria-live={assertive ? "assertive" : "polite"}
                aria-atomic="true"
                className={`fc-toast fc-toast--${t.variant}`}
              >
                <div className="fc-toast__message">{t.message}</div>
                <button
                  type="button"
                  className="fc-toast__close"
                  aria-label="Stäng notifiering"
                  onClick={() => remove(t.id)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

/**
 * useToast – hook som returnerar API:t för att visa och stänga toasts.
 *
 * Måste användas inuti `<ToastProvider>`, annars kastas ett fel.
 *
 * Returvärde:
 * - `show(message, options?)` – visa en toast. `options`: `{ variant, duration }`. Returnerar id.
 * - `success(message, options?)` – genväg för variant `success`.
 * - `error(message, options?)` – genväg för variant `error`.
 * - `info(message, options?)` – genväg för variant `info`.
 * - `warning(message, options?)` – genväg för variant `warning`.
 * - `dismiss(id)` – stäng en specifik toast i förtid.
 *
 * `duration` anges i millisekunder; sätt `0` för att toasten ska stå kvar tills den stängs manuellt.
 *
 * @example
 * const toast = useToast();
 * toast.success("Sparat!");
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
