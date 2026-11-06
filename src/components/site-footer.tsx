import Link from "next/link";
import { divisions } from "@/data/divisions";
import { site, telHref, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { Container } from "./ui";
import Image from "next/image";
import { LogoStacked } from "./logo";
import wordmarkLight from "@/assets/brand/wordmark-light.png";
import { Instagram, LinkedIn, Mail, MapPin, Phone, WhatsApp } from "./icons";
import { CopyrightYear } from "./copyright-year";

const company = [
  { href: "/about", label: "About us" },
  { href: "/ai-solutions", label: "AI Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Our work" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-signal text-paper">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoStacked tone="light" className="w-44" />
            <p className="mt-6 max-w-sm leading-relaxed text-mist">
              An integrated media, marketing, technology and AI partner for businesses across India.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-mist">{site.tagline}</p>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-mist">Services</h2>
            <ul className="mt-3 lg:mt-5 lg:space-y-3">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link href={`/services#${d.slug}`} className="inline-flex min-h-11 items-center text-paper/85 underline-offset-4 hover:text-paper hover:underline lg:min-h-0">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-mist">Company</h2>
            <ul className="mt-3 lg:mt-5 lg:space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="inline-flex min-h-11 items-center text-paper/85 underline-offset-4 hover:text-paper hover:underline lg:min-h-0">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-mist">Get in touch</h2>
            <ul className="mt-3 lg:mt-5 lg:space-y-3.5">
              <li>
                <a href={telHref} className="inline-flex min-h-11 items-center gap-3 text-paper/85 hover:text-paper lg:min-h-0">
                  <Phone size={18} className="text-signal-bright" /> {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-paper/85 hover:text-paper lg:min-h-0"
                >
                  <WhatsApp size={18} className="text-signal-bright" /> Chat on WhatsApp
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-3 text-paper/85 hover:text-paper lg:min-h-0">
                    <Mail size={18} className="text-signal-bright" /> {site.email}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-3 text-paper/85">
                <MapPin size={18} className="text-signal-bright" /> {site.location.city}, {site.location.region},{" "}
                {site.location.country}
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GetNorth on LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <LinkedIn size={18} />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GetNorth on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <Image
          src={wordmarkLight}
          alt=""
          aria-hidden="true"
          className="pointer-events-none mx-auto mt-20 h-auto w-full max-w-[1100px] opacity-[0.07] select-none"
        />

        <div className="mt-10 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs tracking-wider">{site.location.coordinates}</span>
            <Link href="/privacy" className="inline-flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
