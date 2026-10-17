import { JsonLd, Lines } from "@/components/ui";
import { FaqSection, PageHero } from "@/components/ui/blocks";
import ContactForm from "@/components/forms/ContactForm";
import { FAQS } from "@/content/copy";
import { FULL_ADDRESS, SITE } from "@/content/site";
import { SERVICE_OPTIONS } from "@/lib/contact";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact The Website Grove | Start Your Project",
  description: "Tell us about your project. Contact The Website Grove in Bakersfield, California for web design, branding, SEO, social media marketing and more — send an inquiry.",
  path: "/contact",
});

type SP = Promise<{ service?: string; package?: string; project?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const service = SERVICE_OPTIONS.some((o) => o.value === sp.service) ? sp.service! : "";
  const pkg = (sp.package ?? "").slice(0, 120);
  const project = (sp.project ?? "").slice(0, 80);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        kicker="Contact — Project inquiry"
        lines={["Let’s make", <span key="2" className="text-signal">it happen.</span>]}
        lead="Tell us about your project — what you’re building, who it’s for and when you’d like it done. We’ll reply with a clear next step."
      />

      <section className="tone-dark section-tight" aria-labelledby="form-title">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="form-title" className="d-lg mb-10">Project inquiry</h2>
            <ContactForm initialService={service} initialPackage={pkg} initialProject={project} />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Direct contact">
            <div className="grid gap-10 lg:sticky lg:top-32">
              <div>
                <p className="label label-y">Talk to us</p>
                {/* <p className="mt-4"><a href={SITE.phone.href} className="d-md link-u" data-track="phone_click">{SITE.phone.display}</a></p> */}
                <p className="mt-4"><a href={`mailto:${SITE.email}`} className="link-u text-lg" data-track="email_click">{SITE.email}</a></p>
              </div>
              {/* <div>
                <p className="label label-y">Office</p>
                <address className="mt-4 not-italic text-paper/80">The Website Grove<br />{FULL_ADDRESS}</address>
              </div> */}
              <div>
                <p className="label label-y">Follow</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 label">
                  {SITE.social.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">{s.label}</a></li>)}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection faqs={FAQS.general.filter((f) => /started|pricing|long|refund/i.test(f.q))} tone="light" title={["Before you", "write."]} id="contact-faq" />

      <section className="tone-signal py-24 sm:py-32" aria-label="Closing statement">
        <div className="wrap">
          <Lines as="p" className="d-xl max-w-[18ch]" lines={["Good work starts with", "a good conversation."]} />
        </div>
      </section>
    </>
  );
}
