import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const root = process.cwd();

/** Plus Jakarta Sans (SIL Open Font License) bundled in /assets/fonts so OG images need no network. */
function loadFont(weight: 500 | 800) {
  return readFile(join(root, "assets/fonts", `PlusJakartaSans-${weight}.ttf`));
}

async function loadLogo() {
  const png = await readFile(join(root, "public/brand/logo-light.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

export async function renderOg({ kicker, title }: { kicker: string; title: string }) {
  const [bold, medium, logo] = await Promise.all([loadFont(800), loadFont(500), loadLogo()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "72px",
          background: "linear-gradient(135deg, #0a3e23 0%, #0f1f17 100%)",
          color: "#f5f3ee",
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, fontWeight: 500, letterSpacing: 5, color: "#9fd0aa" }}>
            <div style={{ width: 36, height: 2, background: "#9fd0aa" }} />
            {kicker.toUpperCase()}
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2.5, maxWidth: 720 }}>{title}</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#a9b8ae" }}>Bengaluru, India · getnorthmedia.com</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={280} height={148} alt="" />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Plus Jakarta Sans", data: bold, weight: 800, style: "normal" },
        { name: "Plus Jakarta Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
