"use client";

import { cn } from "@/lib/utils";

/**
 * Faceted filter chips (Project Library, Gallery, Learning
 * Center). A labelled group of toggle buttons using aria-pressed;
 * fully keyboard operable as ordinary buttons.
 */
export interface FilterOption {
  value: string;
  label: string;
}

export function FilterGroup({
  label,
  options,
  selected,
  onChange,
  className,
}: {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  className?: string;
}) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  return (
    <fieldset className={className}>
      <legend className="font-nav text-xs font-semibold tracking-label text-charcoal-600 uppercase">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.value)}
              className={cn(
                "min-h-11 rounded-pill border px-4 font-nav text-sm transition-colors",
                active
                  ? "border-ink-900 bg-ink-900 text-cream-100"
                  : "border-tan-300 bg-cream-50 text-charcoal-600 hover:border-gold-600 hover:text-gold-700",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
