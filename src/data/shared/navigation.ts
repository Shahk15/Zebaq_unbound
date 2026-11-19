import { SERVICES } from "./services";
import { SITE } from "../home/site";

export type IconName =
    | "home"
    | "grid"
    | "company"
    | "team"
    | "careers"
    | "blog"
    | "case"
    | "search"
    | "send"
    | "code"
    | "trend"
    | "share"
    | "video"
    | "bot"
    | "funnel"
    | "headset";

export type NavKey = "home" | "services" | "about" | "resources";

export type NavChild = {
    label: string;
    description: string;
    href: string;
    icon: IconName;
};

export type NavItem = {
    key: NavKey;
    label: string;
    href: string;
    icon: IconName;
    // "link" = plain link, "services" = children come from SERVICES, "links" = children listed below
    kind: "link" | "services" | "links";
    children?: NavChild[];
};

// Home uses "#" for now so it does not reload the page.
// The other paths are for your pages; they work once routing (react-router) is added.
export const NAV: NavItem[] = [
    { key: "home", label: "Home", href: "#", icon: "home", kind: "link" },
    { key: "services", label: "Services", href: "/services", icon: "grid", kind: "services" },
    {
        key: "about",
        label: "About",
        href: "/about",
        icon: "company",
        kind: "links",
        children: [
            { label: "Company", description: "Learn more about who we are.", href: "/about", icon: "company" },
            { label: "Our Team", description: "Meet the people behind Zebaq.", href: "/about#team", icon: "team" },
            { label: "Careers", description: "Join us and grow with us.", href: "/about#careers", icon: "careers" },
        ],
    },
    {
        key: "resources",
        label: "Resources",
        href: "/insights",
        icon: "blog",
        kind: "links",
        children: [
            { label: "Blogs", description: "Ideas and playbooks on growth, AI and web.", href: "/insights", icon: "blog" },
            { label: "Case Studies", description: "Real projects and the results they drove.", href: "/work", icon: "case" },
        ],
    },
];

export const NAV_CTA = "Book a Strategy Call";

export const CONTACT_EMAIL = SITE.email;

export const SOCIALS = [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
];

// One icon per service (matched by slug)
const SERVICE_ICONS: Record<string, IconName> = {
    "ai-search-visibility": "search",
    "b2b-prospecting-outreach": "send",
    "web-development": "code",
    "performance-marketing": "trend",
    "social-media-marketing": "share",
    "creative-video": "video",
    "automation-ai-agents": "bot",
    "dedicated-talent": "team",
    "conversion-optimization": "funnel",
    "managed-operations": "headset",
};

export type ServiceLink = {
    slug: string;
    label: string;
    description: string;
    href: string;
    icon: IconName;
};

export const SERVICE_LINKS: ServiceLink[] = SERVICES.map((s) => ({
    slug: s.slug,
    label: s.short,
    description: s.outcome,
    href: "/services",
    icon: SERVICE_ICONS[s.slug] ?? "grid",
}));