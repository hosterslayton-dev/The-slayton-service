import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { Container } from "@/components/ui/container";
import { getAdminSession, isAdminConfigured } from "@/lib/admin/auth";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Sign In",
  description: "Sign in to The Slayton Service administration console.",
  path: "/admin/login",
  noIndex: true,
});

/**
 * ADMIN SIGN IN — /admin/login. Already-authenticated owners go
 * straight to the console; everyone else gets the passphrase form,
 * or an honest notice while credentials aren't configured.
 */
export default async function AdminLoginPage() {
  if (await getAdminSession()) {
    redirect("/admin");
  }

  return (
    <Container>
      <div className="mx-auto max-w-md">
        <p className="eyebrow">The Slayton Service</p>
        <h1 className="mt-3 font-display text-display-md text-ink-900">
          Admin sign in
        </h1>
        <p className="mt-3 leading-relaxed text-charcoal-600">
          This area is for site administration. If you&apos;ve reached it by
          accident, everything for homeowners lives on the main site.
        </p>
        <div className="mt-8 rounded-card bg-cream-50 p-7 shadow-card">
          <AdminLoginForm configured={isAdminConfigured()} />
        </div>
      </div>
    </Container>
  );
}
