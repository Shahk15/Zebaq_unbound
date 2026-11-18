export type TechGroup = {
    title: string;
    tools: string[];
};

export const TECH_GROUPS: TechGroup[] = [
    { title: "CRM & Funnels", tools: ["HubSpot", "GoHighLevel", "Salesforce", "ClickFunnels"] },
    { title: "AI & Automation", tools: ["OpenAI", "Zapier", "Make", "n8n"] },
    { title: "Marketing & Analytics", tools: ["Google Ads", "Meta Ads", "GA4", "Canva"] },
    { title: "Web & Commerce", tools: ["Shopify", "WordPress", "Webflow", "WooCommerce"] },
];

export const TECH_NOTE = "Implementation support subject to agreed scope; no implied certifications.";