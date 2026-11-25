import { useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import { Arrow, Split } from "../components/common/ui";
import { useSiteMotion } from "../hooks/useSiteMotion";

const ARTICLES = [
    {
        title: "SEO vs AEO vs GEO: what to prioritize first",
        summary: "Understand how search engines and AI assistants discover, interpret and cite your business.",
        category: "AI search",
    },
    {
        title: "What counts as a qualified B2B lead?",
        summary: "Agree role, company, need and handoff criteria before measuring outreach results.",
        category: "B2B lead generation",
    },
    {
        title: "How to plan social content for an ecommerce launch",
        summary: "Connect product discovery, customer stories and a clear buying action across the launch calendar.",
        category: "Social media",
    },
    {
        title: "When should an AI agent hand off to a person?",
        summary: "Set escalation rules for uncertain requests, sensitive topics and exceptions that need human judgment.",
        category: "AI automation",
    },
];

export default function InsightsPage() {
    const root = useRef<HTMLDivElement>(null);
    useSiteMotion(root);

    useEffect(() => {
        const previousTitle = document.title;
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const previousDescription = meta?.content;
        document.title = "Digital Marketing & AI Search Insights | ZEBAQ";
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = "Read practical guides on SEO and AI search, B2B outreach, social media management and AI automation.";
        return () => {
            document.title = previousTitle;
            if (meta && previousDescription !== undefined) meta.content = previousDescription;
        };
    }, []);

    return (
        <div ref={root} className="bg-off">
            <Header />
            <main>
                <section data-header-solid className="bg-ink text-off">
                    <div className="wrap pb-16 pt-36 md:pb-24 md:pt-44">
                        <p className="eyebrow text-glacier-3" data-reveal>ZEBAQ insights</p>
                        <h1 className="mt-8 max-w-5xl text-[64px] font-medium leading-[0.92] tracking-[-0.055em] md:text-[112px]">
                            Practical guides for digital growth.
                        </h1>
                        <p className="mt-8 max-w-3xl text-[19px] leading-relaxed text-glacier-2 md:text-[23px]" data-reveal>
                            Explore hands-on advice on getting found in search, reaching the right B2B buyers, managing social content and automating follow-up.
                        </p>
                    </div>
                </section>

                <section className="bg-off py-16 text-navy md:py-24">
                    <div className="wrap">
                        <p className="eyebrow text-navy-2" data-reveal>Start with a topic</p>
                        <h2 className="mt-8 max-w-[14ch] text-[48px] font-medium leading-[1] tracking-[-0.05em] md:text-[72px]">
                            <Split text="Guides for the decisions that come next" dot />
                        </h2>
                        <div className="mt-12 grid gap-4 md:grid-cols-2" data-flip>
                            {ARTICLES.map((article) => (
                                <article key={article.title} className="group rounded-[28px] border border-navy/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-lemon-deep/40 hover:shadow-[0_24px_60px_-32px_rgba(10,31,68,.35)] md:p-9">
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-2">{article.category}</p>
                                    <h3 className="mt-5 max-w-[18ch] text-[28px] font-medium leading-[1.05] tracking-[-0.04em] md:text-[36px]">{article.title}</h3>
                                    <p className="mt-5 max-w-[38ch] leading-relaxed text-navy-2">{article.summary}</p>
                                    <a href="/services" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em]">
                                        Explore the related service
                                        <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-off transition-transform duration-500 group-hover:rotate-45 group-hover:bg-lemon group-hover:text-navy"><Arrow size={16} /></span>
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
