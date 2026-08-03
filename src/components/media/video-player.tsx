"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Video container (Part 8 video library groundwork). Facade
 * pattern: renders a lightweight poster with a play button and
 * mounts the actual player (native <video> or a provider embed via
 * `renderPlayer`) only on demand — heavy video never blocks page
 * load. Captions are the content owner's responsibility and
 * required for published videos (WCAG 1.2.2).
 */
export function VideoPlayer({
  title,
  poster,
  src,
  renderPlayer,
  className,
}: {
  title: string;
  poster: { src: string; alt?: string };
  /** Direct file source for the native player. */
  src?: string;
  /** Custom embed factory (YouTube/Vimeo) mounted after activation. */
  renderPlayer?: () => React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  // Honesty guard: without playable content there is no play button —
  // the poster renders as a plain, non-interactive figure.
  const playable = Boolean(src) || Boolean(renderPlayer);

  return (
    <figure className={cn("overflow-hidden rounded-card bg-ink-950", className)}>
      <div className="relative aspect-video w-full">
        {!playable ? (
          <Image
            src={poster.src}
            alt={poster.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover opacity-80"
          />
        ) : active ? (
          renderPlayer ? (
            renderPlayer()
          ) : src ? (
            <video controls autoPlay className="h-full w-full" aria-label={title}>
              <source src={src} />
              Your browser can&apos;t play this video.
            </video>
          ) : null
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0"
            aria-label={`Play video: ${title}`}
          >
            <Image
              src={poster.src}
              alt={poster.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover opacity-80 transition-opacity group-hover:opacity-60"
            />
            <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-gold-glow transition-transform duration-300 ease-premium motion-safe:group-hover:scale-110">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                <path d="M8 5.5v13l11-6.5L8 5.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-5 py-3 text-sm text-cream-100/70">{title}</figcaption>
    </figure>
  );
}
