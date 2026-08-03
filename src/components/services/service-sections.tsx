import Image from "next/image";
import { Icon, type IconName } from "@/components/brand/icon";
import { ServiceCard } from "@/components/cards/service-card";
import { BeforeAfterSlider } from "@/components/media/before-after-slider";
import { ImageGallery } from "@/components/media/image-gallery";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { categoryProcess, getServiceContent, type ServiceContent } from "@/config/service-content";
import { slaytonStandard } from "@/config/homepage";
import { jsonLdString } from "@/lib/schema";
import type { Service } from "@/config/services";
import { representativeBeforeAfter, serviceImages } from "@/config/service-images";

/**
 * ─────────────────────────────────────────────────────────────────
 * SERVICE DETAIL SECTIONS (Phase 6)
 *
 * Server components composed by /services/[slug]. Content flows
 * from src/config/service-content.ts; the gallery section renders
 * only when real imagery exists in config (it self-hides while
 * empty — architecture live, nothing faked).
 * ─────────────────────────────────────────────────────────────────
 */

export function ServiceOverview({
  service,
  content,
}: {
  service: Service;
  content: ServiceContent;
}) {
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{service.category}</p>
            <h2 className="mt-3 font-display text-display-md text-ink-900">
              What this service really covers
            </h2>
            <p className="prose-width mt-5 text-lg leading-relaxed text-charcoal-600">
              {content.overview}
            </p>
          </div>
          <div className="space-y-6 lg:mt-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
              <Image src={serviceImages[service.slug]!.src} alt={serviceImages[service.slug]!.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </div>
            <div className="rounded-card bg-cream-50 p-7 shadow-card">
            <h3 className="font-nav text-xs font-semibold tracking-label text-gold-700 uppercase">
              Why homeowners choose this
            </h3>
            <ul className="mt-5 flex list-none flex-col gap-3.5">
              {content.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 [&>svg]:h-3.5 [&>svg]:w-3.5"
                  >
                    <Icon name="check" />
                  </span>
                  <span className="text-sm leading-relaxed text-charcoal-700">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ServiceProcess({ service }: { service: Service }) {
  const steps = categoryProcess[service.category];
  return (
    <Section tone="tan">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title={`${service.name}, step by step`}
          lede="The same unhurried process as every Slayton project — you always know where things stand."
        />
        <ol className="mx-auto mt-12 grid max-w-4xl list-none gap-6 sm:grid-cols-2">
          {steps.map((step, index) => (
            <Reveal as="li" key={step} delay={Math.min(index, 3) * 90}>
              <div className="flex h-full gap-4 rounded-card bg-cream-50 p-6 shadow-card">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 font-display text-base text-ink-950"
                >
                  {index + 1}
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-charcoal-700">{step}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** Renders only when real project imagery exists in config. */
export function ServiceGallery({
  service,
  content,
}: {
  service: Service;
  content: ServiceContent;
}) {
  const gallery = (content.gallery?.length ?? 0) > 0 ? content.gallery! : [serviceImages[service.slug]!];
  const pairs = (content.beforeAfter?.length ?? 0) > 0 ? content.beforeAfter! : representativeBeforeAfter[service.slug] ? [representativeBeforeAfter[service.slug]!] : [];
  const hasImages = gallery.length > 0;
  const hasPairs = pairs.length > 0;

  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          eyebrow="Renovation Inspiration"
          title={`${service.name} possibilities`}
          lede="High-quality representative imagery showing the kind of finish and care this service can deliver."
        />
        {hasPairs ? (
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            {pairs.map((pair, index) => (
              <Reveal key={index} delay={Math.min(index, 3) * 90}>
                <BeforeAfterSlider pair={pair} />
              </Reveal>
            ))}
          </div>
        ) : null}
        {hasImages ? (
          <div className="mt-12">
            <ImageGallery images={gallery} />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export function ServiceFaqSection({
  service,
  content,
}: {
  service: Service;
  content: ServiceContent;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <Section tone="light">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Honest Answers"
            title={`${service.name} questions, answered plainly`}
          />
          <Accordion
            className="mt-10"
            headingLevel={3}
            items={content.faqs.map((faq, index) => ({
              id: `faq-${index}`,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
      </Container>
    </Section>
  );
}

export function RelatedServices({ related }: { related: Service[] }) {
  if (related.length === 0) return null;
  return (
    <Section tone="tan">
      <Container>
        <SectionHeading
          eyebrow="Related Services"
          title="Often paired with this work"
        />
        <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((service, index) => {
            const content = getServiceContent(service.slug);
            return (
              <Reveal as="li" key={service.slug} delay={Math.min(index, 3) * 90}>
                <ServiceCard
                  service={service}
                  description={content?.summary}
                  icon={content ? <Icon name={content.icon} /> : undefined}
                  href={`/services/${service.slug}`}
                />
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/** Compact Slayton Standard assurance strip for interior pages. */
export function StandardStrip() {
  const promises = slaytonStandard.promises.slice(0, 4);
  return (
    <section
      aria-label="The Slayton Standard"
      className="border-y border-cream-100/10 bg-ink-950 py-10 text-cream-100"
    >
      <Container>
        <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((promise) => (
            <li key={promise.title} className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/35 text-gold-300 [&>svg]:h-4.5 [&>svg]:w-4.5"
              >
                <Icon name={promise.icon as IconName} />
              </span>
              <span className="font-nav text-xs font-medium tracking-nav text-cream-100/85 uppercase">
                {promise.title}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
