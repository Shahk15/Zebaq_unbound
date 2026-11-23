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
      src: "/v2/utopia%2014.png",
      alt: "Utopia Lounge website mockup",
    },
  },
  {
    slug: "medusa-atl",
    title: "Medusa ATL",
    text: "A luxury restaurant, bar, and lounge website featuring bold gold branding and an immersive visual experience.",
    href: "/work/medusa-atl",
    media: {
      type: "image",
      src: "/v2/mock%20up%209.png",
      alt: "Medusa ATL website mockup",
    },
  },
  {
    slug: "a-best-insurance",
    title: "A-Best Insurance",
    text: "A professional insurance website highlighting affordable coverage for cars, homes, businesses, and taxis.",
    href: "/work/a-best-insurance",
    media: {
      type: "image",
      src: "/v2/mock%20up%2015.png",
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
      src: "/v2/mock%20up%2010.png",
      alt: "Chico's Choice Dogs website mockup",
    },
  },
  {
    slug: "destination-360",
    title: "Destination 360",
    text: "A hospitality experience showcasing sustainable stays and destination discovery.",
    href: "/work/destination-360",
    theme: "dark",
    media: {
      type: "image",
      src: "/v2/mock%20up%202.png",
      alt: "Destination 360 sustainable hospitality website displayed on a laptop",
    },
  },
  {
    slug: "royal-blessings",
    title: "Royal Blessings",
    text: "An elegant e-commerce experience for jewelry and occasion collections.",
    href: "/work/royal-blessings",
    theme: "light",
    media: {
      type: "image",
      src: "/v2/mock%20up%203.png",
      alt: "Royal Blessings jewelry storefront displayed on a tablet",
    },
  },
  {
    slug: "palm-residential",
    title: "Palm Residential",
    text: "A mobile-first residential experience for home services, repairs, and projects.",
    href: "/work/palm-residential",
    theme: "light",
    media: {
      type: "image",
      src: "/v2/mock%20up%204.png",
      alt: "Palm Residential home services website displayed on a phone",
    },
  },
  {
    slug: "dr-sanjay",
    title: "Dr. Sanjay",
    text: "A professional website experience for Dr. Sanjay.",
    href: "#contact",
    media: {
      type: "image",
      src: "/v2/mock%20up%2013.png",
      alt: "Dr. Sanjay website mockup",
    },
  },
  {
    slug: "austin-limo",
    title: "Austin Limo",
    text: "A polished website experience for Austin Limo.",
    href: "#contact",
    media: {
      type: "image",
      src: "/v2/mock%20up%2012.png",
      alt: "Austin Limo website mockup",
    },
  },
];