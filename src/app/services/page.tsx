import type { Metadata } from "next";
import Link from "next/link";
import { divisions } from "@/data/divisions";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/sections";
import { Check, divisionGlyph } from "@/components/icons";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Brand identity, video and content; SEO, Google Ads and Meta Ads; AI agents, chatbots and WhatsApp automation; corporate websites, e-commerce and web applications — from one in-house team in Bengaluru.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything your growth needs, <span className="text-signal">in one place.</span>
          </>
        }
        intro="Four integrated divisions covering how your business looks, how it is found, how it operates and how it sells online. Engage one service, or combine them into a single coordinated programme."
      />

      {/* Division jump navigation */}
      <nav aria-label="Service divisions" className="sticky top-[72px] z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
        <Container>
          <ul className="-mx-2 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
            {divisions.map((d) => (
              <li key={d.slug} className="shrink-0">
                <a
                  href={`#${d.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink hover:text-paper"
                >
                  <span className="font-mono text-[0.7rem] opacity-70">{d.number}</span>
                  {d.short}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {divisions.map((d, idx) => {
        const Glyph = divisionGlyph[d.slug];
        const dark = idx % 2 === 1;
        return (
          <section
            key={d.slug}
            id={d.slug}
            aria-labelledby={`${d.slug}-title`}
            className={cn(
              "scroll-mt-[140px] py-24 sm:py-32",
              dark ? "bg-meridian-dark grain relative bg-ink text-paper" : "bg-paper",
            )}
          >
            <Container className="relative">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-[170px]" data-reveal>
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "inline-flex h-14 w-14 items-center justify-center rounded-full",
                          dark ? "bg-paper text-ink" : "bg-ink text-paper",
                        )}
                      >
                        <Glyph size={24} />
                      </span>
                      <Eyebrow tone={dark ? "light" : "dark"}>
                        Division {d.number} · {d.pillar}
                      </Eyebrow>
                    </div>
                    <h2 id={`${d.slug}-title`} className="font-heading mt-8 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold">
                      {d.name}
                    </h2>
                    <p className={cn("mt-6 text-lg leading-relaxed", dark ? "text-mist" : "text-stone")}>{d.intro}</p>

                    <div className="mt-10">
                      <h3 className={cn("font-mono text-xs font-medium tracking-[0.2em] uppercase", dark ? "text-mist" : "text-stone")}>
                        Typical deliverables
                      </h3>
                      <ul className="mt-5 grid gap-2.5">
                        {d.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check size={18} className={cn("mt-0.5 shrink-0", dark ? "text-signal-bright" : "text-signal-ink")} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      <ButtonLink href={`/contact?service=${d.slug}`} variant={dark ? "light" : "primary"} arrow>
                        Enquire about {d.short}
                      </ButtonLink>
                      {d.slug === "ai-automation" && (
                        <ButtonLink href="/ai-solutions" variant={dark ? "outline-light" : "outline"}>
                          See AI Solutions
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="sr-only">Services in {d.name}</h3>
                  <div
                    className={cn(
                      "grid gap-px overflow-hidden rounded-[20px] sm:grid-cols-2",
                      dark ? "bg-paper/10" : "border border-ink/10 bg-ink/10",
                    )}
                  >
                    {d.services.map((s, i) => (
                      <div
                        key={s.name}
                        className={cn("p-7 sm:p-8", dark ? "bg-ink" : "bg-paper")}
                        data-reveal
                        style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties}
                      >
                        <span className={cn("font-mono text-xs", dark ? "text-signal-bright" : "text-signal-ink")}>
                          {d.number}.{String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="mt-3 text-lg font-bold">{s.name}</h4>
                        <p className={cn("mt-3 leading-relaxed", dark ? "text-mist" : "text-stone")}>{s.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <h3 className={cn("font-mono text-xs font-medium tracking-[0.2em] uppercase", dark ? "text-mist" : "text-stone")}>
                      Business benefits
                    </h3>
                    <div className="mt-5 grid gap-5 sm:grid-cols-3">
                      {d.benefits.map((b) => (
                        <div
                          key={b.title}
                          className={cn("rounded-[16px] p-6", dark ? "bg-ink-3" : "bg-paper-2")}
                          data-reveal
                        >
                          <h4 className="font-bold">{b.title}</h4>
                          <p className={cn("mt-2 text-[0.95rem] leading-relaxed", dark ? "text-mist" : "text-stone")}>{b.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="border-t border-ink/10 py-16">
        <Container>
          <p className="max-w-3xl text-lg leading-relaxed text-stone">
            Not sure which service you need? Most projects combine more than one division.{" "}
            <Link href="/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-signal-ink">
              Tell us your goal
            </Link>{" "}
            and we&apos;ll recommend a starting point.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
