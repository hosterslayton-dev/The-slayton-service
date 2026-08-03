import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getAdminSession } from "@/lib/admin/auth";
import { signOutAdmin } from "@/lib/admin/actions";

/**
 * ─────────────────────────────────────────────────────────────────
 * CONSOLE GATE — /admin/(console)
 *
 * Every route in this group requires a valid signed session;
 * anything else redirects to /admin/login. Chrome stays minimal: a
 * console bar with a live-site link and sign out (a plain server
 * form — no client JavaScript for the gate or the chrome).
 * ─────────────────────────────────────────────────────────────────
 */
export default async function ConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tan-200 pb-6">
        <div>
          <p className="eyebrow">The Slayton Service</p>
          <h1 className="mt-2 font-display text-display-md text-ink-900">
            Content console
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button href="/" variant="outline" size="sm">
            View Site
          </Button>
          <form action={signOutAdmin}>
            <Button type="submit" variant="ghost" size="sm">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-10">{children}</div>
    </Container>
  );
}
