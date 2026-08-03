/**
 * ─────────────────────────────────────────────────────────────────
 * SITE CONFIGURATION — single source of truth for company identity
 *
 * Governed by the Enterprise Project Constitution and the Brand &
 * Design Consolidation Specification. Every component reads identity
 * data from here; nothing hard-codes the phone number, motto, or
 * service areas inline.
 * ─────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "The Slayton Service",
  legalName: "The Slayton Service",
  motto: {
    lineOne: "Serving Our Clients.",
    lineTwo: "Honoring Our God.",
  },
  secondaryHeadline: ["Protecting Homes.", "Serving Families.", "Building Trust."],
  description:
    "The Slayton Service is a premium home stewardship company serving Middle Tennessee — protecting, improving, and maintaining homes through honest recommendations, premium craftsmanship, and dependable service.",
  scripture: {
    reference: "Matthew 20:28",
    /** Rendered as the reference only in chrome (footer); full text is
     *  reserved for the tasteful placement specified for content pages. */
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    phoneDisplay: "(615) 920-3891",
    phoneHref: "tel:+16159203891",
    /** Official email is not yet confirmed; components hide email CTAs
     *  when this is empty rather than inventing an address. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  },

  social: {
    instagram: {
      handle: "@theslaytonservice",
      url: "https://www.instagram.com/theslaytonservice",
    },
    /** Facebook is a placeholder per specification — no URL yet. */
    facebook: {
      handle: "The Slayton Service",
      url: "",
    },
  },

  serviceAreas: {
    cities: [
      "Gallatin",
      "Hendersonville",
      "Nashville",
      "Mt. Juliet",
      "Lebanon",
      "White House",
      "Portland",
      "Goodlettsville",
    ],
    counties: ["Sumner County", "Wilson County", "Davidson County"],
    region: "Middle Tennessee",
  },

  businessHours: [
    { days: "Monday – Friday", hours: "7:00 AM – 6:00 PM" },
    { days: "Saturday", hours: "By appointment" },
    { days: "Sunday", hours: "Closed" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
