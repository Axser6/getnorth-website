import type { ReactNode } from "react";
import { site, telHref, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ButtonLink, Container, Eyebrow } from "./ui";
import Link from "next/link";
import { ArrowRight, Phone, WhatsApp } from "./icons";

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
            <h1 className="font-heading mt-6 text-[clamp(2.4rem,6.4vw,5.25rem)] leading-[0.98] font-extrabold">
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
        <div className="bg-meridian-dark grain relative overflow-hidden rounded-[28px] bg-signal px-6 py-14 text-paper sm:px-12 sm:py-20 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-signal-bright/15 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow tone="light">Start a conversation</Eyebrow>
              <h2 className="font-heading mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] font-extrabold">{title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch" data-reveal>
              <ButtonLink href="/contact" variant="light" arrow>
                Request a quote
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

/** Floating WhatsApp shortcut (tablet/desktop; phones use MobileActionBar). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with GetNorth on WhatsApp"
      className="group fixed right-6 bottom-6 z-40 hidden h-14 items-center gap-2 rounded-full bg-ink pr-5 pl-4 md:inline-flex text-paper shadow-[0_10px_30px_-10px_rgb(11_15_20/0.6)] transition-transform duration-300 hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-whatsapp text-white">
        <WhatsApp size={18} />
      </span>
      <span className="text-sm font-semibold">Chat on WhatsApp</span>
    </a>
  );
}

/**
 * Thumb-zone action bar for phones: the three ways to reach GetNorth,
 * always one tap away. Respects the iOS home-indicator safe area.
 */
export function MobileActionBar() {
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold transition-[background-color,transform] duration-(--duration-fast) active:scale-[0.97]";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgb(15_31_23/0.35)] backdrop-blur-md md:hidden"
    >
      <ul className="flex gap-2">
        <li className="flex flex-1">
          <a href={telHref} className={`${item} text-ink active:bg-ink/5`}>
            <Phone size={20} />
            Call
          </a>
        </li>
        <li className="flex flex-1">
          <a
            href={whatsappHref(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} text-ink active:bg-ink/5`}
          >
            <WhatsApp size={20} className="text-signal" />
            WhatsApp
          </a>
        </li>
        <li className="flex flex-[1.4]">
          <Link href="/contact" className={`${item} bg-signal text-paper active:bg-signal-hover`}>
            <ArrowRight size={20} />
            Get a quote
          </Link>
        </li>
      </ul>
    </nav>
  );
}
