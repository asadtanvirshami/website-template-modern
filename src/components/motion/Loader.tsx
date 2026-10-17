"use client";
import { useEffect, useRef } from "react";
import Logo from "@/components/ui/Logo";

/**
 * First-visit loader. Progress reflects REAL milestones (fonts ready, window load) —
 * no fake percentages. A hard timeout guarantees it can never trap the user.
 * The element is server-rendered but only displayed when <html> has `is-loading`
 * (set by an inline script on first home visit), so no-JS users never see it.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!root.classList.contains("is-loading") || !el) { window.dispatchEvent(new Event("twg:ready")); return; }
    let finished = false;
    const set = (p: number) => el.style.setProperty("--p", String(p));
    const finish = () => {
      if (finished) return;
      finished = true;
      set(1);
      window.setTimeout(() => {
        el.classList.add("is-done");
        root.classList.remove("is-loading");
        try { sessionStorage.setItem("twg-seen", "1"); } catch {}
        window.dispatchEvent(new Event("twg:ready"));
      }, 350);
    };
    let fonts = false, loaded = document.readyState === "complete";
    const check = () => { if (fonts && loaded) finish(); };
    set(0.1);
    (document.fonts?.ready ?? Promise.resolve()).then(() => { fonts = true; set(loaded ? 0.9 : 0.5); check(); });
    const onLoad = () => { loaded = true; set(fonts ? 0.9 : 0.6); check(); };
    if (loaded) onLoad(); else window.addEventListener("load", onLoad, { once: true });
    const hard = window.setTimeout(finish, 2600);
    return () => { window.clearTimeout(hard); window.removeEventListener("load", onLoad); };
  }, []);

  return (
    <div ref={ref} className="loader" aria-hidden="true">
      <Logo className="h-12 w-auto text-paper" title="" />
      <div className="loader-bar"><i /></div>
    </div>
  );
}
