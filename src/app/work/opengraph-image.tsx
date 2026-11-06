import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Portfolio of GetNorth Media & AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "Our work", title: "Work that points somewhere." });
}
