"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { getServicesByCategory } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * MEGA MENU ARCHITECTURE
 *
 * Disclosure-pattern mega menu (button + aria-expanded panel — the
 * WAI-recommended approach over hover menus, which fail keyboard
 * and touch). The Services panel derives from the authoritative
 * catalog grouped by category, so it stays correct as services are
 * added. Escape closes and refocuses the trigger; outside click
 * closes. The header adopts this in the phase that routes
 * /services; until then it ships as the documented architecture.
 * ─────────────────────────────────────────────────────────────────
 */
export function ServicesMegaMenu({
  linked = false,
  className,
}: {
  /** Render items as links once service routes exist. */
  linked?: boolean;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const groups = [...getServicesByCategory().entries()];

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
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
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-1.5 font-nav text-sm font-medium tracking-nav text-charcoal-700 uppercase transition-colors hover:text-gold-700"
      >
        Services
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={id}
        hidden={!open}
        className="absolute left-1/2 z-(--z-tooltip) mt-4 w-[min(92vw,52rem)] -translate-x-1/2 rounded-card bg-cream-50 p-8 shadow-overlay"
      >
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(([category, items]) => (
            <div key={category}>
              <p className="font-nav text-xs font-semibold tracking-label text-gold-700 uppercase">
                {category}
              </p>
              <ul className="mt-3 space-y-2">
                {items.map((service) =>
                  linked ? (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-sm text-charcoal-600 transition-colors hover:text-ink-900"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ) : (
                    <li key={service.slug} className="text-sm text-charcoal-600">
                      {service.name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
