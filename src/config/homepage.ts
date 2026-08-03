/**
 * ─────────────────────────────────────────────────────────────────
 * HOMEPAGE CONTENT CONFIGURATION — Phase 3
 *
 * Every word and image on the homepage lives here, separated from
 * presentation. Swapping placeholder imagery for licensed
 * photography, or sample projects/testimonials for real ones, is an
 * edit to this file only.
 *
 * Constitutional notes:
 *   • Sample projects and testimonials are explicitly labeled and
 *     rendered with visible "Sample" badges until real, verified
 *     content replaces them. Never remove the labels — replace the
 *     content.
 *   • Copy educates before it promotes. No urgency mechanics, no
 *     invented statistics, no unverifiable claims.
 * ─────────────────────────────────────────────────────────────────
 */

import type { Testimonial } from "@/types/content";

/** Set true the moment real photography replaces the placeholders. */
export const realPhotographyLive = false;

export const heroContent = {
  mission:
    "A premium home stewardship company for Middle Tennessee — protecting, improving, and maintaining the homes families build their lives in.",
  scripture: {
    text: "“Just as the Son of Man did not come to be served, but to serve…”",
    reference: "Matthew 20:28",
  },
  primaryCta: { label: "Request Your Free Estimate", href: "/#begin-your-home-journey" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
  image: {
    src: "/representative/home-hero.jpg",
    alt: "Warmly lit renovated home exterior at dusk"
  },
} as const;

/** Featured service descriptions + icon keys, by catalog slug. */
export const featuredServiceContent: Record<
  string,
  { icon: string; description: string }
> = {
  "kitchen-remodeling": {
    icon: "kitchen",
    description:
      "Thoughtful layouts, premium finishes, and craftsmanship worthy of the heart of your home.",
  },
  "bathroom-remodeling": {
    icon: "bathroom",
    description:
      "Serene, well-built bathrooms — from refreshed fixtures to full transformations.",
  },
  "interior-renovations": {
    icon: "interior",
    description:
      "Reimagined living spaces, finished with care and respect for the way you live.",
  },
  "exterior-renovations": {
    icon: "exterior",
    description:
      "Curb appeal and lasting protection — siding, trim, and exterior upgrades done right.",
  },
  "roof-repairs": {
    icon: "roof",
    description:
      "Honest roof evaluations and quality repairs. If it doesn't need replacing, we'll say so.",
  },
  painting: {
    icon: "paint",
    description:
      "Crisp lines, premium paints, and tidy work — interior and exterior.",
  },
  "drywall-repair": {
    icon: "drywall",
    description:
      "Seamless patches and smooth finishes that disappear into the wall.",
  },
  flooring: {
    icon: "flooring",
    description:
      "Hardwood, luxury vinyl plank, and tile — installed with precision underfoot.",
  },
  "pest-control": {
    icon: "pest",
    description:
      "Respectful, thorough pest protection that keeps your home comfortably yours.",
  },
  "pressure-washing": {
    icon: "pressure",
    description:
      "Driveways, siding, decks, and patios — renewed with the right pressure for each surface.",
  },
  "property-maintenance": {
    icon: "maintenance",
    description:
      "Seasonal care and small fixes handled before they become big problems.",
  },
  "emergency-property-repairs": {
    icon: "emergency",
    description:
      "When something urgent happens to your home, we respond quickly and set it right.",
  },
  "home-consulting": {
    icon: "consulting",
    description:
      "Planning a project? Get honest guidance on scope, sequence, and budget first.",
  },
};

/** The Slayton Standard — seven promises. */
export const slaytonStandard = {
  eyebrow: "The Slayton Standard",
  title: "Seven promises, kept on every project",
  lede: "The standard isn't a slogan. It's how we behave in your home, on every visit, whether the job is a full renovation or a single repair.",
  promises: [
    {
      icon: "shield",
      title: "Honest Recommendations",
      description:
        "We recommend only what your home truly needs — and tell you plainly what it doesn't.",
    },
    {
      icon: "craft",
      title: "Premium Craftsmanship",
      description:
        "Materials and methods we would choose for our own homes, held to a higher standard.",
    },
    {
      icon: "ledger",
      title: "Transparent Pricing",
      description:
        "Clear, itemized estimates before work begins. No surprises, no pressure.",
    },
    {
      icon: "home",
      title: "Respect for Your Home",
      description:
        "Protected floors, clean job sites, and careful hands — we leave your home better than we found it.",
    },
    {
      icon: "message",
      title: "Clear Communication",
      description:
        "You'll always know what's happening, what's next, and why.",
    },
    {
      icon: "clock",
      title: "On-Time Reliability",
      description:
        "We show up when we say we will and finish when we promised.",
    },
    {
      icon: "check",
      title: "The Final Walkthrough",
      description:
        "We're not finished until we've walked every detail with you and you're satisfied.",
    },
  ],
} as const;

/** Why homeowners choose us — Phase 5 trust pillars (with icons). */
export const whyChoose = {
  eyebrow: "Why Homeowners Choose The Slayton Service",
  title: "Built on character, proven in craft",
  lede: "Anyone can list services. What sets a company apart is how it treats people and how it treats work.",
  pillars: [
    { icon: "shield", title: "Integrity", description: "We do the right thing when no one is watching — the same standard on day one and day one hundred." },
    { icon: "message", title: "Communication", description: "Straight answers, steady updates, and a real person on the phone." },
    { icon: "craft", title: "Craftsmanship", description: "Work we're proud to put our name on, down to the details most people never see." },
    { icon: "ledger", title: "Transparency", description: "Itemized estimates and honest findings — you'll always know what you're paying for and why." },
    { icon: "ribbon", title: "Professionalism", description: "Courteous crews, tidy job sites, and workmanship held to The Slayton Standard." },
    { icon: "home", title: "Respect", description: "Your home, your family, and your time are treated with care from the first call." },
    { icon: "cross", title: "Faith-Based Values", description: "We serve because we were first served — Matthew 20:28 shapes how we treat every client." },
    { icon: "magnify", title: "Attention to Detail", description: "The corners others cut are the ones we check twice." },
  ],
} as const;

/** Our process — five steps (Phase 3 authoritative naming). */
export const processSteps = {
  eyebrow: "Our Process",
  title: "From first call to final walkthrough",
  lede: "A clear, unhurried process — so you always know where your project stands.",
  steps: [
    {
      title: "Request Estimate",
      description: "Call, message, or send a request online. We'll listen to your goals first.",
    },
    {
      title: "Inspection",
      description: "A free, thorough look at the work — with honest findings, explained plainly.",
    },
    {
      title: "Planning",
      description: "A clear, itemized estimate and a realistic timeline, agreed before anything begins.",
    },
    {
      title: "Construction",
      description: "Premium materials, protected spaces, steady communication, tidy job sites.",
    },
    {
      title: "Final Walkthrough",
      description: "We walk every detail with you. The project ends when you're satisfied — not before.",
    },
  ],
} as const;

/**
 * Sample projects — PLACEHOLDER content, visibly labeled in the UI.
 * Replace with real ProjectRecord data as projects are documented.
 */
export const sampleProjects = [
  {
    title: "A Brighter Gathering Place",
    summary:
      "A dated galley kitchen opened into a warm, light-filled heart of the home — honest guidance at every decision.",
    serviceName: "Kitchen Remodeling",
    city: "Gallatin",
    image: { src: "/representative/kitchen-remodeling.jpg", alt: "Sample project placeholder image" },
  },
  {
    title: "Shelter, Restored",
    summary:
      "Storm-worn shingles repaired and sealed — a targeted fix that saved the homeowner a full replacement.",
    serviceName: "Roof Repairs",
    city: "Hendersonville",
    image: { src: "/representative/roof-repairs.jpg", alt: "Sample project placeholder image" },
  },
  {
    title: "An Evening Porch, Reborn",
    summary:
      "Pressure washing, fresh paint, and careful carpentry brought a tired exterior back to life.",
    serviceName: "Exterior Renovations",
    city: "Mt. Juliet",
    image: { src: "/representative/exterior-renovations.jpg", alt: "Sample project placeholder image" },
  },
] as const;

export const sampleBeforeAfter = {
  before: {
    src: "/representative/before-kitchen.jpg",
    alt: "Older kitchen before representative renovation",
    width: 1200,
    height: 900,
  },
  after: {
    src: "/representative/after-kitchen.jpg",
    alt: "Bright kitchen after representative renovation",
    width: 1200,
    height: 900,
  },
  caption:
    "Representative renovation inspiration — replace with your documented project photography as your portfolio grows.",
} as const;

/**
 * Sample testimonials — PLACEHOLDER content, visibly labeled in the
 * UI with a "Sample" badge. Replace only with real, verified client
 * reviews (with permission). Never publish invented reviews.
 */
export const sampleTestimonials: (Testimonial & { sample: true })[] = [
  {
    sample: true,
    quote:
      "They told us what our roof didn't need. That honesty earned every project we've hired them for since.",
    author: "Sample Client",
    location: "Hendersonville, TN",
    source: "Google",
  },
  {
    sample: true,
    quote:
      "Tidy, on time, and patient with every question. Our kitchen feels like it was always meant to look this way.",
    author: "Sample Client",
    location: "Gallatin, TN",
    source: "Google",
  },
  {
    sample: true,
    quote:
      "Clear estimate, steady communication, and a final walkthrough where they fixed the one detail I noticed before I finished pointing at it.",
    author: "Sample Client",
    location: "Mt. Juliet, TN",
    source: "Google",
  },
];

/**
 * Service-area map positions. Derived from each city's real
 * latitude/longitude, normalized to the map viewport — honest
 * relative geography, not decoration.
 */
export interface ServiceAreaCity {
  name: string;
  /** Percent position within the map viewport, derived from real lat/lng. */
  x: number;
  y: number;
  home?: boolean;
}

export const serviceAreaMap: {
  eyebrow: string;
  title: string;
  lede: string;
  cities: readonly ServiceAreaCity[];
  counties: readonly string[];
} = {
  eyebrow: "Where We Serve",
  title: "Proudly serving Middle Tennessee",
  lede: "Based in Sumner County, serving the communities around Nashville and beyond.",
  cities: [
    { name: "Portland", x: 54.1, y: 8 },
    { name: "White House", x: 26.3, y: 26.7 },
    { name: "Gallatin", x: 68.2, y: 46.2, home: true },
    { name: "Goodlettsville", x: 13.9, y: 61.7 },
    { name: "Hendersonville", x: 32.9, y: 66 },
    { name: "Lebanon", x: 92, y: 84 },
    { name: "Mt. Juliet", x: 53.5, y: 86 },
    { name: "Nashville", x: 8, y: 92 },
  ],
  counties: ["Sumner County", "Wilson County", "Davidson County"],
};

/** FAQ preview — grounded in approved specifications only. */
export const faqPreview = {
  eyebrow: "Common Questions",
  title: "Answers, before you even ask",
  items: [
    {
      id: "free-estimate",
      question: "Are estimates really free?",
      answer:
        "Yes — estimates and inspections are free, with no obligation. We'd rather you have honest information than feel pressured into a decision.",
    },
    {
      id: "small-jobs",
      question: "Do you take small repairs, or only large projects?",
      answer:
        "Both. From a single drywall patch or emergency repair to a whole-home renovation, every job gets the same Slayton Standard.",
    },
    {
      id: "areas",
      question: "What areas do you serve?",
      answer:
        "Gallatin, Hendersonville, Nashville, Mt. Juliet, Lebanon, White House, Portland, Goodlettsville, and the surrounding Sumner, Wilson, and Davidson County communities across Middle Tennessee.",
    },
    {
      id: "process",
      question: "What happens after I request an estimate?",
      answer:
        "We follow a clear five-step process: your request, a free inspection, honest planning with an itemized estimate, professional construction, and a final walkthrough that ends only when you're satisfied.",
    },
    {
      id: "recommendations",
      question: "Will you tell me if I don't need a repair?",
      answer:
        "Yes — that's the first promise of The Slayton Standard. If a smaller fix will truly protect your home, that's what we'll recommend.",
    },
    {
      id: "emergency",
      question: "Do you handle urgent repairs?",
      answer:
        "Yes. Emergency property repairs are part of our core services — call (615) 920-3891 and we'll respond as quickly as we can.",
    },
  ],
} as const;


/**
 * Trust metrics — ILLUSTRATIVE PLACEHOLDERS, visibly labeled in the
 * UI. The Constitution forbids fabricated numbers: replace these
 * with verified values (and flip `verified` to true) before the
 * placeholder badge is ever removed. `display` overrides the
 * counter for non-numeric values.
 */
export const trustMetrics = {
  eyebrow: "The Record We're Building",
  title: "Measured by homes, not headlines",
  verified: false,
  metrics: [
    { label: "Homes Improved", value: 120, suffix: "+" },
    { label: "Projects Completed", value: 180, suffix: "+" },
    { label: "Communities Served", value: 11 },
    { label: "Years of Combined Experience", value: 15, suffix: "+" },
    { label: "Free Estimates Given", value: 200, suffix: "+" },
    { label: "Pressure Applied", display: "Zero", note: "That one's permanent." },
  ],
} as const;

/** Homeowner education — Learning Center previews (Part 7). */
export const educationTopics = {
  eyebrow: "Homeowner Education",
  title: "Know your home before you spend on it",
  lede: "Education always comes before promotion. These guides are being written for the Learning Center — the short versions are already true.",
  topics: [
    {
      slug: "signs-your-home-needs-repairs",
      icon: "alert",
      title: "Signs Your Home Needs Repairs",
      teaser: "Water stains, sticking doors, hairline cracks — what's cosmetic, and what's your home asking for help.",
    },
    {
      slug: "preventative-maintenance",
      icon: "maintenance",
      title: "Preventative Maintenance That Pays",
      teaser: "The small, unglamorous tasks that quietly save homeowners thousands.",
    },
    {
      slug: "when-to-renovate",
      icon: "interior",
      title: "When to Renovate",
      teaser: "How to tell when a space is ready for change — and when to wait a season.",
    },
    {
      slug: "when-to-replace",
      icon: "swap",
      title: "Repair or Replace?",
      teaser: "The honest math we use before we ever recommend replacing anything.",
    },
    {
      slug: "seasonal-maintenance",
      icon: "calendar",
      title: "Seasonal Maintenance in Middle Tennessee",
      teaser: "What our storms, summers, and clay soil actually do to a house — and what to check each season.",
    },
    {
      slug: "choosing-a-contractor",
      icon: "consulting",
      title: "How to Choose a Contractor",
      teaser: "The questions worth asking anyone you invite into your home — including us.",
    },
    {
      slug: "common-renovation-mistakes",
      icon: "magnify",
      title: "Common Renovation Mistakes",
      teaser: "The avoidable ways projects go over budget, past deadline, or wrong entirely.",
    },
  ],
} as const;

/**
 * Reviews showcase — PLACEHOLDER reviews only, visibly labeled per
 * source. Architecture-ready: when review APIs or verified imports
 * land, replace this array (and the video placeholder) with real,
 * permissioned content. Sources supported today: Google, Facebook,
 * Website, Video.
 */
export const reviewsShowcase = {
  eyebrow: "What Clients Say",
  title: "Trust is earned one home at a time",
  lede: "As real reviews come in from Google, Facebook, and our own clients, they'll live here — verified, attributed, and shared with permission.",
  sources: ["Google", "Facebook", "Website"] as const,
  reviews: [
    { sample: true, source: "Google", quote: "They told us what our roof didn't need. That honesty earned every project we've hired them for since.", author: "Sample Client", location: "Hendersonville, TN" },
    { sample: true, source: "Google", quote: "Tidy, on time, and patient with every question. Our kitchen feels like it was always meant to look this way.", author: "Sample Client", location: "Gallatin, TN" },
    { sample: true, source: "Facebook", quote: "Fast response on an emergency repair, then a fair plan for the real fix. No upsell, no drama.", author: "Sample Client", location: "Portland, TN" },
    { sample: true, source: "Facebook", quote: "The crew covered everything, cleaned everything, and walked us through the work like we were family.", author: "Sample Client", location: "White House, TN" },
    { sample: true, source: "Website", quote: "Clear estimate, steady communication, and a final walkthrough where they fixed the one detail I noticed before I finished pointing at it.", author: "Sample Client", location: "Mt. Juliet, TN" },
    { sample: true, source: "Website", quote: "They treated our first small repair with the same care as our renovation. That's why they got the renovation.", author: "Sample Client", location: "Nashville, TN" },
  ],
  video: {
    sample: true,
    title: "Video testimonial — placeholder until a real client story is filmed",
    poster: { src: "/placeholders/poster.jpg" },
    /** Real footage URL. The Video tab renders only when this is set —
     *  a play button must never lead to an empty player. */
    src: "",
  },
} as const;

/** Contact experience content. */
export const contactExperience = {
  eyebrow: "Begin Your Home Journey",
  title: "Tell us about your home",
  lede: "Share a few details and we'll reach out to schedule your free estimate. Prefer to talk? The phone works just as well — a real person answers.",
  privacyNote: "Your information is used only to respond to your request. Never sold, never shared, never spammed.",
  trustPoints: [
    { icon: "shield", text: "Honest recommendations — including \"you don't need this yet\"" },
    { icon: "ledger", text: "Free, itemized estimates with no obligation" },
    { icon: "home", text: "Locally based in Gallatin, serving Middle Tennessee" },
    { icon: "check", text: "No pressure. No sales scripts. Ever." },
  ],
} as const;

export const finalCta = {
  eyebrow: "Begin Your Home Journey",
  title: "Your home deserves this kind of care.",
  lede: "Every project begins with a conversation and a free estimate — never pressure. Tell us about your home, and we'll walk the road with you.",
  footnote: "Free estimates · Free inspections · Honest recommendations",
} as const;
