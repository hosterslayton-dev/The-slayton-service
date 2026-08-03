"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Search field for the Learning Center, Project Library, and
 * Journal. Wraps a role="search" form; submit triggers `onSearch`
 * so it works with both client filtering and URL-driven results.
 */
export function SearchInput({
  label = "Search",
  placeholder = "Search…",
  defaultValue = "",
  onSearch,
  className,
}: {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch: (query: string) => void;
  className?: string;
}) {
  const id = useId();
  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSearch(String(data.get("q") ?? "").trim());
      }}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-charcoal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id={id}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-13 w-full rounded-pill border border-tan-300 bg-cream-50 pr-5 pl-12 text-ink-900 placeholder:text-charcoal-500 focus:border-gold-600"
      />
    </form>
  );
}
