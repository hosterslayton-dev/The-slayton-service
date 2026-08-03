import type { Meta, StoryObj } from "@storybook/react";
import { BeforeAfterSlider } from "@/components/media/before-after-slider";
import { ImageGallery } from "@/components/media/image-gallery";
import { VideoPlayer } from "@/components/media/video-player";

const meta: Meta = {
  title: "Media/All Media",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

export const BeforeAfter: StoryObj = {
  render: () => (
    <div className="w-[36rem] max-w-full">
      <BeforeAfterSlider
        pair={{
          before: { src: "/placeholders/before.jpg", alt: "Deck before restoration (placeholder)", width: 1200, height: 900 },
          after: { src: "/placeholders/after.jpg", alt: "Deck after restoration (placeholder)", width: 1200, height: 900 },
          caption: "Placeholder imagery — replaced with real project photography.",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Driven by a real range input: drag, arrow keys, touch, and screen-reader value announcements all come from the platform.",
      },
    },
  },
};

export const Gallery: StoryObj = {
  render: () => (
    <div className="w-[44rem] max-w-full">
      <ImageGallery
        images={[1, 2, 3, 4].map((n) => ({
          src: `/placeholders/sample-${n}.jpg`,
          alt: `Placeholder project photo ${n}`,
          width: 1200,
          height: 900,
        }))}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Thumbnails are buttons opening a dialog-based lightbox: Arrow keys, swipe, and a live-region position announcement (\"2 of 4\").",
      },
    },
  },
};

export const Video: StoryObj = {
  render: () => (
    <div className="w-[36rem] max-w-full">
      <VideoPlayer
        title="Walkthrough: crawlspace encapsulation (placeholder)"
        poster={{ src: "/placeholders/poster.jpg" }}
        src=""
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Facade pattern — the heavy player mounts only after the visitor presses play. Published videos require captions (WCAG 1.2.2).",
      },
    },
  },
};
