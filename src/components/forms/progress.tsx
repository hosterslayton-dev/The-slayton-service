import { cn } from "@/lib/utils";

/**
 * Progress indicators: a linear bar (uploads, loading) and a step
 * indicator for the multi-step estimate flow (Part 9 requires
 * progress indicators on forms). Both expose real progressbar
 * semantics / step state to assistive tech.
 */

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
}: {
  value: number;
  max?: number;
  label: string;
  className?: string;
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="font-nav text-xs font-medium tracking-nav text-charcoal-600 uppercase">
          {label}
        </span>
        <span className="text-xs text-charcoal-500">{Math.round(percent)}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 overflow-hidden rounded-pill bg-tan-200"
      >
        <div
          className="h-full rounded-pill bg-gold-500 transition-[width] duration-300 ease-premium"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function StepProgress({
  steps,
  currentStep,
  className,
}: {
  steps: string[];
  /** 1-based index of the active step. */
  currentStep: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex items-center gap-2", className)} aria-label="Form progress">
      {steps.map((step, index) => {
        const number = index + 1;
        const state =
          number < currentStep ? "complete" : number === currentStep ? "current" : "upcoming";
        return (
          <li key={step} className="flex flex-1 flex-col items-center gap-2 text-center">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full font-nav text-sm font-semibold transition-colors",
                state === "complete" && "bg-gold-500 text-ink-950",
                state === "current" && "border-2 border-gold-600 bg-cream-50 text-gold-700",
                state === "upcoming" && "border border-tan-300 bg-cream-50 text-charcoal-500",
              )}
            >
              {state === "complete" ? "✓" : number}
            </span>
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "hidden font-nav text-xs tracking-nav uppercase sm:block",
                state === "current" ? "font-semibold text-ink-900" : "text-charcoal-500",
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
