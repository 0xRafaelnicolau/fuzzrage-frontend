"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/page";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PropertiesCards({ projectId, campaignId, properties }: { projectId: string, campaignId: string, properties: Property[] }) {
    return (
        <>
            {properties.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-14rem)]">
                    {properties.map((property) => {
                        console.log(property);
                        return (
                            <Card key={property.name} className="mb-2">
                                <CardHeader>
                                    <CardTitle>{property.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        )
                    })}
                </ScrollArea>
            ) : (
                <div className="flex justify-center items-center py-16">
                    <p className="text-muted-foreground">No properties found</p>
                </div>
            )}
        </>
    )
}