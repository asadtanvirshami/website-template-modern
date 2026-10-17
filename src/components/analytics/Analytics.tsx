"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Consent-aware GA4. Nothing loads unless NEXT_PUBLIC_GA_ID is set AND the visitor accepts.
 * Click events are tracked through one delegated listener (no duplicates), using coarse
 * labels only — form contents are never sent.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    try { setConsent((localStorage.getItem(CONSENT_KEY) as "granted" | "denied" | null) ?? null); } catch { setConsent(null); }
  }, []);

  useEffect(() => {
    if (!GA_ID || consent !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("a[href], [data-track]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const label = a.dataset.track;
      if (href.startsWith("tel:")) track("phone_click");
      else if (href.startsWith("mailto:")) track("email_click");
      else if (label) track(label);
      else if (/\/portfolio\/[^/]+$/.test(href)) track("case_study_click", { path: href });
      else if (/\/contact\?.*(service|package)=/.test(href)) track("service_inquiry_select", { path: href.split("?")[0] });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  useEffect(() => {
    if (GA_ID && consent === "granted" && window.gtag) window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname, consent]);

  const decide = (v: "granted" | "denied") => {
    try { localStorage.setItem(CONSENT_KEY, v); } catch {}
    setConsent(v);
  };

  if (!GA_ID) return null;
  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false,anonymize_ip:true});`}</Script>
        </>
      )}
      {consent === null && (
        <div role="region" aria-label="Cookie consent" className="fixed inset-x-4 bottom-4 z-[120] max-w-md border border-paper/20 bg-void p-5 text-paper sm:left-auto">
          <p className="text-sm leading-relaxed text-paper/80">We’d like to use analytics cookies to understand how the site is used. No form contents are ever recorded. See our <a href="/privacy" className="link-u">Privacy Policy</a>.</p>
          <div className="mt-4 flex gap-3">
            <button className="btn !min-h-10 !px-4" onClick={() => decide("granted")}>Accept</button>
            <button className="btn btn-ghost !min-h-10 !px-4" onClick={() => decide("denied")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
