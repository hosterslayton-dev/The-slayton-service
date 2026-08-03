import type { BeforeAfterPair, ImageAsset } from "@/types/content";
import { getServiceBySlug, type ServiceCategory } from "@/config/services";
import { projects, type ProjectMediaSet } from "@/config/projects";

/**
 * ─────────────────────────────────────────────────────────────────
 * GALLERY CONFIGURATION (Phase 6 · expanded by the photo pipeline)
 *
 * Single source for /gallery. Real project photography is authored
 * once in src/config/projects.ts and derived into gallery items
 * here — components keep consuming `galleryItems` and never touch
 * image paths. Launch entries below use the labeled placeholder
 * set (`sample: true` renders a visible badge and is announced in
 * item alt text) so filtering, search, and the lightbox are real
 * and demonstrable. Replace them 1:1 with documented project
 * photography by populating projects.ts; set `sample: false` only
 * for real work. Sample flags are removed by replacing content —
 * never by deleting the label.
 * ─────────────────────────────────────────────────────────────────
 */

interface GalleryItemBase {
  id: string;
  title: string;
  category: ServiceCategory;
  city?: string;
  serviceSlug?: string;
  sample: boolean;
}

export type GalleryItem =
  | (GalleryItemBase & { type: "image"; image: ImageAsset })
  | (GalleryItemBase & { type: "beforeAfter"; pair: BeforeAfterPair });

/** Labeled launch placeholders — replaced 1:1 by real photography. */
const launchGalleryItems: GalleryItem[] = [
  {
    id: "sample-kitchen",
    type: "image",
    title: "Kitchen remodel concept board",
    category: "Remodeling & Renovation",
    city: "Gallatin",
    serviceSlug: "kitchen-remodeling",
    sample: true,
    image: { src: "/placeholders/sample-1.jpg", alt: "Sample placeholder — kitchen remodel", width: 1200, height: 900 },
  },
  {
    id: "sample-roof",
    type: "image",
    title: "Roof repair documentation",
    category: "Roofing",
    city: "Hendersonville",
    serviceSlug: "roof-repairs",
    sample: true,
    image: { src: "/placeholders/sample-2.jpg", alt: "Sample placeholder — roof repair", width: 1200, height: 900 },
  },
  {
    id: "sample-exterior",
    type: "image",
    title: "Exterior refresh study",
    category: "Remodeling & Renovation",
    city: "Mt. Juliet",
    serviceSlug: "exterior-renovations",
    sample: true,
    image: { src: "/placeholders/sample-3.jpg", alt: "Sample placeholder — exterior renovation", width: 1200, height: 900 },
  },
  {
    id: "sample-flooring",
    type: "image",
    title: "Flooring installation detail",
    category: "Flooring",
    city: "Lebanon",
    serviceSlug: "flooring",
    sample: true,
    image: { src: "/placeholders/sample-4.jpg", alt: "Sample placeholder — flooring detail", width: 1200, height: 900 },
  },
  {
    id: "sample-deck-pair",
    type: "beforeAfter",
    title: "Deck restoration comparison",
    category: "Outdoor Structures",
    city: "White House",
    serviceSlug: "deck-repair",
    sample: true,
    pair: {
      before: { src: "/placeholders/before.jpg", alt: "Sample placeholder — deck before", width: 1200, height: 900 },
      after: { src: "/placeholders/after.jpg", alt: "Sample placeholder — deck after", width: 1200, height: 900 },
      caption: "Sample placeholder — a real before & after will replace this pair.",
    },
  },
];

/**
 * Derive gallery items from one project's media set. The category
 * comes from the authoritative service catalog; a set whose
 * `serviceSlug` is not in the catalog is skipped (a config error
 * surfaces as a missing project during review, never as a
 * miscategorized one). Before/after images pair by index into
 * comparison sliders; unpaired extras, progress, and completion
 * shots join the photo grid. The featured image leads the set.
 */
function deriveProjectItems(project: ProjectMediaSet): GalleryItem[] {
  const service = getServiceBySlug(project.serviceSlug);
  if (!service) return [];

  const base = {
    category: service.category,
    city: project.city,
    serviceSlug: project.serviceSlug,
    sample: project.sample,
  };

  const items: GalleryItem[] = [
    {
      ...base,
      id: `${project.slug}-featured`,
      type: "image",
      title: project.title,
      image: project.featuredImage,
    },
  ];

  const pairCount = Math.min(project.beforeImages.length, project.afterImages.length);
  for (let index = 0; index < pairCount; index += 1) {
    const before = project.beforeImages[index];
    const after = project.afterImages[index];
    if (!before || !after) continue;
    items.push({
      ...base,
      id: `${project.slug}-pair-${index + 1}`,
      type: "beforeAfter",
      title: `${project.title} — before & after`,
      pair: { before, after, caption: `${project.title} · ${project.city}` },
    });
  }

  const singles: Array<{ label: string; images: ImageAsset[] }> = [
    { label: "completed", images: project.completionImages },
    { label: "progress", images: project.progressImages },
    { label: "before", images: project.beforeImages.slice(pairCount) },
    { label: "after", images: project.afterImages.slice(pairCount) },
  ];
  for (const group of singles) {
    group.images.forEach((image, index) => {
      items.push({
        ...base,
        id: `${project.slug}-${group.label}-${index + 1}`,
        type: "image",
        title: `${project.title} — ${group.label}`,
        image,
      });
    });
  }

  return items;
}

/**
 * The list every gallery component consumes: real project
 * photography first (derived from projects.ts), then the labeled
 * launch placeholders. Components never hold image paths.
 */
export const galleryItems: GalleryItem[] = [
  ...projects.flatMap(deriveProjectItems),
  ...launchGalleryItems,
];

export function getGalleryCategories(): ServiceCategory[] {
  return [...new Set(galleryItems.map((item) => item.category))];
}
