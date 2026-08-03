/**
 * Global route-transition loading UI. Quiet by design: a small,
 * accessible indicator on the brand ground — no spinner theatrics.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-svh items-center justify-center bg-cream-100"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading</span>
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-gold-500 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
