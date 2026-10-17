import Link from "next/link";
import { SERVICES } from "@/content/services";
import { SITE, NAV, FULL_ADDRESS } from "@/content/site";
import { Arrow, Lines, Reveal } from "@/components/ui";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="tone-void relative overflow-hidden" aria-label="Site footer">
      <div className="wrap pt-24 sm:pt-32">
        <div className="grid gap-12 border-b border-paper/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label label-y">The Website Grove</p>
            <Link href="/contact" className="group mt-5 block w-fit" data-cursor="START" data-track="footer_start_project">
              <Lines as="p" className="d-xl" lines={["Let’s make", <span key="2" className="text-signal">it happen <Arrow className="inline size-[.7em] align-baseline transition-transform duration-500 group-hover:translate-x-3" /></span>]} />
            </Link>
          </div>
          <Reveal className="lg:col-span-5 lg:pt-6" delay={150}>
            <p className="lead text-paper/75">
              The Website Grove is a creative digital agency in Bakersfield, California. We design and build brands, websites and digital marketing with lasting impact.
            </p>
            <address className="mt-8 grid gap-1 not-italic">
              {/* <a href={SITE.phone.href} className="link-u w-fit text-xl" data-track="phone_click">{SITE.phone.display}</a> */}
              <a href={`mailto:${SITE.email}`} className="link-u w-fit text-xl" data-track="email_click">{SITE.email}</a>
              {/* <span className="mt-2 text-ash">{FULL_ADDRESS}</span> */}
            </address>
          </Reveal>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer">
            <p className="label label-y">Navigate</p>
            <ul className="mt-5 grid gap-2.5">
              {[{ label: "Home", href: "/" }, ...NAV, { label: "Process", href: "/process" }].map((n) => (
                <li key={n.href}><Link href={n.href} className="link-u">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services" className="sm:col-span-1 lg:col-span-2">
            <p className="label label-y">Services</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}`} className="link-u">{s.name}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label label-y">Follow</p>
            <ul className="mt-5 grid gap-2.5">
              {SITE.social.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="select-none overflow-hidden whitespace-nowrap text-center font-display uppercase leading-[.78] text-paper/[.07]" style={{ fontSize: "min(24.5vw, 26rem)" }}>
        <span data-scrub-x="3" className="inline-block">Website<span className="text-signal/80">.</span>Grove</span>
      </div>

      <div className="wrap">
        <div className="label flex flex-col gap-3 border-t border-paper/15 py-6 text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="link-u">Privacy Policy</Link></li>
            <li><Link href="/terms" className="link-u">Terms &amp; Conditions</Link></li>
            <li><a href="/sitemap.xml" className="link-u">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
