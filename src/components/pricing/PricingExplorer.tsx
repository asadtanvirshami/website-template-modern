"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui";
import type { Package, PricingCategory } from "@/content/pricing";

const SERVICE_FOR: Record<string, string> = {
  logo: "logo-design", web: "web-design-development", ecommerce: "e-commerce", seo: "seo", social: "social-media-marketing",
  video: "video-animation", content: "content-writing", "branding-print": "branding", apps: "app-development",
};
const quoteHref = (p: Package) => `/contact?service=${SERVICE_FOR[p.category]}&package=${encodeURIComponent(p.name)}`;
const MAX = 3;

export default function PricingExplorer({ categories }: { categories: PricingCategory[] }) {
  const [active, setActive] = useState(categories[0].id);
  const [open, setOpen] = useState<string | null>(null);
  const [cmp, setCmp] = useState<string[]>([]);
  const [showCmp, setShowCmp] = useState(false);
  const all = categories.flatMap((c) => c.packages);
  const picked = cmp.map((id) => all.find((p) => p.id === id)!).filter(Boolean);

  useEffect(() => {
    const fromHash = () => { const h = location.hash.slice(1); if (categories.some((c) => c.id === h)) setActive(h); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  const choose = (id: string) => { setActive(id); setOpen(null); history.replaceState(null, "", `#${id}`); };
  const toggleCmp = (id: string) => setCmp((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= MAX ? c : [...c, id]));

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Category navigation */}
      <nav aria-label="Pricing categories" className="lg:col-span-3">
        <div className="sticky top-[calc(var(--header-h)+.5rem)] z-20 -mx-[var(--gutter)] bg-paper/95 px-[var(--gutter)] py-3 backdrop-blur lg:top-28 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
            {categories.map((c, i) => (
              <li key={c.id} className="shrink-0">
                <button
                  onClick={() => choose(c.id)}
                  aria-current={active === c.id ? "true" : undefined}
                  className={`group flex w-full items-baseline gap-3 border px-4 py-2.5 text-left transition-colors lg:border-0 lg:border-t lg:border-ink/15 lg:px-0 lg:py-4 ${active === c.id ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink" : "border-ink/25 lg:hover:text-graphite"}`}
                >
                  <span className="label hidden text-graphite lg:inline">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`label lg:![font-family:var(--font-display)] lg:!text-[1.7rem] lg:!leading-none lg:!tracking-[.02em] ${active === c.id ? "lg:underline lg:decoration-signal lg:decoration-4 lg:underline-offset-8" : ""}`}>{c.label}</span>
                  <span className="label ml-auto hidden text-graphite lg:inline">{c.packages.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Package lists — every category is in the DOM; inactive ones are hidden */}
      <div className="lg:col-span-9">
        {categories.map((c) => (
          <section key={c.id} id={c.id} hidden={active !== c.id} aria-labelledby={`cat-${c.id}`} className="scroll-mt-28">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id={`cat-${c.id}`} className="d-xl">{c.label}</h2>
                <p className="mt-2 text-graphite">{c.blurb}</p>
              </div>
              {c.serviceHref && <Link href={c.serviceHref} className="label link-u inline-flex items-center gap-2">About this service <Arrow className="size-4" /></Link>}
            </header>
            <ul className="border-t border-ink">
              {c.packages.map((p) => {
                const isOpen = open === p.id;
                const picked = cmp.includes(p.id);
                const highlights = (p.groups[0]?.items ?? []).slice(0, 4);
                return (
                  <li key={p.id} className="border-b border-ink/20">
                    <div className="grid gap-x-6 gap-y-4 py-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_auto] md:items-start">
                      <div>
                        <h3 className="d-md">{p.name}</h3>
                        <p className="num mt-2 text-[clamp(3rem,5vw,4.5rem)]">{p.price}</p>
                        {p.tagline && <p className="mt-1 text-sm text-graphite">{p.tagline}</p>}
                      </div>
                      <ul className="grid gap-1.5 text-[0.95rem]">
                        {highlights.map((h) => <li key={h} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 bg-signal" aria-hidden="true" />{h}</li>)}
                        {(p.groups[0]?.items.length ?? 0) > highlights.length && <li className="label text-graphite">+ more inside details</li>}
                      </ul>
                      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-stretch">
                        <Link href={quoteHref(p)} className="btn !min-h-11 !px-4 justify-between" data-track="request_quote_click">Request a Quote <Arrow /></Link>
                        <button className="label flex min-h-11 items-center gap-3 border border-ink/25 px-4 hover:border-ink" aria-expanded={isOpen} aria-controls={`det-${p.id}`} onClick={() => setOpen(isOpen ? null : p.id)}>
                          {isOpen ? "Hide" : "Show"} details <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                        </button>
                        <label className="label flex min-h-11 cursor-pointer items-center gap-3 border border-ink/25 px-4 hover:border-ink has-[:checked]:border-ink has-[:checked]:bg-signal">
                          <input type="checkbox" className="size-4 accent-ink" checked={picked} disabled={!picked && cmp.length >= MAX} onChange={() => toggleCmp(p.id)} />
                          Compare
                        </label>
                      </div>
                    </div>
                    <div id={`det-${p.id}`} className="acc-panel" data-open={isOpen} role="region" aria-label={`${p.name} details`}>
                      <div>
                        <div className="grid gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                          {p.groups.map((g, gi) => (
                            <div key={gi}>
                              {g.heading && <p className="label mb-3 text-graphite">{g.heading.replace(/\*/g, "").trim()}</p>}
                              <ul className="grid gap-1.5 text-[0.95rem]">{g.items.map((it) => <li key={it} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 bg-ink" aria-hidden="true" />{it}</li>)}</ul>
                            </div>
                          ))}
                        </div>
                        {p.mentionsGuarantee && <p className="pb-8 text-sm text-graphite">Guarantees marked with an asterisk are subject to our <Link href="/terms#refund-policy" className="link-u text-ink">Refund Policy</Link>.</p>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* Compare tray */}
      {cmp.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-paper/20 bg-void text-paper">
          <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3">
            <p className="label"><span className="text-signal">{cmp.length}</span> / {MAX} selected — {picked.map((p) => p.name).join(" · ")}</p>
            <div className="flex gap-2">
              <button className="btn btn-ghost !min-h-10 !px-4" onClick={() => setCmp([])}>Clear</button>
              <button className="btn !min-h-10 !px-4" disabled={cmp.length < 2} onClick={() => setShowCmp(true)} style={cmp.length < 2 ? { opacity: 0.5 } : undefined}>{cmp.length < 2 ? "Pick one more" : "Compare"}</button>
            </div>
          </div>
        </div>
      )}
      {showCmp && <CompareDialog picked={picked} onClose={() => setShowCmp(false)} />}
    </div>
  );
}

function CompareDialog({ picked, onClose }: { picked: Package[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const prev = document.activeElement as HTMLElement | null;
    el.querySelector<HTMLElement>("button")?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = el.querySelectorAll<HTMLElement>("a[href], button");
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; prev?.focus(); };
  }, [onClose]);
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Compare packages" className="fixed inset-0 z-[160] overflow-y-auto bg-void/95 text-paper" data-lenis-prevent>
      <div className="wrap py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="d-lg">Compare packages</h2>
          <button className="btn btn-ghost !min-h-10 !px-4" onClick={onClose}>Close</button>
        </div>
        <div className={`grid gap-px bg-paper/15 ${picked.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {picked.map((p) => (
            <div key={p.id} className="bg-void p-6">
              <p className="label text-ash">{p.category.replace("-", " ")}</p>
              <h3 className="d-md mt-1">{p.name}</h3>
              <p className="num mt-2 text-6xl text-signal">{p.price}</p>
              {p.groups.map((g, i) => (
                <div key={i} className="mt-6">
                  {g.heading && <p className="label mb-2 text-ash">{g.heading.replace(/\*/g, "").trim()}</p>}
                  <ul className="grid gap-1.5 text-sm text-paper/85">{g.items.map((it) => <li key={it} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 bg-signal" aria-hidden="true" />{it}</li>)}</ul>
                </div>
              ))}
              <Link href={quoteHref(p)} className="btn mt-8 w-full justify-between">Request a Quote <Arrow /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
