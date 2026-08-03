"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * TOAST
 *
 * App-level notifications: wrap a subtree in <ToastProvider> and
 * call `toast()` from `useToast()`. Announcements land in a
 * polite live region; toasts persist 6s (long enough to read),
 * are dismissible, and never carry actions a visitor could lose —
 * anything requiring a decision belongs in a Modal.
 * ─────────────────────────────────────────────────────────────────
 */

type ToastTone = "success" | "error" | "info";

interface ToastRecord {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within <ToastProvider>");
  return context;
}

const toneStyles: Record<ToastTone, string> = {
  success: "border-success-600/30 bg-success-100 text-success-600",
  error: "border-error-600/30 bg-error-100 text-error-600",
  info: "border-info-600/30 bg-info-100 text-info-600",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, tone: ToastTone = "info") => {
      const id = ++counter.current;
      setToasts((current) => [...current, { id, tone, message }]);
      window.setTimeout(() => dismiss(id), 6000);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        role="region"
        className="pointer-events-none fixed inset-x-4 bottom-24 z-(--z-toast) flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start justify-between gap-4 rounded-field border px-4 py-3 text-sm shadow-card",
              "motion-safe:animate-fade-rise",
              toneStyles[item.tone],
            )}
          >
            <p className="leading-snug">{item.message}</p>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Dismiss notification"
              className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
