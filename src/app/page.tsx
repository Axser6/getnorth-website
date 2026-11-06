import Link from "next/link";
import type { Metadata } from "next";
import { divisions } from "@/data/divisions";
import { industries } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { Compass } from "@/components/compass";
import { ButtonLink, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { DivisionCarousel } from "@/components/division-carousel";
import { BentoGrid, type BentoItem } from "@/components/ui21/bento-grid";
import { WordRotate } from "@/components/ui21/word-rotate";
import { ArrowUpRight, Check, WhatsApp, divisionGlyph } from "@/components/icons";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Media, Marketing, Technology & AI",
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | Media, Marketing, Technology & AI — Bengaluru` },
};

const reasons = [
  {
    title: "One partner, four disciplines",
    body: "Creative, marketing, web and AI planned together — no coordinating separate vendors or losing the message between them.",
  },
  {
    title: "A full in-house team",
    body: "The people you speak to work alongside the people who design, build and run your projects.",
  },
  {
    title: "Business outcomes first",
    body: "We start with the result you need — enquiries, sales, saved time — and choose the tools to fit, not the other way round.",
  },
  {
    title: "Practical, responsible AI",
    body: "We apply automation where it genuinely removes work or improves response, with people kept in control.",
  },
  {
    title: "Clear communication",
    body: "Defined scopes, regular updates and plain-language reporting, so you always know what is happening and why.",
  },
  {
    title: "Built for the long run",
    body: "Brand systems, websites and automations designed to be maintained, extended and improved as you grow.",
  },
];

const approach = [
  {
    step: "Understand",
    body: "We learn your business, customers, competitors and goals — and where things are currently getting stuck.",
  },
  {
    step: "Plan",
    body: "We define a clear direction: the right channels, creative, technology and automation, with priorities and scope.",
  },
  {
    step: "Build & launch",
    body: "Our in-house team designs, produces and develops everything, then launches it carefully.",
  },
  {
    step: "Measure & improve",
    body: "We track what matters, report clearly and keep refining for better results over time.",
  },
];

const featuredBase: Array<Omit<BentoItem, "icon"> & { division: string; icon: null }> = [
  {
    title: "AI chatbots & agents",
    division: "ai-automation",
    description: "Instant, accurate answers and lead capture on your website and messaging channels — with a human hand-off whenever it matters.",
    href: "/ai-solutions#ai-agents",
    tags: ["Lead capture", "24/7 replies", "CRM"],
    colSpan: 2,
    feature: true,
    icon: null,
  },
  {
    title: "WhatsApp automation",
    division: "ai-automation",
    description: "Automated enquiry replies, reminders and follow-ups on the channel your customers prefer.",
    href: "/ai-solutions#whatsapp-automation",
    tags: ["Business Platform"],
    icon: null,
  },
  {
    title: "Corporate websites",
    division: "web-technology",
    description: "Fast, credible websites structured to explain what you do and generate enquiries.",
    href: "/services#web-technology",
    tags: ["Design", "Build", "SEO-ready"],
    icon: null,
  },
  {
    title: "Performance marketing",
    division: "digital-marketing",
    description: "Google and Meta campaigns planned around leads, cost per acquisition and return on spend.",
    href: "/services#digital-marketing",
    tags: ["Google Ads", "Meta Ads", "Tracking"],
    colSpan: 2,
    icon: null,
  },
  {
    title: "Reels & video production",
    division: "media-creative",
    description: "Short-form and corporate video that captures attention and explains your value.",
    href: "/services#media-creative",
    tags: ["Reels", "Brand films"],
    icon: null,
  },
  {
    title: "Search engine optimisation",
    division: "digital-marketing",
    description: "Technical, on-page and local SEO so customers find you when they search.",
    href: "/services#digital-marketing",
    tags: ["Local SEO", "Technical"],
    icon: null,
  },
  {
    title: "Brand identity",
    division: "media-creative",
    description: "Logos, colour, typography and guidelines that make your business instantly recognisable.",
    href: "/services#media-creative",
    tags: ["Logo", "Guidelines"],
    icon: null,
  },
];

const featured: BentoItem[] = featuredBase.map((f) => {
  const Glyph = divisionGlyph[f.division];
  return {
    ...f,
    icon: <Glyph size={22} />,
    status: divisions.find((d) => d.slug === f.division)!.pillar,
    cta: "Learn more",
  };
});

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="bg-meridian relative overflow-hidden pt-[112px] sm:pt-[128px]">
        <Container className="relative">
          <div className="grid items-center gap-10 pb-16 lg:grid-cols-12 lg:gap-6 lg:pb-24">
            <div className="lg:col-span-7">
              <Eyebrow>Media · Marketing · Technology · AI</Eyebrow>
              <h1 className="font-heading mt-7 text-[clamp(2.9rem,8.2vw,6.6rem)] leading-[0.92] font-extrabold tracking-[-0.035em]">
                Point your <br className="hidden sm:block" />
                business <span className="text-signal">north.</span>
              </h1>
              <p className="font-heading mt-7 flex flex-wrap items-center gap-x-3 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.15] font-semibold text-ink/85">
                <span>One in-house team for</span>
                <WordRotate
                  words={["Media.", "Marketing.", "Technology.", "AI."]}
                  className="text-signal"
                />
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone sm:text-xl">
                GetNorth brings media, digital marketing, web technology and artificial intelligence together in one
                in-house team — so your brand, your customer acquisition and your operations move in the same
                direction.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="primary" arrow>
                  Start a project
                </ButtonLink>
                <ButtonLink href={whatsappHref(defaultWhatsAppMessage)} variant="outline">
                  <WhatsApp size={18} /> Talk on WhatsApp
                </ButtonLink>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-ink/80">
                {["Full in-house team", "Four integrated divisions", "Serving businesses across India"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <Check size={16} className="text-signal-ink" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:col-span-5 lg:max-w-none">
              <Compass />
              <p className="mt-2 text-center font-mono text-xs tracking-[0.2em] text-stone uppercase">
                {site.location.coordinates}
              </p>
            </div>
          </div>
        </Container>

        {/* Pillar strip */}
        <div className="border-y border-ink/10 bg-paper/80 backdrop-blur-sm">
          <Container>
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {divisions.map((d, i) => (
                <li
                  key={d.slug}
                  className={`border-ink/10 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                >
                  <Link
                    href={`/services#${d.slug}`}
                    className="group flex h-full items-center justify-between gap-3 px-2 py-6 sm:px-6"
                  >
                    <span>
                      <span className="block font-mono text-xs text-stone">
                        {d.number} · {d.point}
                      </span>
                      <span className="font-heading mt-1 block text-lg font-bold sm:text-2xl">{d.pillar}.</span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-ink/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ---------------- Overview ---------------- */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Who we are" title="A business growth and technology company." />
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7" data-reveal>
              <p>
                GetNorth Media &amp; AI Solutions helps organisations strengthen their brands, establish a credible
                digital presence, attract customers and improve operational efficiency.
              </p>
              <p>
                We combine creative capability, digital marketing expertise, web technologies and artificial
                intelligence to deliver integrated solutions for businesses across multiple industries — all
                delivered by our full in-house team in Bengaluru.
              </p>
              <TextLink href="/about">More about GetNorth</TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Divisions ---------------- */}
      <section className="pb-24 sm:pb-32" aria-labelledby="divisions-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div data-reveal>
              <Eyebrow>Core divisions</Eyebrow>
              <h2 id="divisions-title" className="font-heading mt-5 max-w-2xl text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.04] font-bold">
                Everything you need to grow, <span className="text-signal">in one place.</span>
              </h2>
            </div>
            <TextLink href="/services">View all services</TextLink>
          </div>

          <div className="mt-14">
            <DivisionCarousel divisions={divisions} />
          </div>
        </Container>
      </section>

      {/* ---------------- Industries ---------------- */}
      <section className="overflow-hidden border-y border-ink/10 bg-paper-2 py-24 sm:py-32" aria-labelledby="industries-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Industries served</Eyebrow>
              <h2 id="industries-title" className="font-heading mt-5 text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.04] font-bold">
                Built around how your sector wins customers.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-stone">
                Every industry has its own buying journey. We shape our creative, marketing and automation work
                around yours.
              </p>
              <div className="mt-8">
                <TextLink href="/industries">How we serve each industry</TextLink>
              </div>
            </div>
            <ol className="grid gap-px self-start overflow-hidden rounded-[20px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-7">
              {industries.map((ind, i) => (
                <li key={ind.slug} className="bg-paper-2">
                  <Link
                    href={`/industries#${ind.slug}`}
                    className="group flex h-full items-center gap-4 bg-paper px-5 py-5 transition-colors hover:bg-white"
                  >
                    <span className="font-mono text-xs text-stone">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{ind.name}</span>
                    <ArrowUpRight size={16} className="ml-auto text-ink/30 transition-colors group-hover:text-signal" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ---------------- Why GetNorth ---------------- */}
      <section className="bg-meridian-dark grain relative bg-ink py-24 text-paper sm:py-32" aria-labelledby="why-title">
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow tone="light">Why GetNorth</Eyebrow>
              <h2 id="why-title" className="font-heading mt-5 text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.04] font-bold">
                Everything your growth needs, <span className="text-signal-bright">aligned.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-mist">
                Most businesses manage a designer, an ad agency, a web developer and an automation consultant
                separately. We bring them under one roof.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[20px] bg-paper/10 sm:grid-cols-2 lg:col-span-8">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className="bg-ink p-7 sm:p-8"
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
                >
                  <span className="font-mono text-xs text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl font-bold">{r.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Approach ---------------- */}
      <section className="py-24 sm:py-32" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title={<span id="approach-title">From direction to results, in four steps.</span>}
          />
          <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {approach.map((a, i) => (
              <li
                key={a.step}
                className="relative lg:pr-8"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <div className="flex items-center gap-4">
                  <span className="font-heading inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < approach.length - 1 && (
                    <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-ink/30 to-ink/0 lg:block" />
                  )}
                </div>
                <h3 className="font-heading mt-6 text-xl font-bold">{a.step}</h3>
                <p className="mt-3 leading-relaxed text-stone">{a.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------------- Featured services ---------------- */}
      <section className="border-t border-ink/10 bg-paper-2 py-24 sm:py-32" aria-labelledby="featured-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured services" title={<span id="featured-title">Where most clients start.</span>} />
            <TextLink href="/services">All services</TextLink>
          </div>
          <BentoGrid items={featured} className="mt-14" />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
