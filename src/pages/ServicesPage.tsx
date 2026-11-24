import { useEffect, useRef } from "react";


import Header from "../components/layout/Header";
import ServicesHero from "../components/services/ServicesHero";
// Same section as Home, reused as-is so the design stays identical
import Services from "../components/home/Services";
import FeaturedProjects from "../components/services/FeaturedProjects";
import ServicesNumbers from "../components/services/ServicesNumbers";
import WhiteLabel from "../components/home/WhiteLabel";
import ClientsMarquee from "../components/services/ClientsMarquee";
import { useSiteMotion } from "../hooks/useSiteMotion";

export default function ServicesPage() {
    const root = useRef<HTMLDivElement>(null);

    // Gives the shared Home sections (Services, WhiteLabel) their data-reveal / data-split motion
    useSiteMotion(root);

    // Page body colour for this route only (shows behind rounded edges, pin gaps and overscroll)
    useEffect(() => {
        const prev = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "var(--color-off, #f7f6f1)";
        return () => {
            document.body.style.backgroundColor = prev;
        };
    }, []);

    return (
        <div ref={root} className="bg-off">
            <Header />
            <main>
                <ServicesHero />
                <Services embedded />
                <FeaturedProjects />
                <ServicesNumbers />
                <ClientsMarquee />
                <WhiteLabel />
            </main>
        </div>
    );
}