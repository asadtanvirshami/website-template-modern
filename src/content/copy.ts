import type { FAQ } from "./services";

/** Global FAQ. Answers reflect published policies on pricing, terms and service pages. */
export const FAQS: Record<string, FAQ[]> = {
  general: [
    { q: "What services does The Website Grove offer?", a: "Web design and development, eCommerce development, branding and identity, logo design, search engine optimization, social media marketing, video animation and content writing. Many can be combined into one joined-up project." },
    { q: "How long does a project take?", a: "It depends on the service and package. Logo concepts are typically delivered within 2–3 days of order receipt (many packages list 24–48 hours), website packages list turnarounds from 48 hours to next-day delivery once content is supplied, and video animation runs from about four weeks. Tell us your deadline and we'll confirm what's realistic." },
    { q: "Do you build fully custom websites?", a: "Yes. Our larger website packages include custom pages, interactive design and custom development, and we can build on WordPress or a custom CMS. We design around your content and goals rather than starting from a template." },
    { q: "Do you offer SEO?", a: "Yes. SEO packages cover audit, keyword research, on-page and technical optimization, content, reporting and local listings. Good search foundations are also built into every website we make." },
    { q: "What size of business do you work with?", a: "Our published packages are designed for small businesses and start-ups, and we can quote larger or more complex projects individually. Describe your project in the inquiry form and we'll point you to the right scope." },
    { q: "How do we work together?", a: "We start by understanding your goals, then agree on a plan, design and build in stages, and share work for your feedback along the way. Our Process page walks through each stage." },
    { q: "How does pricing work?", a: "Our prices are published on the Pricing page, with inclusions and add-ons listed per package. Website packages are advertised with no monthly or hidden fees. For anything outside a package, request a quote." },
    { q: "Do you offer maintenance and support?", a: "Yes — we offer ongoing maintenance, updates and performance monitoring after launch. Ask about it when you request a quote." },
    { q: "What are the refund and revision terms?", a: "Revisions are unlimited and free as long as the design and concept stay the same, with a 48-hour turnaround. Refunds are subject to the conditions listed in our Terms & Conditions — please read them before ordering." },
    { q: "How do I get started?", a: "Send us a project inquiry, or email info@thewebsitegrove.com. Tell us what you're building and when you'd like it done." },
  ],
};

export const PROCESS_PHASES = [
  { n: "01", t: "Discover", d: "We start by understanding your business objectives, target audience, industry and competitors — the facts every good design decision depends on." },
  { n: "02", t: "Strategize", d: "We turn discovery into a plan: site architecture, user journeys, functionality and content structure, aligned to your goals." },
  { n: "03", t: "Design", d: "Clean layouts, clear navigation and consistent visual systems — designed for the end user and reviewed with you at each step." },
  { n: "04", t: "Develop", d: "Modern, scalable builds that prioritise performance, security and flexibility, with clean, maintainable code and the integrations you need." },
  { n: "05", t: "Launch & Evolve", d: "Rigorous testing across devices and browsers, a smooth launch, then ongoing maintenance and optimization as your business grows." },
];

/** Long-form process page content. */
export const PROCESS_DETAIL = [
  { t: "Discovery", d: "Every project begins with listening. We learn about your business, your customers and your competitors, and agree on what success looks like.", points: ["Goals and audience", "Competitor and market review", "Content and functionality requirements", "Timeline and budget alignment"] },
  { t: "Strategy", d: "Findings become a plan. We define the structure, journeys and priorities so that design and development have a clear purpose.", points: ["Site architecture and page plan", "User journeys and calls to action", "SEO foundations: keyword and intent mapping", "Scope and deliverables"] },
  { t: "Creative direction", d: "Before detailed design, we set the visual and verbal direction — typography, colour, imagery and tone — so every page feels like one brand.", points: ["Style direction and references", "Typography and colour", "Tone of voice", "Key layout concepts"] },
  { t: "Design", d: "We design every key screen across desktop, tablet and mobile, optimising flows to reduce friction and keep users oriented.", points: ["Wireframes and layouts", "UI design for each breakpoint", "Interaction and accessibility considerations", "Feedback and revisions"] },
  { t: "Development", d: "Approved designs become fast, responsive, maintainable websites and applications, integrated with the CMS, forms, payments and tools you need.", points: ["Responsive front-end build", "CMS and integrations", "Performance and security", "Technical SEO implementation"] },
  { t: "Quality assurance", d: "Before launch, we rigorously test functionality, compatibility, security and performance across devices and browsers.", points: ["Cross-device and cross-browser testing", "Forms, payments and flows", "Speed and accessibility checks", "Content proofreading"] },
  { t: "Launch", d: "A planned, error-free go-live — with redirects, analytics and search tools configured so that nothing you've built is lost.", points: ["Deployment", "Redirects and sitemap", "Analytics and Search Console", "Hand-over and walkthrough"] },
  { t: "Continuous improvement", d: "Our support doesn't end at launch. We offer ongoing maintenance, updates and performance monitoring, and refine based on how people use the site.", points: ["Maintenance and updates", "Performance monitoring", "SEO tracking and reporting", "New features and campaigns"] },
];

export const COLLAB = [
  { t: "What we'll do", d: "Share progress at clear milestones, explain our reasoning, and flag risks early." },
  { t: "What helps from you", d: "A clear brief, timely feedback and the content or assets you'd like included. Projects that go unresponsive for extended periods are subject to our Reactivation Policy." },
  { t: "Revisions", d: "Revisions are unlimited and free provided the design and concept stay the same, with a 48-hour turnaround per our Revision Policy." },
];

export const WHY = [
  { t: "Strategy before aesthetics", d: "We ask what a design needs to achieve before deciding how it should look." },
  { t: "Design engineered for performance", d: "Speed, responsiveness and search readiness are built in from the first line of code." },
  { t: "Custom solutions", d: "Sites built around your goals and content — not dropped into a template." },
  { t: "A collaborative process", d: "You're involved at every stage, with clear communication and honest feedback." },
  { t: "End-to-end capability", d: "Brand, web, commerce, search, social, content and motion under one roof." },
  { t: "A growth mindset", d: "Launch is a milestone, not the finish line. We stay available to refine and scale." },
];

export const VALUES = [
  { t: "Partnership", d: "We work with you, not at you. Your goals set the direction." },
  { t: "Meticulous process", d: "Details matter — in the pixels, the code and the plan." },
  { t: "Measurable growth", d: "We aim for work that you can see performing, and we report honestly." },
];

/**
 * Testimonials from the live site. They are attributed to generic names and two link to
 * themetorium.net (a WordPress-theme vendor), so they look like theme demo content.
 * They are NOT rendered until a real client approves them: set `approved: true`.
 */
export const TESTIMONIALS: { quote: string; name: string; role: string; approved: boolean }[] = [
  { quote: "Working with this team felt seamless from start to finish. Thoughtful execution, clear communication, and a result that genuinely elevated our brand.", name: "Daniel Wright", role: "Marketing Director", approved: false },
  { quote: "They understood our vision quickly and translated it into a digital experience that feels both refined and functional. The attention to detail was exceptional.", name: "Sarah Mitchell", role: "Founder", approved: false },
  { quote: "A rare balance of strategy, design, and technical precision. The final product performs beautifully and reflects our brand with clarity.", name: "Michael Chen", role: "Product Lead", approved: false },
  { quote: "Professional, composed, and deeply knowledgeable. Every interaction felt considered, and the outcome exceeded our expectations.", name: "James Robertson", role: "CEO", approved: false },
  { quote: "From concept to execution, the process was calm, structured, and efficient. The quality of work speaks for itself.", name: "Emily Parker", role: "Operations Manager", approved: false },
];
