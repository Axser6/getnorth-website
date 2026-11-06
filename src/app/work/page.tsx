import type { Metadata } from "next";
import { workItems } from "@/data/work";
import { pageMetadata } from "@/lib/seo";
import { Container, PlaceholderBadge, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { WorkGrid } from "./work-grid";
import { WorkTunnel } from "@/components/work-tunnel";
import { unsplash } from "@/lib/unsplash";
import type { TunnelImage } from "@/components/ui/perspective-tunnel-hero";

/** Minimum number of real project photos before the tunnel switches to them. */
const MIN_PROJECT_PHOTOS = 5;

/**
 * Illustrative stock imagery (Unsplash, free licence), labelled with service names — NOT client
 * work. Shown only until enough real project photos exist in src/data/work.ts.
 * Any photo that fails to load is hidden automatically.
 */
const ILLUSTRATIVE: TunnelImage[] = [
  { src: unsplash("photo-1497366216548-37526070297c"), title: "Brand identity" },
  { src: unsplash("photo-1522071820081-009f0129c71c"), title: "Content strategy" },
  { src: unsplash("photo-1460925895917-afdab827c52f"), title: "Performance marketing" },
  { src: unsplash("photo-1677442136019-21780ecad995"), title: "AI agents" },
  { src: unsplash("photo-1551434678-e076c223a692"), title: "SEO" },
  { src: unsplash("photo-1498050108023-c5249f4df085"), title: "Web development" },
  { src: unsplash("photo-1557804506-669a67965ba0"), title: "Campaign planning" },
  { src: unsplash("photo-1519389950473-47ba0277781c"), title: "WhatsApp automation" },
  { src: unsplash("photo-1550751827-4bd374c3f58b"), title: "Business dashboards" },
  { src: unsplash("photo-1556761175-5973dc0f32e7"), title: "Strategy workshops" },
  { src: unsplash("photo-1542744173-8e7e53415bb0"), title: "Pitch & presentation" },
  { src: unsplash("photo-1551288049-bebda4e38f71"), title: "Analytics" },
  { src: unsplash("photo-1611162617213-7d7a39e9b1d7"), title: "Social media" },
  { src: unsplash("photo-1561070791-2526d30994b5"), title: "Graphic design" },
  { src: unsplash("photo-1488590528505-98d2b5aba04b"), title: "Custom platforms" },
  { src: unsplash("photo-1531403009284-440f080d1e12"), title: "Creative campaigns" },
];

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
  const projectPhotos: TunnelImage[] = workItems
    .filter((w) => !w.placeholder && w.image)
    .map((w) => ({ src: w.image!, title: w.title }));
  const useProjectPhotos = projectPhotos.length >= MIN_PROJECT_PHOTOS;

  return (
    <>
      <WorkTunnel
        images={useProjectPhotos ? projectPhotos : ILLUSTRATIVE}
        note={useProjectPhotos ? undefined : "Illustrative imagery · client project photos coming soon"}
        outroTitle={
          <>
            Four disciplines. <span className="text-signal-bright">One team.</span>
          </>
        }
        outroBody="Media, marketing, technology and AI — planned together and delivered in-house in Bengaluru."
      />

      <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 pb-20 sm:pb-28">
        {!hasRealWork && (
        <div className="border-b border-ink/10 bg-paper-2">
          <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
            <PlaceholderBadge>Portfolio in preparation</PlaceholderBadge>
            <p className="text-sm text-stone">
              The cards below are sample placeholders, shown with illustrative stock photos, to preview how case
              studies will be presented. They do not represent real clients or completed projects.
            </p>
          </Container>
        </div>
        )}

        <Container className="pt-14 sm:pt-20">
          <SectionHeading
            eyebrow="Projects"
            title={<span id="projects-title">Projects by discipline.</span>}
            intro="Filter by discipline. Each project opens to show its challenge, approach, deliverables and outcome."
          />
          <div className="mt-10">
            <WorkGrid items={workItems} />
          </div>
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
