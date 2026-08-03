"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Disclosure accordion (FAQ pattern). Each header is a real button
 * with aria-expanded/aria-controls; panels are regions labelled by
 * their headers. `single` keeps at most one item open. Content
 * remains in the DOM (hidden) so in-page find still works.
 */
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Accordion({
  items,
  single = true,
  defaultOpenIds = [],
  headingLevel = 3,
  className,
}: {
  items: AccordionItem[];
  single?: boolean;
  defaultOpenIds?: string[];
  /** Heading level for item titles so the outline stays correct. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));
  const Heading = `h${headingLevel}` as const;

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(single ? [] : current);
      if (current.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-tan-300 border-y border-tan-300", className)}>
      {items.map((item) => {
        const open = openIds.has(item.id);
        return (
          <div key={item.id}>
            <Heading className="m-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${baseId}-panel-${item.id}`}
                id={`${baseId}-header-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg text-ink-900 transition-colors hover:text-gold-700"
              >
                {item.title}
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-gold-600 transition-transform duration-300 ease-premium",
                    open && "rotate-45",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </Heading>
            <div
              role="region"
              id={`${baseId}-panel-${item.id}`}
              aria-labelledby={`${baseId}-header-${item.id}`}
              hidden={!open}
              className="pb-6 leading-relaxed text-charcoal-600"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
