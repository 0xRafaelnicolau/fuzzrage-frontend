"use client";

import { GoBack } from "@/components/ui/go-back";
import { useParams } from "next/navigation";
import { CampaignCancelModal } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/(overview)/campaign-cancel-modal";
import { CampaignDetailsCard } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/(overview)/campaign-details-card";
import { CampaignStatisticsCard } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/(overview)/campaign-statistics-card";
import { CampaignConfigCard } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/(overview)/campaign-config-card";
import { Campaign, getCampaign, GetCampaignRequest } from "@/lib/actions/campaigns";
import { toast } from "sonner";
import { useEffect, useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
    const { id, campaignId } = useParams<{ id: string, campaignId: string }>();

    const [campaign, setCampaign] = useState<Campaign>();

    const fetchCampaign = useCallback(async () => {
        const request: GetCampaignRequest = {
            project_id: id,
            campaign_id: campaignId
        }

        const campaign = await getCampaign(request);
        if (campaign.success && campaign.campaign) {
            setCampaign(campaign.campaign);
        } else {
            toast.error(campaign.error?.message || "Failed to fetch campaign");
        }
    }, [id, campaignId]);

    useEffect(() => {
        fetchCampaign();
    }, [fetchCampaign]);

    return (
        <>
            {campaign && (
                <>
                    <div className="p-3">
                        {(campaign.attributes.state === "RUNNING" || campaign.attributes.state === "QUEUED") && (
                            <GoBack
                                title={campaignId.substring(0, 8)}
                                description={""}
                                href={`/project/${id}/`}
                                buttons={[
                                    <CampaignCancelModal key="cancel-campaign" campaignId={campaignId} projectId={id} onCampaignCancelled={fetchCampaign} />
                                ]} />
                        )}
                        {(campaign.attributes.state === "SUCCEEDED" || campaign.attributes.state === "FAILED" || campaign.attributes.state === "CANCELLED") && (
                            <GoBack
                                title={campaignId.substring(0, 8)}
                                description={""}
                                href={`/project/${id}/campaigns`}
                            />
                        )}
                    </div>
                    <ScrollArea className="lg:h-[calc(100vh-16rem)]">
                        <div className="p-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CampaignDetailsCard campaign={campaign} />
                                <CampaignStatisticsCard campaign={campaign} />
                            </div>
                            <div className="mt-4">
                                <CampaignConfigCard campaign={campaign} />
                            </div>
                        </div>
                    </ScrollArea>
                </>
            )}
        </>
    )
}