"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Checkbox, radio group, and switch. All native inputs under the
 * styling (checkbox/radio) or a role="switch" button — labels are
 * real <label> elements with ≥44 px touch rows.
 */

export function Checkbox({
  label,
  description,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  description?: string;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3 py-1.5",
        props.disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border border-tan-400 bg-cream-50 transition-colors checked:border-gold-600 checked:bg-gold-500 checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M3.5%208.5l3%203%206-7%22%20stroke%3D%22%230e0d0b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat"
        {...props}
      />
      <span>
        <span className="text-sm font-medium text-ink-900">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-sm text-charcoal-500">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  onDark = false,
  className,
}: {
  legend: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Adjusts text colors for dark surfaces. */
  onDark?: boolean;
  className?: string;
}) {
  const baseId = useId();
  return (
    <fieldset className={className}>
      <legend className={cn("font-nav text-sm font-medium", onDark ? "text-cream-100" : "text-ink-900")}>{legend}</legend>
      <div className="mt-3 flex flex-col gap-1">
        {options.map((option) => {
          const id = `${baseId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5"
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={value !== undefined ? value === option.value : undefined}
                onChange={() => onChange?.(option.value)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-tan-400 bg-cream-50 transition-colors checked:border-[6px] checked:border-gold-600"
              />
              <span>
                <span className={cn("text-sm font-medium", onDark ? "text-cream-100" : "text-ink-900")}>
                  {option.label}
                </span>
                {option.description ? (
                  <span className={cn("mt-0.5 block text-sm", onDark ? "text-cream-100/55" : "text-charcoal-500")}>
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex min-h-11 items-center gap-3 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-pill transition-colors duration-300 ease-premium",
          checked ? "bg-gold-500" : "bg-tan-300",
        )}
      >
        <span
          className={cn(
            "absolute h-5 w-5 rounded-full bg-cream-50 shadow-sm transition-transform duration-300 ease-premium",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </span>
      <span className="text-sm font-medium text-ink-900">{label}</span>
    </button>
  );
}
