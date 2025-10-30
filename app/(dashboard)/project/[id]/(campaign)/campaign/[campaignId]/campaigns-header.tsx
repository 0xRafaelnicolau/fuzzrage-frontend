"use client";

import { Logo } from "@/components/ui/logo";
import { User } from "@/lib/actions/user";
import { useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/ui/user-menu";
import Link from "next/link";

interface CampaignsHeaderProps {
    user: User;
    projectId: string;
    campaignId: string;
}

interface Tab {
    id: string;
    label: string;
    href: string;
}

export function CampaignsHeader({ user, projectId, campaignId }: CampaignsHeaderProps) {
    const pathname = usePathname();

    const tabs: Tab[] = useMemo(() => [
        { id: 'overview', label: 'Overview', href: `/project/${projectId}/campaign/${campaignId}` },
        { id: 'properties', label: 'Properties', href: `/project/${projectId}/campaign/${campaignId}/properties` },
        { id: 'coverage', label: 'Coverage', href: `/project/${projectId}/campaign/${campaignId}/coverage` },
        { id: 'logs', label: 'Logs', href: `/project/${projectId}/campaign/${campaignId}/logs` },
    ], []);

    const activeTab = useMemo(() => {
        return tabs
            .filter(t => pathname.startsWith(t.href + '/') || pathname === t.href)
            .sort((a, b) => b.href.length - a.href.length)[0];
    }, [tabs, pathname]);

    const render = useCallback((tab: Tab) => {
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
    }, [activeTab]);

    return (
        <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
            <div className="flex justify-between items-center container mx-auto p-2">
                <Link
                    href="/"
                    title="brand-logo"
                    className="relative mr-6 flex items-center space-x-2"
                >
                    <Logo className="w-auto" />
                </Link>
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
                {tabs.map(render)}
            </nav>
            <hr className="absolute w-full bottom-0" />
        </header>
    );
}