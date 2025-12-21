"use client";

import { Campaign, getCampaigns, GetCampaignsRequest } from "@/lib/actions/campaigns";
import { Project, getProjects } from "@/lib/actions/projects";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ProjectsSection } from "@/app/(dashboard)/dashboard/(overview)/projects-section";
import { CampaignsSection } from "@/app/(dashboard)/dashboard/(overview)/campaigns-section";
import { UsageSection } from "@/app/(dashboard)/dashboard/(overview)/usage-section";
import { getUser, getUsage, Usage } from "@/lib/actions/user";
import { getPlan, Plan } from "@/lib/actions/plans";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [campaigns, setCampaigns] = useState<Map<string, Campaign[]>>(new Map());
    const [plan, setPlan] = useState<Plan | null>(null);
    const [usage, setUsage] = useState<Usage | null>(null);

    const fetchProjects = async (): Promise<Project[] | null> => {
        const response = await getProjects();

        if (!response.success || !response.projects) {
            toast.error(response.error?.message || 'Failed to fetch projects');
            return null;
        }

        return response.projects;
    };

    const fetchCampaigns = async (projects: Project[]): Promise<Map<string, Campaign[]>> => {
        const requests: GetCampaignsRequest[] = projects.map(project => ({
            project_id: project.id,
            size: 5,
            sort: '-created_at'
        }));

        const responses = await Promise.all(
            requests.map(request => getCampaigns(request))
        );

        const campaignsMap = new Map<string, Campaign[]>();
        responses.forEach((campaignResponse, index) => {
            const projectId = projects[index].id;

            if (campaignResponse.success && campaignResponse.campaigns) {
                campaignsMap.set(projectId, campaignResponse.campaigns);
            } else {
                toast.error(campaignResponse.error?.message || 'Failed to fetch campaigns');
                campaignsMap.set(projectId, []);
            }
        });

        return campaignsMap;
    };

    const fetchUsageData = async (): Promise<void> => {

        const userResponse = await getUser();
        if (!userResponse.success || !userResponse.user) {
            toast.error(userResponse.error?.message || 'Failed to fetch user');
            return;
        }

        const user = userResponse.user;

        // Then fetch plan and usage in parallel
        const [planResponse, usageResponse] = await Promise.all([
            getPlan({ plan_id: user.plan_id.toString() }),
            getUsage()
        ]);

        if (planResponse.success && planResponse.plan) {
            setPlan(planResponse.plan);
        } else {
            toast.error(planResponse.error?.message || 'Failed to fetch user plan');
        }

        if (usageResponse.success && usageResponse.usage) {
            setUsage(usageResponse.usage);
        } else {
            toast.error(usageResponse.error?.message || 'Failed to fetch user usage');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Fetch projects and usage data in parallel
            const [fetchedProjects] = await Promise.all([
                fetchProjects(),
                fetchUsageData(),
            ]);

            if (!fetchedProjects) {
                setLoading(false);
                return;
            }

            setProjects(fetchedProjects);

            if (fetchedProjects.length === 0) {
                setLoading(false);
                return;
            }

            const campaignsMap = await fetchCampaigns(fetchedProjects);
            setCampaigns(campaignsMap);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-1/3 lg:pr-6 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-0">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">Usage</h2>
                            <UsageSection plan={plan} usage={usage} loading={loading} />
                        </div>
                        <div className="">
                            <h2 className="text-lg font-semibold">Campaigns</h2>
                            <CampaignsSection
                                campaigns={campaigns}
                                projects={projects}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 lg:pl-4 mb-6 lg:mb-0">
                    <h2 className="text-lg font-semibold">Projects</h2>
                    <ProjectsSection projects={projects} loading={loading} />
                </div>
            </div>
        </div >
    )
}