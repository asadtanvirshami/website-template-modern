import raw from "./data/services.raw.json";

export type FAQ = { q: string; a: string };
export type ServiceSlug =
  | "web-design-development"
  | "e-commerce"
  | "branding"
  | "logo-design"
  | "seo"
  | "social-media-marketing"
  | "video-animation"
  | "content-writing";

export type Service = {
  slug: ServiceSlug;
  number: string;
  name: string;
  /** Short label used in dense UI */
  label: string;
  /** One-line description used in indexes */
  short: string;
  variant: "web" | "commerce" | "brand" | "logo" | "seo" | "social" | "video" | "content";
  /** Live-site metadata, preserved */
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroLines: string[];
  heroSub: string;
  introHeading: string;
  intro: string;
  /** Preserved live copy: five capability blocks */
  blocks: { title: string; paras: string[] }[];
  problems: string[];
  deliverables: string[];
  toolsLabel: string;
  tools: string[];
  process: { t: string; d: string }[];
  why: { t: string; d: string }[];
  faqs: FAQ[];
  /** Hero / showcase images (real, from the legacy site) */
  images: string[];
  imageCaptions?: string[];
  pricingCategory: string;
  portfolioCollection: string | null;
  related: ServiceSlug[];
  localNote?: string;
};

type RawService = {
  metaTitle: string;
  metaDescription: string;
  introHeading: string;
  introText: string;
  blocks: { title: string; paras: string[] }[];
};
const R = raw as unknown as Record<string, RawService>;

const base = (slug: ServiceSlug) => ({
  metaTitle: R[slug].metaTitle.trim(),
  metaDescription: R[slug].metaDescription.trim(),
  introHeading: R[slug].introHeading,
  intro: R[slug].introText,
  blocks: R[slug].blocks,
});

export const SERVICES: Service[] = [
  {
    slug: "web-design-development",
    number: "01",
    name: "Web Design & Development",
    label: "Web",
    short: "Websites shaped around your strategy, then engineered to perform.",
    variant: "web",
    ...base("web-design-development"),
    heroKicker: "Web Design & Development",
    heroLines: ["Designing the", "future, line", "by line."],
    heroSub:
      "Custom-designed, responsive websites for businesses in Bakersfield, across California and beyond — built to engage visitors and turn traffic into enquiries.",
    problems: [
      "A website that looks dated or doesn't reflect how good your business actually is.",
      "Visitors who land, hesitate, and leave without contacting you.",
      "Pages that load slowly or break on phones and tablets.",
      "A site nobody on your team can edit without calling a developer.",
      "Content that search engines can't easily read, so the right customers never find you.",
    ],
    deliverables: [
      "Site architecture and page plan",
      "UI/UX design for desktop, tablet and mobile",
      "Responsive front-end build with clean, maintainable code",
      "WordPress or custom CMS set-up where the package includes it",
      "On-page SEO foundations: structure, metadata, sitemap",
      "Cross-device and cross-browser testing",
      "Deployment and launch support",
    ],
    toolsLabel: "Technologies",
    tools: ["WordPress & custom CMS", "HTML / CSS / JavaScript", "jQuery sliders & interactions", "Contact & booking forms", "Payment & cart integration", "Analytics & Search Console set-up"],
    process: [
      { t: "Discover", d: "Business goals, audience, competitors and the pages you actually need." },
      { t: "Design", d: "Wireframes, then full UI for every breakpoint — reviewed with you." },
      { t: "Build", d: "Responsive, accessible code, CMS and integrations." },
      { t: "Test", d: "Functionality, compatibility, security and speed across devices." },
      { t: "Launch & support", d: "Deployment, hand-over, and ongoing maintenance if you want it." },
    ],
    why: [
      { t: "Custom, not templated", d: "Layouts are designed around your content and customers." },
      { t: "Strategy first", d: "Every page has a job before it has a style." },
      { t: "Search-ready by default", d: "Clean structure and metadata are part of the build, not an add-on." },
      { t: "Clear packages", d: "Published pricing from $200, with add-ons listed up front." },
    ],
    faqs: [
      { q: "Do you build with WordPress?", a: "Yes. Several of our website packages include a WordPress CMS so your team can edit content. Larger packages offer custom CMS or admin panels." },
      { q: "How long does a website take?", a: "It depends on the package and page count. Our published packages list their turnaround — from 48 hours on smaller sites to next-day delivery on larger packages once content is supplied. Tell us your deadline in the inquiry and we'll confirm what's realistic." },
      { q: "Will my site work on mobile?", a: "Yes. Every website package is built to be mobile responsive, and we test across devices and browsers before launch." },
      { q: "Can you add more pages or features later?", a: "Yes. Additional pages, payment integration and shopping cart integration are listed as add-ons on our pricing page." },
      { q: "Do you offer ongoing support?", a: "We offer ongoing maintenance, updates and performance monitoring after launch. Ask about it when you request a quote." },
    ],
    images: ["/work/adventure-gene-card.webp", "/work/car-dealer-card.webp", "/work/home-press-card.webp", "/work/eduma-card.webp", "/work/fitwell-card.webp"],
    pricingCategory: "web",
    portfolioCollection: "web-design",
    related: ["e-commerce", "seo", "content-writing"],
    localNote: "Based in Bakersfield, we work with local businesses across Kern County and California — and with clients worldwide.",
  },
  {
    slug: "e-commerce",
    number: "02",
    name: "eCommerce Development",
    label: "eCommerce",
    short: "Thoughtful storefronts that make choosing and buying feel simple.",
    variant: "commerce",
    ...base("e-commerce"),
    heroKicker: "eCommerce Development",
    heroLines: ["From browsing", "to buying."],
    heroSub: "Online stores designed around how customers actually shop — clear product discovery, a frictionless checkout, and a back end you can run yourself.",
    problems: [
      "Shoppers add to cart but abandon at checkout.",
      "Products are hard to find, filter or compare on mobile.",
      "A store that can't grow past its first hundred products.",
      "Payment and shipping set-up that feels fragile.",
      "Product pages that don't build enough confidence to buy.",
    ],
    deliverables: [
      "Store architecture and category structure",
      "Product, category and checkout page design",
      "Cart, payment module and product search",
      "CMS / admin set-up for products and orders",
      "Responsive, mobile-first storefront build",
      "Testing of purchase flows before launch",
    ],
    toolsLabel: "Store capabilities",
    tools: ["Product & category management", "Mini-cart and full cart", "Payment gateway integration", "Product search", "Customer reviews", "Multi-currency (Elite package)"],
    process: [
      { t: "Plan the catalogue", d: "Products, categories, shipping and payment requirements." },
      { t: "Design the journey", d: "Discovery, product page, cart and checkout." },
      { t: "Build the store", d: "Storefront, CMS, payments and search." },
      { t: "Test the purchase", d: "Real purchase flows on real devices." },
      { t: "Launch & refine", d: "Go live, then tune based on how people shop." },
    ],
    why: [
      { t: "Conversion-minded design", d: "Layout and flow built to help people decide." },
      { t: "Scales with you", d: "Packages from 100 products up to unlimited categories." },
      { t: "Brand included", d: "The Elite package bundles the full branding set." },
      { t: "Dedicated team", d: "Packages include a dedicated designer and developer." },
    ],
    faqs: [
      { q: "How many products can my store hold?", a: "Our packages are scoped by catalogue size: up to 100 products, up to 500 products, or unlimited products and categories on the Elite package." },
      { q: "Which payment methods can you integrate?", a: "Every store package includes a payment module or payment gateway. Tell us the processor you prefer in your inquiry and we'll confirm integration." },
      { q: "Will customers be able to shop on their phones?", a: "Yes — mobile shopping is built in, and the Elite package is explicitly mobile responsive with multi-currency support." },
      { q: "Can I manage the store myself?", a: "Yes. Stores include a CMS so you can manage products, categories and content." },
    ],
    images: ["/legacy/portfolio/ecommerce/1.jpg", "/legacy/portfolio/ecommerce/2.jpg", "/legacy/portfolio/ecommerce/3.jpg", "/legacy/portfolio/ecommerce/4.jpg", "/legacy/portfolio/ecommerce/5.jpg", "/legacy/portfolio/ecommerce/6.jpg"],
    pricingCategory: "ecommerce",
    portfolioCollection: "e-commerce",
    related: ["web-design-development", "seo", "social-media-marketing"],
  },
  {
    slug: "branding",
    number: "03",
    name: "Branding & Identity",
    label: "Branding",
    short: "Distinctive visual systems built for every place your brand shows up.",
    variant: "brand",
    ...base("branding"),
    heroKicker: "Branding & Identity",
    heroLines: ["Your brand,", "amplified."],
    heroSub: "Intentional, story-driven brand identities that communicate credibility, purpose and value from the very first glance.",
    problems: [
      "Your business looks different on every channel.",
      "You look like your competitors — or worse, like a template.",
      "Nobody on the team can explain what the brand stands for.",
      "You have a logo but no system for using it.",
    ],
    deliverables: [
      "Brand positioning and creative direction",
      "Logo and visual identity",
      "Typography and colour systems",
      "Stationery and print collateral",
      "Social and digital brand applications",
      "Consistency guidance across channels",
    ],
    toolsLabel: "Brand applications",
    tools: ["Stationery & letterhead", "Brochures & flyers", "Posters & banners", "Social media designs", "Packaging & signage (Elite package)", "Vehicle and apparel graphics (Elite package)"],
    process: [
      { t: "Understand", d: "Your story, audience and what makes you different." },
      { t: "Position", d: "A clear brand idea to design from." },
      { t: "Design", d: "Identity, typography, colour and key applications." },
      { t: "Apply", d: "Stationery, digital and print touchpoints." },
      { t: "Hand over", d: "Final files and the guidance your team needs." },
    ],
    why: [
      { t: "Story before style", d: "The visual system follows a clear idea." },
      { t: "Built for every channel", d: "Identity designed to flex from favicon to signage." },
      { t: "Joined-up delivery", d: "Branding, web and marketing from one team." },
      { t: "You own it", d: "Ownership rights are listed with our packages." },
    ],
    faqs: [
      { q: "What's the difference between a logo and a brand identity?", a: "A logo is one mark. A brand identity is the whole system — logo, typography, colour, imagery, tone — that makes your business recognisable everywhere." },
      { q: "Can you design stationery and print materials too?", a: "Yes. Stationery, brochures, posters and banners are all available as packages on our pricing page." },
      { q: "Do you provide brand guidelines?", a: "We can document how your identity should be applied. Mention it in your inquiry so we scope it properly." },
      { q: "Can you handle my website and social media in the same style?", a: "Yes — that is the advantage of one team handling identity, web and marketing." },
    ],
    images: ["/legacy/branding-1.png", "/legacy/branding-2.jpg", "/legacy/branding-4.png", "/legacy/branding-5.jpg"],
    imageCaptions: ["Daily Spoon", "Visionary", "Stride", "Exhibit Club"],
    pricingCategory: "branding-print",
    portfolioCollection: "branding",
    related: ["logo-design", "web-design-development", "social-media-marketing"],
  },
  {
    slug: "logo-design",
    number: "04",
    name: "Logo Design",
    label: "Logo",
    short: "Marks with clarity, character, and room to grow.",
    variant: "logo",
    ...base("logo-design"),
    heroKicker: "Logo Design",
    heroLines: ["Visual identity,", "expertly crafted."],
    heroSub: "Custom logos that are distinctive, timeless and aligned with your business — designed to work from a favicon to a storefront.",
    problems: [
      "A logo that looks amateur, generic or too similar to a competitor's.",
      "A mark that falls apart at small sizes or in one colour.",
      "No usable files for print, web and social.",
      "Not sure which type of logo suits your business.",
    ],
    deliverables: [
      "Multiple original concepts, depending on package",
      "Revisions through to final approval",
      "Final files in the formats your package lists (AI, PSD, EPS, PNG, GIF, JPG, PDF)",
      "Optional stationery, favicon, social and icon designs",
      "Ownership rights as listed per package",
    ],
    toolsLabel: "Logo types",
    tools: ["Wordmarks", "Lettermarks", "Symbol & icon marks", "Combination marks", "Illustrative logos", "3D logos"],
    process: [
      { t: "Brief", d: "Your business, audience, competitors and taste." },
      { t: "Concepts", d: "Original directions presented for feedback." },
      { t: "Refine", d: "Revisions on the chosen concept." },
      { t: "Finalise", d: "Production files for print and digital." },
    ],
    why: [
      { t: "Original work", d: "Unique design is a stated guarantee on our larger packages." },
      { t: "Clear options", d: "Ten logo packages from $25 to $555." },
      { t: "Fast turnaround", d: "Many packages list 24–48 hour first concepts." },
      { t: "Full file set", d: "Gold and above include AI, PSD, EPS, PNG, GIF, JPG and PDF." },
    ],
    faqs: [
      { q: "How fast will I see logo concepts?", a: "Custom design orders are delivered by email within 2 to 3 days of order receipt, and several packages list a 24–48 hour turnaround. A rush option for first logo samples within 24 hours is available for an extra $100." },
      { q: "How many revisions do I get?", a: "It depends on the package: Bronze includes 3 revisions, Silver 5, and Gold and above are unlimited, provided the design and concept stay the same." },
      { q: "Do I own the logo?", a: "Gold and higher logo packages list 100% ownership rights among their features. See each package and our Terms & Conditions for the full details." },
      { q: "What if I'm not happy?", a: "Please read the Refund Policy in our Terms & Conditions — refunds are subject to defined conditions." },
    ],
    images: ["/legacy/logo-1.jpg", "/legacy/logo-2.png", "/legacy/logo-3.jpg", "/legacy/logo-4.png", "/legacy/logo-5.jpg"],
    imageCaptions: ["Clara Coffee", "Journey State", "Kraken", "Wise Relations", "Svenn"],
    pricingCategory: "logo",
    portfolioCollection: "logo-design",
    related: ["branding", "web-design-development", "content-writing"],
  },
  {
    slug: "seo",
    number: "05",
    name: "Search Engine Optimization",
    label: "SEO",
    short: "Search foundations, content structure, and ongoing optimization.",
    variant: "seo",
    ...base("seo"),
    heroKicker: "Search Engine Optimization",
    heroLines: ["Rank higher.", "Grow faster."],
    heroSub: "SEO as a long-term growth strategy: research, on-page and technical work, and honest reporting — for businesses in Bakersfield and beyond.",
    problems: [
      "Your site doesn't show up for the searches your customers make.",
      "You're not sure what is blocking your rankings.",
      "Content isn't aligned to what people are actually searching for.",
      "No clear reporting on whether SEO work is helping.",
    ],
    deliverables: [
      "Website audit and SEO roadmap",
      "Keyword research, grouping and mapping",
      "On-page optimization: titles, meta descriptions, headings, internal links",
      "Technical review: sitemap, robots, redirects, broken links",
      "Content and copy for target pages",
      "Analytics and Search Console set-up",
      "Reporting and recommendations",
    ],
    toolsLabel: "Channels & focus areas",
    tools: ["Technical SEO", "On-page optimization", "Keyword & intent research", "Content strategy", "Local listings & directories", "Link building"],
    process: [
      { t: "Audit", d: "Where the site stands technically and in search." },
      { t: "Research", d: "Keywords, intent and competitors." },
      { t: "Optimize", d: "On-page, technical and content improvements." },
      { t: "Build authority", d: "Off-page work and local presence." },
      { t: "Report & refine", d: "Track, learn and adjust." },
    ],
    why: [
      { t: "Strategy over tricks", d: "Long-term visibility, not quick fixes." },
      { t: "Built into design", d: "SEO is part of how we build sites, not an afterthought." },
      { t: "Transparent reporting", d: "You always know what was done and why." },
      { t: "Defined scopes", d: "Three published packages with clear deliverables." },
    ],
    faqs: [
      { q: "How long does SEO take to work?", a: "SEO is an ongoing process rather than a one-time task. Results build over time as technical fixes, content and authority work compound, and we report on progress as we go." },
      { q: "Do you offer local SEO?", a: "Our SEO packages include local listings and directory work. If you serve customers in Bakersfield or elsewhere in California, mention it so we can plan for it." },
      { q: "Can you guarantee rankings?", a: "Search rankings depend on factors outside any agency's control, so we focus on transparent work and reporting. Note that SEO services are not eligible for refunds under our Terms & Conditions." },
      { q: "Do you write the content too?", a: "Yes — SEO packages include keyword-targeted page copy, and our Content Writing service covers ongoing articles and blogs." },
    ],
    images: [],
    pricingCategory: "seo",
    portfolioCollection: null,
    related: ["content-writing", "web-design-development", "social-media-marketing"],
    localNote: "We're based in Bakersfield, California, and help local and regional businesses be found by the customers searching for them.",
  },
  {
    slug: "social-media-marketing",
    number: "06",
    name: "Social Media Marketing",
    label: "Social",
    short: "Content, campaigns, and community that move audiences to act.",
    variant: "social",
    ...base("social-media-marketing"),
    heroKicker: "Social Media Marketing",
    heroLines: ["Be seen.", "Be shared."],
    heroSub: "Strategy, creative and campaign management that help you show up consistently and turn followers into customers.",
    problems: [
      "Posting is inconsistent — or has stopped altogether.",
      "Content doesn't look like your brand.",
      "Ad spend with no clear structure or reporting.",
      "Comments and messages go unanswered.",
    ],
    deliverables: [
      "Platform strategy and monthly content plan",
      "Posts, graphics, carousels and reels",
      "Scheduling and account set-up (including Meta Business Manager)",
      "Paid campaign set-up and monitoring",
      "Community management on higher tiers",
      "Reporting and optimization",
    ],
    toolsLabel: "Platforms",
    tools: ["Facebook", "Instagram", "TikTok", "LinkedIn", "X (Twitter)", "Pinterest", "Snapchat"],
    process: [
      { t: "Strategise", d: "Audience, platforms and content pillars." },
      { t: "Create", d: "Copy, design and video for each post." },
      { t: "Publish", d: "Scheduled, consistent posting." },
      { t: "Promote", d: "Paid campaigns where they make sense." },
      { t: "Measure", d: "Analytics, reporting and adjustment." },
    ],
    why: [
      { t: "A full team", d: "Copywriter, designer, ads expert and account manager on every plan." },
      { t: "Creative that fits your brand", d: "Designed in your identity, not a generic template." },
      { t: "Three clear plans", d: "From $500 to $2,100 per month, with deliverables listed." },
      { t: "Joined-up with web", d: "Social, site and search working together." },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Depending on the plan: Facebook and Instagram on Simple Start, adding TikTok or LinkedIn on Essentials, and up to seven platforms on Business Plan." },
      { q: "Do you run paid ads?", a: "Yes. Plans include ad campaign set-up and management, scaling from one campaign per month to unlimited campaigns." },
      { q: "Is social media marketing refundable?", a: "Per our Terms & Conditions, Social Media services are not entitled to refunds. Please review the Refund Policy before ordering." },
      { q: "Can you also make the content?", a: "Yes. Posts, graphics, carousels and reels are included in each plan's monthly deliverables." },
    ],
    images: ["/legacy/social-1.png", "/legacy/social-2.png", "/legacy/social-3.jpg", "/legacy/social-4.png"],
    pricingCategory: "social",
    portfolioCollection: "social-media",
    related: ["content-writing", "branding", "seo"],
  },
  {
    slug: "video-animation",
    number: "07",
    name: "Video Animation",
    label: "Video",
    short: "Explainers, promos, and motion graphics that make ideas memorable.",
    variant: "video",
    ...base("video-animation"),
    heroKicker: "Video Animation",
    heroLines: ["Stories", "in motion."],
    heroSub: "From concept and script to storyboard and final animation — video that simplifies complex messages and leaves an impression.",
    problems: [
      "Your product or service is hard to explain in a paragraph.",
      "You need a promo video but no production team.",
      "Existing video feels flat or doesn't match your brand.",
      "You're unsure how long a video should be or what it should say.",
    ],
    deliverables: [
      "Concept and professional script",
      "Storyboard",
      "Custom artwork and animation",
      "Voice-over and sound effects",
      "Revisions and final video files",
    ],
    toolsLabel: "Formats",
    tools: ["Explainer videos", "Promotional videos", "Logo animation", "Motion graphics", "Teasers (15 seconds)", "Videos up to 120 seconds"],
    process: [
      { t: "Concept", d: "Goal, audience, message and tone." },
      { t: "Script", d: "A tight script written for the screen." },
      { t: "Storyboard", d: "Every scene planned before production." },
      { t: "Animate", d: "Artwork, motion, voice-over and sound." },
      { t: "Deliver", d: "Revisions and final files in all formats." },
    ],
    why: [
      { t: "End-to-end", d: "Script, storyboard, animation and sound in one package." },
      { t: "Six clear lengths", d: "15-second teasers to 120-second videos." },
      { t: "Dedicated team", d: "Start-Up, Gold and Platinum packages include a dedicated team." },
      { t: "File ownership", d: "Ownership rights and all file formats are included on those packages." },
    ],
    faqs: [
      { q: "How long does an animated video take?", a: "Timelines are listed per package — for example 4 weeks for a 60-second Start-Up video and 4–5 weeks for Gold and Platinum. Longer productions take longer." },
      { q: "Do you write the script?", a: "Yes. A professional script, sample theme and storyboard are part of the packages." },
      { q: "Is voice-over included?", a: "Yes — professional voice-over and sound effects are included in the packages." },
      { q: "What video lengths are available?", a: "Our published packages run from 15 seconds up to 120 seconds." },
    ],
    images: ["/legacy/portfolio/videoanimation/1.jpg", "/legacy/portfolio/videoanimation/2.jpg", "/legacy/portfolio/videoanimation/3.jpg", "/legacy/portfolio/videoanimation/4.jpg", "/legacy/portfolio/videoanimation/5.jpg", "/legacy/portfolio/videoanimation/6.jpg"],
    pricingCategory: "video",
    portfolioCollection: "video-animation",
    related: ["social-media-marketing", "branding", "content-writing"],
  },
  {
    slug: "content-writing",
    number: "08",
    name: "Content Writing",
    label: "Content",
    short: "Clear, persuasive copy for websites, blogs, and campaigns.",
    variant: "content",
    ...base("content-writing"),
    heroKicker: "Content Writing",
    heroLines: ["Your message,", "perfectly", "expressed."],
    heroSub: "Strategic content that informs, engages and converts — written to sound like you and to be found by the people who need you.",
    problems: [
      "Website copy that says a lot and persuades little.",
      "No time to write the blog or article you keep planning.",
      "Messaging that changes tone from page to page.",
      "Content that isn't structured for search.",
    ],
    deliverables: [
      "Website and landing page copy",
      "Articles and blog posts",
      "Creative and long-form writing",
      "Infographic copy",
      "SEO-aware structure and keywords",
      "Editing and refinement",
    ],
    toolsLabel: "Formats",
    tools: ["Web content", "Articles", "Blog posts", "Creative writing", "Infographic copy", "Landing page copy"],
    process: [
      { t: "Brief", d: "Audience, goals, tone and keywords." },
      { t: "Outline", d: "Structure before sentences." },
      { t: "Write", d: "Industry-aware professional writers." },
      { t: "Edit", d: "Refine for clarity, tone and consistency." },
      { t: "Deliver", d: "Final copy ready to publish." },
    ],
    why: [
      { t: "Industry-aware writers", d: "Packages are matched to your sector." },
      { t: "Search-minded", d: "Written with how people search in mind." },
      { t: "Consistent voice", d: "One tone across site, social and print." },
      { t: "Simple pricing", d: "Per-page rates are published up front." },
    ],
    faqs: [
      { q: "How is content writing priced?", a: "Packages are priced per page or per piece — for example article and blog writing from $55 per page, infographics from $155, and web content from $249." },
      { q: "How many words per page?", a: "Package word counts are listed — typically 250–300 words per page, and 120 words per infographic. Longer pieces can be quoted." },
      { q: "Can you write for my industry?", a: "Our packages include industry-specific writers. Share your sector in the inquiry." },
      { q: "Can content be optimized for SEO?", a: "Yes. We write with keywords and structure in mind, and pair naturally with our SEO service." },
    ],
    images: ["/legacy/content-1.png", "/legacy/content-2.jpg", "/legacy/content-3.jpg", "/legacy/content-4.jpg", "/legacy/content-5.png"],
    pricingCategory: "content",
    portfolioCollection: null,
    related: ["seo", "web-design-development", "social-media-marketing"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
