"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminConfigured,
  verifyAdminPassword,
} from "./auth";

/**
 * ─────────────────────────────────────────────────────────────────
 * ADMIN ACTIONS — sign in / sign out (React 19 useActionState)
 *
 * Honest states, in the inquiry-form tradition:
 *   unconfigured  credentials aren't set in the environment yet
 *   invalid       the passphrase didn't match (no further detail —
 *                 a single-credential gate has nothing to enumerate)
 *
 * On success the signed session cookie is set and the action
 * redirects into the console. Brute-force protection today is the
 * passphrase itself plus the timing-safe comparison; provider-level
 * rate limiting and two-factor arrive with the Clerk/Auth.js swap
 * documented in src/lib/admin/auth.ts.
 * ─────────────────────────────────────────────────────────────────
 */

export interface AdminSignInState {
  status: "idle" | "invalid" | "unconfigured";
}

export async function signInAdmin(
  _previous: AdminSignInState,
  formData: FormData,
): Promise<AdminSignInState> {
  if (!isAdminConfigured()) {
    return { status: "unconfigured" };
  }

  const password = String(formData.get("password") ?? "");
  if (!verifyAdminPassword(password)) {
    return { status: "invalid" };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function signOutAdmin(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}
