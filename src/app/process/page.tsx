import Link from "next/link";
import { JsonLd, Lines, SectionLabel } from "@/components/ui";
import { CtaBand, FaqSection, PageHero } from "@/components/ui/blocks";
import { COLLAB, FAQS, PROCESS_DETAIL } from "@/content/copy";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Process | How The Website Grove Works",
  description: "From discovery and strategy to design, development, testing and launch — see how The Website Grove takes a project from first conversation to a site that keeps improving.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Process" }]}
        kicker="Process"
        lines={["How a project", <span key="2" className="text-signal">comes together.</span>]}
        lead="A clear, collaborative process — so you always know what’s happening, what’s next, and why."
      />

      <section className="tone-dark section" aria-labelledby="timeline-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Process stages" className="sticky top-32">
              <p className="label label-y mb-6">Stages</p>
              <ol className="grid gap-3">
                {PROCESS_DETAIL.map((p, i) => (
                  <li key={p.t}><a href={`#stage-${i + 1}`} className="group flex items-baseline gap-3 text-paper/70 transition-colors hover:text-signal"><span className="label">0{i + 1}</span><span>{p.t}</span></a></li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="lg:col-span-9">
            <h2 id="timeline-title" className="sr-only">Process stages</h2>
            <ol>
              {PROCESS_DETAIL.map((p, i) => (
                <li key={p.t} id={`stage-${i + 1}`} className="grid scroll-mt-28 gap-8 border-t border-paper/20 py-12 md:grid-cols-[6rem_1fr] lg:py-16">
                  <span className="num text-[clamp(3.5rem,6vw,5.5rem)] text-signal">0{i + 1}</span>
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="d-xl" data-reveal>{p.t}</h3>
                      <p className="mt-5 text-lg text-paper/80" data-reveal style={{ "--d": 100 } as React.CSSProperties}>{p.d}</p>
                    </div>
                    <ul className="grid content-start gap-3" data-reveal style={{ "--d": 180 } as React.CSSProperties}>
                      {p.points.map((pt) => <li key={pt} className="flex gap-3 border-t border-paper/15 pt-3"><span className="mt-2 size-1.5 shrink-0 bg-signal" aria-hidden="true" />{pt}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="tone-light section" aria-labelledby="collab-title">
        <div className="wrap">
          <SectionLabel n="↳" className="mb-6">Working together</SectionLabel>
          <Lines as="h2" id="collab-title" className="d-xl mb-12" lines={["What to expect."]} />
          <ul className="grid gap-px bg-ink/15 md:grid-cols-3">
            {COLLAB.map((c) => (
              <li key={c.t} className="bg-paper p-8">
                <h3 className="d-md">{c.t}</h3>
                <p className="mt-4 text-graphite">{c.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-graphite">Revision, delivery and refund terms are set out in our <Link href="/terms" className="link-u text-ink">Terms &amp; Conditions</Link>.</p>
        </div>
      </section>

      <FaqSection faqs={FAQS.general.filter((f) => /long|together|maintenance|started/i.test(f.q))} title={["Process", "questions."]} id="process-faq" />
      <CtaBand lines={["Ready to", "begin?"]} text="Tell us about your project and we’ll map out the first step together." />
    </>
  );
}
