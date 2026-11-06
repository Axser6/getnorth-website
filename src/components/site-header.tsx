"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, telHref, whatsappHref, defaultWhatsAppMessage } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";
import { buttonClass } from "./ui";
import { ArrowRight, Close, Menu, Phone, WhatsApp } from "./icons";

const DARK_HERO_ROUTES = ["/ai-solutions"];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const toggle = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("a, button"),
        );
        const all = toggle ? [toggle, ...focusables] : focusables;
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // Pages whose hero is dark: the transparent header switches to light text.
  const light = !scrolled && !open && DARK_HERO_ROUTES.includes(pathname);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-paper/90 shadow-[0_1px_0_rgb(11_15_20/0.08)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label={`${site.name} — home`} className="inline-flex min-h-11 shrink-0 items-center">
          <Logo tone={light ? "light" : "dark"} className={light ? "text-paper" : undefined} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors",
                    light
                      ? isActive(item.href) ? "text-paper" : "text-paper/75 hover:text-paper"
                      : isActive(item.href) ? "text-ink" : "text-ink/70 hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rotate-45 bg-signal"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium xl:inline-flex",
              light ? "text-paper/85 hover:text-paper" : "text-ink/80 hover:text-ink",
            )}
          >
            <Phone size={16} />
            {site.phone.display}
          </a>
          <span className="hidden sm:block">
            <Link href="/contact" className={buttonClass(light ? "light" : "dark", "min-h-11 px-5 text-sm")}>
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
              light ? "border-paper/25 text-paper" : "border-ink/15",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-ink/10 bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-10 pt-4 sm:px-8">
          <ul className="divide-y divide-ink/10">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-heading text-2xl font-bold"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs font-normal text-stone">
                    {String(i).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={whatsappHref(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              <WhatsApp size={18} /> WhatsApp us
            </a>
            <a href={telHref} className={buttonClass("outline")}>
              <Phone size={18} /> Call {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
