import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Split } from "../common/ui";
import { Cta, Logo, NameField } from "./ui";
import { useBiz } from "./store";
import { photo } from "./util";
import type { ServicePageContent } from "../../data/services/page-types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Where each floating card sits over the photo
const SPOTS = ["left-[2%] top-[18%]", "right-[0%] top-[44%]", "left-[10%] bottom-[10%]"];

/** Cinematic opener: the outcome as a photo, with live platform moments floating over it */
export default function SvcHero({ data }: { data: ServicePageContent["hero"] }) {
    const root = useRef<HTMLElement>(null);
    const biz = useBiz();

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set([".sv-eyebrow", ".sv-sub", ".sv-cta > *", ".sv-name"], { y: 24, opacity: 0 });
                gsap.set(".sv-title .sw > span", { yPercent: 110 });
                gsap.set(".sv-photo", { clipPath: "inset(12% 10% 12% 10% round 48px)", opacity: 0 });
                gsap.set(".sv-float", { opacity: 0, y: 40, scale: 0.9 });

                const tl = gsap.timeline({ paused: true });
                tl.to(".sv-eyebrow", { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" })
                    .to(".sv-photo", { clipPath: "inset(0% 0% 0% 0% round 36px)", opacity: 1, duration: 1.6, ease: "expo.out" }, "<")
                    .to(".sv-title .sw > span", { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.05 }, "-=1.3")
                    .to([".sv-sub", ".sv-cta > *", ".sv-name"], { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.07 }, "-=0.9")
                    .to(".sv-float", { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)", stagger: 0.18 }, "-=0.8");

                const start = () => tl.play();
                if (document.documentElement.dataset.pt === "busy") window.addEventListener("page:ready", start, { once: true });
                else gsap.delayedCall(0.15, start);

                // gentle depth while scrolling away
                gsap.to(".sv-photo img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
                return () => window.removeEventListener("page:ready", start);
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} data-hero className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_85%_0%,#ffffff_0%,#f7f6f1_45%,#e4eef5_100%)] text-navy">
            <div className="wrap relative grid items-center gap-10 pb-[clamp(40px,6vw,80px)] pt-[clamp(110px,15svh,150px)] lg:min-h-[100svh] lg:grid-cols-[1.02fr_1fr] lg:gap-[4vw]">
                <div>
                    <p className="eyebrow sv-eyebrow text-navy-2">{data.eyebrow}</p>
                    <h1 className="sv-title mt-7 text-[clamp(42px,min(5.5vw,10svh),104px)] font-light leading-[0.98] tracking-[-0.05em]" style={{ fontFamily: "var(--font-display)" }}>
                        <Split text={data.line1} /> <Split text={data.line2} dot />
                    </h1>
                    <p className="sv-sub mt-7 max-w-[520px] text-[clamp(16px,1.15vw,19px)] leading-[1.65] text-navy-2">{data.text}</p>
                    <NameField className="sv-name mt-8 max-w-[420px]" />
                    <div className="sv-cta mt-6 flex flex-wrap gap-3">
                        <Cta href="#demo" tone="navy">Show me how it works</Cta>
                        <Cta href="#book" tone="ghost">Book a Strategy Call</Cta>
                    </div>
                </div>

                <div className="relative">
                    <div className="sv-photo relative aspect-[5/5.4] max-h-[78svh] w-full overflow-hidden rounded-[36px] max-lg:aspect-[4/3.6]">
                        <img src={photo(data.photo)} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(7,22,49,.45))]" />
                    </div>
                    {data.floats.map((f, i) => (
                        <div key={f.title} className={`sv-float absolute ${SPOTS[i]} max-w-[min(78%,310px)] lg:first-of-type:-left-6`}>
                            <div className="svc-bob flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 text-navy shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)]" style={{ animationDelay: `${i * -2}s` }}>
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-glacier"><Logo slug={f.logo} size={24} /></span>
                                <span className="min-w-0">
                                    <span className="block text-[14px] font-semibold leading-tight">{f.title.replace("{biz}", biz)}</span>
                                    <span className="mt-1 block text-[12.5px] leading-snug text-navy-2">{f.sub.replace("{biz}", biz)}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
