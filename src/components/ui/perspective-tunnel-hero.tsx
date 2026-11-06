"use client";

/**
 * Perspective Tunnel Hero
 *
 * From 21st.dev ("perspective-tunnel-hero"), integrated into the GetNorth codebase.
 * The visual design, 3D maths and spring settings are unchanged. Changes:
 *
 * - Never traps page scrolling: wheel/touch/keys drive the tunnel only while there is
 *   tunnel left to travel in that direction AND the hero is ≥85% on screen; at either
 *   end the gesture passes through and the page scrolls normally.
 * - Touch drag and keyboard (↑ ↓ PageUp PageDown, when focused) support.
 * - Sizes itself from its own container (ResizeObserver), not the window, so it works
 *   inside narrower layouts; `w-full` instead of `w-screen` (no horizontal overflow).
 * - prefers-reduced-motion: shows a static mid-tunnel frame, captures no input.
 * - Optional props for images and copy (defaults keep the original text);
 *   configurable heading level so pages keep a single <h1>.
 * - next/image for the photos (requires images.unsplash.com in next.config remotePatterns).
 * - `trigger="scroll"`: progress follows the page's normal scroll position as the section
 *   passes through the viewport (useScroll) — no input is captured at all.
 * - Restyled to the GetNorth design system (deep green, sage accent) instead of indigo/neutral,
 *   and no `dark:` variants (the site has a single light theme with dark sections).
 */
import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TunnelImage {
    src: string;
    title: string;
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const DEFAULT_TUNNEL_IMAGES: TunnelImage[] = [
    { src: unsplash("photo-1497366216548-37526070297c"), title: "Workspace" },
    { src: unsplash("photo-1522071820081-009f0129c71c"), title: "Collaboration" },
    { src: unsplash("photo-1460925895917-afdab827c52f"), title: "Analytics" },
    { src: unsplash("photo-1677442136019-21780ecad995"), title: "Intelligence" },
    { src: unsplash("photo-1551434678-e076c223a692"), title: "Strategy" },
    { src: unsplash("photo-1498050108023-c5249f4df085"), title: "Engineering" },
    { src: unsplash("photo-1557804506-669a67965ba0"), title: "Planning" },
    { src: unsplash("photo-1519389950473-47ba0277781c"), title: "Teamwork" },
    { src: unsplash("photo-1550751827-4bd374c3f58b"), title: "Security" },
];

interface TunnelCardData {
    item: TunnelImage;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

function buildCards(images: TunnelImage[]): TunnelCardData[] {
    return images.map((item, i) => {
        const goldenAngle = i * 137.5 * (Math.PI / 180);
        return {
            item,
            angleCos: Math.cos(goldenAngle),
            angleSin: Math.sin(goldenAngle),
            radiusFactorX: 0.28 + (i % 3) * 0.08,
            radiusFactorY: 0.26 + (i % 2) * 0.09,
            rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
            index: i,
        };
    });
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };
/** Tunnel progress per pixel of wheel/touch travel. */
const SPEED = 0.0008;
/** Minimum share of the hero that must be visible before it captures scrolling. */
const MIN_VISIBLE = 0.85;
/** Static frame shown with prefers-reduced-motion. */
const REDUCED_PROGRESS = 0.4;

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(130, Math.min(180, stage.width * 0.38))
        : Math.max(180, Math.min(270, stage.width * 0.18));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform([z, pointer.x, pointer.y], ([currZ, px, py]: number[]) => {
        const offsetX = baseX - px * panStrength;
        const offsetY = baseY - py * panStrength;
        return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    });

    return (
        <motion.div
            style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
            className="pointer-events-auto absolute top-1/2 left-1/2 aspect-[4/5] select-none will-change-transform"
            data-tunnel-card
        >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-ink-3 shadow-2xl ring-1 shadow-black/60 ring-paper/15 transition-all duration-500 hover:shadow-signal/40 hover:ring-signal-bright/70">
                <Image
                    src={card.item.src}
                    alt={card.item.title}
                    fill
                    sizes={`${Math.round(cardWidth)}px`}
                    draggable={false}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-4 sm:p-5">
                    <span className="font-mono text-xs tracking-widest text-paper uppercase drop-shadow-md sm:text-sm">
                        {card.item.title}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    images?: TunnelImage[];
    eyebrow?: string;
    title?: ReactNode;
    description?: ReactNode;
    prompt?: string;
    /** Use "h2" when the page already has an <h1>. */
    headingLevel?: "h1" | "h2";
    /**
     * "wheel" (default, original behaviour): wheel/touch/keys fly the tunnel while the hero is
     * on screen, then release to the page. "scroll": follows normal page scrolling; captures nothing.
     */
    trigger?: "wheel" | "scroll";
    /** Small note shown in the top-left corner, clear of the fixed site header (e.g. "Illustrative imagery"). */
    note?: ReactNode;
    /** Extra classes for the heading, e.g. a smaller size for longer titles. */
    titleClassName?: string;
    className?: string;
}

export default function PerspectiveTunnelHero({
    images = DEFAULT_TUNNEL_IMAGES,
    eyebrow = "Warp Drive Sequence",
    title = (
        <>
            INTO THE
            <br />
            ETHER.
        </>
    ),
    description = "Scroll your trackpad or mouse wheel to fly through the spatial 3D corridor.",
    prompt = "Scroll to Explore",
    headingLevel = "h1",
    trigger = "wheel",
    note,
    titleClassName,
    className,
}: PerspectiveTunnelHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const cards = useMemo(() => buildCards(images), [images]);
    const Heading = headingLevel === "h1" ? motion.h1 : motion.h2;

    const [stage, setStage] = useState<StageDimensions>({ width: 1440, height: 900, isMobile: false });

    // Size from the component's own box, so it also works inside narrower containers.
    useEffect(() => {
        const el = containerRef.current;
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

    const rawProgress = useMotionValue(0);
    const smoothProgress = useSpring(rawProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });

    // Reduced motion: a still, readable mid-tunnel frame.
    useEffect(() => {
        if (reduce) {
            rawProgress.set(REDUCED_PROGRESS);
            smoothProgress.jump(REDUCED_PROGRESS);
        }
    }, [reduce, rawProgress, smoothProgress]);

    // trigger="scroll": map the section's journey through the viewport to tunnel progress.
    // 0 → section top reaches the bottom of the screen; 1 → section bottom reaches the top.
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const fromScroll = (v: number) => Math.min(1, Math.max(0, (v - 0.15) / 0.7));
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (trigger === "scroll" && !reduce) rawProgress.set(fromScroll(v));
    });
    useEffect(() => {
        if (trigger === "scroll" && !reduce) {
            const v = fromScroll(scrollYProgress.get());
            rawProgress.set(v);
            smoothProgress.jump(v);
        }
    }, [trigger, reduce, scrollYProgress, rawProgress, smoothProgress]);

    // Wheel / touch / keyboard drive the tunnel — but never trap the page.
    useEffect(() => {
        const el = containerRef.current;
        if (!el || reduce || trigger !== "wheel") return;

        const mostlyVisible = () => {
            const r = el.getBoundingClientRect();
            const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
            return visible / Math.min(r.height, window.innerHeight) >= MIN_VISIBLE;
        };

        /** Advance by `deltaPx`; returns true if the tunnel consumed the gesture. */
        const advance = (deltaPx: number) => {
            const current = rawProgress.get();
            const atStart = current <= 0 && deltaPx < 0;
            const atEnd = current >= 1 && deltaPx > 0;
            if (atStart || atEnd || deltaPx === 0 || !mostlyVisible()) return false;
            rawProgress.set(Math.min(1, Math.max(0, current + deltaPx * SPEED)));
            return true;
        };

        const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return; // pinch-zoom
            const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
            if (advance(px)) e.preventDefault();
        };

        let lastY: number | null = null;
        const onTouchStart = (e: TouchEvent) => {
            lastY = e.touches[0]?.clientY ?? null;
        };
        const onTouchMove = (e: TouchEvent) => {
            const y = e.touches[0]?.clientY;
            if (lastY === null || y === undefined) return;
            const dy = lastY - y; // finger up = forward
            lastY = y;
            if (advance(dy * 1.6) && e.cancelable) e.preventDefault();
        };
        const onTouchEnd = () => {
            lastY = null;
        };

        const onKey = (e: KeyboardEvent) => {
            const step = { ArrowDown: 120, PageDown: 600, ArrowUp: -120, PageUp: -600 }[e.key];
            if (step !== undefined && advance(step)) e.preventDefault();
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        el.addEventListener("keydown", onKey);
        return () => {
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
            el.removeEventListener("keydown", onKey);
        };
    }, [rawProgress, reduce, trigger]);

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

    return (
        <div
            ref={containerRef}
            tabIndex={reduce || trigger !== "wheel" ? undefined : 0}
            role="region"
            aria-roledescription="3D gallery"
            aria-label={typeof eyebrow === "string" ? eyebrow : "Gallery"}
            data-progress-source
            className={cn(
                "relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink text-paper select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright focus-visible:ring-inset",
                className,
            )}
            style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
        >
            {/* Immersive Background Grid & Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(159_208_170/0.28)_1px,transparent_1px)] [background-size:28px_28px] opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(10_62_35/0.9)_0%,transparent_72%)]" />

            {note && (
                <p className="absolute top-20 left-4 z-30 rounded-full sm:top-24 sm:left-7 border border-paper/20 bg-ink/70 px-3 py-1.5 text-xs text-paper/85 backdrop-blur-sm ">
                    {note}
                </p>
            )}

            {/* Depth Ring Guides */}
            <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-signal-bright/20" />
            <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-paper/10" />

            {/* Central Anchor Typography */}
            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="pointer-events-none z-0 flex max-w-xl flex-col items-center px-6 text-center"
            >
                <p className="mb-4 font-mono text-xs tracking-[0.4em] text-signal-bright uppercase">{eyebrow}</p>
                <Heading className={cn("font-heading bg-gradient-to-b from-paper via-paper to-paper/40 bg-clip-text pb-[0.08em] text-5xl leading-[0.95] font-extrabold tracking-tighter text-transparent sm:text-7xl md:text-8xl", titleClassName)}>
                    {title}
                </Heading>
                <p className="mt-4 max-w-[36ch] text-sm text-mist sm:text-base">{description}</p>
            </motion.div>

            {/* Scroll Prompt */}
            <motion.div
                style={{ opacity: promptOpacity }}
                className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 font-mono text-xs tracking-[0.3em] text-mist uppercase"
            >
                <span>{prompt}</span>
                <div className="h-6 w-px bg-gradient-to-b from-signal-bright to-transparent" />
            </motion.div>

            {/* 3D Z-Space Plane */}
            <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                {cards.map((card) => (
                    <TunnelCard
                        key={card.index}
                        card={card}
                        progress={smoothProgress}
                        pointer={pointer}
                        total={cards.length}
                        stage={stage}
                    />
                ))}
            </div>
        </div>
    );
}
