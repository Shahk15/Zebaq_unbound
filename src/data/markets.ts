
// Country flags from FlagCDN.
// To self-host, download flags into public/images/flags/
// and change flagSrc() to return `/images/flags/${code}.png`.

export const flagSrc = (
    code: string,
    width: 80 | 160 | 320 | 640 = 640
) => `https://flagcdn.com/w${width}/${code}.png`;

export type Market = {
    code: string;
    name: string;
    region: string;
};

// Markets displayed in the animated flag wall.
export const MARKETS: Record<string, Market> = {
    us: { code: "us", name: "United States", region: "North America" },
    ca: { code: "ca", name: "Canada", region: "North America" },
    gb: { code: "gb", name: "United Kingdom", region: "Europe" },
    eu: { code: "eu", name: "Europe", region: "European Union" },
    ae: { code: "ae", name: "UAE", region: "Middle East" },
    in: { code: "in", name: "India", region: "South Asia" },
    au: { code: "au", name: "Australia", region: "Oceania" },
    nz: { code: "nz", name: "New Zealand", region: "Oceania" },
};

// Three columns of the flag wall.
// Australia and New Zealand each have their own cards.
export const WALL_COLUMNS: string[][] = [
    ["us", "gb", "in"],
    ["ca", "ae", "au"],
    ["eu", "nz", "us"],
];

// Market chips displayed beneath the impact metrics.
export const MARKET_CHIPS: {
    label: string;
    codes: string[];
}[] = [
        { label: "USA", codes: ["us"] },
        { label: "Canada", codes: ["ca"] },
        { label: "UK", codes: ["gb"] },
        { label: "Europe", codes: ["eu"] },
        { label: "UAE", codes: ["ae"] },
        { label: "India", codes: ["in"] },
        { label: "Australia & NZ", codes: ["au", "nz"] },
    ];

// Impact statistics.
// Verify all figures before publishing.
export const IMPACT_STATS = [
    {
        value: 150,
        suffix: "+",
        label: "Verified businesses served",
        text: "Businesses supported with digital strategy, technology and growth.",
    },
    {
        value: 320,
        suffix: "+",
        label: "Projects delivered",
        text: "Digital experiences, campaigns and solutions brought to life.",
    },
    {
        value: 8,
        suffix: "+",
        label: "Years of experience",
        text: "Experience combining strategy, creativity and technology.",
    },
];
