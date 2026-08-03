# The Slayton Service — Platform Architecture

> Phase 1 · Foundation
> Governing documents: Enterprise Project Constitution v2.0, Brand &
> Design Consolidation Specification, Parts 2–9.

## 1. What this codebase is

The production foundation for The Slayton Service Digital Platform —
one integrated ecosystem that will grow to include the marketing
website, Services, Project Library, Gallery, Trust Center, Home
Journal, Learning Center, Estimate System, Customer Portal, Digital
Home Binder, and (later) CRM, Admin Dashboard, AI Assistant, and a
mobile application.

Phase 1 delivers the base every one of those modules will stand on:
design tokens, typography, chrome, SEO/metadata framework, structured
data, error/loading surfaces, brand assets, and a restrained homepage
foundation that proves the system.

## 2. Technology

| Concern    | Choice                              | Why                                                                 |
| ---------- | ----------------------------------- | ------------------------------------------------------------------- |
| Framework  | Next.js 15 (App Router)             | Server Components by default, file-based routing, first-class SEO   |
| Language   | TypeScript (strict)                 | Long-lived platform; contracts over convention                      |
| Styling    | Tailwind CSS v4                     | Token-driven `@theme`; design system lives in one CSS file          |
| Fonts      | `next/font/google`                  | Self-hosted at build time; zero third-party requests; no CLS        |
| Quality    | ESLint 9 (flat) + Prettier          | `next/core-web-vitals` + `next/typescript`, Tailwind class sorting  |

## 3. Directory layout

```
src/
  app/                 Routes + route-level infrastructure
    layout.tsx         Fonts, global metadata, JSON-LD, chrome
    page.tsx           Homepage (Phase 1 foundation sections)
    globals.css        DESIGN TOKENS — single source of visual truth
    error.tsx          Route-segment error boundary
    global-error.tsx   Root-layout failure boundary
    loading.tsx        Route-transition loading UI
    not-found.tsx      404
    sitemap.ts         Derived from navigation config
    robots.ts          Pre-excludes future private modules
    manifest.ts        PWA manifest
    icon.png · apple-icon.png · opengraph-image.png · favicon.ico
  components/
    brand/             Logo (official artwork only)
    layout/            Header, footer, skip link, sticky mobile CTA
    ui/                Button, Container, Section primitives
  config/              site.ts · navigation.ts · services.ts
  lib/                 utils.ts · seo.ts · schema.ts
  types/               Forward-declared content contracts
content/               Editorial content home (Journal, projects — later phases)
public/brand/          Logo asset set
docs/                  This document
```

Planned route map (reserved, unrouted until their phases):
`/services/[slug]` · `/projects/[slug]` · `/gallery` · `/journal` ·
`/learn` · `/about` · `/service-areas` · `/careers` · `/begin`
(estimate flow) · `/portal` · `/admin`.

## 4. Major decisions

### 4.1 Config-driven identity and phase gating

`src/config` is the single source of truth for identity (motto, phone,
areas, hours), the full Part 5 information architecture, and the
authoritative Part 6 service catalog. Navigation items carry an
`implemented` flag; header, footer, and sitemap all filter on it, so
the chrome **can never link to a 404** during phased rollout, and
launching a module is a one-line flag flip plus its routes.

### 4.2 Design tokens in Tailwind v4 `@theme`

The entire brand system — matte black/charcoal/warm white/tan palette,
gold action accent, Playfair/Poppins/Inter roles, tracking, easing —
is declared once in `globals.css`. Components consume utilities
(`bg-cream-100`, `font-display`, `ease-premium`); no hex values appear
in components. A darker `gold-700` exists specifically so gold text on
warm white passes WCAG AA; brighter golds are reserved for dark
grounds and fills behind dark text.

### 4.3 Server-first components

Everything is a Server Component except `SiteHeader` (scroll-linked
glass effect + disclosure menu) and the error boundaries (framework
requirement). The footer, CTA bar, and homepage ship zero client
JavaScript.

### 4.4 Logo handling

Only the official uploaded artwork is used. `public/brand` holds the
untouched original plus two non-destructive derivations (padding
trimmed + transparent background; a white "reversed" knockout for dark
surfaces). Stroke geometry — including the cross in the "t" — is
pixel-identical; the `Logo` component hard-codes the true aspect ratio
so distortion is impossible. Favicon/app icons place the full logo on
a warm-white ground. **Known limitation:** the fine line-art strokes
have limited legibility at 16 px; if the owner ever approves a
simplified favicon mark (e.g., the cross-"t" alone), it must come from
them — this codebase will not redraw the logo.

### 4.5 SEO and structured data

`lib/seo.ts` centralizes canonical URLs, Open Graph, and Twitter
metadata behind `createPageMetadata()`; the root layout owns the title
template and `metadataBase`. `lib/schema.ts` renders
`HomeAndConstructionBusiness` JSON-LD with `areaServed` covering all
specified cities and counties for Middle Tennessee local SEO. Later
phases add `Service`, `FAQPage`, `BreadcrumbList`, and review schema
through the same pattern.

### 4.6 Accessibility baseline (WCAG 2.2 AA)

Skip link · semantic landmarks · labelled navigation · visible gold
focus indicators · ≥48 px touch targets · `prefers-reduced-motion`
globally honored (all animation collapses to none) · color pairings
chosen for AA contrast on their designated grounds · mobile CTA bar
respects the safe-area inset.

### 4.7 Honest-by-default content

Per the Constitution: no manipulative patterns, no artificial urgency,
no invented facts. The contact email renders only once an official
address is configured (`NEXT_PUBLIC_CONTACT_EMAIL`); Facebook is a
non-linked placeholder until a page URL exists; footer legal links
render as text until the compliance phase ships those routes.

### 4.8 Forward-declared content contracts

`types/content.ts` encodes the authoritative Part 8 project template
and Part 7 journal shape now, so Phase 2+ modules build against stable
interfaces and the estimate system, portal, and library integrate
without rework.

## 5. Environment

| Variable                    | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Canonical origin for metadata/sitemap/JSON-LD  |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email; CTAs hidden while empty          |

## 6. Phase 2 seams

The homepage is composed of section components; Phase 2 inserts
Featured Services, The Slayton Standard, Why Choose Us, Process,
Before & After, Testimonials, and FAQ between the existing sections
without touching the chrome. Service routes consume
`config/services.ts` as-is. The estimate flow replaces the
`/#begin-your-home-journey` anchor by updating `estimateCta.href` in
one place.

## 7. Phase 2 — Design System & Component Library

Token system expanded in `globals.css`: status colors with
dark-surface variants, fluid display type scale, elevation, radius,
motion durations/easings, z-index scale, and the `.reveal` CSS
system. New component families:

```
src/components/
  ui/          button (7 variants + IconButton) · badge · avatar ·
               spinner · skeleton · empty-state · error-state ·
               overlay (Modal/Drawer on native <dialog>) · tabs ·
               accordion · tooltip · popover · toast · pagination ·
               search-input · filter-group
  forms/       field (a11y contract) · input/textarea/select ·
               checkbox/radio/switch · file-upload · progress ·
               newsletter-signup
  cards/       base + service/project/journal/testimonial/feature/
               pricing/stat
  sections/    section-heading · hero · split-section · feature-grid ·
               content-grid · cta-block · timeline
  media/       before-after-slider · image-gallery + lightbox ·
               video-player (facade)
  navigation/  breadcrumbs (+JSON-LD) · services mega menu
  motion/      reveal · animated-counter · use-parallax ·
               use-reduced-motion
```

Decisions of note: native `<dialog>` for all modal surfaces (platform
focus trap/Escape/top-layer); native form controls under the styling;
disclosure-pattern mega menu over hover; range-input-driven
before/after slider; facade-pattern video. Storybook (`.storybook/`,
stories in `src/stories/`) documents every family with a11y notes and
runs axe per story; Vitest + Testing Library + jest-axe cover unit
testing (see `docs/DESIGN-SYSTEM.md`). Phase 1 chrome is untouched
except `Button` variant naming (`gold` → `primary`) migrated at all
call sites.

## 8. Phase 3 — Luxury Homepage + Services Catalog

Homepage rebuilt as a ten-section composition (`src/app/page.tsx`),
all content externalized to `src/config/homepage.ts`:

Hero (illuminated logo + cross light from 3A, mission, Matthew 20:28,
dual CTAs over placeholder cinematic ground behind a legibility
scrim) → Featured Services (13 curated icon cards from the catalog)
→ The Slayton Standard (7 promises) → Why Choose (8 pillars via
FeatureGrid) → Process (5 steps via Timeline; Phase 3 naming is
authoritative) → Featured Projects (sample-labeled + before/after)
→ Testimonials (accessible carousel, no autoplay, sample-labeled)
→ Service Area (lat/lng-derived interactive map, no map library)
→ FAQ (accordion + FAQPage JSON-LD) → Final CTA.

New: `src/components/home/*`, `src/components/brand/icon.tsx`
(22 inline line icons), `/services` catalog page (all 31 services
grouped with anchor targets + ItemList schema) — built so homepage
"Learn more" links are live today and `/services/[slug]` pages can
take over later without href changes. Navigation flag flipped for
/services (sitemap follows automatically). ServiceCard gained an
icon-panel header. Featured flags updated to the Phase 3 curated 13.

Imagery: generated brand-toned placeholders (`public/placeholders/`),
visibly labeled; all references live in homepage config for 1:1
replacement with licensed photography. Sample projects/testimonials
carry visible "Sample" badges per the Constitution — replace the
content, never remove the labels.

## 9. Phase 5 — Trust, Social Proof & Premium Conversion

Homepage expanded to twelve sections. New: Trust Metrics band
(counter animations; hard-labeled "Illustrative placeholders" until
`trustMetrics.verified` flips — the Constitution's no-fabrication
rule enforced in the UI), Homeowner Education (seven Learning Center
previews with reserved slugs, unlinked until Part 7 routes exist),
cinematic Process Experience (five hand-drawn 96×96 line
illustrations, alternating spine layout), multi-source Reviews
Showcase (Google/Facebook/Website tabs + facade video slot; sample-
badged; API-ready shape), county-aware Service Area map (county
chips light member cities; reduced-motion-safe radar pulse on home
base), and the redesigned Contact Experience.

Contact Experience: React 19 `useActionState` + server action
(`src/lib/inquiry.ts`) with validation, honeypot, and an honest
delivery seam — `INQUIRY_WEBHOOK_URL` posts JSON to any webhook/CRM;
while unset the UI plainly says online requests aren't connected and
routes to phone/Instagram. Success renders only on real 2xx
delivery.

Component changes (required by this phase): Field and RadioGroup
gained `onDark`; FeatureCard gained hover lift; ServiceCard icon
header (Phase 3) unchanged; The Slayton Standard rebuilt as the
flagship sticky-editorial ledger; Why-Choose pillars updated to the
Phase 5 list with icons; WebSite JSON-LD added alongside
LocalBusiness. Six icons added (cross, magnify, ribbon, calendar,
alert, swap).

## 10. Phase 6 — Services Experience, Gallery & SEO Completion

`/services/[slug]` statically generated for all 31 services
(`generateStaticParams`): hero → breadcrumbs (BreadcrumbList schema)
→ overview + benefits → Standard strip → category process → gallery
(renders only when real imagery exists in `service-content.ts` —
ships empty, self-hides) → service FAQ (FAQPage schema) → related
services → estimate CTA. Local SEO metadata + Service JSON-LD with
areaServed per page. Editorial layer: `src/config/service-content.ts`
— truthful summaries/overviews/benefits/FAQs for every service,
shared per-category process steps, related-service helper. Five new
icons (deck, fence, droplet, crawlspace, truck).

`/services` index rewritten: linked ServiceCards for the full
catalog (legacy `#slug` anchors preserved via Reveal `id`).
Homepage featured cards now link to detail pages. `/gallery`
shipped: typed config (`src/config/gallery.ts`, sample-badged
launch set), client explorer (category chips, search, live count,
empty-state reset), before/after sliders + masonry lightbox.
Sitemap now emits all service detail URLs; navigation flags flipped
for Gallery. Inquiry action records `sourcePath` (hidden field via
usePathname) in the webhook payload. Reveal gained an `id` prop.

## 11. Enhancement — Partner Marquee & Project Photo Pipeline

### 11.1 "Proudly Partnering With" (homepage section 2)

New section directly below the hero. Content lives in
`src/config/partners.ts`; artwork in `public/partners/` (SVG, PNG,
WebP). Adding a partner = drop the logo file + add one config
object; the section **self-hides when the list is empty**, and a
partner without a confirmed `url` renders as a static figure, never
a dead link. Because partnerships are factual claims, the launch
set is eight visibly labeled placeholder wordmarks ("SAMPLE
PARTNER" in the artwork, `sample: true`, no URLs) with the standard
sample notice badge — replace the content, never remove the label.

Marquee mechanics (`.partner-marquee` system in `globals.css` +
`components/home/partner-marquee.tsx` client island; the section
wrapper `proudly-partnering-with.tsx` stays a Server Component):

- Track holds the logo sequence twice and translates exactly −50%
  (each copy carries a trailing padding equal to the gap, so the
  wrap point is pixel-identical — seamless, no jump). Transform is
  the only animated property (compositor/GPU); a mask fades the
  edges. One loop = `--duration-marquee` (48s) — slow by intent.
- Playback pauses on hover, on focus within the strip, and via a
  visible pause/play control (WCAG 2.2.2 for touch and keyboard —
  hover-pause alone is not a mechanism those visitors can use).
- The duplicate copy is `aria-hidden` with links removed from the
  tab order. Under `prefers-reduced-motion` the duplicate is
  removed and the visible copy wraps into a static centered grid —
  every logo reachable, nothing trapped off-canvas; the pause
  control hides (nothing animates). If keyboard focus leaves the
  strip, any browser scroll applied to reveal a clipped logo is
  reset so the resuming animation stays aligned.
- Logos render grayscale/70% opacity and resolve to full color
  with a slight brightness lift and a thin gold underline on
  hover/focus. Fixed row height + intrinsic dimensions in config =
  zero layout shift; images lazy-load. SVG logos bypass the image
  optimizer via `unoptimized` (raster partner logos will use it) —
  `dangerouslyAllowSVG` stays off.

### 11.2 Project photo management

`src/config/projects.ts` defines `ProjectMediaSet`: title, city,
authoritative `serviceSlug`, description, featured image, and
before/after/progress/completion image arrays, plus typed
drone-footage and video **placeholder slots** that render nothing
until real `src` footage exists (no empty fake players). Assets
live in `public/projects/<slug>/`; every image ships with authored
alt text and intrinsic dimensions. The slug namespace is shared
with the Part 8 `ProjectRecord`, so the future Project Library
derives its galleries from the same sets.

`src/config/gallery.ts` now derives gallery items from every media
set — featured image, index-paired before/after sliders, then
completion/progress/unpaired shots — ahead of the labeled launch
placeholders. Categories derive from the service catalog (an
unknown `serviceSlug` skips the set rather than miscategorize it).
Components are unchanged and still consume `galleryItems` only —
no image paths in component code. `projects.ts` ships empty
(no documented photography exists yet); publishing a project =
drop images in its folder + add one object, and it appears in the
gallery automatically.

## 12. Final Production Build — Audit, Partners, Materials, Admin

### 12.1 Application-wide interaction audit

Rule applied: everything that looks interactive performs a meaningful
action; nothing else may look interactive. Findings and fixes:

- **Footer logo** now links home (was static artwork).
- **Footer services column** now links to the live Phase 6 detail
  pages (was text from the pre-routes era); stale comment corrected.
- **Footer "Request a Free Estimate"** now follows `estimateCta.href`
  like the header and mobile bar (was a phone link — one action, one
  destination across the platform).
- **FeatureCard** (Why-Choose pillars) and **Education preview
  cards** are never clickable, so their hover lift/glow/tints were
  removed — informational cards no longer imitate links. (Supersedes
  the Phase 5 hover-lift note.)
- **Reviews "Video" tab** previously offered a play button whose
  activation rendered an empty player. The tab now exists only when
  `reviewsShowcase.video.src` is configured, and `VideoPlayer` itself
  refuses to render a play affordance without playable content.
- **FinalCta** carried an unused `begin-your-home-journey` id (the
  real anchor is owned by the homepage ContactSection); removed, and
  its doc comment corrected.
- **Gallery → services**: before/after captions link to the matching
  service page, and a "services behind this work" row derives the
  unique catalog services from the visible results — photography now
  routes visitors into the funnel.
- Verified clean: header/mobile menu, breadcrumbs (current page is
  text), sticky mobile CTA, hero/interior CTAs, `tel:` phone links
  everywhere, conditional `mailto:`, Instagram (`target`+`rel`),
  Facebook non-linked placeholder, legal text-until-routes, 404 next
  steps, gallery lightbox buttons, before/after range sliders,
  contact-experience link cards (their hover lift is on real links),
  no `#`/`javascript:void(0)`/dead routes anywhere. Street-address
  links: no street address exists in `siteConfig`, so none render.
  Customer Portal: no foundation exists yet (Phase 7 was superseded
  before any code); tracked under future work, `/portal/` remains
  pre-excluded in robots.

### 12.2 Real partners

`src/config/partners.ts` now carries the three owner-supplied
partners; the eight labeled sample wordmarks and their SVGs are
removed (content replaced, not the labeling mechanism — the sample
notice re-appears if a `sample: true` entry ever returns).
Owner-provided artwork was integrated per the platform's logo policy:
non-destructive derivations only (background lifted to transparency —
edge-preserving for the CRR badge, whose native alpha was kept —
margins trimmed, high-quality downscale to web weight); the marks
themselves are untouched, and the uploaded originals remain the
source of truth with the owner. Absolute Flooring, Inc. links to its
verified official site; WRC Roofing and CRR Improvements render
unlinked until the owner confirms official URLs (one line each in the
config — the console's readiness list tracks this). The marquee now
repeats the sequence until one track half exceeds wide viewports
(seamless −50% loop regardless of partner count); repeats and the
loop duplicate are aria-hidden, untabbable, and removed under reduced
motion, so each partner is reachable exactly once.

### 12.3 Quality Materials section

New homepage section 3 (`src/components/home/quality-materials.tsx`,
zero client JS) — a ledger of manufacturer categories from
`src/config/materials.ts`, each name linking to the manufacturer's
official site, closed by the required disclaimer (identification, not
endorsement; trademarks acknowledged). Manufacturer marks render as
restrained typographic wordmarks: their logos are trademarks this
codebase has no rights to redraw or embed (the same policy as the
Slayton logo). Official brand assets, if obtained under each
manufacturer's guidelines, drop into `public/materials/` with a
`logo` field and render automatically with the grayscale-to-color
treatment. The config header directs the owner to curate the list to
brands genuinely installed.

### 12.4 Admin console (/admin)

Lightweight, dependency-free, and honest:

- **Auth seam** (`src/lib/admin/auth.ts`): timing-safe passphrase
  check against `ADMIN_PASSWORD`; HMAC-SHA256-signed session cookie
  (`ADMIN_SESSION_SECRET`), HttpOnly/Secure/SameSite=Lax, path-scoped
  to `/admin`, 24 h expiry. No secrets in code. While unconfigured,
  the login form says so (inquiry precedent). The documented future
  swap to Clerk/Auth.js adds managed sessions, rate limiting, and
  two-factor without touching consumers.
- **Routing**: `/admin/login` open; everything in the `(console)`
  group is gated by the layout. Robots excluded `/admin/` in Phase 1;
  every admin page is additionally noindex. A deliberately small
  Admin link sits in the footer legal row.
- **Console** (`/admin`): a working operations surface — a live
  launch-readiness checklist (site URL, inquiry delivery, contact
  email, analytics, Search Console, partner URLs, remaining sample
  content, trust-metric verification, video footage, Facebook URL)
  and a content inventory with real counts pointing to each config
  source of truth. Constitutional line held: no mutation UI is
  mocked — uploads/reordering/copy editing ship with the content
  backend and are stated as roadmap, because a config-driven site on
  an ephemeral filesystem cannot truthfully persist them today.

### 12.5 Deployment integrations

- **Resend**: first-class inquiry delivery path in `lib/inquiry.ts`
  (`RESEND_API_KEY` + `INQUIRY_EMAIL_TO/FROM`), preferred over the
  webhook when configured; success still renders only on a real 2xx.
- **Google Analytics 4**: `next/script` afterInteractive, mounted
  only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- **Search Console**: `verification.google` metadata emitted only
  when `GOOGLE_SITE_VERIFICATION` is set.
- `.env.example` documents every variable; README rewritten with
  installation, deployment, content workflows, and admin setup.
