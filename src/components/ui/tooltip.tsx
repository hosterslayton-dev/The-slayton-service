"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight tooltip for supplemental hints only — never the sole
 * carrier of essential information. Shows on hover AND focus,
 * links via aria-describedby, and stays CSS-driven so it works
 * without pointer events. Touch users receive the description via
 * assistive tech; essential content belongs in visible text.
 */
export function Tooltip({
  label,
  side = "top",
  children,
  className,
}: {
  label: string;
  side?: "top" | "bottom";
  children: React.ReactElement;
  className?: string;
}) {
  const id = useId();
  return (
    <span className={cn("group/tip relative inline-flex", className)}>
      <span aria-describedby={id} className="inline-flex">
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute left-1/2 z-(--z-tooltip) w-max max-w-56 -translate-x-1/2 rounded-field bg-ink-950 px-3 py-2 text-center text-xs leading-snug text-cream-100 opacity-0 shadow-overlay transition-opacity duration-200",
          "group-hover/tip:opacity-100 group-focus-within/tip:opacity-100",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
        )}
      >
        {label}
      </span>
    </span>
  );
}
