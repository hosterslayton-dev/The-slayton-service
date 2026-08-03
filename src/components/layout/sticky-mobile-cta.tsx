import { estimateCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * STICKY MOBILE CTA BAR
 *
 * Part 2 mobile experience: a persistent Call button and Estimate
 * button, thumb-friendly, visible only below the desktop
 * breakpoint. Server component — no JavaScript required.
 * ─────────────────────────────────────────────────────────────────
 */
export function StickyMobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-tan-200/70 bg-cream-100/95 backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={siteConfig.contact.phoneHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal-700 font-nav text-sm font-semibold tracking-nav text-ink-900 uppercase"
        >
          Call Now
        </a>
        <a
          href={estimateCta.href}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold-500 font-nav text-sm font-semibold tracking-nav text-ink-950 uppercase"
        >
          {estimateCta.label}
        </a>
      </div>
    </div>
  );
}
