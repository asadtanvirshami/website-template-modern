import raw from "./data/pricing.raw.json";

export type PackageGroup = { heading: string | null; items: string[] };
export type Package = {
  id: string;
  category: string;
  name: string;
  price: string;
  priceNumber: number;
  tagline: string;
  groups: PackageGroup[];
  /** True when the package text mentions a money-back / refund guarantee. Used to
   *  show a pointer to the Refund Policy, since terms must be verified before display. */
  mentionsGuarantee: boolean;
};

export type PricingCategory = {
  id: string;
  label: string;
  blurb: string;
  serviceHref: string | null;
  packages: Package[];
};

const META: Record<string, { label: string; blurb: string; serviceHref: string | null; order: number }> = {
  logo: { label: "Logo Design", blurb: "From a quick start to illustrative and 3D marks.", serviceHref: "/logo-design", order: 1 },
  web: { label: "Website Design", blurb: "Responsive websites from a three-page start-up site to a fully custom build.", serviceHref: "/web-design-development", order: 2 },
  ecommerce: { label: "eCommerce", blurb: "Online stores sized by catalogue.", serviceHref: "/e-commerce", order: 3 },
  seo: { label: "SEO", blurb: "Campaign set-up, optimization and reporting.", serviceHref: "/seo", order: 4 },
  social: { label: "Social Media Marketing", blurb: "Monthly content and campaign plans.", serviceHref: "/social-media-marketing", order: 5 },
  video: { label: "Video Animation", blurb: "Scripted, storyboarded, animated video.", serviceHref: "/video-animation", order: 6 },
  content: { label: "Content Writing", blurb: "Per-page and per-piece writing.", serviceHref: "/content-writing", order: 7 },
  "branding-print": { label: "Branding & Print", blurb: "Stationery, brochures, posters and banners.", serviceHref: "/branding", order: 8 },
  apps: { label: "App Development", blurb: "Mobile application builds by scope.", serviceHref: null, order: 9 },
};

const LABEL_TO_ID: Record<string, string> = {
  "logo design": "logo",
  "web design": "web",
  "Application Development": "apps",
  "video animation": "video",
  "E-commerce": "ecommerce",
  Branding: "branding-print",
  SEO: "seo",
  "Stationery Design": "branding-print",
  "Content Writing": "content",
  "Banner & Poster": "branding-print",
  "Social Media Marketing": "social",
};

// Fix only obvious typos in package *names*; offer content is left untouched.
const NAME_FIX: Record<string, string> = { "Start-Up<": "Start-Up", Essentails: "Essentials" };

const tidyName = (n: string) => {
  const fixed = NAME_FIX[n] ?? n;
  return fixed
    .split(" ")
    .map((w) => (w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w) && !/\d/.test(w) ? w[0] + w.slice(1).toLowerCase() : w))
    .join(" ");
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const byId = new Map<string, PricingCategory>();
for (const cat of (raw as { cats: { label: string; packages: { name: string; price: string; tagline: string; groups: PackageGroup[] }[] }[] }).cats) {
  const id = LABEL_TO_ID[cat.label];
  const meta = META[id];
  if (!byId.has(id)) byId.set(id, { id, label: meta.label, blurb: meta.blurb, serviceHref: meta.serviceHref, packages: [] });
  for (const p of cat.packages) {
    const name = tidyName(p.name);
    const all = p.groups.flatMap((g) => g.items).join(" ").toLowerCase();
    byId.get(id)!.packages.push({
      id: `${id}-${slug(cat.label)}-${slug(name)}`,
      category: id,
      name,
      price: p.price,
      priceNumber: Number(p.price.replace(/[^0-9.]/g, "")),
      tagline: p.tagline,
      groups: p.groups,
      mentionsGuarantee: /money\s?-?back|guarantee/.test(all),
    });
  }
}

export const PRICING_CATEGORIES: PricingCategory[] = [...byId.values()].sort((a, b) => META[a.id].order - META[b.id].order);
export const PRICING_INTRO = {
  heading: "Affordable pricing, clearly listed.",
  body: "Every package below is published with its inclusions and add-ons. Choose a category, compare packages side by side, then request a quote — your selection carries into the inquiry form.",
};
export const PACKAGE_COUNT = PRICING_CATEGORIES.reduce((n, c) => n + c.packages.length, 0);
export const findPackage = (id: string) => PRICING_CATEGORIES.flatMap((c) => c.packages).find((p) => p.id === id);
