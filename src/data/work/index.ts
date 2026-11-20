export type WorkCategory = "Web Design" | "Branding" | "UX/UI" | "Development";

export type WorkItem = {
    slug: string;
    title: string;
    year: string; // shown after the title
    category: WorkCategory;
    tags: string[]; // chips on the right (max 2 shown)
    image: string; // resting state
    video?: string; // plays on hover
    surface: string; // tile background colour behind the image
    href: string;
};

export const PAGE_COPY = {
    eyebrow: "Our work",
    titleLine1: "Real projects.",
    titleLine2: "Real growth",
    sub: "Every project started with a business reason. Here is what we built, and why it worked.",
    label: "Our projects",
};

export const WORK_FILTERS: ("All" | WorkCategory)[] = ["All", "Web Design", "Branding", "UX/UI", "Development"];

// Put the files in public/images/work/ and public/videos/work/
export const WORK_ITEMS: WorkItem[] = [
    {
        slug: "utopia-lounge-atlanta",
        title: "Utopia",
        year: "2026",
        category: "Web Design",
        tags: ["Web Design", "Development"],
        image: "/images/work/utopiawork.png",
        video: "/videos/work/utopiawork.mp4",
        surface: "#ffd9a8",
        href: "/work/project-one",
    },
    {
        slug: "royal-blessings",
        title: "Royal Blessings",
        year: "2026",
        category: "Branding",
        tags: ["Branding", "Web Design"],
        image: "/images/work/royalblessingwork.png",
        video: "/videos/work/royalblessingwork.mp4",
        surface: "#f2d27a",
        href: "/work/project-two",
    },
    {
        slug: "destinatio_360",
        title: "Destination-360",
        year: "2026",
        category: "UX/UI",
        tags: ["UX/UI"],
        image: "/images/work/destination360work.png",
        video: "/videos/work/destination360work.mp4",
        surface: "#bfe6b8",
        href: "/work/project-three",
    },
    {
        slug: "tamarind-indian-fine-dining",
        title: "Tamarind",
        year: "2025",
        category: "Development",
        tags: ["Development", "Web Design"],
        image: "/images/work/tamarindwork.png",
        video: "/videos/work/tamarindwork.mp4",
        surface: "#f2b5a8",
        href: "/work/project-four",
    },
    {
        slug: "chicos-choice-dogs",
        title: "Chicos Choice Dogs",
        year: "2025",
        category: "Web Design",
        tags: ["Web Design"],
        image: "/images/work/chicoschoicework.png",
        video: "/videos/work/chicoschoicework.mp4",
        surface: "#ffe08a",
        href: "/work/project-five",
    },
    {
        slug: "palm-residential",
        title: "Palm Residential",
        year: "2025",
        category: "Branding",
        tags: ["Branding"],
        image: "/images/work/palmresidentialwork.png",
        video: "/videos/work/palmresidentialwork.mp4",
        surface: "#f3c98b",
        href: "/work/project-six",
    },
    {
        slug: "queens-designs",
        title: "Queens Designs",
        year: "2025",
        category: "UX/UI",
        tags: ["UX/UI", "Development"],
        image: "/images/work/queensdesignwork.png",
        video: "/videos/work/queensdesignwork.mp4",
        surface: "#b9c8ee",
        href: "/work/project-seven",
    },
    {
        slug: "disha-isha-home-decor",
        title: "Disha & Isha Home Decor",
        year: "2024",
        category: "Development",
        tags: ["Development"],
        image: "/images/work/dihomedecorwork.png",
        video: "/videos/work/dihomedecorwork.mp4",
        surface: "#bcd3f0",
        href: "/work/project-eight",
    },
];