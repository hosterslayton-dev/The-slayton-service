import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Pricing/membership card (future Maintenance Memberships module).
 * Transparent by design: price, cadence, and inclusions stated
 * plainly — no anchoring tricks, no fake urgency. `highlighted`
 * marks a recommended plan with a quiet gold border.
 */
export function PricingCard({
  name,
  price,
  cadence,
  description,
  inclusions,
  ctaLabel = "Get Started",
  ctaHref,
  highlighted = false,
  badge,
  className,
}: {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  inclusions: string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-card bg-cream-50 p-8 shadow-card",
        highlighted && "border-2 border-gold-500",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-display-sm text-ink-900">{name}</h3>
        {badge ? <Badge tone="gold">{badge}</Badge> : null}
      </div>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-4xl text-ink-900">{price}</span>
        {cadence ? <span className="text-sm text-charcoal-500">/ {cadence}</span> : null}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{description}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {inclusions.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-700">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 13 4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      {ctaHref ? (
        <Button
          href={ctaHref}
          variant={highlighted ? "primary" : "outline"}
          className="mt-8 w-full"
        >
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  );
}
