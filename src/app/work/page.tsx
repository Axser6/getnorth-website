import type { Metadata } from "next";
import { workItems } from "@/data/work";
import { pageMetadata } from "@/lib/seo";
import { Container, PlaceholderBadge, SectionHeading } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/sections";
import { WorkGrid } from "./work-grid";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description:
    "Selected projects from GetNorth Media & AI Solutions across brand and creative, digital marketing, AI automation and web development.",
  path: "/work",
});

const caseStructure = [
  { label: "Challenge", body: "The business situation and what needed to change." },
  { label: "Approach", body: "The strategy, creative and technology decisions we made." },
  { label: "Deliverables", body: "What our team designed, produced and built." },
  { label: "Outcome", body: "Results — shared only when measured and approved by the client." },
];

export default function WorkPage() {
  const hasRealWork = workItems.some((w) => !w.placeholder);

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Work that points <span className="text-signal">somewhere.</span>
          </>
        }
        intro="A portfolio of brand, marketing, AI and web projects. Case studies are being prepared and will be published here as they are approved by our clients."
      />

      {!hasRealWork && (
        <div className="border-b border-ink/10 bg-paper-2">
          <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
            <PlaceholderBadge>Portfolio in preparation</PlaceholderBadge>
            <p className="text-sm text-stone">
              The cards below are sample placeholders that show how case studies will be presented. They do not
              represent real clients or completed projects.
            </p>
          </Container>
        </div>
      )}

      <section className="py-20 sm:py-28">
        <Container>
          <WorkGrid items={workItems} />
        </Container>
      </section>

      <section className="border-t border-ink/10 bg-paper-2 py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we present case studies"
            title="Every project, told honestly."
            intro="Each case study follows the same structure, so you can see exactly what was done and why."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caseStructure.map((c, i) => (
              <li key={c.label} className="rounded-[20px] bg-paper p-7" data-reveal>
                <span className="font-mono text-xs text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold">{c.label}</h3>
                <p className="mt-2 leading-relaxed text-stone">{c.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title="Your project could be next." />
    </>
  );
}
