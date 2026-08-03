import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { jsonLdString } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Breadcrumb trail with BreadcrumbList structured data emitted
 * alongside (Part 6 SEO requirement). The current page is plain
 * text with aria-current.
 */
export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="text-charcoal-600 transition-colors hover:text-gold-700">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn(last ? "text-ink-900" : "text-charcoal-600")}>
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-tan-400">/</span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
    </nav>
  );
}
