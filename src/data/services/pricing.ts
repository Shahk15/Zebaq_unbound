import type { ServicePricing } from "./page-types";

// DRAFT PRICES. Every figure below is a placeholder to be replaced with your real rates.
// While this is false: figures show in development (marked "verify") and are hidden from
// visitors in the production build, where the section offers an exact quote instead.
export const PRICES_CONFIRMED = false;

// Each control's default is included in the level; moving away from it adds or removes rate x units.
export const SERVICE_PRICING: Record<string, ServicePricing> = {
    "ai-search-visibility": {
        per: "month",
        tiers: [
            { name: "Foundation", for: "Get readable and findable", base: 600, includes: ["AI visibility audit", "Structured data setup", "Monthly report"] },
            { name: "Growth", for: "Become part of the answer", base: 1100, includes: ["Everything in Foundation", "Answer-first content", "Mention tracking"] },
            { name: "Authority", for: "Own your category", base: 2100, includes: ["Everything in Growth", "Digital PR and citations", "Weekly strategy call"] },
        ],
        controls: [
            { id: "pages", label: "Pages or articles a month", min: 2, max: 20, step: 1, def: 4, unit: "pages", rate: 60 },
            { id: "prompts", label: "Questions tracked in AI", min: 20, max: 200, step: 10, def: 40, unit: "prompts", rate: 3 },
        ],
        addons: [{ label: "Second language", price: 250 }, { label: "Local SEO and maps", price: 200 }, { label: "Review programme", price: 180 }],
    },
    "b2b-prospecting-outreach": {
        per: "month",
        tiers: [
            { name: "Starter", for: "Prove the audience", base: 500, includes: ["Decision-maker research", "One channel", "Monthly report"] },
            { name: "Pipeline", for: "A steady flow of conversations", base: 950, includes: ["LinkedIn and email", "Personalised follow-up", "Weekly report"] },
            { name: "Full desk", for: "Meetings in your diary", base: 1800, includes: ["Everything in Pipeline", "Appointment setting", "CRM management"] },
        ],
        controls: [
            { id: "people", label: "New people contacted a month", min: 100, max: 1500, step: 50, def: 300, unit: "people", rate: 0.9 },
            { id: "markets", label: "Countries or markets", min: 1, max: 6, step: 1, def: 1, unit: "markets", rate: 180 },
        ],
        addons: [{ label: "Email domain setup", price: 120 }, { label: "Calling support", price: 400 }, { label: "Sales one-pager", price: 150 }],
    },
    "web-development": {
        per: "project",
        tiers: [
            { name: "Launch", for: "A sharp site that brings enquiries", base: 1200, includes: ["Custom design", "Mobile-first build", "SEO basics"] },
            { name: "Business", for: "More pages, more conversion", base: 2800, includes: ["Everything in Launch", "CMS and integrations", "Speed and security setup"] },
            { name: "Commerce", for: "Sell online or build an app", base: 5200, includes: ["Everything in Business", "Store or custom app", "Payments and tracking"] },
        ],
        controls: [
            { id: "pages", label: "Pages", min: 3, max: 40, step: 1, def: 8, unit: "pages", rate: 90 },
            { id: "langs", label: "Languages", min: 1, max: 5, step: 1, def: 1, unit: "languages", rate: 300 },
        ],
        addons: [{ label: "Booking system", price: 350 }, { label: "3D or interactive scene", price: 900 }, { label: "Security hardening", price: 300 }, { label: "Copywriting", price: 450 }],
    },
    "performance-marketing": {
        per: "month",
        tiers: [
            { name: "Test", for: "Find what works", base: 450, includes: ["One ad platform", "Conversion tracking", "Monthly report"] },
            { name: "Scale", for: "Grow what works", base: 900, includes: ["Google and Meta", "Retargeting", "Weekly testing"] },
            { name: "Lead", for: "A full acquisition engine", base: 1700, includes: ["Everything in Scale", "Landing pages", "Lead-quality reporting"] },
        ],
        controls: [
            { id: "camps", label: "Campaigns", min: 1, max: 12, step: 1, def: 3, unit: "campaigns", rate: 90 },
            { id: "ads", label: "New ad creatives a month", min: 2, max: 30, step: 1, def: 6, unit: "creatives", rate: 25 },
        ],
        addons: [{ label: "Landing page", price: 350 }, { label: "Call tracking", price: 90 }, { label: "Video ads", price: 300 }],
    },
    "social-media-marketing": {
        per: "month",
        tiers: [
            { name: "Presence", for: "Look alive and consistent", base: 400, includes: ["Two platforms", "Content calendar", "Monthly report"] },
            { name: "Growth", for: "Turn followers into visitors", base: 800, includes: ["Three platforms", "Reels included", "Comments and DMs"] },
            { name: "Full house", for: "Fill every night", base: 1600, includes: ["Everything in Growth", "Event campaigns", "Creator outreach"] },
        ],
        controls: [
            { id: "posts", label: "Posts a month", min: 8, max: 60, step: 2, def: 16, unit: "posts", rate: 22 },
            { id: "reels", label: "Reels a month", min: 0, max: 24, step: 1, def: 4, unit: "reels", rate: 45 },
        ],
        addons: [{ label: "Paid boosting", price: 200 }, { label: "On-location shoot", price: 350 }, { label: "Evening DM cover", price: 250 }],
    },
    "creative-video": {
        per: "month",
        tiers: [
            { name: "Edit", for: "You film, we finish", base: 350, includes: ["Short-form editing", "Captions", "Two revisions"] },
            { name: "Studio", for: "A steady stream of content", base: 850, includes: ["Everything in Edit", "Motion graphics", "Shoot planning"] },
            { name: "Campaign", for: "A launch or a season", base: 1900, includes: ["Everything in Studio", "Promo film", "Ad versions"] },
        ],
        controls: [
            { id: "shorts", label: "Short videos a month", min: 4, max: 40, step: 1, def: 8, unit: "videos", rate: 45 },
            { id: "graphics", label: "Graphics a month", min: 0, max: 40, step: 2, def: 8, unit: "graphics", rate: 18 },
        ],
        addons: [{ label: "Promo film", price: 600 }, { label: "Voice-over", price: 80 }, { label: "Priority 24-hour edits", price: 220 }],
    },
    "automation-ai-agents": {
        per: "month",
        tiers: [
            { name: "Assist", for: "Answer every message", base: 400, includes: ["WhatsApp or web chat", "FAQ agent", "Human hand-off"] },
            { name: "Convert", for: "Book and follow up", base: 850, includes: ["Everything in Assist", "Booking", "CRM workflows"] },
            { name: "Operate", for: "Automate the routine", base: 1700, includes: ["Everything in Convert", "Custom agents", "Reporting dashboard"] },
        ],
        controls: [
            { id: "convos", label: "Conversations a month", min: 100, max: 5000, step: 100, def: 500, unit: "chats", rate: 0.2 },
            { id: "flows", label: "Automated workflows", min: 1, max: 20, step: 1, def: 3, unit: "flows", rate: 70 },
        ],
        addons: [{ label: "Voice agent", price: 400 }, { label: "Second language", price: 150 }, { label: "Custom integration", price: 350 }],
    },
    "dedicated-talent": {
        per: "hour",
        tiers: [
            { name: "Support", for: "Assistants and coordinators", base: 35, includes: ["Vetted specialist", "Daily report", "Free replacement"] },
            { name: "Specialist", for: "Designers, editors, marketers", base: 55, includes: ["Everything in Support", "Portfolio match", "Your tools and hours"] },
            { name: "Senior", for: "Developers and leads", base: 85, includes: ["Everything in Specialist", "Technical screening", "Project ownership"] },
        ],
        // base = monthly cost of one weekly hour; the total is base x people x weekly hours
        controls: [
            { id: "people", label: "Specialists", min: 1, max: 10, step: 1, def: 1, unit: "people", rate: 0 },
            { id: "hours", label: "Hours each, per week", min: 5, max: 40, step: 5, def: 20, unit: "hours", rate: 0 },
        ],
        addons: [{ label: "Evening or weekend hours", price: 150 }, { label: "Project manager", price: 400 }, { label: "Time-tracked reporting", price: 60 }],
    },
    "conversion-optimization": {
        per: "month",
        tiers: [
            { name: "Audit", for: "Find the leaks", base: 500, includes: ["Funnel audit", "Heatmap review", "Priority list"] },
            { name: "Improve", for: "Fix and test", base: 1000, includes: ["Everything in Audit", "Monthly tests", "Design and build"] },
            { name: "Compound", for: "A standing growth team", base: 2000, includes: ["Everything in Improve", "Lead nurturing", "Attribution"] },
        ],
        controls: [
            { id: "tests", label: "Tests a month", min: 1, max: 12, step: 1, def: 2, unit: "tests", rate: 160 },
            { id: "pages", label: "Key pages covered", min: 1, max: 20, step: 1, def: 4, unit: "pages", rate: 50 },
        ],
        addons: [{ label: "User testing videos", price: 250 }, { label: "Email nurture flow", price: 350 }, { label: "Analytics rebuild", price: 400 }],
    },
    "managed-operations": {
        per: "month",
        tiers: [
            { name: "Cover", for: "Evenings or overflow", base: 700, includes: ["DMs and enquiries", "Daily report", "Shared inbox"] },
            { name: "Desk", for: "A shift of your own", base: 1500, includes: ["Everything in Cover", "Bookings", "Quality checks"] },
            { name: "Operate", for: "Round-the-clock team", base: 3600, includes: ["Everything in Desk", "Outreach", "Shift lead"] },
        ],
        controls: [
            { id: "hours", label: "Hours covered a day", min: 4, max: 24, step: 1, def: 8, unit: "hours", rate: 130 },
            { id: "channels", label: "Channels handled", min: 1, max: 10, step: 1, def: 3, unit: "channels", rate: 90 },
        ],
        addons: [{ label: "Weekends", price: 350 }, { label: "Phone answering", price: 450 }, { label: "Second language", price: 300 }],
    },
};
