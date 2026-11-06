import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "About GetNorth Media & AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "About us", title: "Helping businesses find direction — and move with it." });
}
