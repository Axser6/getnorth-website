import type { ReactNode } from "react";
import { site, telHref, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ButtonLink, Container, Eyebrow } from "./ui";
import { Phone, WhatsApp } from "./icons";

/** Inner-page hero with breadcrumb-style eyebrow. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="bg-meridian relative overflow-hidden border-b border-ink/10 pt-[132px] pb-16 sm:pt-[152px] sm:pb-24">
      <Container className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-wide mt-6 text-[clamp(2.4rem,6.4vw,5.25rem)] leading-[0.98] font-extrabold">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">{intro}</p>
            {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Closing conversion band, used at the end of every page. */
export function CtaBand({
  title = "Let's set your direction.",
  body = "Tell us where your business needs to go. We'll recommend the right mix of media, marketing, technology and AI to get there.",
  className,
}: {
  title?: string;
  body?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-paper py-20 sm:py-28", className)}>
      <Container>
        <div className="bg-meridian-dark grain relative overflow-hidden rounded-[28px] bg-ink px-6 py-14 text-paper sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-signal/25 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow tone="light">Start a conversation</Eyebrow>
              <h2 className="font-wide mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] font-extrabold">{title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch" data-reveal>
              <ButtonLink href="/contact" variant="primary" arrow>
                Send an enquiry
              </ButtonLink>
              <ButtonLink href={whatsappHref(defaultWhatsAppMessage)} variant="outline-light">
                <WhatsApp size={18} /> WhatsApp us
              </ButtonLink>
              <ButtonLink href={telHref} variant="outline-light">
                <Phone size={18} /> {site.phone.display}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Floating WhatsApp shortcut, visible on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with GetNorth on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-ink sm:w-auto sm:justify-start sm:pr-5 sm:pl-4 text-paper shadow-[0_10px_30px_-10px_rgb(11_15_20/0.6)] transition-transform duration-300 hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
        <WhatsApp size={18} />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
