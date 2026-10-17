import Link from "next/link";
import { Arrow, Btn, JsonLd, Lines, Media, Reveal } from "@/components/ui";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import PortfolioGrid, { type GridItem } from "@/components/portfolio/PortfolioGrid";
import { COLLECTIONS, FILTERS, PROJECTS } from "@/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portfolio | Web Design, Branding & Digital Projects | The Website Grove",
  description: "A showcase of websites, brand identities, logos, eCommerce stores and digital projects created by The Website Grove.",
  path: "/portfolio",
  image: "/work/adventure-gene-card.webp",
});

export default function PortfolioPage() {
  const spot = PROJECTS[0];
  const items: GridItem[] = [
    ...PROJECTS.map((p): GridItem => ({ href: `/portfolio/${p.slug}`, title: p.name, meta: `${p.industry} · ${p.tags.join(" / ")}`, image: p.image, cats: p.categories, kind: "project", aspect: "16 / 11", pos: "object-top" })),
    ...COLLECTIONS.flatMap((c) =>
      c.images.map((src, i): GridItem => ({ href: `/portfolio/${c.slug}#item-${i + 1}`, title: `${c.title} ${String(i + 1).padStart(2, "0")}`, meta: c.title, image: src, cats: [c.slug], kind: "gallery", aspect: c.slug === "web-design" || c.slug === "e-commerce" ? "4 / 3" : "1 / 1", pos: "object-center" }))
    ),
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Portfolio" }]}
        kicker="Portfolio — Creative projects"
        lines={["Work that", <span key="2" className="text-signal">speaks first.</span>]}
        lead="A showcase of websites and digital solutions built to elevate brands and drive growth."
      />

      <section className="tone-dark section-tight" aria-labelledby="spot-title">
        <div className="wrap">
          <p className="label label-y mb-6">Featured project</p>
          <Link href={`/portfolio/${spot.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-end" data-cursor="VIEW">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink lg:col-span-8" data-clip><div className="absolute inset-0"><Media src={spot.image} alt={`${spot.name} — featured project`} sizes="(min-width:1024px) 66vw, 100vw" priority className="transition-transform duration-[1.4s] group-hover:scale-[1.04]" /></div></div>
            <div className="lg:col-span-4">
              <span className="num text-8xl text-signal">{spot.number}</span>
              <h2 id="spot-title" className="d-xl mt-2 transition-transform duration-500 group-hover:translate-x-3">{spot.name}</h2>
              <p className="label mt-4 text-ash">{spot.industry} / {spot.tags.join(" / ")}</p>
              <span className="label mt-8 inline-flex items-center gap-2">View project <Arrow className="size-4" /></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="tone-light section" aria-labelledby="all-title">
        <div className="wrap">
          <Lines as="h2" id="all-title" className="d-xl mb-12" lines={["All projects"]} />
          <PortfolioGrid items={items} filters={FILTERS} />
        </div>
      </section>

      <CtaBand lines={["Your project", "could be next."]} text="Tell us what you’re building and we’ll show you how we’d approach it." />
    </>
  );
}
