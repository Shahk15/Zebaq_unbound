import { useId, type ReactNode } from "react";
import { Arrow, Split } from "../common/ui";
import { PLATFORM_NAMES } from "../../data/services/platforms";
import { setBusinessName, useVisitor } from "./store";
import { photo } from "./util";

/** Main call to action. Same pill as the rest of the site. */
export function Cta({ href = "#book", children, tone = "lemon", className = "", onClick }: { href?: string; children: ReactNode; tone?: "lemon" | "navy" | "light" | "ghost"; className?: string; onClick?: () => void }) {
    return (
        <a href={href} onClick={onClick} className={`pill pill-${tone} max-w-full ${className}`}>
            {children}
            <span className="pill-ic shrink-0"><Arrow size={16} /></span>
        </a>
    );
}

export function Heading({ eyebrow, title, text, dark, action }: { eyebrow: string; title: string; text?: string; dark?: boolean; action?: ReactNode }) {
    return (
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
                <p className={`eyebrow ${dark ? "text-glacier-3" : "text-navy-2"}`} data-reveal>{eyebrow}</p>
                <h2 className="t-l mt-6 max-w-[16ch]"><Split text={title} dot /></h2>
            </div>
            {(text || action) && (
                <div className="max-w-md shrink-0 space-y-6">
                    {text && <p className={`text-lg leading-relaxed ${dark ? "text-glacier-2" : "text-navy-2"}`} data-reveal>{text}</p>}
                    {action && <div data-reveal>{action}</div>}
                </div>
            )}
        </div>
    );
}

/** Platform logo from /public/images/platforms, with a monogram when we have no file */
export function Logo({ slug, size = 24, className = "" }: { slug: string; size?: number; className?: string }) {
    const p = PLATFORM_NAMES[slug];
    if (!p || p.mono)
        return (
            <span className={`grid shrink-0 place-items-center rounded-md bg-navy font-bold text-white ${className}`} style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden="true">
                {(p?.name ?? slug).charAt(0).toUpperCase()}
            </span>
        );
    return <img src={`/images/platforms/${slug}.svg`} alt="" aria-hidden="true" width={size} height={size} loading="lazy" className={`shrink-0 ${className}`} style={{ width: size, height: size }} />;
}

/** "Type your business name": feeds every demo on every service page */
export function NameField({ dark, className = "" }: { dark?: boolean; className?: string }) {
    const { name } = useVisitor();
    const id = useId();
    return (
        <div className={className}>
            <label htmlFor={id} className={`block text-[11px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-glacier-3" : "text-navy-2"}`}>See it with your name</label>
            <input
                id={id}
                value={name}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Type your business name"
                autoComplete="organization"
                maxLength={32}
                className={`mt-2 w-full rounded-full border px-5 py-3 text-base font-medium outline-none transition-colors focus:border-lemon-deep ${dark ? "border-white/25 bg-ink/50 text-off placeholder:text-glacier-3 backdrop-blur" : "border-navy/15 bg-white text-navy placeholder:text-navy/45"}`}
            />
        </div>
    );
}

export function Range({ label, value, min, max, step = 1, onChange, show, dark }: { label: string; value: number; min: number; max: number; step?: number; onChange: (n: number) => void; show?: string; dark?: boolean }) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <label className="block">
            <span className={`flex items-baseline justify-between gap-4 text-sm ${dark ? "text-glacier-2" : "text-navy-2"}`}>
                {label}
                <span className={`shrink-0 text-base font-semibold tabular-nums ${dark ? "text-off" : "text-navy"}`}>{show ?? value}</span>
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                aria-valuetext={show}
                onChange={(e) => onChange(Number(e.target.value))}
                className="svc-range mt-3 w-full"
                style={{ background: `linear-gradient(90deg, var(--color-lemon-deep) ${pct}%, ${dark ? "rgb(255 255 255 / .18)" : "rgb(10 31 68 / .12)"} ${pct}%)` }}
            />
        </label>
    );
}

export function Toggle({ on, onChange, label, note, dark }: { on: boolean; onChange: (v: boolean) => void; label: string; note?: string; dark?: boolean }) {
    const off = dark ? "bg-white/10 text-off hover:bg-white/15" : "bg-white text-navy hover:bg-glacier-2";
    return (
        <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 ${on ? "bg-lemon text-navy" : off}`}>
            <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-navy" : dark ? "bg-white/25" : "bg-navy/20"}`}>
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${on ? "left-6" : "left-1"}`} />
            </span>
            <span className="min-w-0">
                <span className="block text-[15px] font-semibold leading-tight">{label}</span>
                {note && <span className="mt-0.5 block text-[13px] leading-snug opacity-75">{note}</span>}
            </span>
        </button>
    );
}

export function Chips<T extends string>({ items, value, onChange, dark, label }: { items: readonly T[]; value: T; onChange: (v: T) => void; dark?: boolean; label: string }) {
    const onCls = dark ? "bg-lemon text-navy" : "bg-navy text-off";
    const offCls = dark ? "bg-white/10 text-off hover:bg-white/20" : "bg-white text-navy hover:bg-glacier-2";
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {items.map((t) => (
                <button key={t} type="button" aria-pressed={t === value} onClick={() => onChange(t)} className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${t === value ? onCls : offCls}`}>
                    {t}
                </button>
            ))}
        </div>
    );
}

/** Phone frame used by the chat and social demos */
export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`relative mx-auto w-full max-w-[300px] rounded-[42px] bg-ink p-2.5 shadow-[0_50px_90px_-40px_rgba(7,22,49,.7)] ${className}`}>
            <div className="relative h-full overflow-hidden rounded-[33px] bg-white text-navy">
                <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
                {children}
            </div>
        </div>
    );
}

export function Photo({ name, className = "", alt = "" }: { name: string; className?: string; alt?: string }) {
    return <img src={photo(name)} alt={alt} loading="lazy" draggable={false} className={`h-full w-full object-cover ${className}`} />;
}

export function Note({ children, dark, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
    return <p className={`text-[13px] leading-snug ${dark ? "text-glacier-3" : "text-navy-2"} ${className}`}>{children}</p>;
}
