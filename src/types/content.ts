/**
 * ─────────────────────────────────────────────────────────────────
 * SHARED CONTENT TYPES
 *
 * Forward-declared shapes for the platform's content modules so
 * later phases (Services pages, Project Library, Home Journal,
 * Learning Center) build against stable contracts. These types
 * mirror the authoritative templates:
 *   • Project pages   → Part 8 expanded template
 *   • Journal entries → Part 7 education ecosystem
 * ─────────────────────────────────────────────────────────────────
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BeforeAfterPair {
  before: ImageAsset;
  after: ImageAsset;
  caption?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location?: string;
  /** e.g. "Google", "Facebook", "Website" */
  source?: string;
  themes?: string[];
}

/** Part 8 authoritative project template (permanent). */
export interface ProjectRecord {
  slug: string;
  title: string;
  summary: string;
  serviceSlugs: string[];
  city: string;
  hero: ImageAsset;
  customerGoals: string;
  initialChallenges: string;
  inspectionFindings?: string;
  recommendedSolution: string;
  scopeOfWork: string[];
  materialsUsed?: string[];
  timeline?: string;
  budgetRange?: string;
  beforeAfter?: BeforeAfterPair[];
  gallery?: ImageAsset[];
  testimonial?: Testimonial;
  lessonsLearned?: string;
  maintenanceTips?: string[];
  relatedJournalSlugs?: string[];
  completedAt?: string; // ISO date
  featured?: boolean;
}

/** Home Journal article shell (Part 7). */
export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string; // ISO date
  hero?: ImageAsset;
  relatedServiceSlugs?: string[];
}
