import type { ServiceSlug } from "./services";

export type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: "Web Strategy" | "SEO" | "Branding" | "eCommerce";
  /** ISO date. Set to the launch of this redesign — editor to confirm before go-live. */
  date: string;
  readMinutes: number;
  excerpt: string;
  metaDescription: string;
  cover: string;
  coverAlt: string;
  service: ServiceSlug;
  body: Block[];
};

export const ARTICLES: Article[] = [
  {
    slug: "what-a-conversion-focused-website-needs",
    title: "What a conversion-focused website actually needs",
    category: "Web Strategy",
    date: "2026-10-12",
    readMinutes: 6,
    excerpt: "Before layouts and colours, a website needs a job. Here is how to decide what each page is for — and what to remove.",
    metaDescription: "A practical guide to planning a website that turns visitors into enquiries: page purpose, clear calls to action, speed and trust.",
    cover: "/work/adventure-gene-card.webp",
    coverAlt: "Full-page website design for Adventure Gene by The Website Grove",
    service: "web-design-development",
    body: [
      { t: "p", text: "Most websites are built backwards: someone picks a template, then fills it with whatever content fits. A conversion-focused site starts from the opposite end. It asks what a visitor needs to believe, know and do — and then designs the shortest honest path between arrival and action." },
      { t: "h2", text: "Give every page one job" },
      { t: "p", text: "A page that tries to inform, entertain, sell and capture contact details usually does none of them well. Decide the single action you want from each page: call, request a quote, read the next page, buy. Everything else on the page either supports that action or competes with it." },
      { t: "ul", items: ["Home page: help the right visitor recognise they're in the right place, and point them to the next step.", "Service page: explain the problem you solve, how you solve it, and what working with you looks like.", "Contact page: remove every obstacle between interest and a sent message."] },
      { t: "h2", text: "Say what you do in the first screen" },
      { t: "p", text: "People decide quickly whether a site is relevant. The first screen should state, in plain language, what you offer and who it's for. Clever taglines are fine as long as a plain sentence sits beside them." },
      { t: "h2", text: "Make the next step obvious — and repeat it" },
      { t: "p", text: "A call to action shouldn't appear once, hidden at the bottom. Place it where a decision naturally forms: after you've explained the service, after proof, and in the navigation. Use specific wording — 'Request a quote' says more than 'Submit'." },
      { t: "h2", text: "Earn trust with specifics" },
      { t: "p", text: "Real project work, clear pricing, a physical location and a phone number all signal that a business is real. Vague superlatives do the opposite. If you can show it, show it; if you can't verify a claim, don't make it." },
      { t: "h2", text: "Treat speed and mobile as part of the design" },
      { t: "p", text: "A beautiful page that loads slowly or cramps on a phone loses people before they read a word. Responsive layouts, properly sized images and lean code are design decisions, not technical afterthoughts." },
      { t: "h2", text: "Keep the form short" },
      { t: "p", text: "Ask only for what you need to respond well: a name, a way to reach them, what they're looking for. You can ask the rest in the first conversation." },
      { t: "quote", text: "A website converts when a visitor can see themselves in it, understand what happens next, and trust that it will happen." },
      { t: "h2", text: "A simple checklist before launch" },
      { t: "ul", items: ["Can a stranger tell what we do within five seconds?", "Does every page have one clear next step?", "Is every claim something we can stand behind?", "Does it work comfortably on a phone?", "Do we know how we'll find out whether it's working?"] },
    ],
  },
  {
    slug: "technical-seo-basics-before-you-publish-more-content",
    title: "Technical SEO basics to fix before you publish more content",
    category: "SEO",
    date: "2026-10-12",
    readMinutes: 6,
    excerpt: "New articles can't help if search engines struggle to crawl, understand or load your site. Start with these foundations.",
    metaDescription: "The technical SEO foundations — crawlability, structure, metadata, speed and mobile — to check before investing in new content.",
    cover: "/work/home-press-card.webp",
    coverAlt: "Full-page real estate website design for Home Press",
    service: "seo",
    body: [
      { t: "p", text: "It's tempting to respond to weak search visibility by publishing more. But content can only perform if search engines can find it, read it and trust the site it lives on. Technical SEO is the groundwork that lets everything else count." },
      { t: "h2", text: "Make sure search engines can crawl your site" },
      { t: "p", text: "Check that your robots.txt isn't blocking important sections, and that no page you want indexed carries a stray 'noindex' instruction. Submit an XML sitemap so search engines can discover your pages, and keep it limited to URLs you actually want found." },
      { t: "h2", text: "Give each page a clear identity" },
      { t: "ul", items: ["A unique title tag that describes the page and the search intent behind it.", "A meta description written for humans, since it often becomes your search snippet.", "One H1, followed by a logical hierarchy of subheadings.", "A canonical URL, so duplicates don't compete with each other."] },
      { t: "h2", text: "Fix the structure, not just the pages" },
      { t: "p", text: "Site architecture tells search engines which pages matter. Keep important pages within a few clicks of the home page, link between related pages with descriptive anchor text, and use sensible, readable URLs. When a URL has to change, use a permanent (301) redirect so existing visibility carries over." },
      { t: "h2", text: "Take speed and mobile seriously" },
      { t: "p", text: "Search engines evaluate how a page performs for real users. Compress and correctly size images, avoid unnecessary scripts, and make sure layouts don't jump while loading. Check your site on an actual phone — most of your visitors will be on one." },
      { t: "h2", text: "Clean up errors" },
      { t: "p", text: "Broken links and redirect chains waste crawl effort and frustrate visitors. A periodic audit that lists broken internal links, missing metadata and duplicate pages is one of the highest-value, lowest-glamour tasks in SEO." },
      { t: "h2", text: "Set up measurement" },
      { t: "p", text: "Connect Search Console and an analytics tool before you change anything, so you can see what moved and why. SEO is an ongoing process; without a baseline, you can't learn from it." },
      { t: "quote", text: "Content is the message. Technical SEO is whether the message can be delivered." },
    ],
  },
  {
    slug: "a-logo-is-not-a-brand",
    title: "A logo is not a brand: how to brief an identity project",
    category: "Branding",
    date: "2026-10-12",
    readMinutes: 5,
    excerpt: "The mark is the easy part to see and the smallest part of the work. What to decide before you ask a designer for anything.",
    metaDescription: "How to brief a logo or brand identity project: positioning, audience, tone and applications — before any design begins.",
    cover: "/legacy/branding-1.png",
    coverAlt: "Brand identity work by The Website Grove",
    service: "branding",
    body: [
      { t: "p", text: "A logo is the most visible piece of a brand, so it often gets all the attention. But a mark on its own can't tell people what you stand for. A brand is the consistent impression your business leaves across everything it does — and the brief you write determines how strong that impression can be." },
      { t: "h2", text: "Start with what you're not designing yet" },
      { t: "p", text: "Before anyone draws anything, answer a few questions in words. Who is this for? What do they need to feel when they encounter you? What do you do better or differently than the alternatives? A designer can make endless attractive marks; only your answers make one right." },
      { t: "h2", text: "What a useful brief includes" },
      { t: "ul", items: ["Your business in two sentences, as you'd explain it to a friend.", "Your audience: who they are and what they care about.", "Three to five words for how the brand should feel — and a few it should not.", "Examples you admire and, importantly, why.", "Where the identity will appear: signage, web, packaging, social, print."] },
      { t: "h2", text: "Think in systems, not artwork" },
      { t: "p", text: "A strong identity includes typography, a colour palette, layout habits and a way of using imagery. These let you create new materials in a consistent way without going back to a designer each time. A logo with no system tends to be applied inconsistently within months." },
      { t: "h2", text: "Test small, test simple" },
      { t: "p", text: "Before approving a mark, look at it very small, in one colour, on a dark background, and next to your competitors. A logo that only works in one perfect context isn't finished." },
      { t: "h2", text: "Plan the files and the rollout" },
      { t: "p", text: "Ask for final files in the formats you'll need — vector artwork for print and signage, optimized files for web and social — and decide in what order you'll update your touchpoints. A tidy rollout makes a new identity feel deliberate." },
      { t: "quote", text: "Design is how a brand looks. Branding is why it looks that way." },
    ],
  },
  {
    slug: "ecommerce-checkout-audit",
    title: "A practical audit for a leaky eCommerce checkout",
    category: "eCommerce",
    date: "2026-10-12",
    readMinutes: 5,
    excerpt: "Shoppers rarely abandon for one dramatic reason. Seven quiet frictions worth checking in your own store.",
    metaDescription: "A practical checklist of friction points in online store product pages, carts and checkout — and how to fix them.",
    cover: "/legacy/portfolio/ecommerce/1.jpg",
    coverAlt: "eCommerce storefront design by The Website Grove",
    service: "e-commerce",
    body: [
      { t: "p", text: "When an online store isn't converting, the temptation is to look for a single culprit. In practice, abandonment is usually death by a thousand small frictions. The fastest way to find them is to buy something from your own store — on a phone, on a slow connection, as if you'd never seen it before." },
      { t: "h2", text: "1. Product pages that don't answer the obvious questions" },
      { t: "p", text: "Clear photos, honest descriptions, sizes or specifications, delivery information and returns details should all be findable without hunting. If a customer has to leave the page to learn something, you may lose them." },
      { t: "h2", text: "2. Hidden costs" },
      { t: "p", text: "Unexpected shipping or fees introduced at the last step are a well-known reason people leave. Show the full cost as early as you reasonably can." },
      { t: "h2", text: "3. Forced account creation" },
      { t: "p", text: "Offering guest checkout removes a barrier for first-time buyers. You can invite them to create an account after they've paid." },
      { t: "h2", text: "4. Forms that fight the user" },
      { t: "ul", items: ["Ask only for what you need to fulfil the order.", "Use the right keyboard type for phone and email fields on mobile.", "Explain errors in plain language, next to the field that caused them."] },
      { t: "h2", text: "5. Limited or unclear payment options" },
      { t: "p", text: "Offer the payment methods your customers expect, and make it clear that the checkout is secure." },
      { t: "h2", text: "6. Slow pages and layout shift" },
      { t: "p", text: "Large unoptimized images and heavy scripts make stores feel unreliable. Buttons that jump as the page loads cause mis-taps. Performance is part of trust." },
      { t: "h2", text: "7. A search and navigation that can't find things" },
      { t: "p", text: "If shoppers know what they want but can't find it, they won't browse around — they'll leave. Check that your product search handles common wording and that categories match how customers think." },
      { t: "quote", text: "Don't ask 'why aren't they buying?' Ask 'what would make buying feel easy?'" },
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const ARTICLE_CATEGORIES = ["Web Strategy", "SEO", "Branding", "eCommerce"] as const;
export const ARTICLES_PER_PAGE = 6;
export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
