import type { Metadata } from "next";
import { divisions } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/sections";
import { Compass } from "@/components/compass";
import { divisionGlyph } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "GetNorth Media & AI Solutions is a Bengaluru-based business growth and technology company with a full in-house team across media, marketing, web technology and AI.",
  path: "/about",
});

const philosophy = [
  {
    title: "Direction before activity",
    body: "Posting, advertising and building are only useful when they serve a clear goal. We agree the destination first.",
  },
  {
    title: "Integration over fragmentation",
    body: "Brand, marketing, website and automation should reinforce each other. We plan them as one system.",
  },
  {
    title: "Craft that earns trust",
    body: "Professional design, clear writing and dependable technology are how businesses earn credibility. We hold a high standard.",
  },
  {
    title: "Technology with purpose",
    body: "AI and automation should make work simpler and customers happier. If it does not, we do not recommend it.",
  },
];

const approach = [
  { title: "Listen", body: "Understand the business, the customer and the constraint holding growth back." },
  { title: "Diagnose", body: "Review your brand, channels, website and processes to find the biggest opportunities." },
  { title: "Recommend", body: "Propose a focused plan with a clear scope, priorities and expected deliverables." },
  { title: "Deliver", body: "Our in-house team produces, builds and launches — with regular updates throughout." },
  { title: "Improve", body: "Measure, learn and refine, so results get better with every cycle." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GetNorth"
        title={
          <>
            Helping businesses find <span className="text-signal">direction</span> — and move with it.
          </>
        }
        intro="GetNorth Media & AI Solutions is a business growth and technology company headquartered in Bengaluru. We help organisations strengthen their brands, establish digital presence, attract customers and improve operational efficiency."
        aside={
          <div className="mx-auto hidden max-w-[300px] lg:block">
            <Compass />
          </div>
        }
      />

      {/* Introduction */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Company introduction" title="Creativity, marketing, technology and AI — under one organisation." />
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7" data-reveal>
              <p>
                Growing a business today means getting many things right at once: a brand people recognise and
                trust, content that earns attention, marketing that brings in real enquiries, a website that
                converts, and operations efficient enough to handle growth.
              </p>
              <p>
                Most organisations piece this together from separate freelancers, agencies and consultants. The
                result is often inconsistent messaging, duplicated effort and no single view of what is working.
              </p>
              <p>
                GetNorth was built to solve that. We combine creative capabilities, digital marketing expertise, web
                technologies and artificial intelligence in one full in-house team — delivering integrated solutions
                for businesses across multiple industries.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-ink/10 bg-paper-2">
        <Container>
          <div className="grid md:grid-cols-2">
            <div className="border-ink/10 py-16 md:border-r md:py-24 md:pr-12" data-reveal>
              <Eyebrow>Mission</Eyebrow>
              <p className="font-heading mt-6 text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.12] font-bold">
                To empower businesses through creative, digital and intelligent technology solutions.
              </p>
            </div>
            <div className="border-t border-ink/10 py-16 md:border-t-0 md:py-24 md:pl-12" data-reveal>
              <Eyebrow>Vision</Eyebrow>
              <p className="font-heading mt-6 text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.12] font-bold">
                To become a trusted media, marketing and AI solutions partner for businesses across India.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Company philosophy"
            title="What guides our work."
            intro="Four principles shape every recommendation we make and every project we deliver."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {philosophy.map((p, i) => (
              <div
                key={p.title}
                className="rounded-[20px] border border-ink/10 p-8 sm:p-10"
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 60}ms` } as React.CSSProperties}
              >
                <span className="font-mono text-xs text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading mt-4 text-2xl font-bold">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-stone">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-meridian-dark grain relative bg-ink py-24 text-paper sm:py-32">
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="Our approach" title="How we work with you." />
          <ol className="mt-14 divide-y divide-paper/10 border-y border-paper/10">
            {approach.map((a, i) => (
              <li key={a.title} className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline" data-reveal>
                <span className="font-mono text-sm text-signal-bright sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-2xl font-bold sm:col-span-4">{a.title}</h3>
                <p className="text-lg leading-relaxed text-mist sm:col-span-7">{a.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our capabilities" title="Four divisions, one in-house team." />
            <TextLink href="/services">Explore services</TextLink>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {divisions.map((d) => {
              const Glyph = divisionGlyph[d.slug];
              return (
                <div key={d.slug} className="flex flex-col rounded-[20px] bg-paper-2 p-7" data-reveal>
                  <div className="flex items-center justify-between">
                    <Glyph size={24} className="text-signal" />
                    <span className="font-mono text-xs text-stone">{d.number}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold">{d.name}</h3>
                  <ul className="mt-5 space-y-2 text-[0.95rem] text-ink/80">
                    {d.services.map((s) => (
                      <li key={s.name} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-stone" data-reveal>
            Headquartered in {site.location.city}, {site.location.region}, and working with businesses across India.
          </p>
        </Container>
      </section>

      <CtaBand title="Let's talk about your business." />
    </>
  );
}
