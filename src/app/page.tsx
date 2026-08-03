import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { ProudlyPartneringWith } from "@/components/home/proudly-partnering-with";
import { QualityMaterials } from "@/components/home/quality-materials";
import { TrustMetrics } from "@/components/home/trust-metrics";
import { FeaturedServices } from "@/components/home/featured-services";
import { SlaytonStandard } from "@/components/home/slayton-standard";
import { EducationSection } from "@/components/home/education-section";
import { ProcessSection } from "@/components/home/process-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ServiceAreaSection } from "@/components/home/service-area-section";
import { FaqSection } from "@/components/home/faq-section";
import { ContactSection } from "@/components/home/contact-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Icon, type IconName } from "@/components/brand/icon";
import { whyChoose } from "@/config/homepage";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

/**
 * ─────────────────────────────────────────────────────────────────
 * HOMEPAGE — Phase 5 (trust, social proof & premium conversion)
 *
 *   1. Hero — illuminated logo, motto, mission, Matthew 20:28
 *   2. Proudly Partnering With — partner marquee (self-hides
 *      while src/config/partners.ts is empty)
 *   3. Quality Materials — manufacturer ledger with disclaimer
 *   4. Trust Metrics — counters band (placeholder-badged)
 *   5. Featured Services — 13 curated icon cards, live links
 *   6. The Slayton Standard — flagship sticky-editorial ledger
 *   7. Why Homeowners Choose Us — 8 icon pillars
 *   8. Homeowner Education — Learning Center previews
 *   9. Our Process — cinematic illustrated five-stage timeline
 *  10. Featured Projects — before/after hover cards + slider
 *  11. Reviews — multi-source showcase (Google/FB/Website)
 *  12. Service Area — county-aware interactive map
 *  13. FAQ — accordion + FAQPage schema
 *  14. Contact Experience — inquiry form + phone + Instagram
 *
 * Server Components except: carousel/showcase, map, accordion,
 * slider, the marquee island, and the inquiry form. Content:
 * src/config/homepage.ts (+ partners.ts for the marquee).
 * ─────────────────────────────────────────────────────────────────
 */

export const metadata: Metadata = createPageMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProudlyPartneringWith />
      <QualityMaterials />
      <TrustMetrics />
      <FeaturedServices />
      <SlaytonStandard />
      <FeatureGrid
        eyebrow={whyChoose.eyebrow}
        title={whyChoose.title}
        lede={whyChoose.lede}
        items={whyChoose.pillars.map((pillar) => ({
          icon: <Icon name={pillar.icon as IconName} />,
          title: pillar.title,
          description: pillar.description,
        }))}
        columns={4}
        tone="light"
      />
      <EducationSection />
      <ProcessSection />
      <FeaturedProjects />
      <ReviewsSection />
      <ServiceAreaSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
