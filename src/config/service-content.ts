import type { IconName } from "@/components/brand/icon";
import type { BeforeAfterPair, ImageAsset } from "@/types/content";
import { services, type Service, type ServiceCategory } from "@/config/services";

/**
 * ─────────────────────────────────────────────────────────────────
 * SERVICE CONTENT — editorial layer for /services/[slug] (Phase 6)
 *
 * Truthful, educational content only: what each service is, why it
 * matters, and honest answers — no invented statistics, invented
 * credentials, or manufactured urgency. Process steps are shared
 * per category (one source of truth). Galleries ship empty and the
 * page section self-hides; add real ImageAsset/BeforeAfterPair
 * entries as project photography is documented.
 * ─────────────────────────────────────────────────────────────────
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceContent {
  icon: IconName;
  /** One-line card/meta summary. */
  summary: string;
  /** 2–3 sentence page overview. */
  overview: string;
  benefits: string[];
  faqs: ServiceFaq[];
  gallery?: ImageAsset[];
  beforeAfter?: BeforeAfterPair[];
}

/** Shared, honest process framing per category. */
export const categoryProcess: Record<ServiceCategory, string[]> = {
  "Remodeling & Renovation": [
    "Free consultation — your goals, your budget, your home's real condition.",
    "Design and planning with a clear, itemized estimate before anything begins.",
    "Construction with protected spaces, tidy job sites, and steady updates.",
    "A final walkthrough that ends only when you're satisfied.",
  ],
  Flooring: [
    "Free measurement and honest assessment of your subfloor and existing surfaces.",
    "Material guidance matched to your rooms, pets, traffic, and budget.",
    "Precise installation with clean transitions and careful trim work.",
    "Walkthrough, care guidance, and a tidy handoff.",
  ],
  "Interior Finishes": [
    "Free assessment of the surfaces and what they actually need.",
    "Clear scope and estimate — prep work spelled out, never hidden.",
    "Careful protection, quality materials, crisp execution.",
    "Detail inspection with you before we call it finished.",
  ],
  Roofing: [
    "Free roof evaluation with photos of what we find.",
    "Honest findings — repair recommendations only when repair truly serves you.",
    "Quality repair work, sealed and verified.",
    "Final review with you, plus guidance on what to watch.",
  ],
  "Exterior Cleaning": [
    "Free assessment of surfaces, stains, and the right method for each.",
    "Clear quote with the areas and approach spelled out.",
    "The correct pressure and solutions for each surface — never one-setting-fits-all.",
    "Walkaround with you to confirm every area meets the standard.",
  ],
  "Outdoor Structures": [
    "Free on-site consultation and honest evaluation of existing structures.",
    "Design, materials, and an itemized estimate agreed up front.",
    "Solid construction, correct fasteners and footings, clean site daily.",
    "Final walkthrough and care guidance for the seasons ahead.",
  ],
  "Water & Crawlspace": [
    "Free inspection of drainage, moisture, and crawlspace conditions.",
    "Plain-language findings — what's urgent, what can wait, what's fine.",
    "Targeted work that addresses causes, not just symptoms.",
    "Verification and prevention guidance so the fix lasts.",
  ],
  "Maintenance & Repairs": [
    "Tell us what's wrong — or ask us to look for what's starting to go wrong.",
    "Honest assessment and a clear price before work begins.",
    "Careful, complete repairs by people who respect your home.",
    "A quick review with you, plus what to keep an eye on.",
  ],
  "Consulting & Specialty": [
    "A conversation about your home, your plans, and your concerns.",
    "Honest, pressure-free guidance — even when the answer is \"wait\".",
    "Clear next steps you can act on, with or without us.",
    "Follow-through whenever you're ready.",
  ],
};

export const serviceContent: Record<string, ServiceContent> = {
  "kitchen-remodeling": {
    icon: "kitchen",
    summary: "Thoughtful layouts, premium finishes, and craftsmanship worthy of the heart of your home.",
    overview:
      "The kitchen carries more of daily life than any room in the house, and remodeling it well takes more than new cabinets — it takes honest planning around how your family actually cooks, gathers, and moves. We guide layout, materials, and budget with the same candor we'd want in our own homes, then build with craftsmanship that holds up to real life.",
    benefits: [
      "Layout guidance built around how your family actually uses the space",
      "Itemized estimates so every material and decision is visible",
      "Premium cabinetry, counters, and fixtures installed with precision",
      "One team accountable from demolition to final walkthrough",
    ],
    faqs: [
      {
        question: "Do we have to move out during a kitchen remodel?",
        answer:
          "Usually not. We plan the work in stages, protect adjoining spaces, and help you set up a temporary kitchen area so daily life keeps moving.",
      },
      {
        question: "Can you work with our existing layout to save cost?",
        answer:
          "Yes — keeping plumbing and electrical where they are is often the single biggest cost saver, and we'll tell you honestly whether your current layout is worth keeping.",
      },
      {
        question: "How do we set a realistic budget?",
        answer:
          "We start with your number, not ours. The free consultation maps what's achievable at your budget, where premium materials matter most, and where they don't.",
      },
    ],
  },
  "bathroom-remodeling": {
    icon: "bathroom",
    summary: "Serene, well-built bathrooms — from refreshed fixtures to full transformations.",
    overview:
      "Bathrooms are small rooms where craftsmanship shows fast — waterproofing, tile lines, and ventilation either done right or regretted. Whether you want a refreshed vanity and fixtures or a full transformation, we plan the details that keep a bathroom beautiful years after the reveal.",
    benefits: [
      "Correct waterproofing and ventilation — the parts you never see, done right",
      "Tile, stone, and fixture installation with clean, precise lines",
      "Honest guidance on refresh vs. full remodel for your goals and budget",
      "Accessible and aging-in-place options planned thoughtfully",
    ],
    faqs: [
      {
        question: "How long is a bathroom out of commission?",
        answer:
          "It depends on scope, and we'll give you a realistic timeline before work begins — then keep you updated daily so there are no surprises.",
      },
      {
        question: "Is a full gut always necessary?",
        answer:
          "No. If your layout, plumbing, and substrate are sound, a focused update can transform the room for far less — and we'll tell you when that's the case.",
      },
      {
        question: "Can you fix moisture or mildew problems as part of the remodel?",
        answer:
          "Yes — addressing ventilation and moisture correctly is part of doing the job right, not an upsell.",
      },
    ],
  },
  "whole-home-renovations": {
    icon: "home",
    summary: "Comprehensive renovations that bring an entire home up to how you want to live.",
    overview:
      "A whole-home renovation is a marathon of coordinated decisions — sequencing, budget, and the daily reality of living through change. We plan the full picture before the first wall opens, keep the schedule honest, and carry one standard of craftsmanship through every room.",
    benefits: [
      "One accountable team and one clear plan across every room",
      "Sequencing that keeps parts of your home livable when possible",
      "Itemized budgeting with decisions made before demolition, not during",
      "Consistent finish quality from the first room to the last",
    ],
    faqs: [
      {
        question: "Should we renovate everything at once or in phases?",
        answer:
          "Both can be right. Doing it at once is usually more efficient; phasing spreads cost and disruption. We'll walk the trade-offs honestly for your situation.",
      },
      {
        question: "How do you keep a large project on budget?",
        answer:
          "By making decisions early, pricing them transparently, and telling you immediately when something unexpected appears behind a wall — with options, not pressure.",
      },
      {
        question: "Can we live in the home during the renovation?",
        answer:
          "Often yes, with the right sequencing and dust protection. We'll tell you plainly if a stretch of the project would be easier lived elsewhere.",
      },
    ],
  },
  "interior-renovations": {
    icon: "interior",
    summary: "Reimagined living spaces, finished with care and respect for the way you live.",
    overview:
      "Interior renovation is where a house becomes more yours — opened rooms, rebuilt spaces, better light, better flow. We help you decide what's worth changing, what's worth keeping, and then execute with clean lines and cleaner job sites.",
    benefits: [
      "Honest guidance on which walls, rooms, and ideas give real return",
      "Careful protection of the rest of your home while we work",
      "Cohesive finishes — trim, paint, flooring, and lighting that agree",
      "Clear daily communication from demolition to done",
    ],
    faqs: [
      {
        question: "Can you tell if a wall is load-bearing?",
        answer:
          "We evaluate structure before recommending any removal, and when engineering review is warranted we'll say so — guessing is not a service.",
      },
      {
        question: "We only want one room done. Is that too small?",
        answer:
          "Not at all. Single-room renovations get the same planning and standard as whole-home work.",
      },
      {
        question: "How disruptive is interior work?",
        answer:
          "There's honest disruption in any renovation, but containment, daily cleanup, and a clear schedule keep it manageable — and we tell you what to expect before we start.",
      },
    ],
  },
  "exterior-renovations": {
    icon: "exterior",
    summary: "Curb appeal and lasting protection — siding, trim, and exterior upgrades done right.",
    overview:
      "Your exterior is both your home's face and its armor. Siding, trim, soffits, and entries need to look right and shed Tennessee weather for decades. We renovate exteriors with materials chosen for this climate and details installed to last.",
    benefits: [
      "Materials matched honestly to your home, budget, and our climate",
      "Water management details — flashing, wraps, seals — done correctly",
      "Cohesive curb appeal: siding, trim, and color that work together",
      "Repairs of hidden damage handled transparently when uncovered",
    ],
    faqs: [
      {
        question: "How do I know if siding needs repair or replacement?",
        answer:
          "Localized damage often repairs well; widespread warping, rot, or failed substrate usually doesn't. The free assessment gives you an honest read either way.",
      },
      {
        question: "What holds up best in Middle Tennessee weather?",
        answer:
          "It depends on the home and budget — each material trades cost, durability, and maintenance differently, and we'll lay those trade-offs out plainly.",
      },
      {
        question: "Can exterior work happen in winter?",
        answer:
          "Much of it can, weather permitting. Some materials have temperature requirements, and we schedule around them rather than compromise the install.",
      },
    ],
  },
  flooring: {
    icon: "flooring",
    summary: "Hardwood, luxury vinyl plank, and tile — installed with precision underfoot.",
    overview:
      "Flooring succeeds or fails on what you can't see: subfloor prep, acclimation, and layout planning. We install hardwood, luxury vinyl plank, and tile with the patience those details demand, so the floor you walk on daily stays flat, quiet, and beautiful.",
    benefits: [
      "Honest material guidance for pets, kids, moisture, and traffic",
      "Proper subfloor preparation — the step that decides longevity",
      "Clean transitions, tight seams, and thoughtful plank/tile layout",
      "Furniture-ready handoff with care guidance",
    ],
    faqs: [
      {
        question: "Which flooring is right for our home?",
        answer:
          "There's no universal best — hardwood, LVP, and tile each win in different rooms and budgets. We'll match options to how each space actually gets used.",
      },
      {
        question: "Can new flooring go over the old?",
        answer:
          "Sometimes, and when it's appropriate it saves money. When it would compromise the result, we'll say so and explain why.",
      },
      {
        question: "How soon can we walk on it?",
        answer:
          "LVP and tile are quick; hardwood finishes need cure time. We'll give you exact timing for your material before we start.",
      },
    ],
  },
  "luxury-vinyl-plank": {
    icon: "flooring",
    summary: "Beautiful, resilient LVP — the practical floor that doesn't look practical.",
    overview:
      "Luxury vinyl plank has earned its place: waterproof, durable, and convincing underfoot. The difference between LVP that lasts and LVP that lifts is preparation and installation discipline — flat subfloors, correct expansion gaps, and clean cuts around every doorway.",
    benefits: [
      "Waterproof performance for kitchens, baths, basements, and busy homes",
      "Meticulous subfloor flattening so planks never click or bounce",
      "Tight, clean cuts at thresholds, vents, and trim",
      "Honest guidance on quality tiers — where paying more matters",
    ],
    faqs: [
      {
        question: "Is LVP really waterproof?",
        answer:
          "The planks are; the floor system is only as good as its installation. Correct perimeter treatment and transitions are what protect the subfloor beneath.",
      },
      {
        question: "Will it look cheap?",
        answer:
          "Modern LVP ranges widely. We'll show you the tiers honestly — including which budget lines hold up and which we'd skip.",
      },
      {
        question: "Can LVP go in below-grade or over concrete?",
        answer:
          "Yes, with the right underlayment and moisture handling — one of LVP's genuine strengths.",
      },
    ],
  },
  "hardwood-flooring": {
    icon: "flooring",
    summary: "Solid and engineered hardwood installed with the care a lifetime floor deserves.",
    overview:
      "Hardwood is the floor people fall in love with — warm, repairable, and better with age when installed right. Acclimation, moisture checks, and layout planning are where hardwood installations are won, long before the first board is nailed.",
    benefits: [
      "Proper acclimation and moisture testing before installation begins",
      "Solid vs. engineered guidance matched to your rooms and slab/subfloor",
      "Thoughtful board layout, borders, and direction planning",
      "A floor that can be refinished and loved for decades",
    ],
    faqs: [
      {
        question: "Solid or engineered — which should we choose?",
        answer:
          "Engineered handles moisture swings and slabs better; solid offers the most refinishing life. Your rooms and subfloor decide, and we'll walk it with you.",
      },
      {
        question: "Why does acclimation matter?",
        answer:
          "Wood moves with humidity. Skipping acclimation is how gaps and cupping happen — so we don't skip it.",
      },
      {
        question: "Can hardwood work with pets?",
        answer:
          "Yes, with the right species and finish hardness. We'll be candid about which choices show life and which shrug it off.",
      },
    ],
  },
  "tile-installation": {
    icon: "flooring",
    summary: "Floors, showers, and backsplashes set level, true, and built to stay that way.",
    overview:
      "Tile is permanent — which makes preparation everything. Substrate, waterproofing, layout, and lippage control are decided before the first tile is set. We install floors, showers, and backsplashes with the flatness and detail that make tile worth its permanence.",
    benefits: [
      "Correct substrate and waterproofing for wet areas — no shortcuts",
      "Layout planning so cuts land where eyes don't",
      "Level, lippage-controlled surfaces and clean, sealed grout lines",
      "Tile, stone, and pattern guidance without showroom pressure",
    ],
    faqs: [
      {
        question: "What makes a shower installation last?",
        answer:
          "The waterproofing system behind the tile. Tile and grout are the finish, not the barrier — and we build the barrier right.",
      },
      {
        question: "Large-format tile — worth it?",
        answer:
          "It's beautiful and less forgiving; it demands flatter substrates and careful handling. When your space suits it, we'll say so; when it doesn't, we'll say that too.",
      },
      {
        question: "Can you tile over existing tile?",
        answer:
          "Occasionally it's appropriate; often it isn't. Height, bond, and condition decide — honestly assessed for free.",
      },
    ],
  },
  painting: {
    icon: "paint",
    summary: "Crisp lines, premium paints, and tidy work — interior and exterior.",
    overview:
      "Paint is the most visible craftsmanship in a home, and it's ninety percent preparation. We fill, sand, prime, and protect before color ever touches a wall — then cut lines you'll stop to admire.",
    benefits: [
      "Thorough prep: patching, sanding, caulking, priming",
      "Premium paints matched honestly to each surface and room",
      "Crisp cut lines, even coverage, and complete daily cleanup",
      "Color guidance that respects your taste and your light",
    ],
    faqs: [
      {
        question: "Why do quotes vary so much between painters?",
        answer:
          "Preparation. A low quote often prices skipping it. Ours spells out exactly what prep is included so you can compare honestly.",
      },
      {
        question: "How many coats will we get?",
        answer:
          "Whatever full, even coverage requires for your colors and surfaces — stated in the estimate, not discovered later.",
      },
      {
        question: "Do you handle exterior painting too?",
        answer:
          "Yes — with weather-appropriate scheduling, proper surface prep, and products made for Tennessee sun and humidity.",
      },
    ],
  },
  "drywall-repair": {
    icon: "drywall",
    summary: "Seamless patches and smooth finishes that disappear into the wall.",
    overview:
      "Good drywall repair is invisible. From doorknob holes to water-damaged ceilings to whole-wall retexturing, we match texture, feather seams, and finish to the point where you stop being able to find the repair.",
    benefits: [
      "Patches feathered and textured to vanish into the existing wall",
      "Water damage assessed honestly — including the cause, not just the stain",
      "Dust containment and clean daily wrap-up",
      "Prime-and-paint completion available so the wall is truly finished",
    ],
    faqs: [
      {
        question: "Can you match our wall texture?",
        answer:
          "Almost always — texture matching is most of the craft. We test in an inconspicuous spot until it blends.",
      },
      {
        question: "There's a stain on the ceiling. Just patch it?",
        answer:
          "Not until we know the leak that caused it is resolved. Painting over an active problem isn't a repair, and we won't pretend it is.",
      },
      {
        question: "Is a small hole worth a professional visit?",
        answer:
          "We handle small repairs gladly, and often group several fixes into one efficient visit.",
      },
    ],
  },
  "roof-inspections": {
    icon: "roof",
    summary: "Free, honest roof evaluations with photos of exactly what we find.",
    overview:
      "Most homeowners can't see their own roof — which makes trust the whole product. Our inspections come with photos of what we find and plain-language explanations of what matters now, what can wait, and what's perfectly fine.",
    benefits: [
      "Free inspections with photo documentation of findings",
      "Plain-language triage: urgent, watch, or fine",
      "Storm-damage assessments documented usefully for your records",
      "No-pressure guidance — 'your roof is fine' is a real outcome here",
    ],
    faqs: [
      {
        question: "How often should a roof be inspected?",
        answer:
          "After major storms, and periodically as a roof ages. Catching small failures early is dramatically cheaper than finding them via ceiling stain.",
      },
      {
        question: "Will you try to sell me a new roof?",
        answer:
          "No. The inspection reports what's true. If repair serves you better than replacement, that's what we'll recommend — it's the first promise of The Slayton Standard.",
      },
      {
        question: "Can you document damage for an insurance conversation?",
        answer:
          "We provide clear photos and honest findings you can share with your insurer; decisions and claims remain between you and them.",
      },
    ],
  },
  "roof-repairs": {
    icon: "roof",
    summary: "Honest roof evaluations and quality repairs. If it doesn't need replacing, we'll say so.",
    overview:
      "A well-executed repair often buys a roof years of honest life. We repair shingles, flashing, boots, and penetrations with materials that match and workmanship that seals — and we tell you plainly when repair is the right call versus when it's just postponing the inevitable.",
    benefits: [
      "Repair-first honesty: replacement recommended only when it's truly time",
      "Flashing, boot, and penetration work — where most leaks actually start",
      "Materials matched to your existing roof",
      "Photo documentation of the completed work",
    ],
    faqs: [
      {
        question: "How do I know if I need repair or replacement?",
        answer:
          "Age, extent, and pattern of damage decide. Isolated damage on a roof with life left repairs well; systemic failure doesn't. The free evaluation gives you the honest read.",
      },
      {
        question: "Can you find a leak that only shows up sometimes?",
        answer:
          "Intermittent leaks usually track to flashing or penetrations uphill of the stain. Finding the true entry point is the job — patching the wrong spot isn't.",
      },
      {
        question: "Do repairs match the existing shingles?",
        answer:
          "We match as closely as available materials allow and show you options before work begins.",
      },
    ],
  },
  "pressure-washing": {
    icon: "pressure",
    summary: "Driveways, siding, decks, and patios — renewed with the right pressure for each surface.",
    overview:
      "Pressure washing done wrong etches concrete, strips wood, and drives water behind siding. Done right, it's the fastest transformation a home can get. We match method and pressure to each surface, because the goal is clean — not stripped.",
    benefits: [
      "Surface-correct methods: high pressure only where surfaces welcome it",
      "Driveways, walks, and patios brought back to their real color",
      "Pre-treatment of oil, rust, and organic stains where needed",
      "Careful protection of plants, fixtures, and openings",
    ],
    faqs: [
      {
        question: "Is pressure washing safe for every surface?",
        answer:
          "No — and that's the point of hiring someone careful. Softer surfaces get soft washing; hard surfaces get pressure. We choose per surface, not per job.",
      },
      {
        question: "How often should exterior surfaces be cleaned?",
        answer:
          "Most Middle Tennessee homes benefit from periodic cleaning as mildew and grime build. We'll tell you honestly what cadence your home actually needs.",
      },
      {
        question: "Will it remove every stain?",
        answer:
          "Most, with the right pre-treatment. Some deep-set stains lighten rather than vanish — and we'll set that expectation before we start, not after.",
      },
    ],
  },
  "soft-washing": {
    icon: "pressure",
    summary: "Low-pressure cleaning that lifts organic growth without harming delicate surfaces.",
    overview:
      "Roofs, painted siding, and delicate surfaces shouldn't meet high pressure. Soft washing uses low pressure and appropriate cleaning solutions to remove algae, mildew, and grime gently — killing the growth at its source instead of blasting the surface that hosts it.",
    benefits: [
      "Safe cleaning for roofs, siding, and surfaces pressure would damage",
      "Treats organic growth at the source for longer-lasting results",
      "Careful plant and property protection throughout",
      "Honest guidance on which method — soft or pressure — each surface needs",
    ],
    faqs: [
      {
        question: "Why not just pressure wash the roof?",
        answer:
          "High pressure strips granules and shortens shingle life. Soft washing cleans the growth without spending your roof to do it.",
      },
      {
        question: "Are the cleaning solutions safe for landscaping?",
        answer:
          "We protect and rinse plantings as part of the process — care for your property is the standard, not an add-on.",
      },
      {
        question: "How long do results last?",
        answer:
          "Because soft washing treats the growth itself, results typically outlast pressure-only cleaning. Shade and moisture on your lot set the real timeline, and we'll be honest about it.",
      },
    ],
  },
  "concrete-cleaning": {
    icon: "pressure",
    summary: "Driveways, patios, and walkways restored to the color you forgot they were.",
    overview:
      "Concrete quietly collects years of tire marks, oil, rust, and organic growth. Professional cleaning with surface cleaners and targeted pre-treatments brings back the original color evenly — no zebra striping, no etching.",
    benefits: [
      "Even, stripe-free results from professional surface cleaners",
      "Targeted treatment for oil, rust, and organic stains",
      "Safer, brighter walkways — clean concrete is grippier concrete",
      "Optional guidance on sealing to keep it cleaner longer",
    ],
    faqs: [
      {
        question: "Why does DIY pressure washing leave stripes?",
        answer:
          "Wand-only cleaning applies uneven passes. Surface cleaners maintain consistent distance and overlap — that's the difference you're seeing.",
      },
      {
        question: "Can old oil stains come out?",
        answer:
          "Most improve dramatically with proper pre-treatment; the oldest may lighten rather than disappear. We'll assess honestly up front.",
      },
      {
        question: "Should concrete be sealed afterward?",
        answer:
          "Sealing helps concrete resist stains and weather. It's optional — we'll tell you whether your concrete would genuinely benefit.",
      },
    ],
  },
  "deck-construction": {
    icon: "deck",
    summary: "Outdoor living built solid — decks designed and constructed to be enjoyed for decades.",
    overview:
      "A deck is a structure first and a living space second. Footings, ledger attachment, joist spacing, and fastener choice decide whether it's still solid in twenty years. We design for how you'll actually use the space, then build it like it's attached to our own home — because that's the standard.",
    benefits: [
      "Structural fundamentals done right: footings, ledger, framing, fasteners",
      "Design around your yard, sun, privacy, and how you'll really use it",
      "Material guidance — pressure-treated, cedar, composite — with honest trade-offs",
      "Built to applicable codes with clean, finished detailing",
    ],
    faqs: [
      {
        question: "Wood or composite?",
        answer:
          "Composite costs more up front and less in maintenance; wood is the reverse. Neither is universally right — your budget and appetite for upkeep decide.",
      },
      {
        question: "How long does a deck build take?",
        answer:
          "Scope and weather set the schedule; we set a realistic timeline before starting and keep you posted as it moves.",
      },
      {
        question: "Can you replace just the decking on a good frame?",
        answer:
          "If the structure is genuinely sound, yes — and we'll verify that honestly before recommending it.",
      },
    ],
  },
  "deck-repair": {
    icon: "deck",
    summary: "Loose boards, soft spots, and wobbly rails made safe and solid again.",
    overview:
      "Decks fail gradually — a soft board, a loose rail, a post that moves. Repair at that stage is straightforward and far cheaper than rebuilding after neglect. We assess the structure honestly, fix what's failing, and tell you plainly how much life your deck really has.",
    benefits: [
      "Safety-first assessment of structure, ledger, and railings",
      "Board, rail, stair, and fastener repairs that blend in",
      "Honest repair-vs-rebuild guidance based on the frame's real condition",
      "Cleaning and re-sealing guidance to extend the deck's life",
    ],
    faqs: [
      {
        question: "My deck feels bouncy — is that dangerous?",
        answer:
          "It can be, depending on the cause. Movement warrants an inspection; some causes are simple reinforcement, others matter more. We'll tell you which yours is.",
      },
      {
        question: "Can single boards be replaced without redecking?",
        answer:
          "Yes. New boards won't match weathered ones immediately, but they blend with time — and we'll show you what to expect.",
      },
      {
        question: "When is repair no longer worth it?",
        answer:
          "When the frame or ledger is compromised. Cosmetic repair on a failing structure spends money without buying safety — we won't recommend it.",
      },
    ],
  },
  "fence-installation": {
    icon: "fence",
    summary: "Privacy, safety, and clean lines — fencing set straight and built to stay that way.",
    overview:
      "A fence is judged twice: the day it's finished and five winters later. Post depth, concrete setting, and gate construction decide the second judgment. We build wood and privacy fencing that runs straight, swings true, and holds its line through Tennessee seasons.",
    benefits: [
      "Posts set properly — depth and footing that survive freeze and clay soil",
      "Straight runs, consistent heights, and gates that keep swinging true",
      "Material and style guidance for privacy, pets, and curb appeal",
      "Clear property-line and utility-marking coordination before digging",
    ],
    faqs: [
      {
        question: "How do you handle property lines?",
        answer:
          "We build to the lines you establish. When there's any doubt, confirming your survey before installation protects you — and we'll say so rather than guess.",
      },
      {
        question: "Why do some fences lean after a year?",
        answer:
          "Shallow posts and rushed footings. Setting posts correctly is slower and invisible on day one — and it's the entire difference by year five.",
      },
      {
        question: "What's involved before digging?",
        answer:
          "Utility locating gets called in before any post holes go down. It's non-negotiable, and we handle the coordination.",
      },
    ],
  },
  "fence-repair": {
    icon: "fence",
    summary: "Leaning posts, sagging gates, and broken sections restored to solid.",
    overview:
      "Fences rarely fail all at once — a leaning post here, a dragging gate there. Prompt repair keeps a good fence good. We reset posts, rebuild sections, and rehang gates so the fix blends with the fence instead of announcing itself.",
    benefits: [
      "Leaning posts reset with proper footings, not propped",
      "Gates rehung to swing and latch the way they should",
      "Section repairs matched to your existing materials",
      "Honest assessment of remaining fence life before you spend",
    ],
    faqs: [
      {
        question: "Can one leaning post be fixed without replacing the run?",
        answer:
          "Usually yes, if the neighboring posts are sound — which we'll check honestly rather than assume.",
      },
      {
        question: "Why does my gate sag?",
        answer:
          "Gates carry constant load on two hinges; sag comes from hinge posts or gate framing. Both are fixable, and we'll identify which yours is.",
      },
      {
        question: "Storm knocked a section down — can it match?",
        answer:
          "We rebuild with matching materials; new wood weathers into the old over a season.",
      },
    ],
  },
  "french-drains": {
    icon: "droplet",
    summary: "Standing water redirected — drainage that protects your foundation and yard.",
    overview:
      "Water always wins unless it's given somewhere better to go. French drains collect subsurface water and move it away from foundations, low spots, and soggy yards. Success is in the fundamentals: correct slope, proper fabric and stone, and a real discharge point.",
    benefits: [
      "Correct slope and depth — the difference between a drain and a buried pipe",
      "Quality fabric and stone so the system keeps flowing for years",
      "Discharge planning that moves water somewhere genuinely better",
      "Honest assessment of whether a French drain is even the right fix",
    ],
    faqs: [
      {
        question: "Will a French drain fix my wet yard?",
        answer:
          "If subsurface water is the cause, yes. If grading or gutters are the real culprit, we'll tell you — a drain shouldn't be sold where a downspout extension would do.",
      },
      {
        question: "Where does the water go?",
        answer:
          "To a legitimate discharge point — daylight, a dry well, or approved drainage — planned before digging, not improvised after.",
      },
      {
        question: "How long do French drains last?",
        answer:
          "Properly built systems with quality fabric last many years. Skipped fabric and wrong stone clog early — which is why we don't skip them.",
      },
    ],
  },
  "sump-pumps": {
    icon: "droplet",
    summary: "Reliable pumps, correctly installed — protection that works the night it matters.",
    overview:
      "A sump pump is insurance you hope stays quiet — until the storm when it's the most important machine in the house. We install and replace pumps with correct basins, check valves, and discharge routing, and we're honest about capacity, backup options, and when your water problem needs more than a pump.",
    benefits: [
      "Correct sizing for your water volume — not just the cheapest unit",
      "Proper basin, check valve, and discharge installation",
      "Honest guidance on battery backup for storm-outage protection",
      "Straight talk when the real fix is drainage, not pumping",
    ],
    faqs: [
      {
        question: "How do I know if my current pump still works?",
        answer:
          "Pumps age quietly. Testing is quick, and if yours is fine we'll tell you exactly that.",
      },
      {
        question: "Is battery backup worth it?",
        answer:
          "Heavy storms and power outages arrive together. If your crawlspace or basement floods when the power's out, backup isn't a luxury — but we'll assess your actual risk honestly.",
      },
      {
        question: "My pump runs constantly. Is that normal?",
        answer:
          "It's a symptom worth diagnosing — sometimes float adjustment, sometimes a drainage problem the pump is masking. We'll find which.",
      },
    ],
  },
  "moisture-control": {
    icon: "droplet",
    summary: "Humidity, condensation, and damp handled at the source — not masked.",
    overview:
      "Moisture is the quiet enemy of homes — feeding mold, warping wood, and rotting structure from the inside. Real moisture control finds the source: drainage, ventilation, vapor barriers, or humidity. We diagnose honestly and fix causes, because dehumidifying a symptom forever isn't a solution.",
    benefits: [
      "Source diagnosis first — drainage, ventilation, vapor, or humidity",
      "Solutions matched to the actual cause, not a one-size package",
      "Healthier air and protected structure, verified after the work",
      "Plain-language findings you can understand and act on",
    ],
    faqs: [
      {
        question: "Musty smell — how serious is it?",
        answer:
          "It's your house reporting moisture somewhere. Serious depends on source and duration; finding out early is always cheaper than finding out late.",
      },
      {
        question: "Is a dehumidifier enough?",
        answer:
          "Sometimes it's part of the answer; alone, it often just masks a source problem while the meter runs. Diagnosis comes first.",
      },
      {
        question: "Does moisture control help with allergies?",
        answer:
          "Controlling moisture controls what grows in it. Many families notice the difference — though we'll never promise medical outcomes.",
      },
    ],
  },
  "crawlspace-encapsulation": {
    icon: "crawlspace",
    summary: "Sealed, conditioned crawlspaces — dry foundations and healthier air above.",
    overview:
      "Your home breathes its crawlspace air. Encapsulation seals the ground and walls with heavy vapor barrier, closes outside air paths, and manages humidity — turning a damp dirt cave into a clean, dry space that protects everything built above it.",
    benefits: [
      "Heavy-duty vapor barrier sealed properly at seams, piers, and walls",
      "Humidity management sized for the space",
      "Protection for floor structure, insulation, and indoor air quality",
      "Honest pre-assessment — including when full encapsulation isn't necessary",
    ],
    faqs: [
      {
        question: "Does every crawlspace need encapsulation?",
        answer:
          "No. Some need drainage first, some need only targeted moisture fixes, and some genuinely benefit from full encapsulation. The free inspection tells you which yours is.",
      },
      {
        question: "What's actually included?",
        answer:
          "Ground and wall vapor barrier, sealed vents and penetrations, and humidity control as conditions require — itemized clearly in your estimate.",
      },
      {
        question: "Will it help my floors feel less cold?",
        answer:
          "A sealed, drier crawlspace commonly improves comfort in the rooms above; the degree depends on your home's construction, and we'll set expectations honestly.",
      },
    ],
  },
  "crawlspace-inspections": {
    icon: "crawlspace",
    summary: "The space under your home, honestly assessed — with photos you can see.",
    overview:
      "Almost nobody looks in their own crawlspace, which is exactly why problems grow there. Our inspections crawl the whole space and come back with photos and plain findings: moisture, insulation condition, ductwork, pests' calling cards, and structure — what's urgent, what's watchable, what's fine.",
    benefits: [
      "Full-space inspection with photo documentation",
      "Moisture, insulation, structure, and pest-evidence review",
      "Plain-language triage instead of a scare report",
      "Free, no-obligation findings — even when everything's fine",
    ],
    faqs: [
      {
        question: "How often should a crawlspace be checked?",
        answer:
          "Periodically, and after any plumbing leak or major water event. Crawlspace problems are cheapest at the stage nobody's noticed them yet.",
      },
      {
        question: "What do you look for?",
        answer:
          "Standing water and moisture patterns, vapor barrier condition, insulation, duct integrity, pest evidence, and the visible structure — documented in photos.",
      },
      {
        question: "Will the inspection turn into a sales pitch?",
        answer:
          "No. You'll get findings and honest options. 'Your crawlspace is in good shape' is a report we're glad to deliver.",
      },
    ],
  },
  "property-maintenance": {
    icon: "maintenance",
    summary: "Seasonal care and small fixes handled before they become big problems.",
    overview:
      "Homes don't fail suddenly; they fail slowly and then suddenly. General maintenance is the discipline of catching the slow part — the loose railing, the clogged gutter, the caulk line giving up. We handle the running list every home accumulates, with one trusted team instead of five phone calls.",
    benefits: [
      "One accountable team for the whole running list",
      "Small repairs done properly, not patched",
      "Preventive eyes: we flag what's starting to fail while it's still cheap",
      "Flexible help — one visit or an ongoing rhythm",
    ],
    faqs: [
      {
        question: "Is my list too small to call about?",
        answer:
          "No list is too small. Grouping several small items into one visit is often the most efficient way to work through them.",
      },
      {
        question: "Can you look for problems I haven't noticed?",
        answer:
          "Gladly — a walkthrough with experienced eyes routinely catches early-stage issues, and we'll report honestly, including the ones that can wait.",
      },
      {
        question: "Do you offer recurring maintenance?",
        answer:
          "Yes — seasonal and recurring arrangements are available, shaped around what your home actually needs rather than a fixed upsell package.",
      },
    ],
  },
  "seasonal-maintenance": {
    icon: "calendar",
    summary: "Spring and fall readiness — your home prepared for what Tennessee brings next.",
    overview:
      "Middle Tennessee seasons are hard on houses: spring storms, humid summers, freeze-thaw winters, and clay soil moving under it all. Seasonal maintenance works the checklist that matters here — gutters, drainage, seals, exterior condition — before each season tests them.",
    benefits: [
      "A Tennessee-specific checklist, not a generic national one",
      "Gutter, drainage, and seal readiness ahead of storm and freeze seasons",
      "Small findings fixed on the spot or quoted honestly",
      "A photo-documented record of your home's condition over time",
    ],
    faqs: [
      {
        question: "When should seasonal visits happen?",
        answer:
          "Spring and fall are the natural anchors — ahead of storm season and ahead of freeze. We'll suggest timing that fits your home.",
      },
      {
        question: "What does a visit cover?",
        answer:
          "Exterior condition, gutters and drainage, seals and caulking, and the seasonal risk points for your specific property — with findings reported plainly.",
      },
      {
        question: "Is this just a way to find things to sell me?",
        answer:
          "It's a way to find things while they're small. Most findings are minor, some visits find nothing urgent at all, and the report says so honestly either way.",
      },
    ],
  },
  "emergency-property-repairs": {
    icon: "emergency",
    summary: "When something urgent happens to your home, we respond quickly and set it right.",
    overview:
      "Storm damage, sudden leaks, a failed fence with pets in the yard — some problems can't wait for next week. We prioritize genuine emergencies, stabilize the immediate damage, and then plan the permanent repair with the same honesty as any other project: what's urgent now, and what's the right fix after.",
    benefits: [
      "Rapid response prioritized for genuine emergencies",
      "Stabilization first — stopping active damage before it spreads",
      "A clear, honest plan for the permanent repair afterward",
      "One call instead of a panicked search",
    ],
    faqs: [
      {
        question: "What counts as an emergency?",
        answer:
          "Active water intrusion, storm damage exposing your home, safety hazards — anything where waiting makes it worse. If you're unsure, call and we'll tell you honestly.",
      },
      {
        question: "What should I do while waiting?",
        answer:
          "If it's safe: contain water, shut off supply valves for plumbing leaks, and keep people away from damaged structures. We'll guide you on the phone.",
      },
      {
        question: "Is emergency work priced fairly?",
        answer:
          "You'll get a clear price before work begins — urgency never becomes an excuse for a surprise bill.",
      },
    ],
  },
  "home-consulting": {
    icon: "consulting",
    summary: "Planning a project? Get honest guidance on scope, sequence, and budget first.",
    overview:
      "The cheapest mistakes are the ones you don't make. Home consulting is an hour or two of honest expertise before you commit: what your project really involves, what order to do things in, where budgets go wrong, and which parts you genuinely don't need. Useful whether or not we ever swing a hammer for you.",
    benefits: [
      "Honest scoping — including the parts of your plan you can skip",
      "Budget reality-checks before commitments, not after",
      "Sequencing guidance so projects don't undo each other",
      "Advice that stands on its own, with zero obligation to hire us",
    ],
    faqs: [
      {
        question: "Why pay for advice when contractors quote free?",
        answer:
          "A quote answers 'what would you charge?' A consultation answers 'what should I actually do?' — those are different questions, and the second one has no sales pressure inside it.",
      },
      {
        question: "Can you review another contractor's proposal?",
        answer:
          "Yes — we'll give you an honest read on scope and approach. We won't trash competitors; we'll help you ask the right questions.",
      },
      {
        question: "What if the honest advice is 'don't do this project'?",
        answer:
          "Then that's what you'll hear. Talking someone out of a bad project is some of the most valuable work we do.",
      },
    ],
  },
  "pest-control": {
    icon: "pest",
    summary: "Respectful, thorough pest protection that keeps your home comfortably yours.",
    overview:
      "A home should belong to the people in it. Our pest control pairs thorough treatment with honest prevention — sealing the entry points and addressing the conditions that invited pests in the first place, so the fix lasts longer than the spray.",
    benefits: [
      "Treatment plus prevention: entry points and attractants addressed",
      "Respectful service in your home — careful around family, pets, and property",
      "Honest scoping: one-time treatment vs. recurring, based on your situation",
      "Plain answers about what we're using and why",
    ],
    faqs: [
      {
        question: "One-time treatment or a recurring plan?",
        answer:
          "It depends on the pest and the pressure around your home. Some problems resolve in one honest visit; some genuinely benefit from a rhythm — and we'll tell you which yours is.",
      },
      {
        question: "Is treatment safe around kids and pets?",
        answer:
          "We use products according to their labels, tell you exactly what's being applied and any re-entry timing, and answer every question plainly.",
      },
      {
        question: "Why do pests keep coming back?",
        answer:
          "Usually an unsealed entry point or a standing attractant. Treatment without prevention is a subscription to the problem — prevention is where we focus.",
      },
    ],
  },
  "junk-removal": {
    icon: "truck",
    summary: "Cleanouts, hauling, and honest disposal — space reclaimed without the dumpster.",
    overview:
      "Sometimes the project is simply making things gone: the garage that filled itself, the renovation debris, the estate cleanout nobody has energy for. We haul it carefully, dispose of it responsibly, and treat your home — and whatever we're carrying out of it — with respect.",
    benefits: [
      "Careful removal that protects floors, walls, and doorways",
      "Responsible disposal, with donation and recycling where practical",
      "Clear, upfront pricing by scope — no surprise truck fees",
      "Respectful handling for sensitive cleanouts",
    ],
    faqs: [
      {
        question: "What will you haul?",
        answer:
          "Most household items, furniture, appliances, and renovation debris. A few materials require special disposal — we'll tell you honestly what we can and can't take.",
      },
      {
        question: "Do I need to move everything to the curb?",
        answer:
          "No — removal from inside the home is the service. Point at it; we'll handle the rest carefully.",
      },
      {
        question: "What happens to items in good condition?",
        answer:
          "Where practical, usable items go to donation rather than landfill. Throwing away something someone could use isn't our first choice either.",
      },
    ],
  },
};

/** Ordered related services: same-category siblings first, then featured neighbors. */
export function getRelatedServices(slug: string, limit = 3): Service[] {
  const current = services.find((service) => service.slug === slug);
  if (!current) return [];
  const siblings = services.filter(
    (service) => service.category === current.category && service.slug !== slug,
  );
  const fillers = services.filter(
    (service) =>
      service.featured && service.slug !== slug && service.category !== current.category,
  );
  return [...siblings, ...fillers].slice(0, limit);
}

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}
