import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/motion/Loader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import MotionRoot from "@/components/motion/MotionRoot";
import Cursor from "@/components/motion/Cursor";
import Analytics from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/ui";
import { orgJsonLd } from "@/lib/seo";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-plex", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "The Website Grove | Web Design, Development & Digital Marketing Agency", template: "%s" },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/legacy/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

/**
 * Runs before first paint. Enables CSS-driven motion only when JS works and the user has not
 * asked for reduced motion; a watchdog removes it if the app never hydrates, so content can
 * never stay hidden. The first-visit loader is limited to the home page, once per session.
 */
const bootScript = `(function(){var r=document.documentElement;try{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){r.classList.add('motion-ok');if(location.pathname==='/'&&!sessionStorage.getItem('twg-seen')){r.classList.add('is-loading')}}setTimeout(function(){if(!window.__twgReady){r.classList.remove('motion-ok','is-loading')}},5000)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={orgJsonLd()} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Loader />
        <SmoothScroll />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <Cursor />
        <MotionRoot />
        <Analytics />
      </body>
    </html>
  );
}
