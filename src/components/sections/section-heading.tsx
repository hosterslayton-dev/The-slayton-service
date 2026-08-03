import { cn } from "@/lib/utils";

/**
 * Standard section opener: eyebrow + display heading + optional
 * lede, centered or start-aligned. Keeps the heading hierarchy and
 * rhythm identical across the whole platform.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  onDark = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "center" | "start";
  onDark?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "start" && "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", onDark && "eyebrow-on-dark")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          "mt-3 font-display text-display-md",
          onDark ? "text-cream-100" : "text-ink-900",
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-cream-100/75" : "text-charcoal-600",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
