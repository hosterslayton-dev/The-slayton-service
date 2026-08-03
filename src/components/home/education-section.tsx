import { Icon, type IconName } from "@/components/brand/icon";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { educationTopics } from "@/config/homepage";

/**
 * ─────────────────────────────────────────────────────────────────
 * HOMEOWNER EDUCATION — Learning Center preview (Part 7)
 *
 * Education before promotion, on the homepage itself: seven topic
 * cards whose teasers already deliver real guidance. Cards are
 * intentionally unlinked (the Learning Center routes don't exist
 * yet — never a dead link); their slugs are reserved so each card
 * becomes a live article link the day that phase ships.
 * ─────────────────────────────────────────────────────────────────
 */
export function EducationSection() {
  return (
    <Section tone="light" id="homeowner-education" className="scroll-mt-header">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <Badge tone="gold">Learning Center · Coming Soon</Badge>
          <SectionHeading
            eyebrow={educationTopics.eyebrow}
            title={educationTopics.title}
            lede={educationTopics.lede}
          />
        </div>
        <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {educationTopics.topics.map((topic, index) => (
            <Reveal
              as="li"
              key={topic.slug}
              delay={Math.min(index % 3, 5) * 90}
              className={index === 6 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <article className="flex h-full flex-col rounded-card border border-tan-200 bg-cream-50 p-6">
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-tan-200/70 text-charcoal-700 [&>svg]:h-5 [&>svg]:w-5"
                >
                  <Icon name={topic.icon as IconName} />
                </span>
                <h3 className="mt-4 font-display text-xl text-ink-900">{topic.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal-600">
                  {topic.teaser}
                </p>
                <p className="mt-4 font-nav text-[0.7rem] tracking-label text-charcoal-500 uppercase">
                  Full guide coming to the Learning Center
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
