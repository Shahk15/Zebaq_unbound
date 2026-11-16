import type { IconName } from "./navigation";

export type Service = {
    slug: string;
    icon: IconName;
    title: string;        // full name, for the service page
    short: string;        // short name, for menus
    caption: string;
    description: string;  // one line, for dropdown cards
    tags: string[];
    href: string;
};

type RawService = Omit<Service, "href">;

const RAW: RawService[] = [
    {
        slug: "ai-search-visibility",
        icon: "search",
        title: "AI Search Visibility & Optimization",
        short: "AI Search Visibility",
        caption: "Search & Discovery",
        description: "Get found in AI answers and search results.",
        tags: ["AI Search Optimization", "Technical SEO", "Content Strategy", "Local & Global SEO", "Performance Reporting"],
    },
    {
        slug: "b2b-prospecting-outreach",
        icon: "send",
        title: "AI-Powered B2B Prospecting & Outreach",
        short: "B2B Prospecting & Outreach",
        caption: "Leads & Outreach",
        description: "Lead research, outreach and appointment setting.",
        tags: ["Lead Research", "List Building", "Email Outreach", "LinkedIn Outreach", "Appointment Setting"],
    },
    {
        slug: "web-development",
        icon: "code",
        title: "Advanced Web Development & Interactive Experiences",
        short: "Web Development",
        caption: "Web & Experiences",
        description: "Fast custom websites, web apps and motion.",
        tags: ["Custom Websites", "WordPress & Shopify", "Web Applications", "WebGL & Motion", "Speed & Performance"],
    },
    {
        slug: "performance-marketing",
        icon: "trend",
        title: "Performance Marketing & Paid Lead Generation",
        short: "Performance Marketing",
        caption: "Paid Growth",
        description: "Google, Meta and LinkedIn campaigns that convert.",
        tags: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Landing Pages", "Conversion Tracking"],
    },
    {
        slug: "social-media-marketing",
        icon: "share",
        title: "Social Media Marketing & Brand Growth",
        short: "Social Media Marketing",
        caption: "Social & Brand",
        description: "Content, community and a consistent brand voice.",
        tags: ["Content Calendars", "Community Management", "Influencer Campaigns", "Brand Voice", "Analytics"],
    },
    {
        slug: "content-video-production",
        icon: "video",
        title: "Creative Content & Video Production",
        short: "Content & Video",
        caption: "Content & Media",
        description: "Short-form video, brand films and motion graphics.",
        tags: ["Short-form Video", "Brand Films", "Motion Graphics", "Copywriting", "Photography"],
    },
    {
        slug: "automation-ai-agents",
        icon: "bot",
        title: "Marketing Automation & AI Agents",
        short: "Automation & AI Agents",
        caption: "Automation & AI",
        description: "CRM workflows, chatbots and AI agents.",
        tags: ["CRM Workflows", "Email Automation", "AI Agents", "Chatbots", "Integrations"],
    },
    {
        slug: "dedicated-teams",
        icon: "team",
        title: "Dedicated Talent & On-Demand Teams",
        short: "Dedicated Teams",
        caption: "Teams & Talent",
        description: "Developers, designers and marketers on demand.",
        tags: ["Developers", "Designers", "Marketers", "Team Extension", "Flexible Engagement"],
    },
    {
        slug: "conversion-optimization",
        icon: "funnel",
        title: "Revenue Growth & Conversion Optimization",
        short: "Conversion Optimization",
        caption: "CRO & Growth",
        description: "Audits, A/B tests and funnel improvements.",
        tags: ["CRO Audits", "A/B Testing", "Funnel Optimization", "Analytics Setup", "Retention"],
    },
    {
        slug: "managed-operations",
        icon: "headset",
        title: "Managed Operations & Dedicated Support Teams",
        short: "Managed Operations",
        caption: "Operations & Support",
        description: "Customer support, back-office and process setup.",
        tags: ["Customer Support", "Back-office Operations", "Project Management", "Process Setup", "SLA Reporting"],
    },
];

export const SERVICES: Service[] = RAW.map((s) => ({
    ...s,
    href: `/services/${s.slug}`,
}));