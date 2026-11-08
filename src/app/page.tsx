import Link from "next/link";
import type { Metadata } from "next";
import { divisions } from "@/data/divisions";
import { industries } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { Compass } from "@/components/compass";
import { ButtonLink, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { LoopCardCarousel } from "@/components/loop-card-carousel";
import { WordRotate } from "@/components/ui/word-rotate";
import { Check, GlyphAI, GlyphMarketing, MapPin, WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Media, Marketing, Technology & AI",
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | Media, Marketing, Technology & AI — Bengaluru` },
};

/**
 * Home page — deliberately short. Each block says one thing once:
 * 1. Hero  2. Services  3. Why GetNorth  4. How we work  5. Industries  6. Call to action
 * Detail lives on the Services, About, Industries and Our Work pages.
 */

const reasons = [
  {
    title: "One team for everything",
    body: "Brand, marketing, websites and AI planned together by our in-house team — no juggling separate vendors.",
  },
  {
    title: "Results you can measure",
    body: "We agree the numbers that matter up front — leads, cost per lead, response time — and report on them monthly.",
  },
  {
    title: "Practical AI, not hype",
    body: "Automation where it genuinely saves time or wins customers, with your people always in control.",
  },
];

const steps = [
  { title: "Understand", body: "Your business, customers and goals." },
  { title: "Plan", body: "The right mix of creative, marketing and tech." },
  { title: "Build & launch", body: "Designed and delivered in-house." },
  { title: "Improve", body: "Measure, report and refine every month." },
];

export default function HomePage() {
  return (
    <>
      {/* 1 ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-meridian relative overflow-hidden pt-[112px] sm:pt-[128px]">
        <Container className="relative">
          <div className="grid items-center gap-10 pb-12 lg:grid-cols-12 lg:gap-6 lg:pb-16">
            <div className="lg:col-span-7">
              <h1 className="font-heading max-w-[11ch] text-[clamp(2.9rem,8.2vw,6.6rem)] leading-[0.92] font-extrabold tracking-[-0.035em] text-balance">
                Point your business <span className="text-signal">north.</span>
              </h1>
              <p className="font-heading mt-7 flex flex-wrap items-center gap-x-3 text-[clamp(1.05rem,4.4vw,1.9rem)] leading-[1.15] font-semibold text-ink/85">
                <span>One in-house team for</span>
                <WordRotate words={["Media.", "Marketing.", "Technology.", "AI."]} className="text-signal" />
              </p>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-stone">
                Helping businesses across India grow their brand, win customers and work smarter.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="primary" arrow>
                  Get a quote
                </ButtonLink>
                <ButtonLink href={whatsappHref(defaultWhatsAppMessage)} variant="outline">
                  <WhatsApp size={18} /> Talk on WhatsApp
                </ButtonLink>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:col-span-5 lg:max-w-none">
              <Compass />
            </div>
          </div>
        </Container>

        {/* Credentials — facts only */}
        <Container className="relative pb-14 sm:pb-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) border border-ink/10 bg-ink/10 lg:grid-cols-4">
            {[
              { k: "Headquarters", v: `${site.location.city}, ${site.location.region}`, icon: <MapPin size={20} /> },
              { k: "Team", v: "Full in-house team", icon: <Check size={20} /> },
              { k: "Capabilities", v: `${divisions.length} integrated divisions`, icon: <GlyphAI size={20} /> },
              { k: "Industry focus", v: `${industries.length} sectors`, icon: <GlyphMarketing size={20} /> },
            ].map((c) => (
              <div key={c.k} className="flex items-center gap-3 bg-surface-raised/80 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
                <span aria-hidden="true" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-(--radius-control) bg-signal/[0.07] text-signal sm:inline-flex">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">{c.k}</dt>
                  <dd className="mt-0.5 font-semibold text-ink">{c.v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2 ── Services ─────────────────────────────────────────────────────── */}
      <LoopCardCarousel
        divisions={divisions}
        heading={
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div data-reveal>
              <Eyebrow>What we do</Eyebrow>
              <h2 id="divisions-title" className="font-heading mt-5 max-w-2xl text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.04] font-bold">
                Everything you need to grow, <span className="text-signal">in one place.</span>
              </h2>
            </div>
            <TextLink href="/services">View all services</TextLink>
          </div>
        }
      />

      {/* 3 ── Why GetNorth ─────────────────────────────────────────────────── */}
      <section className="bg-meridian-dark grain relative bg-ink py-24 text-paper sm:py-28" aria-labelledby="why-title">
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="Why GetNorth" title={<span id="why-title">Simple, accountable, in-house.</span>} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-(--radius-card) bg-paper/10 md:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.title} className="bg-ink p-7 sm:p-9" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                <span className="font-mono text-xs text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-bold">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4 ── How we work ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28" aria-labelledby="steps-title">
        <Container>
          <SectionHeading eyebrow="How we work" title={<span id="steps-title">Four simple steps.</span>} />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                <span className="font-heading inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 5 ── Industries ───────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2 py-16 sm:py-20" aria-labelledby="industries-title">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <h2 id="industries-title" className="font-heading shrink-0 text-2xl font-bold sm:text-3xl">
              Industries we serve
            </h2>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries#${ind.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-ink/15 bg-paper px-4 text-sm font-medium transition-colors duration-(--duration-fast) hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 6 ── Call to action ───────────────────────────────────────────────── */}
      <CtaBand />
    </>
  );
}
