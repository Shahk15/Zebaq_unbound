import type {
    HeroContent,
    AboutContent,
    GraphContent,
    WhoForContent,
    WhatYouGetContent,
    WhatWeCoverContent,
} from "../types";

const content: {
    hero: HeroContent;
    about: AboutContent;
    graph: GraphContent;
    whoFor: WhoForContent;
    whatYouGet: WhatYouGetContent;
    whatWeCover: WhatWeCoverContent;
} = {
    hero: {
        eyebrow: "AI Search · AEO · GEO",
        line1: "Customers now ask AI first.",
        line2: "We make sure it names you",
        text: "AI search visibility for brands that want to be cited, recommended and chosen inside ChatGPT, Gemini, Perplexity and Google AI Overviews. Built on strong SEO foundations, measured every month.",
        primary: { label: "Book a strategy call", href: "/#contact" },
        secondary: { label: "View case studies", href: "/work" },
        stats: [
            { value: "4", label: "AI platforms tracked", note: "ChatGPT, Gemini, Perplexity, AI Overviews" },
            { value: "Monthly", label: "Visibility reporting", note: "Mentions, citations, share of voice" },
            { value: "3", label: "Growth phases", note: "Foundation, execution, compounding" },
            { value: "1", label: "Accountable team", note: "SEO, content and technical under one roof" },
        ],
    },

    about: {
        eyebrow: "About this service",
        title: "Be the brand AI recommends",
        text: [
            "AI assistants and AI Overviews now answer questions before a customer ever clicks a link. If your brand is not inside that answer, you are not part of the conversation.",
            "We combine technical SEO, answer-first content and entity authority, so AI systems understand who you are, trust what you say and name you when it matters.",
            "No vanity metrics. No fluff reports. Just compounding visibility, measured by the enquiries it brings.",
        ],
        cards: [
            { n: "01", title: "Compounding visibility", text: "Every citation and mention builds on the last. Work done in month one keeps paying off in month twelve." },
            { n: "02", title: "AEO + GEO ready", text: "Content and structure built for answer engines and generative search, not only for blue links." },
            { n: "03", title: "Outcomes, not vanity", text: "We track mentions, citations and the enquiries they drive, not impressions that look good in a slide." },
            { n: "04", title: "Senior-led, always", text: "Your strategy is led by the people who built it. No hand-offs to a rotating junior bench." },
        ],
    },

    graph: {
        eyebrow: "How visibility compounds",
        title: "Built to compound",
        meter: { label: "Visibility index", from: 0, to: 100, suffix: "/100" },
        months: 12,
        phases: [
            { title: "Foundation", range: "Months 1–3", from: 1, text: "Audit, entity and schema setup, technical fixes." },
            { title: "Execution", range: "Months 4–6", from: 4, text: "Answer-first content, authority mentions, tracking live." },
            { title: "Compounding", range: "Months 7–12", from: 7, text: "Citations build on each other and share of voice climbs." },
        ],
        note: "Illustrative trajectory. Results vary by market, competition and starting point.",
    },

    whoFor: {
        eyebrow: "Who this is for",
        title: "We don't take on every project",
        text: "Visibility retainers are built for brands ready to commit to the long run. If that is not you right now, we will tell you honestly.",
        yes: {
            label: "This is for you if",
            items: [
                "You want compounding visibility, not a one-off campaign spike",
                "You want to be named in ChatGPT, Gemini and Perplexity answers",
                "You sell premium products or services where trust decides the sale",
                "You want to be found by buyers who research with AI before they call",
                "You are ready for a sustained engagement, not a short pilot",
                "You want attributed outcomes, not vanity metrics, in every monthly report",
            ],
        },
        no: {
            label: "Probably not for you if",
            items: [
                "You are shopping for the cheapest option across five agencies",
                "You expect guaranteed rankings or AI mentions. No honest agency can promise them",
                "You need traffic this week. This work compounds over months",
                "You cannot commit beyond a short trial",
            ],
        },
    },

    whatYouGet: {
        eyebrow: "What you get",
        title: "A clear scope for search and AI visibility",
        items: [
            { title: "Baseline and priority queries", text: "Establish a baseline and agree the queries, pages and outcomes that matter." },
            { title: "Crawlability and indexing", text: "Audit crawlability and indexing, then improve priority pages and internal links." },
            { title: "Visible business details", text: "Verify visible business details and keep names, services and locations consistent." },
            { title: "Applicable structured data", text: "Add structured data where it helps search and AI systems understand the page." },
            { title: "Search and AI referral tracking", text: "Track search activity and measurable AI referrals where they can be observed." },
            { title: "Crawler policies", text: "Treat llms.txt as optional and distinguish Googlebot from OAI-SearchBot policies." },
        ],
        timeline: {
            eyebrow: "How the work unfolds",
            text: "The early months are foundation work. Execution ramps up next. Later months are when the results compound into real enquiries.",
            steps: [
                { title: "Audit & discovery", text: "AI visibility baseline, competitor gaps and a clear priority list." },
                { title: "Strategy & setup", text: "Entity, schema and technical fixes, plus the content plan." },
                { title: "Execution & ramp", text: "Answer-first content and authority building go live." },
                { title: "Iteration & scale", text: "Monthly learning loops double down on what works." },
            ],
        },
    },

    whatWeCover: {
        eyebrow: "What we cover",
        items: ["AI Search", "AEO & GEO", "Technical SEO", "Entity & Schema", "Content", "Digital PR", "Analytics & Tracking"],
    },
};

export default content;