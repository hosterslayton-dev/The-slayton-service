"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────
 * IMAGE GALLERY · LIGHTBOX (Part 8)
 *
 * Grid or masonry layouts; every thumbnail is a real button that
 * opens a <dialog>-based full-screen lightbox (native focus trap,
 * Escape, top layer). Inside the lightbox: previous/next buttons,
 * Arrow-key navigation, swipe gestures, position announced via a
 * live region. Thumbnails lazy-load; the open image loads eagerly.
 * ─────────────────────────────────────────────────────────────────
 */

export function ImageGallery({
  images,
  layout = "grid",
  className,
}: {
  images: ImageAsset[];
  layout?: "grid" | "masonry";
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul
        className={cn(
          "list-none gap-4",
          layout === "grid" && "grid grid-cols-2 lg:grid-cols-3",
          layout === "masonry" && "columns-2 space-y-4 lg:columns-3",
          className,
        )}
      >
        {images.map((image, index) => (
          <li key={image.src} className={cn(layout === "masonry" && "break-inside-avoid")}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full overflow-hidden rounded-card"
              aria-label={`View larger: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className={cn(
                  "w-full object-cover transition-transform duration-500 ease-premium motion-safe:group-hover:scale-[1.03]",
                  layout === "grid" && "aspect-[4/3]",
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

export function Lightbox({
  images,
  openIndex,
  onClose,
  onNavigate,
}: {
  images: ImageAsset[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = openIndex !== null;
  const count = images.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (openIndex === null || count === 0) return;
      onNavigate((openIndex + direction + count) % count);
    },
    [openIndex, count, onNavigate],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const image = openIndex !== null ? images[openIndex] : undefined;

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={onKeyDown}
      aria-label="Image viewer"
      className="m-auto h-svh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink-950/90"
    >
      {image ? (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (startX === null || endX === undefined) return;
            const delta = endX - startX;
            if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
          }}
        >
          <div className="relative max-h-[78svh] w-full max-w-5xl flex-1">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <p aria-live="polite" className="text-sm text-cream-100/80">
            {image.alt} — {openIndex! + 1} of {count}
          </p>
          <div className="flex items-center gap-3">
            <IconButton label="Previous image" variant="outline-light" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </IconButton>
            <IconButton label="Next image" variant="outline-light" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </IconButton>
            <IconButton label="Close viewer" variant="outline-light" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </IconButton>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
