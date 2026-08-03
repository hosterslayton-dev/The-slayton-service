import { cn } from "@/lib/utils";

/**
 * Vertical rhythm primitive. Sections own their tone ("light",
 * "dark", "tan") so backgrounds and text colors stay consistent and
 * accessible without per-page overrides.
 */
type Tone = "light" | "dark" | "tan";

const toneClasses: Record<Tone, string> = {
  light: "bg-cream-100 text-ink-900",
  dark: "bg-ink-950 text-cream-100",
  tan: "bg-tan-200 text-ink-900",
};

export function Section({
  tone = "light",
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"section"> & { tone?: Tone }) {
  return (
    <section className={cn("py-16 sm:py-24", toneClasses[tone], className)} {...rest}>
      {children}
    </section>
  );
}
