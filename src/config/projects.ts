import type { ImageAsset } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────
 * PROJECT MEDIA CONFIGURATION — real photography pipeline
 *
 * Single source for documented project photography. The gallery
 * derives its items from this file automatically (see
 * src/config/gallery.ts), so publishing a project's photos takes
 * two steps and no component changes:
 *
 *   1. Place the images in /public/projects/<slug>/, e.g.
 *        public/projects/kitchen-remodel/
 *          before-1.webp · after-1.webp · progress-1.webp ·
 *          finished-1.webp
 *   2. Add one ProjectMediaSet object to `projects` below.
 *
 * Shape example (documentation — real entries carry real photos):
 *
 *   {
 *     slug: "kitchen-remodel-gallatin",
 *     title: "Kitchen Remodel",
 *     city: "Gallatin",
 *     serviceSlug: "kitchen-remodeling",
 *     description: "Full kitchen renovation with new cabinetry.",
 *     sample: false,
 *     featuredImage: { src: "/projects/<slug>/finished-1.webp",
 *       alt: "Finished kitchen with new cabinetry", width: 1600, height: 1200 },
 *     beforeImages: [ … ], afterImages: [ … ],
 *     progressImages: [ … ], completionImages: [ … ],
 *   }
 *
 * Rules of the pipeline:
 *   • `serviceSlug` must exist in the authoritative catalog
 *     (src/config/services.ts) — the gallery category derives from
 *     it, and entries with unknown slugs are skipped rather than
 *     miscategorized.
 *   • Before/after images pair by index into comparison sliders;
 *     unpaired extras join the photo grid individually.
 *   • Alt text is written per image at authoring time — it ships
 *     with the asset, never generated in components.
 *   • Drone/video fields are typed placeholders per the platform
 *     honesty rule: a slot renders nothing until real footage
 *     (`src`) exists — the UI never mounts an empty fake player.
 *   • This file ships empty because no documented project
 *     photography exists yet; the gallery continues to show its
 *     labeled launch samples until real sets land here. Mark
 *     `sample: true` only if a set itself uses placeholder
 *     imagery — real photography ships `sample: false`.
 *
 * The `slug` namespace is shared with the Part 8 ProjectRecord
 * (src/types/content.ts): when the Project Library phase ships,
 * each record's gallery and before/after content derives from the
 * media set of the same slug — no re-entry, no rework.
 * ─────────────────────────────────────────────────────────────────
 */

/** Typed placeholder for future footage; renders only when `src` exists. */
export interface ProjectVideoPlaceholder {
  title: string;
  /** Poster frame for the facade player once footage exists. */
  poster?: ImageAsset;
  /** Hosted footage URL. While absent, consuming UI self-hides. */
  src?: string;
}

export interface ProjectMediaSet {
  /** Folder name under /public/projects and the Part 8 record slug. */
  slug: string;
  title: string;
  city: string;
  /** Authoritative catalog slug (src/config/services.ts). */
  serviceSlug: string;
  description: string;
  featuredImage: ImageAsset;
  beforeImages: ImageAsset[];
  afterImages: ImageAsset[];
  progressImages: ImageAsset[];
  completionImages: ImageAsset[];
  /** Aerial footage slot — placeholder until real footage exists. */
  droneFootage?: ProjectVideoPlaceholder;
  /** Walkthrough/testimonial footage slot — same placeholder rule. */
  video?: ProjectVideoPlaceholder;
  /** Curated emphasis for future Featured Projects surfaces. */
  featured?: boolean;
  /** Constitutional label; real photography ships `sample: false`. */
  sample: boolean;
}

export const projects: ProjectMediaSet[] = [];

export function getProjectBySlug(slug: string): ProjectMediaSet | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): ProjectMediaSet[] {
  return projects.filter((project) => project.featured === true);
}
