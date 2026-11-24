// import Header from "../../components/layout/Header";

// export default function PrivacyPage() {
//     return (
//         <>
//             <Header />
//             <main className="wrap pb-24 pt-40">
//                 <h1 className="t-xl">Privacy Policy</h1>
//                 <p className="mt-8">Demo page. Content coming soon.</p>
//             </main>
//         </>
//     );
// }



import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";
import Header from "../../components/layout/Header";
import { Arrow } from "../../components/common/ui";

gsap.registerPlugin(ScrollTrigger);

const sections = [
    { id: "information", number: "01", label: "What do we do with your information?" },
    { id: "consent", number: "02", label: "Consent" },
    { id: "disclosure", number: "03", label: "Disclosure" },
    { id: "payment", number: "04", label: "Payment" },
    { id: "third-party", number: "05", label: "Third-Party Services" },
    { id: "security", number: "06", label: "Security" },
    { id: "cookies", number: "07", label: "Cookies" },
    { id: "age", number: "08", label: "Age of Consent" },
    { id: "changes", number: "09", label: "Changes to this Privacy Policy" },
    { id: "contact", number: "10", label: "Questions and Contact Information" },
];

function SectionHeading({ number, children, oneLine = false }: { number: string; children: React.ReactNode; oneLine?: boolean }) {
    return (
        <h2 className={`mb-7 text-[38px] font-medium leading-[1.02] tracking-[-0.045em] text-navy md:text-[42px] ${oneLine ? "md:whitespace-nowrap" : ""}`}>
            <span className="mr-2 text-[13px] font-semibold tracking-[0.12em] text-navy/40">{number} / </span>
            {children}
        </h2>
    );
}

function Section({ id, number, title, children, oneLine = false }: { id: string; number: string; title: string; children: React.ReactNode; oneLine?: boolean }) {
    return (
        <section id={id} data-reveal className="scroll-mt-28 border-b border-navy/10 py-10 first:pt-0 md:py-14">
            <SectionHeading number={number} oneLine={oneLine}>{title}</SectionHeading>
            {children}
        </section>
    );
}

export default function PrivacyPage() {
    const root = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState("information");

    useEffect(() => {
        const context = gsap.context(() => {
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduced) return;
            gsap.from("[data-reveal]", {
                y: 24,
                opacity: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.06,
                scrollTrigger: {
                    trigger: root.current,
                    start: "top 82%",
                    once: true,
                },
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
                            Privacy Policy<span className="dot dark-ring" />
                        </h1>
                        <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-glacier-2 md:text-[23px]" data-reveal>
                            Your privacy matters to us. Learn how we collect, use, and protect your information.
                        </p>

                        <div className="mt-12 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
                            {[
                                ["Data Collection", "Clear information", "About what we collect"],
                                ["Data Protection", "Privacy safeguards", "How we protect your data"],
                                ["Your Rights", "Control your information", "Access or update your data"],
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
                            <nav aria-label="Privacy policy sections" className="hidden rounded-2xl border border-navy/10 bg-white/45 p-3 lg:block">
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

                            <a
                                href="https://calendly.com/zebaq/30min"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 hidden rounded-2xl bg-navy p-5 text-off lg:block"
                            >
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
                            <Section id="information" number="01" title="What Do We Do With Your Information?" oneLine>
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.</p>
                                    <p>When you browse our store, we also automatically receive your computer&apos;s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</p>
                                    <p><span className="rounded-sm bg-lemon/70 px-1.5 py-0.5 font-semibold text-navy">Email marketing:</span> With your permission, we may send you emails about our store, new products and other updates.</p>
                                </div>
                                <div className="mt-8 grid gap-3 md:grid-cols-3">
                                    {[
                                        ["Identity", "Name and contact information"],
                                        ["Transaction", "Purchase and delivery details"],
                                        ["Technical", "Browser and operating system"],
                                    ].map(([title, copy]) => (
                                        <div key={title} className="group rounded-xl border border-navy/10 bg-white/70 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/20 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                            <p className="text-[15px] font-semibold text-navy">{title}</p>
                                            <p className="mt-2 text-[13px] leading-relaxed text-navy/55">{copy}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section id="consent" number="02" title="Consent">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="mb-4 text-[20px] font-semibold text-navy md:text-[22px]">How do you get my consent?</h3>
                                        <div className="space-y-4 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                            <p>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</p>
                                            <p>If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>
                                        </div>
                                    </div>
                                    <div className="rounded-xl border-l-2 border-lemon-deep bg-navy/[0.035] px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-lemon hover:bg-lemon/15 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                        <h3 className="mb-4 text-[20px] font-semibold text-navy md:text-[22px]">How do I withdraw my consent?</h3>
                                        <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                            If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at <a className="font-semibold underline decoration-navy/20 underline-offset-4 hover:decoration-navy" href="mailto:peppy.reply@zebaqweb.com">peppy.reply@zebaqweb.com</a> or mailing us at: HIG-147, Lumbini Vihar, Bhubaneswar, Odisha 751021, India.
                                        </p>
                                    </div>
                                </div>
                            </Section>

                            <Section id="disclosure" number="03" title="Disclosure">
                                <div className="rounded-xl border border-navy/10 bg-glacier/35 px-6 py-6 text-[18px] leading-[1.75] text-navy/75 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/20 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)] md:text-[19px]">
                                    We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
                                </div>
                            </Section>

                            <Section id="payment" number="04" title="Payment">
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>We use <a href="https://razorpay.com" target="_blank" rel="noreferrer" className="rounded-sm bg-lemon/70 px-1.5 py-0.5 font-semibold text-navy underline decoration-navy/20 underline-offset-4 hover:bg-lemon">Razorpay <ArrowUpRight className="inline" size={14} /></a> for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the <span className="rounded-sm bg-lemon/55 px-1 text-navy">Payment Card Industry Data Security Standard (PCI-DSS)</span>. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.</p>
                                    <p>Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.</p>
                                    <p>PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.</p>
                                    <p>For more insight, you may also want to read terms and conditions of razorpay on <a href="https://razorpay.com" target="_blank" rel="noreferrer" className="underline decoration-navy/20 underline-offset-4 hover:decoration-navy">https://razorpay.com</a></p>
                                </div>
                                <div className="mt-6 flex items-center gap-4 rounded-xl border border-navy/10 px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/15 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-navy text-lemon"><ShieldCheck size={18} /></div>
                                    <div>
                                        <p className="text-xs font-semibold text-navy">Secured with PCI-DSS</p>
                                        <p className="mt-0.5 text-[11px] text-navy/50">Trusted payment processing standards</p>
                                    </div>
                                </div>
                            </Section>

                            <Section id="third-party" number="05" title="Third-Party Services">
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
                                    <p>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
                                    <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
                                    <p>In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</p>
                                    <p>Once you leave our store&apos;s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website&apos;s Terms of Service.</p>
                                    <h3 className="pt-2 text-[20px] font-semibold text-navy md:text-[22px]">Links</h3>
                                    <p>When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</p>
                                </div>
                            </Section>

                            <Section id="security" number="06" title="Security">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
                                <div className="mt-7 grid grid-cols-3 gap-3">
                                    {[
                                        [LockKeyhole, "Prevention", "Reasonable safeguards"],
                                        [ShieldCheck, "Protection", "Industry best practices"],
                                        [UserCheck, "Control", "Responsible handling"],
                                    ].map(([Icon, title, copy]) => (
                                        <div key={String(title)} className="rounded-xl border border-navy/10 bg-white/70 px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:bg-lemon/20 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)]">
                                            <Icon className="mx-auto text-navy/70" size={23} strokeWidth={1.5} />
                                            <p className="mt-4 text-[14px] font-semibold text-navy">{String(title)}</p>
                                            <p className="mt-2 text-[12px] leading-relaxed text-navy/45">{String(copy)}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section id="cookies" number="07" title="Cookies">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">We use cookies to maintain session of our user. It is not used to personally identify you on other websites.</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {["Session management", "No cross-site identification"].map((tag) => (
                                        <span key={tag} className="rounded-full border border-navy/10 px-4 py-2 text-[13px] font-medium text-navy/60 transition-all duration-300 hover:border-lemon-deep/50 hover:bg-lemon/30 hover:text-navy">{tag}</span>
                                    ))}
                                </div>
                            </Section>

                            <Section id="age" number="08" title="Age of Consent">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
                            </Section>

                            <Section id="changes" number="09" title="Changes to This Privacy Policy">
                                <div className="space-y-5 text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    <p>We reserve the right to modify this privacy policy at anytime, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>
                                    <p>If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</p>
                                </div>
                            </Section>

                            <Section id="contact" number="10" title="Questions and Contact Information">
                                <p className="text-[18px] leading-[1.75] text-navy/75 md:text-[19px]">
                                    If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at <a className="font-semibold underline decoration-navy/20 underline-offset-4 hover:decoration-navy" href="mailto:peppy.reply@zebaqweb.com">peppy.reply@zebaqweb.com</a> or by mail at HIG-147, Lumbini Vihar, Bhubaneswar, Odisha 751021, India.
                                </p>
                                <div className="mt-7 grid overflow-hidden rounded-2xl border border-navy/10 transition-all duration-300 hover:-translate-y-1 hover:border-lemon-deep/50 hover:shadow-[0_12px_30px_rgba(10,31,68,0.08)] md:grid-cols-[1fr_auto]">
                                    <div className="px-5 py-5">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/40">Privacy Compliance Officer</p>
                                        <p className="mt-2 text-sm font-semibold text-navy">Lumbini Vihar, Bhubaneswar, Odisha 751021, India</p>
                                        <p className="mt-1 text-xs text-navy/55">Re: Privacy Compliance Officer</p>
                                    </div>
                                    <a href="mailto:peppy.reply@zebaqweb.com" className="flex items-center justify-center gap-3 bg-navy px-5 py-5 text-sm font-semibold text-off md:min-w-44">
                                        Send an email
                                        <Arrow size={16} />
                                    </a>
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
                            <a
                                href="https://calendly.com/zebaq/30min"
                                target="_blank"
                                rel="noreferrer"
                                className="pill pill-navy mt-10"
                                data-cursor="hover"
                            >
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