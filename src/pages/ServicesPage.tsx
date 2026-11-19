
import { useMemo, useState } from "react";

import Header from "../components/layout/Header";
import ServiceCard from "../components/services/ServiceCard";
import { Split } from "../components/common/ui";
import {
    PAGE_COPY,
    SERVICE_FILTERS,
    SERVICE_ITEMS,
} from "../data/services/index.ts";

const INITIAL = 6;
const STEP = 4;

type View = "grid" | "list";

export default function ServicesPage() {
    const [filter, setFilter] =
        useState<(typeof SERVICE_FILTERS)[number]>("All");

    const [view, setView] = useState<View>("grid");
    const [shown, setShown] = useState(INITIAL);

    const list = useMemo(
        () =>
            filter === "All"
                ? SERVICE_ITEMS
                : SERVICE_ITEMS.filter((item) => item.category === filter),
        [filter]
    );

    const visible = list.slice(0, shown);
    const remaining = Math.max(0, list.length - visible.length);

    const changeFilter = (
        nextFilter: (typeof SERVICE_FILTERS)[number]
    ) => {
        setFilter(nextFilter);
        setShown(INITIAL);
    };

    const goGrid = () => {
        document.querySelector("#svc-grid")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="min-h-screen bg-off text-navy">
            <Header />

            <main className="wrap pb-[clamp(80px,10vw,140px)]">
                {/* Page hero */}
                <section className="pt-[clamp(130px,17vw,230px)] text-center">
                    <p className="eyebrow text-navy-2">
                        {PAGE_COPY.eyebrow}
                    </p>

                    <h1 className="t-xl mx-auto mt-8 max-w-[18ch]">
                        <Split text={PAGE_COPY.titleLine1} />
                        <br />
                        <Split text={PAGE_COPY.titleLine2} dot />
                    </h1>

                    <p className="mx-auto mt-8 max-w-[520px] text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-navy-2">
                        {PAGE_COPY.sub}
                    </p>

                    <button
                        type="button"
                        onClick={goGrid}
                        aria-label="Scroll to services"
                        className="mt-10 grid h-11 w-11 place-items-center rounded-full bg-ink text-off transition-colors duration-300 hover:bg-lemon hover:text-navy"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 5v14M6 13l6 6 6-6" />
                        </svg>
                    </button>
                </section>

                {/* Toolbar */}
                <section className="mt-[clamp(70px,9vw,130px)]">
                    <div className="flex items-center justify-between gap-4">
                        <p className="flex items-center gap-3 text-sm text-navy">
                            <span className="h-1.5 w-1.5 rounded-full bg-lemon-deep" />
                            {PAGE_COPY.label}
                        </p>

                        {/* Grid / List toggle */}
                        <div
                            className="flex gap-2"
                            role="group"
                            aria-label="View"
                        >
                            {(["grid", "list"] as View[]).map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setView(item)}
                                    aria-pressed={view === item}
                                    aria-label={`${item} view`}
                                    className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors duration-300 ${view === item
                                            ? "border-ink bg-ink text-off"
                                            : "border-navy/15 text-navy hover:border-navy/40"
                                        }`}
                                >
                                    {item === "grid" ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="18"
                                            height="18"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            aria-hidden="true"
                                        >
                                            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
                                            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
                                            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
                                            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="18"
                                            height="18"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M5 7h14M5 12h14M5 17h14" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category filters */}
                    <div
                        className="mt-8 flex flex-wrap gap-2"
                        role="tablist"
                        aria-label="Filter services"
                    >
                        {SERVICE_FILTERS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                role="tab"
                                aria-selected={filter === item}
                                onClick={() => changeFilter(item)}
                                className={`rounded-full px-5 py-2.5 text-[15px] transition-colors duration-300 ${filter === item
                                        ? "bg-glacier/30 text-navy"
                                        : "text-navy-2 hover:bg-glacier/15 hover:text-navy"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Services */}
                <section
                    id="svc-grid"
                    className="mt-[clamp(40px,5vw,72px)] scroll-mt-24"
                >
                    <ul
                        className={
                            view === "grid"
                                ? "grid gap-x-[clamp(16px,2vw,28px)] gap-y-[clamp(36px,4vw,64px)] sm:grid-cols-2"
                                : "flex flex-col"
                        }
                    >
                        {visible.map((item) => (
                            <ServiceCard
                                key={item.slug}
                                item={item}
                                view={view}
                            />
                        ))}
                    </ul>

                    {/* Show more */}
                    {remaining > 0 && (
                        <div className="mt-[clamp(48px,6vw,88px)] text-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setShown((current) =>
                                        Math.min(current + STEP, list.length)
                                    )
                                }
                                className="rounded-full bg-ink px-8 py-4 text-sm font-medium text-off transition-colors duration-300 hover:bg-lemon hover:text-navy"
                            >
                                Show more
                                <span className="ml-2 opacity-60">
                                    ({remaining})
                                </span>
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
