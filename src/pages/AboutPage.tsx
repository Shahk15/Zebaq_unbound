import { useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import ReachMap from "../components/about/ReachMap";
import Mission from "../components/about/Mission";
import Values from "../components/about/Values";
import JoinCards from "../components/about/JoinCards";
import { ABOUT_HERO, WHO, MAP, MISSION, VALUES, JOIN } from "../data/about";
import { useSiteMotion } from "../hooks/useSiteMotion";

// About: the sections below show in this order
export default function AboutPage() {
    const root = useRef<HTMLDivElement>(null);

    useSiteMotion(root);

    // Page body colour for this route only
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
                <AboutHero data={ABOUT_HERO} />
                <WhoWeAre data={WHO} />
                <ReachMap data={MAP} />
                <Mission data={MISSION} />
                <Values data={VALUES} />
                <JoinCards data={JOIN} />
            </main>
        </div>
    );
}