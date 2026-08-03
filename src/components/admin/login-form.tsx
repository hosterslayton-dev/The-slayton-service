"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { signInAdmin, type AdminSignInState } from "@/lib/admin/actions";

/**
 * ADMIN LOGIN FORM — React 19 useActionState around the sign-in
 * server action. States are honest: while credentials aren't
 * configured in the environment, the form says so instead of
 * pretending to authenticate (inquiry-form precedent).
 */
export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [state, formAction, isPending] = useActionState<AdminSignInState, FormData>(
    signInAdmin,
    { status: "idle" },
  );

  if (!configured || state.status === "unconfigured") {
    return (
      <div className="rounded-field border border-info-600/30 bg-info-100 p-5 text-sm leading-relaxed text-info-600">
        <p className="font-medium">Admin access isn&apos;t configured yet.</p>
        <p className="mt-2">
          Set <code className="font-mono">ADMIN_PASSWORD</code> and{" "}
          <code className="font-mono">ADMIN_SESSION_SECRET</code> in the server
          environment (see <code className="font-mono">.env.example</code>),
          then reload this page.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field
        label="Passphrase"
        required
        error={
          state.status === "invalid"
            ? "That passphrase didn't match. Check it and try again."
            : undefined
        }
      >
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          autoFocus
        />
      </Field>
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign In"}
      </Button>
      <p className="text-xs leading-relaxed text-charcoal-500">
        Sessions last 24 hours on this device. Two-factor authentication
        arrives with the managed auth provider planned for a later phase.
      </p>
    </form>
  );
}
