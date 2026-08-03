"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

/**
 * Route-segment error boundary. Explains what happened and offers
 * a retry plus a human fallback. Error details go to the console
 * (and to a monitoring integration in a later phase) — never to
 * the visitor.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <Section tone="light" className="flex min-h-svh items-center pt-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-4 font-display text-4xl leading-snug sm:text-5xl">
            This page hit a problem loading.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-600">
            Trying again usually fixes it. If it keeps happening, call us and
            we&apos;ll help directly.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={reset} variant="primary">
              Try Again
            </Button>
            <Button href={siteConfig.contact.phoneHref} variant="outline">
              Call {siteConfig.contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
