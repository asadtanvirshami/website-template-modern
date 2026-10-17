import Link from "next/link";
import { Arrow, Btn, JsonLd, Lines, Media, Reveal, SectionLabel } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { ScrollWords } from "@/components/motion/Scroll";
import { PROCESS_PHASES, VALUES } from "@/content/copy";
import { PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { FULL_ADDRESS } from "@/content/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About The Website Grove | Creative Design & Marketing Agency",
  description: "The Website Grove is a creative design and digital marketing agency in Bakersfield, California, combining attractive design with strong performance. Meet the studio behind the work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        tall
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        kicker="About us"
        lines={["Digital presence,", <span key="2" className="text-signal">perfected.</span>]}
        lead="The Website Grove is a creative design and marketing agency in Bakersfield, California — building digital experiences that are visually strong and technically sound."
      />

      {/* Positioning */}
      <section className="tone-light section" aria-labelledby="pos-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel n="01" className="mb-10">Positioning</SectionLabel>
            <h2 id="pos-title" className="sr-only">Our positioning</h2>
            <ScrollWords as="h3" className="d-xl !normal-case" text="A website shouldn’t have to choose between looking exceptional and performing well. Ours don’t." />
          </div>
          <Reveal className="lead text-graphite lg:col-span-3 lg:col-start-10 lg:pt-20" delay={150}>
            We design and build for engagement, credibility and conversion — so the brand people see is the brand that works.
          </Reveal>
        </div>
      </section>

      {/* Story + philosophy */}
      <section className="tone-dark section" aria-labelledby="story-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="02" className="mb-6">Philosophy</SectionLabel>
            <Lines as="h2" id="story-title" className="d-xl" lines={["Partnership,", "not production."]} />
          </div>
          <div className="prose-ed text-lg text-paper/80 lg:col-span-6 lg:col-start-7">
            <p data-reveal>We believe the best digital work comes from working closely with the people it’s for. Our process is partnership-driven: we listen first, plan with you, and keep you involved from the first conversation to launch day and beyond.</p>
            <p data-reveal style={{ "--d": 100 } as React.CSSProperties}>The result is design that strengthens how your audience engages with you, builds credibility, and supports conversion — grounded in strategy, finished with care.</p>
            <p data-reveal style={{ "--d": 200 } as React.CSSProperties}>We’re California-based and globally minded: close enough to meet the businesses around Bakersfield, flexible enough to work with clients anywhere.</p>
          </div>
        </div>
      </section>

      {/* Design + technology */}
      <section className="tone-white section" aria-labelledby="approach-title">
        <div className="wrap">
          <SectionLabel n="03" className="mb-6">Approach</SectionLabel>
          <Lines as="h2" id="approach-title" className="d-xl mb-16" lines={["Design and technology,", "built together."]} />
          <div className="grid gap-px bg-ink/15 md:grid-cols-3">
            {[
              { t: "Design", d: "Clear layouts, considered typography and visual systems that stay consistent across every touchpoint." },
              { t: "Technology", d: "Modern, scalable builds with clean, maintainable code — fast, secure and ready to grow." },
              { t: "Strategy", d: "Goals, audience and search intent shape the structure before a single pixel is placed." },
            ].map((x, i) => (
              <div key={x.t} className="bg-white p-8 md:p-10" data-reveal style={{ "--d": i * 100 } as React.CSSProperties}>
                <span className="num text-7xl text-ink/15">0{i + 1}</span>
                <h3 className="d-lg mt-4">{x.t}</h3>
                <p className="mt-4 text-graphite">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + values */}
      <section className="tone-signal section" aria-labelledby="values-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="04" className="mb-6">Mission &amp; values</SectionLabel>
            <Lines as="h2" id="values-title" className="d-xl" lines={["Elevating brands with", "visionary design and", "precision technology."]} />
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {VALUES.map((v, i) => (
              <li key={v.t} className="border-t border-void py-8 last:border-b" data-reveal style={{ "--d": i * 100 } as React.CSSProperties}>
                <h3 className="d-lg">{v.t}</h3>
                <p className="mt-3 max-w-md">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="tone-void section" aria-labelledby="how-title">
        <div className="wrap">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel n="05" className="mb-6">How we work</SectionLabel>
              <Lines as="h2" id="how-title" className="d-xl" lines={["Five steps,", "one team."]} />
            </div>
            <Btn href="/process" variant="ghost">Full process</Btn>
          </div>
          <ol className="grid gap-px bg-paper/15 md:grid-cols-5">
            {PROCESS_PHASES.map((p) => (
              <li key={p.n} className="bg-void p-6">
                <span className="num text-5xl text-signal">{p.n}</span>
                <h3 className="d-md mt-4">{p.t}</h3>
                <p className="mt-3 text-sm text-paper/70">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section className="tone-light section" aria-labelledby="cap-title">
        <div className="wrap">
          <SectionLabel n="06" className="mb-6">Core capabilities</SectionLabel>
          <Lines as="h2" id="cap-title" className="d-xl mb-12" lines={["What we do."]} />
          <ul className="grid gap-x-12 md:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-t border-ink/20">
                <Link href={`/${s.slug}`} className="group flex items-baseline gap-5 py-5">
                  <span className="label text-graphite">{s.number}</span>
                  <span className="d-md flex-1 transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                  <Arrow className="size-5 transition-transform group-hover:translate-x-1" dir="up-right" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio — no unverified team content */}
      <section className="tone-dark section" aria-labelledby="studio-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel n="07" className="mb-6">The studio</SectionLabel>
            <Lines as="h2" id="studio-title" className="d-xxl" lines={["Bakersfield,", <span key="2" className="text-signal">California.</span>]} />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            {/* <address className="not-italic text-lg text-paper/80">{FULL_ADDRESS}</address> */}
            <p className="mt-4 text-paper/70">Working with businesses across California and around the world.</p>
            <div className="mt-6"><Btn href="/contact" variant="ghost">Get in touch</Btn></div>
          </div>
        </div>
      </section>

      {/* Selected projects */}
      <section className="tone-light section" aria-labelledby="proj-title">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Lines as="h2" id="proj-title" className="d-xl" lines={["Selected work"]} />
            <Btn href="/portfolio" variant="ghost">All projects</Btn>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link href={`/portfolio/${p.slug}`} className="group block" data-cursor="VIEW">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink" data-clip><div className="absolute inset-0"><Media src={p.image} alt={`${p.name} website design`} sizes="(min-width:768px) 30vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" /></div></div>
                  <p className="d-md mt-4">{p.name}</p><p className="label text-graphite">{p.industry}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lines={["Let’s build", "something remarkable."]} text="Have a visionary project in mind? Let’s discuss how strategic design can bring it to life." />
    </>
  );
}
