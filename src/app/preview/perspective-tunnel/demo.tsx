// Demo from 21st.dev for the Perspective Tunnel Hero.
// That's what is shown on the preview page (/preview/perspective-tunnel).

import CurtainSplitHero from "@/components/ui/perspective-tunnel-hero";

export default function DemoOne() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-stone-100 p-4 transition-colors duration-300 sm:p-6 md:p-8 dark:bg-stone-950">
      <div className="w-full max-w-3xl">
        <CurtainSplitHero headingLevel="h2" />
      </div>
    </main>
  );
}
