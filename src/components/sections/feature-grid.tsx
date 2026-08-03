import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "./section-heading";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";

/**
 * Heading + responsive grid of FeatureCards with a gentle stagger
 * ("Why Choose Us", Trust Center values).
 */
export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureGrid({
  eyebrow,
  title,
  lede,
  items,
  tone = "light",
  columns = 4,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  items: FeatureItem[];
  tone?: "light" | "dark";
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const onDark = tone === "dark";
  const gridCols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <Section tone={tone} className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} onDark={onDark} />
        <ul className={`mt-12 grid list-none gap-5 ${gridCols}`}>
          {items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={Math.min(index, 5) * 90}>
              <FeatureCard {...item} onDark={onDark} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
