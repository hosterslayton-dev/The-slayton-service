import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, Drawer } from "@/components/ui/overlay";
import { Tooltip } from "@/components/ui/tooltip";
import { Popover } from "@/components/ui/popover";
import { Button, IconButton } from "@/components/ui/button";

const meta: Meta = {
  title: "Overlays/All Overlays",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Modal and Drawer are native `<dialog>` elements: focus trapping, Escape, " +
          "top-layer stacking, and inert backgrounds come from the platform. Focus " +
          "returns to the trigger on close. Tooltips are supplemental hints only " +
          "(hover **and** focus, `aria-describedby`); Popovers hold richer content " +
          "and close on Escape/outside click.",
      },
    },
  },
};
export default meta;

export const ModalStory: StoryObj = {
  name: "Modal",
  render: function ModalDemo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Review Request</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Send your estimate request?">
          <p className="text-charcoal-600">
            We&apos;ll review your details and reach out within one business day. Nothing is
            scheduled until you approve it.
          </p>
          <div className="mt-7 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>Keep Editing</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Send Request</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const DrawerStory: StoryObj = {
  name: "Drawer",
  render: function DrawerDemo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Open Filters</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Filter Projects">
          <p className="text-sm text-charcoal-600">
            Filter controls render here — see Navigation/FilterGroup.
          </p>
        </Drawer>
      </>
    );
  },
};

export const TooltipStory: StoryObj = {
  name: "Tooltip",
  render: () => (
    <div className="p-12">
      <Tooltip label="Copies a shareable link to this project">
        <IconButton label="Copy link" variant="outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
            <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 18.5" />
          </svg>
        </IconButton>
      </Tooltip>
    </div>
  ),
};

export const PopoverStory: StoryObj = {
  name: "Popover",
  render: () => (
    <div className="p-12">
      <Popover
        trigger={(props) => (
          <Button variant="outline" {...props}>Share</Button>
        )}
      >
        <p className="font-nav text-xs font-semibold tracking-label text-charcoal-600 uppercase">Share this project</p>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <button type="button" className="rounded-field px-3 py-2 text-left text-charcoal-700 hover:bg-tan-200/60">Copy link</button>
          <button type="button" className="rounded-field px-3 py-2 text-left text-charcoal-700 hover:bg-tan-200/60">Share to Instagram</button>
        </div>
      </Popover>
    </div>
  ),
};
