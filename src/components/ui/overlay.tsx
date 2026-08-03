"use client";

import { useCallback, useEffect, useRef } from "react";
import { IconButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * MODAL · DRAWER
 *
 * Both are built on the native <dialog> element, which provides
 * focus trapping, Escape dismissal, top-layer stacking, and inert
 * backgrounds for free — less JavaScript, better accessibility
 * than a re-implementation. Backdrop click closes; focus returns
 * to the trigger automatically per the platform contract.
 *
 * Modal: centered card for confirmations and focused tasks.
 * Drawer: edge panel ("right" default) for filters and detail
 * views; used by the future portal and gallery filtering.
 * ─────────────────────────────────────────────────────────────────
 */

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  /** Accessible dialog title, rendered as the heading. */
  title: string;
  /** Visually hide the title while keeping it for screen readers. */
  hideTitle?: boolean;
  children: React.ReactNode;
  className?: string;
}

function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Native `cancel` fires on Escape; sync it back to React state.
  const onCancel = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      onClose();
    },
    [onClose],
  );

  // Close when the backdrop (the dialog element itself) is clicked.
  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === ref.current) onClose();
    },
    [onClose],
  );

  return { ref, onCancel, onBackdropClick };
}

export function Modal({
  open,
  onClose,
  title,
  hideTitle = false,
  children,
  className,
}: OverlayProps) {
  const { ref, onCancel, onBackdropClick } = useDialog(open, onClose);

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      onClick={onBackdropClick}
      aria-labelledby="modal-title"
      className={cn(
        "m-auto w-[min(92vw,34rem)] rounded-card bg-cream-50 p-0 text-ink-900",
        "shadow-overlay backdrop:bg-ink-950/50 backdrop:backdrop-blur-[2px]",
        "motion-safe:open:animate-fade-rise",
        className,
      )}
    >
      <div className="p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="modal-title"
            className={cn("font-display text-display-sm", hideTitle && "sr-only")}
          >
            {title}
          </h2>
          <IconButton label="Close dialog" onClick={onClose} className="-mt-2 -mr-2">
            <CloseIcon />
          </IconButton>
        </div>
        <div className={cn(!hideTitle && "mt-4")}>{children}</div>
      </div>
    </dialog>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  hideTitle = false,
  side = "right",
  children,
  className,
}: OverlayProps & { side?: "left" | "right" }) {
  const { ref, onCancel, onBackdropClick } = useDialog(open, onClose);

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      onClick={onBackdropClick}
      aria-labelledby="drawer-title"
      className={cn(
        "fixed inset-y-0 my-0 h-svh max-h-none w-[min(90vw,26rem)] bg-cream-50 p-0 text-ink-900",
        "shadow-overlay backdrop:bg-ink-950/50 backdrop:backdrop-blur-[2px]",
        side === "right" ? "ml-auto mr-0" : "mr-auto ml-0",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-tan-200 px-6 py-5">
          <h2
            id="drawer-title"
            className={cn("font-display text-display-sm", hideTitle && "sr-only")}
          >
            {title}
          </h2>
          <IconButton label="Close panel" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </dialog>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
