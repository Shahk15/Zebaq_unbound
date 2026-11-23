import { useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import DetailHero from "../components/service-detail/DetailHero";
import DetailAbout from "../components/service-detail/DetailAbout";
import DetailCompound from "../components/service-detail/DetailCompound";
import DetailFit from "../components/service-detail/DetailFit";
import DetailScope from "../components/service-detail/DetailScope";
import DetailCover from "../components/service-detail/DetailCover";
import { getDetail } from "../data/services/details/registry";
import { useSiteMotion } from "../hooks/useSiteMotion";

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const detail = getDetail(slug);
    const root = useRef<HTMLDivElement>(null);

    // Gives the shared data-reveal / Split motion to every section
    useSiteMotion(root);

    // Page body colour for this route only
    useEffect(() => {
        const prev = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "var(--color-off, #f7f6f1)";
        return () => {
            document.body.style.backgroundColor = prev;
        };
    }, []);

    // Unknown slug: back to the services page
    if (!detail) return <Navigate to="/services" replace />;

    return (
        // The key remounts every section when the slug changes, so animations never carry over
        <div ref={root} key={detail.slug} className="bg-off">
            <Header />
            <main>
                <DetailHero data={detail.hero} />
                <DetailAbout data={detail.about} />
                <DetailCompound data={detail.compound} />
                <DetailFit data={detail.fit} />
                <DetailScope data={detail.scope} />
                <DetailCover data={detail.cover} />
            </main>
        </div>
    );
}