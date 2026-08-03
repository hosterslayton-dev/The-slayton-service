import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Two-column media + content section, alternating sides down a
 * page. Media stacks above content on mobile; the DOM order keeps
 * content first for assistive tech regardless of visual side.
 */
export function SplitSection({
  media,
  mediaSide = "left",
  tone = "light",
  children,
  className,
}: {
  media: React.ReactNode;
  mediaSide?: "left" | "right";
  tone?: "light" | "dark" | "tan";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Section tone={tone} className={className}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn(mediaSide === "left" && "lg:order-first", mediaSide === "right" && "lg:order-last", "order-first")}>
            <div className="overflow-hidden rounded-card">{media}</div>
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
