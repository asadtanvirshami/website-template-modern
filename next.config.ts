import type { NextConfig } from "next";

/**
 * Redirect map. The live site's URLs are preserved as-is (/about, /branding, /e-commerce …),
 * so nothing indexed needs to move. These 301s only catch likely legacy / alternate spellings.
 */
const moved: [string, string][] = [
  ["/index", "/"], ["/home", "/"],
  ["/index.html", "/"], ["/about.html", "/about"], ["/contact.html", "/contact"], ["/pricing.html", "/pricing"], ["/portfolio.html", "/portfolio"],
  ["/about-us", "/about"], ["/contact-us", "/contact"],
  ["/privacy-policy", "/privacy"], ["/terms-and-conditions", "/terms"], ["/terms-conditions", "/terms"],
  ["/branding-identity", "/branding"], ["/ecommerce", "/e-commerce"], ["/web-design", "/web-design-development"], ["/logo", "/logo-design"],
];

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920], imageSizes: [96, 160, 256, 384], minimumCacheTTL: 60 * 60 * 24 * 30 },
  async redirects() { return moved.map(([source, destination]) => ({ source, destination, permanent: true })); },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ] }];
  },
};
export default config;
