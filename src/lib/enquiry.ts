import { divisions } from "@/data/divisions";
import { industries } from "@/data/industries";

/** Shared between the client form and the server action. */

export const serviceOptions = [
  ...divisions.map((d) => ({ value: d.slug, label: d.name })),
  { value: "multiple", label: "More than one division" },
  { value: "not-sure", label: "Not sure yet — need advice" },
];

export const industryOptions = [
  ...industries.map((i) => ({ value: i.slug, label: i.name })),
  { value: "other", label: "Other" },
];

export const budgetOptions = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
  "Not decided yet",
];

export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "Just exploring"];

export type EnquiryValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  industry: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  industry: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField<K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]): string | undefined {
  const v = typeof value === "string" ? value.trim() : value;
  switch (key) {
    case "name":
      if (!v) return "Please enter your name.";
      if ((v as string).length < 2) return "Name looks too short.";
      if ((v as string).length > 100) return "Please keep your name under 100 characters.";
      return;
    case "company":
      if ((v as string).length > 120) return "Please keep this under 120 characters.";
      return;
    case "email":
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v as string) || (v as string).length > 160) return "Please enter a valid email address.";
      return;
    case "phone": {
      if (!v) return "Please enter a phone number we can reach you on.";
      const digits = (v as string).replace(/[^\d]/g, "");
      if (!/^[+\d\s()-]+$/.test(v as string) || digits.length < 10 || digits.length > 15)
        return "Please enter a valid phone number (10–15 digits).";
      return;
    }
    case "service":
      if (!v) return "Please choose the service you're interested in.";
      if (!serviceOptions.some((o) => o.value === v)) return "Please choose a valid option.";
      return;
    case "industry":
      if (v && !industryOptions.some((o) => o.value === v)) return "Please choose a valid option.";
      return;
    case "budget":
      if (v && !budgetOptions.includes(v as string)) return "Please choose a valid option.";
      return;
    case "timeline":
      if (v && !timelineOptions.includes(v as string)) return "Please choose a valid option.";
      return;
    case "message":
      if (!v) return "Please describe your project requirements.";
      if ((v as string).length < 20) return "Please add a little more detail (at least 20 characters).";
      if ((v as string).length > 3000) return "Please keep this under 3,000 characters.";
      return;
    case "consent":
      if (!v) return "Please confirm we may contact you about your enquiry.";
      return;
  }
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  (Object.keys(values) as (keyof EnquiryValues)[]).forEach((k) => {
    const err = validateField(k, values[k] as never);
    if (err) errors[k] = err;
  });
  return errors;
}

export function valuesFromFormData(fd: FormData): EnquiryValues {
  const s = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    name: s("name"),
    company: s("company"),
    email: s("email"),
    phone: s("phone"),
    service: s("service"),
    industry: s("industry"),
    budget: s("budget"),
    timeline: s("timeline"),
    message: s("message"),
    consent: fd.get("consent") === "on" || fd.get("consent") === "true",
  };
}

export function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Plain-text summary used for email bodies and the WhatsApp fallback. */
export function enquirySummary(v: EnquiryValues) {
  return [
    `Name: ${v.name}`,
    v.company ? `Company: ${v.company}` : null,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Service: ${labelFor(serviceOptions, v.service)}`,
    v.industry ? `Industry: ${labelFor(industryOptions, v.industry)}` : null,
    v.budget ? `Budget: ${v.budget}` : null,
    v.timeline ? `Timeline: ${v.timeline}` : null,
    "",
    "Project requirements:",
    v.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

export type EnquiryState = {
  status: "idle" | "invalid" | "success" | "unconfigured" | "failed";
  message?: string;
  errors?: EnquiryErrors;
};
