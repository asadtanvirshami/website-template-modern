import type { ServiceSlug } from "./services";

export type FilterId = "web-design" | "logo-design" | "branding" | "e-commerce" | "video-animation" | "social-media";

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "web-design", label: "Web Design" },
  { id: "e-commerce", label: "eCommerce" },
  { id: "logo-design", label: "Logo Design" },
  { id: "branding", label: "Branding" },
  { id: "video-animation", label: "Video Animation" },
  { id: "social-media", label: "Social Media" },
];

export type Project = {
  slug: string;
  number: string;
  name: string;
  industry: string;
  tags: string[];
  categories: FilterId[];
  services: ServiceSlug[];
  /** Full-page website screenshot (tall) */
  image: string;
  /** Pre-optimized full-page capture for the scroll viewer */
  full: string;
};

/**
 * Verified projects from the live site. Only name, industry, tags and the
 * supplied full-page screenshot are known. No challenge / outcome copy is
 * invented — the case-study template falls back to a showcase format.
 */
export const PROJECTS: Project[] = [
  { slug: "adventure-gene", number: "01", name: "Adventure Gene", industry: "Lifestyle", tags: ["Visual", "Branding"], categories: ["web-design", "branding"], services: ["web-design-development", "branding"], image: "/work/adventure-gene-card.webp", full: "/work/adventure-gene-full.webp" },
  { slug: "eduma", number: "02", name: "Eduma", industry: "Education / Learning", tags: ["Art Direction", "Visual"], categories: ["web-design"], services: ["web-design-development"], image: "/work/eduma-card.webp", full: "/work/eduma-full.webp" },
  { slug: "home-press", number: "03", name: "Home Press", industry: "Real Estate", tags: ["Real Estate", "Visual", "Branding"], categories: ["web-design", "branding"], services: ["web-design-development", "branding"], image: "/work/home-press-card.webp", full: "/work/home-press-full.webp" },
  { slug: "car-dealer", number: "04", name: "Car Dealer", industry: "Business", tags: ["Business", "Branding"], categories: ["web-design", "branding"], services: ["web-design-development", "branding"], image: "/work/car-dealer-card.webp", full: "/work/car-dealer-full.webp" },
  { slug: "fitwell", number: "05", name: "FitWell", industry: "Wellness", tags: ["Design", "Branding"], categories: ["web-design", "branding"], services: ["web-design-development", "branding"], image: "/work/fitwell-card.webp", full: "/work/fitwell-full.webp" },
];

export type Collection = {
  slug: FilterId;
  title: string;
  blurb: string;
  service: ServiceSlug;
  aspect: string; // css aspect-ratio for tiles
  images: string[];
};

const range = (dir: string, nums: number[]) => nums.map((n) => `/legacy/portfolio/${dir}/${n}.jpg`);

/** Gallery pieces from the live /portfolio page, grouped exactly as published. */
export const COLLECTIONS: Collection[] = [
  { slug: "web-design", title: "Web Design", blurb: "A selection of websites designed and built by The Website Grove.", service: "web-design-development", aspect: "2 / 1", images: range("webdesign", [1, 2, 3, 4, 5, 6]) },
  { slug: "e-commerce", title: "eCommerce", blurb: "Online store designs and storefront builds.", service: "e-commerce", aspect: "2 / 1", images: range("ecommerce", [1, 2, 3, 4, 5, 6]) },
  { slug: "logo-design", title: "Logo Design", blurb: "Logos and marks created for a range of businesses.", service: "logo-design", aspect: "1 / 1", images: range("logodesign", [2, 3, 4, 5, 6, 7]) },
  { slug: "branding", title: "Branding", blurb: "Identity and brand application work.", service: "branding", aspect: "1 / 1", images: range("branding", [1, 2, 3, 4, 5, 6]) },
  { slug: "video-animation", title: "Video Animation", blurb: "Frames from animated and motion projects.", service: "video-animation", aspect: "16 / 9", images: range("videoanimation", [1, 2, 3, 4, 5, 6]) },
  { slug: "social-media", title: "Social Media", blurb: "Social media creative and campaign designs.", service: "social-media-marketing", aspect: "800 / 734", images: range("social", [6, 7, 8, 9, 10, 11]) },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);
export const PORTFOLIO_SLUGS = [...PROJECTS.map((p) => p.slug), ...COLLECTIONS.map((c) => c.slug)];
