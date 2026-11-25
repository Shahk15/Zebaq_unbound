import { SITE } from "./home/site";

export const CAREERS_HERO = {
    eyebrow: "Careers at Zebaq",
    line1: "Build your career",
    line2: "at Zebaq.",
    text: "Work with a team that plans, builds and improves campaigns, content and digital experiences for clients across industries.",
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
        responsibilities: ["Research priority searches and technical opportunities.", "Plan and review SEO execution with the delivery team.", "Report progress against agreed organic and business measures."],
        qualifications: ["Practical SEO and analytics experience.", "Clear written and technical communication.", "Ability to manage priorities across active projects."],
    },
    {
        title: "Full Stack Developer",
        department: "Technology",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Build fast, accessible web experiences and dependable tools for businesses across industries.",
        responsibilities: ["Build responsive websites and integrated applications.", "Test accessibility, performance and reliability.", "Document and hand over work clearly."],
        qualifications: ["Strong web development fundamentals.", "Experience with modern front-end and back-end workflows.", "Careful testing and problem-solving habits."],
    },
    {
        title: "Graphic Designer",
        department: "Creative",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Turn brand ideas into clear, distinctive visuals across digital and campaign touchpoints.",
        responsibilities: ["Create approved digital and campaign assets.", "Develop concepts for web, social and presentation use.", "Prepare final files for handover."],
        qualifications: ["A portfolio of practical design work.", "Strong layout, typography and brand consistency.", "Ability to revise work against clear feedback."],
    },
    {
        title: "Lead Generation Executive",
        department: "Growth",
        location: "Bhubaneswar / Hybrid",
        type: "Full-time",
        summary: "Build researched prospect lists and help turn the right conversations into qualified opportunities.",
        responsibilities: ["Research target accounts and decision-makers.", "Support approved outreach and reply qualification.", "Record handoffs and agreed lead details."],
        qualifications: ["Research and structured-data habits.", "Clear professional written communication.", "Comfort managing prospect records and follow-ups."],
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
