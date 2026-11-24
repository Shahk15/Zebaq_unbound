import ServiceLayout from "../../components/layout/ServiceLayout";
import content from "../../data/services/details/web-development";
import HeroSection from "../../components/service-sections/HeroSection";
import AboutSection from "../../components/service-sections/AboutSection";
import SpeedSection from "../../components/service-sections/SpeedSection";
import WhoForSection from "../../components/service-sections/WhoForSection";
import WhatYouGetSection from "../../components/service-sections/WhatYouGetSection";
import WhatWeCoverSection from "../../components/service-sections/WhatWeCoverSection";

// Web Development: same sections, but the third one is the speed demo instead of the growth graph
export default function WebDevelopmentPage() {
    return (
        <ServiceLayout>
            <HeroSection data={content.hero} />
            <AboutSection data={content.about} />
            <SpeedSection data={content.speed} />
            <WhoForSection data={content.whoFor} />
            <WhatYouGetSection data={content.whatYouGet} />
            <WhatWeCoverSection data={content.whatWeCover} />
        </ServiceLayout>
    );
}