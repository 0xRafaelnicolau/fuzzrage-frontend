"use client"

import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Property } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/page";
import { useState } from "react";

export function FailedPropertiesCard({ properties }: { properties: Property[] }) {
    const [expandedProperties, setExpandedProperties] = useState<Set<Property>>(new Set());

    const toggleExpand = (property: Property) => {
        setExpandedProperties(prev => {
            const properties = new Set(prev);

            if (properties.has(property)) {
                properties.delete(property);
            } else {
                properties.add(property);
            }

            return properties;
        });
    };

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>Failed Properties</CardTitle>
                    <CardDescription>
                        Properties that did not pass the fuzzing campaign.
                    </CardDescription>
                </div>
            </CardHeader>
            <div className="border-t border-border" />
            {properties.length > 0 ? (
                <div className="-mb-6 -mt-6">
                    <Table>
                        <TableBody>
                            {properties.map((property) => (
                                <TableRow key={property.name} onClick={() => toggleExpand(property)}>
                                    <TableCell className={`w-12 pl-5`}>
                                        {expandedProperties.has(property) ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </TableCell>
                                    <TableCell>{property.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <CardContent className="flex items-center justify-center py-4">
                    <p className="text-muted-foreground text-sm">No failed properties found.</p>
                </CardContent>
            )}
        </Card>
    )
}