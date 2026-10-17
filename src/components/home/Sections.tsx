import Link from "next/link";
import { Arrow, Btn, Lines, Media, Reveal, Rule, SectionLabel } from "@/components/ui";
import { ArticleCard, Marquee } from "@/components/ui/blocks";
import { FilmStrip, ProcessSticky, ScrollWords, ServiceIndex, WorkIndex } from "@/components/motion/Scroll";
import { PROJECTS, COLLECTIONS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { PROCESS_PHASES, WHY } from "@/content/copy";
import { ARTICLES } from "@/content/insights";

/* ------------------------------ HERO ------------------------------ */
export function Hero() {
  const panels = [
    { src: "/work/car-dealer-card.webp", alt: "Car Dealer business website design", mt: "lg:mt-28", amt: "0.06" },
    { src: "/work/eduma-card.webp", alt: "Eduma education website design", mt: "lg:mt-0", amt: "0.12" },
    { src: "/work/fitwell-card.webp", alt: "FitWell wellness website design", mt: "lg:mt-44", amt: "0.09" },
  ];
  return (
    <section className="tone-void relative min-h-svh overflow-hidden" aria-labelledby="hero-title">
      {/* Visual depth: three cropped project screens, revealed by clip-path, drifting at different speeds */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] grid-cols-3 grid-rows-[1fr] gap-3 pr-[var(--gutter)] pt-24 lg:grid" aria-hidden="true">
        {panels.map((p, i) => (
          <div key={p.src} className={`${p.mt} relative h-[78%]`} data-clip style={{ "--d": 200 + i * 180 } as React.CSSProperties}>
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute inset-x-0 -inset-y-[12%]" data-parallax={p.amt}>
                <Media src={p.src} alt="" sizes="16vw" priority className="grayscale-img opacity-70" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent lg:via-void/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" aria-hidden="true" />

      <div className="wrap relative z-10 flex min-h-svh flex-col justify-end pb-10 pt-32 sm:pb-14">
        <div className="mb-auto flex items-start justify-between pt-6 sm:pt-10">
          <p className="label label-y" data-reveal="fade">The Website Grove — Creative digital agency</p>
          <p className="label hidden text-ash sm:block" data-reveal="fade" style={{ "--d": 200 } as React.CSSProperties}>Bakersfield, CA<br />35.37°N 119.02°W</p>
        </div>

        <h1 id="hero-title" className="lines d-hero" data-lines style={{ fontSize: "clamp(3.4rem, 10.6vw, 12rem)" }}>
          <span className="line"><span style={{ "--i": 0 } as React.CSSProperties}>Digital<br className="sm:hidden" /><span className="max-sm:hidden"> </span>experiences.</span></span>
          <span className="line"><span style={{ "--i": 1 } as React.CSSProperties}>Built to <span className="text-signal">stand out.</span></span></span>
        </h1>

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lead text-paper/80 lg:col-span-5" delay={500}>
            The Website Grove is a creative digital agency combining distinctive design, powerful technology, and strategic thinking to build brands and websites with lasting impact.
          </Reveal>
          <Reveal className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-7" delay={650}>
            <Btn href="/portfolio" track="hero_explore_work">Explore Our Work</Btn>
            <Btn href="/contact" variant="ghost" track="hero_start_project">Start a Project</Btn>
          </Reveal>
          <Reveal className="hidden items-center justify-end gap-4 lg:col-span-1 lg:flex" delay={800} kind="fade">
            <span className="label text-ash [writing-mode:vertical-rl]">Scroll</span>
            <span className="relative block h-16 w-px overflow-hidden bg-paper/20"><span className="absolute inset-x-0 top-0 h-6 bg-signal [animation:scrollcue_2s_var(--ease-in-out)_infinite]" /></span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- INTRODUCTION --------------------------- */
export function Intro() {
  return (
    <section className="tone-light section" aria-labelledby="intro-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel n="01" className="mb-10">Agency</SectionLabel>
          <Lines as="h2" id="intro-title" className="d-xxl" lines={["We build what", <span key="b" className="relative inline-block">brands become.<span className="absolute -bottom-1 left-0 h-[.09em] w-full origin-left bg-signal" data-rule aria-hidden="true" style={{ "--d": 500 } as React.CSSProperties} /></span>]} />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:pt-28">
          <ScrollWords className="lead" text="We combine creativity, strategy, performance and long-term thinking, so the brands and websites we make don’t just look considered — they work harder for the business behind them." />
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/15 pt-6 label">
            {["Creativity", "Strategy", "Performance", "Long-term impact"].map((x) => <li key={x} className="flex items-center gap-2"><span className="size-2 bg-signal" aria-hidden="true" />{x}</li>)}
          </ul>
          <Reveal className="mt-10"><Btn href="/about">About the studio</Btn></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- SELECTED WORK ---------------------------- */
function Meta({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <p className="label mt-5 flex flex-wrap gap-x-3 gap-y-1 text-ash">
      <span className="text-paper">{p.industry}</span>
      {p.tags.map((t) => <span key={t}>/ {t}</span>)}
    </p>
  );
}
function Shot({ p, ratio = "aspect-[16/11]", priority }: { p: (typeof PROJECTS)[number]; ratio?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-ink ${ratio}`} data-clip>
      <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]">
        <Media src={p.image} alt={`${p.name} — ${p.industry} website design`} sizes="(min-width:1024px) 60vw, 100vw" priority={priority} />
      </div>
    </div>
  );
}

export function SelectedWork() {
  const [a, b, c] = PROJECTS;
  const strip = [PROJECTS[3], PROJECTS[4]];
  return (
    <>
      <section className="tone-dark section" aria-labelledby="work-title">
        <div className="wrap">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel n="02" className="mb-6">Selected work</SectionLabel>
              <Lines as="h2" id="work-title" className="d-xl" lines={["Work that", "speaks first."]} />
            </div>
            <Btn href="/portfolio" variant="ghost">All projects</Btn>
          </div>

          {/* Featured */}
          <Link href={`/portfolio/${a.slug}`} className="group block" data-cursor="VIEW">
            <Shot p={a} ratio="aspect-[4/3] sm:aspect-[16/8]" priority />
            <div className="mt-6 flex items-end justify-between gap-6">
              <div className="flex items-end gap-6">
                <span className="num text-[clamp(4rem,10vw,9rem)] text-signal">{a.number}</span>
                <div className="pb-2"><h3 className="d-xl transition-transform duration-500 group-hover:translate-x-3">{a.name}</h3><Meta p={a} /></div>
              </div>
              <Arrow className="mb-4 hidden size-12 text-signal sm:block" dir="up-right" />
            </div>
          </Link>

          {/* Alternating rows */}
          <div className="mt-28 grid gap-x-10 gap-y-24">
            {[b, c].map((p, i) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group grid items-end gap-6 lg:grid-cols-12" data-cursor="VIEW">
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}><Shot p={p} /></div>
                <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`}>
                  <span className="num text-[clamp(4rem,8vw,7rem)] text-signal">{p.number}</span>
                  <h3 className="d-lg mt-2 transition-transform duration-500 group-hover:translate-x-3">{p.name}</h3>
                  <Meta p={p} />
                  <span className="label mt-6 inline-flex items-center gap-2">View project <Arrow className="size-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed showcase */}
      <FilmStrip heading={<div className="flex flex-wrap items-end justify-between gap-4"><Lines as="h2" className="d-lg" lines={["More from the studio"]} /><Link href="/portfolio/web-design" className="label link-u">Web design gallery →</Link></div>}>
        {strip.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group relative block w-[78vw] shrink-0 snap-start sm:w-[52vw] lg:w-[34vw]" data-cursor="VIEW">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink"><Media src={p.image} alt={`${p.name} website design`} sizes="(min-width:1024px) 34vw, 78vw" className="transition-transform duration-[1.4s] group-hover:scale-105" /></div>
            <p className="d-md mt-4">{p.name}</p>
          </Link>
        ))}
        {COLLECTIONS[0].images.slice(0, 4).map((src, i) => (
          <Link key={src} href={`/portfolio/web-design#item-${i + 1}`} className="group relative block w-[78vw] shrink-0 snap-start sm:w-[52vw] lg:w-[34vw]" data-cursor="VIEW">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink"><Media src={src} alt={`Web design gallery piece ${i + 1}`} sizes="(min-width:1024px) 34vw, 78vw" pos="object-left" className="transition-transform duration-[1.4s] group-hover:scale-105" /></div>
            <p className="d-md mt-4">Web design — {String(i + 1).padStart(2, "0")}</p>
          </Link>
        ))}
      </FilmStrip>

      {/* Index with hover previews */}
      <section className="tone-void section-tight" aria-labelledby="index-title">
        <div className="wrap">
          <SectionLabel className="mb-8">Project index</SectionLabel>
          <h2 id="index-title" className="sr-only">Project index</h2>
          <WorkIndex items={PROJECTS.map((p) => ({ href: `/portfolio/${p.slug}`, n: p.number, title: p.name, meta: `${p.industry} / ${p.tags.join(" / ")}`, image: p.image }))} />
        </div>
      </section>
    </>
  );
}

/* ----------------------------- STATEMENT ----------------------------- */
export function Statement() {
  return (
    <section className="tone-signal relative overflow-hidden py-28 sm:py-44" aria-labelledby="statement">
      <div className="wrap">
        <p className="label mb-10">Our belief</p>
        <h2 id="statement" className="d-hero overflow-visible" style={{ fontSize: "clamp(3rem, 9.4vw, 10.5rem)" }}>
          <span className="block" data-scrub-x="2.5">Good design gets noticed.</span>
          <span className="my-4 block h-[3px] w-full bg-void sm:my-7" data-rule aria-hidden="true" />
          <span className="block" data-scrub-x="-2.5">Great design gets results.</span>
        </h2>
      </div>
    </section>
  );
}

/* ------------------------------ SERVICES ------------------------------ */
export function ServicesSection() {
  return (
    <section className="tone-void section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel n="03" className="mb-6">Services</SectionLabel>
            <Lines as="h2" id="services-title" className="d-xxl" lines={["What we do,", <span key="2" className="text-signal">end to end.</span>]} />
          </div>
          <Reveal className="lead text-paper/70 lg:col-span-4" delay={200}>Eight disciplines, one team — from the first sketch to a site that keeps working long after launch.</Reveal>
        </div>
        <ServiceIndex items={SERVICES.map((s) => ({ href: `/${s.slug}`, n: s.number, title: s.name, text: s.short, image: s.images[0], alt: s.name }))} />
      </div>
    </section>
  );
}

/* --------------------------- WHY TWG --------------------------- */
export function WhySection() {
  return (
    <section className="tone-light section overflow-hidden" aria-labelledby="why-title">
      <div className="wrap">
        <SectionLabel n="04" className="mb-6">Why The Website Grove</SectionLabel>
        <Lines as="h2" id="why-title" className="d-xxl max-w-[14ch]" lines={["Built differently,", "on purpose."]} />
        <ol className="mt-20">
          {WHY.map((w, i) => (
            <li key={w.t} className="relative border-t border-ink/20 py-9 last:border-b">
              <div className={`grid items-baseline gap-4 lg:grid-cols-12 ${i % 2 ? "lg:[&>*:nth-child(2)]:col-start-6" : ""}`}>
                <span className="num text-[clamp(3.5rem,8vw,7.5rem)] lg:col-span-2" aria-hidden="true">0{i + 1}</span>
                <h3 className="d-lg lg:col-span-5" data-reveal style={{ "--d": 80 } as React.CSSProperties}>{w.t}</h3>
                <p className="max-w-md text-graphite lg:col-span-4 lg:col-start-9" data-reveal style={{ "--d": 180 } as React.CSSProperties}>{w.d}</p>
              </div>
              <span className="absolute -bottom-px left-0 h-[3px] w-20 bg-signal" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ PROCESS ------------------------------ */
export function ProcessSection() {
  return (
    <section className="tone-dark section" aria-labelledby="process-title">
      <div className="wrap">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <Lines as="h2" id="process-title" className="d-xxl" lines={["How we work."]} />
          <Btn href="/process" variant="ghost">Full process</Btn>
        </div>
        <ProcessSticky steps={PROCESS_PHASES} />
      </div>
    </section>
  );
}

/* ---------------------------- CREDIBILITY ---------------------------- */
export function Credibility() {
  return (
    <section className="tone-white overflow-hidden" aria-labelledby="cred-title">
      <div className="wrap section-tight">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label label-y mb-6">Experience</p>
            <Lines as="h2" id="cred-title" className="d-xl" lines={["California-based.", "Globally minded."]} />
          </div>
          <Reveal className="lead text-graphite lg:col-span-4" delay={200}>Years of hands-on work across identity, web, commerce, search, social, content and motion — brought to every project in Bakersfield, across California and beyond.</Reveal>
        </div>
      </div>
      <div className="border-y border-ink/15 py-6 text-ink">
        <Marquee items={SERVICES.map((s) => s.name)} />
      </div>
    </section>
  );
}

/* ------------------------------ JOURNAL ------------------------------ */
export function JournalPreview() {
  return (
    <section className="tone-light section" aria-labelledby="journal-title">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="05" className="mb-6">Insights</SectionLabel>
            <Lines as="h2" id="journal-title" className="d-xl" lines={["From the journal."]} />
          </div>
          <Btn href="/insights" variant="ghost">All articles</Btn>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </div>
    </section>
  );
}
