import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * ─────────────────────────────────────────────────────────────────
 * STRUCTURED DATA (JSON-LD)
 *
 * Local-business schema for Middle Tennessee local SEO (Part 6).
 * Rendered once in the root layout so every page carries the
 * organization graph. Page-level schema (Service, FAQPage,
 * BreadcrumbList, Review) will be added by their own phases using
 * the same pattern.
 * ─────────────────────────────────────────────────────────────────
 */

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    slogan: `${siteConfig.motto.lineOne} ${siteConfig.motto.lineTwo}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo-primary.png"),
    image: absoluteUrl("/opengraph-image.png"),
    telephone: "+1-615-920-3891",
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    areaServed: [
      ...siteConfig.serviceAreas.cities.map((city) => ({
        "@type": "City",
        name: `${city}, Tennessee`,
      })),
      ...siteConfig.serviceAreas.counties.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county}, Tennessee`,
      })),
    ],
    sameAs: [siteConfig.social.instagram.url].filter(Boolean),
    priceRange: "$$",
  };
}

/** WebSite schema — rendered once in the root layout. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-US",
  };
}

/** Serialize JSON-LD safely for a <script> tag. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
