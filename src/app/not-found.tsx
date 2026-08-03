import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

/**
 * 404 in the platform's voice: plain about what happened, clear
 * about the way forward, never blaming the visitor.
 */
export default function NotFound() {
  return (
    <Section tone="light" className="flex min-h-svh items-center pt-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 font-display text-4xl leading-snug sm:text-5xl">
            This page isn&apos;t here.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-600">
            The address may have changed, or the page hasn&apos;t been built
            yet. Head back home, or call us — a real person answers.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/" variant="primary">
              Back to Home
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
