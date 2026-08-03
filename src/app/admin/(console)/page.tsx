import {
  ConsoleCard,
  ReadinessList,
  type ReadinessCheck,
} from "@/components/admin/console";
import { galleryItems } from "@/config/gallery";
import { faqPreview, reviewsShowcase, trustMetrics } from "@/config/homepage";
import { materialCategories } from "@/config/materials";
import { partners } from "@/config/partners";
import { projects } from "@/config/projects";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * ADMIN DASHBOARD — /admin
 *
 * A working operations console for a config-driven site: every
 * number and status below is read live from the configuration and
 * environment at request time, so this page doubles as the
 * production launch checklist. Content edits happen in the config
 * files it points to; in-console editing (uploads, reordering,
 * copy changes) ships with the content-backend phase and is listed
 * on the roadmap rather than mocked here.
 * ─────────────────────────────────────────────────────────────────
 */
export default function AdminDashboardPage() {
  const inquiryEmailReady = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.INQUIRY_EMAIL_TO &&
      process.env.INQUIRY_EMAIL_FROM,
  );
  const inquiryReady = inquiryEmailReady || Boolean(process.env.INQUIRY_WEBHOOK_URL);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const partnersMissingUrls = partners.filter((partner) => !partner.url);
  const sampleGalleryCount = galleryItems.filter((item) => item.sample).length;

  const checks: ReadinessCheck[] = [
    {
      label: "Canonical site URL configured",
      ready: siteUrl.startsWith("https://"),
      remedy: "Set NEXT_PUBLIC_SITE_URL to the production https:// domain.",
    },
    {
      label: "Estimate inquiry delivery connected",
      ready: inquiryReady,
      remedy:
        "Set RESEND_API_KEY + INQUIRY_EMAIL_TO + INQUIRY_EMAIL_FROM (or INQUIRY_WEBHOOK_URL). Until then the form honestly routes visitors to phone and Instagram.",
    },
    {
      label: "Public contact email configured",
      ready: Boolean(siteConfig.contact.email),
      remedy: "Set NEXT_PUBLIC_CONTACT_EMAIL; email CTAs stay hidden while empty.",
    },
    {
      label: "Google Analytics connected",
      ready: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      remedy: "Set NEXT_PUBLIC_GA_MEASUREMENT_ID (G-XXXXXXX) to enable analytics.",
    },
    {
      label: "Search Console verification set",
      ready: Boolean(process.env.GOOGLE_SITE_VERIFICATION),
      remedy:
        "Set GOOGLE_SITE_VERIFICATION with the meta-tag token from Google Search Console.",
    },
    {
      label: "Every partner links to its official site",
      ready: partnersMissingUrls.length === 0,
      remedy: "Add the confirmed url in src/config/partners.ts for:",
      detail: partnersMissingUrls.map((partner) => partner.name).join(", ") + ".",
    },
    {
      label: "Real project photography published",
      ready: sampleGalleryCount === 0,
      remedy: `Replace the labeled sample gallery entries by adding real project sets to src/config/projects.ts (${sampleGalleryCount} sample ${sampleGalleryCount === 1 ? "item" : "items"} showing).`,
    },
    {
      label: "Trust metrics verified",
      ready: trustMetrics.verified,
      remedy:
        "Enter verified figures in src/config/homepage.ts and flip trustMetrics.verified — the band is hard-labeled illustrative until then.",
    },
    {
      label: "Client video story filmed",
      ready: Boolean(reviewsShowcase.video.src),
      remedy:
        "Add the footage URL to reviewsShowcase.video.src in src/config/homepage.ts; the Video tab stays hidden until real footage exists.",
    },
    {
      label: "Facebook page linked",
      ready: Boolean(siteConfig.social.facebook.url),
      remedy:
        "Add the official page URL in src/config/site.ts; the footer shows a non-linked placeholder until then.",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <ReadinessList checks={checks} />

      <section aria-labelledby="content-heading">
        <h2 id="content-heading" className="font-display text-display-sm text-ink-900">
          Content inventory
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-600">
          Every surface below is data-driven. Edit the file shown, commit, and
          the site rebuilds — nothing is hard-coded in components. In-console
          editing arrives with the content backend on the roadmap.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ConsoleCard
            title="Services"
            description="The authoritative catalog plus each service's editorial content, process, and FAQs."
            count={services.length}
            countLabel="services"
            editPath={["src/config/services.ts", "src/config/service-content.ts"]}
            viewHref="/services"
          />
          <ConsoleCard
            title="Partners"
            description="Drop the logo in public/partners/, add one object with the confirmed name and official URL — the marquee updates automatically."
            count={partners.length}
            countLabel="partners"
            editPath="src/config/partners.ts"
            viewHref="/"
            viewLabel="View homepage"
          />
          <ConsoleCard
            title="Materials"
            description="Manufacturer ledger grouped by category. Keep only brands you genuinely install; each links to the official site."
            count={materialCategories.length}
            countLabel="categories"
            editPath="src/config/materials.ts"
            viewHref="/"
            viewLabel="View homepage"
          />
          <ConsoleCard
            title="Gallery & projects"
            description="Place photos in public/projects/<slug>/, add one project object, and gallery items, sliders, and filters derive automatically."
            count={galleryItems.length}
            countLabel="items"
            editPath={["src/config/projects.ts", "src/config/gallery.ts"]}
            viewHref="/gallery"
          >
            <p className="mt-3 text-xs text-charcoal-500">
              {projects.length} project {projects.length === 1 ? "set" : "sets"} ·{" "}
              {sampleGalleryCount} labeled sample{" "}
              {sampleGalleryCount === 1 ? "item" : "items"} remaining
            </p>
          </ConsoleCard>
          <ConsoleCard
            title="Homepage copy & FAQs"
            description="Hero, standard, process, education, reviews, FAQ, and contact copy — all externalized to one file."
            count={faqPreview.items.length}
            countLabel="FAQs"
            editPath="src/config/homepage.ts"
            viewHref="/"
          />
          <ConsoleCard
            title="Company information"
            description="Motto, phone, service areas, hours, and social handles. Every component reads identity from here."
            editPath="src/config/site.ts"
            viewHref="/#begin-your-home-journey"
            viewLabel="View contact"
          />
        </div>
      </section>
    </div>
  );
}
