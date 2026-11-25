import { SERVICES } from "../shared/services";

export type AboutHeroContent = {
    eyebrow: string;
    line1: string;
    line2: string;
    text: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
};

export type WhoContent = {
    eyebrow: string;
    line1: string;
    line2: string;
    lead: string;
    chips: string[];
    figures: { value: number; suffix?: string; label: string; note: string }[];
};

// A place on the map.
// `atlas` is the country name exactly as in the world-atlas data, `flag` is the lowercase ISO 2-letter code.
export type Target = { code: string; name: string; atlas: string; flag: string; lon: number; lat: number };

export type MapContent = {
    eyebrow: string;
    line1: string;
    line2: string;
    countries: string;
    // Countries that are not served (everything else is lit)
    exclude: string[];
    hq: Target;
    // Featured countries: brighter dots, an arc from HQ and a flag label
    featured: Target[];
};

export type MissionContent = {
    eyebrow: string;
    segments: { t: string; em?: boolean }[];
    tagline: string;
};

export type ValuesContent = {
    eyebrow: string;
    title: string;
    text: string;
    items: { n: string; title: string; text: string }[];
};

export type JoinContent = {
    eyebrow: string;
    title: string;
    cards: { n: string; title: string; text: string; cta: string; href: string; tone: "dark" | "light" }[];
};

export const ABOUT_HERO: AboutHeroContent = {
    eyebrow: "About ZEBAQ",
    line1: "A hands-on digital marketing",
    line2: "and AI team",
    text: "ZEBAQ brings search, outreach, social content, web development and automation together in one delivery team. We start with how your customers find, evaluate and buy from you, then agree what your team needs us to own.",
    primary: { label: "Book a strategy call", href: "/contact" },
    secondary: { label: "Meet the team", href: "/team" },
};

export const WHO: WhoContent = {
    eyebrow: "Who we are",
    line1: "One delivery team",
    line2: "for growing businesses",
    lead: "ZEBAQ is a marketing and technology team for service businesses, ecommerce brands and B2B companies. You get a named owner, an agreed scope, human review and reporting tied to the business goal.",
    chips: SERVICES.map((s) => s.short),
    figures: [
        { value: 30, suffix: "+", label: "Countries", note: "Businesses we support across borders" },
        { value: SERVICES.length, label: "Disciplines", note: "From search to software" },
        { value: 1, label: "Accountable team", note: "Strategy to delivery" },
    ],
};

export const MAP: MapContent = {
    eyebrow: "Where we work",
    line1: "From India,",
    line2: "for the world.",
    countries: "30+",
    exclude: ["Israel"],
    hq: { code: "IN", name: "Bhubaneswar", atlas: "India", flag: "in", lon: 85.82, lat: 20.3 },
    featured: [
        { code: "US", name: "United States", atlas: "United States of America", flag: "us", lon: -98, lat: 39 },
        { code: "UK", name: "United Kingdom", atlas: "United Kingdom", flag: "gb", lon: -1.5, lat: 52.5 },
        { code: "FR", name: "France", atlas: "France", flag: "fr", lon: 2.5, lat: 46.5 },
        { code: "DE", name: "Germany", atlas: "Germany", flag: "de", lon: 10, lat: 51 },
        { code: "JP", name: "Japan", atlas: "Japan", flag: "jp", lon: 138, lat: 36 },
        { code: "AU", name: "Australia", atlas: "Australia", flag: "au", lon: 134, lat: -25 },
        { code: "CN", name: "China", atlas: "China", flag: "cn", lon: 104, lat: 35 },
        { code: "CA", name: "Canada", atlas: "Canada", flag: "ca", lon: -100, lat: 58 },
        { code: "IT", name: "Italy", atlas: "Italy", flag: "it", lon: 12.5, lat: 42.5 },
        { code: "BR", name: "Brazil", atlas: "Brazil", flag: "br", lon: -52, lat: -10 },
        { code: "ZA", name: "South Africa", atlas: "South Africa", flag: "za", lon: 24, lat: -29 },
        { code: "KR", name: "South Korea", atlas: "South Korea", flag: "kr", lon: 127.8, lat: 36.5 },
        { code: "NZ", name: "New Zealand", atlas: "New Zealand", flag: "nz", lon: 172, lat: -41 },
        { code: "MX", name: "Mexico", atlas: "Mexico", flag: "mx", lon: -102, lat: 23.5 },
        { code: "RU", name: "Russia", atlas: "Russia", flag: "ru", lon: 90, lat: 60 },
        { code: "SE", name: "Sweden", atlas: "Sweden", flag: "se", lon: 16, lat: 62 },
        { code: "NO", name: "Norway", atlas: "Norway", flag: "no", lon: 9, lat: 61 },
        { code: "DK", name: "Denmark", atlas: "Denmark", flag: "dk", lon: 9.5, lat: 56 },
        { code: "CH", name: "Switzerland", atlas: "Switzerland", flag: "ch", lon: 8.2, lat: 46.8 },
        { code: "TH", name: "Thailand", atlas: "Thailand", flag: "th", lon: 101, lat: 15 },
        { code: "AE", name: "UAE", atlas: "United Arab Emirates", flag: "ae", lon: 54, lat: 24 },
        { code: "PT", name: "Portugal", atlas: "Portugal", flag: "pt", lon: -8, lat: 39.5 },
        { code: "ES", name: "Spain", atlas: "Spain", flag: "es", lon: -3.7, lat: 40 },
        { code: "ID", name: "Indonesia", atlas: "Indonesia", flag: "id", lon: 113, lat: -2 },
        { code: "PH", name: "Philippines", atlas: "Philippines", flag: "ph", lon: 122, lat: 12 },
        { code: "AT", name: "Austria", atlas: "Austria", flag: "at", lon: 14.5, lat: 47.5 },
        { code: "HU", name: "Hungary", atlas: "Hungary", flag: "hu", lon: 19.5, lat: 47 },
    ],
};

export const MISSION: MissionContent = {
    eyebrow: "Our mission",
    segments: [
        { t: "Bring strategy, search, outreach, social, web and automation into" },
        { t: "one accountable delivery team,", em: true },
        { t: "so every decision starts with the customer journey and ends with work tied to" },
        { t: "a clear business goal.", em: true },
    ],
    tagline: "Innovate. Build. Grow.",
};

export const VALUES: ValuesContent = {
    eyebrow: "Our values",
    title: "How clients see our work",
    text: "A named owner, an agreed scope, human review and reporting tied to the goal.",
    items: [
        { n: "01", title: "Named ownership", text: "Every engagement has a clear point of contact and an agreed owner for delivery." },
        { n: "02", title: "Scope before activity", text: "We define the work, timeline and success measures before delivery begins." },
        { n: "03", title: "Human review", text: "Specialists review strategy, customer-facing copy and workflows before they ship." },
        { n: "04", title: "Reporting tied to goals", text: "We show progress against enquiries, bookings, sales or the measure agreed for the work." },
        { n: "05", title: "One accountable team", text: "Strategy, execution and quality stay coordinated instead of moving between disconnected vendors." },
        { n: "06", title: "Clear next decisions", text: "Clients see what changed, what we learned and what should happen next." },
    ],
};

export const JOIN: JoinContent = {
    eyebrow: "Be part of Zebaq",
    title: "Join us, or meet the people",
    cards: [
        { n: "01", title: "Careers", text: "Build the work you would be proud to put your name on, with a team that cares how it is made.", cta: "See open roles", href: "/career", tone: "dark" },
        { n: "02", title: "Our Team", text: "The strategists, designers and engineers behind every project.", cta: "Meet the team", href: "/team", tone: "light" },
    ],
};