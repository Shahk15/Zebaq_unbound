// ─────────────────────────────────────────────────────────────
// ZEBAQ v2 — all homepage copy lives here. Edit words here, not in components.
// Sections follow the approved homepage order (01–16).
// `verify: true` marks anything that needs sign-off before launch
// (a small red "verify" tag shows next to it in `npm run dev` only).
// This file is also read by vite.config.ts to build the JSON-LD schema,
// so keep it free of browser-only imports.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "ZEBAQ",
  url: "https://zebaqweb.com",
  email: "peppy.reply@zebaqweb.com",
  bookingUrl: "#contact", // swap for a Calendly / HubSpot meetings link
  leadEndpoint: "", // or set VITE_LEAD_ENDPOINT in .env to POST leads to a CRM / webhook
  positioning: "AI, Growth, Creative & Technology Solutions Partner",
  tagline: "AI-driven solutions. Human-led strategies.",
  description:
    "ZEBAQ is an AI, growth, creative and technology solutions partner for business owners, marketing agencies, B2B companies, consultants and coaches. We combine customized AI capabilities with experienced people across AI search visibility, B2B prospecting, web development, performance marketing, social media, video, automation and dedicated teams.",
  offices: [
    { entity: "Zebaq LLC", city: "London", country: "UK", address: "128 City Road, London, EC1V 2NX" },
    { entity: "Zebaq LTD", city: "Irving, Texas", country: "USA", address: "9603 Valley Ranch Parkway, East Irving, TX 75063" },
    { entity: "Zebaq PVT LTD", city: "Bhubaneswar", country: "India", address: "HIG-147, Lumbini Vihar, Bhubaneswar, Odisha 751021" },
  ],
};

// 01 Header & Navigation
export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Who We Help", href: "#who" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
export const NAV_CTA = "Book a Strategy Call";

// 02 Hero
export const HERO = {
  eyebrow: SITE.positioning,
  h1: ["AI-Driven Solutions.", "Human-Led Strategies."],
  h1Tail: "Built Around Your Business.",
  sub: "Customized AI capabilities guided by experienced people.",
  primary: "Discuss Your Business Goals",
  secondary: "Explore Our Services",
  hint: "Move your cursor — light the marble",
};

// 03 Client Logo Wall
export const LOGOS_TITLE = "Trusted by Brands Across Industries";
// Industries served — confirm list before launch (current site states 48+ sectors)
export const INDUSTRIES_VERIFY = true;
export const INDUSTRIES = [
  "Luxury & Jewellery", "E-commerce & Retail", "Education & EdTech", "Insurance & Finance",
  "Hospitality & Nightlife", "Travel & Tourism", "Transport & Logistics", "Real Estate",
  "Healthcare & Dental", "Legal & Professional Services", "SaaS & Technology", "Food & Restaurants",
  "Beauty & Wellness", "Home Services", "Automotive", "Events & Entertainment",
];
// Add as many logos as you like — the wall is an endless marquee.
// tone: "light" = white/pale artwork (shown on a dark tile); "dark" = dark artwork (shown on a white tile)

export const LOGOS: readonly { src: string; alt: string; tone: "normal" | "light" }[] = [
  { src: "/images/clientslogo/abest.png", alt: "A-Best Insurance", tone: "normal" },
  { src: "/images/clientslogo/americancups.png", alt: "American Cups", tone: "normal" },
  { src: "/images/clientslogo/artistryrecords.png", alt: "Artistry Records", tone: "normal" },
  { src: "/images/clientslogo/bigmadre.png", alt: "Big Madre", tone: "normal" },
  { src: "/images/clientslogo/bubbletail.png", alt: "Bubble Tail", tone: "normal" },
  { src: "/images/clientslogo/chicoschoice.png", alt: "Chicos Choice", tone: "normal" },
  { src: "/images/clientslogo/Chikopokopo.png", alt: "Chikopokopo", tone: "normal" },
  { src: "/images/clientslogo/cogleus.png", alt: "Cogle US", tone: "normal" },
  { src: "/images/clientslogo/collibet.png", alt: "Collibet", tone: "normal" },
  { src: "/images/clientslogo/destination%20360.png", alt: "Destination 360", tone: "normal" },
  { src: "/images/clientslogo/DFWLImO.png", alt: "DFW Limo", tone: "normal" },
  { src: "/images/clientslogo/gladwyns.png", alt: "Gladwyns", tone: "normal" },
  { src: "/images/clientslogo/homedecor.png", alt: "Home Decor", tone: "normal" },
  { src: "/images/clientslogo/honeylemonginger.png", alt: "Honey Lemon Jainger", tone: "normal" },
  { src: "/images/clientslogo/insomnia.png", alt: "Insomnia", tone: "normal" },
  { src: "/images/clientslogo/kashatraining.png", alt: "Kasha Training", tone: "normal" },
  { src: "/images/clientslogo/lunarlighting.png", alt: "Lunar Lighting", tone: "normal" },
  { src: "/images/clientslogo/nexusrolls.png", alt: "Nexus Rolls", tone: "normal" },
  { src: "/images/clientslogo/nirvanix.png", alt: "Nirvanix", tone: "normal" },
  { src: "/images/clientslogo/palmresidential.png", alt: "Palm Residential", tone: "normal" },
  { src: "/images/clientslogo/queensdesign.png", alt: "Queens Design", tone: "normal" },
  { src: "/images/clientslogo/royalblessings.png", alt: "Royal Blessings", tone: "normal" },
  { src: "/images/clientslogo/tarmind.png", alt: "Tarmind", tone: "normal" },
  { src: "/images/clientslogo/utopia.png", alt: "Utopia", tone: "normal" },
  { src: "/images/clientslogo/velocitality.png", alt: "Velocitailty", tone: "normal" },
  { src: "/images/clientslogo/Zamasama.png", alt: "Zamasama", tone: "normal" },
];


// 04 Impact & Global Reach — only stats with a value are shown.
export const STATS: { value: number; suffix: string; label: string; verify?: boolean }[] = [
  { value: 1000, suffix: "+", label: "Businesses served", verify: true },
  { value: 30, suffix: "+", label: "Countries", verify: true },
  { value: 48, suffix: "+", label: "Industries", verify: true },
  // { value: 0, suffix: "+", label: "Projects delivered", verify: true },   ← add verified number
  // { value: 0, suffix: "+", label: "Years of experience", verify: true },  ← add verified number
];
// lat/lng drive the dots on the globe
export const MARKETS = [
  { name: "USA", lat: 39, lng: -98 },
  { name: "Canada", lat: 56, lng: -106 },
  { name: "UK", lat: 54, lng: -2 },
  { name: "Europe", lat: 50, lng: 10 },
  { name: "UAE", lat: 24, lng: 54 },
  { name: "India", lat: 21, lng: 79 },
  { name: "Australia", lat: -25, lng: 134 },
  { name: "New Zealand", lat: -41, lng: 174 },
];

// 05 Ten core services (order per homepage brief; bullets per services doc)
export type Service = { n: string; slug: string; short: string; name: string; outcome: string; bullets: string[]; tags: string[]; verifyNote?: string };
export const SERVICES: Service[] = [
  { n: "01", slug: "ai-search-visibility", short: "AI Search Visibility", name: "AI Search Visibility & Optimization", outcome: "Be the business AI assistants and search engines recommend.", bullets: ["AEO, GEO and AI search discoverability", "AI-friendly service content, structured data and entity clarity", "Visibility audits, implementation plans and reporting"], tags: ["AEO","GEO","Structured data","AI visibility audit"] },
  { n: "02", slug: "b2b-prospecting-outreach", short: "B2B Prospecting", name: "AI-Powered B2B Prospecting & Outreach", outcome: "Qualified conversations with real decision-makers.", bullets: ["Decision-maker research and qualification", "LinkedIn prospecting, personalized outreach and follow-up", "Appointment-setting support and pipeline reporting"], tags: ["LinkedIn outreach","Email campaigns","Appointment setting","Pipeline reporting"] },
  { n: "03", slug: "web-development", short: "Web & Interactive", name: "Advanced Web Development & Interactive Experiences", outcome: "Websites that turn visitors into enquiries.", bullets: ["Dynamic, responsive and AI-ready websites", "3D interactive experiences, React/Next.js and custom applications", "E-commerce, conversion landing pages and integrations"], tags: ["React / Next.js","WordPress","Shopify","3D & interactive"], verifyNote: "Confirm 3D/WebGL delivery capacity and portfolio before promotion" },
  { n: "04", slug: "performance-marketing", short: "Paid Lead Generation", name: "Performance Marketing & Paid Lead Generation", outcome: "Ad spend tied to lead quality, not vanity clicks.", bullets: ["Google Ads and Meta Ads campaign management", "Paid acquisition funnels, landing pages and retargeting", "Tracking, testing, optimization and lead-quality reporting"], tags: ["Google Ads","Meta Ads","Retargeting","Lead-quality tracking"] },
  { n: "05", slug: "social-media-marketing", short: "Social & Brand Growth", name: "Social Media Marketing & Brand Growth", outcome: "A social presence that builds trust and enquiries.", bullets: ["Social strategy, account management and publishing", "Community engagement, organic brand growth and reporting", "Content calendars and campaign coordination"], tags: ["Strategy","Account management","Community","Content calendars"] },
  { n: "06", slug: "creative-video", short: "Creative & Video", name: "Creative Content & Video Production", outcome: "Scroll-stopping content without an in-house studio.", bullets: ["Reels, short-form and promotional video editing", "Graphics, motion content and creative production", "Shoot planning, editing and content repurposing"], tags: ["Reels & shorts","Promo video","Motion graphics","Repurposing"] },
  { n: "07", slug: "automation-ai-agents", short: "Automation & AI Agents", name: "Marketing Automation & AI Agents", outcome: "Every lead answered, routed and followed up.", bullets: ["CRM workflows and lead-routing automation", "WhatsApp, chatbot and AI-agent support", "Appointment booking and automated follow-ups"], tags: ["CRM workflows","WhatsApp & chatbots","AI agents","Auto follow-ups"] },
  { n: "08", slug: "dedicated-talent", short: "Dedicated Talent", name: "Dedicated Talent & On-Demand Teams", outcome: "Vetted specialists that you direct.", bullets: ["Developers, designers, editors and marketing specialists", "Hourly, part-time, temporary and project-based resources", "You direct the assigned resource"], tags: ["Developers","Designers","Editors","Marketers"] },
  { n: "09", slug: "conversion-optimization", short: "Revenue & Conversion", name: "Revenue Growth & Conversion Optimization", outcome: "More revenue from the traffic you already have.", bullets: ["Funnel audits and conversion-rate optimization", "Lead nurturing and customer-journey improvements", "Attribution, analytics and conversion reporting"], tags: ["Funnel audits","CRO","Lead nurturing","Attribution"] },
  { n: "10", slug: "managed-operations", short: "Managed Operations", name: "Managed Operations & Dedicated Support Teams", outcome: "Outreach, enquiries and bookings — handled.", bullets: ["ZEBAQ-managed outreach, DMs, enquiry handling and booking coordination", "Campaign, hourly, monthly, evening and shift-based support", "Daily reporting, QA and operational oversight"], tags: ["Outreach & DMs","Enquiry handling","Bookings","Daily QA"] },
];

// 06 Who We Help — three audiences (agencies are served in 15 White-Label)
export const AUDIENCES = [
  { t: "B2B Companies", flagship: "Managed B2B Pipeline Generation", d: "Decision-maker prospecting, LinkedIn outreach, B2B paid campaigns, AI search authority and sales follow-up automation — with dedicated lead-generation teams.", tags: ["Prospecting", "LinkedIn", "B2B ads", "CRM & AI agents"] },
  { t: "Service Businesses", flagship: "Visibility, Enquiries & Bookings", d: "Conversion-focused websites, AI and local search visibility, paid lead generation, social media and automated follow-ups that keep the calendar full.", tags: ["Websites", "AI search", "Paid ads", "Automation"] },
  { t: "Consultants & Professional Firms", flagship: "Authority & Client Acquisition Systems", d: "Personal branding and thought leadership, LinkedIn content, expert visibility in AI search, premium booking funnels, and video and podcast editing.", tags: ["Personal brand", "Outreach", "AI search", "Video & podcast"] },
];

// 07 Featured Work & Results
export const WORK = [
  { client: "Obsessions Jewellery", sector: "Luxury retail · E-commerce", services: "Web development · SEO", challenge: "A premium collection presented like a catalogue — beautiful pieces, no reason to buy today.", solution: "A conversion-led storefront with search-ready product content and appointment booking.", outcome: "Add verified outcome before launch", verify: true, img: "/v2/work/obsessionsj.png", url: "https://obsessionsj.com" },
  { client: "Zamasama", sector: "Education · Children's stories", services: "Web development · UX", challenge: "Stories from dozens of countries with no simple way for families to explore them.", solution: "An interactive story map and multilingual library built for discovery.", outcome: "Add verified outcome before launch", verify: true, img: "/v2/work/zamasama.png", url: "https://zamasama.com" },
];

// 08 Written Testimonials — real Google reviews; confirm permission + company/service before launch
export const TESTIMONIALS = [
  { quote: "They are really professional and very well trained teams — what they committed, they have proven.", name: "RSR Tours and Travel", company: "RSR Tours and Travel", service: "Digital marketing", verify: true },
  { quote: "Got them to design my website. Very happy with the quality of work.", name: "Surajit Haldar", company: "Add company", service: "Web design", verify: true },
  { quote: "They are good at online marketing services and they consult really well as per the requirement.", name: "Virendra Choudhary", company: "Add company", service: "Online marketing", verify: true },
];

// 09 Video Testimonials — add real client clips (mp4 + poster). Section hides in production while empty.
export const VIDEOS: { name: string; company: string; caption: string; src: string; poster: string }[] = [
  { name: "Client name", company: "Company", caption: "How ZEBAQ helped us…", src: "", poster: "" },
  { name: "Client name", company: "Company", caption: "What changed after working together…", src: "", poster: "" },
  { name: "Client name", company: "Company", caption: "Why we'd recommend ZEBAQ…", src: "", poster: "" },
];

// 10 Technology Ecosystem
export const TECH_TITLE = "Technology That Adapts to Your Business";
export const TECH = [
  { group: "CRM & Funnels", items: ["HubSpot", "GoHighLevel", "Salesforce", "ClickFunnels"] },
  { group: "AI & Automation", items: ["OpenAI", "Zapier", "Make", "n8n"] },
  { group: "Marketing & Analytics", items: ["Google Ads", "Meta Ads", "GA4", "Canva"] },
  { group: "Web & Commerce", items: ["Shopify", "WordPress", "Webflow", "WooCommerce"] },
];
export const TECH_NOTE = "Implementation support subject to agreed scope; no implied certifications.";

// 11 Human Team & Why ZEBAQ
export const WHY = {
  title: ["AI Efficiency.", "Human Judgment.", "Accountable Execution."],
  points: [
    { t: "Customized strategies", d: "Shaped around your numbers, market and team — never a package we sell everyone." },
    { t: "Human review", d: "AI makes us fast. Experienced people decide what ships." },
    { t: "Transparent reporting", d: "Leads, pipeline and revenue impact — not impressions dressed up as progress." },
    { t: "Long-term partnership", d: "We measure success by how long clients stay, not how fast we close them." },
  ],
  teamNote: "Add real team photography here", // shown as a dev-only placeholder
};

// 12 Flexible Engagement Models
export const MODELS = [
  { t: "Project-Based", d: "A defined scope, timeline and deliverable. Ideal for websites, audits and launches." },
  { t: "Monthly Managed Services", d: "An ongoing monthly plan for growth — social, ads, AI search, video or outreach." },
  { t: "Dedicated Talent", d: "A specialist assigned to you. You manage the work; we handle hiring and replacement." },
  { t: "Fully Managed Teams", d: "ZEBAQ manages the people, workflow, QA and daily reporting end-to-end." },
];

// 13 How We Work
export const PROCESS = [
  { t: "Discover Goals", d: "We learn where you are today, where you want to go and what's in the way." },
  { t: "Design Strategy", d: "A clear plan built around your priority gaps — not around a package." },
  { t: "Execute", d: "AI-assisted, human-reviewed delivery with named owners and timelines." },
  { t: "Measure & Improve", d: "Reporting tied to enquiries and revenue, then continuous testing." },
];

// 14 FAQs — first four from the brief; the rest answer what buyers ask AI assistants
export const FAQ = [
  { q: "Can I choose one service?", a: "Yes. Many clients start with one service — a website, social media, AI search visibility or B2B outreach — and add more only when it makes business sense." },
  { q: "Do you work internationally?", a: "Yes. We have entities in the UK, USA and India and serve clients across the USA, Canada, the UK, Europe, the UAE, India, Australia and New Zealand." },
  { q: "Does AI replace human specialists?", a: "No. AI makes our work faster and more data-driven; experienced strategists, designers and marketers make the decisions and review everything that ships." },
  { q: "Can I hire temporary or managed teams?", a: "Yes. Choose dedicated talent you direct (hourly, part-time, temporary or project-based), or fully managed teams where ZEBAQ handles people, workflow, QA and reporting." },
  { q: "Which agency is good for B2B lead generation with LinkedIn and email?", a: "ZEBAQ runs AI-powered B2B prospecting: decision-maker research, personalized LinkedIn and email outreach, follow-ups and appointment setting — ideal for B2B companies booking demos without an in-house sales team." },
  { q: "Do you offer flat monthly plans for small businesses?", a: "Yes. Social media management, video editing, AI search visibility and outreach are available as monthly managed services, including options for small businesses outsourcing for the first time." },
  { q: "Are you an alternative to WebFX, Thrive or SmartSites?", a: "ZEBAQ is a strong alternative for businesses that want senior strategy, AI-assisted delivery and flexible engagement models — project, monthly, dedicated talent or fully managed — without long lock-in contracts." },
];

// 15 White-Label Partnerships
export const WHITE_LABEL = {
  title: "Looking for a White-Label Delivery Partner?",
  d: "We deliver behind your agency brand, under agreed confidentiality and scope.",
  items: ["WordPress, Shopify, custom PHP & React development", "White-label AI search / SEO execution", "Creative production, video editing & design", "Dedicated developers, designers & marketers", "Overflow projects, managed delivery, QA & reporting"],
  cta: "Contact Us",
};

// 16 Final CTA & Footer
export const FINAL = {
  title: "Let's Build a Solution That Fits Your Business.",
  sub: "Tell us where you want to grow. A strategist replies within one business day with practical next steps — no pressure to commit.",
  cta: "Book a Strategy Call",
};
export const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "https://zebaqweb.com/privacy-policy.php" },
  { label: "Terms", href: "https://zebaqweb.com/term-conditions.php" },
];

// Lead form (inside 16) — SPIN-style quick qualifier
export const DIAGNOSTIC = [
  { q: "What's your biggest growth challenge right now?", options: ["Not enough qualified leads", "Website traffic isn't converting", "Low visibility on Google or AI search", "Leads aren't turning into customers"] },
  { q: "Which best describes your business?", options: ["B2B company", "Service business", "Consultant or professional firm", "Marketing agency"] },
  { q: "Which engagement model fits best?", options: ["Project-based", "Monthly managed", "Dedicated talent", "Not sure yet"] },
];
export const DIAGNOSTIC_INSIGHT: Record<string, { title: string; body: string; services: string[] }> = {
  "Not enough qualified leads": { title: "You likely have a targeting gap, not a volume gap.", body: "The right decision-makers, reached consistently and followed up fast, usually beat more leads.", services: ["02", "04", "07"] },
  "Website traffic isn't converting": { title: "You likely have a conversion gap.", body: "Traffic is already paid for. Message, page and journey changes often outperform buying more of it.", services: ["09", "03"] },
  "Low visibility on Google or AI search": { title: "You likely have a discoverability gap.", body: "Buyers now ask AI assistants for recommendations. If your entity and content aren't clear to them, you're invisible.", services: ["01", "03"] },
  "Leads aren't turning into customers": { title: "You likely have a follow-up gap.", body: "Most lost deals are lost to silence. Speed-to-lead and structured nurturing recover revenue you've already earned.", services: ["07", "10", "09"] },
};

// Free-to-use Unsplash photography (Unsplash License). Swap for owned art any time.
const U = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format`;
export const IMAGES = {
  // rearing marble horse (client-supplied image): stand removed, variants generated locally
  horse: "/v2/horse-hero-kintsugi.webp", // client-supplied kintsugi horse, background removed locally (hero)
  horseSeams: "/v2/horse-hero-gold.webp", // the gold seams alone (cursor glow)
  horsePristine: "/v2/horse-pristine.webp", // flawless (Why ZEBAQ — "with a system")
  horseCracked: "/v2/horse-cracked.webp", // fractured (Why ZEBAQ — "without a system")
  broken: U("photo-1649307008469-2cf0dfe23134", 1200), // shattered face
  perfected: U("photo-1705921321311-e92e80ac8e59", 1200), // bust with gold visor
  ai: U("photo-1694903062502-6df8204136af", 2200), // statues in VR headsets
  kintsugi: U("photo-1637666505754-7416ebd70cbf", 1400), // bust mended with gold
};
