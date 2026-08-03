"use client";

import { useEffect, useRef } from "react";

/**
 * Gentle vertical parallax for decorative imagery. Writes a CSS
 * transform inside requestAnimationFrame using a passive scroll
 * listener; fully inert under reduced motion. Apply only to
 * decorative layers — never to content the visitor must read.
 *
 * @param strength 0–1 fraction of scroll delta applied (default 0.12)
 */
export function useParallax<T extends HTMLElement>(strength = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -strength;
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}
