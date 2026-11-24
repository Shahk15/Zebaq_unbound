export type Member = {
    name: string;
    role: string;
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
    line2: "behind ZEBAQ",
    text: "Strategists, builders and growth specialists, working as one team for your business.",
};

export const LEADER_GROUP = {
    label: "Leadership",
    title: "The people steering ZEBAQ",
};

// Replace the placeholder names and photos.
export const LEADERS: Member[] = [
    { name: "Shahbaz Khan", role: "CEO & DIRECTOR", photo: "/images/teams/ceo-1.jpg", linkedin: "https://www.linkedin.com/in/shabaz" },
    { name: "Priyanka Priyadarshani Acharya", role: "CEO", photo: "/images/teams/ceo-2.jpg", linkedin: "https://www.linkedin.com/in/priyanka" },
];

export const TEAM_GROUP = {
    label: "Team members",
    title: "The people who run every service",
};

// Replace the placeholder names and photos. Add as many members as you like: 5 per row on desktop.
export const TEAM: Member[] = [
    { name: "Nafis Ahmad Khan", role: "Developer", photo: "/images/teams/nafis.png", linkedin: "https://www.linkedin.com/in/nafiskhan-67-" },
    { name: "Anubhab Das", role: "Developer", photo: "/images/teams/anubhav.jpeg", linkedin: "https://www.linkedin.com/in/" },
    { name: "Mahabir Prasad Acharya", role: "SEO (Team Leader)", photo: "/images/teams/mahaveer.png", linkedin: "" },
    { name: "Soumit Nayak", role: "SEO", photo: "/images/teams/soumit.jpeg", linkedin: "" },
    { name: "Payal Bisoi", role: "Lead Generation", photo: "/images/teams/payal.jpeg", linkedin: "" },
    { name: "Prajna Manjari Sahu", role: "Graphic Designer", photo: "/images/teams/pihu.jpeg", linkedin: "" },
];