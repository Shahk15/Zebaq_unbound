const Unsplash = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format`;

export const IMAGES = {
  horse: "/v2/horse-hero-kintsugi.webp",
  horseSeams: "/v2/horse-hero-gold.webp",
  horsePristine: "/v2/horse-pristine.webp",
  horseCracked: "/v2/horse-cracked.webp",
  broken: Unsplash("photo-1649307008469-2cf0dfe23134", 1200),
  perfected: Unsplash("photo-1705921321311-e92e80ac8e59", 1200),
  ai: Unsplash("photo-1694903062502-6df8204136af", 2200),
  kintsugi: Unsplash("photo-1637666505754-7416ebd70cbf", 1400),
};
