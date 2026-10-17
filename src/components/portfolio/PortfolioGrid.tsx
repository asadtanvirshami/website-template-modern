"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Arrow } from "@/components/ui";

export type GridItem = {
  href: string; title: string; meta: string; image: string; cats: string[]; kind: "project" | "gallery"; aspect: string; pos: string;
};

/** Filterable portfolio grid. All items are server-rendered into the HTML; filtering only toggles `hidden`. */
export default function PortfolioGrid({ items, filters }: { items: GridItem[]; filters: { id: string; label: string }[] }) {
  const [f, setF] = useState("all");
  const list = [{ id: "all", label: "All" }, ...filters];
  const shown = items.filter((i) => f === "all" || i.cats.includes(f)).length;
  return (
    <div>
      <div role="group" aria-label="Filter projects" className="sticky top-[calc(var(--header-h)+.5rem)] z-20 -mx-1 mb-10 flex gap-2 overflow-x-auto bg-paper/95 px-1 py-3 backdrop-blur">
        {list.map((x) => (
          <button key={x.id} aria-pressed={f === x.id} onClick={() => setF(x.id)}
            className={`label shrink-0 border px-4 py-2.5 transition-colors ${f === x.id ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}>
            {x.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{shown} items shown</p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {items.map((it, i) => {
          const big = it.kind === "project";
          const visible = f === "all" || it.cats.includes(f);
          return (
            <li key={it.href + i} hidden={!visible} className={`${big ? "col-span-2" : "col-span-1"} ${big && i % 2 ? "md:mt-16" : ""}`}>
              <Link href={it.href} className="group block" data-cursor="VIEW">
                <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: big ? "16 / 11" : it.aspect }}>
                  <Image src={it.image} alt={`${it.title} — ${it.meta}`} fill sizes={big ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"} className={`object-cover ${it.pos} transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]`} />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className={big ? "d-md" : "label"}>{it.title}</p>
                    <p className="label mt-1 text-graphite">{it.meta}</p>
                  </div>
                  <Arrow className="mt-1 size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1" dir="up-right" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
