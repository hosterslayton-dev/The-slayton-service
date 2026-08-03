"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Icon, type IconName } from "@/components/brand/icon";
import { Field } from "@/components/forms/field";
import { Input, Select, Textarea } from "@/components/forms/input";
import { RadioGroup } from "@/components/forms/choice";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { contactExperience } from "@/config/homepage";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { submitInquiry, type InquiryState } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const initialState: InquiryState = {
  status: "idle",
};

export function ContactExperience() {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialState,
  );

  const pathname = usePathname();
  const { contact, social } = siteConfig;

  const errors = state.fieldErrors ?? {};
  const values = state.values;

  const [contactMethod, setContactMethod] = useState("phone");

  useEffect(() => {
    if (values?.contactMethod) {
      setContactMethod(values.contactMethod);
    }
  }, [values?.contactMethod]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      <div className="rounded-card bg-cream-50/[0.04] p-7 ring-1 ring-cream-100/10 sm:p-9">
        {state.status === "success" ? (
          <div role="status" className="py-10 text-center">
            <span
              aria-hidden="true"
              className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 [&>svg]:h-7 [&>svg]:w-7"
            >
              <Icon name="check" />
            </span>

            <h3 className="mt-5 font-display text-display-sm text-cream-100">
              Your request has been received.
            </h3>

            <p className="mx-auto mt-3 max-w-md leading-relaxed text-cream-100/70">
              Your estimate request was delivered to The Slayton Service. We
              will review your project details and contact you as soon as
              possible.
            </p>

            <p className="mx-auto mt-3 max-w-md leading-relaxed text-cream-100/70">
              If your request is urgent, call{" "}
              <a
                href={contact.phoneHref}
                className="text-gold-300 underline underline-offset-4"
              >
                {contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            action={formAction}
            noValidate
            className="flex flex-col gap-5"
          >
            <input type="hidden" name="sourcePath" value={pathname} />

            <div
              aria-hidden="true"
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
            >
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name} onDark required>
                <Input
                  name="name"
                  defaultValue={values?.name ?? ""}
                  autoComplete="name"
                  placeholder="Your name"
                  className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
                />
              </Field>

              <Field label="Phone" error={errors.phone} onDark required>
                <Input
                  name="phone"
                  defaultValue={values?.phone ?? ""}
                  type="tel"
                  autoComplete="tel"
                  placeholder="(615) 555-0100"
                  className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" error={errors.email} onDark>
                <Input
                  name="email"
                  defaultValue={values?.email ?? ""}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
                />
              </Field>

              <Field label="City" onDark>
                <Select
                  name="city"
                  defaultValue={values?.city ?? ""}
                  className="border-cream-100/20 bg-cream-100/10 text-cream-100"
                >
                  <option value="">Choose your city…</option>

                  {siteConfig.serviceAreas.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}

                  <option value="other">Somewhere nearby</option>
                </Select>
              </Field>
            </div>

            <Field label="Project address" onDark>
              <Input
                name="address"
                defaultValue={values?.address ?? ""}
                autoComplete="street-address"
                placeholder="Street address or neighborhood"
                className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Preferred appointment" onDark>
                <Input
                  name="preferredTime"
                  defaultValue={values?.preferredTime ?? ""}
                  placeholder="Example: Tuesday afternoon"
                  className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
                />
              </Field>

              <Field label="Insurance involved?" onDark>
                <Select
                  name="insurance"
                  defaultValue={values?.insurance ?? ""}
                  className="border-cream-100/20 bg-cream-100/10 text-cream-100"
                >
                  <option value="">Choose…</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">Not sure</option>
                </Select>
              </Field>
            </div>

            <Field label="How did you hear about us?" onDark>
              <Input
                name="referralSource"
                defaultValue={values?.referralSource ?? ""}
                placeholder="Google, referral, truck, social media…"
                className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
              />
            </Field>

            <Field label="What can we help with?" onDark>
              <Select
                name="service"
                defaultValue={values?.service ?? ""}
                className="border-cream-100/20 bg-cream-100/10 text-cream-100"
              >
                <option value="">Choose a service…</option>

                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}

                <option value="not-sure">
                  Not sure yet — that&apos;s fine
                </option>
              </Select>
            </Field>

            <Field
              label="Project details"
              error={errors.details}
              hint="Your goals, current concerns, and anything else you would like us to know."
              onDark
              required
            >
              <Textarea
                name="details"
                defaultValue={values?.details ?? ""}
                rows={4}
                placeholder="Tell us a little about the project — a sentence or two is plenty."
                className="border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40"
              />
            </Field>

            <RadioGroup
              legend="Preferred contact method"
              name="contactMethod"
              value={contactMethod}
              onChange={setContactMethod}
              onDark
              options={[
                {
                  value: "phone",
                  label: "Phone call",
                },
                {
                  value: "text",
                  label: "Text message",
                },
                {
                  value: "email",
                  label: "Email",
                },
              ]}
            />

            {state.status === "invalid" ? (
              <p
                role="alert"
                className="rounded-field bg-error-300/15 px-4 py-3 text-sm text-error-300"
              >
                Please correct the highlighted fields. Your information has
                been kept.
              </p>
            ) : null}

            {state.status === "error" ? (
              <p
                role="alert"
                className="rounded-field bg-error-300/15 px-4 py-3 text-sm text-error-300"
              >
                Your request did not send, but your information has been kept
                so you can try again.
                {state.message ? (
                  <span className="mt-1 block text-xs opacity-80">
                    Technical detail: {state.message}
                  </span>
                ) : null}
              </p>
            ) : null}

            {state.status === "unconfigured" ? (
              <p
                role="alert"
                className="rounded-field bg-cream-100/10 px-4 py-3 text-sm text-cream-100/85"
              >
                Online estimate delivery is not connected yet. Your information
                has been kept. Call{" "}
                <a
                  href={contact.phoneHref}
                  className="text-gold-300 underline underline-offset-4"
                >
                  {contact.phoneDisplay}
                </a>{" "}
                or message{" "}
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-300 underline underline-offset-4"
                >
                  {social.instagram.handle}
                </a>
                .
                {state.message ? (
                  <span className="mt-1 block text-xs opacity-70">
                    Technical detail: {state.message}
                  </span>
                ) : null}
              </p>
            ) : null}

            <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Spinner size="sm" label="Sending your request" />
                    Sending…
                  </>
                ) : (
                  "Request My Free Estimate"
                )}
              </Button>

              <p className="text-xs leading-relaxed text-cream-100/55">
                {contactExperience.privacyNote}
              </p>
            </div>
          </form>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <a
          href={contact.phoneHref}
          className={cn(
            "group flex items-center gap-5 rounded-card bg-gold-500 p-6 text-ink-950 shadow-gold-glow",
            "transition-transform duration-300 ease-premium motion-safe:hover:-translate-y-1",
          )}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-ink-950/10 [&>svg]:h-6 [&>svg]:w-6"
          >
            <Icon name="phone" />
          </span>

          <span>
            <span className="block font-nav text-xs font-semibold tracking-label uppercase opacity-80">
              Prefer to talk? Call us
            </span>

            <span className="block font-display text-2xl">
              {contact.phoneDisplay}
            </span>
          </span>
        </a>

        <a
          href={social.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center gap-5 rounded-card p-6 ring-1 ring-cream-100/15",
            "transition-all duration-300 ease-premium hover:ring-gold-300/40 motion-safe:hover:-translate-y-1",
          )}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-cream-100/10 text-gold-300 [&>svg]:h-6 [&>svg]:w-6"
          >
            <Icon name="instagram" />
          </span>

          <span>
            <span className="block font-nav text-xs font-semibold tracking-label text-cream-100/60 uppercase">
              See our work, send a message
            </span>

            <span className="block font-display text-xl text-cream-100">
              {social.instagram.handle}
            </span>
          </span>
        </a>

        <ul className="mt-2 flex list-none flex-col gap-4 rounded-card bg-cream-100/[0.04] p-6 ring-1 ring-cream-100/10">
          {contactExperience.trustPoints.map((point) => (
            <li key={point.text} className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 [&>svg]:h-4 [&>svg]:w-4"
              >
                <Icon name={point.icon as IconName} />
              </span>

              <span className="text-sm leading-relaxed text-cream-100/80">
                {point.text}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-xs leading-relaxed text-cream-100/45">
          Future online scheduling will appear here — for now, every estimate
          begins with a real conversation.
        </p>
      </div>
    </div>
  );
}