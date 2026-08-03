"use client";

import Image from "next/image";
import { useState } from "react";
import { IconButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Partner } from "@/config/partners";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * PARTNER MARQUEE — client island for the partner section
 *
 * All motion lives in the CSS `.partner-marquee` system
 * (globals.css); this component only owns the pause toggle and the
 * track markup. The sequence is rendered enough times for one half
 * of the track to exceed any common viewport (a short strip would
 * expose blank space at the -50% loop point), and the whole half
 * is then duplicated for the seamless wrap.
 *
 * Accessibility contract:
 *   • Each partner is a real link exactly once. Repeats and the
 *     loop duplicate are aria-hidden visual filler, removed from
 *     the tab order — and removed entirely under reduced motion,
 *     where the visible set wraps into a static grid.
 *   • Partners without a URL render as static figures — no pointer
 *     cursor, no link that goes nowhere.
 *   • Playback pauses on hover, on focus within the strip, and via
 *     the visible pause control (WCAG 2.2.2 for touch/keyboard).
 *   • When keyboard focus leaves the strip, any scroll offset the
 *     browser introduced to reveal a clipped logo is reset so the
 *     resuming animation stays aligned.
 *   • Logos declare intrinsic dimensions and render at a fixed
 *     row height — zero layout shift while artwork loads.
 * ─────────────────────────────────────────────────────────────────
 */

/** One half of the track should comfortably exceed wide viewports. */
const MIN_ITEMS_PER_HALF = 14;

const groupClasses = "flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16";

const itemClasses = cn(
  "group relative flex h-16 shrink-0 items-center px-1 sm:h-[4.5rem]",
  "after:absolute after:inset-x-1 after:bottom-1 after:h-px after:origin-center",
  "after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-500",
  "after:ease-premium hover:after:scale-x-100 focus-visible:after:scale-x-100",
);

function PartnerLogo({ partner, tabbable }: { partner: Partner; tabbable: boolean }) {
  const media = (
    <Image
      src={partner.logo.src}
      alt={partner.url ? "" : partner.logo.alt}
      width={partner.logo.width}
      height={partner.logo.height}
      loading="lazy"
      sizes="(min-width: 640px) 240px, 200px"
      // SVG artwork is served as-is; raster logos use the optimizer.
      unoptimized={partner.logo.src.endsWith(".svg")}
      draggable={false}
      className={cn(
        "h-10 w-auto opacity-70 grayscale select-none sm:h-12",
        "transition-[filter,opacity] duration-500 ease-premium",
        "group-hover:opacity-100 group-hover:brightness-105 group-hover:grayscale-0",
        "group-focus-visible:opacity-100 group-focus-visible:grayscale-0",
      )}
    />
  );

  if (!partner.url) {
    return <span className={itemClasses}>{media}</span>;
  }

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabbable ? undefined : -1}
      aria-label={`${partner.name} — visit website (opens in a new tab)`}
      className={itemClasses}
    >
      {media}
    </a>
  );
}

export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  const [paused, setPaused] = useState(false);
  const showSampleNotice = partners.some((partner) => partner.sample);
  const repetitions = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / partners.length));
  const fillerSets = Array.from({ length: repetitions - 1 }, (_, set) => set + 1);

  const fillerItems = fillerSets.flatMap((set) =>
    partners.map((partner) => (
      <li
        key={`fill-${set}-${partner.id}`}
        aria-hidden="true"
        data-marquee-repeat="true"
        className="shrink-0"
      >
        <PartnerLogo partner={partner} tabbable={false} />
      </li>
    )),
  );

  return (
    <div>
      <div
        className="partner-marquee"
        data-paused={paused || undefined}
        onBlur={(event) => {
          // If focus moved outside the strip, undo any scroll the
          // browser applied to reveal a clipped, focused logo so
          // the transform animation resumes without a visual jump.
          const next = event.relatedTarget;
          if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
            event.currentTarget.scrollLeft = 0;
          }
        }}
      >
        <div className="partner-track">
          <ul data-marquee-group="true" className={cn(groupClasses, "list-none")}>
            {partners.map((partner) => (
              <li key={partner.id} className="shrink-0">
                <PartnerLogo partner={partner} tabbable />
              </li>
            ))}
            {fillerItems}
          </ul>
          {/* Seamless-loop duplicate: presentational only. */}
          <div aria-hidden="true" data-marquee-clone="true" className={groupClasses}>
            {Array.from({ length: repetitions }, (_, set) =>
              partners.map((partner) => (
                <PartnerLogo
                  key={`clone-${set}-${partner.id}`}
                  partner={partner}
                  tabbable={false}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {showSampleNotice ? (
          <Badge tone="warning">
            Sample placeholders — confirmed partners will replace these
          </Badge>
        ) : null}
        {/* Nothing animates under reduced motion, so the control hides. */}
        <IconButton
          label="Pause partner animation"
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
          variant="outline"
          className="h-11 w-11 border-tan-300 text-charcoal-600 motion-reduce:hidden"
        >
          {paused ? <PlayGlyph /> : <PauseGlyph />}
        </IconButton>
      </div>
    </div>
  );
}

function PauseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M9.25 6.5v11M14.75 6.5v11" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 6.2v11.6L18 12 8.5 6.2Z" />
    </svg>
  );
}
