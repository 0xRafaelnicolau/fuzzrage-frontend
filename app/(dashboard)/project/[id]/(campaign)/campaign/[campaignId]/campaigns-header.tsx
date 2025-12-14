"use client";

import { User } from "@/lib/actions/user";
import { Header, Tab } from "@/components/ui/header";

interface CampaignsHeaderProps {
    user: User;
    projectId: string;
    campaignId: string;
    projectName: string;
    campaignName: string;
}

export function CampaignsHeader({ user, projectId, projectName, campaignId, campaignName }: CampaignsHeaderProps) {
    const tabs: Tab[] = [
        { id: 'overview', label: 'Overview', href: `/project/${projectId}/campaign/${campaignId}` },
        { id: 'properties', label: 'Properties', href: `/project/${projectId}/campaign/${campaignId}/properties` },
        { id: 'coverage', label: 'Coverage', href: `/project/${projectId}/campaign/${campaignId}/coverage` },
    ];

    return <Header user={user} tabs={tabs} projectName={projectName} campaignName={campaignName} />;
}