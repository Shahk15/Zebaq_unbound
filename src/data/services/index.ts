
export type ServiceCategory = "Design" | "Development" | "Growth" | "AI";

export type ServiceItem = {
    slug: string;
    title: string;
    kicker: string;
    category: ServiceCategory;
    tags: string[];
    image: string;
    video?: string;
    href: string;
    surface: string;
};

export const PAGE_COPY = {
    eyebrow: "OUR SERVICES",
    titleLine1: "Ten disciplines.",
    titleLine2: "One growth system",
    sub: "Every engagement starts with the outcome you need. Pick one discipline, or connect them all.",
    label: "All services",
};

export const SERVICE_FILTERS: ("All" | ServiceCategory)[] = [
    "All",
    "Design",
    "Development",
    "Growth",
    "AI",
];

export const SERVICE_ITEMS: ServiceItem[] = [
    {
        slug: "web-design",
        title: "Web Design",
        kicker: "Websites",
        category: "Design",
        tags: ["UI/UX", "Branding"],
        image: "/images/work/case1.png",
        video: "/videos/services/case1.mp4",
        href: "/services/web-design",
        surface: "#E5EDF3",
    },
    {
        slug: "web-development",
        title: "Web Development",
        kicker: "Build",
        category: "Development",
        tags: ["React", "WordPress"],
        image: "/images/services/web-development.webp",
        video: "/videos/services/web-development.mp4",
        href: "/services/web-development",
        surface: "#EAE9E2",
    },
    {
        slug: "mobile-apps",
        title: "Mobile Apps",
        kicker: "iOS & Android",
        category: "Development",
        tags: ["App Dev", "Flutter"],
        image: "/images/services/mobile-apps.webp",
        video: "/videos/services/mobile-apps.mp4",
        href: "/services/mobile-apps",
        surface: "#E3ECF1",
    },
    {
        slug: "branding",
        title: "Branding",
        kicker: "Identity",
        category: "Design",
        tags: ["Logo", "Guidelines"],
        image: "/images/services/branding.webp",
        video: "/videos/services/branding.mp4",
        href: "/services/branding",
        surface: "#EAE8E1",
    },
    {
        slug: "ui-ux",
        title: "UI/UX Design",
        kicker: "Product",
        category: "Design",
        tags: ["Research", "Prototype"],
        image: "/images/services/ui-ux.webp",
        video: "/videos/services/ui-ux.mp4",
        href: "/services/ui-ux",
        surface: "#E5EDF3",
    },
    {
        slug: "seo",
        title: "SEO",
        kicker: "Search",
        category: "Growth",
        tags: ["Technical", "Content"],
        image: "/images/services/seo.webp",
        video: "/videos/services/seo.mp4",
        href: "/services/seo",
        surface: "#EAE9E2",
    },
    {
        slug: "social-media",
        title: "Social Media",
        kicker: "Community",
        category: "Growth",
        tags: ["Strategy", "Creative"],
        image: "/images/services/social-media.webp",
        video: "/videos/services/social-media.mp4",
        href: "/services/social-media",
        surface: "#E3ECF1",
    },
    {
        slug: "performance-marketing",
        title: "Performance Marketing",
        kicker: "Ads",
        category: "Growth",
        tags: ["Google Ads", "Meta Ads"],
        image: "/images/services/performance-marketing.webp",
        video: "/videos/services/performance-marketing.mp4",
        href: "/services/performance-marketing",
        surface: "#EAE8E1",
    },
    {
        slug: "content",
        title: "Content Creation",
        kicker: "Stories",
        category: "Growth",
        tags: ["Video", "Copy"],
        image: "/images/services/content.webp",
        video: "/videos/services/content.mp4",
        href: "/services/content",
        surface: "#E5EDF3",
    },
    {
        slug: "ai-solutions",
        title: "AI & Automation",
        kicker: "Systems",
        category: "AI",
        tags: ["Chatbots", "Workflows"],
        image: "/images/services/ai-solutions.webp",
        video: "/videos/services/ai-solutions.mp4",
        href: "/services/ai-solutions",
        surface: "#EAE9E2",
    },
];
