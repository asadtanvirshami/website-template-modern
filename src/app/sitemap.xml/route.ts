import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { PORTFOLIO_SLUGS } from "@/content/projects";
import { ARTICLES } from "@/content/insights";

// Implemented as a route handler (not app/sitemap.ts) so it works from any checkout path.
export const dynamic = "force-static";

export function GET() {
  const entries: { p: string; pr: number; lm?: string }[] = [
    { p: "", pr: 1 },
    { p: "/about", pr: 0.7 }, { p: "/services", pr: 0.9 }, { p: "/portfolio", pr: 0.8 }, { p: "/pricing", pr: 0.8 },
    { p: "/contact", pr: 0.8 }, { p: "/process", pr: 0.6 }, { p: "/insights", pr: 0.6 },
    ...SERVICES.map((s) => ({ p: `/${s.slug}`, pr: 0.9 })),
    ...PORTFOLIO_SLUGS.map((s) => ({ p: `/portfolio/${s}`, pr: 0.6 })),
    ...ARTICLES.map((a) => ({ p: `/insights/${a.slug}`, pr: 0.6, lm: a.date })),
    { p: "/privacy", pr: 0.3 }, { p: "/terms", pr: 0.3 },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((e) => `  <url><loc>${SITE.url}${e.p}</loc>${e.lm ? `<lastmod>${e.lm}</lastmod>` : ""}<priority>${e.pr}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
