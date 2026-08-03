import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * SEO FRAMEWORK
 *
 * Central metadata construction so every route in every future phase
 * inherits consistent titles, canonical URLs, Open Graph, and
 * Twitter/X cards from one place (Part 6 SEO requirements).
 * ─────────────────────────────────────────────────────────────────
 */

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetadataInput {
  title?: string;
  description?: string;
  /** Route path used for the canonical URL, e.g. "/services". */
  path?: string;
  /** Set true for routes that must not be indexed (portal, drafts). */
  noIndex?: boolean;
}

/**
 * Build per-page metadata. The root layout supplies the title
 * template ("%s · The Slayton Service") and metadataBase; this
 * helper layers page specifics on top.
 */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? siteConfig.name,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
