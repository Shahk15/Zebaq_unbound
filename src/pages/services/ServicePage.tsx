import type { ComponentType } from "react";
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

// One page for every service: same frame and rhythm, its own demo, story, pricing and booking
export default function ServicePage() {
    const { slug = "" } = useParams();
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
                <CtaBand text="Ready to see this working for {biz}?" label="Book my free call" />
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
