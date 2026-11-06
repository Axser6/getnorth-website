"use server";

import { headers } from "next/headers";
import {
  enquirySummary,
  industryOptions,
  labelFor,
  serviceOptions,
  validateEnquiry,
  valuesFromFormData,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

/**
 * Enquiry delivery.
 *
 * Configure at least ONE of these in the deployment environment:
 *
 *  1. Email via Resend (https://resend.com)
 *     RESEND_API_KEY      – API key
 *     CONTACT_TO_EMAIL    – inbox that receives enquiries (comma-separate for several)
 *     CONTACT_FROM_EMAIL  – verified sender, e.g. "GetNorth Website <website@getnorthmedia.com>"
 *
 *  2. Webhook (Zapier, Make, n8n, Google Apps Script, CRM, etc.)
 *     CONTACT_WEBHOOK_URL – receives a JSON POST of every enquiry
 *
 * If neither is configured the action reports "unconfigured" honestly and the
 * form offers to send the enquiry through WhatsApp instead. Nothing is faked.
 */

const MIN_FILL_MS = 2500;

async function sendWithResend(v: EnquiryValues) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return null;
  const from = process.env.CONTACT_FROM_EMAIL || "GetNorth Website <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: v.email,
      subject: `New enquiry: ${labelFor(serviceOptions, v.service)} — ${v.name}${v.company ? ` (${v.company})` : ""}`,
      text: `New enquiry from ${site.url}/contact\n\n${enquirySummary(v)}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    console.error("[enquiry] Resend error", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

async function sendToWebhook(v: EnquiryValues, meta: Record<string, string>) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "getnorthmedia.com/contact",
      submittedAt: new Date().toISOString(),
      ...v,
      serviceLabel: labelFor(serviceOptions, v.service),
      industryLabel: v.industry ? labelFor(industryOptions, v.industry) : "",
      ...meta,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    console.error("[enquiry] Webhook error", res.status);
    return false;
  }
  return true;
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Spam protection: honeypot + minimum fill time.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt") || 0);
  if ((typeof honeypot === "string" && honeypot.length > 0) || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    // Respond as success so bots learn nothing; nothing is sent.
    return { status: "success" };
  }

  const values = valuesFromFormData(formData);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, message: "Please correct the highlighted fields." };
  }

  const h = await headers();
  const meta = {
    userAgent: h.get("user-agent") ?? "",
    referer: h.get("referer") ?? "",
  };

  try {
    const results = await Promise.allSettled([sendWithResend(values), sendToWebhook(values, meta)]);
    const outcomes = results.map((r) => (r.status === "fulfilled" ? r.value : false));

    if (outcomes.every((o) => o === null)) {
      console.warn("[enquiry] No delivery channel configured (RESEND_API_KEY/CONTACT_TO_EMAIL or CONTACT_WEBHOOK_URL).");
      return {
        status: "unconfigured",
        message:
          "Our online form isn't connected yet, so this enquiry could not be sent automatically. Please send it to us on WhatsApp or call us — your details are still filled in.",
      };
    }
    if (outcomes.some((o) => o === true)) {
      return { status: "success" };
    }
    return {
      status: "failed",
      message:
        "Something went wrong while sending your enquiry. Please try again in a moment, or reach us directly on WhatsApp or by phone.",
    };
  } catch (err) {
    console.error("[enquiry] Unexpected error", err);
    return {
      status: "failed",
      message:
        "Something went wrong while sending your enquiry. Please try again in a moment, or reach us directly on WhatsApp or by phone.",
    };
  }
}
