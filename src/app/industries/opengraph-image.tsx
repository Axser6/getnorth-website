import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Industries served by GetNorth Media & AI Solutions";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "Industries", title: "Different sectors. Different journeys." });
}
