/**
 * Central company configuration.
 *
 * Everything that is a "fact" about GetNorth lives here so it can be
 * updated in one place. Do NOT add contact details that have not been
 * confirmed by the company.
 */

const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export const site = {
  name: "GetNorth Media & AI Solutions",
  shortName: "GetNorth",
  tagline: "Media. Marketing. Technology. AI.",
  description:
    "GetNorth Media & AI Solutions is a Bengaluru-based business growth and technology company delivering integrated media, digital marketing, web development and AI automation solutions.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://getnorthmedia.com").replace(/\/$/, ""),
  locale: "en_IN",

  location: {
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    // City-centre coordinates of Bengaluru (not an office address).
    coordinates: "12.9716° N, 77.5946° E",
  },

  phone: {
    display: "+91 96667 68099",
    e164: "+919666768099",
    whatsapp: "919666768099",
  },

  /**
   * The business email has NOT been finalised.
   * Set NEXT_PUBLIC_CONTACT_EMAIL in the environment once it is available;
   * until then the site hides email links and shows a neutral note.
   */
  email: rawEmail && rawEmail.length > 0 ? rawEmail : null,

  social: {
    // Handles supplied by the company: "GetNorthmedia".
    // Verify the exact LinkedIn URL type (company page vs. personal profile) before launch.
    linkedin: "https://www.linkedin.com/company/getnorthmedia",
    instagram: "https://www.instagram.com/getnorthmedia",
  },
} as const;

export const telHref = `tel:${site.phone.e164}`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage =
  "Hello GetNorth, I'd like to discuss a project for my business.";

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/ai-solutions", label: "AI Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Our Work" },
] as const;
