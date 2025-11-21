"use client"

import { Check } from "lucide-react";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Property } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/page";

export function SuccessPropertiesCard({ properties }: { properties: Property[] }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>Successful Properties</CardTitle>
                    <CardDescription>
                        Properties that passed the fuzzing campaign.
                    </CardDescription>
                </div>
            </CardHeader>
            <div className="border-t border-border" />
            {properties.length > 0 ? (
                <div className="-mb-6 -mt-6">
                    <Table>
                        <TableBody>
                            {properties.map((property) => (
                                <TableRow key={property.name}>
                                    <TableCell className="w-12 pl-5">
                                        <Check className="h-4 w-4" />
                                    </TableCell>
                                    <TableCell>{property.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <CardContent className="flex items-center justify-center py-4">
                    <p className="text-muted-foreground text-sm">No successful properties found.</p>
                </CardContent>
            )}
        </Card>
    )
}