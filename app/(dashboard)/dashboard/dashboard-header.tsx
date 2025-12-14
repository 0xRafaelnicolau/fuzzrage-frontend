"use client";

import { User } from "@/lib/actions/user";
import { Header, Tab } from "@/components/ui/header";

export function DashboardHeader({ user }: { user: User }) {
    const tabs: Tab[] = [
        { id: 'overview', label: 'Overview', href: '/dashboard' },
        { id: 'projects', label: 'Projects', href: '/dashboard/projects' },
        { id: 'activity', label: 'Activity', href: '/dashboard/activity' },
        { id: 'settings', label: 'Settings', href: '/dashboard/settings' },
    ];

    return <Header user={user} tabs={tabs} />;
}