"use client";
import { useState } from "react";

export type Testimonial = { quote: string; name: string; role: string };

/** Manual crossfade — deliberately no auto-rotation so people can finish reading. */
export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  return (
    <section className="tone-void section" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="wrap">
        <p className="label label-y mb-10">What clients say</p>
        <div className="relative min-h-[22rem] sm:min-h-[26rem]" aria-live="polite">
          {items.map((t, k) => (
            <figure key={k} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: k === i ? 1 : 0, pointerEvents: k === i ? "auto" : "none" }} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${items.length}`}>
              <blockquote className="d-lg max-w-[26ch] !normal-case sm:max-w-5xl" style={{ fontFamily: "var(--font-display)" }}>“{t.quote}”</blockquote>
              <figcaption className="mt-8 label text-ash"><span className="text-paper">{t.name}</span> — {t.role}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-4">
          <button className="btn btn-ghost !min-h-11 !px-5" onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
          <button className="btn btn-ghost !min-h-11 !px-5" onClick={() => go(1)} aria-label="Next testimonial">→</button>
          <span className="label text-ash">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
