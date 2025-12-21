"use client";

import Link from "next/link";
import { Campaign } from "@/lib/actions/campaigns";
import { Project } from "@/lib/actions/projects";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "date-fns";
import { getCampaignStateOption } from "@/lib/campaign-state";
import { Hash, GitBranch } from "lucide-react";
import { useState } from "react";

interface CampaignsSectionProps {
    campaigns: Map<string, Campaign[]>;
    projects: Project[];
    loading: boolean;
}

export function CampaignsSection({ campaigns, projects, loading }: CampaignsSectionProps) {
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Spinner variant="default" className="text-muted-foreground" />
                </div>
            ) : (
                (() => {
                    const campaignList = Array.from(campaigns.entries())
                        .flatMap(([projectId, campaigns]) => {
                            const project = projects.find(p => p.id === projectId);
                            return campaigns.map(campaign => ({ campaign, project }));
                        })
                        .sort((a, b) => {
                            const dateA = new Date(a.campaign.attributes.created_at).getTime();
                            const dateB = new Date(b.campaign.attributes.created_at).getTime();
                            return dateB - dateA; // Most recent first
                        })
                        .map(({ campaign, project }) => {
                            const stateOption = getCampaignStateOption(campaign.attributes.state);
                            const stateColor = stateOption?.color || 'bg-gray-400';
                            const projectId = project?.id ?? campaign.attributes.project_id;

                            return (
                                <Link
                                    key={campaign.id}
                                    href={`/project/${projectId}/campaign/${campaign.id}`}
                                    className="block"
                                >
                                    <div className="flex flex-col gap-2 p-3 rounded-md border bg-card cursor-pointer transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 min-w-0 flex-1 pl-1">
                                                <span className="text-sm font-medium truncate">
                                                    {project?.attributes.name || 'Unknown Project'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <div className={`w-2 h-2 rounded-full ${stateColor}`} />
                                                <span className="text-xs text-muted-foreground">
                                                    {stateOption?.label || campaign.attributes.state}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 text-xs text-muted-foreground border border-border/50">
                                                    <Hash className="h-3 w-3" />
                                                    <span>{campaign.id.substring(0, 8)}</span>
                                                </div>
                                                {campaign.attributes.settings?.execution?.branch && (
                                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 text-xs text-muted-foreground border border-border/50">
                                                        <GitBranch className="h-3 w-3" />
                                                        <span>{campaign.attributes.settings.execution.branch}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                                                {formatDate(campaign.attributes.created_at, 'MMM d')}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        });

                    return (
                        <>
                            <div className="mt-4 space-y-3 lg:hidden">
                                {campaignList}
                            </div>
                            <ScrollArea className="hidden lg:block h-[calc(50vh-10rem)]">
                                <div className="mt-4 space-y-3">
                                    {campaignList}
                                </div>
                            </ScrollArea>
                        </>
                    );
                })()
            )}
        </>
    );
}

