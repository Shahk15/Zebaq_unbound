export type WorkCategory = "Web Design" | "Branding" | "UX/UI" | "Development";

export type WorkItem = {
    slug: string;
    title: string;
    year: string;
    category: WorkCategory;
    tags: string[]; // disciplines shown on the slide and in the index (max 2)
    sector: string; // client industry, shown above the title
    summary: string; // one line on what we built
    image: string; // resting state (WebP for speed; PNG originals kept next to it)
    video?: string; // plays when the slide is in focus / on hover in the index
    surface: string; // brand colour: the reel background shifts to it
    href: string;
};

export const PAGE_COPY = {
    eyebrow: "Our work",
    titleLine1: "Real projects.",
    titleLine2: "Real growth",
    sub: "Every project started with a business reason. Here is what we built, and why it worked.",
    reelEyebrow: "Selected work",
    reelTitle: "Scroll through the work",
    indexEyebrow: "Project index",
    indexTitle: "Every project",
    ctaEyebrow: "Next up",
    ctaTitle: "Your project could be next",
    ctaSub: "Tell us where you want to grow. A strategist replies within one business day with practical next steps.",
};

export const WORK_FILTERS: ("All" | WorkCategory)[] = ["All", "Web Design", "Branding", "UX/UI", "Development"];

// Files live in public/images/work/ and public/videos/work/.
// Sectors and summaries describe what each live site shows. Confirm the wording before launch.
export const WORK_ITEMS: WorkItem[] = [
    {
        slug: "utopia-lounge-atlanta",
        title: "Utopia",
        year: "2026",
        category: "Web Design",
        tags: ["Web Design", "Development"],
        sector: "Restaurant & nightlife · Atlanta",
        summary: "A premium restaurant and lounge site built around dining, cocktails and reservations.",
        image: "/images/work/utopiawork.webp",
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
        sector: "Jewellery · E-commerce",
        summary: "An elegant online store for necklaces, earrings and bridal sets.",
        image: "/images/work/royalblessingwork.webp",
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
        sector: "Sustainable hospitality",
        summary: "A hospitality website that puts sustainable stays at the centre of the story.",
        image: "/images/work/destination360work.webp",
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
        sector: "Indian fine dining",
        summary: "A fine-dining website that makes the menu, the room and booking a table feel effortless.",
        image: "/images/work/tamarindwork.webp",
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
        sector: "Pet products · E-commerce",
        summary: "A clean e-commerce store for natural dog treats, built to turn browsers into buyers.",
        image: "/images/work/chicoschoicework.webp",
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
        sector: "Home services",
        summary: "A residential experience for home services, repairs and projects.",
        image: "/images/work/palmresidentialwork.webp",
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
        sector: "Fashion & lifestyle · E-commerce",
        summary: "An online store for quilted bags, clothing, accessories and made-to-order pieces.",
        image: "/images/work/queensdesignwork.webp",
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
        sector: "Interior design · Bhubaneswar & Cuttack",
        summary: "A website for an interior design service, built to turn visits into calls and WhatsApp enquiries.",
        image: "/images/work/dihomedecorwork.webp",
        video: "/videos/work/dihomedecorwork.mp4",
        surface: "#bcd3f0",
        href: "/work/project-eight",
    },
];

export const YEARS = (() => {
    const ys = WORK_ITEMS.map((w) => Number(w.year));
    return `${Math.min(...ys)}–${Math.max(...ys)}`;
})();
