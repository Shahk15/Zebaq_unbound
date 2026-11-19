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
    slug: "utopia-lounge",
    title: "Utopia Lounge Atlanta",
    text: "A premium restaurant and nightlife website designed to showcase dining, cocktails, and reservations.",
    href: "/work/utopia-lounge",
    media: {
      type: "image",
      src: "/images/work/utopia-lounge.png",
      alt: "Utopia Lounge website displayed on a smartphone",
    },
  },
  {
    slug: "medusa-atl",
    title: "Medusa ATL",
    text: "A luxury restaurant, bar, and lounge website featuring bold gold branding and an immersive visual experience.",
    href: "/work/medusa-atl",
    media: {
      type: "image",
      src: "/images/work/medusa-atl.png",
      alt: "Medusa ATL website displayed on a tablet",
    },
  },
  {
    slug: "a-best-insurance",
    title: "A-Best Insurance",
    text: "A professional insurance website highlighting affordable coverage for cars, homes, businesses, and taxis.",
    href: "/work/a-best-insurance",
    media: {
      type: "image",
      src: "/images/work/a-best-insurance.png",
      alt: "A-Best Insurance website displayed on a laptop",
    },
  },
  {
    slug: "chicos-choice-dogs",
    title: "Chico's Choice Dogs",
    text: "A clean e-commerce experience showcasing natural dog treats and pet products.",
    href: "/work/chicos-choice-dogs",
    media: {
      type: "image",
      src: "/images/work/chicos-choice-dogs.png",
      alt: "Chico's Choice Dogs website displayed on a tablet",
    },
  },
];