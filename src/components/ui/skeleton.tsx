import { cn } from "@/lib/utils";

/**
 * Content placeholder while data loads. Purely decorative
 * (aria-hidden); pair with a visually hidden status message or
 * Spinner at the container level so assistive tech hears one
 * announcement, not a wall of placeholders.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block rounded-field bg-tan-200 motion-safe:animate-pulse",
        className,
      )}
    />
  );
}

/** Ready-made card-shaped skeleton for grid loading states. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-card bg-cream-50 p-5 shadow-card", className)}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-[calc(var(--radius-card)-0.375rem)]" />
      <Skeleton className="mt-4 h-4 w-2/3" />
      <Skeleton className="mt-2.5 h-3 w-full" />
      <Skeleton className="mt-1.5 h-3 w-5/6" />
    </div>
  );
}
