"use client";

import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Button } from "@/components/ui/button";
import { Usage, getUsage, getUser } from "@/lib/actions/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getPlan, Plan } from "@/lib/actions/plans";

interface UsageSectionProps {
    loading: boolean;
}

function formatMinutes(minutes: number): string {
    if (minutes < 60) {
        return `${Math.floor(minutes)}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function formatStorage(bytes: number): string {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) {
        return `${gb.toFixed(1)} GB`;
    }
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
}

export function UsageSection({ loading: parentLoading }: UsageSectionProps) {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [usage, setUsage] = useState<Usage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsageData = async () => {
            setLoading(true);

            // First fetch user to get plan_id
            const userResponse = await getUser();
            if (!userResponse.success || !userResponse.user) {
                toast.error(userResponse.error?.message || 'Failed to fetch user');
                setLoading(false);
                return;
            }

            const user = userResponse.user;

            // Then fetch plan and usage in parallel
            const [planResponse, usageResponse] = await Promise.all([
                getPlan({ plan_id: user.plan_id.toString() }),
                getUsage()
            ]);

            if (planResponse.success && planResponse.plan) {
                setPlan(planResponse.plan);
            } else {
                toast.error(planResponse.error?.message || 'Failed to fetch user plan');
            }

            if (usageResponse.success && usageResponse.usage) {
                setUsage(usageResponse.usage);
            } else {
                toast.error(usageResponse.error?.message || 'Failed to fetch user usage');
            }

            setLoading(false);
        };

        if (!parentLoading) {
            fetchUsageData();
        }
    }, [parentLoading]);

    if (parentLoading || loading || !plan || !usage) {
        return (
            <div className="flex justify-center items-center py-16">
                <Spinner variant="default" className="text-muted-foreground" />
            </div>
        );
    }

    const metrics = [
        {
            label: "Active Campaigns",
            current: usage.active_campaigns,
            max: plan.max_active_campaigns,
            format: formatNumber,
            percentage: plan.max_active_campaigns > 0
                ? (usage.active_campaigns / plan.max_active_campaigns) * 100
                : 0
        },
        {
            label: "Projects",
            current: usage.projects_count,
            max: plan.max_projects,
            format: formatNumber,
            percentage: plan.max_projects > 0
                ? (usage.projects_count / plan.max_projects) * 100
                : 0
        },
        {
            label: "Storage",
            current: usage.storage_used,
            max: plan.max_storage,
            format: formatStorage,
            percentage: plan.max_storage > 0
                ? (usage.storage_used / plan.max_storage) * 100
                : 0
        },
        {
            label: "Minutes",
            current: 0,
            max: plan.max_minutes,
            format: formatMinutes,
            percentage: 0
        }
    ];

    return (
        <div className="mt-4">
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-base">Last 30 days</h3>
                        <Link href="/dashboard/settings/billing">
                            <Button variant="default" size="sm" className="cursor-pointer h-7 px-2.5 text-xs">
                                Upgrade
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0 -mt-2">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <ProgressCircle
                                value={Math.min(metric.percentage, 100)}
                                showPercentage={false}
                                className="flex-shrink-0 size-4"
                            />
                            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                                <div className="text-sm font-medium">{metric.label}</div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                    {metric.format(metric.current)} / {metric.format(metric.max)}
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

