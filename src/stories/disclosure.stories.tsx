import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";

const meta: Meta = {
  title: "Disclosure/Tabs & Accordion",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

export const TabsStory: StoryObj = {
  name: "Tabs",
  render: () => (
    <div className="w-[36rem]">
      <Tabs
        items={[
          { id: "overview", label: "Overview", content: <p className="text-charcoal-600">Project overview content.</p> },
          { id: "materials", label: "Materials", content: <p className="text-charcoal-600">Materials and finishes used.</p> },
          { id: "timeline", label: "Timeline", content: <p className="text-charcoal-600">How the work progressed.</p> },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "WAI-ARIA tabs with roving tabindex: Arrow keys move, Home/End jump, Tab exits into the active panel.",
      },
    },
  },
};

export const AccordionStory: StoryObj = {
  name: "Accordion",
  render: () => (
    <div className="w-[36rem]">
      <Accordion
        items={[
          { id: "cost", title: "How much does a typical remodel cost?", content: "Every home is different, so we start with a free consultation and give you a clear, itemized estimate — no obligation, no pressure." },
          { id: "time", title: "How long will my project take?", content: "We agree on a realistic timeline before work begins and keep you updated at every stage." },
          { id: "area", title: "Do you serve my area?", content: "We serve Gallatin, Hendersonville, Nashville, Mt. Juliet, Lebanon, White House, Portland, Goodlettsville, and the surrounding Middle Tennessee counties." },
        ]}
        defaultOpenIds={["cost"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Headers are real buttons with aria-expanded; panels are labelled regions and stay in the DOM so find-in-page works. Set `headingLevel` to fit the page outline.",
      },
    },
  },
};
