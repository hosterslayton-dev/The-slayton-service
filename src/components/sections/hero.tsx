import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Reusable page hero (interior pages; the homepage keeps its
 * bespoke cinematic hero). Optional background image renders under
 * a legibility scrim; content always passes AA against the scrim,
 * not the photo.
 */
export function Hero({
  eyebrow,
  title,
  lede,
  actions,
  image,
  compact = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  actions?: React.ReactNode;
  image?: { src: string; alt: string };
  compact?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-ink-950 text-cream-100",
        compact ? "pt-32 pb-16" : "pt-40 pb-24",
        className,
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(193,154,82,0.12),transparent_70%)]"
        />
      )}
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? <p className="eyebrow eyebrow-on-dark">{eyebrow}</p> : null}
          <h1 className="mt-4 font-display text-display-xl">{title}</h1>
          {lede ? (
            <p className="mt-6 text-lg leading-relaxed text-cream-100/80">{lede}</p>
          ) : null}
          {actions ? (
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
