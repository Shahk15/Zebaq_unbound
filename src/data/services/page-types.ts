import type { WhatYouGetContent } from "./types";

export type Float = { logo: string; title: string; sub: string };

export type ServicePageContent = {
    slug: string;
    /** key of the interactive demo, see components/svc/demos */
    demo: "ai" | "b2b" | "store" | "ads" | "social" | "video" | "agent" | "team" | "funnel" | "desk";
    hero: { eyebrow: string; line1: string; line2: string; text: string; photo: string; floats: Float[] };
    platforms: string[];
    demoCopy: { eyebrow: string; title: string; text: string; cta: string };
    benefits: { title: string; photo: string; items: { t: string; d: string }[]; cta: string };
    scenes: { title: string; items: { photo: string; who: string; before: string; after: string }[] };
    get: WhatYouGetContent;
    proof: { title: string; slugs: string[] };
    faq: { q: string; a: string }[];
};

export type PriceControl = { id: string; label: string; min: number; max: number; step: number; def: number; unit: string; rate: number };
export type PriceTier = { name: string; for: string; base: number; includes: string[] };
export type ServicePricing = {
    /** what the figure is for */
    per: "month" | "project" | "hour";
    tiers: PriceTier[];
    controls: PriceControl[];
    addons: { label: string; price: number }[];
};
