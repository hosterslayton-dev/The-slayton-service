import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta } from "@/components/home/final-cta";
import { StandardStrip } from "@/components/services/service-sections";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

/**
 * GALLERY — /gallery (Phase 6). Server shell around the client
 * explorer; the config in src/config/gallery.ts is the single
 * content source.
 */

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Project photography from The Slayton Service — remodeling, roofing, flooring, exterior work, and before & after comparisons across Middle Tennessee.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <Hero
        eyebrow="Our Work"
        title="Craftsmanship, documented"
        lede="Filter by category, search by service or city, and step through before & after comparisons as our project record grows."
        actions={
          <Button href={siteConfig.contact.phoneHref} variant="outline-light">
            Call {siteConfig.contact.phoneDisplay}
          </Button>
        }
        compact
      />
      <Section tone="light">
        <Container>
          <Breadcrumbs
            className="mb-10"
            items={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
          />
          <GalleryExplorer />
        </Container>
      </Section>
      <StandardStrip />
      <FinalCta />
    </>
  );
}
