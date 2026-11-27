import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import Logos from "../components/home/Logos";
import Impact from "../components/home/Impact";
import Services from "../components/home/Services";
import Audiences from "../components/home/Audiences";
import Work from "../components/home/Work";
import Testimonials from "../components/home/Testimonials";
import Videos from "../components/home/Videos";
import Tech from "../components/home/Tech";
import Why from "../components/home/Why";
import Models from "../components/home/Models";
import Process from "../components/home/Process";
import Faq from "../components/home/Faq";
import WhiteLabel from "../components/home/WhiteLabel";
import Closing from "../components/home/Closing";
import { HERO } from "../data/home/hero";
import { SERVICES } from "../data/shared/services";
import { AUDIENCES } from "../data/home/audiences";
import { CASES } from "../data/home/cases";
import { TESTIMONIALS } from "../data/shared/testimonials";
import { VIDEOS } from "../data/shared/videos";
import { TECH } from "../data/home/tech";
import { WHY_ITEMS, WHY_SIDES } from "../data/home/why";
import { MODELS } from "../data/home/models";
import { PROCESS } from "../data/home/process";
import { FAQ } from "../data/shared/faq";
import { WHITE_LABEL } from "../data/home/white-label";
import { FINAL } from "../data/home/closing";
import { DIAGNOSTIC } from "../data/home/diagnostic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HomeProps = {
    play: boolean;
};

export default function Home({ play }: HomeProps) {
    const root = useRef<HTMLDivElement>(null);
    const [copyReady, setCopyReady] = useState(false);

    useEffect(() => {
        const previousTitle = document.title;
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const previousDescription = meta?.content;
        document.title = "AI-Powered Digital Marketing & Automation | ZEBAQ";
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = "Get found on Google and AI search, generate qualified B2B leads, manage social media and automate follow-up with ZEBAQ.";

        const heroOriginal = { ...HERO };
        const serviceOriginal = SERVICES.map((item) => ({ ...item, bullets: [...item.bullets], tags: [...item.tags] }));
        const audienceOriginal = AUDIENCES.map((item) => ({ ...item, tags: [...item.tags] }));
        const caseOriginal = CASES.map((item) => ({ ...item, media: item.media ? { ...item.media } : undefined }));
        const testimonialOriginal = TESTIMONIALS.map((item) => ({ ...item }));
        const videoOriginal = VIDEOS.map((item) => ({ ...item }));
        const techOriginal = TECH.map((item) => ({ ...item, items: [...item.items] }));
        const whySidesOriginal = { left: { ...WHY_SIDES.left }, right: { ...WHY_SIDES.right } };
        const whyItemsOriginal = WHY_ITEMS.map((item) => ({ ...item }));
        const modelOriginal = MODELS.map((item) => ({ ...item }));
        const processOriginal = PROCESS.map((item) => ({ ...item }));
        const faqOriginal = FAQ.map((item) => ({ ...item }));
        const whiteLabelOriginal = { ...WHITE_LABEL, items: [...WHITE_LABEL.items] };
        const finalOriginal = { ...FINAL };
        const diagnosticOriginal = DIAGNOSTIC.map((item) => ({ ...item, options: [...item.options] }));

        Object.assign(HERO, {
            eyebrow: "AI-powered digital marketing. Human-led strategy.",
            h1: ["AI digital marketing.", "Human-led strategy."],
            h1Tail: "Built around your growth goal.",
            sub: "ZEBAQ helps businesses boost AI search visibility, generate quality leads, manage social media, and automate follow-ups.",
            // sub: "ZEBAQ helps service businesses, ecommerce and product brands, and B2B teams get discovered on Google and AI search, build a qualified pipeline, manage social media and automate lead follow-up.",
            primary: "Book a Strategy Call",
            secondary: "Explore Services",
        });

        const serviceCopy: Record<string, Partial<(typeof SERVICES)[number]>> = {
            "ai-search-visibility": { short: "AI Search Visibility", name: "AI Search Visibility (SEO, AEO & GEO)", outcome: "Improve the pages, business information and product content customers find on Google and AI search." },
            "b2b-prospecting-outreach": { short: "B2B Lead Generation", name: "B2B Lead Generation", outcome: "Research decision-makers, run LinkedIn and email outreach and hand qualified conversations to sales." },
            "social-media-marketing": { short: "Social Media Management", name: "Social Media Management", outcome: "Plan content, publish posts and reels, manage community interactions and report on what drives action." },
            "automation-ai-agents": { short: "AI Automation & Agents", name: "AI Automation & Agents", outcome: "Qualify enquiries, route leads and automate routine follow-up across your CRM, web chat and supported messaging channels." },
            "web-development": { short: "Web Development", name: "Web Development", outcome: "Build service websites, ecommerce stores and landing pages around the next action you want visitors to take." },
            "performance-marketing": { short: "Performance Marketing", name: "Performance Marketing", outcome: "Run Google and Meta Ads with conversion tracking and lead-quality feedback." },
            "creative-video": { short: "Creative & Video", name: "Creative & Video", outcome: "Turn briefs and raw footage into campaign assets, reels and short-form videos." },
            "dedicated-talent": { short: "Dedicated Talent", name: "Dedicated Talent", outcome: "Add a marketer, editor, designer or developer to your workflow." },
            "conversion-optimization": { short: "Conversion Optimization", name: "Conversion Optimization", outcome: "Find where visitors drop off and test changes to key pages and forms." },
            "managed-operations": { short: "Managed Operations", name: "Managed Operations", outcome: "Give enquiry handling, bookings and day-to-day follow-up a named owner." },
        };
        const bySlug = new Map(SERVICES.map((item) => [item.slug, item]));
        Object.entries(serviceCopy).forEach(([slug, copy]) => Object.assign(bySlug.get(slug)!, copy));
        const order = [
            "ai-search-visibility",
            "b2b-prospecting-outreach",
            "social-media-marketing",
            "automation-ai-agents",
            "web-development",
            "performance-marketing",
            "creative-video",
            "dedicated-talent",
            "conversion-optimization",
            "managed-operations",
        ];
        const reordered = order.map((slug) => bySlug.get(slug)!);
        reordered.forEach((item, index) => { item.n = String(index + 1).padStart(2, "0"); });
        SERVICES.splice(0, SERVICES.length, ...reordered);

        AUDIENCES.splice(0, AUDIENCES.length,
            {
                t: "Service businesses",
                flagship: "Visibility, enquiries and bookings",
                d: "Get found for the services you offer and give prospects a clear path to enquire or book.",
                tags: ["Local search", "Websites", "Paid leads", "Bookings"],
            },
            {
                t: "Product and ecommerce brands",
                flagship: "Discovery and purchase",
                d: "Help shoppers discover your products through search and social, then give them the information they need to buy.",
                tags: ["Ecommerce", "Product search", "Social", "Conversion"],
            },
            {
                t: "B2B companies",
                flagship: "Account-based growth",
                d: "Reach the right accounts with LinkedIn and email outreach, and give your sales team enough context for a useful first conversation.",
                tags: ["LinkedIn", "Email outreach", "Qualification", "Sales handoff"],
            },
        );

        Object.assign(CASES[0], {
            slug: "utopia-lounge",
            title: "Utopia Lounge Atlanta",
            text: "A hospitality website that brings dining, events and reservations into one experience.",
            href: "/work/utopia-lounge",
        });
        Object.assign(CASES[2], {
            slug: "a-best-insurance",
            title: "A-Best Insurance",
            text: "A website organized around the types of coverage customers came to compare.",
            href: "/work/a-best-insurance",
        });
        Object.assign(CASES[5], {
            slug: "royal-blessings",
            title: "Royal Blessings",
            text: "An ecommerce storefront built around jewellery collections and occasion shopping.",
            href: "/work/royal-blessings",
        });

        TESTIMONIALS.forEach((item) => {
            if (item.company === "Add company") item.company = "";
        });

        // Tip: rename these files without spaces (for example review-1.mp4) and compress them with faststart
        VIDEOS.splice(0, VIDEOS.length,
            {
                name: "Client name",
                company: "Company",
                caption: "Why we recommend ZEBAQ",
                src: "/videos/work/Review/WhatsApp Video 2026-11-25 at 15.43.33.mp4",
            },
            {
                name: "Client name",
                company: "Company",
                caption: "How ZEBAQ helped us",
                src: "/videos/work/Review/WhatsApp Video 2026-11-25 at 15.43.34.mp4",
            },
            {
                name: "Client name",
                company: "Company",
                caption: "What changed after working together",
                src: "/videos/work/Review/WhatsApp Video 2026-11-25 at 15.43.35.mp4",
            },
        );

        TECH.splice(0, TECH.length,
            { group: "CRM and sales", items: ["HubSpot", "GoHighLevel", "Salesforce", "ClickFunnels"] },
            { group: "AI and workflow automation", items: ["OpenAI", "Zapier", "Make", "n8n"] },
            { group: "Paid media and analytics", items: ["Google Ads", "Meta Ads", "GA4", "Canva"] },
            { group: "Website and ecommerce", items: ["Shopify", "WordPress", "Webflow", "WooCommerce"] },
        );

        Object.assign(WHY_SIDES.left, { tag: "Without us", line: "Disconnected marketing" });
        Object.assign(WHY_SIDES.right, { tag: "With us", line: "Search, content and follow-up working together" });
        WHY_ITEMS.splice(0, WHY_ITEMS.length,
            { title: "Start with the business goal", text: "Agree what a qualified enquiry, booking or sale looks like." },
            { title: "Know who owns the work", text: "Get a named point of contact and a clear delivery plan." },
            { title: "Use AI with human review", text: "Specialists check strategy, customer-facing copy and workflows." },
            { title: "Measure what happened", text: "Review search visibility, qualified conversations, bookings or sales according to scope." },
        );

        MODELS.splice(0, MODELS.length,
            { t: "One-time projects", d: "A defined scope for a website, search audit or automation build." },
            { t: "Monthly managed services", d: "Ongoing support for search, outreach, social or campaigns." },
            { t: "Dedicated specialists", d: "A marketer, developer, designer or editor who works within your workflow." },
            { t: "Fully managed teams", d: "ZEBAQ coordinates people, delivery, quality checks and reporting." },
        );
        PROCESS.splice(0, PROCESS.length,
            { t: "Understand the goal", d: "We review your offer, audience and current activity." },
            { t: "Agree what to fix first", d: "We recommend a scope, timeline and success measures." },
            { t: "Launch the work", d: "Your team knows what we need, who owns each task and when it goes live." },
            { t: "Review and improve", d: "We use results and feedback to decide what to test next." },
        );
        FAQ.splice(0, FAQ.length,
            { q: "What does ZEBAQ do?", a: "We provide SEO and AI search visibility, B2B lead generation, social media management and AI automation, with website, creative and paid media support as needed." },
            { q: "What’s the difference between SEO, AEO and GEO?", a: "SEO helps search engines discover and understand your pages. Answer engine optimization (AEO) makes direct answers easier to find. Generative engine optimization (GEO) focuses on how your brand and content can be understood and cited in AI-generated responses." },
            { q: "Can I start with one service?", a: "Yes. Start with the problem you want to solve first and add support as needed." },
            { q: "Do you work with ecommerce and service businesses?", a: "Yes. We tailor content, discovery and conversion work to how your customers buy or book." },
            { q: "What happens on the strategy call?", a: "We review your growth goal, where you may be losing opportunities and what we’d prioritize first." },
        );
        Object.assign(WHITE_LABEL, {
            title: "White-label digital marketing for agencies",
            d: "Keep the client relationship under your brand while ZEBAQ supports delivery behind the scenes. Bring us in for SEO and AI search, social content, websites, automation or campaign support under an agreed scope and confidentiality terms.",
            cta: "Discuss a White-Label Partnership",
        });
        Object.assign(FINAL, {
            title: "Let’s decide what to work on first",
            sub: "In 30 minutes, we’ll review your growth goal, where you’re losing opportunities and what we’d prioritize first.",
            cta: "Book a Strategy Call",
        });
        Object.assign(DIAGNOSTIC[0], {
            q: "What would you like to improve first?",
            options: [
                "Get found on Google and AI search",
                "Generate qualified B2B leads",
                "Improve social media",
                "Automate enquiries and follow-ups",
                "Something else",
            ],
        });

        const replaceText = (oldText: string, newText: string) => {
            const walker = document.createTreeWalker(root.current!, NodeFilter.SHOW_TEXT);
            const nodes: Text[] = [];
            while (walker.nextNode()) nodes.push(walker.currentNode as Text);
            nodes.forEach((node) => {
                const text = node.textContent ?? "";
                if (text === oldText) node.textContent = newText;
                else if (text.includes(oldText)) node.textContent = text.replace(oldText, newText);
            });
        };

        const applySectionCopy = () => {
             replaceText("AI-Driven", "AI digital marketing");
            // replaceText("AI-Driven", "AI-powered digital marketing");
            replaceText("Human-Led", "Human-led strategy");
            replaceText("Solutions. Strategies. Built around", "Built around");
            replaceText("Featured work & results", "Selected work");
            replaceText("In their words", "What our clients say");
            replaceText("Hear it from them", "Hear directly from ZEBAQ clients");
            replaceText("Technology That Adapts to Your Business", "Connect the tools your team already uses");
            replaceText("Why brands", "One team");
            replaceText("choose us", "from strategy to delivery");
            replaceText("Work with us your way", "Choose the support your team needs");
            replaceText("From first call", "What happens");
            replaceText("to growth", "after you book");
            replaceText("Straight answers", "Questions businesses ask before working with ZEBAQ");
            replaceText("Looking for a White-Label Delivery Partner?", "White-label digital marketing for agencies");
            replaceText("Let’s Build a Solution That Fits Your Business.", "Let’s decide what to work on first");
            replaceText("Tell us where you want to grow. A strategist replies within one business day with practical next steps — no pressure to commit.", "Prefer to send a brief? Tell us what you sell, who you want to reach and what you’d like to improve.");

            const services = root.current?.querySelector<HTMLElement>("#services");
            const servicesHeading = services?.querySelector("h2");
            if (servicesHeading) {
                const split = document.createElement("span");
                split.dataset.split = "";
                "Digital marketing and AI services built around your growth goals".split(" ").forEach((word, index, words) => {
                    const mask = document.createElement("span");
                    mask.className = "sw";
                    const content = document.createElement("span");
                    content.textContent = word + (index < words.length - 1 ? "\u00a0" : "");
                    mask.appendChild(content);
                    split.appendChild(mask);
                });
                servicesHeading.replaceChildren(split);
            }

            const impactSection = root.current?.querySelector<HTMLElement>("section[data-index='04']");
            if (impactSection) {
                const impactHeading = impactSection.querySelector("h2");
                if (impactHeading) {
                    impactHeading.textContent = "An international team that understands your market";
                }
            }

            const logos = root.current?.querySelector<HTMLElement>("#logos");
            if (logos && !logos.querySelector("[data-home-doc-copy='logos']")) {
                const heading = logos.querySelector("h2");
                if (heading) {
                    const splitHeading = heading.querySelector<HTMLElement>("[data-split]");
                    if (splitHeading) {
                        const words = splitHeading.querySelectorAll<HTMLElement>(".sw");
                        const replacements = ["Trusted", "by", "businesses", "across", "industries"];
                        words.forEach((word, index) => {
                            if (!replacements[index]) return;
                            const inner = word.querySelector<HTMLElement>(":scope > span");
                            if (!inner) return;
                            const textNode = Array.from(inner.childNodes)
                                .find((node) => node.nodeType === Node.TEXT_NODE);
                            if (textNode) textNode.textContent = replacements[index] + (index < replacements.length - 1 ? "\u00a0" : "");
                        });
                    }

                    const copy = document.createElement("p");
                    copy.dataset.homeDocCopy = "logos";
                    copy.className = "mt-6 max-w-2xl text-[18px] leading-relaxed text-glacier-3";
                    copy.textContent = "From local services and hospitality to ecommerce and B2B, see the brands we’ve helped with digital marketing, websites and growth systems.";
                    heading.insertAdjacentElement("afterend", copy);

                    const cta = document.createElement("a");
                    cta.href = "/work";
                    cta.dataset.transitionTitle = "Work";
                    cta.className = "mt-7 inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-off transition-colors duration-300 hover:border-lemon hover:text-lemon";
                    cta.textContent = "View Our Work";
                    copy.insertAdjacentElement("afterend", cta);
                }
            }

            const audiences = root.current?.querySelector<HTMLElement>("#who");
            if (audiences) {
                const heading = audiences.querySelector("h2");
                if (heading) {
                    const split = document.createElement("span");
                    split.dataset.split = "";
                    "Built for the way your customers buy".split(" . ").forEach((word, index, words) => {
                        const mask = document.createElement("span");
                        mask.className = "sw";
                        const content = document.createElement("span");
                        content.textContent = word + (index < words.length - 1 ? "\u00a0" : "");
                        mask.appendChild(content);
                        split.appendChild(mask);
                    });
                    heading.replaceChildren(split);
                }

                const sideCopy = audiences.querySelector(".max-w-sm");
                if (sideCopy) {
                    const p = sideCopy.querySelector("p");
                    if (p) p.textContent = "Service businesses — get found for the services you offer and give prospects a clear path to enquire or book.";
                }
            }

            const testimonials = root.current?.querySelector<HTMLElement>("section[data-label='Written Testimonials']");
            if (testimonials && !testimonials.querySelector("[data-home-doc-copy='testimonials']")) {
                const heading = testimonials.querySelector("h2");
                if (heading) {
                    const copy = document.createElement("p");
                    copy.dataset.homeDocCopy = "testimonials";
                    copy.className = "mt-6 max-w-xl text-[17px] leading-relaxed text-navy-2";
                    copy.textContent = "Hear from clients about how we work, what we delivered and what changed for their business.";
                    heading.parentElement?.insertAdjacentElement("afterend", copy);
                }
                // The "company · service" line is now built inside Testimonials.tsx, so no DOM patching here
            }

            // The video section (data-index 09) stays visible. It is styled in the effect below.

            const tech = root.current?.querySelector<HTMLElement>("[data-index='10']");
            if (tech) {
                const paragraph = tech.querySelector(".max-w-xs");
                if (paragraph) {
                    paragraph.textContent = "Connect your CRM, website, ecommerce store and marketing tools so you can see where enquiries come from and what happens after someone gets in touch.";
                }
            }

            const impact = root.current?.querySelector<HTMLElement>("[data-index='04']");
            if (impact) {
                // Class names with brackets are matched through the class attribute, not as a class selector
                const paragraph = impact.querySelector("[data-reveal][class*='max-w-[310px]']");
                if (paragraph) {
                    paragraph.textContent = "We work with businesses across North America, the UK, Europe, the Middle East and Asia-Pacific. Your plan reflects where your buyers search, how they compare providers and what moves them to enquire or buy.";
                }
            }

            const work = root.current?.querySelector<HTMLElement>("#work");
            if (work && !work.querySelector("[data-home-doc-copy='work-cta']")) {
                const side = work.querySelector(".max-w-xs");
                if (side) {
                    const cta = document.createElement("a");
                    cta.href = "/work";
                    cta.dataset.transitionTitle = "Work";
                    cta.dataset.homeDocCopy = "work-cta";
                    cta.className = "mt-5 inline-flex items-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-off";
                    cta.textContent = "View Case Studies";
                    side.insertAdjacentElement("beforeend", cta);
                }
            }

            const contact = root.current?.querySelector<HTMLElement>("#contact");
            if (contact && !contact.querySelector("[data-home-doc-copy='calendar']")) {
                const left = contact.querySelector(".lg\\:sticky");
                if (left) {
                    const copy = document.createElement("p");
                    copy.dataset.homeDocCopy = "calendar";
                    copy.className = "mt-7 max-w-lg text-[17px] leading-relaxed text-glacier-2";
                    copy.textContent = "In 30 minutes, we’ll review your growth goal, where you’re losing opportunities and what we’d prioritize first.";
                    const email = left.querySelector("a");
                    email?.insertAdjacentElement("beforebegin", copy);

                    const brief = document.createElement("p");
                    brief.className = "mt-4 max-w-lg text-[15px] leading-relaxed text-glacier-3";
                    brief.textContent = "Prefer to send a brief? Tell us what you sell, who you want to reach and what you’d like to improve.";
                    copy.insertAdjacentElement("afterend", brief);

                    const calendar = document.createElement("a");
                    calendar.href = "https://calendly.com/zebaq/30min";
                    calendar.target = "_blank";
                    calendar.rel = "noreferrer";
                    calendar.className = "mt-7 inline-flex items-center rounded-full bg-lemon px-6 py-3 text-sm font-semibold text-navy";
                    calendar.textContent = "Book a Strategy Call";
                    brief.insertAdjacentElement("afterend", calendar);
                }
            }

            const footer = document.querySelector<HTMLElement>("footer");
            if (footer) {
                replaceText("Digital experiences. Real growth.", "ZEBAQ digital marketing and AI services");
                replaceText("AI-powered marketing, strategy and execution for ambitious businesses.", "SEO and AI search visibility, B2B lead generation, social media management and AI automation for service businesses, ecommerce brands and B2B companies.");
            }
        };

        requestAnimationFrame(() => requestAnimationFrame(applySectionCopy));
        setCopyReady(true);

        return () => {
            document.title = previousTitle;
            if (meta && previousDescription !== undefined) meta.content = previousDescription;
            Object.assign(HERO, heroOriginal);
            SERVICES.splice(0, SERVICES.length, ...serviceOriginal);
            AUDIENCES.splice(0, AUDIENCES.length, ...audienceOriginal);
            CASES.splice(0, CASES.length, ...caseOriginal);
            TESTIMONIALS.splice(0, TESTIMONIALS.length, ...testimonialOriginal);
            VIDEOS.splice(0, VIDEOS.length, ...videoOriginal);
            TECH.splice(0, TECH.length, ...techOriginal);
            Object.assign(WHY_SIDES.left, whySidesOriginal.left);
            Object.assign(WHY_SIDES.right, whySidesOriginal.right);
            WHY_ITEMS.splice(0, WHY_ITEMS.length, ...whyItemsOriginal);
            MODELS.splice(0, MODELS.length, ...modelOriginal);
            PROCESS.splice(0, PROCESS.length, ...processOriginal);
            FAQ.splice(0, FAQ.length, ...faqOriginal);
            Object.assign(WHITE_LABEL, whiteLabelOriginal);
            Object.assign(FINAL, finalOriginal);
            DIAGNOSTIC.splice(0, DIAGNOSTIC.length, ...diagnosticOriginal);
        };
    }, []);

    useEffect(() => {
        if (!copyReady) return;

        const section = root.current?.querySelector<HTMLElement>("[data-index='09']");
        if (!section) return;

        section.querySelectorAll<HTMLImageElement>("button > img").forEach((image) => {
            image.style.opacity = "0";
        });

        const cards = section.querySelectorAll<HTMLVideoElement>("button video");
        cards.forEach((video) => {
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "auto";
            video.style.opacity = "1";
            video.style.objectFit = "contain";
            video.style.objectPosition = "center";
            video.style.background = "#071631";
            video.play().catch(() => { });
        });

        const refresh = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
        return () => window.cancelAnimationFrame(refresh);
    }, [copyReady]);

    // Once the curtain lifts, re-measure every trigger in page order
    useEffect(() => {
        if (!play) return;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
    }, [play]);

    // Site-wide motion vocabulary
    useGSAP(
        () => {
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
                gsap.from(el, { y: 40, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
            });
            gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
                if (el.closest("[data-hero]")) return; // hero runs its own intro
                gsap.from(el.querySelectorAll(".sw > span"), {
                    yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.06,
                    scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
            });
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
                const amt = Number(el.dataset.parallax) || 12;
                gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
            });
            const refresh = () => ScrollTrigger.refresh();
            document.fonts?.ready.then(refresh);
            window.addEventListener("load", refresh);
            return () => window.removeEventListener("load", refresh);
        },
        { scope: root },
    );

    // Overlap transitions: a section marked [data-over] slides up over the one before it
    useGSAP(
        () => {
            const kids = [...document.querySelectorAll<HTMLElement>("main > *")];
            kids.forEach((el, i) => {
                el.style.position = "relative";
                el.style.zIndex = String(i + 1);
            });
            const mm = gsap.matchMedia();
            mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
                const added: HTMLElement[] = [];
                const faces: HTMLElement[] = [];
                kids.forEach((over, i) => {
                    if (i === 0 || !over.hasAttribute("data-over")) return;
                    const el = kids[i - 1];
                    if (el.querySelector(".pin-spacer")) return;
                    over.classList.add("stack-card");
                    faces.push(over);
                    const shade = document.createElement("div");
                    shade.className = "pointer-events-none absolute inset-0 z-[50] bg-ink opacity-0";
                    el.appendChild(shade);
                    added.push(shade);
                    const tall = () => el.offsetHeight > window.innerHeight + 2;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: () => (tall() ? "bottom bottom" : "top top"),
                            end: () => `+=${window.innerHeight}`,
                            pin: true,
                            pinSpacing: false,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    })
                        .to(el, { scale: 0.9, yPercent: tall() ? 0 : -2, transformOrigin: "50% 100%", ease: "none" }, 0)
                        .to(shade, { opacity: 0.6, ease: "none" }, 0);
                });
                return () => {
                    added.forEach((n) => n.remove());
                    faces.forEach((f) => f.classList.remove("stack-card"));
                };
            });
        },
        { scope: root },
    );

    // Section-specific choreography (declared with data attributes)
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // [data-cascade]: children fly in from the right, one after another
                gsap.utils.toArray<HTMLElement>("[data-cascade]").forEach((box) => {
                    gsap.from(box.children, { x: 80, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
                });
                // [data-flip]: cards swing open on a hinge
                gsap.utils.toArray<HTMLElement>("[data-flip]").forEach((box) => {
                    gsap.set(box, { perspective: 1200 });
                    gsap.from(box.children, { rotateY: -75, transformOrigin: "0% 50%", opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: box, start: "top 85%", once: true } });
                });
                // [data-rise]: list rows rise and unmask from a hairline
                gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((box) => {
                    gsap.from(box.children, { yPercent: 60, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
                });
                // [data-zoom]: a block grows from a small window as it scrolls through
                gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
                    gsap.fromTo(el, { clipPath: "inset(8% 10% 8% 10% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 1 } });
                });
            });
        },
        { scope: root },
    );

    return (
        <div ref={root} data-copy-ready={copyReady}>
            <Header />
            <main>
                <Hero play={play} />
                <Logos />
                <Impact />
                <Services />
                <Audiences />
                <Work />
                <Testimonials />
                <Videos />
                <Tech />
                <Why />
                <Models />
                <Process />
                <Faq />
                <WhiteLabel />
                <Closing />
            </main>
        </div>
    );
}