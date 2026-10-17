import { JsonLd } from "@/components/ui";
import { PageHero } from "@/components/ui/blocks";
import { breadcrumbJsonLd } from "@/lib/seo";

export type LegalSection = { heading: string; lead?: string; blocks: ({ t: "p"; text: string } | { t: "ul"; items: string[] })[] };
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Readable legal layout: TOC + anchored sections. Text is rendered exactly as supplied. */
export default function LegalPage({ title, path, intro, sections }: { title: string; path: string; intro?: string; sections: LegalSection[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }])} />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: title }]} kicker="Legal" lines={[title]} lead={intro} />
      <section className="tone-white section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label={`${title} contents`} className="lg:sticky lg:top-28">
              <p className="label label-y mb-4">Contents</p>
              <ol className="grid gap-2 text-sm">
                {sections.map((s) => <li key={s.heading}><a href={`#${slugify(s.heading)}`} className="text-graphite transition-colors hover:text-ink">{s.heading}</a></li>)}
              </ol>
            </nav>
          </aside>
          <div className="legal lg:col-span-8 lg:col-start-5">
            {sections.map((s) => (
              <section key={s.heading} aria-labelledby={`h-${slugify(s.heading)}`}>
                <h2 id={slugify(s.heading)}><span id={`h-${slugify(s.heading)}`}>{s.heading}</span></h2>
                {s.lead && <p className="font-semibold">{s.lead}</p>}
                {s.blocks.map((b, i) => b.t === "p"
                  ? <p key={i} className="mb-4">{b.text}</p>
                  : <ul key={i} className="mb-4">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>)}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
