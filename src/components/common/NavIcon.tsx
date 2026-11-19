import {
    ArrowRight as ArrowRightIcon,
    BookOpen,
    Bot,
    Briefcase,
    Building2,
    Code,
    FolderOpen,
    Headset,
    House,
    LayoutGrid,
    ListFilter,
    Plus as PlusIcon,
    Search,
    Send,
    Share2,
    TrendingUp,
    Users,
    Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconName } from "../../data/navigation";

const ICONS: Record<IconName, LucideIcon> = {
    home: House,
    grid: LayoutGrid,
    company: Building2,
    team: Users,
    careers: Briefcase,
    blog: BookOpen,
    case: FolderOpen,
    search: Search,
    send: Send,
    code: Code,
    trend: TrendingUp,
    share: Share2,
    video: Video,
    bot: Bot,
    funnel: ListFilter,
    headset: Headset,
};

type IconProps = { className?: string };

export default function NavIcon({ name, className }: IconProps & { name: IconName }) {
    const Icon = ICONS[name];
    return <Icon className={className} strokeWidth={1.8} aria-hidden="true" />;
}

export function ArrowRight({ className }: IconProps) {
    return <ArrowRightIcon className={className} strokeWidth={1.8} aria-hidden="true" />;
}

export function Plus({ className }: IconProps) {
    return <PlusIcon className={className} strokeWidth={1.8} aria-hidden="true" />;
}