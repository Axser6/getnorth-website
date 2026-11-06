import type { Metadata } from "next";
import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import DemoOne from "./demo";

/**
 * Internal preview of the Perspective Tunnel Hero (not linked, not indexed, not in the sitemap).
 * 1. The component full-bleed, as it would appear as a page hero.
 * 2. The original 21st.dev demo (inside a max-w-3xl container).
 */
export const metadata: Metadata = {
  title: "Preview: Perspective Tunnel Hero",
  robots: { index: false, follow: false },
};

export default function PerspectiveTunnelPreview() {
  return (
    <>
      <PerspectiveTunnelHero />
      <section className="bg-stone-100 px-4 pt-16 text-center sm:px-8">
        <p className="mx-auto max-w-xl text-sm text-stone-600">
          Below: the original 21st.dev demo, with the component inside a narrower container.
        </p>
      </section>
      <DemoOne />
    </>
  );
}
