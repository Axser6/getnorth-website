"use client";

import Image from "next/image";
import { useState } from "react";
import { divisions } from "@/data/divisions";
import type { WorkItem } from "@/data/work";
import { PlaceholderBadge } from "@/components/ui";
import { divisionGlyph } from "@/components/icons";
import { cn } from "@/lib/cn";

const SHAPES = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square"];

function WorkCard({ item, shape }: { item: WorkItem; shape: string }) {
  const [failed, setFailed] = useState(false);
  const d = divisions.find((x) => x.slug === item.division)!;
  const Glyph = divisionGlyph[item.division];
  const showPhoto = item.image && !failed;
  return (
    <article className="group flex flex-col overflow-hidden rounded-(--radius-card) border border-ink/10 bg-surface-raised shadow-(--shadow-card) transition-[box-shadow,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) motion-reduce:hover:translate-y-0">
      <div
        className={cn("relative flex items-center justify-center overflow-hidden bg-paper-2", shape)}
        style={
          showPhoto
            ? undefined
            : { backgroundImage: "repeating-linear-gradient(135deg, rgb(11 15 20 / 0.045) 0 1px, transparent 1px 14px)" }
        }
      >
        {showPhoto ? (
          <>
            <Image
              src={item.image!}
              alt={item.imageAlt ?? item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              onError={() => setFailed(true)}
              className="object-cover transition-transform duration-700 ease-(--ease-north) group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <span aria-hidden="true" className="absolute right-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm">
              <Glyph size={20} />
            </span>
          </>
        ) : (
          <div className="text-center">
            <Glyph size={36} className="mx-auto text-ink/35" />
            <p className="mt-3 font-mono text-xs tracking-[0.15em] text-stone uppercase">Project image to be supplied</p>
          </div>
        )}
        {item.placeholder && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {/* Solid backing keeps the badge legible over photos */}
            <span className="rounded-full bg-paper shadow-sm">
              <PlaceholderBadge />
            </span>
            {showPhoto && (
              <span className="rounded-full bg-ink/75 px-2.5 py-1 text-xs font-medium text-paper backdrop-blur-sm">
                Illustrative photo
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col p-6 sm:p-7">
        <p className="font-mono text-xs tracking-[0.15em] text-stone uppercase">
          {d.pillar} · {item.industry}
        </p>
        <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
        <p className="mt-2 leading-relaxed text-stone">{item.summary}</p>
        <details className="group/d mt-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
            <span className="group-open/d:hidden">View case study structure</span>
            <span className="hidden group-open/d:inline">Hide details</span>
          </summary>
          <dl className="mt-3 space-y-3 text-[0.9rem]">
            {(
              [
                ["Challenge", item.challenge],
                ["Approach", item.approach],
                ["Deliverables", item.deliverables.join(" · ")],
                ["Outcome", item.outcome],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-xs tracking-[0.15em] text-stone uppercase">{k}</dt>
                <dd className="mt-1 text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </article>
  );
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<string>("all");
  const visible = filter === "all" ? items : items.filter((i) => i.division === filter);
  const filters = [{ slug: "all", short: "All work" }, ...divisions];

  return (
    <>
      <div role="group" aria-label="Filter projects by division" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={filter === f.slug}
            onClick={() => setFilter(f.slug)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.97]",
              filter === f.slug ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink",
            )}
          >
            {f.short}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {/* Masonry (ui-ux-pro-max Portfolio Grid: visuals first, filter by category) */}
      <ul className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
        {visible.map((item, i) => (
          <li key={item.id} className="mb-6 break-inside-avoid">
            <WorkCard item={item} shape={SHAPES[i % SHAPES.length]} />
          </li>
        ))}
      </ul>
    </>
  );
}
