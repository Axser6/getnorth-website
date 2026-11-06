"use client";

/**
 * Endless (360°) card carousel — "Core divisions" on the home page.
 *
 * The page always scrolls normally: this carousel never captures vertical scrolling.
 * Cards move only through:
 *   - touch swipe / mouse drag (cards follow the pointer, then snap; a flick moves one card)
 *   - previous / next buttons, the pagination bars, and ← / → keys
 *   - a gentle auto-advance (pause button; pauses on hover, focus and touch, when
 *     off-screen or the tab is hidden; disabled for prefers-reduced-motion)
 *
 * Cards sit on a circular ring, so there is no first or last card: after the last one the
 * first comes round again, in either direction. Motion uses a frame-rate-independent
 * exponential ease, and per-frame updates write transform/filter/opacity directly.
 */
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Division } from "@/data/divisions";
import { ArrowRight, divisionGlyph } from "./icons";
import { Container } from "./ui";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 4500;
/** Follow speed of the smoothing (higher = snappier). ~9 ≈ 250 ms to settle. */
const FOLLOW = 9;
/** Card centre-to-centre distance as a share of the card width. */
const STEP = 0.9;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const mod = (x: number, m: number) => ((x % m) + m) % m;
/** Signed shortest distance on a ring of size m, in [-m/2, m/2). */
const ringDist = (x: number, m: number) => mod(x + m / 2, m) - m / 2;

/** Visual state of a card at signed ring distance `d` from the centre. */
function cardStyle(d: number, n: number) {
  const ad = Math.abs(d);
  const near = Math.min(ad, 1);
  const edge = n / 2; // where a card wraps to the other side — it is fully transparent there
  const opacity = ad <= 1 ? 1 - ad * 0.42 : 0.58 * clamp((edge - ad) / (edge - 1), 0, 1);
  return {
    transform: `translate3d(calc(-50% + ${d.toFixed(4)} * var(--step)), -50%, 0) scale(${(1 - near * 0.16).toFixed(4)})`,
    filter: ad < 0.01 ? "none" : `blur(${(near * 5).toFixed(2)}px)`,
    opacity: opacity.toFixed(3),
    zIndex: String(100 - Math.round(ad * 10)),
    pointerEvents: (opacity < 0.05 ? "none" : "auto") as "none" | "auto",
  };
}

export function LoopCardCarousel({ divisions, heading }: { divisions: Division[]; heading: ReactNode }) {
  const n = divisions.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  /** Smoothed (`current`) and desired (`target`) position on the ring, unwrapped. */
  const motion = useRef({ current: 0, target: 0, raf: 0, last: 0, reduced: false });
  const drag = useRef<{ id: number; x: number; y: number; start: number; t: number; moved: boolean; axis: "x" | "y" | null } | null>(null);
  const suppressClick = useRef(false);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // user pressed pause
  const [holding, setHolding] = useState(false); // hover / focus / touch
  const [visible, setVisible] = useState(false); // on screen
  const [reduced, setReduced] = useState(false);

  const paint = useCallback(() => {
    const p = motion.current.current;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = ringDist(i - p, n);
      const s = cardStyle(d, n);
      el.style.transform = s.transform;
      el.style.filter = s.filter;
      el.style.opacity = s.opacity;
      el.style.zIndex = s.zIndex;
      el.style.pointerEvents = s.pointerEvents;
      el.dataset.state = Math.abs(d) < 0.5 ? "active" : "side";
    });
    fillRefs.current.forEach((el, i) => {
      if (el) el.style.transform = `scaleX(${clamp(1 - Math.abs(ringDist(i - p, n)), 0, 1).toFixed(3)})`;
    });
    const next = mod(Math.round(p), n);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  }, [n]);

  /** Start (or keep) the smoothing loop running until `current` reaches `target`. */
  const animate = useCallback(() => {
    const m = motion.current;
    if (m.reduced) {
      m.current = m.target;
      paint();
      return;
    }
    if (m.raf) return;
    const tick = (t: number) => {
      const dt = m.last ? Math.min((t - m.last) / 1000, 0.05) : 1 / 60;
      m.last = t;
      m.current += (m.target - m.current) * (1 - Math.exp(-FOLLOW * dt));
      if (Math.abs(m.target - m.current) < 0.0004) m.current = m.target;
      paint();
      if (m.current !== m.target) {
        m.raf = requestAnimationFrame(tick);
      } else {
        m.raf = 0;
        m.last = 0;
      }
    };
    m.raf = requestAnimationFrame(tick);
  }, [paint]);

  const setTarget = useCallback(
    (t: number) => {
      motion.current.target = t;
      animate();
    },
    [animate],
  );
  /** Step forwards/backwards — loops forever. */
  const step = useCallback((delta: number) => setTarget(Math.round(motion.current.target) + delta), [setTarget]);
  /** Bring division `i` to the centre by the shortest way round. */
  const goToCard = useCallback(
    (i: number) => {
      const from = Math.round(motion.current.target);
      setTarget(from + ringDist(i - from, n));
    },
    [n, setTarget],
  );

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      motion.current.reduced = mq.matches;
      setReduced(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Initial paint + cleanup
  useEffect(() => {
    const m = motion.current;
    paint();
    return () => cancelAnimationFrame(m.raf);
  }, [paint]);

  // Only auto-advance while the carousel is on screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || holding || !visible || reduced) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible" && !drag.current) step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, holding, visible, reduced, step]);

  // ---- Pointer drag / swipe (vertical gestures are left to the browser: touch-action: pan-y)
  const stepPx = () => {
    const w = cardRefs.current[0]?.offsetWidth ?? 300;
    return w * STEP;
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, start: motion.current.target, t: performance.now(), moved: false, axis: null };
    if (e.pointerType !== "mouse") setHolding(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const g = drag.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.axis && Math.hypot(dx, dy) > 6) {
      g.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (g.axis === "x") (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (g.axis !== "x") return; // vertical intent: let the page scroll
    g.moved = true;
    setTarget(g.start - dx / stepPx());
  };
  const endDrag = (e: React.PointerEvent) => {
    const g = drag.current;
    if (!g || g.id !== e.pointerId) return;
    drag.current = null;
    if (e.pointerType !== "mouse") setHolding(false);
    if (!g.moved) return;
    suppressClick.current = true;
    const dx = e.clientX - g.x;
    const velocity = dx / Math.max(performance.now() - g.t, 1); // px per ms
    const dragged = -dx / stepPx();
    // A quick flick or a drag past 20% of a card moves at least one card.
    let delta = Math.round(dragged);
    if (delta === 0 && (Math.abs(velocity) > 0.35 || Math.abs(dragged) > 0.2)) delta = dx < 0 ? 1 : -1;
    setTarget(Math.round(g.start) + delta);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <section className="py-24 sm:py-32" aria-labelledby="divisions-title" aria-roledescription="carousel">
      <Container>{heading}</Container>

      <div
        ref={stageRef}
        className="relative mt-12 h-[clamp(380px,62svh,500px)] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:mt-14"
        style={{ "--card-w": "min(78vw, 440px)", "--step": `calc(var(--card-w) * ${STEP})` } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHolding(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHolding(false)}
        onFocusCapture={() => setHolding(true)}
        onBlurCapture={() => setHolding(false)}
        onKeyDown={onKeyDown}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            suppressClick.current = false;
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <ul className="absolute inset-0 overflow-hidden" aria-label="Core divisions">
          {divisions.map((d, i) => {
            const Glyph = divisionGlyph[d.slug];
            const s = cardStyle(ringDist(i, n), n);
            return (
              <li
                key={d.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${d.name}`}
                data-state={i === 0 ? "active" : "side"}
                className="absolute top-1/2 left-1/2 h-[calc(100%-16px)] w-(--card-w) will-change-transform"
                style={{ transform: s.transform, filter: s.filter, opacity: s.opacity, zIndex: Number(s.zIndex), pointerEvents: s.pointerEvents }}
                onClickCapture={(e) => {
                  // A tap on a side card brings it to the centre instead of navigating.
                  if (activeRef.current !== i) {
                    e.preventDefault();
                    goToCard(i);
                  }
                }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-ink p-6 text-paper shadow-[0_30px_60px_-30px_rgb(10_62_35/0.6)] sm:p-8">
                  <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(10_62_35)_0%,transparent_60%),radial-gradient(90%_60%_at_0%_100%,rgb(27_53_39)_0%,transparent_70%)]" />
                  <div aria-hidden="true" className="bg-meridian-dark absolute inset-0 opacity-60" />
                  <div className="relative flex items-start justify-between">
                    <Glyph size={28} className="text-signal-bright" />
                    <span className="font-mono text-xs text-mist">{d.number}</span>
                  </div>
                  <div className="relative mt-auto">
                    <h3 className="font-heading text-[clamp(1.4rem,5.6vw,1.75rem)] leading-tight font-bold">{d.short}</h3>
                    <p className="mt-2 text-[0.95rem] leading-snug text-paper/80 sm:mt-3 sm:text-base sm:leading-relaxed">{d.summary}</p>
                    <Link
                      href={`/services#${d.slug}`}
                      draggable={false}
                      onFocus={() => {
                        if (activeRef.current !== i) goToCard(i);
                      }}
                      className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-paper/60 transition-colors duration-(--duration-base) after:absolute after:inset-0 hover:border-paper hover:bg-paper hover:text-ink sm:mt-6 sm:h-14 sm:w-14"
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

      <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous division"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-[background-color,border-color,transform] duration-(--duration-fast) hover:border-ink/40 active:scale-95"
        >
          <ArrowRight size={18} className="rotate-180" />
        </button>

        <div className="flex gap-0.5" role="group" aria-label="Choose division">
          {divisions.map((d, i) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => goToCard(i)}
              aria-label={`Show ${d.short}`}
              aria-current={active === i ? "true" : undefined}
              className="flex h-11 min-w-12 items-center justify-center"
            >
              <span className="relative block h-[3px] w-10 overflow-hidden rounded-full bg-ink/15 sm:w-12">
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

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next division"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-[background-color,border-color,transform] duration-(--duration-fast) hover:border-ink/40 active:scale-95"
        >
          <ArrowRight size={18} />
        </button>

        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play automatic rotation" : "Pause automatic rotation"}
            className={cn(
              "ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink/60 transition-colors duration-(--duration-fast) hover:text-ink",
            )}
          >
            {paused ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>
      {/* Announce only user-driven changes; automatic rotation stays silent. */}
      <p className="sr-only" aria-live={paused || holding || reduced ? "polite" : "off"}>
        Showing {active + 1} of {n}: {divisions[active]?.name}
      </p>
    </section>
  );
}
