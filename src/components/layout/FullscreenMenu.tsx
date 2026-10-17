"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { registerGsap, prefersReducedMotion, lockScroll, unlockScroll } from "@/lib/motion";
import { SERVICES } from "@/content/services";
import { SITE, FULL_ADDRESS } from "@/content/site";

const MENU = [
  { n: "01", label: "Work", href: "/portfolio" },
  { n: "02", label: "Services", href: "/services" },
  { n: "03", label: "Pricing", href: "/pricing" },
  { n: "04", label: "Process", href: "/process" },
  { n: "05", label: "About", href: "/about" },
  { n: "06", label: "Insights", href: "/insights" },
  { n: "07", label: "Contact", href: "/contact" },
];

export function CaliforniaTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "—"}</span>;
}

export default function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = registerGsap();
    const items = el.querySelectorAll("[data-m]");
    if (first.current) { first.current = false; if (!open) return; }
    if (open) {
      lockScroll();
      el.dataset.open = "true";
      el.removeAttribute("inert");
      if (prefersReducedMotion()) { gsap.set(el, { clipPath: "inset(0 0 0% 0)" }); }
      else {
        gsap.to(el, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" });
        gsap.fromTo(items, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, delay: 0.35, ease: "power3.out" });
      }
      window.setTimeout(() => el.querySelector<HTMLElement>("a")?.focus(), 50);
    } else {
      unlockScroll();
      const done = () => { el.dataset.open = "false"; el.setAttribute("inert", ""); };
      if (prefersReducedMotion()) { gsap.set(el, { clipPath: "inset(0 0 100% 0)" }); done(); }
      else gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut", onComplete: done });
    }
    return () => { if (open) unlockScroll(); };
  }, [open]);

  // Escape + focus trap while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div id="fs-menu" ref={ref} className="fs-menu" role="dialog" aria-modal="true" aria-label="Site menu" data-open="false" inert>
      <div className="wrap grid min-h-svh gap-12 pb-12 pt-28 lg:grid-cols-12">
        <nav aria-label="Menu" className="lg:col-span-7">
          <ul>
            {MENU.map((m) => (
              <li key={m.href} data-m>
                <Link href={m.href} className="fs-link" onClick={() => { /* route change closes the menu */ }}>
                  <small>{m.n}</small>
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid content-between gap-10 lg:col-span-5">
          <div data-m>
            <p className="label label-y">Services</p>
            <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="flex items-baseline gap-3 border-b border-paper/10 py-3 text-paper/85 transition-colors hover:text-signal">
                    <span className="label text-ash">{s.number}</span>{s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-2" data-m>
            <div>
              <p className="label label-y">Contact</p>
              {/* <p className="mt-3"><a className="link-u" href={SITE.phone.href} data-track="phone_click">{SITE.phone.display}</a></p> */}
              <p className="mt-3"><a className="link-u" href={`mailto:${SITE.email}`} data-track="email_click">{SITE.email}</a></p>
              {/* <p className="mt-3 text-ash">{FULL_ADDRESS}</p> */}
            </div>
            <div>
              <p className="label label-y">California time</p>
              <p className="d-md mt-3"><CaliforniaTime /></p>
              <ul className="label mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {SITE.social.map((s) => (
                  <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">{s.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
