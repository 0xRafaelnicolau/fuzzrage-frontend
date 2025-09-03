'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface Tab {
    id: string;
    label: string;
    href: string;
}

interface TabNavigationProps {
    tabs: Tab[];
}

export function TabNavigation({ tabs }: TabNavigationProps) {
    const pathname = usePathname();

    const activeTab = useMemo(() => {
        return tabs
            .filter(t => pathname.startsWith(t.href + '/') || pathname === t.href)
            .sort((a, b) => b.href.length - a.href.length)[0];
    }, [tabs, pathname]);

    const renderTab = useCallback((tab: Tab) => {
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
        <div className="sticky top-14 z-50 w-full border-b [border-color:var(--border-light)] dark:border-input bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav
                    className="flex gap-4 sm:gap-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {tabs.map(renderTab)}
                </nav>
            </div>
        </div>
    );
}
