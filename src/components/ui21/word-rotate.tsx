"use client";

/**
 * Word Rotate
 *
 * Adapted from "Word Rotate" by Magic UI (Dillion Verma), MIT License,
 * via 21st.dev — https://21st.dev/@dillionverma/components/word-rotate
 *
 * Changes for GetNorth:
 * - CSS keyframe animation instead of framer-motion (no extra ~35 KB dependency)
 * - Renders a <span> so it can sit inside a heading without nesting headings
 * - Screen readers get the full, static list once (no repeated announcements)
 * - WCAG 2.2.2: visible pause/play control; stops automatically for
 *   prefers-reduced-motion and while the page is hidden
 */
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function WordRotate({
  words,
  duration = 2400,
  className,
  controlClassName,
}: {
  words: string[];
  duration?: number;
  className?: string;
  controlClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const running = !paused && !reducedMotion;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => window.clearInterval(id);
  }, [running, words.length, duration]);

  return (
    <span className="inline-flex items-center gap-3">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="relative block overflow-hidden py-[0.08em] leading-[1.15]">
        <span
          key={words[index]}
          className={cn(
            "block motion-safe:animate-word-in",
            className,
          )}
        >
          {words[index]}
        </span>
      </span>
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play rotating words" : "Pause rotating words"}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center self-center rounded-full border border-ink/15 text-ink/60 transition-colors duration-(--duration-fast) hover:border-ink/40 hover:text-ink",
            controlClassName,
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
    </span>
  );
}
