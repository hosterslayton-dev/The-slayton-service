import type { Meta, StoryObj } from "@storybook/react";
import { Button, IconButton } from "@/components/ui/button";

/**
 * The platform's action system. One `primary` (gold) action per
 * view; everything else supports quietly.
 */
const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Renders a Next `<Link>` when `href` is set, a `<button>` otherwise. " +
          "All sizes meet the 44px target minimum. Hover lift is disabled under " +
          "reduced motion. **A11y:** focus ring is global; `disabled` uses the " +
          "native attribute; icon-only actions must use `IconButton` with `label`.",
      },
    },
  },
  args: { children: "Request a Free Estimate" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const OutlineLight: Story = {
  args: { variant: "outline-light" },
  parameters: { backgrounds: { default: "matte-black" } },
};
export const Ghost: Story = { args: { variant: "ghost" } };
export const Text: Story = { args: { variant: "text", children: "Read the full guide" } };
export const Danger: Story = {
  args: { variant: "danger", children: "Delete Draft" },
  parameters: {
    docs: { description: { story: "Destructive confirmations only — always behind a Modal confirm." } },
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
export const AsLink: Story = { args: { href: "/services" } };
export const Icon: Story = {
  render: () => (
    <IconButton label="Close dialog" variant="outline">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </IconButton>
  ),
  parameters: {
    docs: { description: { story: "`label` is required — it becomes the accessible name." } },
  },
};
