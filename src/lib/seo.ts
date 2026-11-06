import type { Metadata } from "next";
import { site } from "./site";

/** Builds consistent per-page metadata (title, description, canonical, OG, Twitter). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: `${title} | ${site.shortName}`,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.shortName}`,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: site.tagline,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: { "@type": "Country", name: "India" },
    sameAs: [site.social.linkedin, site.social.instagram],
    knowsAbout: [
      "Brand identity",
      "Video production",
      "Social media marketing",
      "Search engine optimisation",
      "Performance marketing",
      "AI agents",
      "Business process automation",
      "WhatsApp automation",
      "Web development",
    ],
  };
}
