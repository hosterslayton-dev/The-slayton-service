import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Numbered process timeline (the five-step Slayton process). An
 * ordered list — the numbers carry real sequence information.
 * Steps reveal in order with a gentle stagger.
 */
export interface TimelineStep {
  title: string;
  description: string;
}

export function Timeline({
  eyebrow,
  title,
  lede,
  steps,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  steps: TimelineStep[];
  tone?: "light" | "tan";
  className?: string;
}) {
  return (
    <Section tone={tone} className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        <ol className="mx-auto mt-14 max-w-2xl list-none">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 110} className="relative flex gap-6 pb-12 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 font-display text-lg text-ink-950"
                >
                  {index + 1}
                </span>
                {index < steps.length - 1 ? (
                  <span aria-hidden="true" className={cn("mt-2 w-px flex-1", "bg-tan-300")} />
                ) : null}
              </div>
              <div className="pt-2">
                <h3 className="font-display text-display-sm text-ink-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal-600">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
