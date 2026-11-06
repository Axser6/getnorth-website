import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3.2l1.6 4.2-2.1 1.3a11 11 0 0 0 6.8 6.8l1.3-2.1L20 15.8V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </Base>
);

export const WhatsApp = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.6 20.4 5 16.3A8.5 8.5 0 1 1 8 19.2l-4.4 1.2Z" />
    <path d="M9.2 8.4c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .6.7 1.1 1.6 1.9 2.7 2.5.2.1.4.1.6-.1l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6v.4c0 .4-.2.8-.6 1-.6.3-1.4.5-2.2.2a9.6 9.6 0 0 1-5.5-5.1c-.4-1.1-.2-2.1.6-2.9Z" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Base>
);

export const MapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);

export const Instagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </Base>
);

export const LinkedIn = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6V16" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.2 4L19 7" />
  </Base>
);

export const Plus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Alert = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.3v.1" />
  </Base>
);

/* Division glyphs — simple geometric marks, one per cardinal point. */
export const GlyphMedia = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="13" height="13" rx="1.5" />
    <path d="m16.5 10 4-2.5v9l-4-2.5" />
  </Base>
);
export const GlyphMarketing = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 19h16M6 16l4-5 3.5 3L19 7" />
    <path d="M15 7h4v4" />
  </Base>
);
export const GlyphAI = (p: IconProps) => (
  <Base {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
    <path d="m10 14.5 2-5 2 5M10.7 12.8h2.6" />
  </Base>
);
export const GlyphWeb = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M3 9h18M6 6.8h.1M8.3 6.8h.1M9 13l-2 2 2 2M15 13l2 2-2 2" />
  </Base>
);

export const divisionGlyph: Record<string, (p: IconProps) => React.ReactElement> = {
  "media-creative": GlyphMedia,
  "digital-marketing": GlyphMarketing,
  "ai-automation": GlyphAI,
  "web-technology": GlyphWeb,
};
