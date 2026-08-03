import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";

/**
 * Generic heading + card-grid shell for service, project, and
 * journal listings. Accepts any card children so listing pages
 * stay declarative.
 */
export function ContentGrid({
  eyebrow,
  title,
  lede,
  tone = "light",
  columns = 3,
  action,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark" | "tan";
  columns?: 2 | 3 | 4;
  action?: React.ReactNode;
  children: React.ReactNode[];
  className?: string;
}) {
  const gridCols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <Section tone={tone} className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} onDark={tone === "dark"} />
        <ul className={`mt-12 grid list-none gap-5 ${gridCols}`}>
          {children.map((child, index) => (
            <Reveal as="li" key={index} delay={Math.min(index, 5) * 90}>
              {child}
            </Reveal>
          ))}
        </ul>
        {action ? <div className="mt-12 flex justify-center">{action}</div> : null}
      </Container>
    </Section>
  );
}
