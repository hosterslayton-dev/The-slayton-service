import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

const meta: Meta = {
  title: "Feedback/All Feedback",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

export const Badges: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Kitchen</Badge>
      <Badge tone="gold">Featured</Badge>
      <Badge tone="success">Scheduled</Badge>
      <Badge tone="warning">Needs Attention</Badge>
      <Badge tone="error">Overdue</Badge>
      <Badge tone="info">In Review</Badge>
    </div>
  ),
};

export const Avatars: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Sample Homeowner" size="sm" />
      <Avatar name="Sample Homeowner" size="md" />
      <Avatar name="Sample Homeowner" size="lg" />
    </div>
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <div className="flex items-center gap-8">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" label="Loading projects" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "`role=status` announces once; rotation stops under reduced motion but the indicator stays visible." } },
  },
};

export const Skeletons: StoryObj = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <SkeletonCard />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Skeletons are aria-hidden; announce loading once at the container level." } },
  },
};

export const Empty: StoryObj = {
  render: () => (
    <div className="w-[32rem]">
      <EmptyState
        title="No projects match those filters"
        description="Try removing a filter, or browse everything we've completed."
        action={<Button variant="outline">Clear Filters</Button>}
      />
    </div>
  ),
};

export const ErrorSurface: StoryObj = {
  render: () => (
    <div className="w-[32rem]">
      <ErrorState onRetry={() => {}} />
    </div>
  ),
};

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={() => toast("Your request was sent. We'll be in touch within one business day.", "success")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast("That didn't save. Check your connection and try again.", "error")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast("Your draft is saved on this device.", "info")}>
        Info
      </Button>
    </div>
  );
}

export const Toasts: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: { description: { story: "Polite live region; 6s persistence; dismissible. Decisions never live in toasts — use a Modal." } },
  },
};
