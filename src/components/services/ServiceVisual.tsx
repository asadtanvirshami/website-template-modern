import type { CSSProperties } from "react";
import { Media } from "@/components/ui";
import type { Service } from "@/content/services";

const d = (n: number) => ({ "--d": n } as CSSProperties);

/** Each service gets its own hero composition (never the same layout twice). */
export default function ServiceVisual({ s }: { s: Service }) {
  const im = s.images;
  switch (s.variant) {
    case "web":
      return (
        <div className="browser" data-reveal style={d(300)}>
          <div className="browser-bar" aria-hidden="true"><i /><i /><i /></div>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
            <div className="absolute inset-0" data-parallax="0.04"><Media src={im[0]} alt="Website design by The Website Grove" sizes="(min-width:1024px) 40vw, 100vw" priority /></div>
          </div>
        </div>
      );
    case "commerce":
      return (
        <div className="grid grid-cols-6 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`relative overflow-hidden bg-ink ${i === 0 ? "col-span-6 aspect-[2/1]" : "col-span-2 aspect-square"}`} data-clip style={d(200 + i * 150)}>
              <div className="absolute inset-0"><Media src={im[i]} alt={`eCommerce storefront design ${i + 1}`} sizes="(min-width:1024px) 40vw, 100vw" pos="object-left-top" priority={i === 0} /></div>
            </div>
          ))}
        </div>
      );
    case "brand":
      return (
        <div className="grid grid-cols-2 gap-3">
          {im.slice(0, 4).map((src, i) => (
            <figure key={src} className={`relative overflow-hidden bg-ink ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"} ${i === 1 ? "mt-10" : ""} ${i === 3 ? "-mt-6" : ""}`} data-clip style={d(200 + i * 150)}>
              <div className="absolute inset-0"><Media src={src} alt={`Brand identity — ${s.imageCaptions?.[i] ?? "identity work"}`} sizes="(min-width:1024px) 20vw, 50vw" pos="object-center" priority={i === 0} /></div>
            </figure>
          ))}
        </div>
      );
    case "logo":
      return (
        <ul className="grid grid-cols-6 gap-3">
          {im.map((src, i) => (
            <li key={src} className={`relative overflow-hidden bg-ink ${i === 0 ? "col-span-4 row-span-2 aspect-square" : "col-span-2 aspect-square"}`} data-clip style={d(200 + i * 120)}>
              <div className="absolute inset-0"><Media src={src} alt={`Logo design${s.imageCaptions?.[i] ? " — " + s.imageCaptions[i] : ""}`} sizes="(min-width:1024px) 26vw, 60vw" pos="object-center" priority={i === 0} /></div>
              {s.imageCaptions?.[i] && <span className="label absolute bottom-2 left-2 bg-void px-2 py-1 text-paper">{s.imageCaptions[i]}</span>}
            </li>
          ))}
        </ul>
      );
    case "seo":
      return (
        <ol className="border-t border-paper/20" aria-label="Our SEO approach">
          {s.blocks.map((b, i) => (
            <li key={b.title} className="grid grid-cols-[3rem_1fr] items-baseline gap-3 border-b border-paper/20 py-4" data-reveal style={d(i * 90)}>
              <span className="num text-3xl text-signal">0{i + 1}</span>
              <span className="d-md !text-[clamp(1.3rem,2vw,1.9rem)]">{b.title}</span>
            </li>
          ))}
        </ol>
      );
    case "social":
      return (
        <div className="grid grid-cols-2 gap-3">
          {im.slice(0, 4).map((src, i) => (
            <div key={src} className={`relative aspect-[4/5] overflow-hidden bg-ink ${i % 2 ? "mt-12" : ""}`} data-clip style={d(200 + i * 140)}>
              <div className="absolute inset-0"><Media src={src} alt={`Social media creative ${i + 1}`} sizes="(min-width:1024px) 20vw, 50vw" pos="object-center" priority={i === 0} /></div>
            </div>
          ))}
        </div>
      );
    case "video":
      return (
        <ol className="grid gap-3" aria-label="Storyboard frames">
          {im.slice(0, 3).map((src, i) => (
            <li key={src} className="grid grid-cols-[4.5rem_1fr] items-stretch gap-3" data-reveal style={d(200 + i * 150)}>
              <span className="label flex items-start border-t border-paper/30 pt-2 text-ash">SC {String(i + 1).padStart(2, "0")}</span>
              <div className="relative aspect-video overflow-hidden bg-ink"><Media src={src} alt={`Animation frame ${i + 1}`} sizes="(min-width:1024px) 36vw, 80vw" pos="object-center" priority={i === 0} /></div>
            </li>
          ))}
        </ol>
      );
    case "content":
      return (
        <div className="border border-paper/20 p-6 sm:p-10" data-reveal style={d(300)}>
          <p className="label label-y mb-6">Draft → Edit → Publish</p>
          <p className="d-lg !normal-case" style={{ fontFamily: "var(--font-display)" }}>
            “Great content is more than words on a page. It builds trust, strengthens authority and drives meaningful action.”
          </p>
          <div className="mt-8 grid gap-3" aria-hidden="true">
            {[88, 100, 72, 94, 40].map((w, i) => <i key={i} className="block h-px bg-paper/25" style={{ width: w + "%" }} />)}
          </div>
        </div>
      );
  }
}
