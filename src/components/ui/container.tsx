import { cn } from "@/lib/utils";

/**
 * Standard page gutter and max width. Every section uses this so
 * horizontal rhythm stays identical across the platform.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
