# The Slayton Service — Design System

> Phase 2 · Design System & Component Library
> Token source of truth: `src/app/globals.css`. Explore everything
> interactively with `npm run storybook`.

## Principles

1. **Premium and minimal.** Warm surfaces, generous space, one gold
   action per view. Restraint is the luxury.
2. **Tokens only.** Components consume utilities derived from
   `@theme`; no hex values in component code.
3. **Accessible by construction.** Semantics and wiring live inside
   the components, so pages inherit WCAG 2.2 AA instead of
   retrofitting it.
4. **Honest by constitution.** No dark patterns, fake urgency,
   invented numbers, or fabricated reviews — components render only
   supplied, truthful content.
5. **Performance over spectacle.** CSS-first motion, observers over
   scroll listeners, facades over heavy embeds, zero client JS in
   server-renderable components.

## Tokens

See `Foundations/Design Tokens` in Storybook for the full tables.
Summary:

- **Color** — ink/charcoal/cream/tan neutrals, `gold-500` action
  accent (`gold-700` for text on light, `gold-300` on dark), muted
  success/warning/error/info with `-300` dark-surface variants.
- **Type** — `font-display` (Playfair Display), `font-nav`
  (Poppins), `font-sans` (Inter); fluid `text-display-xl/lg/md/sm`;
  `tracking-nav` and `tracking-label`.
- **Elevation** — `shadow-card`, `shadow-card-hover`,
  `shadow-overlay`, `shadow-gold-glow`.
- **Radius** — `rounded-card` · `rounded-field` · `rounded-pill`.
- **Motion** — `ease-premium` default; `--duration-fast/base/slow/
  reveal`; z-scale `--z-header/drawer/modal/toast/tooltip`.
- **Focus** — global 2px `gold-600` ring, 3px offset, on
  `:focus-visible`.

## Component reference

Import paths are shown per component. A11y notes call out what each
component guarantees and what callers must still supply.

### Actions — `@/components/ui/button`

`Button` (variants `primary · secondary · outline · outline-light ·
ghost · text · danger`; sizes `sm · md · lg`; renders `<Link>` when
`href` set) and `IconButton` (required `label` = accessible name).
All sizes ≥44px targets; `type="button"` default prevents accidental
form submits. Use one `primary` per view; `danger` only behind a
Modal confirmation.

### Cards — `@/components/cards/*`

`BaseCard`/`CardMedia` (shared chrome; a linked card is one tab stop
— never nest interactive elements inside), `ServiceCard` (pass
`linked` only when service routes exist), `ProjectCard`,
`JournalCard`, `TestimonialCard` (renders supplied reviews with
source attribution), `FeatureCard`, `PricingCard` (transparent
pricing, no anchoring), `StatCard` (verified figures only; counter
respects reduced motion).

### Forms — `@/components/forms/*`

`Field` is the accessibility contract: wraps any control and wires
`for`/`aria-describedby`/`aria-invalid`/`required`, renders hints
and `role="alert"` errors. Controls: `Input`, `Textarea`, `Select`
(styled native select — platform semantics free), `Checkbox`,
`RadioGroup`, `Switch` (`role="switch"`), `FileUpload` (real file
input; drop zone is enhancement), `ProgressBar` + `StepProgress`
(estimate-flow indicator, `aria-current="step"`),
`NewsletterSignup` (inject `onSubscribe`; education-first copy).
Callers supply `autoComplete` and specific error copy that says how
to fix the problem.

### Feedback — `@/components/ui/*`

`Badge` (semantic tones + `onDark`), `Avatar` (initials fallback;
set `decorative={false}` when no visible name), `Spinner`
(`role="status"`), `Skeleton`/`SkeletonCard` (aria-hidden — announce
loading once at container level), `EmptyState` (invitation to act),
`ErrorState` (says what went wrong + retry + phone fallback),
`ToastProvider`/`useToast` (polite live region, 6s, dismissible;
decisions belong in Modals, never toasts).

### Overlays — `@/components/ui/overlay · tooltip · popover`

`Modal` and `Drawer` are native `<dialog>` elements: focus trap,
Escape, top-layer, inert background from the platform; backdrop
click closes; focus returns to trigger. `Tooltip` is supplemental
hint only (hover **and** focus, `aria-describedby`) — never the sole
carrier of essential info. `Popover` for richer disclosure content;
Escape/outside-click close.

### Disclosure — `@/components/ui/tabs · accordion`

`Tabs`: WAI-ARIA pattern, roving tabindex, Arrow/Home/End keys, Tab
exits into the active panel. `Accordion`: button headers with
`aria-expanded`, labelled regions, content kept in the DOM for
find-in-page; set `headingLevel` to fit the page outline.

### Navigation — `@/components/navigation/* · ui/pagination · ui/search-input · ui/filter-group`

`Breadcrumbs` (emits BreadcrumbList JSON-LD), `ServicesMegaMenu`
(disclosure pattern — reliable for keyboard/touch; derives from the
authoritative catalog; pass `linked` when routes exist),
`Pagination` (crawlable links, `aria-current="page"`),
`SearchInput` (`role="search"`), `FilterGroup` (toggle chips with
`aria-pressed`). Desktop/mobile primary navigation ships in
`@/components/layout/site-header` from Phase 1.

### Sections — `@/components/sections/*`

`SectionHeading`, `Hero` (interior pages; scrim guarantees text
contrast over imagery), `SplitSection` (content-first DOM order),
`FeatureGrid`, `ContentGrid`, `CtaBlock` (invitational only — no
countdowns or scarcity), `Timeline` (ordered list; numbers carry
real sequence).

### Media — `@/components/media/*`

`BeforeAfterSlider` (range-input driven: drag/keys/touch/SR values
from the platform), `ImageGallery` + `Lightbox` (button thumbnails,
dialog viewer, Arrow keys, swipe, live-region position),
`VideoPlayer` (facade — player mounts on demand; published videos
require captions per WCAG 1.2.2).

### Motion — `@/components/motion`

`Reveal` (IntersectionObserver flips a CSS state; content never
hidden without JS), `AnimatedCounter` (final value instantly under
reduced motion), `useParallax` (decorative layers only; inert under
reduced motion), `useReducedMotion`. The CSS kill-switch in
`globals.css` collapses all CSS animation globally; JS-driven motion
must check the hook.

## Composition example

```tsx
import { Hero } from "@/components/sections/hero";
import { ContentGrid } from "@/components/sections/content-grid";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaBlock } from "@/components/sections/cta-block";
import { Button } from "@/components/ui/button";
import { getFeaturedServices } from "@/config/services";

export default function ServicesPage() {
  return (
    <>
      <Hero eyebrow="Our Services" title="Every service your home needs." />
      <ContentGrid title="Featured Services" columns={3}>
        {getFeaturedServices().map((service) => (
          <ServiceCard key={service.slug} service={service} linked />
        ))}
      </ContentGrid>
      <CtaBlock
        title="Not sure what your home needs?"
        actions={<Button variant="primary" href="/#begin-your-home-journey">Ask Us — It's Free</Button>}
      />
    </>
  );
}
```

## Testing approach

- **Unit/component:** Vitest + Testing Library + jest-axe
  (`npm run test`). Example specs: `button.test.tsx`,
  `field.test.tsx`. Pattern: assert roles/names/wiring, then run axe.
- **Visual/interactive review:** Storybook (`npm run storybook`)
  with the a11y addon running axe on every story across the brand
  backgrounds.
- **Standards:** every interactive component gets a spec covering
  keyboard operation and axe; forms additionally assert error
  announcement. Manual passes per release: keyboard-only walk,
  screen reader spot-check, 200% zoom, reduced-motion, and Lighthouse
  (targets 95+/100/100/100).
