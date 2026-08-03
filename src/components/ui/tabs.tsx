"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * WAI-ARIA tabs with roving tabindex: Arrow keys move between
 * tabs, Home/End jump to the ends, Tab leaves the tablist and
 * lands in the active panel. Activation follows focus (recommended
 * for simple content panels).
 */
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({
  items,
  defaultTabId,
  className,
}: {
  items: TabItem[];
  defaultTabId?: string;
  className?: string;
}) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(defaultTabId ?? items[0]?.id ?? "");
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const activate = (id: string) => {
    setActiveId(id);
    refs.current.get(id)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = items.findIndex((item) => item.id === activeId);
    if (index < 0) return;
    const last = items.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = next[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const item = items[target];
    if (item) activate(item.id);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1 border-b border-tan-300"
      >
        {items.map((item) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) refs.current.set(item.id, node);
              }}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "-mb-px rounded-t-lg px-5 py-3 font-nav text-sm font-medium tracking-nav uppercase transition-colors",
                selected
                  ? "border-b-2 border-gold-600 text-gold-700"
                  : "border-b-2 border-transparent text-charcoal-600 hover:text-ink-900",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="pt-6 focus-visible:outline-none"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
