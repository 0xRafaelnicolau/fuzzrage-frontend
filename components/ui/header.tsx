"use client";

import { Icon } from "@/components/ui/Icon";
import { User } from "@/lib/actions/user";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/ui/user-menu";
import Link from "next/link";
import { HeaderBreadcrumbs } from "@/components/ui/header-breadcrumbs";

export interface Tab {
    id: string;
    label: string;
    href: string;
}

interface HeaderProps {
    user: User;
    tabs: Tab[];
    projectName?: string;
    campaignName?: string;
}

export function Header({ user, tabs, projectName, campaignName }: HeaderProps) {
    const pathname = usePathname();

    const activeTab = tabs
        .filter(t => pathname.startsWith(t.href + '/') || pathname === t.href)
        .sort((a, b) => b.href.length - a.href.length)[0];

    return (
        <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
            <div className="flex justify-between items-center container mx-auto p-2">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Link
                        href="/"
                        title="brand-logo"
                        className="relative mr-2 flex items-center space-x-2 flex-shrink-0"
                    >
                        <Icon className="w-auto" />
                    </Link>
                    <div className="hidden md:block flex-1 min-w-0">
                        <HeaderBreadcrumbs
                            projectName={projectName}
                            campaignName={campaignName}
                        />
                    </div>
                </div>
                <div className="px-2 hidden lg:block">
                    <UserMenu user={user} />
                </div>
                <div className="px-2 cursor-pointer block lg:hidden">
                    <UserMenu user={user} />
                </div>
            </div>
            <nav
                className="flex gap-4 sm:gap-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide container mx-auto px-3.5 sm:px-5"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {tabs.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                        <Link
                            key={tab.id}
                            href={tab.href}
                            className={`py-2 px-2 sm:px-0 transition-colors border-b-2 ${isActive
                                ? 'border-foreground dark:border-primary font-normal'
                                : 'border-transparent font-normal text-muted-foreground hover:text-foreground hover:border-foreground dark:hover:border-primary'
                                }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </nav>
            <hr className="absolute w-full bottom-0" />
        </header>
    );
}

