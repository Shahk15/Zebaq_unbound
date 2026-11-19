import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Award,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import Header from "../components/layout/Header";
import { Arrow, Dot, Eyebrow, Split } from "../components/common/ui";
import { IMAGES } from "../data/images";
import { SITE } from "../data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VALUES = [
  {
    name: "Innovation",
    description: "We embrace new ideas, welcome change, and continuously look for better ways to move forward.",
    Icon: Lightbulb,
  },
  {
    name: "Integrity",
    description: "We believe in honesty, transparency, and building relationships founded on trust and mutual respect.",
    Icon: ShieldCheck,
  },
  {
    name: "Excellence",
    description: "We maintain high standards, take pride in our work, and strive for quality in every responsibility we undertake.",
    Icon: Award,
  },
  {
    name: "Collaboration",
    description: "We value different perspectives and believe that meaningful progress comes from working together.",
    Icon: UsersRound,
  },
  {
    name: "Adaptability",
    description: "We remain open to change, embrace new challenges, and evolve with an ever-changing world.",
    Icon: RefreshCw,
  },
  {
    name: "Growth",
    description: "We believe in continuous learning, personal development, and creating opportunities to become better every day.",
    Icon: TrendingUp,
  },
];

export default function Aboutus({ play }: { play: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const imageCard = useRef<HTMLDivElement>(null);
  const valuesCards = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "About ZEBAQ | Think Beyond. Move Forward.";
    if (description) {
      description.content = "Learn about ZEBAQ, our mission and vision, the values that define us, and the people and ideas behind our work.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useGSAP(
    () => {
      const card = imageCard.current;
      if (!play || !card || reducedMotion) return;

      gsap.set(card, { transformPerspective: 1200, transformStyle: "preserve-3d" });
      gsap.fromTo(
        card,
        { x: 90, y: 90, rotateX: 8, rotateY: -16, rotateZ: 4, scale: 0.9, opacity: 0 },
        { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1, duration: 1.35, ease: "back.out(1.2)" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current).forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play reset play reset",
          },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-split]", root.current).forEach((el) => {
        gsap.from(el.querySelectorAll(".sw > span"), {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play reset play reset",
          },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-flip]", root.current).forEach((box) => {
        gsap.set(box, { perspective: 1200 });
        gsap.from(box.children, {
          rotateY: -55,
          transformOrigin: "0% 50%",
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-rise]", root.current).forEach((box) => {
        gsap.from(box.children, {
          yPercent: 60,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: box,
            start: "top 88%",
            toggleActions: "play reset play reset",
          },
        });
      });
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      if (!window.matchMedia("(pointer: fine)").matches) {
        return () => window.removeEventListener("load", refresh);
      }

      const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
      const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        rotateX(-y * 7);
        rotateY(x * 7);
      };
      const onLeave = () => { rotateX(0); rotateY(0); };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("load", refresh);
      };
    },
    { scope: root, dependencies: [play, reducedMotion] },
  );

  useGSAP(
    () => {
      const cards = valuesCards.current?.children;
      if (!play || reducedMotion || !cards?.length) return;

      gsap.fromTo(
        cards,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "none",
          stagger: 0.16,
          scrollTrigger: {
            trigger: valuesCards.current,
            start: "top 82%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root, dependencies: [play, reducedMotion] },
  );

  return (
    <div ref={root} className="bg-off text-navy">
      <Header />
      <main>
        <section id="top" className="relative overflow-hidden bg-[radial-gradient(100%_90%_at_85%_10%,#ffffff_0%,#eef4f8_52%,#e4eef5_100%)] pt-28 md:pt-36">
          {!reducedMotion && (
            <video
              aria-hidden="true"
              autoPlay
              loop
              muted
              playsInline
              tabIndex={-1}
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
              src="/about-ambient.mp4"
            />
          )}
          <div ref={hero} className="wrap relative z-10 grid min-h-[76svh] items-center gap-10 pb-20 pt-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:pb-24">
            <div
              ref={imageCard}
              className="group relative mx-auto aspect-[127/86] w-full max-w-[620px] overflow-hidden rounded-[32px] bg-[#2b1d12] shadow-[0_30px_90px_-40px_rgba(7,22,49,.55)] will-change-transform lg:order-1"
            >
              <div
                role="img"
                aria-label="A person using a laptop displaying a ZEBAQ digital growth strategy website"
                className="absolute inset-0 bg-[length:100%_100%] bg-center bg-no-repeat"
                style={{ backgroundImage: `url("${IMAGES.about}")` }}
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-amber-400/10" />
            </div>

            <div className="about-copy relative z-10 py-8 lg:order-2 lg:py-12">
              <h1 className="about-title t-l mt-8 max-w-[11ch] text-[clamp(54px,8.5vw,120px)]">
                <Split text="We Believe in Building What's Next" dot />
              </h1>
              <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-navy-2 md:text-xl">
                <p className="about-copy-line" data-reveal>
                  At ZEBAQ, we believe progress starts with curiosity, new ideas, and the courage
                  to think differently.
                </p>
                <p className="about-copy-line" data-reveal>
                  We bring technology and creativity together to help businesses grow and build
                  lasting relationships.
                </p>
                <p className="about-copy-line" data-reveal>
                  As the world changes, we keep learning and growing with the people we work with.
                </p>
              </div>
              <p className="about-philosophy mt-8 border-l-2 border-lemon-deep pl-4 font-medium leading-relaxed text-navy" data-reveal>
                Our philosophy: Think Beyond. Move Forward.
              </p>
            </div>
          </div>
        </section>

        <section id="story" className="wrap section">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow className="text-navy-2">OUR STORY</Eyebrow>
              <h2 className="t-m mt-7 max-w-[12ch]"><Split text="Driven by Ideas. Defined by Innovation" dot /></h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-navy-2 md:text-xl">
              <p data-reveal>
                ZEBAQ is built on the belief that innovation should create meaningful progress.
                We bring together people, ideas, and forward-thinking approaches to create an
                environment where creativity and continuous improvement are encouraged.
              </p>
              <p data-reveal>
                We believe that every successful journey begins with a clear purpose and a
                willingness to evolve. That's why we value fresh perspectives, open communication,
                and the ability to adapt to an ever-changing world.
              </p>
              <blockquote data-reveal className="mt-12 border-t border-navy/15 pt-8 text-[clamp(28px,4vw,54px)] font-medium leading-[1.05] tracking-[-0.045em] text-navy" style={{ fontFamily: "var(--font-display)" }}>
                Our identity goes beyond what we do. It reflects how we think, how we work, and the standards we set for ourselves.
              </blockquote>
              <p data-reveal>
                At ZEBAQ, we are constantly looking ahead, exploring new possibilities, and
                striving to make a meaningful difference through everything we undertake.
              </p>
            </div>
          </div>
        </section>

        <section id="purpose" data-dark className="bg-ink py-24 text-off md:py-36">
          <div className="wrap">
            <Eyebrow className="text-glacier-3">OUR PURPOSE</Eyebrow>
            <h2 className="t-m mt-7 max-w-[14ch] text-off"><Split text="A Clear Purpose. A Bigger Vision" dot /></h2>
            <div data-flip className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-7">
              <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-8 md:p-12">
                <span className="text-sm font-semibold tracking-[0.18em] text-glacier-3">01 / MISSION</span>
                <h3 className="mt-10 text-4xl font-medium tracking-tight md:text-5xl">Our Mission</h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-glacier-2">
                  Our mission is to embrace innovation, encourage creative thinking, and build
                  meaningful relationships that contribute to lasting progress.
                </p>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-glacier-2">
                  We aim to create an environment where ideas are valued, people are empowered,
                  and continuous improvement remains at the heart of everything we do.
                </p>
              </article>
              <article className="relative overflow-hidden rounded-[28px] bg-lemon p-8 text-navy md:p-12">
                <span className="text-sm font-semibold tracking-[0.18em] text-navy/65">02 / VISION</span>
                <h3 className="mt-10 text-4xl font-medium tracking-tight md:text-5xl">Our Vision</h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy/75">
                  Our vision is to become a globally recognized and trusted organization known
                  for its progressive mindset, commitment to excellence, and ability to evolve
                  with the changing world.
                </p>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy/75">
                  We aspire to create a future shaped by innovation, collaboration, and
                  opportunities for continuous growth.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="values" className="wrap section">
          <div>
            <Eyebrow className="text-navy-2">WHAT DEFINES US</Eyebrow>
            <h2 className="t-m mt-7 max-w-[13ch]"><Split text="Principles That Shape Everything We Do" dot /></h2>
          </div>
          <div ref={valuesCards} className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {VALUES.map(({ name, description, Icon }, index) => (
              <article key={name} className="group min-h-[250px] rounded-[24px] border border-navy/10 bg-white/75 p-7 transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-glacier hover:shadow-[0_12px_30px_-18px_rgba(7,22,49,.24)] md:p-9">
                <div className="flex items-start justify-between">
                  <Icon aria-hidden="true" size={27} strokeWidth={1.6} className="text-navy" />
                  <span className="text-xs font-semibold tracking-[0.15em] text-navy-2/60">0{index + 1}</span>
                </div>
                <h3 className="mt-10 text-2xl font-medium tracking-tight md:text-3xl">{name}</h3>
                <p className="mt-3 leading-relaxed text-navy-2">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="people" className="border-y border-navy/10 bg-white/60 py-24 md:py-36">
          <div className="wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div>
              <Eyebrow className="text-navy-2">LIFE AT ZEBAQ</Eyebrow>
              <h2 className="t-m mt-7 max-w-[10ch]"><Split text="Great People. Shared Ambitions. One Vision" dot /></h2>
            </div>
            <div>
              <p data-reveal className="text-[clamp(28px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.045em]" style={{ fontFamily: "var(--font-display)" }}>
                We believe that a company's greatest strength lies in its people.
              </p>
              <div data-rise className="mt-10 space-y-6 border-t border-navy/15 pt-7 text-lg leading-relaxed text-navy-2">
                <p>
                  At ZEBAQ, we encourage a culture built around collaboration, creativity,
                  accountability, and continuous learning. We value individuals who bring fresh
                  perspectives, challenge ideas, and contribute to a shared vision.
                </p>
                <p>
                  We believe in creating an environment where people can express themselves,
                  develop their potential, and grow together.
                </p>
                <p>
                  Because when people grow, ideas evolve, and possibilities become greater.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="closing" data-dark className="relative overflow-hidden bg-ink py-28 text-center text-off md:py-40">
          <div className="wrap relative z-[1]">
            <Eyebrow className="text-glacier-3">THE JOURNEY CONTINUES</Eyebrow>
            <h2 data-reveal className="mx-auto mt-8 max-w-[13ch] text-[clamp(48px,9vw,132px)] font-medium leading-[0.92] tracking-[-0.06em]">
              We're Just <span className="text-lemon">Getting Started</span><Dot />
            </h2>
            <div data-reveal className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-glacier-2 md:text-xl">
              <p>The world never stands still, and neither do we.</p>
              <p>
                At ZEBAQ, we remain focused on embracing new possibilities, challenging
                limitations, and building a future driven by innovation and purpose.
              </p>
              <p>
                Our journey is one of continuous evolution, shared ambition, and a commitment to
                always moving forward.
              </p>
            </div>
            <p data-reveal className="mt-10 font-medium tracking-tight text-lemon md:text-xl" style={{ fontFamily: "var(--font-display)" }}>
              ZEBAQ – Think Beyond. Move Forward.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-glacier-3">
        <div className="wrap flex flex-col justify-between gap-5 border-t border-white/10 py-8 text-sm md:flex-row md:items-center">
          <a href="/" className="inline-flex w-fit items-center" aria-label="ZEBAQ home">
            <img src="/images/logo/full-logo.png" alt="ZEBAQ" className="h-7 w-auto brightness-0 invert" />
          </a>
          <p>© {new Date().getFullYear()} ZEBAQ. Think Beyond. Move Forward.</p>
          <a href={`mailto:${SITE.email}`} className="inline-flex w-fit items-center gap-2 hover:text-lemon">
            {SITE.email}<Arrow size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
