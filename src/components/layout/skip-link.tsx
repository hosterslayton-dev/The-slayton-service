/**
 * First focusable element on every page: lets keyboard and screen
 * reader users bypass the navigation (WCAG 2.4.1). Visually hidden
 * until focused.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:font-nav focus:text-sm focus:text-cream-100"
    >
      Skip to main content
    </a>
  );
}
