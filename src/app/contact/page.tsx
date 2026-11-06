import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site, telHref, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui";
import { ArrowUpRight, Instagram, LinkedIn, Mail, MapPin, Phone, WhatsApp } from "@/components/icons";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact GetNorth Media & AI Solutions in Bengaluru. Call or WhatsApp +91 96667 68099, or send a project enquiry for media, digital marketing, web development or AI automation.",
  path: "/contact",
});

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${site.location.city}, ${site.location.region}, ${site.location.country}`,
)}&z=11&output=embed`;

export default function ContactPage() {
  return (
    <>
      <section className="bg-meridian border-b border-ink/10 pt-[132px] pb-16 sm:pt-[152px] sm:pb-20">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-heading mt-6 max-w-4xl text-[clamp(2.4rem,6.4vw,5.25rem)] leading-[0.98] font-extrabold">
            Let&apos;s find your <span className="text-signal">north.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">
            Tell us about your business and what you&apos;d like to achieve. Send an enquiry, message us on WhatsApp
            or call — whichever is easiest for you.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="space-y-4 lg:col-span-4" aria-label="Contact details">
              <a
                href={whatsappHref(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-[20px] bg-ink p-6 text-paper transition-transform hover:-translate-y-0.5"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsApp size={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[0.7rem] tracking-[0.15em] text-mist uppercase">WhatsApp</span>
                  <span className="mt-1 block text-lg font-bold">Chat with our team</span>
                  <span className="mt-0.5 block text-sm text-mist">{site.phone.display}</span>
                </span>
                <ArrowUpRight size={18} className="text-mist transition-colors group-hover:text-paper" />
              </a>

              <a
                href={telHref}
                className="group flex items-start gap-4 rounded-[20px] border border-ink/10 p-6 transition-colors hover:border-ink/30 hover:bg-white"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper-2">
                  <Phone size={20} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">Call</span>
                  <span className="mt-1 block text-lg font-bold">{site.phone.display}</span>
                  <span className="mt-0.5 block text-sm text-stone">Tap to call</span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-[20px] border border-ink/10 p-6">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper-2">
                  <Mail size={20} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">Email</span>
                  {site.email ? (
                    <a href={`mailto:${site.email}`} className="mt-1 block text-lg font-bold break-all hover:underline">
                      {site.email}
                    </a>
                  ) : (
                    <>
                      <span className="mt-1 block text-lg font-bold">Coming soon</span>
                      <span className="mt-0.5 block text-sm text-stone">
                        Our business email will be published shortly. Please use the form, WhatsApp or phone.
                      </span>
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-4 rounded-[20px] border border-ink/10 p-6">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper-2">
                  <MapPin size={20} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">Headquarters</span>
                  <span className="mt-1 block text-lg font-bold">
                    {site.location.city}, {site.location.region}
                  </span>
                  <span className="mt-0.5 block text-sm text-stone">{site.location.country} · Serving clients across India</span>
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-sm font-semibold hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <LinkedIn size={18} /> LinkedIn
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-sm font-semibold hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <Instagram size={18} /> Instagram
                </a>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="map-title" className="border-t border-ink/10 bg-paper-2 py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Location</Eyebrow>
              <h2 id="map-title" className="font-heading mt-4 text-3xl font-bold">
                Based in {site.location.city}.
              </h2>
            </div>
            <p className="max-w-md text-stone">
              The map shows our home city. Please contact us to arrange a meeting.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[24px] border border-ink/10 bg-paper-3">
            <iframe
              title={`Map of ${site.location.city}, ${site.location.region}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full grayscale-[0.6] sm:h-[460px]"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
