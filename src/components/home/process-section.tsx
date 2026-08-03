import { ProcessIllustration, type ProcessIllustrationName } from "@/components/brand/process-illustrations";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { processSteps } from "@/config/homepage";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * PROCESS EXPERIENCE — cinematic five-stage timeline (Phase 5)
 *
 * An ordered list (the numbers are real sequence) with large line
 * illustrations, alternating sides down a center spine. Stages
 * reveal as the visitor scrolls; the spine is a static gradient.
 * Server component — the only JS is the shared Reveal observer,
 * and everything collapses gracefully under reduced motion.
 * ─────────────────────────────────────────────────────────────────
 */

const illustrations: ProcessIllustrationName[] = [
  "request",
  "inspection",
  "planning",
  "construction",
  "walkthrough",
];

export function ProcessSection() {
  return (
    <Section tone="tan" id="our-process" className="scroll-mt-header">
      <Container>
        <SectionHeading
          eyebrow={processSteps.eyebrow}
          title={processSteps.title}
          lede={processSteps.lede}
        />

        <ol className="relative mx-auto mt-16 max-w-4xl list-none">
          {/* Center spine (desktop) */}
          <span
            aria-hidden="true"
            className="absolute inset-y-4 left-6 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent lg:left-1/2"
          />

          {processSteps.steps.map((step, index) => {
            const illustration = illustrations[index] ?? "request";
            const even = index % 2 === 0;
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={80}
                className={cn(
                  "relative grid items-center gap-6 pb-16 pl-16 last:pb-0",
                  "lg:grid-cols-2 lg:gap-16 lg:pl-0",
                )}
              >
                {/* Node on the spine */}
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-6 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-gold-500/50 bg-cream-100 font-display text-base text-gold-700 shadow-card lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                >
                  {index + 1}
                </span>

                {/* Illustration panel */}
                <div
                  className={cn(
                    "flex justify-center rounded-card bg-cream-50 p-8 text-charcoal-700 shadow-card",
                    even ? "lg:order-first lg:mr-10" : "lg:order-last lg:ml-10",
                  )}
                >
                  <span className="text-gold-700/90">
                    <ProcessIllustration
                      name={illustration}
                      className="h-36 w-36 sm:h-44 sm:w-44"
                    />
                  </span>
                </div>

                {/* Copy */}
                <div
                  className={cn(
                    even ? "lg:order-last lg:ml-10" : "lg:order-first lg:mr-10 lg:text-right",
                  )}
                >
                  <p className="eyebrow">Stage {index + 1} of 5</p>
                  <h3 className="mt-2 font-display text-display-sm text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-charcoal-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
