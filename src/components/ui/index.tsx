import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "../icons";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.28em]",
        tone === "dark" ? "text-stone" : "text-mist",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("inline-block h-px w-6", tone === "dark" ? "bg-signal" : "bg-signal-bright")} />
      {children}
    </p>
  );
}

type ButtonVariant = "primary" | "dark" | "outline" | "outline-light" | "light";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-signal text-white hover:bg-signal-hover shadow-[0_1px_0_rgb(0_0_0/0.2)]",
  dark: "bg-ink text-paper hover:bg-ink-3",
  light: "bg-paper text-ink hover:bg-white",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

const buttonBase =
  "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold transition-[background-color,color,border-color,transform] duration-(--duration-base) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  arrow = false,
  external = false,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  const cls = cn(buttonBase, variants[variant], className);
  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, variants[variant], className);
}

export function TextLink({
  href,
  children,
  className,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold underline-offset-4 hover:underline",
        tone === "dark" ? "text-ink" : "text-paper",
        className,
      )}
    >
      {children}
      <ArrowRight size={16} className="text-signal transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)} data-reveal>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "font-heading mt-5 text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.04] font-bold",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-6 text-lg leading-relaxed", tone === "dark" ? "text-stone" : "text-mist")}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** A labelled "placeholder" badge — used wherever content is not yet supplied. */
export function PlaceholderBadge({ children = "Sample placeholder" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-signal-ink/60 bg-signal/5 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal-ink">
      {children}
    </span>
  );
}
