"use client";

import { useMemo, useState } from "react";
import { TestimonialCarousel } from "./testimonial-carousel";
import { VideoPlayer } from "@/components/media/video-player";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { reviewsShowcase } from "@/config/homepage";

/**
 * ─────────────────────────────────────────────────────────────────
 * REVIEWS SHOWCASE (Phase 5)
 *
 * Multi-source review experience: source tabs (Google / Facebook /
 * Website / Video) filter the accessible carousel; the Video tab
 * hosts the facade-pattern player. Architecture-ready: real
 * verified reviews replace the config array 1:1 (each entry keeps
 * its source attribution); a future reviews API feeds the same
 * shape. Every sample is visibly badged until then.
 * ─────────────────────────────────────────────────────────────────
 */

type SourceTab = (typeof reviewsShowcase.sources)[number] | "Video";

export function ReviewsShowcase({ className }: { className?: string }) {
  const [source, setSource] = useState<SourceTab>("Google");
  // A play button must never lead to an empty player: the Video tab
  // exists only once real footage is configured.
  const hasVideo = Boolean(reviewsShowcase.video.src);
  const tabs: SourceTab[] = hasVideo
    ? [...reviewsShowcase.sources, "Video"]
    : [...reviewsShowcase.sources];

  const filtered = useMemo(
    () => reviewsShowcase.reviews.filter((review) => review.source === source),
    [source],
  );

  return (
    <div className={className}>
      <div
        role="group"
        aria-label="Review source"
        className="flex flex-wrap justify-center gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={source === tab}
            onClick={() => setSource(tab)}
            className={cn(
              "min-h-11 rounded-pill border px-5 font-nav text-sm transition-all duration-300 ease-premium",
              source === tab
                ? "border-gold-400/70 bg-gold-500/15 text-gold-300"
                : "border-cream-100/20 text-cream-100/70 hover:border-cream-100/40 hover:text-cream-100",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {source === "Video" ? (
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 flex justify-center">
              <Badge tone="warning">
                Sample placeholder — a real client story will be filmed
              </Badge>
            </div>
            <VideoPlayer
              title={reviewsShowcase.video.title}
              poster={reviewsShowcase.video.poster}
              src={reviewsShowcase.video.src || undefined}
            />
          </div>
        ) : filtered.length > 0 ? (
          <TestimonialCarousel
            key={source}
            testimonials={filtered.map((review) => ({
              quote: review.quote,
              author: review.author,
              location: review.location,
              source: review.source,
              sample: review.sample,
            }))}
          />
        ) : null}
      </div>
    </div>
  );
}
