import { useEffect, useRef, type ReactNode } from "react";
import Header from "./Header";
import { useSiteMotion } from "../../hooks/useSiteMotion";

// Shared frame for every service page: header, page colour and the common scroll motion
export default function ServiceLayout({ children }: { children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null);

    useSiteMotion(root);

    // Page body colour for this route only
    useEffect(() => {
        const prev = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "var(--color-off, #f7f6f1)";
        return () => {
            document.body.style.backgroundColor = prev;
        };
    }, []);

    return (
        <div ref={root} className="bg-off">
            <Header />
            <main>{children}</main>
        </div>
    );
}