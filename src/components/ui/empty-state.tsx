import { cn } from "@/lib/utils";

/**
 * Empty screens are invitations to act: say what belongs here and
 * offer the action that fills it. Never apologetic, never vague.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-dashed border-tan-300 bg-cream-50 px-8 py-14 text-center",
        className,
      )}
    >
      <h3 className="font-display text-display-sm text-ink-900">{title}</h3>
      {description ? (
        <p className="prose-width mx-auto mt-3 text-charcoal-600">{description}</p>
      ) : null}
      {action ? <div className="mt-7 flex justify-center gap-3">{action}</div> : null}
    </div>
  );
}
