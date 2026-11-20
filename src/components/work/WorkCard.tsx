
import { useRef } from "react";
import type { WorkItem } from "../../data/work";

type Props = {
    item: WorkItem;
    view: "grid" | "list";
};

function ArrowIcon() {
    return (
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
            <path d="M7 17L17 7M9 7h8v8" />
        </svg>
    );
}

export default function ServiceCard({ item, view }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const playVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        video.play().catch(() => { });
    };

    const stopVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.currentTime = 0;
    };

    const videoElement = item.video ? (
        <video
            ref={videoRef}
            src={item.video}
            poster={item.image}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
    ) : null;

    const hoverEvents = {
        onPointerEnter: playVideo,
        onPointerLeave: stopVideo,
        onFocus: playVideo,
        onBlur: stopVideo,
    };

    /* ---------- List view ---------- */
    if (view === "list") {
        return (
            <li className="svc-card border-t border-navy/10 last:border-b">
                <a
                    href={item.href}
                    data-cursor="View"
                    {...hoverEvents}
                    className="group grid grid-cols-[88px_1fr_auto] items-center gap-4 py-5 md:grid-cols-[150px_1fr_auto_48px] md:gap-8"
                >
                    <span
                        className="relative block aspect-[4/3] overflow-hidden rounded-xl"
                        style={{ backgroundColor: item.surface }}
                    >
                        <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            draggable={false}
                            className="h-full w-full object-cover"
                        />
                        {videoElement}
                    </span>

                    <span className="min-w-0">
                        <span className="block text-[clamp(21px,2.4vw,36px)] font-medium leading-[1.1] tracking-[-0.03em]">
                            {item.title}
                        </span>
                        <span className="mt-2 block text-sm text-navy-2">
                            {item.year}
                        </span>
                    </span>

                    <span className="hidden flex-wrap justify-end gap-2 md:flex">
                        {item.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="whitespace-nowrap rounded-full border border-navy/15 px-3.5 py-1.5 text-[13px] text-navy-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </span>

                    <span className="grid h-11 w-11 place-items-center justify-self-end rounded-full border border-navy/20 transition-colors duration-300 group-hover:border-lemon group-hover:bg-lemon">
                        <ArrowIcon />
                    </span>
                </a>
            </li>
        );
    }

    /* ---------- Grid view ---------- */
    return (
        <li className="svc-card">
            <a
                href={item.href}
                data-cursor="View"
                {...hoverEvents}
                className="group block"
            >
                {/* Image frame */}
                <div
                    className="relative aspect-[4/3] overflow-hidden rounded-[26px] p-[7%]"
                    style={{ backgroundColor: item.surface }}
                >
                    {/* Website preview */}
                    <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-white shadow-[0_18px_45px_-25px_rgba(10,31,68,0.35)]">
                        <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            draggable={false}
                            className="h-full w-full object-cover"
                        />

                        {videoElement}
                    </div>

                    {/* Small yellow view indicator */}
                    <span className="absolute bottom-[10%] right-[10%] grid h-10 w-10 place-items-center rounded-full bg-lemon text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <ArrowIcon />
                    </span>
                </div>

                {/* Card information */}
                <div className="mt-5 flex items-center justify-between gap-4">
                    <h3 className="min-w-0 text-[clamp(21px,2vw,30px)] font-medium leading-[1.1] tracking-[-0.03em]">
                        {item.title}
                        <span className="text-navy-2/60">
                            {" "}— {item.year}
                        </span>
                    </h3>

                    <span className="hidden shrink-0 flex-wrap justify-end gap-2 sm:flex">
                        {item.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="whitespace-nowrap rounded-full border border-navy/15 px-3.5 py-1.5 text-[13px] text-navy-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </span>
                </div>
            </a>
        </li>
    );
}
