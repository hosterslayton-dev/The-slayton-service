"use client";

import { cn } from "@/lib/utils";
import { useFieldControlProps } from "./field";

const controlBase =
  "w-full rounded-field border border-tan-300 bg-cream-50 px-4 text-ink-900 " +
  "placeholder:text-charcoal-500 transition-colors " +
  "hover:border-tan-400 focus:border-gold-600 " +
  "aria-invalid:border-error-600 disabled:cursor-not-allowed disabled:opacity-50";

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(controlBase, "h-13", className)}
      {...useFieldControlProps()}
      {...props}
    />
  );
}

export function Textarea({
  className,
  rows = 5,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(controlBase, "py-3.5 leading-relaxed", className)}
      {...useFieldControlProps()}
      {...props}
    />
  );
}

/**
 * Styled native <select>: full keyboard/screen-reader/mobile
 * behavior comes from the platform, not a re-implementation. A
 * custom listbox is only worth its a11y cost if a future phase
 * needs option content a native select can't render.
 */
export function Select({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(controlBase, "h-13 appearance-none pr-11", className)}
        {...useFieldControlProps()}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-charcoal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
