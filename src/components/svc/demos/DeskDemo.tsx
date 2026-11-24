import { useState } from "react";
import { Chips, Logo, Range, Toggle } from "../ui";
import { useBiz } from "../store";
import { photo } from "../util";

const KINDS = {
    Hotel: { p: "hotel", q: [["whatsapp", "Late check-in, is that possible?"], ["instagram", "Do you have sea-view rooms?"], ["gmail", "Group booking for 14 rooms"], ["googlemaps", "New review to answer"]] },
    Nightclub: { p: "club-full", q: [["instagram", "Table for 10 tonight?"], ["whatsapp", "Is the guest list open?"], ["messenger", "Lost my jacket last night"], ["googlemaps", "New review to answer"]] },
    "Online store": { p: "parcels", q: [["whatsapp", "Where is my order?"], ["instagram", "Is this in stock?"], ["gmail", "I need to exchange a size"], ["messenger", "Discount code not working"]] },
} as const;
type Kind = keyof typeof KINDS;
const NAMES = Object.keys(KINDS) as Kind[];
const R = 132, C = 2 * Math.PI * R;

/** Turn the clock: see which hours your own team covers, and what the desk picks up */
export default function DeskDemo() {
    const biz = useBiz();
    const [kind, setKind] = useState<Kind>("Hotel");
    const [h, setH] = useState(21);
    const [on, setOn] = useState(false);
    const k = KINDS[kind];
    const own = h >= 9 && h < 18;
    const covered = own || on;
    const hand = (h / 24) * 360;

    return (
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-off">
            <img src={photo(k.p)} alt="" className="absolute inset-0 h-full w-full object-cover transition-all duration-700" style={{ opacity: covered ? 0.5 : 0.18, filter: covered ? "none" : "grayscale(1)" }} />
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,22,49,.88),rgba(7,22,49,.55)_60%,rgba(7,22,49,.9))]" />
            <div className="relative grid gap-8 p-[clamp(20px,2.6vw,48px)] lg:grid-cols-[380px_1fr_330px] lg:items-center">
                {/* dial */}
                <div className="relative mx-auto aspect-square w-full max-w-[380px]">
                    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
                        <circle cx="160" cy="160" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="26" />
                        <g transform="rotate(-90 160 160)">
                            <circle cx="160" cy="160" r={R} fill="none" stroke="#f5ea3b" strokeWidth="26" strokeDasharray={`${on ? C : 0} ${C}`} className="transition-all duration-1000" opacity=".9" />
                            <circle cx="160" cy="160" r={R} fill="none" stroke="#8fb0c9" strokeWidth="26" strokeDasharray={`${(9 / 24) * C} ${C}`} strokeDashoffset={-(9 / 24) * C} />
                        </g>
                        {[0, 6, 12, 18].map((t) => { const a = ((t / 24) * 360 - 90) * (Math.PI / 180); return <text key={t} x={160 + Math.cos(a) * 100} y={160 + Math.sin(a) * 100 + 5} textAnchor="middle" fontSize="14" fill="#cfe1ee">{String(t).padStart(2, "0")}</text>; })}
                        <g style={{ transform: `rotate(${hand}deg)`, transformOrigin: "160px 160px", transition: "transform .3s" }}><circle cx="160" cy={160 - R} r="17" fill="#fff" /><circle cx="160" cy={160 - R} r="7" fill="#0a1f44" /></g>
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-center">
                        <div>
                            <p className="text-[64px] font-light leading-none tracking-[-0.06em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{String(h).padStart(2, "0")}:00</p>
                            <p className={`mt-2 text-sm font-semibold ${covered ? "text-lemon" : "text-red-300"}`}>{own ? "Your team" : on ? "ZEBAQ desk" : "Nobody there"}</p>
                        </div>
                    </div>
                </div>

                {/* queue */}
                <div>
                    <p className="text-sm text-glacier-2">Coming in for {biz}</p>
                    <ul className="mt-4 space-y-2.5">
                        {k.q.map(([s, t], i) => (
                            <li key={kind + t} className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-500 ${covered ? "bg-white text-navy" : "bg-white/10"}`} style={{ transitionDelay: `${i * 90}ms` }}>
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-glacier"><Logo slug={s} size={19} /></span>
                                <span className="flex-1 text-[15px] font-medium leading-snug">{t}</span>
                                <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${covered ? "bg-emerald-100 text-emerald-800" : "bg-red-400/25 text-red-200"}`}>{covered ? "Answered" : "Waiting"}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-[clamp(22px,2.1vw,34px)] font-medium leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>{on ? "Every hour covered, with a report each morning." : "Nine hours covered. Fifteen hours missed."}</p>
                </div>

                <div className="space-y-5 rounded-[28px] bg-white/10 p-5 backdrop-blur max-lg:order-first">
                    <Chips dark items={NAMES} value={kind} onChange={setKind} label="Type of business" />
                    <Range dark label="Turn the clock" value={h} min={0} max={23} onChange={setH} show={`${String(h).padStart(2, "0")}:00`} />
                    <Toggle dark on={on} onChange={setOn} label="Add the ZEBAQ desk" note="Evening, night and weekend shifts" />
                </div>
            </div>
        </div>
    );
}
