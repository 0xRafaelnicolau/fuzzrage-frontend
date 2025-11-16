import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Info, FolderInput, FolderOutput } from "lucide-react";
import { Campaign } from "@/lib/actions/campaigns";
import { format } from "date-fns";

interface CampaignDetailsCardProps {
    campaign: Campaign;
}

export function CampaignDetailsCard({ campaign }: CampaignDetailsCardProps) {
    const formatDateTime = (dateString: string) => {
        return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
    };

    const getStatusColor = (state: string) => {
        const statusColors: Record<string, string> = {
            "SUCCEEDED": "bg-green-500",
            "FAILED": "bg-red-500",
            "RUNNING": "bg-orange-500",
            "QUEUED": "bg-yellow-500",
            "CANCELLED": "bg-gray-400",
        };
        return statusColors[state] || "bg-gray-400";
    };

    const getStatusLabel = (state: string) => {
        const statusLabels: Record<string, string> = {
            "SUCCEEDED": "Succeeded",
            "FAILED": "Failed",
            "RUNNING": "Running",
            "QUEUED": "Queued",
            "CANCELLED": "Canceled",
        };
        return statusLabels[state] || state;
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="py-0">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium text-base">Details</h3>
                    </div>
                </div>
            </CardHeader>

            <div className="border-t border-border -mt-6" />

            <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
                        <div className="mt-1 h-[28px] inline-flex items-center gap-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(campaign.attributes.state)}`} />
                            <span className="text-sm">{getStatusLabel(campaign.attributes.state)}</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Branch</p>
                        <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline" className="font-mono rounded-md">
                                {campaign.attributes.settings.execution.branch || "main"}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Begin</p>
                        <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                            <p className="text-sm text-foreground">
                                {formatDateTime(campaign.attributes.created_at)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">End</p>
                        <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                            <p className="text-sm text-foreground">
                                {formatDateTime(campaign.attributes.updated_at)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Src Corpus</p>
                        <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                            <FolderInput className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline" className="font-mono rounded-md">
                                {campaign.attributes.settings.corpus.src_id.substring(0, 8) || "N/A"}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Dest Corpus</p>
                        <div className="mt-1 h-[28px] inline-flex items-center gap-2 text-sm">
                            <FolderOutput className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline" className="font-mono rounded-md">
                                {campaign.attributes.settings.corpus.dst_id.substring(0, 8) || "N/A"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}