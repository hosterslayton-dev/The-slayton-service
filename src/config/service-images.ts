import type { ImageAsset, BeforeAfterPair } from "@/types/content";

export const serviceImages: Record<string, ImageAsset> = {
  "kitchen-remodeling": {
    "src": "/representative/kitchen-remodeling.jpg",
    "alt": "kitchen remodeling representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "bathroom-remodeling": {
    "src": "/representative/bathroom-remodeling.jpg",
    "alt": "bathroom remodeling representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "whole-home-renovations": {
    "src": "/representative/whole-home-renovations.jpg",
    "alt": "whole home renovations representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "interior-renovations": {
    "src": "/representative/interior-renovations.jpg",
    "alt": "interior renovations representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "exterior-renovations": {
    "src": "/representative/exterior-renovations.jpg",
    "alt": "exterior renovations representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "flooring": {
    "src": "/representative/flooring.jpg",
    "alt": "flooring representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "luxury-vinyl-plank": {
    "src": "/representative/luxury-vinyl-plank.jpg",
    "alt": "luxury vinyl plank representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "hardwood-flooring": {
    "src": "/representative/hardwood-flooring.jpg",
    "alt": "hardwood flooring representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "tile-installation": {
    "src": "/representative/tile-installation.jpg",
    "alt": "tile installation representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "painting": {
    "src": "/representative/painting.jpg",
    "alt": "painting representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "drywall-repair": {
    "src": "/representative/drywall-repair.jpg",
    "alt": "drywall repair representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "roof-inspections": {
    "src": "/representative/roof-inspections.jpg",
    "alt": "roof inspections representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "roof-repairs": {
    "src": "/representative/roof-repairs.jpg",
    "alt": "roof repairs representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "pressure-washing": {
    "src": "/representative/pressure-washing.jpg",
    "alt": "pressure washing representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "soft-washing": {
    "src": "/representative/soft-washing.jpg",
    "alt": "soft washing representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "concrete-cleaning": {
    "src": "/representative/concrete-cleaning.jpg",
    "alt": "concrete cleaning representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "deck-construction": {
    "src": "/representative/deck-construction.jpg",
    "alt": "deck construction representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "deck-repair": {
    "src": "/representative/deck-repair.jpg",
    "alt": "deck repair representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "fence-installation": {
    "src": "/representative/fence-installation.jpg",
    "alt": "fence installation representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "fence-repair": {
    "src": "/representative/fence-repair.jpg",
    "alt": "fence repair representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "french-drains": {
    "src": "/representative/french-drains.jpg",
    "alt": "french drains representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "sump-pumps": {
    "src": "/representative/sump-pumps.jpg",
    "alt": "sump pumps representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "moisture-control": {
    "src": "/representative/moisture-control.jpg",
    "alt": "moisture control representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "crawlspace-encapsulation": {
    "src": "/representative/crawlspace-encapsulation.jpg",
    "alt": "crawlspace encapsulation representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "crawlspace-inspections": {
    "src": "/representative/crawlspace-inspections.jpg",
    "alt": "crawlspace inspections representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "property-maintenance": {
    "src": "/representative/property-maintenance.jpg",
    "alt": "property maintenance representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "seasonal-maintenance": {
    "src": "/representative/seasonal-maintenance.jpg",
    "alt": "seasonal maintenance representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "emergency-property-repairs": {
    "src": "/representative/emergency-property-repairs.jpg",
    "alt": "emergency property repairs representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "home-consulting": {
    "src": "/representative/home-consulting.jpg",
    "alt": "home consulting representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "pest-control": {
    "src": "/representative/pest-control.jpg",
    "alt": "pest control representative residential service image",
    "width": 1800,
    "height": 1200
  },
  "junk-removal": {
    "src": "/representative/junk-removal.jpg",
    "alt": "junk removal representative residential service image",
    "width": 1800,
    "height": 1200
  }
} as Record<string, ImageAsset>;

export const representativeBeforeAfter: Record<string, BeforeAfterPair> = {
  "kitchen-remodeling": { before: { src: "/representative/before-kitchen.jpg", alt: "Older kitchen before renovation", width: 1600, height: 1100 }, after: { src: "/representative/after-kitchen.jpg", alt: "Bright remodeled kitchen", width: 1600, height: 1100 }, caption: "Representative kitchen transformation." },
  "bathroom-remodeling": { before: { src: "/representative/before-bathroom.jpg", alt: "Bathroom before renovation", width: 1600, height: 1100 }, after: { src: "/representative/after-bathroom.jpg", alt: "Modern bathroom after renovation", width: 1600, height: 1100 }, caption: "Representative bathroom transformation." },
  "roof-repairs": { before: { src: "/representative/before-roof.jpg", alt: "Worn roof before repair", width: 1600, height: 1100 }, after: { src: "/representative/after-roof.jpg", alt: "Restored roof after repair", width: 1600, height: 1100 }, caption: "Representative roof transformation." },
  "deck-repair": { before: { src: "/representative/before-deck.jpg", alt: "Weathered deck before restoration", width: 1600, height: 1100 }, after: { src: "/representative/after-deck.jpg", alt: "Restored deck after renovation", width: 1600, height: 1100 }, caption: "Representative deck transformation." },
};
