import type { ImageAsset } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────
 * QUALITY MATERIALS CONFIGURATION
 *
 * Single source for the homepage "Quality Materials" trust section:
 * recognizable U.S. manufacturers grouped by the categories The
 * Slayton Service works in, each linking to the manufacturer's
 * official site.
 *
 * OWNER NOTE — curate this list: keep only manufacturers whose
 * products you genuinely install or work with, and add any that are
 * missing. Removing or adding a brand is one object here; nothing
 * else changes.
 *
 * Logos: manufacturer marks are their trademarks, so this codebase
 * ships refined typographic wordmarks and never redraws or embeds
 * logo artwork it doesn't have rights to (the same policy as the
 * Slayton logo itself). If official brand assets are obtained under
 * the manufacturer's brand guidelines, drop the file into
 * /public/materials/ and add `logo: { src, alt, width, height }`
 * to the entry — the section renders it automatically with the
 * same treatment as the typographic mark.
 * ─────────────────────────────────────────────────────────────────
 */

export interface MaterialManufacturer {
  name: string;
  /** Official manufacturer website. */
  url: string;
  /** Optional official logo artwork in /public/materials. */
  logo?: ImageAsset;
}

export interface MaterialCategory {
  key: string;
  label: string;
  manufacturers: MaterialManufacturer[];
}

export const materialCategories: MaterialCategory[] = [
  {
    key: "roofing",
    label: "Roofing",
    manufacturers: [
      { name: "GAF", url: "https://www.gaf.com" },
      { name: "Owens Corning", url: "https://www.owenscorning.com" },
      { name: "CertainTeed", url: "https://www.certainteed.com" },
    ],
  },
  {
    key: "flooring",
    label: "Flooring",
    manufacturers: [
      { name: "Mohawk", url: "https://www.mohawkflooring.com" },
      { name: "Shaw Floors", url: "https://shawfloors.com" },
    ],
  },
  {
    key: "engineered-wood",
    label: "Engineered Wood",
    manufacturers: [
      { name: "Georgia-Pacific", url: "https://www.gp.com" },
      { name: "Weyerhaeuser", url: "https://www.weyerhaeuser.com" },
    ],
  },
  {
    key: "windows",
    label: "Windows",
    manufacturers: [
      { name: "Andersen", url: "https://www.andersenwindows.com" },
      { name: "Pella", url: "https://www.pella.com" },
    ],
  },
  {
    key: "doors",
    label: "Doors",
    manufacturers: [
      { name: "Therma-Tru", url: "https://www.thermatru.com" },
      { name: "Masonite", url: "https://www.masonite.com" },
    ],
  },
  {
    key: "siding",
    label: "Siding",
    manufacturers: [
      { name: "James Hardie", url: "https://www.jameshardie.com" },
      { name: "LP SmartSide", url: "https://lpcorp.com" },
    ],
  },
  {
    key: "decking",
    label: "Decking",
    manufacturers: [
      { name: "Trex", url: "https://www.trex.com" },
      { name: "TimberTech", url: "https://www.timbertech.com" },
    ],
  },
];

/** Rendered beneath the section — keeps the trust claim precise. */
export const materialsDisclaimer =
  "Manufacturer names identify products The Slayton Service may install or " +
  "work with. They do not imply endorsement of The Slayton Service by these " +
  "companies or any exclusive partnership. All trademarks are the property " +
  "of their respective owners.";
