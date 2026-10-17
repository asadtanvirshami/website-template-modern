import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, Btn, Breadcrumbs, JsonLd, Lines, Media, Reveal, SectionLabel } from "@/components/ui";
import { Accordion } from "@/components/motion/Scroll";
import { faqJsonLd } from "@/lib/seo";
import { type Article, fmtDate } from "@/content/insights";

/** Standard dark hero for inner pages. */
export function PageHero({
  crumbs, kicker, lines, lead, children, tall = false, id = "page-title",
}: { crumbs?: { name: string; href?: string }[]; kicker: string; lines: ReactNode[]; lead?: ReactNode; children?: ReactNode; tall?: boolean; id?: string }) {
  return (
    <section className={`tone-void relative overflow-hidden pt-36 sm:pt-44 ${tall ? "pb-24 sm:pb-32 min-h-[78svh]" : "pb-20 sm:pb-28"}`} aria-labelledby={id}>
      <div className="wrap relative z-10">
        {crumbs && <div className="mb-10"><Breadcrumbs items={crumbs} /></div>}
        <p className="label label-y mb-6" data-reveal="fade">{kicker}</p>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className={children ? "lg:col-span-7" : "lg:col-span-10"}>
            <Lines as="h1" id={id} className="d-xxl" lines={lines} />
            {lead && <Reveal className="lead mt-8 text-paper/75" delay={300}>{lead}</Reveal>}
          </div>
          {children && <div className="lg:col-span-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/** Closing conversion band. Used at the end of every page. */
export function CtaBand({
  lines = ["Have something", "ambitious in mind?"], text = "Let’s turn your next idea into a digital experience worth remembering.", label = "Start a Project", href = "/contact", accent,
}: { lines?: string[]; text?: string; label?: string; href?: string; accent?: string }) {
  return (
    <section className="tone-void relative overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-y-0 right-0 hidden w-[22%] bg-signal lg:block" aria-hidden="true" data-reveal="fade" />
      <div className="wrap relative py-24 sm:py-36">
        <p className="label label-y mb-6">{accent ?? "Let’s work together"}</p>
        <Lines as="h2" id="cta-title" className="d-xxl max-w-[16ch]" lines={lines.map((l, i) => (i === lines.length - 1 ? <span key={i} className="text-signal">{l}</span> : l))} />
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          <Reveal className="lead max-w-md text-paper/75" delay={250}>{text}</Reveal>
          <Reveal delay={400}><Btn href={href} track="cta_band_start_project">{label}</Btn></Reveal>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (k: string) => (
    <ul className="marquee-track" aria-hidden={k === "b" ? true : undefined}>
      {items.map((t, i) => (
        <li key={k + i} className="flex shrink-0 items-center gap-8 pr-8">
          <span className="d-lg">{t}</span>
          <span className="inline-block size-3 bg-signal" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return <div className={`marquee ${className}`}>{row("a")}{row("b")}</div>;
}

export function FaqSection({
  faqs, title = ["Questions,", "answered."], tone = "dark", jsonLd = false, id = "faq-title", intro,
}: { faqs: { q: string; a: string }[]; title?: string[]; tone?: "dark" | "light"; jsonLd?: boolean; id?: string; intro?: ReactNode }) {
  return (
    <section className={`section ${tone === "dark" ? "tone-dark" : "tone-light"}`} aria-labelledby={id}>
      {jsonLd && <JsonLd data={faqJsonLd(faqs)} />}
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="label label-y mb-5">FAQ</p>
            <Lines as="h2" id={id} className="d-xl" lines={title} />
            {intro && <div className="mt-6 max-w-sm text-current/70">{intro}</div>}
          </div>
        </div>
        <div className="lg:col-span-8"><Accordion items={faqs} tone={tone} /></div>
      </div>
    </section>
  );
}

export function ArticleCard({ a, priority }: { a: Article; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/insights/${a.slug}`} className="block" data-cursor="READ">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink" data-clip>
          <div className="absolute inset-0">
            <Media src={a.cover} alt={a.coverAlt} sizes="(min-width:1024px) 30vw, 100vw" priority={priority} className="transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          </div>
        </div>
        <p className="label mt-5 flex gap-3 text-graphite"><span className="text-ink">{a.category}</span><span aria-hidden="true">—</span><time dateTime={a.date}>{fmtDate(a.date)}</time></p>
        <h3 className="d-md mt-3 !text-[clamp(1.7rem,2.4vw,2.3rem)] transition-colors group-hover:text-graphite">{a.title}</h3>
        <p className="mt-3 max-w-md text-graphite">{a.excerpt}</p>
        <span className="label mt-5 inline-flex items-center gap-2">Read article <Arrow className="size-4 transition-transform group-hover:translate-x-1" /></span>
      </Link>
    </article>
  );
}

export { SectionLabel };
