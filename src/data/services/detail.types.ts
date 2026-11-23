export type Cta = { label: string; href: string };

export type ServiceDetail = {
    slug: string; // must match the slug in data/shared/services
    name: string;
    hero: {
        eyebrow: string;
        line1: string;
        line2: string;
        text: string;
        primary: Cta;
        secondary: Cta;
        stats: { value: string; label: string; note: string }[];
    };
    about: {
        eyebrow: string;
        title: string;
        text: string[];
        cards: { n: string; title: string; text: string }[];
    };
    compound: {
        eyebrow: string;
        title: string;
        meter: { label: string; from: number; to: number; suffix: string };
        months: number;
        phases: { title: string; range: string; from: number; text: string }[];
        note: string;
    };
    fit: {
        eyebrow: string;
        title: string;
        text: string;
        yes: { label: string; items: string[] };
        no: { label: string; items: string[] };
    };
    scope: {
        eyebrow: string;
        title: string;
        items: { title: string; text: string }[];
        timeline: { eyebrow: string; text: string; steps: { title: string; text: string }[] };
    };
    cover: { eyebrow: string; items: string[] };
};