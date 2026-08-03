import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { trustMetrics } from "@/config/homepage";

/**
 * ─────────────────────────────────────────────────────────────────
 * TRUST METRICS — quiet numbers band beneath the hero
 *
 * Counters animate on reveal (instant under reduced motion).
 * Constitutional guard: while `trustMetrics.verified` is false the
 * section carries a visible "Illustrative" badge — real, verified
 * values replace the placeholders in config; the badge is removed
 * only by flipping the flag, never by deleting the label.
 * ─────────────────────────────────────────────────────────────────
 */
export function TrustMetrics() {
  const { metrics, verified } = trustMetrics;

  return (
    <section
      aria-label="Company at a glance"
      className="border-b border-tan-200 bg-cream-50 py-14"
    >
      <Container>
        {!verified ? (
          <div className="mb-8 flex justify-center">
            <Badge tone="warning">
              Illustrative placeholders — verified numbers coming as we grow
            </Badge>
          </div>
        ) : null}
        <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((metric, index) => (
            <Reveal
              as="li"
              key={metric.label}
              effect="fade"
              delay={Math.min(index, 5) * 70}
              className="text-center"
            >
              <p className="font-display text-display-md text-gold-700">
                {"display" in metric && metric.display ? (
                  metric.display
                ) : (
                  <AnimatedCounter
                    value={"value" in metric ? metric.value : 0}
                    suffix={"suffix" in metric ? metric.suffix : undefined}
                  />
                )}
              </p>
              <p className="mt-2 font-nav text-[0.7rem] tracking-label text-charcoal-600 uppercase">
                {metric.label}
              </p>
              {"note" in metric && metric.note ? (
                <p className="mt-1 text-xs text-charcoal-500 italic">{metric.note}</p>
              ) : null}
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 text-center font-display text-lg text-charcoal-600 italic">
          Serving {siteConfig.serviceAreas.region} — {siteConfig.motto.lineOne}{" "}
          {siteConfig.motto.lineTwo}
        </p>
      </Container>
    </section>
  );
}
