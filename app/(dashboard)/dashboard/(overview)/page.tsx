"use client";

import { Campaign, getCampaigns, GetCampaignsRequest } from "@/lib/actions/campaigns";
import { Project, getProjects } from "@/lib/actions/projects";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ProjectCard } from "@/app/(dashboard)/dashboard/projects/project-card";
import { formatDate, formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const stateOptions = [
    { value: "SUCCEEDED", label: "Succeeded", color: "bg-green-500" },
    { value: "FAILED", label: "Failed", color: "bg-red-500" },
    { value: "RUNNING", label: "Running", color: "bg-orange-500" },
    { value: "QUEUED", label: "Queued", color: "bg-yellow-500" },
    { value: "CANCELLED", label: "Canceled", color: "bg-gray-400" },
];

function getStateOption(state: string) {
    return stateOptions.find(opt => opt.value === state);
}

export default function Page() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [campaignsByProject, setCampaignsByProject] = useState<Map<string, Campaign[]>>(new Map());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOverviewData = async () => {
            setLoading(true);

            const response = await getProjects();
            if (response.success && response.projects) {
                setProjects(response.projects);
            } else {
                toast.error(response.error?.message || 'Failed to fetch projects');
                setLoading(false);
                return;
            }

            if (response.projects.length === 0) {
                setLoading(false);
                return;
            }

            const requests: GetCampaignsRequest[] = [];
            for (const project of response.projects) {
                requests.push({
                    project_id: project.id,
                    size: 10,
                    sort: '-created_at'
                });
            }

            const responses = await Promise.all(requests.map(request => getCampaigns(request)));

            const campaignsMap = new Map<string, Campaign[]>();
            for (let i = 0; i < responses.length; i++) {
                const campaignResponse = responses[i];
                const projectId = response.projects[i].id;

                if (campaignResponse.success && campaignResponse.campaigns) {
                    campaignsMap.set(projectId, campaignResponse.campaigns);
                } else {
                    toast.error(campaignResponse.error?.message || 'Failed to fetch campaigns');
                    // Continue with other projects even if one fails
                    campaignsMap.set(projectId, []);
                }
            }

            setCampaignsByProject(campaignsMap);
            setLoading(false);
        }

        fetchOverviewData();
    }, []);

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-2/3 lg:pr-4 mb-6 lg:mb-0">
                    <div className="">
                        <h2 className="text-lg font-semibold">Projects</h2>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <Spinner variant="default" className="text-muted-foreground" />
                        </div>
                    ) : (
                        <>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                                {projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                            <ScrollArea className="hidden lg:block h-[calc(100vh-15rem)]">
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </div>

                <div className="w-full lg:w-1/3 lg:pl-6 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-0">
                        <div className="">
                            <h2 className="text-lg font-semibold">Campaigns</h2>
                        </div>
                        {loading ? (
                            <div className="flex justify-center items-center py-16">
                                <Spinner variant="default" className="text-muted-foreground" />
                            </div>
                        ) : (
                            (() => {
                                const campaignList = Array.from(campaignsByProject.entries())
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
                                        const stateOption = getStateOption(campaign.attributes.state);
                                        const stateColor = stateOption?.color || 'bg-gray-400';

                                        return (
                                            <div key={campaign.id} className="flex flex-col gap-2 p-3 rounded-md border bg-card">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 min-w-0 flex-1">
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
                                                <div className="flex items-center justify-between">
                                                    <div className="text-xs text-muted-foreground">
                                                        {campaign.id.substring(0, 8)}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                                                        {formatDate(campaign.attributes.created_at, 'MMM d')}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    });

                                return (
                                    <>
                                        <div className="mt-4 space-y-3 lg:hidden">
                                            {campaignList}
                                        </div>
                                        <ScrollArea className="hidden lg:block h-[calc(100vh-15rem)]">
                                            <div className="mt-4 space-y-3">
                                                {campaignList}
                                            </div>
                                        </ScrollArea>
                                    </>
                                );
                            })()
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}