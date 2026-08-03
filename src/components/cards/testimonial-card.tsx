import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

/**
 * Testimonial card (Parts 3 & 8). Quote-first, with source
 * attribution ("Google", "Facebook", "Website") displayed
 * honestly. Never fabricates reviews — renders only supplied
 * content.
 */
export function TestimonialCard({
  testimonial,
  onDark = false,
  className,
}: {
  testimonial: Testimonial;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-card p-7",
        onDark ? "bg-ink-900 text-cream-100" : "bg-cream-50 shadow-card",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("h-7 w-7", onDark ? "text-gold-300" : "text-gold-500")} fill="currentColor">
        <path d="M7.2 5C4.4 6.8 2.5 9.7 2.5 13.2c0 3.4 2.1 5.8 5 5.8 2.5 0 4.3-1.9 4.3-4.3 0-2.3-1.6-4-3.8-4-.4 0-.9.1-1 .1.3-1.9 2-4 3.9-5L7.2 5Zm10.5 0c-2.8 1.8-4.7 4.7-4.7 8.2 0 3.4 2.1 5.8 5 5.8 2.4 0 4.3-1.9 4.3-4.3 0-2.3-1.6-4-3.8-4-.4 0-.8.1-1 .1.3-1.9 2-4 3.9-5L17.7 5Z" />
      </svg>
      <blockquote className={cn("mt-4 flex-1 font-display text-lg leading-relaxed", onDark ? "text-cream-100" : "text-charcoal-700")}>
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={testimonial.author} size="sm" />
        <div>
          <p className={cn("font-nav text-sm font-semibold", onDark ? "text-cream-100" : "text-ink-900")}>
            {testimonial.author}
          </p>
          <p className={cn("text-xs", onDark ? "text-cream-100/60" : "text-charcoal-500")}>
            {[testimonial.location, testimonial.source && `via ${testimonial.source}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
