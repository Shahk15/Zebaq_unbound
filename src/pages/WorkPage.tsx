import { useEffect } from "react";

import Header from "../components/layout/Header";
import WorkHero from "../components/work/WorkHero";
import WorkProjects from "../components/work/WorkProjects";

export default function WorkPage() {
    // Page body colour for this route only (shows behind rounded edges, pin gaps and overscroll)
    useEffect(() => {
        const prev = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "var(--color-off, #f7f6f1)";
        return () => {
            document.body.style.backgroundColor = prev;
        };
    }, []);

    return (
        <div className="min-h-screen bg-off text-navy">
            <Header />
            <main>
                <WorkHero />
                <WorkProjects />
            </main>
        </div>
    );
}