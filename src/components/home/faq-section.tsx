import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { jsonLdString } from "@/lib/schema";
import { faqPreview } from "@/config/homepage";

/**
 * FAQ preview with FAQPage structured data (Part 6 SEO). Answers
 * come from approved specifications only — no invented claims.
 */
export function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPreview.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section tone="light" id="faq" className="scroll-mt-header">
      <Container>
        <SectionHeading eyebrow={faqPreview.eyebrow} title={faqPreview.title} />
        <div className="mx-auto mt-12 max-w-2xl">
          <Accordion
            items={faqPreview.items.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
            headingLevel={3}
          />
          <div className="mt-10 flex justify-center">
            <Button href="/#begin-your-home-journey" variant="text">
              Have a different question? Ask us directly
            </Button>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
      </Container>
    </Section>
  );
}
