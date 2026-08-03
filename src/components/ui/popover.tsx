"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Click-triggered disclosure panel for richer content than a
 * tooltip (share menus, mini-forms). Closes on Escape (focus
 * returns to the trigger) and on outside click. The trigger is a
 * render-prop so any button style can open it.
 */
export function Popover({
  trigger,
  children,
  align = "start",
  className,
}: {
  trigger: (props: {
    "aria-expanded": boolean;
    "aria-controls": string;
    onClick: () => void;
  }) => React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector<HTMLElement>("[aria-expanded]")?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-flex">
      {trigger({
        "aria-expanded": open,
        "aria-controls": id,
        onClick: () => setOpen((value) => !value),
      })}
      <div
        id={id}
        hidden={!open}
        className={cn(
          "absolute top-full z-(--z-tooltip) mt-2 min-w-56 rounded-card bg-cream-50 p-4 shadow-overlay",
          align === "start" ? "left-0" : "right-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
