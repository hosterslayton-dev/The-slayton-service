import { Icon } from "@/components/brand/icon";
import { Button } from "@/components/ui/button";
import { CtaBlock } from "@/components/sections/cta-block";
import { finalCta } from "@/config/homepage";
import { siteConfig } from "@/config/site";

/**
 * Final CTA — the invitational close on interior pages (services,
 * gallery). Estimate actions across the platform route to the
 * homepage contact experience (/#begin-your-home-journey, owned by
 * ContactSection). Invitational by constitution: phone, email
 * (once configured), and Instagram — no pressure.
 */
export function FinalCta() {
  const { contact, social } = siteConfig;
  return (
    <CtaBlock
      eyebrow={finalCta.eyebrow}
      title={finalCta.title}
      lede={finalCta.lede}
      footnote={finalCta.footnote}
      actions={
        <>
          <Button href={contact.phoneHref} variant="primary" size="lg">
            <Icon name="phone" className="h-4.5 w-4.5" />
            Call {contact.phoneDisplay}
          </Button>
          {contact.email ? (
            <Button href={`mailto:${contact.email}`} variant="outline-light" size="lg">
              Email Us
            </Button>
          ) : null}
          <Button
            href={social.instagram.url}
            variant="outline-light"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagram" className="h-4.5 w-4.5" />
            {social.instagram.handle}
          </Button>
        </>
      }
    />
  );
}
