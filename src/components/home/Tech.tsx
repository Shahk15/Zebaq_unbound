import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TECH, TECH_NOTE, TECH_TITLE } from "../../data/home/tech";
import { Split } from "../common/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// name -> website domain (real logo), simple-icons slug (brand-colour fallback), brand colour (monogram fallback)
const BRAND: Record<string, { domain: string; slug?: string; color: string }> = {
  HubSpot: { domain: "hubspot.com", slug: "hubspot", color: "#ff7a59" },
  GoHighLevel: { domain: "gohighlevel.com", color: "#2563eb" },
  Salesforce: { domain: "salesforce.com", slug: "salesforce", color: "#00a1e0" },
  ClickFunnels: { domain: "clickfunnels.com", slug: "clickfunnels", color: "#1a73e8" },
  OpenAI: { domain: "openai.com", slug: "openai", color: "#111111" },
  Zapier: { domain: "zapier.com", slug: "zapier", color: "#ff4f00" },
  Make: { domain: "make.com", slug: "make", color: "#6d00cc" },
  n8n: { domain: "n8n.io", slug: "n8n", color: "#ea4b71" },
  "Google Ads": { domain: "ads.google.com", slug: "googleads", color: "#4285f4" },
  "Meta Ads": { domain: "facebook.com", slug: "meta", color: "#0866ff" },
  GA4: { domain: "analytics.google.com", slug: "googleanalytics", color: "#e37400" },
  Canva: { domain: "canva.com", slug: "canva", color: "#00c4cc" },
  Shopify: { domain: "shopify.com", slug: "shopify", color: "#95bf47" },
  WordPress: { domain: "wordpress.org", slug: "wordpress", color: "#21759b" },
  Webflow: { domain: "webflow.com", slug: "webflow", color: "#146ef5" },
  WooCommerce: { domain: "woocommerce.com", slug: "woocommerce", color: "#96588a" },
};

// Optional: put your own file in /public/logos and it wins over everything
const LOCAL: Record<string, string> = {
  // GoHighLevel: "/logos/gohighlevel.svg",
};

function Logo({ name }: { name: string }) {
  const b = BRAND[name];
  const [stage, setStage] = useState(0);

  const sources = [
    LOCAL[name],
    b ? `https://www.google.com/s2/favicons?domain=${b.domain}&sz=128` : undefined,
    b?.slug ? `https://cdn.simpleicons.org/${b.slug}` : undefined,
  ].filter(Boolean) as string[];

  const src = sources[stage];

  if (!src) {
    return (
      <span
        aria-hidden="true"
        className="grid h-full w-full place-items-center text-[13px] font-bold text-white"
        style={{ background: b?.color ?? "#0a1f44" }}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable={false}
      onError={() => setStage((s) => s + 1)}
      className="h-full w-full object-contain"
    />
  );
}

export default function Tech() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".tech-card").forEach((card, i) => {
          gsap.from(card, {
            y: 40,
            scale: 0.98,
            duration: 0.9,
            delay: (i % 2) * 0.12,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });

        // slow float on logo badges so the section feels alive
        gsap.utils.toArray<HTMLElement>(".tech-logo").forEach((el, i) => {
          gsap.to(el, {
            y: -2.5,
            duration: 2 + (i % 4) * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: (i % 5) * 0.2,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-index="10" data-label="Technology Ecosystem" className="on-light section bg-off">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-reveal>Technology ecosystem</p>
            <h2 className="t-l mt-8 max-w-[14ch]"><Split text={TECH_TITLE} dot /></h2>
          </div>
          <p className="max-w-xs text-navy-2" data-reveal>
            We plug into the tools you already use — or set up the right ones.
          </p>
        </div>

        {/* one card per category, all its tools inside as pills */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {TECH.map((g, i) => (
            <div
              key={g.group}
              className="tech-card group relative overflow-hidden rounded-[28px] border border-navy/10 bg-glacier/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-glacier hover:shadow-[0_30px_60px_-30px_rgba(10,31,68,.35)] md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="tech-title text-[clamp(24px,2.2vw,34px)] font-medium leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                  {g.group}
                </p>
                <span className="tech-num text-sm font-medium text-navy-2">0{i + 1}</span>
              </div>

              <span className="tech-bar mt-6 block h-px origin-left bg-navy/15" aria-hidden="true" />

              <div className="mt-7 flex flex-wrap gap-3">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="tech-pill inline-flex items-center gap-2.5 rounded-full border border-navy/10 bg-off py-2 pl-2 pr-5 text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:shadow-[0_10px_24px_-12px_rgba(10,31,68,.5)]"
                  >
                    <span className="tech-logo grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5 shadow-[inset_0_0_0_1px_rgba(10,31,68,.08)]">
                      <Logo name={it} />
                    </span>
                    {it}
                  </span>
                ))}
              </div>

              {/* soft lemon glow on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-lemon/0 blur-3xl transition-all duration-700 group-hover:bg-lemon/50"
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-navy-2">{TECH_NOTE}</p>
      </div>
    </section>
  );
}