import type {
    HeroContent,
    AboutContent,
    SpeedContent,
    WhoForContent,
    WhatYouGetContent,
    WhatWeCoverContent,
} from "../types";

const content: {
    hero: HeroContent;
    about: AboutContent;
    speed: SpeedContent;
    whoFor: WhoForContent;
    whatYouGet: WhatYouGetContent;
    whatWeCover: WhatWeCoverContent;
} = {
    hero: {
        eyebrow: "Web · Interactive · Custom builds",
        line1: "Websites built fast.",
        line2: "Built to convert",
        text: "Dynamic, responsive and AI-ready websites, custom applications and e-commerce, engineered with clean code and a clear goal: turning visitors into enquiries.",
        primary: { label: "Book a strategy call", href: "/#contact" },
        secondary: { label: "View case studies", href: "/work" },
        stats: [
            { value: "4", label: "Core platforms", note: "React, Next.js, WordPress and Shopify" },
            { value: "Mobile-first", label: "Every build", note: "Responsive from the very first sketch" },
            { value: "SEO + AI", label: "Ready on day one", note: "Clean markup, schema and speed built in" },
            { value: "1", label: "Accountable team", note: "Design, build and launch under one roof" },
        ],
    },

    about: {
        eyebrow: "About this service",
        title: "Custom-built, high-performing websites",
        text: [
            "We design and engineer websites from the ground up around your brand, your audience and the enquiries you want. Clear structure, thoughtful UX and solid engineering, with no template shortcuts.",
            "Every site is built to be fast, easy for search engines and AI assistants to read, and simple for your team to manage after launch.",
            "No templates. No shortcuts. Just carefully crafted websites that work.",
        ],
        cards: [
            { n: "01", title: "Designed around you", text: "Your brand, your audience and your goals shape the site, not a pre-made theme." },
            { n: "02", title: "Engineered for speed", text: "Lean code, optimised assets and modern frameworks keep every page quick." },
            { n: "03", title: "Search and AI ready", text: "Clean markup, structured data and clear content so you are easy to find and to cite." },
            { n: "04", title: "Built to grow", text: "A foundation that takes new pages, features and integrations without a rebuild." },
        ],
    },

    speed: {
        eyebrow: "Performance",
        title: "Fast is a feature",
        text: "Every build is engineered against Google's Core Web Vitals thresholds, because speed shapes rankings, conversion and the first impression.",
        metrics: [
            { label: "Lighthouse performance", value: 90, decimals: 0, unit: "+", note: "Target score" },
            { label: "Largest Contentful Paint", value: 2.5, decimals: 1, prefix: "<", unit: "s", note: "Main content on screen" },
            { label: "Interaction to Next Paint", value: 200, decimals: 0, prefix: "<", unit: "ms", note: "Taps and clicks feel instant" },
            { label: "Cumulative Layout Shift", value: 0.1, decimals: 1, prefix: "<", unit: "", note: "Nothing jumps while loading" },
        ],
        frame: { url: "yourbrand.com", loading: "Rendering…", ready: "Interactive" },
        note: "Targets we build to, based on Google's published 'good' thresholds. Real scores depend on content, hosting and third-party scripts.",
    },

    whoFor: {
        eyebrow: "Who this is for",
        title: "We don't take on every project",
        text: "We build for businesses where the website directly affects enquiries, sales and trust. If a quick template is all you need, we will tell you honestly.",
        yes: {
            label: "This is for you if",
            items: [
                "You want a custom-built website, not a template",
                "Your website needs to bring in enquiries or sales",
                "You are tired of themes that slow down and break",
                "You want to be found by search engines and AI assistants",
                "You need integrations with your CRM, payments or booking tools",
                "You want a team that stays with you after launch",
            ],
        },
        no: {
            label: "Probably not for you if",
            items: [
                "You are looking for the cheapest possible template site",
                "You need a site live in a few days",
                "You want to skip discovery and design",
                "You expect rankings to follow without content or SEO work",
            ],
        },
    },

    whatYouGet: {
        eyebrow: "What you get",
        title: "From discovery to handover",
        items: [
            { title: "Discovery", text: "Clarify the offer, audience, conversion goal and approved scope." },
            { title: "UX and visual design", text: "Plan pages and flows around how visitors understand and act." },
            { title: "Development", text: "Build a fast, responsive, maintainable service website, store or landing page." },
            { title: "Technical SEO setup", text: "Set metadata, clean markup, indexing foundations and applicable structured data." },
            { title: "Analytics and conversion tracking", text: "Measure enquiries, bookings or ecommerce actions from launch." },
            { title: "Handover", text: "Document the CMS, integrations, responsibilities and approved ongoing care." },
        ],
        timeline: {
            eyebrow: "A clear path from idea to launch",
            text: "Carefully planned stages take your website from first conversation to a fast, reliable launch.",
            steps: [
                { title: "Discover", text: "Goals, audience and scope agreed before any design starts." },
                { title: "Design", text: "UX and visual direction, reviewed with you at every step." },
                { title: "Build", text: "Clean, fast development with regular previews." },
                { title: "Launch & support", text: "Testing, go-live and a team that stays on after." },
            ],
        },
    },

    whatWeCover: {
        eyebrow: "What we build",
        items: ["Business websites", "E-commerce stores", "Landing pages", "React & Next.js apps", "WordPress builds", "Shopify stores", "Custom applications", "Integrations"],
    },
};

export default content;