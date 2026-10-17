import Link from "next/link";
import { JsonLd, Lines } from "@/components/ui";
import { CtaBand, FaqSection, PageHero } from "@/components/ui/blocks";
import PricingExplorer from "@/components/pricing/PricingExplorer";
import { PACKAGE_COUNT, PRICING_CATEGORIES, PRICING_INTRO } from "@/content/pricing";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing & Packages | Web Design, Logo, SEO & More | The Website Grove",
  description: "Clear, published pricing for logo design, websites, eCommerce, SEO, social media marketing, video animation, content writing and more. Compare packages and request a quote.",
  path: "/pricing",
});

const FAQ = [
  { q: "Are there monthly or hidden fees on website packages?", a: "Our website packages are listed with “no monthly or any hidden fee”. Optional add-ons — such as extra pages, payment integration or a shopping cart — are priced separately and shown on each package." },
  { q: "Can I customise a package?", a: "Yes. Choose the closest package, then tell us what you’d change in your inquiry. We’ll confirm a clear quote before work starts." },
  { q: "What do the guarantees mean?", a: "Packages that mention satisfaction, unique-design or money-back guarantees are subject to the conditions in our Terms & Conditions, including the Refund Policy. Please read them before ordering." },
  { q: "How do I order?", a: "Select “Request a Quote” on any package — your selection carries into the inquiry form." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Pricing" }]}
        kicker={`Pricing — ${PACKAGE_COUNT} packages`}
        lines={["Affordable", <span key="2" className="text-signal">for everyone.</span>]}
        lead={PRICING_INTRO.body}
      />
      <section className="tone-light section-tight pb-40" aria-label="Packages">
        <div className="wrap">
          <PricingExplorer categories={PRICING_CATEGORIES} />
        </div>
      </section>

      <section className="tone-white section-tight" aria-labelledby="terms-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Lines as="h2" id="terms-title" className="d-lg lg:col-span-4" lines={["Transparent", "terms."]} />
          <div className="prose-ed text-graphite lg:col-span-7 lg:col-start-6">
            <p>Prices are shown in US dollars and reflect the packages currently published. Guarantees marked with an asterisk, and all refunds, revisions and delivery timelines, are governed by our <Link href="/terms" className="link-u text-ink">Terms &amp; Conditions</Link>.</p>
            <p>Services including Social Media, SEO, Domain Registration and Web Hosting are not eligible for refunds under those terms.</p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQ} tone="light" title={["Pricing,", "explained."]} id="pricing-faq" />
      <CtaBand lines={["Need something", "tailored?"]} text="If a package isn’t quite right, tell us what you need and we’ll put together a quote." label="Request a Quote" />
    </>
  );
}
