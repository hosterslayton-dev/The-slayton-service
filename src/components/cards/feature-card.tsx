import { cn } from "@/lib/utils";

/**
 * Feature/value card ("Why Choose Us", The Slayton Standard
 * grid). Icon is decorative; the title carries the meaning.
 * Deliberately static: these cards are informational, never
 * clickable, so they carry no hover lift or pointer affordance.
 */
export function FeatureCard({
  icon,
  title,
  description,
  onDark = false,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card p-7",
        onDark ? "bg-cream-100/5" : "bg-cream-50 shadow-card",
        className,
      )}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={cn(
            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full [&>svg]:h-6 [&>svg]:w-6",
            onDark ? "bg-gold-500/15 text-gold-300" : "bg-gold-500/15 text-gold-700",
          )}
        >
          {icon}
        </span>
      ) : null}
      <h3 className={cn("font-display text-display-sm", onDark ? "text-cream-100" : "text-ink-900")}>
        {title}
      </h3>
      <p className={cn("mt-2.5 text-sm leading-relaxed", onDark ? "text-cream-100/70" : "text-charcoal-600")}>
        {description}
      </p>
    </div>
  );
}
