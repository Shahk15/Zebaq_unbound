export type Member = {
    name: string;
    role: string;
    bio?: string;
    // Photo: put it in public/images/team/ and write "/images/team/name.jpg". Leave empty to show initials.
    photo?: string;
    // Full LinkedIn profile link. The logo always shows; it becomes a link once this is filled.
    linkedin?: string;
    // Which part of the photo stays visible: "50% 0%" = top (default), "50% 50%" = centre, "50% 100%" = bottom.
    focus?: string;
};

export const TEAM_HERO = {
    eyebrow: "Our team",
    line1: "Meet the people",
    line2: "doing the work",
    text: "Get to know the people who lead strategy, manage delivery and review the work before it reaches you.",
};

export const LEADER_GROUP = {
    label: "Leadership",
    title: "Strategy and delivery leadership",
};

// Replace the placeholder names and photos.
export const LEADERS: Member[] = [
    { name: "Shahbaz Khan", role: "CEO & DIRECTOR", bio: "Leads ZEBAQ’s business strategy and accountable growth partnerships. Works with clients to connect priorities, delivery and the next commercial decision.", photo: "/images/teams/ceo-1.jpg", linkedin: "https://www.linkedin.com/in/shabaz" },
    { name: "Priyanka Priyadarshani Acharya", role: "CEO", bio: "Leads strategy and operational direction across client engagements. Reviews priorities, delivery standards and the experience clients receive.", photo: "/images/teams/ceo-2.jpg", linkedin: "https://www.linkedin.com/in/priyanka" },
];

export const TEAM_GROUP = {
    label: "Team members",
    title: "The people who run every service",
};

// Replace the placeholder names and photos. Add as many members as you like: 5 per row on desktop.
export const TEAM: Member[] = [
    { name: "Nafis Ahmad Khan", role: "Developer", bio: "Builds and maintains web experiences, integrations and technical delivery.", photo: "/images/teams/nafis.png", linkedin: "https://www.linkedin.com/in/nafiskhan-67-" },
    { name: "Anubhab Das", role: "Developer", bio: "Develops responsive websites and digital tools for client workflows.", photo: "/images/teams/anubhav.jpeg", linkedin: "https://www.linkedin.com/in/" },
    { name: "Mahabir Prasad Acharya", role: "SEO (Team Leader)", bio: "Leads SEO direction, technical priorities and search reporting across engagements.", photo: "/images/teams/mahaveer.png", linkedin: "" },
    { name: "Soumit Nayak", role: "SEO", bio: "Supports search audits, on-page improvements and measurable visibility work.", photo: "/images/teams/soumit.jpeg", linkedin: "" },
    { name: "Payal Bisoi", role: "Lead Generation", bio: "Researches prospects, manages outreach context and supports qualified conversation handoffs.", photo: "/images/teams/payal.jpeg", linkedin: "" },
    { name: "Prajna Manjari Sahu", role: "Graphic Designer", bio: "Creates visual assets and campaign design aligned with each client’s brand.", photo: "/images/teams/pihu.jpeg", linkedin: "" },
];