"use client";

import { useId, useState } from "react";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { IconButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────
 * TESTIMONIAL CAROUSEL
 *
 * Accessible carousel per the WAI pattern: labelled region with
 * aria-roledescription="carousel", previous/next buttons, dot
 * navigation with aria-current, and a polite live region so slide
 * changes are announced. NO autoplay — motion the visitor didn't
 * request is against both WCAG 2.2.2 and the brand's restraint.
 *
 * Sample reviews render with a visible "Sample" badge until real,
 * verified client reviews (with permission) replace them. This
 * component never invents social proof.
 * ─────────────────────────────────────────────────────────────────
 */
export function TestimonialCarousel({
  testimonials,
  className,
}: {
  testimonials: (Testimonial & { sample?: boolean })[];
  className?: string;
}) {
  const baseId = useId();
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const current = testimonials[index];

  const step = (direction: 1 | -1) =>
    setIndex((value) => (value + direction + count) % count);

  if (!current) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className={cn("mx-auto max-w-2xl", className)}
    >
      <div aria-live="polite" id={`${baseId}-slide`}>
        <div className="relative">
          {current.sample ? (
            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
              <Badge tone="warning">Sample review — not a real client yet</Badge>
            </span>
          ) : null}
          <TestimonialCard testimonial={current} onDark className="pt-9" />
        </div>
        <p className="sr-only">
          Testimonial {index + 1} of {count}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <IconButton label="Previous testimonial" variant="outline-light" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </IconButton>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Testimonial ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-2.5 rounded-pill transition-all duration-300 ease-premium",
                dotIndex === index
                  ? "w-7 bg-gold-400"
                  : "w-2.5 bg-cream-100/30 hover:bg-cream-100/50",
              )}
            />
          ))}
        </div>

        <IconButton label="Next testimonial" variant="outline-light" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
