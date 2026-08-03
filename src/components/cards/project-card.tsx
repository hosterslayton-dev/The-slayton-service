import { Badge } from "@/components/ui/badge";
import { BaseCard, CardMedia } from "./base-card";
import { cn } from "@/lib/utils";

/**
 * Project Library card (Part 8). Surfaces the trust-building
 * facts — service, city, summary — and links to the permanent
 * project page.
 */
export function ProjectCard({
  title,
  summary,
  serviceName,
  city,
  href,
  media,
  featured = false,
  className,
}: {
  title: string;
  summary: string;
  serviceName: string;
  city: string;
  href?: string;
  media?: React.ReactNode;
  featured?: boolean;
  className?: string;
}) {
  return (
    <BaseCard href={href} className={className}>
      <CardMedia>
        {media}
        {featured ? (
          <span className="absolute top-4 left-4">
            <Badge tone="gold">Featured</Badge>
          </span>
        ) : null}
      </CardMedia>
      <div className="p-6">
        <p className="eyebrow">
          {serviceName} · {city}
        </p>
        <h3 className="mt-2 font-display text-display-sm text-ink-900">{title}</h3>
        <p className={cn("mt-2.5 text-sm leading-relaxed text-charcoal-600", "line-clamp-3")}>
          {summary}
        </p>
      </div>
    </BaseCard>
  );
}
