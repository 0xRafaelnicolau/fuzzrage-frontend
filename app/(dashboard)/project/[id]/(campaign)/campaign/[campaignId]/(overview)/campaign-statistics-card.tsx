import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Campaign } from "@/lib/actions/campaigns";
import { BarChart3 } from "lucide-react";
import { ProgressCircle } from "@/components/ui/progress-circle";

interface CampaignStatisticsCardProps {
    campaign: Campaign;
}

export function CampaignStatisticsCard({ campaign }: CampaignStatisticsCardProps) {
    const getStatusColor = (state: string) => {
        const statusColors: Record<string, string> = {
            "SUCCEEDED": "bg-green-500",
            "FAILED": "bg-red-500",
        };
        return statusColors[state] || "bg-gray-400";
    };

    const formatDuration = (seconds: number) => {
        const durationMinutes = Math.floor(seconds / 60);
        const durationSeconds = seconds % 60;
        return durationMinutes > 0
            ? `${durationMinutes}m ${durationSeconds}s`
            : `${durationSeconds}s`;
    };

    const result = campaign.attributes.result;
    const coverage = (result.cov_percentage * 100).toFixed(2);
    const totalProperties = result.props_tested_count;
    const passedProperties = result.props_passed_count;
    const failedProperties = result.props_failed_count;
    const duration = formatDuration(result.total_duration);

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="py-0">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium text-base">Statistics</h3>
                    </div>
                </div>
            </CardHeader>

            <div className="border-t border-border -mt-6" />

            <CardContent className="pt-0">
                <div className="flex items-stretch justify-between gap-4">
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Coverage</p>
                                <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                                    <p className="text-sm text-foreground">
                                        {coverage}%
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Duration</p>
                                <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                                    <p className="text-sm text-foreground">
                                        {duration}
                                    </p>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Properties</p>
                                <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                                    <p className="text-sm text-foreground">
                                        {totalProperties}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Passed</p>
                                <div className="mt-1 h-[28px] inline-flex items-center gap-2">
                                    <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(`SUCCEEDED`)}`} />
                                    <span className="text-sm">{passedProperties}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Failed</p>
                                <div className="mt-1 h-[28px] inline-flex items-center gap-2">
                                    <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(`FAILED`)}`} />
                                    <span className="text-sm">{failedProperties}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <ProgressCircle value={Number(coverage)} className="size-24" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
