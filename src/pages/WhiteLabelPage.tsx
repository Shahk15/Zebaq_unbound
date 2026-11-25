import { useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import { Pill, Split } from "../components/common/ui";
import { useSiteMotion } from "../hooks/useSiteMotion";

export default function WhiteLabelPage() {
    const root = useRef<HTMLDivElement>(null);
    useSiteMotion(root);

    useEffect(() => {
        const previousTitle = document.title;
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const previousDescription = meta?.content;
        document.title = "White-Label Digital Marketing Services for Agencies | ZEBAQ";
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = "Get white-label SEO, AI search, social media, web and automation delivery under your agency’s brand.";
        return () => {
            document.title = previousTitle;
            if (meta && previousDescription !== undefined) meta.content = previousDescription;
        };
    }, []);

    const capabilities = [
        ["White-label SEO and AI search", "Add search visibility and technical delivery under your agency’s brand."],
        ["Social media management", "Plan, create, publish and report on approved content for the client account."],
        ["Web development", "Deliver business websites, ecommerce stores and landing pages to the agreed scope."],
        ["Automation and AI workflows", "Build qualification, CRM, booking and follow-up workflows with clear escalation."],
    ];

    return (
        <div ref={root} className="bg-off">
            <Header />
            <main>
                <section data-header-solid className="bg-ink text-off">
                    <div className="wrap pb-16 pt-36 md:pb-24 md:pt-44">
                        <p className="eyebrow text-glacier-3" data-reveal>For marketing and development agencies</p>
                        <h1 className="mt-8 max-w-6xl text-[64px] font-medium leading-[0.92] tracking-[-0.055em] md:text-[112px]">
                            <Split text="White-label digital marketing" />
                            <br />
                            <Split text="delivery for agencies" dot />
                        </h1>
                        <p className="mt-8 max-w-3xl text-[19px] leading-relaxed text-glacier-2 md:text-[23px]" data-reveal>
                            Add specialist capacity for a client project or an ongoing account. ZEBAQ works behind your brand on an agreed scope, with clear approval and reporting responsibilities.
                        </p>
                        <Pill href="#contact" variant="lemon" className="mt-10">Discuss a White-Label Partnership</Pill>
                    </div>
                </section>

                <section className="bg-off py-16 text-navy md:py-24">
                    <div className="wrap">
                        <div className="grid items-end gap-8 md:grid-cols-[1fr_0.8fr]">
                            <div>
                                <p className="eyebrow text-navy-2" data-reveal>Behind your brand</p>
                                <h2 className="mt-8 max-w-[14ch] text-[48px] font-medium leading-[1] tracking-[-0.05em] md:text-[72px]">
                                    <Split text="Capacity with clear responsibility" dot />
                                </h2>
                            </div>
                            <p className="text-lg leading-relaxed text-navy-2" data-reveal>
                                Keep the client relationship under your brand. We agree the briefing, approvals, deliverables, reporting, confidentiality and escalation process before delivery starts.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-4 md:grid-cols-2" data-cascade>
                            {capabilities.map(([title, copy]) => (
                                <article key={title} className="rounded-[28px] border border-navy/10 bg-white p-7 md:p-9">
                                    <h3 className="text-[28px] font-medium leading-[1.05] tracking-[-0.04em] md:text-[36px]">{title}</h3>
                                    <p className="mt-5 max-w-[38ch] leading-relaxed text-navy-2">{copy}</p>
                                </article>
                            ))}
                        </div>

                        <div id="contact" className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-glacier p-7 md:p-10">
                            <p className="max-w-2xl text-[24px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[32px]">
                                Tell us the client account, scope and delivery capacity you need.
                            </p>
                            <Pill href="mailto:peppy.reply@zebaqweb.com?subject=White-label%20agency%20partnership" variant="navy">
                                Discuss a White-Label Partnership
                            </Pill>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
