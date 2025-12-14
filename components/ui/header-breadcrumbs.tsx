"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface HeaderBreadcrumbsProps {
    projectName?: string;
    campaignName?: string;
}

export function HeaderBreadcrumbs({ projectName, campaignName }: HeaderBreadcrumbsProps) {
    const pathname = usePathname();

    // Build breadcrumb items based on the pathname
    const breadcrumbItems: Array<{ label: string; href?: string }> = [];

    // Always start with Dashboard
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/project')) {
        breadcrumbItems.push({ label: 'Dashboard', href: '/dashboard' });
    }

    // Check if we're in a project route
    if (pathname.startsWith('/project/')) {
        const projectMatch = pathname.match(/^\/project\/([^/]+)/);
        if (projectMatch) {
            const projectId = projectMatch[1];

            // Add project name if available, otherwise use project ID
            breadcrumbItems.push({
                label: projectName || `Project ${projectId}`,
                href: `/project/${projectId}`
            });

            // Check if we're in a campaign route
            const campaignMatch = pathname.match(/\/campaign\/([^/]+)/);
            if (campaignMatch) {
                const campaignId = campaignMatch[1];
                breadcrumbItems.push({
                    label: campaignName || `Campaign ${campaignId}`,
                    href: `/project/${projectId}/campaign/${campaignId}`
                });
            }
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-sm font-medium tracking-tight">
                {breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="text-foreground font-medium">
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={item.href || '#'}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className="text-muted-foreground/50" />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

