"use client"

import CodeEditor from "@uiw/react-textarea-code-editor";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Property } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/page";
import { Fragment, useState } from "react";

export function SuccessPropertiesCard({ properties }: { properties: Property[] }) {
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
        <Card className="w-full">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>Successfull Properties</CardTitle>
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
                            {properties.map((property) => {
                                const isExpanded = expandedProperties.has(property);

                                return (
                                    <Fragment key={property.name}>
                                        <TableRow onClick={() => toggleExpand(property)}>
                                            <TableCell className={`w-12 pl-5`}>
                                                {isExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </TableCell>
                                            <TableCell>{property.name}</TableCell>
                                        </TableRow>
                                        {isExpanded && (
                                            <TableRow>
                                                <TableCell colSpan={2}>
                                                    <CodeEditor value={property.name} language="yaml" readOnly padding={13} className="rounded-md border border-input shadow-xs" style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-mono)" }} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Fragment>
                                );
                            })}
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