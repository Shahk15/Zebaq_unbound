
import { gsap } from "gsap";

export function createIntroExit(
    element: HTMLElement,
    onComplete: () => void
) {
    return gsap.to(element, {
        yPercent: -100,
        duration: 1,
        delay: 0.8,
        ease: "power4.inOut",
        onComplete,
    });
}
