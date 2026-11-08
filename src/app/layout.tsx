import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActionBar } from "@/components/sections";
import { RevealObserver } from "@/components/reveal-observer";
import { RouteFocus } from "@/components/route-focus";
import "./globals.css";

// Typography per the ui-ux-pro-max design system: Plus Jakarta Sans (headings + body).
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const RELOAD_TO_TOP = `(function(){try{
var n=performance.getEntriesByType("navigation")[0];
if(!n||n.type!=="reload"||location.hash)return;
history.scrollRestoration="manual";
window.scrollTo(0,0);
addEventListener("load",function(){window.scrollTo(0,0);setTimeout(function(){history.scrollRestoration="auto";},0);});
}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Media, Marketing, Technology & AI — Bengaluru`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital marketing agency Bengaluru",
    "AI automation company India",
    "WhatsApp automation",
    "website development Bengaluru",
    "branding and video production",
    "SEO services",
    "Google Ads",
    "Meta Ads",
    "AI chatbots",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior="smooth": Next.js 16 no longer disables our CSS smooth scrolling during
    // page changes by itself — this attribute makes every new page start instantly at the top.
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* On a page refresh, start at the top instead of the browser's remembered position.
            Links to a #section and the Back button keep their normal behaviour. */}
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <RevealObserver />
        <RouteFocus />
      </body>
    </html>
  );
}
