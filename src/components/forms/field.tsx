"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * FIELD — the accessibility contract for every form control
 *
 * Wires label → control → hint → error with generated ids so every
 * input in the platform ships correct `for`/`aria-describedby`/
 * `aria-invalid` without per-page effort. Errors are announced
 * (role="alert"), specific, and in the interface's voice — they
 * state what to fix, never scold.
 *
 *   <Field label="City" error={errors.city} hint="Where the home is.">
 *     <Input name="city" autoComplete="address-level2" />
 *   </Field>
 * ─────────────────────────────────────────────────────────────────
 */

interface FieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return useContext(FieldContext);
}

/** Spread onto the underlying control element. */
export function useFieldControlProps() {
  const field = useFieldContext();
  if (!field) return {};
  return {
    id: field.id,
    "aria-describedby": field.describedBy,
    "aria-invalid": field.invalid || undefined,
    required: field.required || undefined,
  };
}

export function Field({
  label,
  hint,
  error,
  required = false,
  onDark = false,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Adjusts label/hint/error colors for dark surfaces. */
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldContext.Provider value={{ id, describedBy, invalid: Boolean(error), required }}>
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={id}
          className={cn(
            "font-nav text-sm font-medium",
            onDark ? "text-cream-100" : "text-ink-900",
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className={cn("ml-1", onDark ? "text-gold-300" : "text-gold-700")}>*</span>
          ) : (
            <span className={cn("ml-2 text-xs font-normal", onDark ? "text-cream-100/50" : "text-charcoal-500")}>
              Optional
            </span>
          )}
        </label>
        {children}
        {hint ? (
          <p id={hintId} className={cn("text-sm", onDark ? "text-cream-100/55" : "text-charcoal-500")}>
            {hint}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className={cn("text-sm font-medium", onDark ? "text-error-300" : "text-error-600")}
          >
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
