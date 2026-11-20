
import { SERVICES } from "../shared/services";

type Loose = Record<string, unknown>;

const str = (o: Loose, keys: string[]) => {
    for (const k of keys) {
        const v = o[k];

        if (typeof v === "string" && v) {
            return v;
        }
    }

    return "";
};

/* =========================================================
   SERVICE CARD DATA
========================================================= */

export type ServiceCardData = {
    slug: string;
    n: string;
    title: string;
    caption: string;
    tags: string[];
    href: string;
};

export const SERVICE_CARDS: ServiceCardData[] = (
    SERVICES as unknown as Loose[]
).map((s, i) => {
    const slug = str(s, ["slug"]) || `service-${i + 1}`;

    return {
        slug,
        n: String(i + 1).padStart(2, "0"),
        title: str(s, ["title", "short", "name"]),
        caption: str(s, ["caption", "outcome", "name"]),
        tags: Array.isArray(s.tags)
            ? (s.tags as unknown[]).filter(
                (t): t is string => typeof t === "string"
            )
            : [],
        href: str(s, ["href"]) || `/services/${slug}`,
    };
});

/* =========================================================
   SERVICES HERO
========================================================= */

export const HERO = {
    eyebrow: "Services",
    line1: "Ten services.",
    line2: "One system that grows you",

    text: "Strategy, design, development and growth under one roof. Pick the discipline you need today, and connect the rest as you scale.",

    primary: {
        label: "Book a strategy call",
        href: "/contact",
    },

    secondary: {
        label: "View case studies",
        href: "/work",
    },
};

/* =========================================================
   SERVICES GRID
========================================================= */

export const GRID = {
    label: "Our Services",

    line1: "Ten disciplines.",
    line2: "One growth system",

    cta: {
        title: "Not sure where to start?",
        text: "Tell us the outcome you need. We will map the right mix.",
        label: "Let's talk",
        href: "/contact",
    },
};

/* =========================================================
   FEATURED WORK
========================================================= */

export const FEATURED = {
    label: "Our Work",

    heading: "Featured work",

    count: 6,

    all: {
        label: "View all projects",
        href: "/work",
    },
};

/* =========================================================
   NUMBERS
========================================================= */

export const NUMBERS = {
    label: "In numbers",
    heading: "Zebaq in numbers",
    text: "Growth you can measure. Here is what our work adds up to.",
    cta: { label: "Let's talk", href: "/contact" },
    // Placeholder stats: replace with real figures
    stats: [
        {
            value: 100,
            suffix: "+",
            label: "Projects completed",
            note: "From first sketch to launch, delivered end to end.",
            image: "/images/numbers/projects.webp",
            video: "/videos/numbers/projects.mp4",
        },
        {
            value: 98,
            suffix: "%",
            label: "Client satisfaction",
            note: "Clients who would recommend us to a friend.",
            image: "/images/numbers/satisfaction.webp",
            video: "/videos/numbers/satisfaction.mp4",
        },
        {
            value: 25,
            suffix: "+",
            label: "Experts on the team",
            note: "Strategists, designers, developers and marketers.",
            image: "/images/numbers/team.webp",
            video: "/videos/numbers/team.mp4",
        },
        {
            value: 8,
            suffix: "/10",
            label: "Clients return for more",
            note: "Most of our work comes from people we already work with.",
            image: "/images/numbers/clients.webp",
            video: "/videos/numbers/clients.mp4",
        },
    ],
};
