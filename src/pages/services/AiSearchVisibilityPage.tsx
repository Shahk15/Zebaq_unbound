import ServiceLayout from "../../components/layout/ServiceLayout";
import content from "../../data/services/details/ai-search-visibility";
import HeroSection from "../../components/service-sections/HeroSection";
import AboutSection from "../../components/service-sections/AboutSection";
import GrowthGraphSection from "../../components/service-sections/GrowthGraphSection";
import WhoForSection from "../../components/service-sections/WhoForSection";
import WhatYouGetSection from "../../components/service-sections/WhatYouGetSection";
import WhatWeCoverSection from "../../components/service-sections/WhatWeCoverSection";

// AI Search Visibility: the sections below show in this order
export default function AiSearchVisibilityPage() {
    return (
        <ServiceLayout>
            <HeroSection data={content.hero} />
            <AboutSection data={content.about} />
            <GrowthGraphSection data={content.graph} />
            <WhoForSection data={content.whoFor} />
            <WhatYouGetSection data={content.whatYouGet} />
            <WhatWeCoverSection data={content.whatWeCover} />
        </ServiceLayout>
    );
}