import type { Metadata } from "next";
import { Icon } from "@/components/brand/icon";
import { ServiceCard } from "@/components/cards/service-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Hero } from "@/components/sections/hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta } from "@/components/home/final-cta";
import { StandardStrip } from "@/components/services/service-sections";
import { getServiceContent } from "@/config/service-content";
import { getServicesByCategory, services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { jsonLdString } from "@/lib/schema";

/**
 * ─────────────────────────────────────────────────────────────────
 * SERVICES INDEX — /services (Phase 6)
 *
 * The complete authoritative catalog grouped by category; every
 * card links to its dedicated /services/[slug] page. Card anchors
 * (id per slug) are preserved so earlier /services#slug links
 * continue to land correctly. ItemList schema covers the catalog.
 * ─────────────────────────────────────────────────────────────────
 */

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore all 31 home services from The Slayton Service — remodeling, roofing, flooring, painting, exterior care, crawlspace and moisture control, maintenance, and more across Middle Tennessee.",
  path: "/services",
});

export default function ServicesPage() {
  const groups = [...getServicesByCategory().entries()];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Slayton Service — Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  };

  return (
    <>
      <Hero
        eyebrow="Our Services"
        title="Every service your home needs, under one trusted name"
        lede="Thirty-one ways we protect, improve, and maintain Middle Tennessee homes — each held to The Slayton Standard, each beginning with honest recommendations."
        actions={
          <>
            <Button href="/#begin-your-home-journey" variant="primary">
              Request Your Free Estimate
            </Button>
            <Button href={siteConfig.contact.phoneHref} variant="outline-light">
              Call {siteConfig.contact.phoneDisplay}
            </Button>
          </>
        }
        compact
      />

      <Section tone="light">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
            className="mb-12"
          />

          <div className="flex flex-col gap-16">
            {groups.map(([category, categoryServices]) => (
              <div key={category}>
                <h2 className="font-display text-display-md text-ink-900">
                  {category}
                </h2>
                <div className="mt-2 h-px w-16 bg-gold-500" aria-hidden="true" />
                <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service, index) => {
                    const content = getServiceContent(service.slug);
                    return (
                      <Reveal
                        as="li"
                        key={service.slug}
                        delay={Math.min(index % 3, 5) * 80}
                        id={service.slug}
                        className="scroll-mt-28"
                      >
                        <ServiceCard
                          service={service}
                          description={content?.summary}
                          icon={content ? <Icon name={content.icon} /> : undefined}
                          href={`/services/${service.slug}`}
                          className="h-full"
                        />
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <StandardStrip />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
    </>
  );
}
