"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the visitor's prefers-reduced-motion setting. Components
 * that drive motion from JavaScript (counters, parallax) must check
 * this and render final values directly when it is true — the CSS
 * kill-switch in globals.css cannot stop JS-driven animation.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true); // safe default pre-hydration

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
