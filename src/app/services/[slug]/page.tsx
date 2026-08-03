import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FinalCta } from "@/components/home/final-cta";
import {
  RelatedServices,
  ServiceFaqSection,
  ServiceGallery,
  ServiceOverview,
  ServiceProcess,
  StandardStrip,
} from "@/components/services/service-sections";
import { getRelatedServices, getServiceContent } from "@/config/service-content";
import { getServiceBySlug, services } from "@/config/services";
import { serviceImages } from "@/config/service-images";
import { siteConfig } from "@/config/site";
import { jsonLdString } from "@/lib/schema";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

/**
 * ─────────────────────────────────────────────────────────────────
 * SERVICE DETAIL — /services/[slug] (Phase 6)
 *
 * Statically generated for all 31 catalog services. Composition:
 * hero → breadcrumbs → overview + benefits → standard strip →
 * process → gallery (self-hides while config imagery is empty) →
 * FAQ (+FAQPage schema) → related services → estimate CTA.
 * Local SEO: per-service metadata/canonical + Service JSON-LD with
 * areaServed; BreadcrumbList emitted by the Breadcrumbs component.
 * ─────────────────────────────────────────────────────────────────
 */

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const content = getServiceContent(slug);
  if (!service || !content) return {};

  return createPageMetadata({
    title: `${service.name} — Middle Tennessee`,
    description: `${content.summary} Serving ${siteConfig.serviceAreas.cities.slice(0, 4).join(", ")} and surrounding Middle Tennessee communities. Free estimates from The Slayton Service.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const content = getServiceContent(slug);
  if (!service || !content) notFound();

  const related = getRelatedServices(slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.name,
    serviceType: service.name,
    description: content.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: siteConfig.serviceAreas.cities.map((city) => ({
      "@type": "City",
      name: `${city}, Tennessee`,
    })),
  };

  return (
    <>
      <Hero
        eyebrow={service.category}
        title={service.name}
        lede={content.summary}
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
        image={serviceImages[service.slug]}
        compact
      />

      <div className="bg-cream-100">
        <Container>
          <Breadcrumbs
            className="py-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />
        </Container>
      </div>

      <ServiceOverview service={service} content={content} />
      <StandardStrip />
      <ServiceProcess service={service} />
      <ServiceGallery service={service} content={content} />
      <ServiceFaqSection service={service} content={content} />
      <RelatedServices related={related} />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceJsonLd) }}
      />
    </>
  );
}
