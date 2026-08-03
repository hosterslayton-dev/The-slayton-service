import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ServicesMegaMenu } from "@/components/navigation/mega-menu";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { FilterGroup } from "@/components/ui/filter-group";

const meta: Meta = {
  title: "Navigation/All Navigation",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

export const BreadcrumbsStory: StoryObj = {
  name: "Breadcrumbs",
  render: () => (
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "A Brighter Gathering Place" },
      ]}
    />
  ),
  parameters: {
    docs: { description: { story: "Emits BreadcrumbList JSON-LD alongside the visible trail (Part 6 SEO)." } },
  },
};

export const MegaMenu: StoryObj = {
  render: () => (
    <div className="flex h-[28rem] w-[56rem] justify-center pt-4">
      <ServicesMegaMenu />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Disclosure-pattern mega menu (button + aria-expanded panel — reliable for keyboard and touch, unlike hover menus). Content derives from the authoritative service catalog grouped by category. Pass `linked` once service routes exist.",
      },
    },
  },
};

export const PaginationStory: StoryObj = {
  name: "Pagination",
  render: () => (
    <Pagination currentPage={4} totalPages={12} hrefForPage={(page) => `?page=${page}`} />
  ),
  parameters: {
    docs: { description: { story: "Link-based and crawlable; current page uses aria-current." } },
  },
};

export const Search: StoryObj = {
  render: () => (
    <div className="w-96">
      <SearchInput onSearch={() => {}} placeholder="Search the Learning Center…" />
    </div>
  ),
};

export const Filters: StoryObj = {
  render: function FiltersDemo() {
    const [selected, setSelected] = useState<string[]>(["roofing"]);
    return (
      <FilterGroup
        label="Filter by service"
        options={[
          { value: "remodeling", label: "Remodeling" },
          { value: "roofing", label: "Roofing" },
          { value: "flooring", label: "Flooring" },
          { value: "exterior", label: "Exterior" },
        ]}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};
