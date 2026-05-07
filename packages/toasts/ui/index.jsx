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
        <div className={`fc-toast__container fc-toast__container--${position}`}>
          {toasts.map((t) => (
            <div
              key={t.id}
              role="status"
              className={`fc-toast fc-toast--${t.variant}`}
              onClick={() => remove(t.id)}
            >
              {t.message}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
