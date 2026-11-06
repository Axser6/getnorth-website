import type { Metadata } from "next";
import { aiPrinciples, aiProblems, aiProcess, aiSolutions } from "@/data/ai";
import { pageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { ArrowRight, Check, Plus, WhatsApp } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "AI Solutions & Business Automation",
  description:
    "Custom AI agents, AI chatbots, WhatsApp automation, CRM automation and business process automation for Indian businesses — designed to respond faster, reduce manual work and capture every lead.",
  path: "/ai-solutions",
});

const journey = [
  { time: "Enquiry", title: "A customer messages after office hours", body: "A prospect sends a WhatsApp message or uses your website chat." },
  { time: "Seconds later", title: "The AI agent replies", body: "It answers their question from your approved information and asks a few qualifying questions." },
  { time: "Automatically", title: "The lead is saved and assigned", body: "Details are recorded in your CRM or sheet and routed to the right team member." },
  { time: "Instantly", title: "Your team is notified", body: "The assigned person receives a summary, so the first human call is informed." },
  { time: "Next day", title: "Follow-up happens on schedule", body: "If there is no response, a polite, pre-approved follow-up is sent automatically." },
];

const integrations = [
  "WhatsApp Business Platform",
  "Website forms & chat",
  "Meta & Google lead forms",
  "CRM systems",
  "Google Workspace & Sheets",
  "Email",
  "Calendars & booking tools",
  "Internal databases & APIs",
];

const faqs = [
  {
    q: "Do we need technical knowledge to use AI automation?",
    a: "No. We design, build and integrate the system, then train your team on how to use and monitor it. Day-to-day, your team works in familiar tools like WhatsApp, a CRM or a sheet.",
  },
  {
    q: "Will an AI agent replace our staff?",
    a: "That is not the goal. Automation handles repetitive, time-sensitive work — instant replies, data entry, reminders — so your people can spend more time on conversations and decisions that need a human.",
  },
  {
    q: "Do you use the official WhatsApp API?",
    a: "Yes. WhatsApp automation is built on the official WhatsApp Business Platform through approved providers, which is required for reliable, policy-compliant business messaging. Platform and messaging charges are billed by the provider.",
  },
  {
    q: "How do you keep our business data safe?",
    a: "We limit access to only what each system needs, use reputable platforms, and agree with you which information the AI may use. Sensitive decisions are routed to people, not automated.",
  },
  {
    q: "How long does an AI or automation project take?",
    a: "It depends on scope. A focused chatbot or WhatsApp flow is much quicker than a multi-system integration. After an initial discovery conversation, we share a clear scope and timeline.",
  },
  {
    q: "Can it work with the tools we already use?",
    a: "Usually, yes. We prefer to integrate with your existing CRM, sheets, forms and messaging rather than ask your team to adopt something new. We confirm compatibility during discovery.",
  },
];

export default function AiSolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-meridian-dark grain relative overflow-hidden bg-ink pt-[132px] pb-20 text-paper sm:pt-[152px] sm:pb-28">
        <div aria-hidden="true" className="absolute top-20 -right-40 h-[520px] w-[520px] rounded-full bg-signal/60 blur-[120px]" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">AI Solutions</Eyebrow>
              <h1 className="font-heading mt-6 text-[clamp(2.4rem,6.4vw,5.25rem)] leading-[0.98] font-extrabold">
                AI that does real work for your <span className="text-signal-bright">business.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
                Custom AI agents, chatbots and automated workflows that respond to customers instantly, remove
                repetitive admin and make sure no lead is forgotten — built around the way your business already
                works.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact?service=ai-automation" variant="light" arrow>
                  Discuss an AI project
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref("Hello GetNorth, I'd like to explore AI automation for my business.")}
                  variant="outline-light"
                >
                  <WhatsApp size={18} /> Ask on WhatsApp
                </ButtonLink>
              </div>
            </div>

            {/* Illustrative workflow diagram */}
            <figure className="lg:col-span-5">
              <div className="rounded-[24px] border border-paper/12 bg-ink-2/80 p-6 backdrop-blur sm:p-8">
                <ol className="space-y-3">
                  {[
                    { k: "IN", t: "WhatsApp · Website · Ads", d: "Enquiries from every channel" },
                    { k: "AI", t: "GetNorth AI agent", d: "Answers, qualifies, summarises", hl: true },
                    { k: "CRM", t: "Lead record & routing", d: "Saved, tagged and assigned" },
                    { k: "OUT", t: "Team notified · Follow-up", d: "Human hand-off when it matters" },
                  ].map((n, i, arr) => (
                    <li key={n.k}>
                      <div
                        className={`flex items-center gap-4 rounded-2xl border px-4 py-4 ${
                          n.hl ? "border-signal-bright/50 bg-signal" : "border-paper/10 bg-ink"
                        }`}
                      >
                        <span
                          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-[0.7rem] font-semibold ${
                            n.hl ? "bg-signal-bright text-ink" : "bg-paper/10 text-paper"
                          }`}
                        >
                          {n.k}
                        </span>
                        <span>
                          <span className="block font-semibold">{n.t}</span>
                          <span className="block text-sm text-mist">{n.d}</span>
                        </span>
                        {n.hl && <span className="ml-auto h-2 w-2 animate-pulse-dot rounded-full bg-signal-bright" aria-hidden="true" />}
                      </div>
                      {i < arr.length - 1 && (
                        <div aria-hidden="true" className="ml-[37px] h-3 w-px bg-paper/25" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption className="mt-3 font-mono text-[0.68rem] tracking-[0.15em] text-mist uppercase">
                Illustrative workflow
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Problems */}
      <section className="py-24 sm:py-32" aria-labelledby="problems-title">
        <Container>
          <SectionHeading
            eyebrow="The business problems"
            title={<span id="problems-title">Where AI and automation make a measurable difference.</span>}
            intro="AI is most valuable when it is pointed at a specific, recurring problem. These are the ones we solve most often."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
            {aiProblems.map((p, i) => (
              <div key={p.problem} className="bg-paper p-7 sm:p-8" data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <p className="font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">Problem</p>
                <h3 className="mt-2 text-xl font-bold">{p.problem}</h3>
                <div className="mt-6 flex items-start gap-3 border-t border-ink/10 pt-5">
                  <ArrowRight size={18} className="mt-0.5 shrink-0 text-signal-ink" />
                  <p className="leading-relaxed text-ink/80">{p.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="border-y border-ink/10 bg-paper-2 py-24 sm:py-32" aria-labelledby="solutions-title">
        <Container>
          <SectionHeading eyebrow="What we build" title={<span id="solutions-title">Our AI solutions.</span>} />

          <nav aria-label="AI solutions" className="mt-10 flex flex-wrap gap-2">
            {aiSolutions.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-medium hover:border-ink hover:bg-ink hover:text-paper">
                {s.name}
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-5">
            {aiSolutions.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="grid scroll-mt-28 gap-8 rounded-[24px] bg-paper p-7 sm:p-10 lg:grid-cols-12"
                data-reveal
              >
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-signal-ink">AI.{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading mt-3 text-[1.9rem] leading-tight font-extrabold">{s.name}</h3>
                  <p className="mt-3 text-lg text-stone">{s.tagline}</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">The problem</h4>
                      <p className="mt-2 leading-relaxed text-ink/85">{s.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">Our solution</h4>
                      <p className="mt-2 leading-relaxed text-ink/85">{s.solution}</p>
                    </div>
                  </div>
                  <div className="rounded-[16px] bg-paper-2 p-6">
                    <h4 className="font-mono text-[0.7rem] tracking-[0.15em] text-stone uppercase">Capabilities</h4>
                    <ul className="mt-4 space-y-3">
                      {s.capabilities.map((c) => (
                        <li key={c} className="flex items-start gap-3 text-[0.95rem]">
                          <Check size={18} className="mt-0.5 shrink-0 text-signal-ink" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Journey */}
      <section className="py-24 sm:py-32" aria-labelledby="journey-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Illustrative example"
                  title={<span id="journey-title">A lead&apos;s journey, automated.</span>}
                  intro="How AI agents, WhatsApp automation and CRM automation work together — so a late-night enquiry becomes a well-prepared sales conversation the next morning."
                />
              </div>
            </div>
            <ol className="relative lg:col-span-7 lg:col-start-6">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-ink/15" />
              {journey.map((j, i) => (
                <li key={j.title} className="relative flex gap-6 pb-10 last:pb-0" data-reveal>
                  <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-mono text-[0.7rem] tracking-[0.15em] text-signal-ink uppercase">{j.time}</p>
                    <h3 className="mt-1.5 text-xl font-bold">{j.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone">{j.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Process + principles */}
      <section className="bg-meridian-dark grain relative bg-ink py-24 text-paper sm:py-32" aria-labelledby="process-title">
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="How we deliver AI projects" title={<span id="process-title">A careful, staged process.</span>} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[20px] bg-paper/10 sm:grid-cols-2 lg:grid-cols-5">
            {aiProcess.map((p, i) => (
              <li key={p.step} className="bg-ink p-7" data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <span className="font-mono text-xs text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-bold">{p.step}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow tone="light">Responsible AI</Eyebrow>
              <h3 className="font-heading mt-5 text-3xl font-bold">Principles we build by.</h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {aiPrinciples.map((p) => (
                <div key={p.title} className="border-t border-paper/15 pt-5" data-reveal>
                  <h4 className="font-bold">{p.title}</h4>
                  <p className="mt-2 leading-relaxed text-mist">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="py-24 sm:py-28" aria-labelledby="integrations-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Integrations"
                title={<span id="integrations-title">Works with the tools you already use.</span>}
                intro="We connect AI and automation to your existing systems wherever possible, so your team keeps working in familiar tools."
              />
            </div>
            <ul className="flex flex-wrap gap-3 lg:col-span-7" data-reveal>
              {integrations.map((t) => (
                <li key={t} className="rounded-full border border-ink/15 px-5 py-3 font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 bg-paper-2 py-24 sm:py-32" aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title={<span id="faq-title">Questions about AI for business.</span>} />
            </div>
            <div className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
              {faqs.map((f) => (
                <details key={f.q} className="group py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus size={20} className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 leading-relaxed text-stone">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Find out what AI can do for your business."
        body="Tell us where time is being lost or customers are waiting. We'll identify the most practical automation opportunities and explain them in plain language."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
