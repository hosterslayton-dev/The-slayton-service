import { AnimatedCounter } from "@/components/motion/animated-counter";
import { cn } from "@/lib/utils";

/**
 * Statistic card. Numbers count up on reveal (final value renders
 * immediately under reduced motion). Only verified figures belong
 * here — never invented social proof.
 */
export function StatCard({
  value,
  prefix,
  suffix,
  label,
  onDark = false,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "font-display text-display-lg",
          onDark ? "text-gold-300" : "text-gold-700",
        )}
      >
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
      <p
        className={cn(
          "mt-2 font-nav text-xs tracking-label uppercase",
          onDark ? "text-cream-100/70" : "text-charcoal-600",
        )}
      >
        {label}
      </p>
    </div>
  );
}
