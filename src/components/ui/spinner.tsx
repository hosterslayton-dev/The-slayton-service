import { cn } from "@/lib/utils";

/**
 * Loading spinner. Announces via role="status"; under reduced
 * motion the rotation stops but the indicator remains visible.
 */
export function Spinner({
  label = "Loading",
  size = "md",
  className,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "h-4 w-4 border-2", md: "h-6 w-6 border-2", lg: "h-9 w-9 border-[3px]" };
  return (
    <span role="status" className={cn("inline-flex items-center", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "motion-safe:animate-spin rounded-full border-tan-300 border-t-gold-600",
          sizes[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
