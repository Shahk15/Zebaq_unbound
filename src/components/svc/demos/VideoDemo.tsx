import { useState } from "react";
import { Chips, Logo, Range } from "../ui";
import { useBiz } from "../store";
import { photo } from "../util";

const SHOTS = { Nightclub: "club-full", Restaurant: "dining-full", Shop: "shop-full", Event: "stage" } as const;
type Shot = keyof typeof SHOTS;
const NAMES = Object.keys(SHOTS) as Shot[];
const HOOKS: Record<Shot, string> = { Nightclub: "POV: you finally found the place", Restaurant: "The table everyone is asking for", Shop: "Three pieces you need this week", Event: "You had to be there" };
const OUT = [
    { n: "Reel", s: "instagram", r: "aspect-[9/16]" }, { n: "Short", s: "youtube", r: "aspect-[9/16]" }, { n: "TikTok", s: "tiktok", r: "aspect-[9/16]" }, { n: "Story", s: "instagram", r: "aspect-[9/16]" },
    { n: "Feed post", s: "facebook", r: "aspect-square" }, { n: "Carousel", s: "linkedin", r: "aspect-square" }, { n: "Ad cut", s: "meta", r: "aspect-square" }, { n: "Pin", s: "pinterest", r: "aspect-[2/3]" },
    { n: "Banner", s: "google", r: "aspect-video" }, { n: "Teaser", s: "youtube", r: "aspect-video" },
];

/** Drag the divider from raw footage to the finished cut, then see one shoot become a month of content */
export default function VideoDemo() {
    const biz = useBiz();
    const [shot, setShot] = useState<Shot>("Nightclub");
    const [cut, setCut] = useState(42);
    const [hours, setHours] = useState(2);
    const src = photo(SHOTS[shot]);
    const pieces = Math.min(OUT.length, hours * 2 + 2);

    return (
        <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                <div className="relative aspect-[16/8.4] min-h-[330px] w-full overflow-hidden rounded-[32px] bg-ink text-white select-none">
                    {/* raw */}
                    <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "saturate(.28) contrast(.78) brightness(.86)" }} />
                    <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[13px]"><i className="h-2 w-2 rounded-full bg-red-500" />Raw footage</span>
                    {/* finished */}
                    <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${cut}%)` }}>
                        <img src={src} alt="" className="absolute inset-0 h-full w-full scale-[1.04] object-cover" style={{ filter: "saturate(1.3) contrast(1.12) brightness(1.04)" }} />
                        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_60%_40%,transparent_50%,rgba(7,22,49,.6))]" />
                        <span className="absolute right-5 top-5 rounded-full bg-lemon px-4 py-2 text-[13px] font-semibold text-navy">Finished by ZEBAQ</span>
                        <p className="absolute right-[5%] top-[30%] w-[46%] text-right text-[clamp(22px,3.4vw,58px)] font-semibold leading-[1] tracking-[-0.04em] [text-shadow:0_2px_24px_rgba(7,22,49,.9)]" style={{ fontFamily: "var(--font-display)" }}>{HOOKS[shot]}</p>
                        <p className="absolute bottom-[22%] right-[5%] rounded-lg bg-white px-3 py-1.5 text-[clamp(13px,1.3vw,20px)] font-semibold text-navy">@ {biz}</p>
                    </div>
                    {/* waveform */}
                    <div className="absolute inset-x-5 bottom-5 flex h-9 items-end gap-[3px]" aria-hidden="true">
                        {Array.from({ length: 70 }, (_, i) => <i key={i} className="flex-1 rounded-full" style={{ height: `${20 + Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.4)) * 80}%`, background: (i / 70) * 100 > cut ? "#f5ea3b" : "rgba(255,255,255,.35)" }} />)}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white" style={{ left: `${cut}%` }}><span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-lg text-navy shadow-xl">⇄</span></div>
                    <input type="range" min={4} max={96} value={cut} onChange={(e) => setCut(Number(e.target.value))} aria-label="Compare raw footage with the finished edit" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
                </div>
                <div className="flex flex-col justify-between gap-7 rounded-[28px] bg-white p-[clamp(20px,2vw,32px)]">
                    <div className="[&_button]:bg-glacier [&_button[aria-pressed=true]]:bg-navy"><p className="mb-3 text-sm font-semibold">What are we filming?</p><Chips items={NAMES} value={shot} onChange={setShot} label="What to film" /></div>
                    <Range label="Hours on location" value={hours} min={1} max={4} onChange={setHours} show={`${hours} h`} />
                    <p className="text-[clamp(22px,1.9vw,30px)] font-medium leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>One visit. {pieces} ready-to-post formats, each cut for its platform.</p>
                </div>
            </div>
            <div className="rounded-[32px] bg-ink p-[clamp(18px,2vw,32px)]">
                <div className="flex items-end gap-3 overflow-x-auto pb-2">
                    {OUT.map((o, i) => (
                        <div key={o.n} className={`relative h-[clamp(140px,12.5vw,210px)] shrink-0 overflow-hidden rounded-2xl transition-all duration-500 ${o.r} ${i < pieces ? "opacity-100" : "scale-95 opacity-20 grayscale"}`}>
                            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: `${(i * 29) % 100}% 50%`, filter: i < pieces ? "saturate(1.25) contrast(1.08)" : undefined }} />
                            <span className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-white/95 px-2.5 py-2 text-[12px] font-semibold text-navy"><Logo slug={o.s} size={14} /><span className="truncate">{o.n}</span></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
