"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Division } from "@/data/divisions";
import { ArrowRight, divisionGlyph } from "./icons";
import { cn } from "@/lib/cn";

/**
 * Division cards: a swipeable, snap-scrolling carousel on mobile/tablet
 * and a four-column grid on desktop.
 */
export function DivisionCarousel({ divisions }: { divisions: Division[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root: track, threshold: 0.6 },
    );
    track.querySelectorAll("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-index="${i}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        aria-label="Core divisions"
      >
        {divisions.map((d, i) => {
          const Glyph = divisionGlyph[d.slug];
          return (
            <li
              key={d.slug}
              data-index={i}
              className="w-[78%] shrink-0 snap-center sm:w-[46%] lg:w-auto"
            >
              <article className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[26px] bg-ink p-7 text-paper shadow-[0_30px_60px_-30px_rgb(10_62_35/0.6)] transition-transform duration-500 hover:-translate-y-1 sm:p-8">
                {/* Layered green light, in place of photography */}
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(10_62_35)_0%,transparent_60%),radial-gradient(90%_60%_at_0%_100%,rgb(27_53_39)_0%,transparent_70%)]" />
                <div aria-hidden="true" className="bg-meridian-dark absolute inset-0 opacity-60" />
                <div className="relative flex items-start justify-between">
                  <Glyph size={30} className="text-signal-bright" />
                  <span className="font-mono text-xs text-mist">{d.number}</span>
                </div>
                <div className="relative mt-auto">
                  <h3 className="font-heading text-[1.75rem] leading-tight font-bold">{d.short}</h3>
                  <p className="mt-3 leading-relaxed text-paper/80">{d.summary}</p>
                  <Link
                    href={`/services#${d.slug}`}
                    className="mt-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-paper/60 transition-colors after:absolute after:inset-0 group-hover:border-paper group-hover:bg-paper group-hover:text-ink"
                    aria-label={`Explore ${d.name}`}
                  >
                    <ArrowRight size={22} />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center gap-2 lg:hidden" role="group" aria-label="Choose division">
        {divisions.map((d, i) => (
          <button
            key={d.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${d.short}`}
            aria-current={active === i ? "true" : undefined}
            className="flex h-6 items-center"
          >
            <span
              className={cn(
                "block h-[3px] rounded-full transition-all duration-300",
                active === i ? "w-12 bg-signal" : "w-8 bg-ink/15",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
