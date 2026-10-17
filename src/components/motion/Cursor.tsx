"use client";
import { useEffect, useRef } from "react";
import { registerGsap, prefersReducedMotion, isFinePointer } from "@/lib/motion";

/** Optional desktop-only follower. The native cursor is never hidden; this only adds a label. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !isFinePointer()) return;
    const { gsap } = registerGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const root = document.documentElement;
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) { root.classList.add("has-cursor"); gsap.set(el, { x: e.clientX, y: e.clientY }); shown = true; }
      xTo(e.clientX); yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const v = t.closest<HTMLElement>("[data-cursor]");
      el.classList.toggle("is-view", !!v);
      if (v && label.current) label.current.textContent = v.dataset.cursor || "VIEW";
      el.classList.toggle("is-link", !v && !!t.closest("a, button, [role=button]"));
    };
    const leave = () => { root.classList.remove("has-cursor"); shown = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor-dot"><span ref={label}>VIEW</span></div>
    </div>
  );
}
