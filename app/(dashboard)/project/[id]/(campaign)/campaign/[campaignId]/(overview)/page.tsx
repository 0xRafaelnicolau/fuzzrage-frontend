"use client";

import { StartCampaignModal } from "@/app/(dashboard)/project/[id]/(project)/(overview)/start-campaign-modal";
import { GoBack } from "@/components/ui/go-back";
import { useParams } from "next/navigation";

export default function Page() {
    const { id, campaignId } = useParams<{ id: string, campaignId: string }>();

    return (
        <>
            <div className="p-3">
                <GoBack
                    title={campaignId.substring(0, 8)}
                    description={""}
                    href={`/project/${id}/campaigns`}
                    buttons={[
                        <StartCampaignModal key="start-campaign" projectId={id} />
                    ]} />
            </div>
        </>
    )
}