import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Services by GetNorth Media & AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "Services", title: "Media, marketing, web and AI — in one place." });
}
