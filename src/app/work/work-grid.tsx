"use client";

import Image from "next/image";
import { useState } from "react";
import { divisions } from "@/data/divisions";
import type { WorkItem } from "@/data/work";
import { PlaceholderBadge } from "@/components/ui";
import { divisionGlyph } from "@/components/icons";
import { cn } from "@/lib/cn";

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

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const d = divisions.find((x) => x.slug === item.division)!;
          const Glyph = divisionGlyph[item.division];
          return (
            <li key={item.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-paper">
                <div
                  className="relative flex aspect-[4/3] items-center justify-center border-b border-dashed border-ink/20 bg-paper-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgb(11 15 20 / 0.045) 0 1px, transparent 1px 14px)",
                  }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Glyph size={36} className="mx-auto text-ink/35" />
                      <p className="mt-3 font-mono text-xs tracking-[0.15em] text-stone uppercase">
                        Project image to be supplied
                      </p>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">{item.placeholder && <PlaceholderBadge />}</div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-mono text-xs tracking-[0.15em] text-stone uppercase">
                    {d.pillar} · {item.industry}
                  </p>
                  <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 leading-relaxed text-stone">{item.summary}</p>
                  <details className="group mt-auto pt-6">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-semibold underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">View case study structure</span>
                      <span className="hidden group-open:inline">Hide details</span>
                    </summary>
                    <dl className="mt-4 space-y-3 text-[0.9rem]">
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
            </li>
          );
        })}
      </ul>
    </>
  );
}
