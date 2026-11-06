"use client";

/**
 * WorkTunnel — the immersive opening of the Our Work page.
 *
 * A full-screen 3D photo tunnel, pinned while the visitor scrolls through it: scrolling down
 * flies forward through the photos; scrolling up flies back. After the flight the page simply
 * continues to the project grid (scrolling is never captured or blocked).
 *
 * Built on the Perspective Tunnel Hero from 21st.dev, redesigned with the ui-ux-pro-max skill:
 * - Pre-populated tunnel: cards are already in flight on the first and last frame (never empty).
 * - Title and outro sit on their own layer above the cards (perspective lives on the card plane,
 *   so 3D depth-sorting can't pull cards in front of the text); readable vignette behind text.
 * - Escape route: "Skip to projects" is always available; thin progress bar shows position.
 * - Motion is tied to scroll only (no autoplay); spring-smoothed; transform/opacity only.
 * - Reduced motion: no pinning, a still frame with the call to action.
 * - A photo that fails to load hides its card instead of showing an empty box.
 */
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { TunnelImage } from "@/components/ui/perspective-tunnel-hero";
import { ArrowRight } from "./icons";
import { buttonClass } from "./ui";

/** Extra scroll distance for the flight, in small-viewport heights. */
const RUNWAY_SVH = 170;
/** Share of the flight each card is visible for. */
const CARD_SPAN = 0.5;
/** Still frame used for prefers-reduced-motion. */
const STILL = 0.42;

type Stage = { width: number; height: number; isMobile: boolean };

type Card = { item: TunnelImage; index: number; start: number; cos: number; sin: number; rx: number; ry: number; rot: number };

function buildCards(images: TunnelImage[]): Card[] {
  const n = images.length;
  return images.map((item, i) => {
    const a = i * 137.5 * (Math.PI / 180); // golden angle — even spread round the tunnel
    return {
      item,
      index: i,
      // Spread start times from before 0 to past 1-span, so the tunnel is full at both ends.
      start: -0.32 + (i * (1 + 0.32 - CARD_SPAN + 0.28)) / Math.max(n - 1, 1),
      cos: Math.cos(a),
      sin: Math.sin(a),
      rx: 0.3 + (i % 3) * 0.075,
      ry: 0.27 + (i % 2) * 0.09,
      rot: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    };
  });
}

function usePointerParallax(enabled: boolean) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useSpring(rx, { stiffness: 60, damping: 25, mass: 0.5 });
  const y = useSpring(ry, { stiffness: 60, damping: 25, mass: 0.5 });
  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rx.set((e.clientX / window.innerWidth - 0.5) * 2);
      ry.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rx, ry]);
  return { x, y };
}

function TunnelCard({
  card,
  progress,
  pointer,
  stage,
}: {
  card: Card;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  stage: Stage;
}) {
  const [failed, setFailed] = useState(false);
  const local = useTransform(progress, [card.start, card.start + CARD_SPAN], [0, 1]);
  const z = useTransform(local, [0, 1], stage.isMobile ? [-1300, 380] : [-1800, 520]);
  const opacity = useTransform(local, [0, 0.16, 0.8, 0.96], [0, 1, 1, 0]);
  const width = stage.isMobile ? Math.max(130, Math.min(176, stage.width * 0.38)) : Math.max(190, Math.min(280, stage.width * 0.17));
  const bx = card.cos * stage.width * card.rx;
  const by = card.sin * stage.height * card.ry;
  const pan = stage.isMobile ? 0 : 45;
  const transform = useTransform([z, pointer.x, pointer.y], ([cz, px, py]: number[]) =>
    `translate3d(calc(-50% + ${bx - px * pan}px), calc(-50% + ${by - py * pan}px), ${cz}px) rotateZ(${card.rot}deg)`,
  );
  if (failed) return null;
  return (
    <motion.div
      style={{ width, transform, opacity, zIndex: card.index + 1 }}
      className="absolute top-1/2 left-1/2 aspect-[4/5] select-none will-change-transform"
      data-tunnel-card
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-ink-3 shadow-2xl ring-1 shadow-black/60 ring-paper/15">
        <Image
          src={card.item.src}
          alt=""
          fill
          sizes={`${Math.round(width * 2)}px`}
          draggable={false}
          onError={() => setFailed(true)}
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-4">
          <span className="font-mono text-xs tracking-widest text-paper uppercase drop-shadow-md">{card.item.title}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkTunnel({
  images,
  note,
  skipHref = "#projects",
  outroTitle,
  outroBody,
}: {
  images: TunnelImage[];
  note?: ReactNode;
  skipHref?: string;
  outroTitle: ReactNode;
  outroBody: ReactNode;
}) {
  const runwayRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const cards = useMemo(() => buildCards(images), [images]);
  const [stage, setStage] = useState<Stage>({ width: 1440, height: 900, isMobile: false });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setStage({ width: r.width, height: r.height, isMobile: r.width < 768 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll through the runway → 0…1, spring-smoothed so wheel notches glide.
  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ["start start", "end end"] });
  const raw = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) raw.set(v);
  });
  const progress = useSpring(raw, { stiffness: 90, damping: 26, restDelta: 0.0005 });
  useEffect(() => {
    const v = reduce ? STILL : scrollYProgress.get();
    raw.set(v);
    progress.jump(v);
  }, [reduce, raw, progress, scrollYProgress]);

  const pointer = usePointerParallax(!reduce);

  // Narrative: title → flight → outro call to action.
  const titleOpacity = useTransform(progress, [0, 0.16, 0.3], [1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.3], [0, -60]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const outroOpacity = useTransform(progress, [0.72, 0.86], [0, 1]);
  const outroY = useTransform(progress, [0.72, 0.86], [40, 0]);
  const outroVisibility = useTransform(outroOpacity, (o) => (o > 0.02 ? "visible" : "hidden"));
  const titleVisibility = useTransform(titleOpacity, (o) => (o > 0.02 ? "visible" : "hidden"));
  const bar = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      ref={runwayRef}
      aria-labelledby="work-title"
      className="relative bg-ink"
      style={{ height: reduce ? "100svh" : `calc(100svh + ${RUNWAY_SVH}svh)` }}
    >
      <div ref={stageRef} className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden text-paper">
        {/* Atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(159_208_170/0.25)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(10_62_35)_0%,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-signal-bright/20" />
        <div aria-hidden="true" className="pointer-events-none absolute h-[78vmin] w-[78vmin] rounded-full border border-dashed border-paper/10" />

        {/* 3D card plane (perspective lives here so text layers stay on top) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
        >
          {cards.map((c) => (
            <TunnelCard key={c.index} card={c} progress={progress} pointer={pointer} stage={stage} />
          ))}
        </div>

        {/* Readability vignette behind the text */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_42%_30%_at_50%_50%,rgb(15_31_23/0.82)_0%,rgb(15_31_23/0.4)_55%,transparent_100%)]" />

        {/* Opening title */}
        <motion.div
          style={reduce ? undefined : { opacity: titleOpacity, y: titleY, visibility: titleVisibility }}
          className="relative z-30 flex max-w-3xl flex-col items-center px-6 text-center"
        >
          <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-signal-bright uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-signal-bright" />
            Our work
          </p>
          <h1 id="work-title" className="font-heading mt-5 text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance drop-shadow-[0_4px_24px_rgb(0_0_0/0.5)]">
            Work that points <span className="text-signal-bright">somewhere.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">
            Brand, marketing, AI and web projects from one in-house team. Case studies are being prepared with our
            clients&apos; approval.
          </p>
          {reduce && (
            <a href={skipHref} className={buttonClass("light", "mt-8")}>
              See the projects <ArrowRight size={18} className="rotate-90" />
            </a>
          )}
        </motion.div>

        {/* Closing call to action */}
        <motion.div
          hidden={reduce}
          style={{ opacity: outroOpacity, y: outroY, visibility: outroVisibility }}
          className="absolute inset-x-0 z-30 flex flex-col items-center px-6 text-center"
        >
          <h2 className="font-heading text-[clamp(2rem,5.5vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance drop-shadow-[0_4px_24px_rgb(0_0_0/0.5)]">
            {outroTitle}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/85 sm:text-lg">{outroBody}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={skipHref} className={buttonClass("light")}>
              See the projects <ArrowRight size={18} className="rotate-90" />
            </a>
            <Link href="/contact" className={buttonClass("outline-light")}>
              Get a quote
            </Link>
          </div>
        </motion.div>

        {note && (
          <p className="absolute top-20 left-4 z-40 rounded-full border border-paper/20 bg-ink/70 px-3 py-1.5 text-xs text-paper/85 backdrop-blur-sm sm:top-24 sm:left-8">
            {note}
          </p>
        )}

        {/* Scroll hint, skip link and progress */}
        {!reduce && (
          <motion.p
            aria-hidden="true"
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-[calc(7.5rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-2 font-mono text-xs tracking-[0.3em] text-mist uppercase md:bottom-20"
          >
            Scroll to fly through
            <span className="h-6 w-px bg-gradient-to-b from-signal-bright to-transparent" />
          </motion.p>
        )}
        <div className="absolute inset-x-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-40 flex items-center gap-4 sm:inset-x-8 md:bottom-8">
          {/* Skip link on the left: the bottom-right corner belongs to the floating WhatsApp button */}
          <a
            href={skipHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-paper/25 bg-ink/60 px-4 text-sm font-semibold text-paper backdrop-blur-sm transition-colors duration-(--duration-fast) hover:border-paper hover:bg-paper hover:text-ink"
          >
            Skip to projects <ArrowRight size={16} className="rotate-90" />
          </a>
          <div aria-hidden="true" className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/15 md:mr-60">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-signal-bright" />
          </div>
        </div>
      </div>
    </section>
  );
}
