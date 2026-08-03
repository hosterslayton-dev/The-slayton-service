import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { SplitSection } from "@/components/sections/split-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CtaBlock } from "@/components/sections/cta-block";
import { Timeline } from "@/components/sections/timeline";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "Sections/All Sections",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-width page sections. Each owns its tone (light/dark/tan) so color " +
          "and contrast stay correct without per-page overrides. Grids reveal with " +
          "a gentle stagger that collapses under reduced motion.",
      },
    },
  },
};
export default meta;

export const HeroStory: StoryObj = {
  name: "Hero",
  render: () => (
    <Hero
      eyebrow="Our Services"
      title="Every service your home needs, under one trusted name."
      lede="From roof inspections to whole-home renovations — honest recommendations first, always."
      actions={
        <>
          <Button variant="primary">Request a Free Estimate</Button>
          <Button variant="outline-light">Call (615) 920-3891</Button>
        </>
      }
    />
  ),
};

export const Split: StoryObj = {
  render: () => (
    <SplitSection
      media={
        <Image src="/placeholders/sample-3.jpg" alt="Placeholder project photo" width={1200} height={900} className="h-full w-full object-cover" />
      }
      mediaSide="right"
    >
      <SectionHeading
        align="start"
        eyebrow="The Slayton Standard"
        title="Craftsmanship that honors your home"
        lede="We treat every home as if it were our own — premium materials, tidy job sites, and a final walkthrough that isn't finished until you're satisfied."
      />
      <div className="mt-8">
        <Button variant="outline">Read Our Promises</Button>
      </div>
    </SplitSection>
  ),
};

export const Features: StoryObj = {
  render: () => (
    <FeatureGrid
      eyebrow="Why Choose Us"
      title="Built on trust, not sales tactics"
      columns={3}
      items={[
        { title: "Honest Recommendations", description: "Only what your home truly needs — explained in plain language." },
        { title: "Premium Craftsmanship", description: "Licensed, insured, and held to The Slayton Standard on every visit." },
        { title: "Dependable Service", description: "We show up when we say we will and communicate at every step." },
      ]}
    />
  ),
};

export const Cta: StoryObj = {
  render: () => (
    <CtaBlock
      eyebrow="Begin Your Home Journey"
      title="Ready to protect, improve, or transform your home?"
      lede="Every project starts with a conversation and a free inspection or estimate — never pressure."
      actions={
        <>
          <Button variant="primary">Call (615) 920-3891</Button>
          <Button variant="outline-light">Follow @theslaytonservice</Button>
        </>
      }
      footnote="Free estimates · Free inspections · Honest recommendations"
    />
  ),
};

export const Process: StoryObj = {
  render: () => (
    <Timeline
      eyebrow="How It Works"
      title="A clear process from first call to final walkthrough"
      steps={[
        { title: "Reach Out", description: "Call, message, or request your free estimate online." },
        { title: "Free Consultation & Inspection", description: "We walk the project with you and listen to your goals." },
        { title: "Honest Estimate", description: "A clear, itemized estimate — with what you don't need called out too." },
        { title: "Professional Workmanship", description: "Tidy job sites, premium materials, steady communication." },
        { title: "Final Walkthrough", description: "We're not finished until you've approved every detail." },
      ]}
    />
  ),
};
