import type { Metadata } from "next";
import { SITE } from "@/content/site";

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE.url}${path === "/" ? "" : path}`);

type Opts = { title: string; description: string; path: string; image?: string; type?: "website" | "article"; noindex?: boolean; publishedTime?: string };

export function buildMetadata({ title, description, path, image, type = "website", noindex, publishedTime }: Opts): Metadata {
  const ogImage = image ? abs(image) : abs("/work/og-default.jpg");
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(path) },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: abs(path),
      siteName: SITE.name,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export const orgJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: abs("/legacy/logo-dark.png"),
  image: abs("/legacy/logo-dark.png"),
  description: SITE.description,
  // telephone: SITE.phone.display,
  email: SITE.email,
  // address: {
  //   "@type": "PostalAddress",
  //   streetAddress: SITE.address.street,
  //   addressLocality: SITE.address.city,
  //   addressRegion: SITE.address.region,
  //   ...(SITE.address.postalCode ? { postalCode: SITE.address.postalCode } : {}),
  //   addressCountry: SITE.address.country,
  // },
  areaServed: [{ "@type": "State", name: "California" }],
  sameAs: SITE.social.map((s) => s.href),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceJsonLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: abs(path),
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: { "@type": "State", name: "California" },
});

export const articleJsonLd = (a: { title: string; description: string; path: string; date: string; image: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  dateModified: a.date,
  image: abs(a.image),
  mainEntityOfPage: abs(a.path),
  author: { "@type": "Organization", name: SITE.name },
  publisher: { "@id": `${SITE.url}/#organization` },
});
