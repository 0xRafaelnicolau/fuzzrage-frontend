"use client"

import CodeEditor from "@uiw/react-textarea-code-editor";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Property } from "@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/properties/page";
import { Fragment, useState } from "react";
import { getStackTrace, GetStackTraceRequest } from "@/lib/actions/stacktrace";
import { useEffect } from "react";

export function FailedPropertiesCard({ projectId, campaignId, properties }: { projectId: string, campaignId: string, properties: Property[] }) {
    const [expandedProperties, setExpandedProperties] = useState<Set<Property>>(new Set());
    const [stacktracesByProperty, setStacktracesByProperty] = useState<Record<string, string>>({});

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

    useEffect(() => {
        const fetchStacktraces = async () => {
            const requests: GetStackTraceRequest[] = [];

            for (const property of properties) {
                const request: GetStackTraceRequest = {
                    project_id: projectId,
                    campaign_id: campaignId,
                    property: property.name
                };

                requests.push(request);
            }

            if (requests.length === 0) {
                setStacktracesByProperty({});
                return;
            }

            const responses = await Promise.all(requests.map(request => getStackTrace(request)));

            const mapping: Record<string, string> = {};

            properties.forEach((property, index) => {
                const result = responses[index];

                if (result?.success && result.stackTrace) {
                    mapping[property.name] = result.stackTrace.content;
                }
            });

            setStacktracesByProperty(mapping);
        };

        fetchStacktraces();
    }, [projectId, campaignId, properties]);

    return (
        <Card className="w-full">
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
                            {properties.map((property) => {
                                const isExpanded = expandedProperties.has(property);
                                const stacktrace = stacktracesByProperty[property.name] ?? "";

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
                                                    <CodeEditor
                                                        value={stacktrace}
                                                        language="txt"
                                                        readOnly
                                                        padding={13}
                                                        className="rounded-md border border-input shadow-xs"
                                                        style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-mono)" }}
                                                    />
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
                    <p className="text-muted-foreground text-sm">No failed properties found.</p>
                </CardContent>
            )}
        </Card>
    )
}