import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ReviewsShowcase } from "./reviews-showcase";
import { reviewsShowcase } from "@/config/homepage";

/** Reviews band: server wrapper, client showcase inside. */
export function ReviewsSection() {
  return (
    <Section tone="dark" id="reviews" className="scroll-mt-header">
      <Container>
        <SectionHeading
          eyebrow={reviewsShowcase.eyebrow}
          title={reviewsShowcase.title}
          lede={reviewsShowcase.lede}
          onDark
        />
        <ReviewsShowcase className="mt-12" />
      </Container>
    </Section>
  );
}
