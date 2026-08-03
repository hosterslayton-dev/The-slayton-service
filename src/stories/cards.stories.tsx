import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { ServiceCard } from "@/components/cards/service-card";
import { ProjectCard } from "@/components/cards/project-card";
import { JournalCard } from "@/components/cards/journal-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { FeatureCard } from "@/components/cards/feature-card";
import { PricingCard } from "@/components/cards/pricing-card";
import { StatCard } from "@/components/cards/stat-card";
import { services } from "@/config/services";

const media = (
  <Image src="/placeholders/sample-1.jpg" alt="" fill sizes="400px" className="object-cover" />
);

const meta: Meta = {
  title: "Cards/All Cards",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The card family shares BaseCard chrome (warm surface, soft shadow, hover " +
          "lift). Linked cards are a single tab stop — never nest links inside. " +
          "Media slots take any node; the tan monogram fallback renders when empty.",
      },
    },
  },
};
export default meta;

export const Service: StoryObj = {
  render: () => (
    <div className="w-80">
      <ServiceCard
        service={services[0]!}
        description="Thoughtful layouts, premium materials, and craftsmanship that honors your home."
        media={media}
        linked
      />
    </div>
  ),
};

export const Project: StoryObj = {
  render: () => (
    <div className="w-80">
      <ProjectCard
        title="A Brighter Gathering Place"
        summary="An outdated galley kitchen opened into a warm, light-filled heart of the home — with honest guidance at every decision."
        serviceName="Kitchen Remodeling"
        city="Gallatin"
        href="/services"
        media={media}
        featured
      />
    </div>
  ),
};

export const Journal: StoryObj = {
  render: () => (
    <div className="w-80">
      <JournalCard
        title="When a Roof Repair Is Enough"
        category="Roofing"
        excerpt="Not every leak means replacement. Here's how we evaluate whether a targeted repair will truly protect your home."
        publishedAt="2026-05-14"
        href="/services"
        media={media}
      />
    </div>
  ),
};

export const Testimonial: StoryObj = {
  render: () => (
    <div className="w-96">
      <TestimonialCard
        testimonial={{
          quote: "They told us what our roof didn't need. That honesty earned every project we've hired them for since.",
          author: "Sample Homeowner",
          location: "Hendersonville, TN",
          source: "Website",
        }}
      />
    </div>
  ),
};

export const Feature: StoryObj = {
  render: () => (
    <div className="w-80">
      <FeatureCard
        title="Honest Recommendations"
        description="We recommend only what your home truly needs — and explain why, in plain language."
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l7 4v5c0 4.4-3 8-7 9-4-1-7-4.6-7-9V7l7-4Z" />
          </svg>
        }
      />
    </div>
  ),
};

export const Pricing: StoryObj = {
  render: () => (
    <div className="w-80">
      <PricingCard
        name="Seasonal Care"
        price="$95"
        cadence="visit"
        description="Quarterly maintenance visits that catch small problems before they become big ones."
        inclusions={["Full exterior walkthrough", "Gutter & drainage check", "Photo report after every visit", "Priority scheduling"]}
        ctaHref="#"
        highlighted
        badge="Recommended"
      />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Transparent pricing only — no anchoring tricks, no fake urgency." } },
  },
};

export const Stat: StoryObj = {
  render: () => (
    <StatCard value={250} suffix="+" label="Homes Served" />
  ),
  parameters: {
    docs: { description: { story: "Counts up on reveal; renders the final value instantly under reduced motion. Verified figures only." } },
  },
};
