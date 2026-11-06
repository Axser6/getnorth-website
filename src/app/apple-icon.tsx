import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0f14" }}>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M16 2.5 21 16H11Z" fill="#e5482b" />
          <path d="M11 16h10l-5 13.5Z" fill="#f4f1ea" />
        </svg>
      </div>
    ),
    size,
  );
}
