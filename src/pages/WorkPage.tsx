import { useEffect, useRef } from "react";

import Header from "../components/layout/Header";
import WorkHero from "../components/work/WorkHero";
import WorkReel from "../components/work/WorkReel";
import WorkIndex from "../components/work/WorkIndex";
import WorkCta from "../components/work/WorkCta";
import { useSiteMotion } from "../hooks/useSiteMotion";

// Work page: hero (ribbon of screens) → pinned horizontal reel that takes on each
// project's colour → filterable index with a cursor-following video preview → CTA.
export default function WorkPage() {
    const root = useRef<HTMLDivElement>(null);

    // data-reveal / data-split motion for the sections below the hero
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
        <div ref={root} className="deep-split min-h-screen bg-off text-navy">
            <Header />
            <main>
                <WorkHero />
                <WorkReel />
                <WorkIndex />
                <WorkCta />
            </main>
        </div>
    );
}
