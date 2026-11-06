# GetNorth Design System — MASTER

Global source of truth for the GetNorth Media & AI Solutions website.
Page-specific overrides live in `pages/<page>.md` and take precedence over this file.

Tokens are implemented in `src/app/globals.css` (`@theme`). Use the token, never a raw hex value, in components.

---

## 1. Direction

| | |
|---|---|
| **Product type** | B2B service + marketing/technology agency (hybrid) |
| **Style** | Minimalism & Swiss Style + Accessible & Ethical, with Bento Grid showcases and micro-interactions |
| **Skill output** | Pattern *Trust & Authority + Conversion*, style *Accessible & Ethical*, typography *Plus Jakarta Sans*. Full output: `skill-recommendation.md` |
| **Primary CTA** | "Get a quote" (header, hero, mobile action bar); "Request a quote" in CTA bands |
| **Landing pattern** | Feature-Rich Showcase + Trust: Hero (value prop) → Overview → Division cards → Industries → Why us → Process → **What we measure (ROI)** → Bento features → **Case studies** → CTA |
| **Skill must-haves (B2B Service / Marketing Agency)** | Case studies (honest placeholders until approved) · ROI messaging (metrics we report, never invented results) · visible credentials |
| **Personality** | Calm, credible, direct. Natural forest green; generous space; no hype |
| **Brand line** | Media. Marketing. Technology. AI. |

Source: the `ui-ux-pro-max` skill's data (products: *B2B Service*, *Marketing Agency*; styles: *Minimalism & Swiss Style*, *Accessible & Ethical*, *Bento Box Grid*, *Micro-interactions*; landing: *Feature-Rich Showcase*, *Bento Grid Showcase*). Brand colour comes from the official logo, not a generic palette.

**Avoid:** brutalism, neon/glow gradients, glassmorphism-heavy UI, emoji icons, fake testimonials, statistics or client logos, auto-playing media without controls.

---

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `signal` / `accent` | `#0A3E23` | Brand forest green (sampled from the logo). Primary buttons, highlights, icons |
| `signal-hover` | `#072E1A` | Hover/pressed state of brand green |
| `signal-bright` / `accent-on-dark` | `#9FD0AA` | Sage accent text/icons on dark green surfaces |
| `ink` / `text` | `#0F1F17` | Body text; dark section background |
| `ink-2`, `ink-3` | `#13291E`, `#1B3527` | Raised surfaces on dark sections |
| `paper` / `surface` | `#F5F3EE` | Page background |
| `paper-2` / `surface-muted` | `#ECE9E1` | Alternating sections |
| `paper-3` | `#DFDBD0` | Placeholders, wells |
| `surface-raised` | `#FFFFFF` | Cards on paper |
| `stone` / `text-muted` | `#5A645E` | Secondary text on light (5.8:1) |
| `mist` / `text-inverse-muted` | `#A9B8AE` | Secondary text on dark (≥ 6:1 on green) |
| `whatsapp` | `#25D366` | WhatsApp mark only |
| `danger` / `danger-surface` | `#B42318` / `#FDF0EE` | Form errors only (6.6:1 on paper). Never use brand green for errors |

**Contrast rules:** body text ≥ 4.5:1 in every context. Never put brand green text or buttons on `ink`/`signal` backgrounds. On dark sections, use the `light` button variant and `signal-bright` accents.

---

## 3. Typography

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Display (H1) | Plus Jakarta Sans | `clamp(2.4rem, 6.4vw, 5.25rem)` (home: up to 6.6rem) | 800 | `.font-heading`, tracking −0.035em, leading 0.92–0.98 |
| H2 | Plus Jakarta Sans | `clamp(1.9rem, 4.2vw, 3.25rem)` | 700 | leading 1.04 |
| H3 | Plus Jakarta Sans | 1.25–1.75rem | 700 | |
| Body | Plus Jakarta Sans | 1rem–1.25rem | 400 | leading 1.6–1.7, max ~65ch |
| Eyebrow | Plus Jakarta Sans | 0.72rem (≥ 12px) | 600 | Uppercase, tracking 0.28em, preceded by a 24px rule |
| Meta / numbers | Geist Mono | 0.75rem (≥ 12px) | 400–500 | Indices, coordinates |

Font choice comes from the ui-ux-pro-max `--design-system` output for "B2B service corporate consulting" (see `skill-recommendation.md`). Headline wrapping uses `max-width` in `ch` plus `text-wrap: balance`, never hard-coded `<br>`.

Minimum rendered text size: **12px**. Base body: **16px**. Fonts load with `display: swap`.

---

## 4. Spacing, radius, elevation

- **Spacing:** 4/8px rhythm. Section padding `py-24 sm:py-32` (96/128px); card padding 24–40px; grid gaps 16–20px.
- **Container:** max 1280px, gutters 20px (mobile) / 32px (≥ 640px).
- **Radius:** `--radius-chip` (pill), `--radius-control` 12px, `--radius-card` 20px, `--radius-panel` 28px.
- **Elevation:** `--shadow-card` (resting), `--shadow-card-hover` (hover lift). Shadows are soft and green-tinted.

- **Z-index scale:** content `0` · sticky sub-nav `30` · floating actions / mobile action bar `40` · header & mobile menu `50` · skip link `60`.

---

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Press feedback, colour changes |
| `--duration-base` | 250ms | Hover lift, state changes |
| `--duration-slow` | 600–800ms | Scroll reveal entrances |
| `--ease-north` | `cubic-bezier(0.22, 1, 0.36, 1)` | All UI motion |

- Animate `transform` and `opacity` only (never width/height/top).
- Buttons: `active:scale-[0.98]`.
- Scroll reveal follows the skill's *Stagger List* preset: `translateY(16px) scale(0.96)` → none, 450ms, back-out `cubic-bezier(0.34, 1.4, 0.64, 1)`, **60ms** stagger.
- Indicators (carousel dots) animate `transform: scaleX`, never `width`.
- `prefers-reduced-motion`: reveals render final state, rotators stop, hover lifts are disabled.
- Auto-rotating content (Word Rotate) has a visible pause/play button, pauses on hover and keyboard focus, and stops when the tab is hidden.
- Fixed bars never hide focus: `scroll-padding-top` for the header and `scroll-padding-bottom` for the mobile action bar.

---

## 6. Interaction & accessibility (non-negotiable)

- Touch targets ≥ **44×44px** on touch layouts (`--spacing-touch`, `min-h-11`), ≥ 8px apart.
- Visible focus ring: 2px brand green, 3px offset.
- Skip link, semantic landmarks, sequential headings, `aria-current` for active nav.
- Icon-only controls have `aria-label`; decorative icons are `aria-hidden`.
- Forms are low-friction: required fields first; optional fields (company, industry, budget, timeline) sit in an "Add more details" disclosure that auto-opens when pre-filled or in error.
- Forms: visible labels, helper text for complex fields, inline errors linked with `aria-describedby`. One error → focus that field; several → focus a linked **error summary** at the top (inline errors are kept).
- After client-side navigation, focus moves to `<main>` (`RouteFocus`).
- Carousels/swipe: always paired with button controls (dots) — never swipe-only.
- No horizontal page scroll at 320px+.

---

## 7. Mobile

- **Mobile action bar** (< 768px): fixed bottom bar with Call / WhatsApp / Enquire, 56px targets, `env(safe-area-inset-bottom)` padding; body gets matching bottom padding so content is never hidden.
- `viewport-fit=cover` for safe areas; the header is 72px and sticky.
- Full-screen menu with focus trap, Esc to close, and route-change close.
- Division cards: endless carousel driven by swipe/drag and buttons only — vertical page scrolling is never hijacked. Bento tiles stack to one column.
- Test widths: 320, 375, 390, 768, 1024, 1440.

---

## 8. Components

| Component | File | Notes |
|---|---|---|
| Button / ButtonLink | `src/components/ui/index.tsx` | Variants: `primary`, `dark`, `light`, `outline`, `outline-light`; min-height 48px |
| Eyebrow, SectionHeading, TextLink, PlaceholderBadge | `src/components/ui/index.tsx` | |
| Logo, LogoMark, LogoStacked | `src/components/logo.tsx` | Official logo assets only (`src/assets/brand`) |
| SiteHeader / mobile menu | `src/components/site-header.tsx` | Light variant over dark heroes |
| PageHero, CtaBand, WhatsAppFloat, MobileActionBar | `src/components/sections.tsx` | |
| LoopCardCarousel | `src/components/loop-card-carousel.tsx` | Endless ring carousel: swipe/drag, prev/next, indicators, ←/→, auto-advance with pause. Never captures page scroll |
| **BentoGrid** | `src/components/ui/bento-grid.tsx` | From 21st.dev — Kokonut UI (MIT), adapted to tokens and a11y |
| **WordRotate** | `src/components/ui/word-rotate.tsx` | From 21st.dev — Magic UI (MIT), CSS motion, pause control |
| Compass | `src/components/compass.tsx` | Hero illustration |
| EnquiryForm | `src/app/contact/enquiry-form.tsx` | Client + server validation |

| PerspectiveTunnelHero | `src/components/ui/perspective-tunnel-hero.tsx` | From 21st.dev; framer-motion 3D tunnel. Wheel/touch/keys drive it only while it is ≥85% visible and has travel left, then release to page scroll. Preview: `/preview/perspective-tunnel` |

Third-party components live in `src/components/ui/` (shadcn convention, see `components.json`) with their source and licence noted at the top of each file.

---

## 9. Content rules

- Never fabricate clients, testimonials, statistics, awards or results.
- Portfolio items stay marked "Sample placeholder" until real, approved case studies exist.
- Photography: none yet. When supplied, use WebP/AVIF via `next/image`, with declared dimensions and `loading="lazy"` below the fold.
