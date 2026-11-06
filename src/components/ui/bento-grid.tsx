/**
 * Bento Grid
 *
 * Adapted from "Bento Grid" by Kokonut UI (Dorian Baffier), MIT License,
 * via 21st.dev — https://21st.dev/@kokonutd/components/bento-grid
 *
 * Changes for GetNorth:
 * - GetNorth design tokens (paper/ink/brand green) instead of gray/white/black
 * - Each tile is a single accessible link (whole-card hit area, visible focus ring)
 * - Optional "feature" tile rendered on brand green for hierarchy
 * - Hover lift disabled for reduced motion; no hover-only information
 *   (the CTA label is always visible on touch screens)
 * - Tile titles are <h3> so screen-reader heading navigation works
 * - Server component: no client JavaScript required
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/icons";

export interface BentoItem {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  /** Small label in the top-right corner, e.g. the division name. */
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  /** Spans two of three columns on desktop. */
  colSpan?: 1 | 2;
  /** Render as the highlighted brand-green tile. */
  feature?: boolean;
}

export function BentoGrid({ items, className }: { items: BentoItem[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-4 md:grid-cols-3", className)}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(item.colSpan === 2 && "md:col-span-2")}
          data-reveal
          style={{ "--reveal-delay": `${(index % 3) * 60}ms` } as React.CSSProperties}
        >
          <Link
            href={item.href}
            className={cn(
              "group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-(--radius-card) border p-6 sm:p-7",
              "transition-[transform,box-shadow,border-color,background-color] duration-(--duration-base) ease-(--ease-north)",
              "hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) active:translate-y-0 motion-reduce:hover:translate-y-0",
              item.feature
                ? "border-signal bg-signal text-paper"
                : "border-ink/10 bg-surface-raised text-ink shadow-(--shadow-card) hover:border-ink/20",
            )}
          >
            {/* Dot texture, revealed on hover (persistent on the feature tile) */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 bg-[length:6px_6px] transition-opacity duration-(--duration-base)",
                item.feature
                  ? "bg-[radial-gradient(circle_at_center,rgb(245_243_238/0.08)_1px,transparent_1px)] opacity-100"
                  : "bg-[radial-gradient(circle_at_center,rgb(10_62_35/0.07)_1px,transparent_1px)] opacity-0 group-hover:opacity-100",
              )}
            />

            <span className="relative flex items-center justify-between gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-(--radius-control) transition-colors duration-(--duration-base)",
                  item.feature
                    ? "bg-paper/10 text-signal-bright"
                    : "bg-signal/[0.07] text-signal group-hover:bg-signal group-hover:text-paper",
                )}
              >
                {item.icon}
              </span>
              {item.status && (
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    item.feature ? "bg-paper/10 text-paper" : "bg-ink/[0.05] text-ink/75",
                  )}
                >
                  {item.status}
                </span>
              )}
            </span>

            <span className="relative mt-8 block">
              <h3 className="font-heading block text-xl font-bold tracking-tight">
                {item.title}
                {item.meta && (
                  <span className={cn("ml-2 text-sm font-normal", item.feature ? "text-mist" : "text-stone")}>
                    {item.meta}
                  </span>
                )}
              </h3>
              <span className={cn("mt-2 block leading-relaxed", item.feature ? "text-paper/80" : "text-stone")}>
                {item.description}
              </span>
            </span>

            <span className="relative mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
              <span className="flex flex-wrap gap-1.5">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-md px-2 py-1 text-xs",
                      item.feature ? "bg-paper/10 text-paper/85" : "bg-ink/[0.05] text-ink/70",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-semibold",
                  item.feature ? "text-paper" : "text-signal",
                )}
              >
                {item.cta ?? "Explore"}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-(--duration-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
