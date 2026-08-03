"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/forms/input";
import { cn } from "@/lib/utils";

/**
 * The Slayton Home Journal Newsletter signup (Part 7). Educates
 * before promoting: copy leads with what subscribers receive.
 * The submit handler is injected so the email-platform integration
 * (a later phase) plugs in without touching the component; until
 * wired, the default handler reports success locally.
 */
export function NewsletterSignup({
  onSubscribe,
  onDark = false,
  className,
}: {
  onSubscribe?: (email: string) => Promise<void>;
  onDark?: boolean;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter an email address like name@example.com.");
      return;
    }
    setError(undefined);
    setStatus("submitting");
    try {
      await onSubscribe?.(email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "rounded-field px-4 py-3 text-sm",
          onDark ? "bg-cream-100/10 text-cream-100" : "bg-success-100 text-success-600",
          className,
        )}
      >
        You&apos;re subscribed. The next Home Journal issue will arrive in your inbox.
      </p>
    );
  }

  return (
    <div className={className}>
      <p className={cn("text-sm leading-relaxed", onDark ? "text-cream-100/75" : "text-charcoal-600")}>
        Monthly maintenance reminders, seasonal homeowner tips, and project
        inspiration — education first, always.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
        <Field label="Email address" error={error} required className="flex-1 [&>label]:sr-only">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={onDark ? "border-cream-100/25 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/50" : undefined}
          />
        </Field>
        <Button type="submit" variant="primary" disabled={status === "submitting"} className="sm:mt-0">
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
      {status === "error" ? (
        <p role="alert" className="mt-2 text-sm text-error-600">
          The subscription didn&apos;t go through. Try again in a moment.
        </p>
      ) : null}
    </div>
  );
}
