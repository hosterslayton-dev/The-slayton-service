import { PartnerMarquee } from "@/components/home/partner-marquee";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getMarqueePartners } from "@/config/partners";

/**
 * ─────────────────────────────────────────────────────────────────
 * PROUDLY PARTNERING WITH — homepage partner band
 *
 * Sits immediately below the hero. Server component: the heading
 * and data resolution ship zero client JavaScript; only the
 * marquee island hydrates (pause control + focus handling). All
 * content derives from src/config/partners.ts — no logo paths or
 * names live in component code.
 *
 * Constitutional behavior: with an empty partner list the section
 * returns null and the homepage flows from the hero straight into
 * Trust Metrics — an empty or padded-out band never renders. While
 * labeled sample entries remain, a visible notice accompanies the
 * strip (gallery precedent).
 * ─────────────────────────────────────────────────────────────────
 */
export function ProudlyPartneringWith() {
  const partners = getMarqueePartners();
  if (partners.length === 0) return null;

  return (
    <Section tone="light" className="border-b border-tan-200 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Partners"
          title="Proudly Partnering With"
          lede="We proudly partner with trusted manufacturers, suppliers, and organizations that share our commitment to craftsmanship, integrity, and lasting quality."
        />
      </Container>
      <div className="mt-10 sm:mt-12">
        <PartnerMarquee partners={partners} />
      </div>
    </Section>
  );
}
