import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Person avatar with initials fallback. Used by testimonials and,
 * later, portal messaging. Decorative when a visible name sits
 * beside it (empty alt); otherwise the name becomes the alt text.
 */
interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  /** Set false when no visible name accompanies the avatar. */
  decorative?: boolean;
  className?: string;
}

const sizes = { sm: "h-9 w-9 text-xs", md: "h-12 w-12 text-sm", lg: "h-16 w-16 text-base" };
const px = { sm: 36, md: 48, lg: 64 };

export function Avatar({ name, src, size = "md", decorative = true, className }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={decorative ? "" : name}
        width={px[size]}
        height={px[size]}
        className={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <span
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : name}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-charcoal-800 font-nav font-semibold text-gold-300",
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
