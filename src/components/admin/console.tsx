import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * CONSOLE COMPONENTS — reusable building blocks for /admin
 *
 * Server components only. Everything shown is read live from the
 * site's configuration and environment; every control performs a
 * real action (navigation). In-console editing ships with the
 * content backend phase — the console says so plainly instead of
 * rendering forms that couldn't save.
 * ─────────────────────────────────────────────────────────────────
 */

export function ConsoleCard({
  title,
  description,
  count,
  countLabel,
  editPath,
  viewHref,
  viewLabel = "View live",
  children,
  className,
}: {
  title: string;
  description: string;
  /** Live count read from configuration. */
  count?: number;
  countLabel?: string;
  /** Where this content is edited today. */
  editPath?: string | string[];
  viewHref?: string;
  viewLabel?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const paths = editPath ? (Array.isArray(editPath) ? editPath : [editPath]) : [];
  return (
    <article
      className={cn("flex h-full flex-col rounded-card bg-cream-50 p-6 shadow-card", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-display-sm text-ink-900">{title}</h3>
        {count !== undefined ? (
          <span className="shrink-0 rounded-pill bg-tan-200 px-3 py-1 font-nav text-xs font-semibold text-charcoal-700">
            {count} {countLabel ?? "items"}
          </span>
        ) : null}
      </div>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal-600">
        {description}
      </p>
      {paths.length > 0 ? (
        <div className="mt-4 flex flex-col gap-1.5">
          <p className="font-nav text-[0.65rem] font-semibold tracking-label text-charcoal-500 uppercase">
            Edit in
          </p>
          {paths.map((path) => (
            <code
              key={path}
              className="w-fit rounded-field bg-tan-200/60 px-2.5 py-1 font-mono text-xs text-charcoal-700"
            >
              {path}
            </code>
          ))}
        </div>
      ) : null}
      {children}
      {viewHref ? (
        <div className="mt-5">
          <Button href={viewHref} variant="text">
            {viewLabel}
          </Button>
        </div>
      ) : null}
    </article>
  );
}

export interface ReadinessCheck {
  label: string;
  ready: boolean;
  /** Shown when not ready — what to do, in the interface's voice. */
  remedy: string;
  /** Optional extra context (e.g. which partners lack URLs). */
  detail?: string;
}

export function ReadinessList({ checks }: { checks: ReadinessCheck[] }) {
  const remaining = checks.filter((check) => !check.ready).length;
  return (
    <section
      aria-labelledby="readiness-heading"
      className="rounded-card bg-cream-50 p-6 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="readiness-heading" className="font-display text-display-sm text-ink-900">
          Launch readiness
        </h2>
        <Badge tone={remaining === 0 ? "success" : "warning"}>
          {remaining === 0 ? "All checks passing" : `${remaining} to resolve`}
        </Badge>
      </div>
      <ul className="mt-5 divide-y divide-tan-200">
        {checks.map((check) => (
          <li key={check.label} className="flex items-start gap-4 py-3.5">
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                check.ready
                  ? "bg-success-100 text-success-600"
                  : "bg-warning-100 text-warning-700",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {check.ready ? <path d="m5 12 5 5 9-10" /> : <path d="M12 7v6m0 4h.01" />}
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink-900">
                {check.label}
                <span className="sr-only">{check.ready ? " — ready" : " — needs attention"}</span>
              </p>
              {!check.ready ? (
                <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                  {check.remedy}
                  {check.detail ? ` ${check.detail}` : ""}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
