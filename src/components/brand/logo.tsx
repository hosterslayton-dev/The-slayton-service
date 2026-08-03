import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * OFFICIAL LOGO
 *
 * Uses ONLY the official uploaded artwork (Brand Consolidation
 * Specification). The files in /public/brand are non-destructive
 * derivations of the original upload:
 *
 *   logo-original.png  — the upload, untouched, kept for reference
 *   logo-primary.png   — padding trimmed, background made
 *                        transparent; stroke geometry identical
 *   logo-reversed.png  — same geometry knocked out to white for
 *                        dark surfaces (standard reversed variation)
 *
 * The cross in the "t" is preserved exactly. Nothing is redrawn,
 * recreated, or distorted; `Image` receives the true aspect ratio
 * (596 × 305) so proportions can never warp.
 * ─────────────────────────────────────────────────────────────────
 */

const LOGO_WIDTH = 596;
const LOGO_HEIGHT = 305;

interface LogoProps {
  /** "dark" ink for light surfaces; "light" for dark surfaces. */
  variant?: "dark" | "light";
  /** Rendered pixel width; height derives from the true ratio. */
  width?: number;
  className?: string;
  /** Set for above-the-fold placements (header, hero). */
  priority?: boolean;
}

export function Logo({
  variant = "dark",
  width = 180,
  className,
  priority = false,
}: LogoProps) {
  const src =
    variant === "dark" ? "/brand/logo-primary.png" : "/brand/logo-reversed.png";
  const height = Math.round(width * (LOGO_HEIGHT / LOGO_WIDTH));

  return (
    <Image
      src={src}
      alt={siteConfig.name}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto select-none", className)}
    />
  );
}
