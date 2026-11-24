export type Cta = { label: string; href: string };

export type HeroContent = {
    eyebrow: string;
    line1: string;
    line2: string;
    text: string;
    primary: Cta;
    secondary: Cta;
    stats: { value: string; label: string; note: string }[];
};

export type AboutContent = {
    eyebrow: string;
    title: string;
    text: string[];
    cards: { n: string; title: string; text: string }[];
};

export type GraphContent = {
    eyebrow: string;
    title: string;
    meter: { label: string; from: number; to: number; suffix: string };
    months: number;
    phases: { title: string; range: string; from: number; text: string }[];
    note: string;
};

export type SpeedContent = {
    eyebrow: string;
    title: string;
    text: string;
    metrics: { label: string; value: number; decimals?: number; prefix?: string; unit: string; note: string }[];
    frame: { url: string; loading: string; ready: string };
    note: string;
};

export type WhoForContent = {
    eyebrow: string;
    title: string;
    text: string;
    yes: { label: string; items: string[] };
    no: { label: string; items: string[] };
};

export type WhatYouGetContent = {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
    timeline: { eyebrow: string; text: string; steps: { title: string; text: string }[] };
};

export type WhatWeCoverContent = {
    eyebrow: string;
    items: string[];
};