import { useEffect, type ComponentType } from "react";
import { Navigate, useParams } from "react-router-dom";
import ServiceLayout from "../../components/layout/ServiceLayout";
import WhatYouGetSection from "../../components/service-sections/WhatYouGetSection";
import GrowthGraphSection from "../../components/service-sections/GrowthGraphSection";
import SpeedSection from "../../components/service-sections/SpeedSection";
import SvcHero from "../../components/svc/SvcHero";
import { Benefits, CtaBand, DemoFrame, NextServices, Platforms, Proof, Scenes, SvcFaq } from "../../components/svc/Sections";
import PlanBuilder from "../../components/svc/PlanBuilder";
import Booking from "../../components/svc/Booking";
import StickyCta from "../../components/svc/StickyCta";
import AiDemo from "../../components/svc/demos/AiDemo";
import B2bDemo from "../../components/svc/demos/B2bDemo";
import StoreDemo from "../../components/svc/demos/StoreDemo";
import AdsDemo from "../../components/svc/demos/AdsDemo";
import SocialDemo from "../../components/svc/demos/SocialDemo";
import VideoDemo from "../../components/svc/demos/VideoDemo";
import AgentDemo from "../../components/svc/demos/AgentDemo";
import TeamDemo from "../../components/svc/demos/TeamDemo";
import FunnelDemo from "../../components/svc/demos/FunnelDemo";
import DeskDemo from "../../components/svc/demos/DeskDemo";
import { PAGES_A } from "../../data/services/pages-a";
import { PAGES_B } from "../../data/services/pages-b";
import ai from "../../data/services/details/ai-search-visibility";
import web from "../../data/services/details/web-development";
import { SERVICES } from "../../data/shared/services";
import type { ServicePageContent } from "../../data/services/page-types";

const PAGES = [...PAGES_A, ...PAGES_B];
const DEMOS: Record<ServicePageContent["demo"], ComponentType> = {
    ai: AiDemo, b2b: B2bDemo, store: StoreDemo, ads: AdsDemo, social: SocialDemo,
    video: VideoDemo, agent: AgentDemo, team: TeamDemo, funnel: FunnelDemo, desk: DeskDemo,
};

const SERVICE_SEO: Record<string, { title: string; description: string }> = {
    "ai-search-visibility": {
        title: "AI Search Visibility, SEO, AEO & GEO Services | ZEBAQ",
        description: "Improve how customers find and evaluate your business on Google and AI search with technical SEO, answer-first content and visibility reporting.",
    },
    "b2b-prospecting-outreach": {
        title: "B2B Lead Generation & LinkedIn Outreach | ZEBAQ",
        description: "Reach relevant decision-makers with account research, LinkedIn and email outreach, reply handling and B2B appointment setting.",
    },
    "social-media-marketing": {
        title: "Social Media Management Services | ZEBAQ",
        description: "Get a managed social media team for content strategy, reels, publishing and community management across the channels your audience uses.",
    },
    "automation-ai-agents": {
        title: "AI Automation & AI Agent Services | ZEBAQ",
        description: "Automate lead qualification, booking, CRM updates and follow-up with AI agents and workflows built around your business.",
    },
    "web-development": {
        title: "Website Design & Development Services | ZEBAQ",
        description: "Build a business website, Shopify store or landing page with mobile-friendly design, search foundations and conversion tracking.",
    },
    "performance-marketing": {
        title: "Performance Marketing & Paid Lead Generation | ZEBAQ",
        description: "Run Google Ads and Meta Ads with conversion tracking, creative testing and reporting tied to lead quality or ecommerce sales.",
    },
    "creative-video": {
        title: "Creative Content & Short-Form Video Production | ZEBAQ",
        description: "Get reels, short-form video, campaign assets and repurposed content designed for the platforms you publish on.",
    },
    "dedicated-talent": {
        title: "Hire Dedicated Marketing & Creative Talent | ZEBAQ",
        description: "Add a dedicated marketer, designer, editor or developer to support your business or agency’s delivery workflow.",
    },
    "conversion-optimization": {
        title: "Conversion Rate Optimization Services | ZEBAQ",
        description: "Identify where website visitors drop off and improve key pages, forms and follow-up flows with conversion rate optimization.",
    },
    "managed-operations": {
        title: "Managed Enquiry & Booking Support | ZEBAQ",
        description: "Get a managed team for enquiry handling, booking coordination and reporting, with coverage and escalation agreed upfront.",
    },
};

// One page for every service: same frame and rhythm, its own demo, story, pricing and booking
export default function ServicePage() {
    const { slug = "" } = useParams();
    useEffect(() => {
        const seo = SERVICE_SEO[slug];
        if (!seo) return;

        const previousTitle = document.title;
        document.title = seo.title;

        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const previousDescription = meta?.content;
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = seo.description;

        return () => {
            document.title = previousTitle;
            if (previousDescription !== undefined) meta!.content = previousDescription;
        };
    }, [slug]);

    const page = PAGES.find((p) => p.slug === slug);
    if (!page) return <Navigate to="/services" replace />;
    const Demo = DEMOS[page.demo];
    const service = SERVICES.find((s) => s.slug === slug)!;

    return (
        // keyed so every section starts fresh when moving from one service to another
        <div key={slug} className="deep-split">
            <ServiceLayout>
                <SvcHero data={page.hero} />
                <Platforms items={page.platforms} />
                <DemoFrame copy={page.demoCopy}><Demo /></DemoFrame>
                <Benefits data={page.benefits} />
                <Scenes data={page.scenes} />
                {/* the two detail scenes built for these services stay part of their pages */}
                {slug === "ai-search-visibility" && <GrowthGraphSection data={ai.graph} />}
                {slug === "web-development" && <SpeedSection data={web.speed} />}
                <WhatYouGetSection data={page.get} />
                <CtaBand text="Ready to see this working for {biz}?" label="Book a Strategy Call" />
                <Proof data={page.proof} />
                <PlanBuilder slug={slug} />
                <Booking slug={slug} />
                <SvcFaq items={page.faq} />
                <NextServices slug={slug} />
            </ServiceLayout>
            <StickyCta label={service.short} />
        </div>
    );
}
