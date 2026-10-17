"use client";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { registerGsap, prefersReducedMotion } from "@/lib/motion";
import { Arrow } from "@/components/ui";

/** Words brighten as they scroll through the viewport. Text is fully readable without JS. */
export function ScrollWords({ text, className = "", as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" | "h3" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll("[data-w]"), { opacity: 0.18 }, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  const Comp = Tag as "p";
  return (
    <Comp ref={ref as React.RefObject<HTMLParagraphElement>} className={`sw ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className="inline-block">{w}&nbsp;</span>
      ))}
    </Comp>
  );
}

/** A tall full-page screenshot panned inside a browser frame as the user scrolls (desktop). */
export function ScreenshotPan({ src, alt, w, h, name }: { src: string; alt: string; w: number; h: number; name: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !outer.current || !img.current || !frame.current) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const o = outer.current!, f = frame.current!, i = img.current!;
      o.style.height = "320vh";
      gsap.to(i, {
        y: () => -(i.offsetHeight - f.clientHeight + 0),
        ease: "none",
        scrollTrigger: { trigger: o, start: "top top+=88", end: "bottom bottom", scrub: 0.4, invalidateOnRefresh: true },
      });
      return () => { o.style.height = ""; };
    });
    return () => mm.revert();
  }, []);
  return (
    <div ref={outer}>
      <div className="lg:sticky lg:top-[88px]">
        <div className="browser mx-auto max-w-[1400px]">
          <div className="browser-bar" aria-hidden="true"><i /><i /><i /></div>
          <div ref={frame} className="relative h-[70svh] overflow-hidden bg-paper lg:h-[calc(100svh-88px-3.4rem)]">
            <div ref={img} className="will-change-transform">
              <Image src={src} alt={alt} width={w} height={h} unoptimized className="h-auto w-full" />
            </div>
          </div>
        </div>
        <p className="label mt-4 flex items-center justify-between text-ash lg:hidden">
          <span>{name}</span>
          <a href={src} target="_blank" rel="noopener" className="link-u text-paper">Open full page</a>
        </p>
      </div>
    </div>
  );
}

/** Horizontal project strip. Native swipe/scroll on small screens; pinned horizontal scrub on desktop. */
export function FilmStrip({ children, heading }: { children: ReactNode; heading: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !section.current || !track.current) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      t.style.overflowX = "visible";
      gsap.to(t, {
        x: () => -(t.scrollWidth - document.documentElement.clientWidth + 64),
        ease: "none",
        scrollTrigger: { trigger: section.current, pin: true, scrub: 0.6, start: "top top", end: () => "+=" + Math.max(1200, t.scrollWidth * 0.7), invalidateOnRefresh: true, anticipatePin: 1 },
      });
      return () => { t.style.overflowX = ""; };
    });
    return () => mm.revert();
  }, []);
  return (
    // Stable wrapper: GSAP's pin-spacer is inserted inside it, so React can still unmount cleanly.
    <div>
      <section ref={section} className="tone-void relative flex min-h-svh flex-col justify-center overflow-hidden py-16" aria-label="Project showcase">
        <div className="wrap mb-10">{heading}</div>
        <div ref={track} className="flex gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scroll-snap-type:x_proximity] lg:gap-8" data-lenis-prevent-wheel>
          {children}
        </div>
      </section>
    </div>
  );
}

/** Sticky process: pinned heading + progress on desktop; plain vertical timeline on mobile. */
export function ProcessSticky({ steps }: { steps: { n: string; t: string; d: string }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const pct = ((active + 1) / steps.length) * 100;
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <p className="label label-y">Our process</p>
          <p className="num mt-6 hidden text-[clamp(8rem,20vw,19rem)] text-signal lg:block" aria-hidden="true">{steps[active].n}</p>
          <p className="d-lg mt-2 hidden lg:block" aria-hidden="true">{steps[active].t}</p>
          <div className="mt-10 hidden h-px w-full bg-paper/20 lg:block" aria-hidden="true">
            <div className="h-px origin-left bg-signal transition-transform duration-700 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <p className="label mt-3 hidden text-ash lg:block" aria-hidden="true">Step {active + 1} / {steps.length}</p>
        </div>
      </div>
      <ol className="relative lg:col-span-7">
        {steps.map((s, i) => (
          <li key={s.n} data-i={i} ref={(el) => { refs.current[i] = el; }} className="relative border-l border-paper/20 pb-14 pl-8 last:pb-0 lg:min-h-[62vh] lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10 lg:pb-0">
            <span className="absolute -left-[5px] top-1 size-2.5 bg-signal lg:hidden" aria-hidden="true" />
            <div className={`transition-opacity duration-700 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}>
              <p className="num text-5xl text-signal lg:hidden">{s.n}</p>
              <h3 className="d-lg mt-2 lg:mt-0">{s.t}</h3>
              <p className="lead mt-5 text-paper/80">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Accessible accordion with large editorial type. */
export function Accordion({ items, tone = "dark" }: { items: { q: string; a: string }[]; tone?: "dark" | "light" }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-current/20">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-current/20">
            <h3>
              <button
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="d-md max-w-[28ch] !normal-case sm:max-w-none" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "clamp(1.15rem,2vw,1.7rem)", lineHeight: 1.25, letterSpacing: 0 }}>{it.q}</span>
                <span className="mt-1 grid size-9 shrink-0 place-items-center border border-current/30 transition-colors group-hover:bg-signal group-hover:text-void" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M0 7h14" stroke="currentColor" strokeWidth="1.5" /><path d="M7 0v14" stroke="currentColor" strokeWidth="1.5" style={{ transformOrigin: "center", transform: isOpen ? "scaleY(0)" : "none", transition: "transform .4s" }} /></svg>
                </span>
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="acc-panel" data-open={isOpen}>
              <div><p className={`max-w-3xl pb-8 text-lg leading-relaxed ${tone === "dark" ? "text-paper/75" : "text-graphite"}`}>{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Services index with a sticky dynamic visual (desktop) and plain rows (mobile). */
export type IndexItem = { href: string; n: string; title: string; text: string; image?: string; alt?: string };
export function ServiceIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {items.map((it, i) => (
          <li key={it.href} className="border-t border-current/20 last:border-b">
            <Link
              href={it.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-1 py-6 sm:py-7"
              data-cursor="OPEN"
            >
              <span className="label text-ash group-hover:text-signal">{it.n}</span>
              <span className="d-xl block transition-transform duration-500 ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3">{it.title}</span>
              <Arrow className="arr-move size-7 self-center text-ash transition-all duration-500 group-hover:text-signal group-hover:translate-x-1" dir="up-right" />
              <span className="col-start-2 max-w-md text-paper/70 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">{it.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative hidden lg:col-span-5 lg:block" aria-hidden="true">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink">
          {items.map((it, i) => (
            <div key={it.href} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: active === i ? 1 : 0 }}>
              {it.image ? (
                <Image src={it.image} alt="" fill sizes="35vw" className="object-cover grayscale-img" />
              ) : (
                <div className="grid h-full place-items-center bg-signal text-void"><span className="num text-[16rem]">{it.n}</span></div>
              )}
              <span className="label absolute bottom-4 left-4 bg-void px-3 py-2 text-paper">{it.n} — {it.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Selected-work index: hover-follow preview on desktop. */
export type WorkItem = { href: string; n: string; title: string; meta: string; image: string };
export function WorkIndex({ items }: { items: WorkItem[] }) {
  const prev = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const el = prev.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const { gsap } = registerGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => { xTo(e.clientX + 24); yTo(e.clientY - 120); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div onMouseLeave={() => setActive(null)}>
      <ul>
        {items.map((it, i) => (
          <li key={it.href} className="border-t border-current/20 last:border-b">
            <Link href={it.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)} className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[5rem_1fr_16rem_auto]">
              <span className="num text-3xl text-ash group-hover:text-signal sm:text-4xl">{it.n}</span>
              <span className="d-lg transition-transform duration-500 ease-out group-hover:translate-x-3">{it.title}</span>
              <span className="label hidden text-ash sm:block">{it.meta}</span>
              <Arrow className="size-6 transition-transform group-hover:translate-x-1" dir="up-right" />
            </Link>
          </li>
        ))}
      </ul>
      <div ref={prev} className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[240px] w-[340px] overflow-hidden bg-ink transition-opacity duration-300 hover-only lg:block" style={{ opacity: active === null ? 0 : 1 }} aria-hidden="true">
        {items.map((it, i) => (
          <div key={it.href} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: active === i ? 1 : 0 }}>
            <Image src={it.image} alt="" fill sizes="340px" className="object-cover object-top" />
          </div>
        ))}
      </div>
    </div>
  );
}
