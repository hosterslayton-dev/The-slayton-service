import { ServiceCard } from "@/components/cards/service-card";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { featuredServiceContent } from "@/config/homepage";
import { getFeaturedServices } from "@/config/services";
import { serviceImages } from "@/config/service-images";

/**
 * Featured services — the curated subset from the authoritative
 * catalog. Every "Learn more" links to that service's dedicated
 * /services/[slug] page.
 */
export function FeaturedServices() {
  const featured = getFeaturedServices();

  return (
    <Section tone="light" id="featured-services" className="scroll-mt-header">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Every service your home needs, under one trusted name"
          lede="From a single repair to a whole-home renovation — the same craftsmanship, the same honesty, the same standard."
        />
        <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => {
            const content = featuredServiceContent[service.slug];
            return (
              <Reveal as="li" key={service.slug} delay={Math.min(index % 3, 5) * 90}>
                <ServiceCard
                  service={service}
                  description={content?.description}
                  media={<div className="relative h-52 w-full"><Image src={serviceImages[service.slug]!.src} alt={serviceImages[service.slug]!.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>}
                  href={`/services/${service.slug}`}
                />
              </Reveal>
            );
          })}
        </ul>
        <div className="mt-12 flex justify-center">
          <Button href="/services" variant="outline">
            View All 31 Services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
