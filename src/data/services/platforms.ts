// Platforms we work with. Logos live in public/images/platforms/<slug>.svg (open-source Simple Icons set).
// mono: no logo file available, a monogram is shown instead.
export const PLATFORM_NAMES: Record<string, { name: string; mono?: boolean }> = {
    instagram: { name: "Instagram" }, facebook: { name: "Facebook" }, tiktok: { name: "TikTok" }, youtube: { name: "YouTube" },
    linkedin: { name: "LinkedIn" }, pinterest: { name: "Pinterest" }, x: { name: "X" }, threads: { name: "Threads" },
    whatsapp: { name: "WhatsApp" }, messenger: { name: "Messenger" }, meta: { name: "Meta Ads" }, googleads: { name: "Google Ads" },
    google: { name: "Google" }, googleanalytics: { name: "Google Analytics" }, googlemaps: { name: "Google Maps" }, googlemeet: { name: "Google Meet" },
    googlegemini: { name: "Gemini" }, openai: { name: "ChatGPT" }, perplexity: { name: "Perplexity" }, microsoftbing: { name: "Bing" },
    hubspot: { name: "HubSpot" }, salesforce: { name: "Salesforce" }, zapier: { name: "Zapier" }, make: { name: "Make" },
    n8n: { name: "n8n", mono: true }, gohighlevel: { name: "GoHighLevel", mono: true }, capcut: { name: "CapCut", mono: true },
    shopify: { name: "Shopify" }, woocommerce: { name: "WooCommerce" }, wordpress: { name: "WordPress" }, webflow: { name: "Webflow" },
    react: { name: "React" }, nextdotjs: { name: "Next.js" }, stripe: { name: "Stripe" }, paypal: { name: "PayPal" }, cloudflare: { name: "Cloudflare" },
    adobepremierepro: { name: "Premiere Pro" }, adobeaftereffects: { name: "After Effects" }, adobephotoshop: { name: "Photoshop" },
    davinciresolve: { name: "DaVinci Resolve" }, figma: { name: "Figma" }, canva: { name: "Canva" }, greensock: { name: "GSAP" },
    hotjar: { name: "Hotjar" }, googletagmanager: { name: "Tag Manager" }, googlesearchconsole: { name: "Search Console" }, semrush: { name: "Semrush" },
    mailchimp: { name: "Mailchimp" }, calendly: { name: "Calendly" }, slack: { name: "Slack" }, notion: { name: "Notion" },
    asana: { name: "Asana" }, trello: { name: "Trello" }, zendesk: { name: "Zendesk" }, intercom: { name: "Intercom" },
    gmail: { name: "Gmail" }, zoom: { name: "Zoom" }, clickup: { name: "ClickUp" },
};
