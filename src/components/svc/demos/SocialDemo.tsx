import { useState } from "react";
import { Chips, Logo, Phone, Range } from "../ui";
import { useBiz } from "../store";
import { handle, photo, ramp } from "../util";

const KINDS = {
    Nightclub: { a: "club-empty", b: "club-full", unit: "Tables reserved", cap: 40, dms: ["Table for 8 on Saturday?", "Is the DJ back this week?", "Guest list for 12 please!", "Bottle service for a birthday?"], feed: ["club-full", "friends-phone", "stage", "camera"] },
    Restaurant: { a: "dining-empty", b: "dining-full", unit: "Covers booked", cap: 120, dms: ["Can I book 4 for tonight?", "Do you do private dining?", "That dish looks amazing, menu?", "Table by the window, 8 pm?"], feed: ["dining-full", "cafe-phone", "friends-phone", "dining-empty"] },
    Shop: { a: "shop-empty", b: "shop-full", unit: "Visitors today", cap: 300, dms: ["Is this still in stock?", "What are your hours today?", "Do you have it in medium?", "Just saw your reel, on my way!"], feed: ["shop-full", "shop-empty", "cafe-phone", "parcels"] },
} as const;
type Kind = keyof typeof KINDS;
const NAMES = Object.keys(KINDS) as Kind[];

/** Drag the activity up: the Instagram feed fills, messages arrive and the room goes from quiet to packed */
export default function SocialDemo() {
    const biz = useBiz();
    const [kind, setKind] = useState<Kind>("Nightclub");
    const [v, setV] = useState(12);
    const k = KINDS[kind];
    const fill = ramp(v, 10, 92);
    const tiles = Math.round(1 + fill * 8);
    const dms = k.dms.filter((_, i) => v > 28 + i * 17);

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
            <div className="flex flex-col gap-5">
                <div className="grid items-center gap-6 rounded-[28px] bg-white p-[clamp(20px,2vw,32px)] md:grid-cols-[auto_1fr]">
                    <div className="[&_button]:bg-glacier [&_button[aria-pressed=true]]:bg-navy"><Chips items={NAMES} value={kind} onChange={setKind} label="Type of business" /></div>
                    <Range label="Drag: your Instagram activity" value={v} min={0} max={100} onChange={setV} show={v < 25 ? "Now and then" : v < 60 ? "Weekly" : v < 85 ? "Every day" : "Managed by ZEBAQ"} />
                </div>
                <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-[32px] bg-ink text-off lg:min-h-[440px]">
                    <img src={photo(k.a)} alt={`A quiet ${kind.toLowerCase()}`} className="absolute inset-0 h-full w-full object-cover" style={{ filter: `saturate(${0.5 + fill * 0.5})` }} />
                    <img src={photo(k.b)} alt={`A busy ${kind.toLowerCase()}`} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300" style={{ opacity: fill }} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,49,.45),transparent_35%,rgba(7,22,49,.8))]" />

                    <p className="absolute left-[clamp(20px,3vw,44px)] top-[clamp(20px,3vw,40px)] max-w-[80%] text-[clamp(30px,4.2vw,72px)] font-medium leading-none tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)", textShadow: `0 0 ${8 + fill * 34}px rgba(245,234,59,${0.15 + fill * 0.75})`, opacity: 0.55 + fill * 0.45 }}>
                        {biz}
                    </p>

                    <div className="absolute right-4 top-[26%] flex w-[min(62%,270px)] flex-col items-end gap-2.5 sm:right-6">
                        {dms.map((d) => (
                            <div key={kind + d} className="svc-pop flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-2.5 text-[14px] font-medium leading-snug text-navy shadow-xl">
                                <Logo slug="instagram" size={18} />{d}
                            </div>
                        ))}
                    </div>

                    <div className="absolute inset-x-[clamp(20px,3vw,44px)] bottom-[clamp(20px,2.6vw,36px)]">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm text-glacier-2">{k.unit}</p>
                                <p className="text-[clamp(40px,4.6vw,76px)] font-light leading-none tracking-[-0.05em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                                    {Math.round(k.cap * (0.06 + fill * 0.94))}<span className="ml-2 text-[0.4em] tracking-normal text-glacier-2">/ {k.cap}</span>
                                </p>
                            </div>
                            <p className="pb-1 text-right text-[clamp(16px,1.4vw,22px)] font-medium">{fill < 0.25 ? "Quiet night" : fill < 0.6 ? "Word is spreading" : fill < 0.95 ? "Filling up" : "Full house"}</p>
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-lemon" style={{ width: `${6 + fill * 94}%` }} /></div>
                    </div>
                </div>

            </div>

            <Phone className="lg:max-w-none">
                <div className="px-4 pb-4 pt-11">
                    <div className="flex items-center justify-between">
                        <p className="max-w-[190px] truncate text-[15px] font-bold">{handle(biz)}</p>
                        <Logo slug="instagram" size={22} />
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full p-[3px] transition-all duration-500" style={{ background: v > 30 ? "conic-gradient(#f58529,#dd2a7b,#8134af,#515bd4,#f58529)" : "#d7dee6" }}>
                            <span className="grid h-full w-full place-items-center rounded-full bg-white text-2xl font-semibold">{biz.charAt(0).toUpperCase()}</span>
                        </span>
                        <dl className="flex flex-1 justify-around text-center text-[12px]">
                            <div><dt className="text-navy-2">Posts</dt><dd className="text-[17px] font-bold tabular-nums">{Math.round(4 + fill * 86)}</dd></div>
                            <div><dt className="text-navy-2">Stories</dt><dd className="text-[17px] font-bold tabular-nums">{Math.round(fill * 14)}</dd></div>
                            <div><dt className="text-navy-2">Replies</dt><dd className="text-[17px] font-bold">{v > 70 ? "Fast" : v > 35 ? "Same day" : "Slow"}</dd></div>
                        </dl>
                    </div>
                    <p className="mt-3 text-[13px] leading-snug">{kind} · Open tonight<br /><span className="font-semibold text-[#00376b]">Book here ↗</span></p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[13px] font-semibold">
                        <span className="rounded-lg bg-[#0095f6] py-2 text-white">{kind === "Shop" ? "Shop" : "Reserve"}</span>
                        <span className="rounded-lg bg-glacier py-2">Message</span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-[3px] overflow-hidden rounded-lg">
                        {Array.from({ length: 9 }, (_, i) => (
                            <div key={i} className="relative aspect-[4/5] overflow-hidden bg-glacier">
                                {i < tiles && <img src={photo(k.feed[i % k.feed.length])} alt="" className="svc-pop absolute inset-0 h-full w-full object-cover" style={{ objectPosition: `${(i * 37) % 100}% 50%`, filter: `hue-rotate(${(i % 3) * 6}deg)` }} />}
                                {i < tiles && i % 3 === 1 && <span className="absolute right-1.5 top-1 text-[11px] text-white drop-shadow">▶</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </Phone>
        </div>
    );
}
