import { SITE } from "./home/site";

export const CAREERS_HERO = {
    eyebrow: "Careers at Zebaq",
    line1: "Do work that",
    line2: "moves businesses.",
    text: "Join a curious team of strategists, designers, developers and growth specialists building useful work for companies around the world.",
    primary: { label: "Explore open roles", href: "#open-roles" },
    secondary: { label: "Meet the team", href: "/team" },
};

export const CAREER_VALUES = [
    { n: "01", title: "Own the outcome", text: "Take responsibility for the result, the details and the decisions behind the work." },
    { n: "02", title: "Learn in the open", text: "Ask questions, share what you discover and help the whole team get better." },
    { n: "03", title: "Stay close to craft", text: "Care about the final experience, whether it is a campaign, a line of code or a strategy." },
];

export const OPEN_ROLES = [
    {
        title: "SEO Specialist",
        department: "Growth",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Own research, technical direction and measurable organic growth for client projects.",
    },
    {
        title: "Full Stack Developer",
        department: "Technology",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Build fast, accessible web experiences and dependable tools for businesses across industries.",
    },
    {
        title: "Graphic Designer",
        department: "Creative",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Turn brand ideas into clear, distinctive visuals across digital and campaign touchpoints.",
    },
    {
        title: "Lead Generation Executive",
        department: "Growth",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Build researched prospect lists and help turn the right conversations into qualified opportunities.",
    },
];

export const CAREERS_FAQ = [
    {
        q: "Do you hire remotely?",
        a: "Yes. Depending on the role, we support a remote or hybrid arrangement. Location and collaboration details are listed with each open position.",
    },
    {
        q: "What should I include in my application?",
        a: "Send your resume, a short introduction and any portfolio or work samples relevant to the role.",
    },
    {
        q: "How long does the hiring process take?",
        a: "The process usually starts with a short introductory call, followed by a focused conversation or practical assessment for the role.",
    },
];

export const CAREERS_EMAIL = `mailto:${SITE.email}?subject=Career%20application%20at%20Zebaq`;
