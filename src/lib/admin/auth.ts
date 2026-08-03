// Server-side module: imported only by server components and server
// actions (never from a "use client" file) — it reads server env and
// the cookie store.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * ─────────────────────────────────────────────────────────────────
 * ADMIN AUTHENTICATION — environment-driven credential seam
 *
 * A deliberately small, dependency-free gate for the owner's admin
 * console. Nothing sensitive lives in code:
 *
 *   ADMIN_PASSWORD        the owner's passphrase (server env only)
 *   ADMIN_SESSION_SECRET  ≥32 random chars used to HMAC-sign the
 *                         session cookie
 *
 * Sign-in compares the passphrase with a timing-safe check and sets
 * an HttpOnly, Secure, SameSite=Lax cookie containing an expiry and
 * its HMAC signature — nothing user-forgeable, nothing decodable.
 * While either variable is unset the console honestly reports that
 * admin access isn't configured (the inquiry-form precedent) and no
 * session can exist.
 *
 * Future provider swap: replace the internals of `getAdminSession`,
 * `createAdminSession`, and the sign-in action with Clerk/Auth.js
 * (which also brings two-factor authentication); every consumer
 * already goes through these three functions, so nothing else
 * changes. Console routes additionally sit behind robots' /admin/
 * disallow and per-page noindex.
 * ─────────────────────────────────────────────────────────────────
 */

const SESSION_COOKIE = "slayton_admin_session";
const SESSION_HOURS = 24;

function sessionSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET;
}

/** True when both credential variables are present. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && Boolean(sessionSecret());
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

/** Timing-safe passphrase check against the server environment. */
export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || input.length === 0) return false;
  return safeEqual(input, expected);
}

export async function createAdminSession(): Promise<void> {
  const secret = sessionSecret();
  if (!secret) return;
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const token = `${expiresAt}.${sign(String(expiresAt), secret)}`;
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: new Date(expiresAt),
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: new Date(0),
  });
}

/** True only for an unexpired, correctly signed session cookie. */
export async function getAdminSession(): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const separator = token.indexOf(".");
  if (separator <= 0) return false;
  const expiry = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!/^\d+$/.test(expiry) || signature.length === 0) return false;
  if (Number(expiry) < Date.now()) return false;
  return safeEqual(signature, sign(expiry, secret));
}
