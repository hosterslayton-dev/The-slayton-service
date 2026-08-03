import { cn } from "@/lib/utils";

/**
 * Small status/category label. `tone` maps to the semantic status
 * tokens; "brand" is the default editorial tan chip. `onDark`
 * switches to the dark-surface status variants.
 */
type BadgeTone = "brand" | "gold" | "success" | "warning" | "error" | "info";

const light: Record<BadgeTone, string> = {
  brand: "bg-tan-200 text-charcoal-700",
  gold: "bg-gold-500/15 text-gold-700",
  success: "bg-success-100 text-success-600",
  warning: "bg-warning-100 text-warning-700",
  error: "bg-error-100 text-error-600",
  info: "bg-info-100 text-info-600",
};

const dark: Record<BadgeTone, string> = {
  brand: "bg-cream-100/10 text-cream-100/80",
  gold: "bg-gold-500/20 text-gold-300",
  success: "bg-success-300/15 text-success-300",
  warning: "bg-warning-300/15 text-warning-300",
  error: "bg-error-300/15 text-error-300",
  info: "bg-info-300/15 text-info-300",
};

export function Badge({
  tone = "brand",
  onDark = false,
  className,
  children,
}: {
  tone?: BadgeTone;
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-nav text-xs font-medium tracking-nav uppercase",
        (onDark ? dark : light)[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
