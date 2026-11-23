export type VideoItem = {
  name: string;
  company: string;
  caption: string;
  // Video file: put it in public/videos/ and write "/videos/name.mp4", or use a full https:// link.
  // This one also plays as a muted preview when the card is hovered.
  src?: string;
  // Or a YouTube link (watch, youtu.be or shorts) or just the 11 character video id.
  youtube?: string;
  // Card picture shown before hover (public/images/videos/name.jpg). Optional.
  poster?: string;
};

// Replace the placeholder entries with real clients.
export const VIDEOS: VideoItem[] = [
  {
    name: "Client name",
    company: "Company",
    caption: "How ZEBAQ helped us…",
    src: "",
    poster: "",
  },
  {
    name: "Client name",
    company: "Company",
    caption: "What changed after working together…",
    youtube: "",
    poster: "",
  },
  {
    name: "Client name",
    company: "Company",
    caption: "Why we'd recommend ZEBAQ…",
    src: "",
    poster: "",
  },
];  