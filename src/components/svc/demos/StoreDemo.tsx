import { useEffect, useState } from "react";
import { Chips, Logo, Toggle } from "../ui";
import { useBiz } from "../store";
import { handle, photo } from "../util";

const FEATURES = [
    { id: "speed", l: "Fast pages", n: "Loads before they leave" },
    { id: "mobile", l: "Mobile-first design", n: "Built for the phone in their hand" },
    { id: "search", l: "Search and AI ready", n: "More people find you" },
    { id: "checkout", l: "Simple checkout", n: "Fewer steps, more orders" },
    { id: "secure", l: "Security shield", n: "SSL, firewall, bot protection" },
];
const KINDS = {
    "Online store": { p: "parcels", head: "Made for you, delivered to your door", btn: "Add to bag", items: ["shop-empty", "shop-full", "cafe-phone"], order: "New order received" },
    Restaurant: { p: "dining-full", head: "Your table is waiting", btn: "Reserve a table", items: ["dining-empty", "dining-full", "friends-phone"], order: "Table for 4 reserved" },
    "Service business": { p: "handshake", head: "Expert help, booked in a minute", btn: "Get a quote", items: ["team-desk", "support", "handshake"], order: "Quote requested" },
} as const;
type Kind = keyof typeof KINDS;
const NAMES = Object.keys(KINDS) as Kind[];
const CITIES = ["London", "Dallas", "Atlanta", "Bhubaneswar", "Leeds", "Houston"];

/** Build the site feature by feature: traffic climbs, orders land, attacks bounce off the shield */
export default function StoreDemo() {
    const biz = useBiz();
    const [kind, setKind] = useState<Kind>("Online store");
    const [on, setOn] = useState<string[]>(["mobile"]);
    const [tick, setTick] = useState(0);
    const has = (id: string) => on.includes(id);
    const k = KINDS[kind];
    const secure = has("secure");
    const power = on.length / FEATURES.length;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = window.setInterval(() => setTick((x) => x + 1), 1700);
        return () => window.clearInterval(t);
    }, []);

    // traffic curve: each feature lifts it
    const pts = Array.from({ length: 13 }, (_, i) => {
        const base = 8 + i * 0.6;
        const lift = power * 72 * Math.pow(i / 12, 1.6);
        return [i * (100 / 12), 96 - base - lift + Math.sin(i * 1.7 + tick * 0.6) * 2.2];
    });
    const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

    const feed = [0, 1, 2].map((o) => {
        const n = tick - o;
        const type = ((n % 3) + 3) % 3;
        if (type === 0) return { n, c: "bg-white/10", t: `Visitor from ${CITIES[((n % 6) + 6) % 6]}`, s: "google" };
        if (type === 1) return has("checkout") ? { n, c: "bg-lemon text-navy", t: k.order, s: "stripe" } : { n, c: "bg-white/10 text-glacier-3", t: "Visitor left at checkout", s: "google" };
        return secure ? { n, c: "bg-emerald-400/20", t: "Suspicious login blocked", s: "cloudflare" } : { n, c: "bg-red-500/25", t: "Unknown bot reached login", s: "cloudflare" };
    });

    return (
        <div className="grid gap-5 lg:grid-cols-[310px_1fr]">
            <div className="flex flex-col gap-3">
                <Chips items={NAMES} value={kind} onChange={setKind} label="Type of business" />
                {FEATURES.map((f) => <Toggle key={f.id} on={has(f.id)} onChange={(v) => setOn((o) => (v ? [...o, f.id] : o.filter((x) => x !== f.id)))} label={f.l} note={f.n} />)}
            </div>

            <div className="relative overflow-hidden rounded-[32px] bg-ink p-[clamp(16px,2vw,32px)] text-off">
                <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                    {/* the site */}
                    <div className={`relative rounded-[22px] transition-shadow duration-700 ${secure ? "shadow-[0_0_0_4px_rgba(52,211,153,.75),0_0_70px_rgba(52,211,153,.3)]" : "shadow-[0_0_0_2px_rgba(248,113,113,.45)]"}`}>
                        <div className="overflow-hidden rounded-[22px] bg-white text-navy">
                            <div className="flex items-center gap-2 border-b border-navy/10 px-4 py-3">
                                <i className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" /><i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c941]" />
                                <span className={`mx-auto flex max-w-[70%] items-center gap-2 truncate rounded-full px-4 py-1 text-[12px] ${secure ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{secure ? "🔒 Secure" : "Not secure"} · {handle(biz)}</span>
                            </div>
                            <div className="relative">
                                {!has("speed") && <div className="absolute inset-x-0 top-0 z-10 h-1 bg-navy/10"><div key={tick} className="h-full w-full origin-left animate-[scrollcue_1.7s_linear] bg-lemon-deep opacity-60" /></div>}
                                <div className={`relative h-[clamp(180px,19vw,280px)] overflow-hidden transition-[filter] duration-700 ${has("speed") ? "" : "blur-[3px] grayscale"}`}>
                                    <img src={photo(k.p)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,22,49,.82),rgba(7,22,49,.1))]" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-7">
                                        <p className="text-sm font-semibold">{biz}</p>
                                        <p className="mt-2 max-w-[15ch] text-[clamp(22px,2.3vw,38px)] font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>{k.head}</p>
                                        <span className={`mt-4 w-fit rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 ${has("checkout") ? "scale-105 bg-lemon text-navy" : "bg-white/25"}`}>{k.btn}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 p-4">
                                    {k.items.map((p, i) => <div key={p + i} className={`aspect-[4/3] overflow-hidden rounded-xl bg-glacier transition-[filter] duration-700 ${has("speed") ? "" : "blur-[2px]"}`}><img src={photo(p)} alt="" className="h-full w-full object-cover" style={{ objectPosition: `${i * 40}% 50%` }} /></div>)}
                                </div>
                            </div>
                        </div>
                        {/* phone view */}
                        <div className={`absolute -bottom-3 right-4 w-[24%] min-w-[92px] overflow-hidden rounded-[18px] border-4 border-ink bg-white shadow-2xl transition-all duration-700 ${has("mobile") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                            <div className="relative aspect-[9/16]">
                                <img src={photo(k.p)} alt="" className="absolute inset-0 h-1/2 w-full object-cover" />
                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white p-2 text-navy"><p className="truncate text-[10px] font-bold">{biz}</p><p className="mt-1 text-[9px] leading-tight">{k.head}</p><span className="mt-2 block rounded-full bg-lemon py-1 text-center text-[9px] font-semibold">{k.btn}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* live dashboard */}
                    <div className="flex flex-col gap-4">
                        <div className="rounded-[22px] bg-white/10 p-5">
                            <p className="flex items-center justify-between text-sm text-glacier-2">Traffic <Logo slug="googleanalytics" size={18} /></p>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-3 h-[130px] w-full" aria-hidden="true">
                                <path d={`${line} L100 100 L0 100 Z`} fill="rgba(245,234,59,.18)" className="transition-all duration-700" />
                                <path d={line} fill="none" stroke="#f5ea3b" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                            </svg>
                            <p className="mt-2 text-sm">{power < 0.4 ? "Hard to find, slow to load" : power < 0.9 ? "Climbing" : "Built to be found and bought from"}</p>
                        </div>
                        <div className="flex-1 rounded-[22px] bg-white/10 p-5">
                            <p className="text-sm text-glacier-2">Live activity</p>
                            <ul className="mt-3 space-y-2">
                                {feed.map((f, i) => <li key={f.n} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-medium ${f.c} ${i === 0 ? "svc-pop" : ""}`}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white"><Logo slug={f.s} size={16} /></span>{f.t}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
