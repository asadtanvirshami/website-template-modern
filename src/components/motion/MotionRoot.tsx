"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { registerGsap, prefersReducedMotion, isFinePointer, isDesktop } from "@/lib/motion";

declare global { interface Window { __twgReady?: boolean } }

const REVEAL_SEL = "[data-reveal], [data-lines], [data-clip], [data-rule]";

/** Runs once per route: IntersectionObserver reveals, parallax, magnetic buttons. */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    window.__twgReady = true;
    const root = document.documentElement;
    if (prefersReducedMotion()) { root.classList.remove("motion-ok", "is-loading"); }
    let io: IntersectionObserver | null = null;
    let ctx: { revert: () => void } | null = null;
    const cleanups: (() => void)[] = [];
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      const els = document.querySelectorAll<HTMLElement>(REVEAL_SEL);
      // Fully clipped elements (clip-path reveals) are never reported as intersecting, so we
      // observe their unclipped parent and flip the class on every element it stands in for.
      const proxies = new Map<Element, HTMLElement[]>();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            // Anything already scrolled past (anchor jumps, back/forward) is shown immediately.
            if (e.isIntersecting || e.boundingClientRect.top < 0) {
              (proxies.get(e.target) ?? []).forEach((t) => t.classList.add("is-in"));
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
      );
      els.forEach((el) => {
        const target = el.hasAttribute("data-clip") && el.parentElement ? el.parentElement : el;
        const list = proxies.get(target);
        if (list) list.push(el); else { proxies.set(target, [el]); io!.observe(target); }
      });

      if (prefersReducedMotion()) return;
      const { gsap, ScrollTrigger } = registerGsap();

      ctx = gsap.context(() => {
        // Parallax — large imagery only, desktop only.
        if (isDesktop()) {
          document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
            const amt = parseFloat(el.dataset.parallax || "0.1");
            gsap.fromTo(el, { yPercent: -amt * 100 }, { yPercent: amt * 100, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true } });
          });
        }
        // Colour/background transitions between tone sections.
        document.querySelectorAll<HTMLElement>("[data-scrub-x]").forEach((el) => {
          const dist = parseFloat(el.dataset.scrubX || "10");
          gsap.fromTo(el, { xPercent: dist }, { xPercent: -dist, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });

      // Magnetic buttons (fine pointers only)
      if (isFinePointer()) {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (ev: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((ev.clientX - (r.left + r.width / 2)) * 0.25);
            yTo((ev.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); gsap.set(el, { clearProps: "x,y" }); });
        });
      }

      // Recalculate trigger positions once fonts / images have settled.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
      const t = window.setTimeout(refresh, 1200);
      cleanups.push(() => { window.clearTimeout(t); window.removeEventListener("load", refresh); });
    };

    // Wait for the first-visit loader (if any) before choreographing.
    if (root.classList.contains("is-loading")) {
      const onReady = () => start();
      window.addEventListener("twg:ready", onReady, { once: true });
      cleanups.push(() => window.removeEventListener("twg:ready", onReady));
    } else {
      start();
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
