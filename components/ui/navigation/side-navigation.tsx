'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SideTabs {
    id: string;
    label: string;
    href: string;
}

interface SideNavigationProps {
    tabs: SideTabs[];
}

export function SideNavigation({ tabs }: SideNavigationProps) {
    const pathname = usePathname();

    return (
        <nav className="space-y-1">
            <h2 className="text-lg font-semibold">Settings</h2>
            {tabs.map((tab) => {
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
        </nav>
    );
}
