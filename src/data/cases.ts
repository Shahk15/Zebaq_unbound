export type CaseMedia = {
    type: "image" | "video";
    src: string;      // image path, or video path (mp4 / webm)
    poster?: string;  // video only: image shown before the video loads
    alt?: string;
};

export type CaseStudy = {
    slug: string;
    title: string;
    text: string;
    href: string;
    // "light": light card, dark text.  "dark": dark card, white text.
    // If you leave it out: no media = light, with media = dark.
    theme?: "light" | "dark";
    // Card background image or video. Leave it out and the card is a plain light card.
    // Example: media: { type: "image", src: "/images/work/case-01.jpg" }
    //          media: { type: "video", src: "/videos/case-01.mp4" }
    media?: CaseMedia;
};

export const CASES: CaseStudy[] = [
    {
        slug: "case-01",
        title: "Project title goes here",
        text: "Write a short line about this project and its result.",
        href: "/work/case-01",
        media: { type: "image", src: "/images/work/case1.png", alt: "Case 1" },
    },
    {
        slug: "case-02",
        title: "Project title goes here",
        text: "Write a short line about this project and its result.",
        href: "/work/case-02",
        media: { type: "image", src: "/images/work/case4.avif", alt: "Case 2" },
    },
    {
        slug: "case-03",
        title: "Project title goes here",
        text: "Write a short line about this project and its result.",
        href: "/work/case-03",
        media: { type: "image", src: "/images/work/case3.avif", alt: "Case 3" },
    },
    {
        slug: "case-04",
        title: "Project title goes here",
        text: "Write a short line about this project and its result.",
        href: "/work/case-04",
        media: { type: "image", src: "/images/work/case2.png", alt: "Case 4" },
    },
];