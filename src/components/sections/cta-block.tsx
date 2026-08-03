import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Closing call-to-action band. Invitational by constitution: no
 * countdowns, no scarcity, no pressure — an honest next step.
 */
export function CtaBlock({
  eyebrow,
  title,
  lede,
  actions,
  footnote,
  tone = "dark",
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  actions: React.ReactNode;
  footnote?: string;
  tone?: "dark" | "tan";
  id?: string;
  className?: string;
}) {
  const onDark = tone === "dark";
  return (
    <Section tone={tone} id={id} className={cn("scroll-mt-header", className)}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? (
            <p className={cn("eyebrow", onDark && "eyebrow-on-dark")}>{eyebrow}</p>
          ) : null}
          <h2 className={cn("mt-4 font-display text-display-md", onDark ? "text-cream-100" : "text-ink-900")}>
            {title}
          </h2>
          {lede ? (
            <p className={cn("mt-5 text-lg leading-relaxed", onDark ? "text-cream-100/75" : "text-charcoal-600")}>
              {lede}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">{actions}</div>
          {footnote ? (
            <p className={cn("mt-8 text-sm", onDark ? "text-cream-100/60" : "text-charcoal-500")}>
              {footnote}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
