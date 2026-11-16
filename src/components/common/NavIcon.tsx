import type { ReactNode } from "react";
import type { IconName } from "../../data/navigation";

const ICONS: Record<IconName, ReactNode> = {
    home: (
        <>
            <path d="M3 11l9-7 9 7" />
            <path d="M5 10v10h14V10" />
            <path d="M10 20v-6h4v6" />
        </>
    ),
    grid: (
        <>
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <rect x="13" y="4" width="7" height="7" rx="1.5" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </>
    ),
    company: (
        <>
            <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
            <path d="M15 10h4a1 1 0 0 1 1 1v10" />
            <path d="M3 21h18" />
            <path d="M8 8h3M8 12h3M8 16h3" />
        </>
    ),
    team: (
        <>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            <circle cx="17" cy="9" r="2.4" />
            <path d="M16.5 14.2c2.6.2 4.5 2.3 4.5 5.8" />
        </>
    ),
    careers: (
        <>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <path d="M3 13h18" />
        </>
    ),
    blog: (
        <>
            <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
            <path d="M14 3v5h5" />
            <path d="M8.5 13h7M8.5 17h5" />
        </>
    ),
    case: (
        <>
            <path d="M4 20v-7M10 20V5M16 20v-10" />
            <path d="M2 20h20" />
        </>
    ),
    // Search with a sparkle inside (AI search)
    search: (
        <>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5L21 21" />
            <path d="M10.5 7.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
        </>
    ),
    // Paper plane (outreach)
    send: (
        <>
            <path d="M21 3L3 10.5l7 3 3 7L21 3z" />
            <path d="M21 3L10 13.5" />
        </>
    ),
    code: (
        <>
            <path d="M8 8l-5 4 5 4" />
            <path d="M16 8l5 4-5 4" />
            <path d="M14 5l-4 14" />
        </>
    ),
    trend: (
        <>
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
        </>
    ),
    share: (
        <>
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="18" cy="18" r="2.5" />
            <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
        </>
    ),
    video: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" />
        </>
    ),
    bot: (
        <>
            <rect x="5" y="8" width="14" height="11" rx="3" />
            <path d="M12 8V5" />
            <circle cx="12" cy="3.8" r="1.1" />
            <circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none" />
            <path d="M9.5 16.2h5" />
        </>
    ),
    funnel: <path d="M3 4h18l-7 8.5V19l-4 2v-8.5L3 4z" />,
    headset: (
        <>
            <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
            <rect x="3" y="14" width="4" height="6" rx="1.5" />
            <rect x="17" y="14" width="4" height="6" rx="1.5" />
        </>
    ),
};

type NavIconProps = {
    name: IconName;
    className?: string;
};

export default function NavIcon({ name, className = "h-5 w-5" }: NavIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {ICONS[name]}
        </svg>
    );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
    );
}

// Used by the mobile accordion (rotates 45deg into a cross when open)
export function Plus({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}