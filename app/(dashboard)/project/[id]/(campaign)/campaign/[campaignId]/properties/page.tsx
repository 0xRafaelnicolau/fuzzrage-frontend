"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetCampaignRequest, getCampaign } from "@/lib/actions/campaigns";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import PropertiesCards from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/properties-cards";

export type Property = {
    name: string;
    status: "Passed" | "Failed"
}

export default function Page() {
    const params = useParams();
    const projectId = params.id as string;
    const campaignId = params.campaignId as string;

    // Properties
    const [properties, setProperties] = useState<Property[]>([]);
    const [loadingProperties, setLoadingProperties] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoadingProperties(true);

            const request: GetCampaignRequest = {
                project_id: projectId,
                campaign_id: campaignId,
            }

            const result = await getCampaign(request);
            if (result.success && result.campaign) {
                const failedProperties = result.campaign.attributes.result.props_failed.split(';');
                const passedProperties = result.campaign.attributes.result.props_passed.split(';');

                const combinedProperties = [...failedProperties, ...passedProperties]
                    .map((property) => (property ?? "").trim())
                    .filter(
                        (property) => property.length > 0 && property !== "AssertionFailed(..)"
                    );

                setProperties(combinedProperties.map(property => ({
                    name: property,
                    status: failedProperties.includes(property) ? 'Failed' : 'Passed'
                })));

            } else {
                toast.error(result.error?.message || 'Failed to fetch properties');
            }

            setLoadingProperties(false);
        }
        fetchProperties();
    }, [projectId, campaignId])

    return (
        <main>
            <div className="h-full flex flex-col p-3">
                {loadingProperties ? (
                    <div className="flex justify-center items-center py-16">
                        <Spinner variant="default" className="text-muted-foreground" />
                    </div>
                ) : (
                    <PropertiesCards projectId={projectId} campaignId={campaignId} properties={properties} />
                )}
            </div>
        </main >
    )
}