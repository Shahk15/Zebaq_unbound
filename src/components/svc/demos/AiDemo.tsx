import { useEffect, useState } from "react";
import { Chips, Logo, Toggle } from "../ui";
import { useBiz } from "../store";

const ASKS = {
    "Interior design": { q: "Who is the best interior designer near me for a full home?", others: ["Competitor A", "Competitor B", "Competitor C"], why: "full-home projects, clear pricing and strong local reviews" },
    Nightclub: { q: "Where should we go out on Saturday night for a birthday?", others: ["Competitor A", "Competitor B", "Competitor C"], why: "birthday packages, table booking and a late licence" },
    "Online store": { q: "Which online store is best for natural dog treats?", others: ["Competitor A", "Competitor B", "Competitor C"], why: "natural ingredients, fast delivery and detailed product pages" },
    "Limo service": { q: "Recommend a reliable limo service for the airport", others: ["Competitor A", "Competitor B", "Competitor C"], why: "fixed airport fares, live booking and consistent reviews" },
} as const;
type Ask = keyof typeof ASKS;
const NAMES = Object.keys(ASKS) as Ask[];
const ENGINES = [{ s: "openai", n: "ChatGPT" }, { s: "googlegemini", n: "Gemini" }, { s: "perplexity", n: "Perplexity" }];
const SIGNALS = [
    { id: "pages", l: "Answer-first service pages", n: "Clear answers AI can quote" },
    { id: "schema", l: "Structured data", n: "Who you are, in machine language" },
    { id: "proof", l: "Reviews and mentions", n: "Trusted sources that name you" },
    { id: "access", l: "AI crawler access", n: "Nothing blocks the door" },
];

/** Switch on the signals and watch the assistant's answer change from competitors to the visitor's business */
export default function AiDemo() {
    const biz = useBiz();
    const [ask, setAsk] = useState<Ask>("Nightclub");
    const [engine, setEngine] = useState(0);
    const [on, setOn] = useState<string[]>([]);
    const a = ASKS[ask];
    const named = on.length >= 3;
    const answer =
        on.length === 0
            ? `Popular options include ${a.others.join(", ")}. I could not find enough reliable information about ${biz}.`
            : on.length < 3
              ? `Popular options include ${a.others[0]} and ${a.others[1]}. ${biz} also comes up, but details are limited.`
              : `I would start with ${biz}. They stand out for ${a.why}. ${a.others[0]} is a solid alternative.`;

    // type the answer out; the key restarts it whenever the question or the answer changes
    const key = `${ask}|${engine}|${answer}`;
    const [typed, setTyped] = useState({ key: "", n: 0 });
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let n = 0;
        const t = window.setInterval(() => {
            n += 2;
            setTyped({ key, n });
            if (n >= answer.length) window.clearInterval(t);
        }, 18);
        return () => window.clearInterval(t);
    }, [key, answer]);
    const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shown = still ? answer : answer.slice(0, typed.key === key ? typed.n : 0);
    const parts = shown.split(biz);

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
            <div className="flex min-h-[520px] flex-col rounded-[32px] bg-ink p-[clamp(20px,2.6vw,44px)] text-off">
                <div className="flex flex-wrap items-center gap-2">
                    {ENGINES.map((e, i) => (
                        <button key={e.n} type="button" aria-pressed={i === engine} onClick={() => setEngine(i)} className={`flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${i === engine ? "bg-white text-navy" : "bg-white/10 hover:bg-white/20"}`}>
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-white"><Logo slug={e.s} size={16} /></span>{e.n}
                        </button>
                    ))}
                </div>
                <div className="mt-8 flex justify-end"><p key={ask} className="svc-pop max-w-[85%] rounded-[22px] rounded-br-md bg-white/10 px-5 py-4 text-[17px]">{a.q}</p></div>
                <div className="mt-6 flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white"><Logo slug={ENGINES[engine].s} size={22} /></span>
                    <p className="min-h-[5.4em] pt-1 text-[clamp(20px,1.9vw,32px)] font-light leading-[1.32] tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }} aria-live="polite">
                        {parts.map((p, i) => (
                            <span key={i}>
                                {p}
                                {i < parts.length - 1 && <mark className={`rounded-md px-1.5 font-medium transition-colors duration-500 ${named ? "bg-lemon text-navy" : "bg-white/15 text-off"}`}>{biz}</mark>}
                            </span>
                        ))}
                        <span className="svc-caret" />
                    </p>
                </div>
                <div className="mt-auto pt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-glacier-3">Sources the answer leans on</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {SIGNALS.map((s) => {
                            const lit = on.includes(s.id);
                            return <span key={s.id} className={`rounded-xl px-4 py-2.5 text-sm transition-all duration-500 ${lit ? "bg-white text-navy" : "bg-white/5 text-glacier-3 line-through decoration-1"}`}>{s.id === "proof" ? "Reviews about " + biz : s.id === "pages" ? biz + " service page" : s.id === "schema" ? "Business profile data" : "Fresh site crawl"}</span>;
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 rounded-[28px] bg-glacier-2 p-[clamp(18px,1.8vw,28px)]">
                <p className="text-sm font-semibold">1. Choose what people ask</p>
                <Chips items={NAMES} value={ask} onChange={setAsk} label="Type of question" />
                <p className="mt-4 text-sm font-semibold">2. Switch on what we build</p>
                {SIGNALS.map((s) => <Toggle key={s.id} on={on.includes(s.id)} onChange={(v) => setOn((o) => (v ? [...o, s.id] : o.filter((x) => x !== s.id)))} label={s.l} note={s.n} />)}
                <p className="mt-auto pt-4 text-[15px] font-medium">{named ? "You are the answer." : `${3 - on.length} more to become the answer.`}</p>
            </div>
        </div>
    );
}
