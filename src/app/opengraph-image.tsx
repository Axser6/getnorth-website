import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "GetNorth Media & AI Solutions — Media, Marketing, Technology and AI";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "Bengaluru · Media & AI Solutions", title: "Point your business north." });
}
