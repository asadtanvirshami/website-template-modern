import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Arrow, Btn, Breadcrumbs, JsonLd, Lines, Media, Reveal, SectionLabel } from "@/components/ui";
import { CtaBand, FaqSection } from "@/components/ui/blocks";
import ServiceVisual from "@/components/services/ServiceVisual";
import { SERVICES, SERVICE_SLUGS, getService } from "@/content/services";
import { PRICING_CATEGORIES } from "@/content/pricing";
import { COLLECTIONS, PROJECTS } from "@/content/projects";
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICE_SLUGS.map((service) => ({ service }));

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = getService(service);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/${s.slug}`, image: s.images[0] });
}

const d = (n: number) => ({ "--d": n } as CSSProperties);

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = getService(service);
  if (!s) notFound();

  const cat = PRICING_CATEGORIES.find((c) => c.id === s.pricingCategory);
  const teaser = cat ? [...cat.packages].sort((a, b) => a.priceNumber - b.priceNumber).slice(0, 3) : [];
  const collection = COLLECTIONS.find((c) => c.slug === s.portfolioCollection);
  const related = s.related.map((r) => SERVICES.find((x) => x.slug === r)!);
  const inquiry = (pkg?: string) => `/contact?service=${s.slug}${pkg ? `&package=${encodeURIComponent(pkg)}` : ""}`;

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/${s.slug}` }]), serviceJsonLd(s.name, s.metaDescription, `/${s.slug}`)]} />

      {/* 1 — Hero */}
      <section className="tone-void relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44" aria-labelledby="svc-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className={s.variant === "seo" || s.variant === "content" ? "lg:col-span-6" : "lg:col-span-7"}>
            <div className="mb-10"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.name }]} /></div>
            <p className="label label-y mb-6" data-reveal="fade">{s.number} — {s.heroKicker}</p>
            <Lines as="h1" id="svc-title" className="d-xxl" lines={s.heroLines.map((l, i) => (i === s.heroLines.length - 1 ? <span key={i} className="text-signal">{l}</span> : l))} />
            <Reveal className="lead mt-8 text-paper/75" delay={350}>{s.heroSub}</Reveal>
            <Reveal className="mt-10 flex flex-wrap gap-3" delay={500}>
              <Btn href={inquiry()} track="service_request_quote">Request a Quote</Btn>
              <Btn href="/portfolio" variant="ghost">See All Projects</Btn>
            </Reveal>
          </div>
          <div className={s.variant === "seo" || s.variant === "content" ? "lg:col-span-6" : "lg:col-span-5"}><ServiceVisual s={s} /></div>
        </div>
      </section>

      {/* 2 — Overview */}
      <section className="tone-light section" aria-labelledby="overview-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel n="01" className="mb-8">Overview</SectionLabel>
            <Lines as="h2" id="overview-title" className="d-xl" lines={[s.introHeading]} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal className="lead">{s.intro}</Reveal>
            {s.localNote && <Reveal className="mt-6 border-l-4 border-signal pl-4 text-graphite" delay={150}>{s.localNote}</Reveal>}
            <Reveal className="mt-8 flex flex-wrap gap-3" delay={250}>
              <Btn href="/contact">Get in Touch</Btn>
              <Btn href={inquiry()} variant="ghost">Request a Quote Now</Btn>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Problems */}
      <section className="tone-white section-tight" aria-labelledby="problems-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel n="02" className="mb-6">The problem</SectionLabel>
            <Lines as="h2" id="problems-title" className="d-lg" lines={["Sound", "familiar?"]} />
          </div>
          <ul className="lg:col-span-8">
            {s.problems.map((p, i) => (
              <li key={i} className="flex gap-5 border-t border-ink/15 py-5 text-[clamp(1.1rem,1.7vw,1.5rem)] leading-snug last:border-b" data-reveal style={d(i * 70)}>
                <span className="label pt-1.5 text-graphite">0{i + 1}</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — Core capabilities (preserved live copy) */}
      <section className="tone-dark section" aria-labelledby="cap-title">
        <div className="wrap">
          <SectionLabel n="03" className="mb-6">Core capabilities</SectionLabel>
          <Lines as="h2" id="cap-title" className="d-xl mb-16" lines={["What we do", <span key="b" className="text-signal">in detail.</span>]} />
          <ol>
            {s.blocks.map((b, i) => (
              <li key={b.title} className="grid gap-6 border-t border-paper/15 py-10 lg:grid-cols-12 last:border-b">
                <span className="num text-[clamp(3rem,6vw,5.5rem)] text-signal lg:col-span-2" aria-hidden="true">0{i + 1}</span>
                <h3 className="d-lg lg:col-span-4" data-reveal>{b.title}</h3>
                <div className="space-y-4 text-paper/75 lg:col-span-5 lg:col-start-8" data-reveal style={d(120)}>
                  {b.paras.map((p, k) => <p key={k}>{p}</p>)}
                  <Link href={inquiry()} className="label link-u inline-flex items-center gap-2 text-paper">Let’s connect <Arrow className="size-4" /></Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Deliverables + tools */}
      <section className="tone-light section" aria-labelledby="deliver-title">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel n="04" className="mb-6">Deliverables</SectionLabel>
            <Lines as="h2" id="deliver-title" className="d-lg mb-10" lines={["What you", "receive."]} />
            <ul className="grid gap-0">
              {s.deliverables.map((x, i) => (
                <li key={i} className="flex items-start gap-4 border-t border-ink/15 py-4 last:border-b" data-reveal style={d(i * 60)}>
                  <span className="mt-2 size-2.5 shrink-0 bg-signal" aria-hidden="true" />{x}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label mb-6 text-graphite">{s.toolsLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {s.tools.map((t) => <li key={t} className="border border-ink/25 px-4 py-2 text-sm">{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 — Process */}
      <section className="tone-void section-tight" aria-labelledby="proc-title">
        <div className="wrap">
          <SectionLabel n="05" className="mb-6">Process</SectionLabel>
          <Lines as="h2" id="proc-title" className="d-lg mb-12" lines={["How it comes together."]} />
          <ol className="grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
            {s.process.map((p, i) => (
              <li key={p.t} className="bg-void p-6">
                <span className="num text-4xl text-signal">0{i + 1}</span>
                <h3 className="d-md mt-4">{p.t}</h3>
                <p className="mt-3 text-sm text-paper/70">{p.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8"><Link href="/process" className="label link-u inline-flex items-center gap-2">Our full process <Arrow className="size-4" /></Link></p>
        </div>
      </section>

      {/* 7 — Packages + related work */}
      {teaser.length > 0 && (
        <section className="tone-white section" aria-labelledby="pk-title">
          <div className="wrap">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel n="06" className="mb-6">Packages</SectionLabel>
                <Lines as="h2" id="pk-title" className="d-lg" lines={["Clear pricing,", "from the start."]} />
              </div>
              <Btn href={`/pricing#${s.pricingCategory}`} variant="ghost">All {cat!.label} packages</Btn>
            </div>
            <ul className="grid gap-px bg-ink/15 md:grid-cols-3">
              {teaser.map((p) => (
                <li key={p.id} className="flex flex-col justify-between gap-8 bg-white p-7">
                  <div>
                    <p className="label text-graphite">{p.name}</p>
                    <p className="num mt-3 text-6xl">{p.price}</p>
                    <p className="mt-3 text-graphite">{p.tagline}</p>
                  </div>
                  <Link href={inquiry(p.name)} className="label link-u inline-flex w-fit items-center gap-2" data-track="package_request_quote">Request a quote <Arrow className="size-4" /></Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(collection || s.variant === "seo" || s.variant === "content") && (
        <section className="tone-dark section" aria-labelledby="work-title">
          <div className="wrap">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <Lines as="h2" id="work-title" className="d-lg" lines={["Related work"]} />
              <Btn href={collection ? `/portfolio/${collection.slug}` : "/portfolio"} variant="ghost">{collection ? `${collection.title} gallery` : "All projects"}</Btn>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {collection
                ? collection.images.slice(0, 3).map((src, i) => (
                    <li key={src}>
                      <Link href={`/portfolio/${collection.slug}#item-${i + 1}`} className="group block" data-cursor="VIEW">
                        <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: collection.aspect }} data-clip><div className="absolute inset-0"><Media src={src} alt={`${collection.title} work ${i + 1}`} sizes="(min-width:768px) 30vw, 100vw" pos="object-center" className="transition-transform duration-[1.2s] group-hover:scale-105" /></div></div>
                      </Link>
                    </li>
                  ))
                : PROJECTS.slice(0, 3).map((p) => (
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
      )}

      {/* 8 — Why */}
      <section className="tone-light section" aria-labelledby="why-title">
        <div className="wrap">
          <SectionLabel n="07" className="mb-6">Why The Website Grove</SectionLabel>
          <Lines as="h2" id="why-title" className="d-lg mb-12" lines={["Why teams choose us."]} />
          <ul className="grid gap-x-10 gap-y-0 md:grid-cols-2">
            {s.why.map((w, i) => (
              <li key={w.t} className="border-t border-ink/15 py-8" data-reveal style={d(i * 80)}>
                <h3 className="d-md">{w.t}</h3>
                <p className="mt-3 max-w-md text-graphite">{w.d}</p>
              </li>
            ))}
          </ul>
          <p className="label mt-10 text-graphite">Also explore:{" "}
            {related.map((r, i) => <span key={r.slug}><Link href={`/${r.slug}`} className="link-u text-ink">{r.name}</Link>{i < related.length - 1 ? " · " : ""}</span>)}
          </p>
        </div>
      </section>

      {/* 9 — FAQ */}
      <FaqSection faqs={s.faqs} jsonLd title={["Common", "questions."]} id={`faq-${s.slug}`} />

      {/* 10 — CTA */}
      <CtaBand lines={["Start your", `${s.label} project.`]} text={`Tell us about your project and we’ll come back with a clear next step.`} label="Request a Quote" href={inquiry()} accent={s.name} />
    </>
  );
}
