import { BaseCard, CardMedia } from "./base-card";
import type { Service } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * Service card (Parts 2-3: "premium service cards"). Two headers:
 * an icon panel (homepage featured grid) or a photo via `media`.
 * Links to the service anchor/landing page when `href` is given;
 * renders unlinked otherwise so grids never 404 during rollout.
 */
export function ServiceCard({
  service,
  description,
  media,
  icon,
  href,
  linked = false,
  className,
}: {
  service: Service;
  description?: string;
  media?: React.ReactNode;
  /** Icon-panel header used by the homepage featured grid. */
  icon?: React.ReactNode;
  /** Explicit destination; defaults to the future service route when `linked`. */
  href?: string;
  linked?: boolean;
  className?: string;
}) {
  const destination = href ?? (linked ? `/services/${service.slug}` : undefined);
  return (
    <BaseCard href={destination} className={cn("h-full", className)}>
      {icon ? (
        <div className="flex items-center justify-between px-6 pt-6">
          <span
            aria-hidden="true"
            className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-gold-500/12 text-gold-700 transition-colors duration-300 ease-premium group-hover:bg-gold-500/20 [&>svg]:h-6 [&>svg]:w-6"
          >
            {icon}
          </span>
          {destination ? (
            <span
              aria-hidden="true"
              className="text-tan-400 transition-all duration-300 ease-premium group-hover:text-gold-600 motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          ) : null}
        </div>
      ) : (
        <CardMedia>{media}</CardMedia>
      )}
      <div className={cn("p-6", icon && "pt-5")}>
        <p className="eyebrow">{service.category}</p>
        <h3 className="mt-2 font-display text-display-sm text-ink-900">{service.name}</h3>
        {description ? (
          <p className="mt-2.5 text-sm leading-relaxed text-charcoal-600">{description}</p>
        ) : null}
        {destination ? (
          <span
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 font-nav text-xs font-semibold tracking-nav text-gold-700 uppercase",
              "transition-transform duration-300 ease-premium motion-safe:group-hover:translate-x-1",
            )}
          >
            Learn more <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
    </BaseCard>
  );
}
