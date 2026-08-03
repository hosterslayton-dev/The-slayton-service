/**
 * ─────────────────────────────────────────────────────────────────
 * ICON SET — minimal 24×24 line icons, 1.5px stroke
 *
 * Hand-kept inline SVGs in the brand's restrained line style — no
 * icon library dependency, tree-shaken by usage, colored via
 * currentColor. All icons are decorative (aria-hidden applied by
 * consumers); adjacent text carries the meaning.
 * ─────────────────────────────────────────────────────────────────
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type IconName =
  | "kitchen"
  | "bathroom"
  | "interior"
  | "exterior"
  | "roof"
  | "paint"
  | "drywall"
  | "flooring"
  | "pest"
  | "pressure"
  | "maintenance"
  | "emergency"
  | "consulting"
  | "shield"
  | "craft"
  | "ledger"
  | "home"
  | "message"
  | "clock"
  | "check"
  | "phone"
  | "instagram"
  | "cross"
  | "magnify"
  | "ribbon"
  | "calendar"
  | "alert"
  | "swap"
  | "deck"
  | "fence"
  | "droplet"
  | "crawlspace"
  | "truck";

const paths: Record<IconName, React.ReactNode> = {
  kitchen: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 10h17M8 4v6M8 13v3" />
    </>
  ),
  bathroom: (
    <>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M6 12V6a2 2 0 0 1 4 0M8 19.5 7 21.5M16 19.5l1 2" />
    </>
  ),
  interior: (
    <>
      <path d="M3.5 20.5v-13l8.5-4 8.5 4v13" />
      <path d="M9 20.5v-6h6v6M3.5 11h17" />
    </>
  ),
  exterior: (
    <>
      <path d="M2.5 11 12 3.5 21.5 11" />
      <path d="M5 9.5v11h14v-11" />
      <path d="M9.5 20.5V15h5v5.5" />
    </>
  ),
  roof: (
    <>
      <path d="M2.5 12.5 12 4l9.5 8.5" />
      <path d="M5.5 9.8V7h2.3" />
      <path d="M6 14.5h12M8 18.5h8" />
    </>
  ),
  paint: (
    <>
      <rect x="5" y="3.5" width="14" height="6" rx="1" />
      <path d="M19 5.5h1.5v4L13 11v2" />
      <rect x="11.5" y="13" width="3" height="7.5" rx="0.75" />
    </>
  ),
  drywall: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
      <path d="M12 3.5v17M3.5 12H12" />
    </>
  ),
  flooring: (
    <>
      <path d="M3 8.5 12 4l9 4.5-9 4.5L3 8.5Z" />
      <path d="M3 8.5V15l9 4.5V13M21 8.5V15l-9 4.5" />
    </>
  ),
  pest: (
    <>
      <circle cx="12" cy="13" r="5" />
      <path d="M12 8V5.5M8.5 9.5 6 7.5M15.5 9.5 18 7.5M7 13H4M20 13h-3M8.5 16.5 6.5 19M15.5 16.5l2 2.5" />
    </>
  ),
  pressure: (
    <>
      <path d="M4 20.5 9.5 15M8 11l5 5" />
      <path d="M11 8.5 15.5 4l4.5 4.5L15.5 13 11 8.5Z" />
      <path d="m18.5 2.5 3 3" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14.5 6.5a4 4 0 0 1 5-1l-3 3 .8 2.2L19.5 11l3-3a4 4 0 0 1-5.3 5.3L9 21.5a2 2 0 0 1-3-3l8.5-8.2" />
      <path d="m3 5 2-2 4 4-2 2-4-4Z" />
    </>
  ),
  emergency: (
    <>
      <path d="m13 2.5-8 11h5l-1.5 8 8.5-11.5h-5l1-7.5Z" />
    </>
  ),
  consulting: (
    <>
      <path d="M4 15.5V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 20 6v7a1.5 1.5 0 0 1-1.5 1.5H9L4 19v-3.5Z" />
      <path d="M8.5 8.5h7M8.5 11.5h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 19.5 6v5c0 4.8-3.2 8.6-7.5 10-4.3-1.4-7.5-5.2-7.5-10V6L12 2.5Z" />
      <path d="m8.5 11.5 2.5 2.5 4.5-5" />
    </>
  ),
  craft: (
    <>
      <path d="m12 3 2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 13.8 7.8 16l.8-4.7L5.2 8l4.7-.7L12 3Z" />
      <path d="M12 18.5v3" />
    </>
  ),
  ledger: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9v11.5h13V9" />
      <path d="M12 20.5v-5" />
    </>
  ),
  message: (
    <>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 17H9l-5.5 4V6.5Z" />
      <path d="m6.5 8 5.5 4 5.5-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.5 2.75 2.75L16.5 9.5" />
    </>
  ),
  phone: (
    <>
      <path d="M5.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.5 18 6 13.5 5.4 6.1A1.5 1.5 0 0 1 5.5 3.5Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" />
    </>
  ),
  cross: (
    <>
      <path d="M12 4v16M7.5 9h9" />
    </>
  ),
  magnify: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
      <path d="M8.5 11h5M11 8.5v5" opacity="0.5" />
    </>
  ),
  ribbon: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9 13.5-2 7 5-2.5 5 2.5-2-7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4.5M12 17.5v.01" />
    </>
  ),
  swap: (
    <>
      <path d="M16 4.5 20 8.5l-4 4M20 8.5H6" />
      <path d="M8 19.5 4 15.5l4-4M4 15.5h14" />
    </>
  ),
  deck: (
    <>
      <path d="M3 11h18" />
      <path d="M5 11v9M10 11v9M14 11v9M19 11v9" opacity="0.6" />
      <path d="M3 15h18" opacity="0.45" />
      <path d="M6 11 12 5l6 6" />
    </>
  ),
  fence: (
    <>
      <path d="M5 20V8l2-2.5L9 8v12M15 20V8l2-2.5L19 8v12" />
      <path d="M3 11h18M3 16h18" opacity="0.6" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3.5c3.5 4.5 6.5 8 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 11.5 8.5 8 12 3.5Z" />
      <path d="M9.5 14.5a3 3 0 0 0 2 2.8" opacity="0.6" />
    </>
  ),
  crawlspace: (
    <>
      <path d="M3.5 12 12 5l8.5 7" />
      <path d="M5.5 10.5V15h13v-4.5" opacity="0.55" />
      <path d="M3 18.5h18M6 18.5v-2M12 18.5v-2M18 18.5v-2" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6.5h11v9H3zM14 9.5h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
