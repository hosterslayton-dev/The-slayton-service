import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Inline error surface for failed data/sections (the route-level
 * boundary handles whole-page failures). States what went wrong and
 * how to move forward; a phone fallback keeps a human path open.
 */
export function ErrorState({
  title = "This section couldn't load.",
  description = "Trying again usually fixes it.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-card border border-error-100 bg-error-100/40 px-8 py-12 text-center",
        className,
      )}
    >
      <h3 className="font-display text-display-sm text-ink-900">{title}</h3>
      <p className="prose-width mx-auto mt-3 text-charcoal-600">{description}</p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {onRetry ? (
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        ) : null}
        <Button variant="outline" href={siteConfig.contact.phoneHref}>
          Call {siteConfig.contact.phoneDisplay}
        </Button>
      </div>
    </div>
  );
}
