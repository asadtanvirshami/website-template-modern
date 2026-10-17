import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Arrow, Btn, JsonLd, Lines, Media, Reveal, SectionLabel } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { ScreenshotPan } from "@/components/motion/Scroll";
import { COLLECTIONS, PORTFOLIO_SLUGS, PROJECTS, getCollection, getProject } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { dimsOf } from "@/lib/media";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => PORTFOLIO_SLUGS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (p) {
    return buildMetadata({
      title: `${p.name} — ${p.industry} Website Design | The Website Grove`,
      description: `${p.name}: a ${p.industry.toLowerCase()} website design project by The Website Grove. ${p.tags.join(", ")}.`,
      path: `/portfolio/${p.slug}`,
      image: p.image,
    });
  }
  const c = getCollection(slug);
  if (c) return buildMetadata({ title: `${c.title} Portfolio | The Website Grove`, description: `${c.blurb} Browse ${c.title.toLowerCase()} work from The Website Grove.`, path: `/portfolio/${c.slug}`, image: c.images[0] });
  return {};
}

const d = (n: number) => ({ "--d": n } as CSSProperties);

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const collection = getCollection(slug);
  if (!project && !collection) notFound();
  if (project) return <ProjectView slug={slug} />;
  return <CollectionView slug={slug} />;
}

/* ------------------------------ CASE STUDY ------------------------------ */
function ProjectView({ slug }: { slug: string }) {
  const p = getProject(slug)!;
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const others = PROJECTS.filter((x) => x.slug !== slug).slice(0, 3);
  const [w, h] = dimsOf(p.full);
  const svcs = p.services.map((s) => SERVICES.find((x) => x.slug === s)!);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: p.name, path: `/portfolio/${p.slug}` }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Portfolio", href: "/portfolio" }, { name: p.name }]}
        kicker={`${p.number} — ${p.industry}`}
        lines={[p.name]}
        lead={<>{p.tags.map((t, i) => <span key={t} className="label mr-4 inline-block border border-paper/30 px-3 py-1.5">{t}</span>)}</>}
      />

      {/* Hero image */}
      <section className="tone-void pb-24" aria-label={`${p.name} preview`}>
        <div className="wrap">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/8]" data-clip>
            <div className="absolute inset-0"><div className="absolute inset-x-0 -inset-y-[8%]" data-parallax="0.06"><Media src={p.image} alt={`${p.name} — homepage design`} sizes="100vw" priority /></div></div>
          </div>
        </div>
      </section>

      {/* Meta + overview */}
      <section className="tone-light section" aria-labelledby="overview-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="grid gap-6 lg:sticky lg:top-32">
              {[
                ["Project", p.name],
                ["Industry", p.industry],
                ["Disciplines", p.tags.join(" / ")],
                ["Format", "Website design"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-ink/20 pt-4"><dt className="label text-graphite">{k}</dt><dd className="d-md mt-1">{v}</dd></div>
              ))}
              <div className="border-t border-ink/20 pt-4">
                <dt className="label text-graphite">Related services</dt>
                <dd className="mt-2 grid gap-1">{svcs.map((s) => <Link key={s.slug} href={`/${s.slug}`} className="link-u w-fit">{s.name}</Link>)}</dd>
              </div>
            </dl>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <SectionLabel n="01" className="mb-6">Overview</SectionLabel>
            <Lines as="h2" id="overview-title" className="d-lg" lines={["A closer look."]} />
            <div className="prose-ed mt-8 text-lg">
              <p data-reveal>{p.name} is a {p.industry.toLowerCase()} project from our portfolio, shown here with its full-page homepage design. Scroll to explore the layout from header to footer.</p>
              <p data-reveal style={d(100)}>Want to know how this project was approached — the brief, the decisions and the outcome? Ask us and we’ll walk you through it, and share what’s relevant to your own project.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal style={d(200)}>
              <Btn href={`/contact?service=web-design-development&project=${p.slug}`}>Ask about this project</Btn>
              <Btn href="/pricing" variant="ghost">See pricing</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Full-page scroll */}
      <section className="tone-dark section" aria-label={`${p.name} full-page design`}>
        <div className="wrap">
          <p className="label label-y mb-8">Full page — scroll to explore</p>
          <ScreenshotPan src={p.full} alt={`${p.name} full-page website design`} w={w} h={h} name={p.name} />
        </div>
      </section>

      {/* Next project */}
      <section className="tone-void" aria-labelledby="next-title">
        <Link href={`/portfolio/${next.slug}`} className="group relative block overflow-hidden" data-cursor="NEXT">
          <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60"><Media src={next.image} alt="" sizes="100vw" gray /></div>
          <div className="wrap relative py-28 sm:py-40">
            <p className="label label-y">Next project</p>
            <h2 id="next-title" className="d-hero mt-4 transition-transform duration-700 group-hover:translate-x-4" style={{ fontSize: "clamp(3.5rem,11vw,12rem)" }}>{next.name} <Arrow className="inline size-[.6em] text-signal" /></h2>
          </div>
        </Link>
      </section>

      <section className="tone-light section-tight" aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title" className="d-lg mb-10">More projects</h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/portfolio/${o.slug}`} className="group block" data-cursor="VIEW">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink"><Media src={o.image} alt={`${o.name} website design`} sizes="(min-width:768px) 30vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" /></div>
                  <p className="d-md mt-4">{o.name}</p><p className="label text-graphite">{o.industry}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lines={["Like what", "you see?"]} text="Let’s talk about what we could build for you." label="Book a Consultation" href="/contact?service=web-design-development" />
    </>
  );
}

/* ------------------------------ GALLERY ------------------------------ */
function CollectionView({ slug }: { slug: string }) {
  const c = getCollection(slug)!;
  const i = COLLECTIONS.findIndex((x) => x.slug === slug);
  const next = COLLECTIONS[(i + 1) % COLLECTIONS.length];
  const svc = SERVICES.find((s) => s.slug === c.service)!;
  const wide = c.aspect === "2 / 1" || c.aspect === "16 / 9";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: c.title, path: `/portfolio/${c.slug}` }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Portfolio", href: "/portfolio" }, { name: c.title }]}
        kicker="Portfolio collection"
        lines={[c.title]}
        lead={c.blurb}
      />
      <section className="tone-dark pb-24 sm:pb-32" aria-label={`${c.title} gallery`}>
        <div className="wrap">
          <ul className={`grid gap-5 ${wide ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {c.images.map((src, n) => (
              <li key={src} id={`item-${n + 1}`} className="scroll-mt-28">
                <figure>
                  <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: c.aspect }} data-clip><div className="absolute inset-0"><Media src={src} alt={`${c.title} work ${n + 1}`} sizes="(min-width:1024px) 40vw, 100vw" pos="object-center" priority={n < 2} /></div></div>
                  <figcaption className="label mt-3 flex justify-between text-ash"><span>{c.title}</span><span>{String(n + 1).padStart(2, "0")} / {String(c.images.length).padStart(2, "0")}</span></figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex flex-wrap gap-3">
            <Btn href={`/${svc.slug}`}>Explore {svc.name}</Btn>
            <Btn href={`/pricing#${svc.pricingCategory}`} variant="ghost">View pricing</Btn>
          </div>
        </div>
      </section>
      <section className="tone-void" aria-labelledby="next-title">
        <Link href={`/portfolio/${next.slug}`} className="group block" data-cursor="NEXT">
          <div className="wrap py-24 sm:py-32">
            <p className="label label-y">Next collection</p>
            <h2 id="next-title" className="d-xxl mt-4 transition-transform duration-700 group-hover:translate-x-4">{next.title} <Arrow className="inline size-[.6em] text-signal" /></h2>
          </div>
        </Link>
      </section>
      <CtaBand lines={["Let’s make your", "next project."]} href={`/contact?service=${svc.slug}`} />
    </>
  );
}
