import type { Meta, StoryObj } from "@storybook/react";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";

const meta: Meta = {
  title: "Motion/Primitives",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Motion is purposeful and performance-first: CSS-driven reveals via " +
          "IntersectionObserver (no scroll listeners), rAF-driven counters and " +
          "parallax. Every primitive collapses under prefers-reduced-motion — " +
          "reveals simply appear, counters render final values, parallax is inert. " +
          "Content is never hidden when JavaScript is unavailable.",
      },
    },
  },
};
export default meta;

export const Reveals: StoryObj = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      {["rise", "fade", "scale"].map((effect, index) => (
        <Reveal key={effect} effect={effect as "rise" | "fade" | "scale"} delay={index * 120}>
          <div className="rounded-card bg-cream-50 p-6 shadow-card">
            <p className="font-nav text-sm font-medium text-ink-900">Reveal · {effect}</p>
          </div>
        </Reveal>
      ))}
    </div>
  ),
};

export const Counter: StoryObj = {
  render: () => (
    <p className="font-display text-display-lg text-gold-700">
      <AnimatedCounter value={250} suffix="+" />
    </p>
  ),
};
