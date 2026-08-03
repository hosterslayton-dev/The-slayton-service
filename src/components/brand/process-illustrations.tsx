/**
 * ─────────────────────────────────────────────────────────────────
 * PROCESS ILLUSTRATIONS — five large scene drawings, 96×96 grid
 *
 * Hand-kept line illustrations in the brand's 1.5px stroke style,
 * one per process stage. Decorative (consumers add aria-hidden);
 * gold accents use currentColor on a wrapping element.
 * ─────────────────────────────────────────────────────────────────
 */

const base = {
  viewBox: "0 0 96 96",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export type ProcessIllustrationName =
  | "request"
  | "inspection"
  | "planning"
  | "construction"
  | "walkthrough";

const scenes: Record<ProcessIllustrationName, React.ReactNode> = {
  /* A phone conversation beginning — handset + sound arcs + home */
  request: (
    <>
      <path d="M24 62V38l14-11 14 11v24" opacity="0.45" />
      <path d="M33 62V50h10v12" opacity="0.45" />
      <path d="M56 40c3-8 12-13 20-11l-5 8 2.5 6.5 7 1.5 5-8c3 8-1 17-9 20-6.5 2.5-13.5.5-17.5-4.5" />
      <path d="M62 68c2.5 2 5.5 3.2 9 3.4" opacity="0.6" />
      <circle cx="48" cy="20" r="1" fill="currentColor" stroke="none" opacity="0.5" />
    </>
  ),
  /* Magnifier over the roofline — the free inspection */
  inspection: (
    <>
      <path d="M14 50 44 26l30 24" />
      <path d="M22 46v28h44V46" opacity="0.45" />
      <circle cx="58" cy="52" r="13" />
      <path d="m67.5 61.5 10 10" />
      <path d="M53 52h10M58 47v10" opacity="0.5" />
    </>
  ),
  /* Blueprint + pencil + measurements */
  planning: (
    <>
      <rect x="16" y="22" width="52" height="40" rx="2" />
      <path d="M24 32h20M24 40h28M24 48h14" opacity="0.6" />
      <path d="M52 48l10-10 6 6-10 10-7 1 1-7Z" />
      <path d="M76 30v34M73 30h6M73 64h6" opacity="0.45" />
    </>
  ),
  /* Level + hammer + rising wall */
  construction: (
    <>
      <path d="M14 70h68" />
      <path d="M20 70V50h16v20M36 70V40h16v30M52 70V30h16v40" opacity="0.55" />
      <path d="m64 20 12 12M70 18l8 8-4 4-8-8 4-4Z" />
      <circle cx="28" cy="60" r="1" fill="currentColor" stroke="none" opacity="0.5" />
    </>
  ),
  /* Front door open + checkmark — the final walkthrough */
  walkthrough: (
    <>
      <path d="M20 72V36l28-20 28 20v36" opacity="0.45" />
      <path d="M38 72V44h14v28" />
      <path d="M52 44l8 4v24" opacity="0.55" />
      <circle cx="66" cy="58" r="11" />
      <path d="m61 58 3.5 3.5L71.5 54" />
    </>
  ),
};

export function ProcessIllustration({
  name,
  className,
}: {
  name: ProcessIllustrationName;
  className?: string;
}) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      {scenes[name]}
    </svg>
  );
}
