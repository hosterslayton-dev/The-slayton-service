import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Shared card chrome: warm surface, soft elevation, hover lift.
 * When `href` is set the entire card is one link (a single tab
 * stop — no nested links inside linked cards).
 */
export function BaseCard({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "group block overflow-hidden rounded-card bg-cream-50 shadow-card transition-all duration-300 ease-premium",
    href && "hover:shadow-card-hover motion-safe:hover:-translate-y-1",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <article className={classes}>{children}</article>;
}

/** 4:3 image slot with graceful no-image fallback. */
export function CardMedia({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-tan-200", className)}>
      {children ?? (
        <div aria-hidden="true" className="flex h-full items-center justify-center">
          <span className="font-display text-3xl text-tan-400">TS</span>
        </div>
      )}
    </div>
  );
}
