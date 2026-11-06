import { cn } from "@/lib/cn";

/** The GetNorth mark: a compass needle — signal red points north. */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const south = tone === "dark" ? "#0b0f14" : "#f4f1ea";
  return (
    <svg viewBox="0 0 32 32" className={cn("h-8 w-8", className)} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="15" fill="none" stroke={south} strokeOpacity="0.25" strokeWidth="1.2" />
      <path d="M16 2.5 21 16H11Z" fill="#e5482b" />
      <path d="M11 16h10l-5 13.5Z" fill={south} />
      <circle cx="16" cy="16" r="1.6" fill={tone === "dark" ? "#f4f1ea" : "#0b0f14"} />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className="font-wide text-[1.05rem] font-extrabold tracking-[0.06em]">GETNORTH</span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.58rem] uppercase tracking-[0.22em]",
            tone === "dark" ? "text-stone" : "text-mist",
          )}
        >
          Media &amp; AI Solutions
        </span>
      </span>
    </span>
  );
}
