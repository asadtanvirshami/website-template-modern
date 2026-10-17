import Link from "next/link";
import { Arrow, Btn, JsonLd, Lines, Media, Reveal, SectionLabel } from "@/components/ui";
import { CtaBand, FaqSection, PageHero } from "@/components/ui/blocks";
import { ProcessSticky, ServiceIndex } from "@/components/motion/Scroll";
import { SERVICES } from "@/content/services";
import { PROCESS_PHASES, FAQS } from "@/content/copy";
import { PROJECTS } from "@/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Digital Agency Services in California | The Website Grove",
  description: "Web design and development, eCommerce, branding, logo design, SEO, social media marketing, video animation and content writing — all from one creative digital agency in Bakersfield, California.",
  path: "/services",
});

const GUIDE = [
  { need: "I need a website", slugs: ["web-design-development", "e-commerce"] },
  { need: "I need a brand people remember", slugs: ["logo-design", "branding"] },
  { need: "I need to be found", slugs: ["seo", "content-writing"] },
  { need: "I need to reach more people", slugs: ["social-media-marketing", "video-animation"] },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        kicker="Services"
        lines={["Everything your", <span key="2" className="text-signal">brand needs.</span>]}
        lead="Eight disciplines under one roof. Start with the one you need today — add the rest as you grow."
      />

      <section className="tone-light section-tight" aria-labelledby="guide-title">
        <div className="wrap">
          <SectionLabel n="01" className="mb-6">Find your fit</SectionLabel>
          <h2 id="guide-title" className="sr-only">Which service fits your needs</h2>
          <ul className="grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {GUIDE.map((g) => (
              <li key={g.need} className="bg-paper p-7">
                <p className="d-md">{g.need}</p>
                <ul className="mt-6 grid gap-2">
                  {g.slugs.map((slug) => {
                    const s = SERVICES.find((x) => x.slug === slug)!;
                    return <li key={slug}><Link href={`/${slug}`} className="group flex items-center justify-between border-t border-ink/15 py-3 transition-colors hover:text-graphite">{s.name}<Arrow className="size-4 transition-transform group-hover:translate-x-1" /></Link></li>;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tone-void section" aria-labelledby="index-title">
        <div className="wrap">
          <SectionLabel n="02" className="mb-6">The index</SectionLabel>
          <Lines as="h2" id="index-title" className="d-xl mb-14" lines={["All services"]} />
          <ServiceIndex items={SERVICES.map((s) => ({ href: `/${s.slug}`, n: s.number, title: s.name, text: s.short, image: s.images[0], alt: s.name }))} />
        </div>
      </section>

      <section className="tone-dark section-tight" aria-labelledby="rel-title">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Lines as="h2" id="rel-title" className="d-lg" lines={["Recent work"]} />
            <Btn href="/portfolio" variant="ghost">All projects</Btn>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link href={`/portfolio/${p.slug}`} className="group block" data-cursor="VIEW">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink" data-clip><div className="absolute inset-0"><Media src={p.image} alt={`${p.name} website design`} sizes="(min-width:768px) 30vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" /></div></div>
                  <p className="d-md mt-4">{p.name}</p><p className="label text-ash">{p.industry}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tone-void section" aria-labelledby="proc-title">
        <div className="wrap">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <Lines as="h2" id="proc-title" className="d-xl" lines={["One process,", "every service."]} />
            <Btn href="/process" variant="ghost">Full process</Btn>
          </div>
          <ProcessSticky steps={PROCESS_PHASES} />
        </div>
      </section>

      <FaqSection faqs={FAQS.general.slice(0, 6)} />
      <CtaBand lines={["Not sure where", "to start?"]} text="Tell us what you’re trying to achieve. We’ll recommend the right place to begin." label="Book a Consultation" />
    </>
  );
}
