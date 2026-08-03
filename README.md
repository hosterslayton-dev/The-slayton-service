# The Slayton Service — Digital Platform

Production website for The Slayton Service — *Serving Our Clients.
Honoring Our God.* A premium home stewardship company serving Middle
Tennessee. Built as one integrated, config-driven platform governed by
the Enterprise Project Constitution v2.0 and the Brand & Design
Consolidation Specification.

Stack: **Next.js 15 (App Router) · React 19 · TypeScript strict ·
Tailwind CSS v4** — Server Components first, WCAG 2.2 AA by
construction, Lighthouse targets 95+/100/100/100.

## Installation

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Development

| Command                 | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Local development server                 |
| `npm run build`         | Production build                         |
| `npm run start`         | Serve the production build               |
| `npm run lint`          | ESLint (next/core-web-vitals + TS)       |
| `npm run typecheck`     | `tsc --noEmit` (strict)                  |
| `npm run test`          | Vitest + Testing Library + jest-axe      |
| `npm run format`        | Prettier (with Tailwind class sorting)   |
| `npm run storybook`     | Component library with axe per story     |

## Environment variables

All variables are documented inline in [.env.example](./.env.example).
Summary:

| Variable                       | Purpose                                          |
| ------------------------------ | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`         | Canonical origin for metadata/sitemap/JSON-LD    |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Public email; email CTAs hidden while empty      |
| `RESEND_API_KEY`               | Resend API key for inquiry email delivery        |
| `INQUIRY_EMAIL_TO`             | Mailbox that receives estimate inquiries         |
| `INQUIRY_EMAIL_FROM`           | Verified Resend sender address                   |
| `INQUIRY_WEBHOOK_URL`          | Alternative webhook delivery (Zapier/Make/CRM)   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`| GA4 ID; analytics loads only when set            |
| `GOOGLE_SITE_VERIFICATION`     | Search Console meta-tag token                    |
| `ADMIN_PASSWORD`               | Admin console passphrase (server only)           |
| `ADMIN_SESSION_SECRET`         | 32+ random chars; signs the admin session cookie |

The inquiry form, email CTAs, analytics, verification tag, and admin
sign-in are all **honest seams**: while a variable is unset, the
related feature plainly says so or stays hidden — nothing fakes a
success.

## Deployment (GitHub → Vercel)

1. Push the repository to GitHub.
2. Import into Vercel (framework auto-detected: Next.js). No custom
   build settings required.
3. Add every production environment variable from the table above.
4. Assign the production domain and set `NEXT_PUBLIC_SITE_URL` to it,
   then redeploy so metadata, sitemap, and JSON-LD emit the real
   origin.
5. Google Search Console: add the property, choose the HTML-tag
   method, put the token in `GOOGLE_SITE_VERIFICATION`, redeploy,
   verify, then submit `https://<domain>/sitemap.xml`.
6. Google Analytics: create a GA4 property and set
   `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
7. Resend: verify the sending domain, create an API key, and set the
   three inquiry variables. Send a test inquiry from production.
8. Sign in at `/admin` and work through the **Launch readiness**
   checklist until every check passes.

## Editing content (no component changes ever required)

### Adding a service
1. Add the entry to `src/config/services.ts` (slug, name, category,
   featured flag).
2. Add its editorial content in `src/config/service-content.ts`
   (summary, overview, benefits, FAQs, icon).
3. The catalog page, detail page, sitemap entry, schema, navigation,
   and related-services links all derive automatically.

### Adding a partner logo
1. Drop the logo (SVG/PNG/WebP, transparent background preferred)
   into `public/partners/`.
2. Add one object to `src/config/partners.ts` with the confirmed
   name, official website URL, and the file's intrinsic dimensions.
3. The homepage marquee updates automatically. A partner without a
   confirmed `url` renders unlinked — never a dead link.

### Adding project photos
1. Create `public/projects/<slug>/` and place the images
   (`before-1.webp`, `after-1.webp`, `progress-1.webp`,
   `finished-1.webp`, …).
2. Add one `ProjectMediaSet` object to `src/config/projects.ts`
   (title, city, catalog `serviceSlug`, description, image arrays,
   optional drone/video slots).
3. Gallery items, before/after sliders, filters, lightbox entries,
   and the labeled-sample replacement all happen automatically.

### Materials, homepage copy, company info
`src/config/materials.ts` (manufacturer ledger — keep only brands you
genuinely install), `src/config/homepage.ts` (all homepage copy, FAQs,
reviews, trust metrics), `src/config/site.ts` (identity, phone, hours,
service areas, social).

## Admin console

`/admin` (a small link also sits in the footer). Sign-in is a
timing-safe passphrase check against `ADMIN_PASSWORD` with an
HMAC-signed, HttpOnly session cookie (`ADMIN_SESSION_SECRET`), 24-hour
sessions, and honest "not configured" states while variables are
missing. Robots have excluded `/admin/` since Phase 1 and every admin
page is additionally `noindex`.

The console is a working operations surface for a config-driven site:
a live **launch-readiness checklist** (delivery, analytics,
verification, partner URLs, remaining sample content) and a **content
inventory** that shows real counts and points to each source of
truth. In-console editing (uploads, reordering, copy changes) ships
with the content-backend phase; swapping the credential seam for
Clerk/Auth.js later adds managed sessions and two-factor
authentication without touching consumers (see
`src/lib/admin/auth.ts`).

## Folder structure

```
src/
  app/            Routes (marketing, gallery, services, admin)
  components/     brand · layout · ui · forms · cards · sections ·
                  media · navigation · motion · home · gallery ·
                  services · admin
  config/         site · navigation · services · service-content ·
                  homepage · gallery · projects · partners · materials
  lib/            seo · schema · utils · inquiry · admin/
  types/          Shared content contracts
public/
  brand/          Official logo set (untouched original + derivations)
  partners/       Partner logo artwork
  materials/      Optional official manufacturer logo assets
  projects/       Project photography, one folder per slug
  placeholders/   Labeled sample imagery (replaced 1:1 by real work)
docs/             ARCHITECTURE.md · DESIGN-SYSTEM.md
```

## Architecture overview

- **Config-driven everything.** Components never hard-code content,
  image paths, or identity; each surface has one typed source of
  truth in `src/config`.
- **Phase-gated navigation.** Nav items carry an `implemented` flag;
  header, footer, and sitemap filter on it, so the chrome can never
  link to a 404.
- **Honest by constitution.** No fabricated reviews, statistics,
  partnerships, or success states. Sample content is visibly labeled
  and replaced 1:1 by real content; unconfigured integrations say so.
- **Server-first.** Client JavaScript only where interaction demands
  it (menus, marquee pause, gallery explorer, forms, carousels).
- **Design tokens.** The whole brand system lives in
  `src/app/globals.css` under Tailwind v4 `@theme`; no hex values in
  component code.

Deeper records: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) (every
phase's decisions) and [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md)
(tokens + component reference).
