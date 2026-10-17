/** Shared (client + server) inquiry schema, options and validation. */
export const SERVICE_OPTIONS = [
  { value: "web-design-development", label: "Web Design & Development" },
  { value: "e-commerce", label: "eCommerce Development" },
  { value: "branding", label: "Branding & Identity" },
  { value: "logo-design", label: "Logo Design" },
  { value: "seo", label: "Search Engine Optimization" },
  { value: "social-media-marketing", label: "Social Media Marketing" },
  { value: "video-animation", label: "Video Animation" },
  { value: "content-writing", label: "Content Writing" },
  { value: "app-development", label: "App Development" },
  { value: "other", label: "Something else / not sure yet" },
] as const;

export const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"] as const;
export const TIMELINES = ["As soon as possible", "Within 1 month", "1 – 3 months", "Flexible"] as const;

export type Inquiry = {
  name: string; email: string; phone?: string; company?: string; website?: string;
  service: string; package?: string; project?: string; budget?: string; timeline?: string;
  message: string; consent: boolean;
};
export type Errors = Partial<Record<keyof Inquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: Partial<Inquiry>): Errors {
  const e: Errors = {};
  const s = (x: unknown) => (typeof x === "string" ? x.trim() : "");
  if (s(v.name).length < 2) e.name = "Please enter your name.";
  else if (s(v.name).length > 120) e.name = "That name is too long.";
  if (!EMAIL.test(s(v.email)) || s(v.email).length > 200) e.email = "Please enter a valid work email address.";
  if (s(v.phone) && !/^[+()\d\s.-]{7,25}$/.test(s(v.phone))) e.phone = "Please enter a valid phone number.";
  if (s(v.website)) {
    try { const u = new URL(/^https?:\/\//i.test(s(v.website)) ? s(v.website) : "https://" + s(v.website)); if (!u.hostname.includes(".")) throw 0; }
    catch { e.website = "Please enter a valid website address."; }
  }
  if (!SERVICE_OPTIONS.some((o) => o.value === s(v.service))) e.service = "Please choose a service.";
  if (s(v.message).length < 10) e.message = "Please tell us a little about your project (at least 10 characters).";
  else if (s(v.message).length > 5000) e.message = "Please keep your message under 5,000 characters.";
  if (v.consent !== true) e.consent = "Please agree so we can respond to your inquiry.";
  return e;
}
