/**
 * ─────────────────────────────────────────────────────────────────
 * NAVIGATION CONFIGURATION
 *
 * The full information architecture (Part 5, as governed by the
 * Enterprise Constitution) is declared here so the header, footer,
 * sitemap, and future breadcrumbs all derive from one structure.
 *
 * `implemented` gates rendering: routes ship in later phases, and the
 * chrome must never link to a 404. Flipping the flag when a phase
 * lands is the only change required — no layout edits.
 * ─────────────────────────────────────────────────────────────────
 */

export interface NavItem {
  label: string;
  href: string;
  /** Whether the route exists in the current phase. */
  implemented: boolean;
  /** Optional shorter label for tight mobile contexts. */
  shortLabel?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", implemented: true },
  { label: "Services", href: "/services", implemented: true },
  { label: "Projects", href: "/projects", implemented: false },
  { label: "Gallery", href: "/gallery", implemented: true },
  { label: "Home Journal", href: "/journal", implemented: false },
  { label: "Learning Center", href: "/learn", implemented: false },
  { label: "About", href: "/about", implemented: false },
  { label: "Service Areas", href: "/service-areas", implemented: false },
  { label: "Blog", href: "/journal", implemented: false },
  { label: "Careers", href: "/careers", implemented: false },
  { label: "Contact", href: "/begin", implemented: false },
];

/**
 * Primary conversion action. Until the Part 9 estimate flow ships,
 * this points at the homepage contact section, which offers real,
 * working contact methods (phone today; email once confirmed).
 */
export const estimateCta = {
  label: "Free Estimate",
  href: "/#begin-your-home-journey",
} as const;

/** Footer quick links: implemented routes plus the estimate anchor. */
export function getFooterQuickLinks(): NavItem[] {
  return primaryNav.filter((item) => item.implemented);
}

/** Header items: only routes that exist in the current phase. */
export function getHeaderNav(): NavItem[] {
  return primaryNav.filter((item) => item.implemented);
}
