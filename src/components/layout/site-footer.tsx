import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { estimateCta, getFooterQuickLinks } from "@/config/navigation";
import { getFeaturedServices } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * ─────────────────────────────────────────────────────────────────
 * SITE FOOTER
 *
 * Required contents (Parts 2 & 3, merged): official logo, motto,
 * Matthew 20:28 displayed tastefully, quick links, services,
 * contact information, Instagram, Facebook placeholder, business
 * hours, copyright, and Privacy / Accessibility links.
 *
 * Server component — zero client JavaScript. The logo links home;
 * featured services link to their live detail pages (Phase 6);
 * quick links come from the same phase-gated navigation config as
 * the header. Facebook renders as a non-linked placeholder until an
 * official page URL exists.
 * ─────────────────────────────────────────────────────────────────
 */

export function SiteFooter() {
  const year = new Date().getFullYear();
  const quickLinks = getFooterQuickLinks();
  const featuredServices = getFeaturedServices().slice(0, 8);
  const { contact, social, businessHours } = siteConfig;

  return (
    <footer className="bg-ink-950 text-cream-100">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        {/* Brand block */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — back to home`}
            className="rounded-sm"
          >
            <Logo variant="light" width={220} />
          </Link>
          <p className="mt-6 font-display text-xl leading-relaxed text-cream-100">
            {siteConfig.motto.lineOne}
            <br />
            {siteConfig.motto.lineTwo}
          </p>
          <p className="mt-4 font-nav text-xs tracking-label text-gold-300 uppercase">
            {siteConfig.scripture.reference}
          </p>
        </div>

        <hr className="mt-12 border-charcoal-700" />

        {/* Link columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer quick links">
            <h2 className="font-nav text-xs font-semibold tracking-label text-tan-400 uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-100/80 transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={estimateCta.href}
                  className="text-sm text-cream-100/80 transition-colors hover:text-gold-300"
                >
                  Request a Free Estimate
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-nav text-xs font-semibold tracking-label text-tan-400 uppercase">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-cream-100/80 transition-colors hover:text-gold-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-nav text-xs font-semibold tracking-label text-tan-400 uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/80">
              <li>
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-gold-300"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              {contact.email ? (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-gold-300"
                  >
                    {contact.email}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={social.instagram.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="transition-colors hover:text-gold-300"
                >
                  Instagram — {social.instagram.handle}
                </a>
              </li>
              {/* Facebook placeholder per specification; becomes a link
                  once the official page URL is provided. */}
              <li aria-label="Facebook — coming soon">Facebook — coming soon</li>
              <li className="pt-1 text-cream-100/60">
                Serving {siteConfig.serviceAreas.region}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-nav text-xs font-semibold tracking-label text-tan-400 uppercase">
              Business Hours
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/80">
              {businessHours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span className="text-cream-100/60">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-charcoal-700 pt-8 text-xs text-cream-100/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-5">
            {/* Routes ship with the compliance phase; rendered as text
                until then so the footer never links to a 404. */}
            <span>Privacy Policy</span>
            <span>Accessibility Statement</span>
            <Link
              href="/admin"
              className="text-cream-100/40 transition-colors hover:text-cream-100/70"
            >
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
