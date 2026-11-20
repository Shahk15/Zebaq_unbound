import { useRef } from "react";

import Header from "../components/layout/Header";
import ServicesHero from "../components/services/ServicesHero";
import ServicesList from "../components/services/ServicesList";
import FeaturedProjects from "../components/services/FeaturedProjects";
import ServicesNumbers from "../components/services/ServicesNumbers";
import WhiteLabel from "../components/home/WhiteLabel";
import ClientsMarquee from "../components/services/ClientsMarquee";
import { useSiteMotion } from "../hooks/useSiteMotion";

export default function ServicesPage() {
    const root = useRef<HTMLDivElement>(null);

    // Gives the shared Home sections (WhiteLabel) their data-reveal / data-split motion
    useSiteMotion(root);

    return (
        <div ref={root}>
            <Header />
            <main>
                <ServicesHero />
                <ServicesList />
                <FeaturedProjects />
                <ServicesNumbers />
                <ClientsMarquee />
                <WhiteLabel />
            </main>
        </div>
    );
}