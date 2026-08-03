import { BaseCard, CardMedia } from "./base-card";

/**
 * Home Journal article card (Part 7). Editorial treatment:
 * category eyebrow, display title, readable date.
 */
export function JournalCard({
  title,
  category,
  excerpt,
  publishedAt,
  href,
  media,
  className,
}: {
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string; // ISO date
  href?: string;
  media?: React.ReactNode;
  className?: string;
}) {
  const date = new Date(publishedAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <BaseCard href={href} className={className}>
      <CardMedia>{media}</CardMedia>
      <div className="p-6">
        <p className="eyebrow">{category}</p>
        <h3 className="mt-2 font-display text-display-sm text-ink-900">{title}</h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-charcoal-600">
          {excerpt}
        </p>
        <time dateTime={publishedAt} className="mt-4 block text-xs text-charcoal-500">
          {formatted}
        </time>
      </div>
    </BaseCard>
  );
}
