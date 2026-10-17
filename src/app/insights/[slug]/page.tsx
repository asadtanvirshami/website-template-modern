import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Breadcrumbs, JsonLd, Lines, Media } from "@/components/ui";
import { ArticleCard, CtaBand } from "@/components/ui/blocks";
import { ARTICLES, fmtDate, getArticle, type Block } from "@/content/insights";
import { SERVICES } from "@/content/services";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return buildMetadata({ title: `${a.title} | The Website Grove`, description: a.metaDescription, path: `/insights/${a.slug}`, image: a.cover, type: "article", publishedTime: a.date });
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        if (b.t === "h2") return <h2 key={i} id={slugify(b.text)}>{b.text}</h2>;
        if (b.t === "p") return <p key={i} className="mb-5">{b.text}</p>;
        if (b.t === "ul") return <ul key={i} className="mb-5 grid gap-2">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
        return <blockquote key={i}>{b.text}</blockquote>;
      })}
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const toc = a.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const svc = SERVICES.find((s) => s.slug === a.service)!;

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: a.title, path: `/insights/${a.slug}` }]), articleJsonLd({ title: a.title, description: a.metaDescription, path: `/insights/${a.slug}`, date: a.date, image: a.cover })]} />
      <article>
        <header className="tone-void pb-16 pt-36 sm:pt-44">
          <div className="wrap">
            <div className="mb-10"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }, { name: a.category }]} /></div>
            <p className="label mb-6 flex flex-wrap gap-3"><span className="label-y">{a.category}</span><time dateTime={a.date} className="text-ash">{fmtDate(a.date)}</time><span className="text-ash">{a.readMinutes} min read</span></p>
            <Lines as="h1" className="d-xl max-w-[20ch]" lines={[a.title]} />
            <p className="lead mt-8 text-paper/75">{a.excerpt}</p>
          </div>
        </header>
        <div className="tone-void pb-20"><div className="wrap"><div className="relative aspect-[16/8] overflow-hidden bg-ink" data-clip><div className="absolute inset-0"><Media src={a.cover} alt={a.coverAlt} sizes="100vw" priority pos="object-top" /></div></div></div></div>

        <div className="tone-white section-tight">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <nav aria-label="Table of contents" className="sticky top-32">
                <p className="label label-y mb-4">In this article</p>
                <ol className="grid gap-3 text-sm">
                  {toc.map((t) => <li key={t.text}><a href={`#${slugify(t.text)}`} className="text-graphite transition-colors hover:text-ink">{t.text}</a></li>)}
                </ol>
              </nav>
            </aside>
            <div className="lg:col-span-7 lg:col-start-5"><Body blocks={a.body} />
              <aside className="mt-16 border-t-4 border-signal bg-paper p-8">
                <p className="label text-graphite">Related service</p>
                <h2 className="d-lg mt-2">{svc.name}</h2>
                <p className="mt-3 max-w-md text-graphite">{svc.short}</p>
                <Link href={`/${svc.slug}`} className="btn mt-6">Explore the service <Arrow /></Link>
              </aside>
            </div>
          </div>
        </div>
      </article>

      <section className="tone-light section-tight" aria-labelledby="rel-title">
        <div className="wrap">
          <h2 id="rel-title" className="d-lg mb-10">Keep reading</h2>
          <div className="grid gap-12 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
        </div>
      </section>
      <CtaBand lines={["Put it into", "practice."]} text={`Talk to us about ${svc.name.toLowerCase()} for your business.`} href={`/contact?service=${svc.slug}`} />
    </>
  );
}
