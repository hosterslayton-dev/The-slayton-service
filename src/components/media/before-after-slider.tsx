"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { BeforeAfterPair } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────
 * BEFORE / AFTER SLIDER (Part 8)
 *
 * Interactive comparison built on a real <input type="range"> laid
 * over the images, so dragging, arrow keys, touch, and screen-
 * reader value announcements all come from the platform. The
 * after image is clipped to the slider position; multiple sliders
 * per page are supported and images lazy-load by default.
 * ─────────────────────────────────────────────────────────────────
 */
export function BeforeAfterSlider({
  pair,
  priority = false,
  className,
}: {
  pair: BeforeAfterPair;
  priority?: boolean;
  className?: string;
}) {
  const id = useId();
  const [position, setPosition] = useState(50);

  return (
    <figure className={cn("overflow-hidden rounded-card", className)}>
      <div className="relative aspect-[4/3] w-full touch-pan-y select-none">
        <Image
          src={pair.before.src}
          alt={pair.before.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={pair.after.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority}
            className="object-cover"
          />
        </div>

        {/* Divider + handle, driven by the range value */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-cream-50 shadow-[0_0_8px_rgb(14_13_11/0.4)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50 shadow-overlay">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-900" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-4 6 4 6M15 6l4 6-4 6" />
            </svg>
          </span>
        </div>

        {/* Labels */}
        <span aria-hidden="true" className="absolute top-4 left-4 rounded-pill bg-ink-950/70 px-3 py-1 font-nav text-xs tracking-nav text-cream-100 uppercase backdrop-blur-sm">
          Before
        </span>
        <span aria-hidden="true" className="absolute top-4 right-4 rounded-pill bg-ink-950/70 px-3 py-1 font-nav text-xs tracking-nav text-cream-100 uppercase backdrop-blur-sm">
          After
        </span>

        <label htmlFor={id} className="sr-only">
          Compare before and after — 0 shows the finished project, 100 shows the
          original condition
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {pair.caption ? (
        <figcaption className="bg-cream-50 px-5 py-3 text-sm text-charcoal-600">
          {pair.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
