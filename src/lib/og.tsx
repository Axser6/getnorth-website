import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Archivo (SIL Open Font License) bundled in /assets/fonts for on-brand OG images. */
async function loadFont(weight: 500 | 800) {
  return readFile(join(process.cwd(), "assets/fonts", `Archivo-${weight}.ttf`));
}

export async function renderOg({ kicker, title }: { kicker: string; title: string }) {
  const [bold, medium] = await Promise.all([loadFont(800), loadFont(500)]);
  const fonts = [
    { name: "Archivo", data: bold, weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: medium, weight: 500 as const, style: "normal" as const },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0b0f14",
          color: "#f4f1ea",
          fontFamily: "Archivo",
          backgroundImage:
            "linear-gradient(to right, rgba(244,241,234,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,241,234,0.06) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="none" stroke="rgba(244,241,234,0.3)" strokeWidth="1.2" />
            <path d="M16 2.5 21 16H11Z" fill="#e5482b" />
            <path d="M11 16h10l-5 13.5Z" fill="#f4f1ea" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>GETNORTH</div>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 4, color: "#a3abb8" }}>
              MEDIA &amp; AI SOLUTIONS
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, fontWeight: 500, letterSpacing: 4, color: "#ff6a4d" }}>
            <div style={{ width: 12, height: 12, background: "#e5482b", transform: "rotate(45deg)" }} />
            {kicker.toUpperCase()}
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 500, color: "#a3abb8" }}>
          <div>Media. Marketing. Technology. AI.</div>
          <div>Bengaluru, India · getnorthmedia.com</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
