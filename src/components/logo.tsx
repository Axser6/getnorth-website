import Image from "next/image";
import { cn } from "@/lib/cn";
import markGreen from "@/assets/brand/mark-green.png";
import markLight from "@/assets/brand/mark-light.png";
import wordmarkGreen from "@/assets/brand/wordmark-green.png";
import wordmarkLight from "@/assets/brand/wordmark-light.png";
import logoGreen from "@/assets/brand/logo-green.png";
import logoLight from "@/assets/brand/logo-light.png";

/** The GetNorth symbol (from the official logo). */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Image
      src={tone === "dark" ? markGreen : markLight}
      alt=""
      aria-hidden="true"
      width={96}
      className={cn("h-9 w-auto", className)}
      priority
    />
  );
}

/** Horizontal lockup for the header: symbol + "GETNORTH / MEDIA & AI SOLUTIONS" wordmark. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="h-9 sm:h-10" />
      <Image
        src={tone === "dark" ? wordmarkGreen : wordmarkLight}
        alt="GetNorth Media & AI Solutions"
        width={320}
        className="h-[26px] w-auto sm:h-[29px]"
        priority
      />
    </span>
  );
}

/** Full stacked logo, as supplied by the company. */
export function LogoStacked({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Image
      src={tone === "dark" ? logoGreen : logoLight}
      alt="GetNorth Media & AI Solutions"
      width={400}
      className={cn("h-auto w-40", className)}
    />
  );
}
