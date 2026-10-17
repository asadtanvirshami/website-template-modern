import Link from "next/link";
import { Arrow, JsonLd, Lines, Media } from "@/components/ui";
import { ArticleCard, CtaBand, PageHero } from "@/components/ui/blocks";
import { ARTICLES, ARTICLES_PER_PAGE, ARTICLE_CATEGORIES, fmtDate } from "@/content/insights";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

type SP = Promise<{ category?: string; page?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SP }) {
  const { category, page } = await searchParams;
  const filtered = !!category || (page && page !== "1");
  return buildMetadata({
    title: "Insights | Web Design, SEO & Branding Journal | The Website Grove",
    description: "Practical articles on website strategy, technical SEO, branding and eCommerce from the team at The Website Grove.",
    path: "/insights",
    noindex: !!filtered,
  });
}

export default async function InsightsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const cat = ARTICLE_CATEGORIES.find((c) => c === sp.category);
  const list = ARTICLES.filter((a) => !cat || a.category === cat);
  const pages = Math.max(1, Math.ceil(list.length / ARTICLES_PER_PAGE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), pages);
  const [feature, ...rest] = list;
  const grid = (page === 1 ? rest : list).slice(page === 1 ? 0 : (page - 1) * ARTICLES_PER_PAGE, page === 1 ? ARTICLES_PER_PAGE - 1 : page * ARTICLES_PER_PAGE);
  const href = (p: number, c = cat) => `/insights?${[c ? `category=${encodeURIComponent(c)}` : "", p > 1 ? `page=${p}` : ""].filter(Boolean).join("&")}`.replace(/\?$/, "");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Insights" }]}
        kicker="Journal"
        lines={["Ideas worth", <span key="2" className="text-signal">acting on.</span>]}
        lead="Practical thinking on websites, search, branding and online stores."
      />

      <section className="tone-light section-tight" aria-label="Articles">
        <div className="wrap">
          <nav aria-label="Article categories" className="mb-14 flex flex-wrap gap-2">
            {[undefined, ...ARTICLE_CATEGORIES].map((c) => (
              <Link key={c ?? "all"} href={href(1, c)} aria-current={cat === c ? "true" : undefined} className={`label border px-4 py-2.5 transition-colors ${cat === c ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}>{c ?? "All"}</Link>
            ))}
          </nav>

          {list.length === 0 ? (
            <p className="lead">No articles in this category yet.</p>
          ) : (
            <>
              {page === 1 && feature && (
                <article className="group mb-20 grid gap-8 lg:grid-cols-12 lg:items-center">
                  <Link href={`/insights/${feature.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink lg:col-span-7" data-cursor="READ" aria-hidden="true" tabIndex={-1}>
                    <Media src={feature.cover} alt="" sizes="(min-width:1024px) 58vw, 100vw" priority className="transition-transform duration-[1.2s] group-hover:scale-105" />
                  </Link>
                  <div className="lg:col-span-5">
                    <p className="label flex gap-3 text-graphite"><span className="label-y">Featured</span><span>{feature.category}</span><time dateTime={feature.date}>{fmtDate(feature.date)}</time></p>
                    <h2 className="d-xl mt-5"><Link href={`/insights/${feature.slug}`} className="transition-colors hover:text-graphite">{feature.title}</Link></h2>
                    <p className="mt-5 max-w-md text-graphite">{feature.excerpt}</p>
                    <Link href={`/insights/${feature.slug}`} className="label mt-6 inline-flex items-center gap-2">Read article <Arrow className="size-4" /></Link>
                  </div>
                </article>
              )}
              {grid.length > 0 && <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">{grid.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>}
              {pages > 1 && (
                <nav aria-label="Pagination" className="mt-16 flex items-center justify-between border-t border-ink/20 pt-6">
                  {page > 1 ? <Link href={href(page - 1)} rel="prev" className="label link-u">← Previous</Link> : <span />}
                  <span className="label text-graphite">Page {page} of {pages}</span>
                  {page < pages ? <Link href={href(page + 1)} rel="next" className="label link-u">Next →</Link> : <span />}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
      <CtaBand lines={["Got a question", "we haven’t covered?"]} text="Ask us. We’re happy to talk through your project." label="Contact Us" />
    </>
  );
}
