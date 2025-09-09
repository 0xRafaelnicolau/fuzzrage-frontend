'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SideTabs {
    id: string;
    label: string;
    href: string;
}

interface SideNavigationProps {
    tabs: SideTabs[];
}

export function SettingsSideNavigation({ tabs }: SideNavigationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const filteredTabs = tabs.filter(tab =>
        tab.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const url = new URL(window.location.href);

        if (query) {
            url.searchParams.set('search', query);
        } else {
            url.searchParams.delete('search');
        }

        window.history.replaceState({}, '', url.toString());
    };

    return (
        <nav className="space-y-1">
            <h2 className="text-lg font-semibold">Settings</h2>
            <div className="mb-4 mt-6">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
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
            {filteredTabs.length === 0 && searchQuery && (
                <p className="text-sm text-muted-foreground text-center py-2">
                    No tabs found matching &quot;{searchQuery}&quot;
                </p>
            )}
        </nav>
    );
}
