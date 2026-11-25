import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Scale, ShieldCheck } from "lucide-react";
import Header from "../../components/layout/Header";
import { Arrow } from "../../components/common/ui";

gsap.registerPlugin(ScrollTrigger);

const sections = [
    { id: "terms", number: "01", label: "Terms of Service" },
    { id: "conditions", number: "02", label: "Conditions of Use" },
    { id: "copyright", number: "03", label: "Copyright" },
    { id: "communications", number: "04", label: "Communications" },
    { id: "law", number: "05", label: "Applicable Law" },
    { id: "disputes", number: "06", label: "Disputes" },
    { id: "comments", number: "07", label: "Comments, Reviews and Emails" },
    { id: "license", number: "08", label: "License and Site Access" },
    { id: "account", number: "09", label: "User Account" },
];

function SectionHeading({ number, children }: { number: string; children: React.ReactNode }) {
    return (
        <h2 className="mb-7 text-[38px] font-medium leading-[1.02] tracking-[-0.045em] text-navy md:text-[48px]">
            <span className="mr-2 text-[13px] font-semibold tracking-[0.12em] text-navy/40">{number} / </span>
            {children}
        </h2>
    );
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} data-reveal className="scroll-mt-28 border-b border-navy/10 py-10 first:pt-0 md:py-14">
            <SectionHeading number={number}>{title}</SectionHeading>
            {children}
        </section>
    );
}

export default function TermsPage() {
    const root = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState("terms");

    useEffect(() => {
        let startReveal: (() => void) | null = null;
        const revealContext = gsap.context(() => {
            const start = () => {
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

                gsap.fromTo(
                    "[data-reveal]",
                    { y: 24, opacity: 0, immediateRender: false },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "expo.out",
                        stagger: 0.06,
                        clearProps: "opacity,transform",
                        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
                    },
                );

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => ScrollTrigger.refresh());
                });
            };
            startReveal = start;

            if (document.documentElement.dataset.pt === "busy") {
                window.addEventListener("page:ready", start, { once: true });
                return;
            }
            start();
        }, root);

        const observed = sections
            .map(({ id }) => document.getElementById(id))
            .filter((element): element is HTMLElement => Boolean(element));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
            },
            { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
        );
        observed.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
            if (startReveal) window.removeEventListener("page:ready", startReveal);
            revealContext.revert();
        };
    }, []);

    return (
        <div ref={root}>
            <Header />
            <main>
                <section data-header-solid className="relative overflow-hidden bg-ink text-off">
                    <div className="grain absolute inset-0" />
                    <div className="wrap relative pb-16 pt-36 md:pb-20 md:pt-44">
                        <p className="eyebrow text-[14px] text-glacier-3" data-reveal>Legal / Policy</p>
                        <h1 className="mt-7 max-w-6xl text-[64px] font-medium leading-[0.92] tracking-[-0.055em] md:text-[112px] lg:text-[136px]">
                            Terms of Service<span className="dot dark-ring" />
                        </h1>
                        <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-glacier-2 md:text-[23px]" data-reveal>
                            Please review the terms that apply when you use our website and services.
                        </p>

                        <div className="mt-12 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
                            {[
                                ["Agreement", "Use of services", "Conditions that apply to this website"],
                                ["Your Content", "Responsible sharing", "Rights and account obligations"],
                                ["Applicable Law", "New Delhi", "Legal jurisdiction and dispute venue"],
                            ].map(([title, subtitle, copy]) => (
                                <div key={title} className="relative bg-white/[0.025] px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:bg-lemon/10" data-reveal>
                                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-lemon/50 to-transparent" />
                                    <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-lemon">{title}</p>
                                    <p className="mt-4 text-[20px] font-semibold text-off">{subtitle}</p>
                                    <p className="mt-3 text-[15px] leading-relaxed text-glacier-3">{copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="wrap bg-off py-12 md:py-16">
                    <div className="grid items-start gap-10 lg:grid-cols-[270px_minmax(0,720px)] lg:justify-center xl:grid-cols-[290px_minmax(0,760px)]">
                        <aside className="lg:sticky lg:top-28">
                            <nav aria-label="Terms of service sections" className="hidden rounded-2xl border border-navy/10 bg-white/45 p-3 lg:block">
                                <p className="px-3 pb-4 pt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy/40">On this page</p>
                                <ul className="space-y-1">
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] leading-[1.25] transition-colors ${
                                                    activeSection === section.id
                                                        ? "bg-navy text-off"
                                                        : "text-navy/65 hover:bg-navy/[0.05] hover:text-navy"
                                                }`}
                                            >
                                                <span className="text-[11px] opacity-60">{section.number}</span>
                                                <span>{section.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <a href="https://calendly.com/zebaq/30min" target="_blank" rel="noreferrer" className="mt-4 hidden rounded-2xl bg-navy p-5 text-off lg:block">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-lemon">Need clarity?</p>
                                <p className="mt-2 text-[19px] font-medium leading-tight tracking-[-0.03em]">Ready for a consultation?</p>
                                <p className="mt-3 text-xs leading-relaxed text-glacier-3">Schedule a free call with our team.</p>
                                <span className="mt-5 flex items-center justify-between text-xs font-semibold">
                                    Book a call
                                    <span className="grid h-8 w-8 place-items-center rounded-full bg-lemon text-navy"><ArrowUpRight size={15} /></span>
                                </span>
                            </a>
                        </aside>

                        <article className="min-w-0">
                            <Section id="terms" number="01" title="Terms of Service">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    Please read these terms of service (&quot;terms&quot;, &quot;terms of service&quot;) carefully before using zebaqweb.com website (the &quot;service&quot;) operated by Zebaq. (&quot;us&quot;, &quot;we&quot;, &quot;our&quot;).
                                </p>
                            </Section>

                            <Section id="conditions" number="02" title="Conditions of Use">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.
                                </p>
                            </Section>

                            <Section id="copyright" number="03" title="Copyright">
                                <div className="rounded-xl border-l-2 border-lemon-deep bg-navy/[0.035] px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-lemon hover:bg-lemon/15 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                    <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                        Content published on this website (digital downloads, images, texts, graphics, logos) is the property of Zebaq Pvt Ltd. and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of Zebaq Pvt Ltd., with copyright authorship for this compilation by Zebaq Pvt Ltd.
                                    </p>
                                </div>
                            </Section>

                            <Section id="communications" number="04" title="Communications">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive communications from us. If you subscribe to the news on our website, you are going to receive regular emails from us. We will continue to communicate with you by posting news and notices on our website and by sending you emails. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet the legal requirements that such communications be in writing.
                                </p>
                            </Section>

                            <Section id="law" number="05" title="Applicable Law">
                                <div className="flex items-start gap-4 rounded-xl border border-navy/10 px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/15 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-lemon"><Scale size={20} /></div>
                                    <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                        By visiting this website, you agree that the laws of <span className="font-semibold text-navy">New Delhi</span>, without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between Zebaq Pvt Ltd. and you, or its business partners and associates.
                                    </p>
                                </div>
                            </Section>

                            <Section id="disputes" number="06" title="Disputes">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by state or federal court New Delhi and you consent to exclusive jurisdiction and venue of such courts.
                                </p>
                            </Section>

                            <Section id="comments" number="07" title="Comment, Reviews and Emails">
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>Visitors may post content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any other way to third parties. Content has to be free of software viruses, political campaign, and commercial solicitation.</p>
                                    <p>We reserve all rights (but not the obligation) to remove and/or edit such content. When you post your content, you grant Zebaq Pvt Ltd. <span className="font-semibold text-navy">non-exclusive, royalty-free and irrevocable right</span> to use, reproduce, publish, modify such content throughout the world in any media.</p>
                                </div>
                            </Section>

                            <Section id="license" number="08" title="License and Site Access">
                                <div className="grid gap-3 md:grid-cols-2">
                                    {[
                                        ["Limited License", "Access and make personal use of this website"],
                                        ["Written Consent", "Required before downloading or modifying content"],
                                    ].map(([title, copy]) => (
                                        <div key={title} className="rounded-xl border border-navy/10 bg-white/70 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/20 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                            <p className="text-[15px] font-semibold text-navy">{title}</p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-navy/55">{copy}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.
                                </p>
                            </Section>

                            <Section id="account" number="09" title="User Account">
                                <div className="flex items-start gap-4 rounded-xl border border-navy/10 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/15 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-lemon"><ShieldCheck size={20} /></div>
                                    <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                        If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password. We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.
                                    </p>
                                </div>
                            </Section>
                        </article>
                    </div>
                </div>

                <section data-reveal className="border-t border-navy/10 bg-off px-4 py-16 sm:px-6 md:py-24">
                    <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] bg-glacier px-6 py-16 text-center text-navy shadow-[0_24px_70px_rgba(10,31,68,0.10)] md:rounded-[36px] md:px-12 md:py-20">
                        <div className="pointer-events-none absolute -left-28 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-navy/[0.045]">
                            <div className="absolute inset-12 rounded-full border border-navy/[0.04]" />
                            <div className="absolute inset-24 rounded-full border border-navy/[0.035]" />
                        </div>
                        <div className="pointer-events-none absolute -right-28 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-navy/[0.045]">
                            <div className="absolute inset-12 rounded-full border border-navy/[0.04]" />
                            <div className="absolute inset-24 rounded-full border border-navy/[0.035]" />
                        </div>
                        <div className="relative z-10 mx-auto max-w-4xl">
                            <p className="eyebrow justify-center text-navy/60">For marketing &amp; development agencies</p>
                            <h2 className="mt-7 text-[42px] font-medium leading-[0.98] tracking-[-0.055em] text-navy sm:text-[54px] md:text-[72px]">
                                Ready to Accelerate Your
                                <br />
                                Business <span className="text-lemon-deep">Growth</span><span className="dot dark-ring" />
                            </h2>
                            <p className="mx-auto mt-8 max-w-3xl text-[17px] leading-[1.7] text-navy/65 md:text-[21px]">
                                Your business has incredible potential—let&apos;s unlock it together. Schedule a call with our team, and
                                we&apos;ll work with you to build a tailored growth plan that aligns with your goals and vision.
                            </p>
                            <a href="https://calendly.com/zebaq/30min" target="_blank" rel="noreferrer" className="pill pill-navy mt-10" data-cursor="hover">
                                Book Your Free Consultation
                                <span className="pill-ic"><Arrow size={16} /></span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
