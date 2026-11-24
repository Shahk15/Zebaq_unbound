import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CalendarCheck, ShieldCheck } from "lucide-react";
import Header from "../../components/layout/Header";
import { Arrow } from "../../components/common/ui";

gsap.registerPlugin(ScrollTrigger);

const sections = [
    { id: "refund", number: "01", label: "Refund Policy for Web Services" },
    { id: "cancellation", number: "02", label: "Cancellation Policy" },
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

export default function RefundPolicyPage() {
    const root = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState("refund");

    useEffect(() => {
        const context = gsap.context(() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            gsap.from("[data-reveal]", {
                y: 24,
                opacity: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.06,
                scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
            });
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
            context.revert();
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
                            Refund Policy<span className="dot dark-ring" />
                        </h1>
                        <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-glacier-2 md:text-[23px]" data-reveal>
                            Understand how refunds and cancellations work for our web services, before you subscribe.
                        </p>

                        <div className="mt-12 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
                            {[
                                ["Refund Window", "First month", "Money-back guarantee for new clients"],
                                ["Cancellation", "7-10 days", "From the date of service agreement"],
                                ["Refund Timing", "5-7 business days", "To reflect in your bank account"],
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
                            <nav aria-label="Refund policy sections" className="hidden rounded-2xl border border-navy/10 bg-white/45 p-3 lg:block">
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
                            <Section id="refund" number="01" title="Refund Policy for Web Services">
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>Thanks for subscribing to our web services at <a className="font-semibold underline decoration-navy/20 underline-offset-4 hover:decoration-navy" href="https://zebaqweb.com/">zebaq</a> operated by Zebaq Pvt Ltd.</p>
                                    <p>We at Zebaq, feel that all clients have the right to test our service and judge for themselves. With that in mind, we offer new clients a <span className="font-semibold text-navy">money back guarantee for the first month</span> only if they don&apos;t see any improvements in first month itself.</p>
                                    <p>However this refund policy becomes <span className="font-semibold text-navy">void if subscribed package is a discounted package or opted with offer</span>.</p>
                                    <p>With the dynamism of digital market it&apos;s quite sceptical to give a quantified outcome, but with fresh technical strategy in place we can guarantee of improvement and expect our clients to understand the same.</p>
                                    <p>A continuation of campaign to second month makes us believe that client is pretty much convinced and satisfied with the work progress. This makes the <span className="font-semibold text-navy">refund policy void in 2nd month</span> of campaign progress. &quot;It is the right of every client to have long-term, risk-free business relationship with us. That is why we stand by our words.</p>
                                    <p>For more details on refund policy and service coverage, please check our <a className="font-semibold underline decoration-navy/20 underline-offset-4 hover:decoration-navy" href="https://zebaqweb.com/terms-and-conditions">Terms and Conditions page.</a></p>
                                </div>
                                <div className="mt-8 grid gap-3 md:grid-cols-3">
                                    {[
                                        ["Eligible", "New clients, first month only"],
                                        ["Void for", "Discounted or offer packages"],
                                        ["Void from", "The 2nd month of the campaign"],
                                    ].map(([title, copy]) => (
                                        <div key={title} className="rounded-xl border border-navy/10 bg-white/70 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/20 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                            <p className="text-[15px] font-semibold text-navy">{title}</p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-navy/55">{copy}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section id="cancellation" number="02" title="Cancellation Policy">
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>A subscriber can place the cancellation order for a particular service <span className="font-semibold text-navy">within 7-10 days of service agreement</span> via prescribed cancellation form available on our website.</p>
                                    <p><span className="font-semibold text-navy">No cancellation is possible</span> for the services offered with promotional discounts on special occasions. Independence Day, Christmas and New Year. These are limited edition offers and hence any range of refund would not be possible.</p>
                                    <p>In no case, ZEBAQ will entertain cancellation requests made for services such as <span className="font-semibold text-navy">domain name registration and domain name transfer</span>.</p>
                                    <p>To terminate any Subscription of the Service by the Client or Zebaq need to give <span className="font-semibold text-navy">prior One month Notice</span>.</p>
                                    <p><span className="font-semibold text-navy">Fee once paid will not be refunded in any case</span> even if the cancellation is posted within 12 hours.</p>
                                    <p>A service stands cancel if next payment is not received within 7 working days. After cancellation refunds take <span className="font-semibold text-navy">5-7 business days</span> to reflect in your bank account. For more details on refund policy and service coverage, please check our <a className="font-semibold underline decoration-navy/20 underline-offset-4 hover:decoration-navy" href="https://zebaqweb.com/terms-and-conditions">Terms and Conditions page.</a></p>
                                </div>
                                <div className="mt-8 grid gap-3 md:grid-cols-3">
                                    {[
                                        [CalendarCheck, "7-10 days", "Window to place a cancellation order"],
                                        [ShieldCheck, "One month", "Prior notice to terminate a subscription"],
                                        [CalendarCheck, "5-7 business days", "For refunds to reach your bank account"],
                                    ].map(([Icon, title, copy]) => (
                                        <div key={String(title)} className="rounded-xl border border-navy/10 bg-white/70 px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/20 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                            <Icon className="mx-auto text-navy/70" size={23} strokeWidth={1.5} />
                                            <p className="mt-4 text-[14px] font-semibold text-navy">{String(title)}</p>
                                            <p className="mt-2 text-[12px] leading-relaxed text-navy/45">{String(copy)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {["Promotional offers: Independence Day, Christmas, New Year", "Domain name registration", "Domain name transfer"].map((tag) => (
                                        <span key={tag} className="rounded-full border border-navy/10 px-4 py-2 text-[13px] font-medium text-navy/60 transition-all duration-300 hover:border-lemon-deep/50 hover:bg-lemon/30 hover:text-navy">{tag}</span>
                                    ))}
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
