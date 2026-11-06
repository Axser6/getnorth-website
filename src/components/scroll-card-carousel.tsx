"use client";

/**
 * Scroll-driven horizontal card carousel ("Core divisions" on the home page).
 *
 * - The section reserves a tall scroll runway; inside it a full-height stage is sticky.
 * - Vertical scroll progress moves the cards horizontally. Each card dwells briefly in the
 *   centre (sharp, full size) while neighbours are scaled down, blurred and faded.
 * - Pagination bars fill with scroll progress (transform: scaleX only) and are clickable.
 * - Works in both scroll directions, with horizontal swipe on touch screens, with arrow keys,
 *   and when tabbing into a card (the focused card is scrolled to the centre).
 * - Per-frame updates write transform/filter/opacity directly (rAF), never React state.
 * - prefers-reduced-motion: falls back to the plain swipeable carousel (no scroll-driven motion).
 */
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Division } from "@/data/divisions";
import { ArrowRight, divisionGlyph } from "./icons";
import { DivisionCarousel } from "./division-carousel";
import { Container } from "./ui";

/** Scroll distance per card, in small-viewport-height units. */
const RUNWAY_PER_CARD_SVH = 70;
/** Share of each step (at both ends) where the active card holds still. */
const DWELL = 0.18;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Raw linear progress (0 … n-1) → shaped progress with a dwell on every card. */
function shape(raw: number) {
  const base = Math.floor(raw);
  const frac = raw - base;
  const t = clamp((frac - DWELL) / (1 - 2 * DWELL), 0, 1);
  return base + smoothstep(t);
}

/** Visual state of a card at signed distance `d` from the centre. */
function cardStyle(d: number) {
  const ad = Math.abs(d);
  const near = Math.min(ad, 1);
  return {
    transform: `translate3d(calc(-50% + ${d.toFixed(4)} * var(--step)), -50%, 0) scale(${(1 - near * 0.16).toFixed(4)})`,
    filter: ad < 0.01 ? "none" : `blur(${(near * 5).toFixed(2)}px)`,
    opacity: String(clamp(1 - Math.min(ad, 1.6) * 0.42, 0, 1).toFixed(3)),
    zIndex: String(100 - Math.round(ad * 10)),
  };
}

export function ScrollCardCarousel({ divisions, heading }: { divisions: Division[]; heading: ReactNode }) {
  const n = divisions.length;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Window scroll position at which card `k` is centred. */
  const scrollTargetFor = useCallback(
    (k: number) => {
      const sec = sectionRef.current;
      if (!sec) return 0;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const runway = sec.offsetHeight - window.innerHeight;
      return top + (runway * clamp(k, 0, n - 1)) / (n - 1);
    },
    [n],
  );

  const goTo = useCallback(
    (k: number) => {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: scrollTargetFor(k), behavior: smooth ? "smooth" : "auto" });
    },
    [scrollTargetFor],
  );

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;

    const render = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const runway = sec.offsetHeight - window.innerHeight;
      const raw = runway > 0 ? clamp(-sec.getBoundingClientRect().top / runway, 0, 1) * (n - 1) : 0;
      const p = shape(raw);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = cardStyle(i - p);
        el.style.transform = s.transform;
        el.style.filter = s.filter;
        el.style.opacity = s.opacity;
        el.style.zIndex = s.zIndex;
        el.dataset.state = Math.abs(i - p) < 0.5 ? "active" : "side";
      });
      fillRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${clamp(1 - Math.abs(i - p), 0, 1).toFixed(3)})`;
      });

      const next = Math.round(p);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [n, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="pb-24 sm:pb-32" aria-labelledby="divisions-title">
        <Container>
          {heading}
          <div className="mt-14">
            <DivisionCarousel divisions={divisions} />
          </div>
        </Container>
      </section>
    );
  }

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // A deliberate horizontal swipe moves one card; vertical swipes scroll the page natively.
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      goTo(activeRef.current + (dx < 0 ? 1 : -1));
    }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeRef.current + (e.key === "ArrowRight" ? 1 : -1));
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="divisions-title"
      aria-roledescription="carousel"
      className="relative"
      style={{ height: `calc(100svh + ${(n - 1) * RUNWAY_PER_CARD_SVH}svh)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[88px] pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:pt-[104px] md:pb-10 [@media(max-height:700px)]:pt-[80px] [@media(max-height:700px)]:md:pb-6">
        <Container>{heading}</Container>

        <div
          className="relative mt-6 min-h-0 flex-1 touch-pan-y sm:mt-10 [@media(max-height:700px)]:mt-3"
          style={{ "--card-w": "min(78vw, 440px)", "--step": "calc(var(--card-w) * 0.9)" } as React.CSSProperties}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={onKeyDown}
        >
          <ul className="absolute inset-0" aria-label="Core divisions">
            {divisions.map((d, i) => {
              const Glyph = divisionGlyph[d.slug];
              const s = cardStyle(i);
              return (
                <li
                  key={d.slug}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${n}: ${d.name}`}
                  data-state={i === 0 ? "active" : "side"}
                  className="absolute top-1/2 left-1/2 h-[min(100%,480px)] w-(--card-w) will-change-transform"
                  style={{ transform: s.transform, filter: s.filter, opacity: s.opacity, zIndex: Number(s.zIndex) }}
                  onClickCapture={(e) => {
                    // A tap on a side card brings it to the centre instead of navigating.
                    if (activeRef.current !== i) {
                      e.preventDefault();
                      goTo(i);
                    }
                  }}
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-ink p-6 [@media(max-height:700px)]:p-5 text-paper shadow-[0_30px_60px_-30px_rgb(10_62_35/0.6)] sm:p-8">
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(10_62_35)_0%,transparent_60%),radial-gradient(90%_60%_at_0%_100%,rgb(27_53_39)_0%,transparent_70%)]" />
                    <div aria-hidden="true" className="bg-meridian-dark absolute inset-0 opacity-60" />
                    <div className="relative flex items-start justify-between">
                      <Glyph size={28} className="text-signal-bright" />
                      <span className="font-mono text-xs text-mist">{d.number}</span>
                    </div>
                    <div className="relative mt-auto">
                      <h3 className="font-heading text-[clamp(1.4rem,5.6vw,1.75rem)] leading-tight font-bold">{d.short}</h3>
                      <p className="mt-2 text-[0.95rem] leading-snug text-paper/80 sm:mt-3 sm:text-base sm:leading-relaxed [@media(max-height:620px)]:line-clamp-2">{d.summary}</p>
                      <Link
                        href={`/services#${d.slug}`}
                        onFocus={() => {
                          if (activeRef.current !== i) goTo(i);
                        }}
                        className="mt-4 [@media(max-height:700px)]:mt-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-paper/60 sm:mt-6 sm:h-14 sm:w-14 transition-colors duration-(--duration-base) after:absolute after:inset-0 hover:border-paper hover:bg-paper hover:text-ink"
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
        </div>

        <div className="mt-6 flex justify-center gap-1 sm:mt-8 [@media(max-height:700px)]:mt-2" role="group" aria-label="Choose division">
          {divisions.map((d, i) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${d.short}`}
              aria-current={active === i ? "true" : undefined}
              className="flex h-11 min-w-14 items-center justify-center"
            >
              <span className="relative block h-[3px] w-12 overflow-hidden rounded-full bg-ink/15">
                <span
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  className="absolute inset-0 origin-left rounded-full bg-signal"
                  style={{ transform: `scaleX(${i === 0 ? 1 : 0})` }}
                />
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {active + 1} of {n}: {divisions[active]?.name}
        </p>
      </div>
    </section>
  );
}
