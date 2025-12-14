"use client";

import { User } from "@/lib/actions/user";
import { Header, Tab } from "@/components/ui/header";

interface ProjectsHeaderProps {
    user: User;
    projectId: string;
    projectName: string;
}

export function ProjectsHeader({ user, projectId, projectName }: ProjectsHeaderProps) {
    const tabs: Tab[] = [
        { id: 'overview', label: 'Overview', href: `/project/${projectId}` },
        { id: 'activity', label: 'Activity', href: `/project/${projectId}/activity` },
        { id: 'corpus', label: 'Corpus', href: `/project/${projectId}/corpus` },
        { id: 'settings', label: 'Settings', href: `/project/${projectId}/settings` },
    ];

    return <Header user={user} tabs={tabs} projectName={projectName} />;
}