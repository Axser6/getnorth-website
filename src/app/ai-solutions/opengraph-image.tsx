import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "AI and business automation solutions by GetNorth";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ kicker: "AI Solutions", title: "AI that does real work for your business." });
}
