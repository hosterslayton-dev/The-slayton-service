"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { estimateCta, getHeaderNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 * SITE HEADER
 *
 * Part 2 requirements implemented directly:
 *   • Sticky navigation, always visible while scrolling
 *   • Becomes slightly opaque with a subtle glass effect after
 *     the visitor scrolls
 *   • Primary "Free Estimate" action always present
 *
 * Client component (scroll state + disclosure menu). Navigation
 * items come from config and only render once their routes exist,
 * so the chrome never links to a 404 during phased rollout.
 *
 * Accessibility: skip link lands on #main; the mobile menu is a
 * labelled disclosure that closes on Escape and returns focus to
 * its trigger.
 * ─────────────────────────────────────────────────────────────────
 */

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navItems = getHeaderNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-premium",
        scrolled || menuOpen
          ? "border-b border-tan-200/70 bg-cream-100/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="shrink-0 py-2"
          onClick={() => setMenuOpen(false)}
        >
          <Logo width={150} priority className="w-32 sm:w-[150px]" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-nav text-sm font-medium tracking-nav text-charcoal-700 uppercase transition-colors hover:text-gold-700"
            >
              {item.label}
            </Link>
          ))}
          <Button href={estimateCta.href} variant="primary" className="min-h-11 px-6">
            {estimateCta.label}
          </Button>
        </nav>

        {/* Mobile menu trigger */}
        <button
          ref={triggerRef}
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full text-ink-900 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-tan-200/70 bg-cream-100/95 backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Primary mobile" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 font-nav text-base font-medium tracking-nav text-ink-900 uppercase transition-colors hover:bg-tan-200/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Button href={estimateCta.href} variant="primary" onClick={closeMenu}>
              {estimateCta.label}
            </Button>
            <Button href={siteConfig.contact.phoneHref} variant="outline" onClick={closeMenu}>
              Call {siteConfig.contact.phoneDisplay}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
