export type InsightArticle = {
    title: string;
    summary: string;
    category: string;
};

export const INSIGHT_ARTICLES: InsightArticle[] = [
    {
        title: "SEO vs AEO vs GEO: what to prioritize first",
        summary: "Understand how search engines and AI assistants discover, interpret and cite your business.",
        category: "AI search",
    },
    {
        title: "What counts as a qualified B2B lead?",
        summary: "Agree role, company, need and handoff criteria before measuring outreach results.",
        category: "B2B lead generation",
    },
    {
        title: "How to plan social content for an ecommerce launch",
        summary: "Connect product discovery, customer stories and a clear buying action across the launch calendar.",
        category: "Social media",
    },
    {
        title: "When should an AI agent hand off to a person?",
        summary: "Set escalation rules for uncertain requests, sensitive topics and exceptions that need human judgment.",
        category: "AI automation",
    },
];
