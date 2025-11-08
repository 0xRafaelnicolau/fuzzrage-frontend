"use client"

import { Property } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FailedPropertiesCard } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/failed-properties-card";
import { SuccessPropertiesCard } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/success-properties-card";

export default function PropertiesCards({ projectId, campaignId, properties }: { projectId: string, campaignId: string, properties: Property[] }) {
    return (
        <>
            <ScrollArea className="h-[calc(100vh-14rem)]">
                <SuccessPropertiesCard properties={properties.filter(property => property.status === 'Passed')} />
                <FailedPropertiesCard properties={properties.filter(property => property.status === 'Failed')} />
            </ScrollArea>
        </>
    )
}