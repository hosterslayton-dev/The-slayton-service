"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * REVEAL — scroll-triggered entrance
 *
 * Wraps content in the CSS `.reveal` system (globals.css) and flips
 * `data-revealed` when the element enters the viewport. All motion
 * lives in CSS, so the global reduced-motion kill-switch applies
 * automatically and the main thread stays idle. Content is never
 * hidden without JavaScript.
 *
 * Effects: "rise" (default) · "fade" · "scale"
 * ─────────────────────────────────────────────────────────────────
 */
interface RevealProps {
  effect?: "rise" | "fade" | "scale";
  /** Stagger delay in ms, e.g. index * 100 in a grid. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  /** Optional element id, e.g. for anchor targets. */
  id?: string;
  children: React.ReactNode;
}

export function Reveal({
  effect = "rise",
  delay = 0,
  className,
  as: Tag = "div",
  id,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.dataset.revealed = "true";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref union across tag names is safe here
      ref={ref}
      id={id}
      className={cn(
        "reveal",
        effect === "fade" && "reveal-fade",
        effect === "scale" && "reveal-scale",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
