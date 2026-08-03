/**
 * ─────────────────────────────────────────────────────────────────
 * AUTHORITATIVE SERVICE CATALOG
 *
 * Source: Part 6 — Services Architecture & SEO Foundation, confirmed
 * authoritative by the Enterprise Project Constitution. Homepage
 * "featured" services are a curated subset (`featured: true`).
 *
 * Each entry carries the slug that its dedicated SEO landing page
 * will use when the Services phase ships, so URLs are stable from
 * day one and can be referenced by sitemap, schema, and internal
 * linking without rework.
 * ─────────────────────────────────────────────────────────────────
 */

export type ServiceCategory =
  | "Remodeling & Renovation"
  | "Flooring"
  | "Interior Finishes"
  | "Roofing"
  | "Exterior Cleaning"
  | "Outdoor Structures"
  | "Water & Crawlspace"
  | "Maintenance & Repairs"
  | "Consulting & Specialty";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** Curated homepage subset per the Constitution. */
  featured: boolean;
}

export const services: Service[] = [
  // ── Remodeling & Renovation ─────────────────────────────────
  { slug: "kitchen-remodeling", name: "Kitchen Remodeling", category: "Remodeling & Renovation", featured: true },
  { slug: "bathroom-remodeling", name: "Bathroom Remodeling", category: "Remodeling & Renovation", featured: true },
  { slug: "whole-home-renovations", name: "Whole Home Renovations", category: "Remodeling & Renovation", featured: false },
  { slug: "interior-renovations", name: "Interior Renovations", category: "Remodeling & Renovation", featured: true },
  { slug: "exterior-renovations", name: "Exterior Renovations", category: "Remodeling & Renovation", featured: true },

  // ── Flooring ────────────────────────────────────────────────
  { slug: "flooring", name: "Flooring", category: "Flooring", featured: true },
  { slug: "luxury-vinyl-plank", name: "Luxury Vinyl Plank", category: "Flooring", featured: false },
  { slug: "hardwood-flooring", name: "Hardwood Flooring", category: "Flooring", featured: false },
  { slug: "tile-installation", name: "Tile Installation", category: "Flooring", featured: false },

  // ── Interior Finishes ───────────────────────────────────────
  { slug: "painting", name: "Painting", category: "Interior Finishes", featured: true },
  { slug: "drywall-repair", name: "Drywall Repair", category: "Interior Finishes", featured: true },

  // ── Roofing ─────────────────────────────────────────────────
  { slug: "roof-inspections", name: "Roof Inspections", category: "Roofing", featured: false },
  { slug: "roof-repairs", name: "Roof Repairs", category: "Roofing", featured: true },

  // ── Exterior Cleaning ───────────────────────────────────────
  { slug: "pressure-washing", name: "Pressure Washing", category: "Exterior Cleaning", featured: true },
  { slug: "soft-washing", name: "Soft Washing", category: "Exterior Cleaning", featured: false },
  { slug: "concrete-cleaning", name: "Concrete Cleaning", category: "Exterior Cleaning", featured: false },

  // ── Outdoor Structures ──────────────────────────────────────
  { slug: "deck-construction", name: "Deck Construction", category: "Outdoor Structures", featured: false },
  { slug: "deck-repair", name: "Deck Repair", category: "Outdoor Structures", featured: false },
  { slug: "fence-installation", name: "Fence Installation", category: "Outdoor Structures", featured: false },
  { slug: "fence-repair", name: "Fence Repair", category: "Outdoor Structures", featured: false },

  // ── Water & Crawlspace ──────────────────────────────────────
  { slug: "french-drains", name: "French Drains", category: "Water & Crawlspace", featured: false },
  { slug: "sump-pumps", name: "Sump Pumps", category: "Water & Crawlspace", featured: false },
  { slug: "moisture-control", name: "Moisture Control", category: "Water & Crawlspace", featured: false },
  { slug: "crawlspace-encapsulation", name: "Crawlspace Encapsulation", category: "Water & Crawlspace", featured: false },
  { slug: "crawlspace-inspections", name: "Crawlspace Inspections", category: "Water & Crawlspace", featured: false },

  // ── Maintenance & Repairs ───────────────────────────────────
  { slug: "property-maintenance", name: "General Property Maintenance", category: "Maintenance & Repairs", featured: true },
  { slug: "seasonal-maintenance", name: "Seasonal Maintenance", category: "Maintenance & Repairs", featured: false },
  { slug: "emergency-property-repairs", name: "Emergency Property Repairs", category: "Maintenance & Repairs", featured: true },

  // ── Consulting & Specialty ──────────────────────────────────
  { slug: "home-consulting", name: "Home Consulting", category: "Consulting & Specialty", featured: true },
  { slug: "pest-control", name: "Pest Control", category: "Consulting & Specialty", featured: true },
  { slug: "junk-removal", name: "Junk Removal", category: "Consulting & Specialty", featured: false },
];

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(): Map<ServiceCategory, Service[]> {
  const map = new Map<ServiceCategory, Service[]>();
  for (const service of services) {
    const group = map.get(service.category) ?? [];
    group.push(service);
    map.set(service.category, group);
  }
  return map;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
