import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/data/industries";
import { getDivision } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/sections";
import { ArrowRight, Check, divisionGlyph } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "Media, marketing, web and AI solutions for real estate, manufacturing, retail and e-commerce, healthcare, education, hospitality, professional services, startups and SMEs.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Different sectors. <span className="text-signal">Different journeys.</span>
          </>
        }
        intro="How customers discover, evaluate and buy varies by industry. We shape creative, marketing, technology and automation around the realities of your sector."
      >
        <ul className="flex flex-wrap gap-2">
          {industries.map((i) => (
            <li key={i.slug}>
              <a
                href={`#${i.slug}`}
                className="inline-flex rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {i.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="py-12 sm:py-16">
        {industries.map((ind, idx) => (
          <section key={ind.slug} id={ind.slug} aria-labelledby={`${ind.slug}-title`} className="scroll-mt-24">
            <Container>
              <div className="grid gap-10 border-b border-ink/10 py-16 sm:py-20 lg:grid-cols-12" data-reveal>
                <div className="lg:col-span-5">
                  <span className="font-mono text-xs text-signal-ink">
                    {String(idx + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </span>
                  <h2 id={`${ind.slug}-title`} className="font-heading mt-4 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.05] font-extrabold">
                    {ind.name}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-stone">{ind.short}</p>
                  <div className="mt-8 flex flex-wrap gap-2" aria-label="Relevant divisions">
                    {ind.focus.map((slug) => {
                      const d = getDivision(slug)!;
                      const Glyph = divisionGlyph[slug];
                      return (
                        <Link
                          key={slug}
                          href={`/services#${slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-paper-2 px-3 py-1.5 text-[0.8rem] font-medium hover:bg-ink hover:text-paper"
                        >
                          <Glyph size={14} /> {d.pillar}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                  <div className="rounded-[20px] bg-paper-2 p-7">
                    <h3 className="font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">The challenge</h3>
                    <p className="mt-4 leading-relaxed text-ink/85">{ind.challenge}</p>
                  </div>
                  <div className="rounded-[20px] border border-ink/10 p-7">
                    <h3 className="font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">How GetNorth helps</h3>
                    <ul className="mt-4 space-y-3">
                      {ind.approach.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                          <Check size={18} className="mt-0.5 shrink-0 text-signal-ink" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/contact?industry=${ind.slug}`}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
                    >
                      Discuss your {ind.name.toLowerCase()} project
                      <ArrowRight size={16} className="text-signal transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CtaBand
        title="Don't see your industry?"
        body="The fundamentals — a credible brand, consistent visibility, a converting website and efficient follow-up — apply to almost every business. Tell us about yours."
      />
    </>
  );
}
