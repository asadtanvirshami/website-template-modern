import Link from "next/link";
import { Btn, Lines } from "@/components/ui";
import { SERVICES } from "@/content/services";

export const metadata = { title: "Page not found | The Website Grove", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="tone-void flex min-h-svh items-center pb-20 pt-36" aria-labelledby="nf-title">
      <div className="wrap">
        <p className="label label-y mb-6">Error 404</p>
        <Lines as="h1" id="nf-title" className="d-hero" lines={["Lost", <span key="2" className="text-signal">in the grid.</span>]} />
        <p className="lead mt-8 max-w-lg text-paper/75">The page you’re looking for doesn’t exist or has moved. Try one of these instead.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Btn href="/">Back to home</Btn><Btn href="/contact" variant="ghost">Contact us</Btn></div>
        <ul className="label mt-14 flex flex-wrap gap-x-6 gap-y-2 text-ash">
          {[{ n: "Work", h: "/portfolio" }, { n: "Pricing", h: "/pricing" }, { n: "Insights", h: "/insights" }, ...SERVICES.map((s) => ({ n: s.name, h: `/${s.slug}` }))].map((l) => (
            <li key={l.h}><Link href={l.h} className="link-u">{l.n}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
