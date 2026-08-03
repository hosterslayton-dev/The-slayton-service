import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroContent } from "@/config/homepage";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * HERO — cinematic full-screen opening (Phase 3)
 *
 * Server component. The illuminated white logo (Phase 3A glow +
 * cross light) sits over placeholder cinematic photography behind a
 * legibility scrim — text contrast is guaranteed by the scrim, not
 * the photo, so real photography can drop in without an
 * accessibility review. Entrance choreography is pure CSS and
 * collapses under prefers-reduced-motion.
 * ─────────────────────────────────────────────────────────────────
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink-950 pt-28 pb-20 text-cream-100">
      {/* Photography ground (placeholder until licensed imagery). */}
      <Image
        src={heroContent.image.src}
        alt={heroContent.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility scrim + ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/45 to-ink-950/80"
      />
      <div aria-hidden="true" className="hero-ambient-light" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="animate-fade-rise relative">
            <span aria-hidden="true" className="hero-logo-glow" />
            <Logo
              variant="light"
              width={340}
              priority
              className="relative w-64 sm:w-[340px]"
            />
          </div>

          {/* Illuminated cross — quiet, breathing; still under reduced motion. */}
          <span aria-hidden="true" className="cross-light mt-7" />

          <h1 className="mt-8 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            <span className="animate-fade-rise block" style={{ animationDelay: "150ms" }}>
              {siteConfig.motto.lineOne}
            </span>
            <span
              className="animate-fade-rise mt-2 block text-gold-300"
              style={{ animationDelay: "300ms" }}
            >
              {siteConfig.motto.lineTwo}
            </span>
          </h1>

          <p
            className="animate-fade-rise prose-width mt-7 text-lg leading-relaxed text-cream-100/85"
            style={{ animationDelay: "450ms" }}
          >
            {heroContent.mission}
          </p>

          <p
            className="animate-fade-rise mt-5 text-sm text-cream-100/60 italic"
            style={{ animationDelay: "550ms" }}
          >
            {heroContent.scripture.text}{" "}
            <span className="not-italic font-nav text-xs tracking-label text-gold-300 uppercase">
              — {heroContent.scripture.reference}
            </span>
          </p>

          <div
            className="animate-fade-rise mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "650ms" }}
          >
            <Button href={heroContent.primaryCta.href} variant="primary" size="lg">
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} variant="outline-light" size="lg">
              {heroContent.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="animate-fade-rise absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        style={{ animationDelay: "1100ms" }}
      >
        <span className="block h-9 w-px bg-gradient-to-b from-transparent via-cream-100/50 to-transparent" />
      </div>
    </section>
  );
}
