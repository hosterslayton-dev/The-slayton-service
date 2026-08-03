"use server";

export interface InquiryValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  details: string;
  contactMethod: string;
  sourcePath: string;
  address: string;
  preferredTime: string;
  insurance: string;
  referralSource: string;
}

export interface InquiryState {
  status: "idle" | "success" | "error" | "invalid" | "unconfigured";
  fieldErrors?: Record<string, string>;
  values?: InquiryValues;
  message?: string;
}

const PHONE_PATTERN = /^[\d\s()+.-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readValues(formData: FormData): InquiryValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    details: String(formData.get("details") ?? "").trim(),
    contactMethod: String(formData.get("contactMethod") ?? "phone"),
    sourcePath: String(formData.get("sourcePath") ?? "").slice(0, 200),
    address: String(formData.get("address") ?? "").trim(),
    preferredTime: String(formData.get("preferredTime") ?? "").trim(),
    insurance: String(formData.get("insurance") ?? "").trim(),
    referralSource: String(formData.get("referralSource") ?? "").trim(),
  };
}

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const values = readValues(formData);

  const fieldErrors: Record<string, string> = {};

  if (values.name.length < 2) {
    fieldErrors.name = "Enter your name so we know who to ask for.";
  }

  if (!PHONE_PATTERN.test(values.phone)) {
    fieldErrors.phone = "Enter a phone number like (615) 555-0100.";
  }

  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email =
      "Enter an email like name@example.com, or leave it blank.";
  }

  if (values.details.length < 10) {
    fieldErrors.details =
      "Tell us a little about the project — a sentence or two is plenty.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "invalid",
      fieldErrors,
      values,
    };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const emailTo =
    process.env.INQUIRY_EMAIL_TO ??
    "hoster.slayton@theslaytonservice.com";
  const emailFrom = process.env.INQUIRY_EMAIL_FROM;
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  const resendReady = Boolean(resendKey && emailFrom);

  if (!resendReady && !webhookUrl) {
    return {
      status: "unconfigured",
      values,
      message: "Email delivery has not been configured yet.",
    };
  }

  try {
    if (resendReady) {
      const ownerResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [emailTo],
          ...(values.email ? { reply_to: values.email } : {}),
          subject: `New estimate request — ${values.name}${
            values.service ? ` — ${values.service}` : ""
          }`,
          text: [
            "NEW ESTIMATE REQUEST",
            "",
            `Name: ${values.name}`,
            `Phone: ${values.phone}`,
            `Email: ${values.email || "Not provided"}`,
            `City: ${values.city || "Not provided"}`,
            `Project address: ${values.address || "Not provided"}`,
            `Service: ${values.service || "Not selected"}`,
            `Preferred appointment: ${
              values.preferredTime || "Not provided"
            }`,
            `Insurance involved: ${values.insurance || "Not provided"}`,
            `Referral source: ${values.referralSource || "Not provided"}`,
            `Preferred contact: ${values.contactMethod}`,
            `Submitted from: ${values.sourcePath || "Website"}`,
            "",
            "PROJECT DETAILS",
            values.details,
          ].join("\n"),
        }),
      });

      if (!ownerResponse.ok) {
        const ownerError = await ownerResponse.text();
        console.error(
          `[inquiry] owner email failed ${ownerResponse.status}:`,
          ownerError,
        );

        return {
          status: "error",
          values,
          message: `Email provider returned ${ownerResponse.status}.`,
        };
      }

      if (values.email) {
        const customerResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: emailFrom,
              to: [values.email],
              subject:
                "We received your estimate request — The Slayton Service",
              text: [
                `Hi ${values.name},`,
                "",
                "Thank you for contacting The Slayton Service.",
                "We received your estimate request and will review it shortly.",
                "A member of our team will follow up using your preferred contact method.",
                "",
                "Phone: (615) 920-3891",
                "Website: https://theslaytonservice.com",
                "",
                "Serving Our Clients. Honoring Our God.",
                "Matthew 20:28",
              ].join("\n"),
            }),
          },
        );

        if (!customerResponse.ok) {
          const confirmationError = await customerResponse.text();
          console.error(
            `[inquiry] confirmation email failed ${customerResponse.status}:`,
            confirmationError,
          );
        }
      }

      return { status: "success" };
    }

    const webhookResponse = await fetch(webhookUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "estimate-inquiry",
        submittedAt: new Date().toISOString(),
        ...values,
      }),
    });

    if (!webhookResponse.ok) {
      return {
        status: "error",
        values,
        message: `Webhook returned ${webhookResponse.status}.`,
      };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[inquiry] delivery failed:", error);

    return {
      status: "error",
      values,
      message:
        error instanceof Error ? error.message : "Unknown delivery error.",
    };
  }
}