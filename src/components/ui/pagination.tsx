import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Link-based pagination (URL-driven, crawlable — required for the
 * Project Library and Journal SEO). Current page is marked with
 * aria-current; truncation keeps first/last/neighbors visible.
 */
export function Pagination({
  currentPage,
  totalPages,
  hrefForPage,
  className,
}: {
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "gap")[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const nearCurrent = Math.abs(page - currentPage) <= 1;
    if (page === 1 || page === totalPages || nearCurrent) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }

  const itemClass =
    "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 font-nav text-sm transition-colors";

  return (
    <nav aria-label="Pagination" className={cn("flex justify-center", className)}>
      <ul className="flex items-center gap-1.5">
        <li>
          {currentPage > 1 ? (
            <Link href={hrefForPage(currentPage - 1)} className={cn(itemClass, "text-charcoal-600 hover:text-gold-700")}>
              <span aria-hidden="true">←</span>
              <span className="sr-only">Previous page</span>
            </Link>
          ) : (
            <span aria-hidden="true" className={cn(itemClass, "text-tan-400")}>←</span>
          )}
        </li>
        {pages.map((page, index) =>
          page === "gap" ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1 text-charcoal-500">
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={hrefForPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  itemClass,
                  page === currentPage
                    ? "bg-ink-900 text-cream-100"
                    : "text-charcoal-600 hover:text-gold-700",
                )}
              >
                {page}
              </Link>
            </li>
          ),
        )}
        <li>
          {currentPage < totalPages ? (
            <Link href={hrefForPage(currentPage + 1)} className={cn(itemClass, "text-charcoal-600 hover:text-gold-700")}>
              <span aria-hidden="true">→</span>
              <span className="sr-only">Next page</span>
            </Link>
          ) : (
            <span aria-hidden="true" className={cn(itemClass, "text-tan-400")}>→</span>
          )}
        </li>
      </ul>
    </nav>
  );
}
