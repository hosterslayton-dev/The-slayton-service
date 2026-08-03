import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

/**
 * ─────────────────────────────────────────────────────────────────
 * ADMIN SEGMENT — /admin
 *
 * Owner-only surface. Defense in depth against discovery/indexing:
 * robots.ts has disallowed /admin/ since Phase 1, and every page in
 * this segment additionally carries noindex metadata. The sign-in
 * gate itself lives in the (console) group layout so /admin/login
 * stays reachable.
 * ─────────────────────────────────────────────────────────────────
 */

export const metadata: Metadata = createPageMetadata({
  title: "Admin",
  description: "Administration area for The Slayton Service.",
  path: "/admin",
  noIndex: true,
});

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="bg-cream-100 pt-28 pb-24">{children}</div>;
}
