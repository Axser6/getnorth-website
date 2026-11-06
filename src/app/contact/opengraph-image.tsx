import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Contact GetNorth Media & AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "Contact", title: "Let's find your north." });
}
