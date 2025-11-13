'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Tabs {
    id: string;
    label: string;
    href: string;
}

interface SettingsNavigationProps {
    tabs: Tabs[];
}

export function SettingsNavigation({ tabs }: SettingsNavigationProps) {
    const pathname = usePathname();
    const [search, setSearch] = useState('');

    const filteredTabs = tabs.filter(tab =>
        tab.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <nav className="space-y-1">
            <h2 className="text-lg font-semibold">Settings</h2>
            <div className="mb-4 mt-6">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full"
                />
            </div>
            {filteredTabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Button
                        key={tab.id}
                        variant="ghost"
                        asChild
                        className={`w-full justify-start font-normal transition-colors ${isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }`}
                    >
                        <Link href={tab.href}>
                            {tab.label}
                        </Link>
                    </Button>
                );
            })}
            {filteredTabs.length === 0 && search && (
                <p className="text-sm text-muted-foreground text-center py-2">
                    No tabs found matching &quot;{search}&quot;
                </p>
            )}
        </nav>
    );
}