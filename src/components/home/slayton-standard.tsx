import { Icon, type IconName } from "@/components/brand/icon";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { slaytonStandard } from "@/config/homepage";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * THE SLAYTON STANDARD — flagship section (Phase 5)
 *
 * Architectural split: a sticky editorial column (title, lede, and
 * the scripture that grounds the promises) beside the seven
 * promises as an ordered ledger. Each promise row reveals in
 * sequence and carries a quiet hover state — icon ring warms,
 * ground lifts. Server component; motion is CSS via Reveal.
 * ─────────────────────────────────────────────────────────────────
 */
export function SlaytonStandard() {
  return (
    <Section tone="dark" id="slayton-standard" className="scroll-mt-header">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Editorial column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow eyebrow-on-dark">{slaytonStandard.eyebrow}</p>
            <h2 className="mt-4 font-display text-display-lg text-cream-100">
              {slaytonStandard.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream-100/70">
              {slaytonStandard.lede}
            </p>
            <figure className="mt-10 border-l-2 border-gold-500/40 pl-5">
              <blockquote className="font-display text-lg leading-relaxed text-cream-100/85 italic">
                &ldquo;Just as the Son of Man did not come to be served, but to
                serve&hellip;&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-nav text-xs tracking-label text-gold-300 uppercase">
                {siteConfig.scripture.reference}
              </figcaption>
            </figure>
          </div>

          {/* Promise ledger */}
          <ol className="list-none divide-y divide-cream-100/10 border-y border-cream-100/10">
            {slaytonStandard.promises.map((promise, index) => (
              <Reveal
                as="li"
                key={promise.title}
                delay={Math.min(index, 6) * 70}
                className="group"
              >
                <div className="flex gap-6 px-2 py-7 transition-colors duration-300 ease-premium group-hover:bg-cream-100/[0.03] sm:px-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-gold-500/35 text-gold-300 transition-all duration-300 ease-premium group-hover:border-gold-400/70 group-hover:bg-gold-500/10 [&>svg]:h-6 [&>svg]:w-6"
                  >
                    <Icon name={promise.icon as IconName} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-display-sm text-cream-100">
                        {promise.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="font-display text-sm text-gold-500/50 transition-colors duration-300 group-hover:text-gold-400/80"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-100/70">
                      {promise.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
