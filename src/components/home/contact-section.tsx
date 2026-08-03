import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactExperience } from "./contact-experience";
import { contactExperience, finalCta } from "@/config/homepage";

/**
 * The redesigned homepage close: heading + the contact experience
 * (form + human column). Owns the #begin-your-home-journey anchor
 * that every estimate CTA targets.
 */
export function ContactSection() {
  return (
    <Section
      tone="dark"
      id="begin-your-home-journey"
      className="scroll-mt-header"
    >
      <Container>
        <SectionHeading
          eyebrow={contactExperience.eyebrow}
          title={contactExperience.title}
          lede={contactExperience.lede}
          onDark
        />
        <div className="mt-12">
          <ContactExperience />
        </div>
        <p className="mt-12 text-center text-sm text-cream-100/55">
          {finalCta.footnote}
        </p>
      </Container>
    </Section>
  );
}
