import type { ImageAsset } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────
 * PARTNER CONFIGURATION — "Proudly Partnering With"
 *
 * Single source for the homepage partner marquee. Adding a partner
 * takes two steps and no component changes:
 *
 *   1. Drop the approved logo artwork into /public/partners/
 *      (SVG, PNG, or WebP — transparent background preferred).
 *   2. Add one object to `partners` below with the partner's
 *      confirmed name, official website URL, and the logo's true
 *      intrinsic dimensions (prevents layout shift).
 *
 * Constitutional honesty: partnerships are factual claims about
 * real business relationships, so entries here are owner-supplied
 * only. A partner without a confirmed `url` renders as a static
 * figure — never a link that goes nowhere. When the array is empty
 * the entire section self-hides.
 *
 * Artwork note: the shipped PNGs are non-destructive derivations
 * of the owner-supplied originals (background lifted to
 * transparency, empty margins trimmed, high-quality downscale to
 * web weight) — the marks themselves are untouched.
 * ─────────────────────────────────────────────────────────────────
 */

export interface Partner {
  /** Stable identifier; by convention the logo filename stem. */
  id: string;
  /** Confirmed partner name — becomes the accessible name. */
  name: string;
  /**
   * Official website. Omit while unconfirmed; the logo then renders
   * unlinked with no interactive affordance.
   */
  url?: string;
  /** Logo artwork in /public/partners with intrinsic dimensions. */
  logo: ImageAsset;
  /** Curated emphasis: featured partners lead the marquee order. */
  featured?: boolean;
  /**
   * Visible placeholder label (gallery precedent). Owner-supplied
   * partner marks ship with `sample: false`.
   */
  sample: boolean;
}

export const partners: Partner[] = [
  {
    id: "absolute-flooring",
    name: "Absolute Flooring, Inc.",
    url: "https://www.absoluteflooringinc.com",
    sample: false,
    logo: {
      src: "/partners/absolute-flooring.png",
      alt: "Absolute Flooring, Inc. logo — residential and commercial flooring since 1998",
      width: 1200,
      height: 254,
    },
  },
  {
    id: "wrc-roofing",
    name: "WRC Roofing",
    /** Official site not yet confirmed by the owner — renders unlinked.
     *  Likely https://wrcroofing.com (verify before adding). */
    sample: false,
    logo: {
      src: "/partners/wrc-roofing.png",
      alt: "WRC Roofing logo with an orange roofline outline",
      width: 1200,
      height: 451,
    },
  },
  {
    id: "crr-improvements",
    name: "CRR Improvements",
    /** Phone-first business; no official website found to link. */
    sample: false,
    logo: {
      src: "/partners/crr-improvements.png",
      alt: "CRR Improvements badge logo — carpentry, flooring, crawlspaces, and pressure washing",
      width: 463,
      height: 512,
    },
  },
];

/** Marquee order: featured partners first, then declaration order. */
export function getMarqueePartners(): Partner[] {
  return [...partners].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
  );
}

/** True while any placeholder entry remains (drives the visible notice). */
export function hasSamplePartners(): boolean {
  return partners.some((partner) => partner.sample);
}
