"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Campaign, GetCampaignRequest, getCampaign } from "@/lib/actions/campaigns";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import PropertiesCards from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/properties-cards";

export type Property = {
    name: string;
    status: "Passed" | "Failed"
}

const options = [
    { value: "SUCCEEDED", label: "Succeeded", color: "bg-green-500" },
    { value: "FAILED", label: "Failed", color: "bg-red-500" },
    { value: "RUNNING", label: "Running", color: "bg-orange-500" },
    { value: "QUEUED", label: "Queued", color: "bg-yellow-500" },
    { value: "CANCELLED", label: "Canceled", color: "bg-gray-400" },
];

export default function Page() {
    const params = useParams();
    const projectId = params.id as string;
    const campaignId = params.campaignId as string;

    const [campaign, setCampaign] = useState<Campaign>();
    const [loading, setLoading] = useState(true);

    // Properties
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);

            const request: GetCampaignRequest = {
                project_id: projectId,
                campaign_id: campaignId,
            }

            const result = await getCampaign(request);
            if (result.success && result.campaign) {
                setCampaign(result.campaign);

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

            setLoading(false);
        }
        fetchProperties();
    }, [projectId, campaignId])

    return (
        <main>
            <div className="h-full flex flex-col p-3">
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <Spinner variant="default" className="text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        {campaign && (
                            <>
                                {(campaign.attributes.state === "SUCCEEDED" ||
                                    campaign.attributes.state === "FAILED" ||
                                    campaign.attributes.state === "CANCELLED") && (
                                        <PropertiesCards
                                            projectId={projectId}
                                            campaignId={campaignId}
                                            properties={properties}
                                        />
                                    )}

                                {(campaign.attributes.state === "RUNNING" ||
                                    campaign.attributes.state === "QUEUED") && (
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-2xl font-bold">
                                                    {options.find(opt => opt.value === campaign.attributes.state)?.label ??
                                                        campaign.attributes.state}
                                                </h1>
                                            </div>
                                            <p className="text-sm mt-1 text-muted-foreground">
                                                Properties will be available once the campaign has finished.
                                            </p>
                                        </div>
                                    )}
                            </>
                        )}
                    </>
                )}
            </div>
        </main >
    )
}