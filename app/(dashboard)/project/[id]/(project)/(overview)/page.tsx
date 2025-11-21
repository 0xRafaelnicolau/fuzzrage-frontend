"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Campaign, getCampaigns, GetCampaignsRequest } from "@/lib/actions/campaigns";
import { toast } from "sonner";
import { Calendar as CalendarIcon, ChevronDown, Check, GitBranch, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StartCampaignModal } from "@/app/(dashboard)/project/[id]/(project)/(overview)/start-campaign-modal"
import { GoBack } from "@/components/ui/go-back";
import { getProject, Project } from "@/lib/actions/projects";


export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // Campaigns
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [copiedCampaignId, setCopiedCampaignId] = useState<string | null>(null);
    const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle new campaign creation
    const handleCampaignCreated = (newCampaign: Campaign) => {
        setCampaigns(prevCampaigns => [newCampaign, ...prevCampaigns]);
    };

    // Campaign dates
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // Campaign status 
    const options = [
        { value: "SUCCEEDED", label: "Succeeded", color: "bg-green-500" },
        { value: "FAILED", label: "Failed", color: "bg-red-500" },
        { value: "RUNNING", label: "Running", color: "bg-orange-500" },
        { value: "QUEUED", label: "Queued", color: "bg-yellow-500" },
        { value: "CANCELLED", label: "Canceled", color: "bg-gray-400" },
    ];
    const toggleStatus = (status: string) => {
        selectStatus(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };
    const [selectedStatuses, selectStatus] = useState<string[]>(options.map(status => status.value));

    const loadMore = async () => {
        setLoadingMore(true);
        setPage(page + 1);

        let from: Date | undefined;
        let to: Date | undefined;
        if (date?.from && date?.to) {
            from = new Date(date.from);
            to = new Date(date.to);

            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
        }

        const request: GetCampaignsRequest = {
            project_id: id,
            page: page + 1,
            size: 20,
            sort: "-created_at",
            state_in: selectedStatuses.join(','),
            created_at_gte: from?.toISOString(),
            created_at_lte: to?.toISOString(),
        }

        const response = await getCampaigns(request);

        if (response.success && response.campaigns) {
            setCampaigns(prevCampaigns => [...prevCampaigns, ...response.campaigns!]);
            setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
        } else {
            setPage(page);
            toast.error(response.error?.message || "Failed to load more campaigns");
        }

        setLoadingMore(false);
    }

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            setPage(1);

            let from: Date | undefined;
            let to: Date | undefined;
            if (date?.from && date?.to) {
                from = new Date(date.from);
                to = new Date(date.to);

                from.setHours(0, 0, 0, 0);
                to.setHours(23, 59, 59, 999);
            }

            const request: GetCampaignsRequest = {
                project_id: id,
                page: 1,
                size: 20,
                sort: "-created_at",
                state_in: selectedStatuses.join(','),
                created_at_gte: from?.toISOString(),
                created_at_lte: to?.toISOString(),
            }

            const response = await getCampaigns(request);
            if (response.success && response.campaigns) {
                setCampaigns(response.campaigns);
                setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
            } else {
                toast.error(response.error?.message || "Failed to fetch campaigns");
            }

            setLoading(false);
        }

        fetchCampaigns();
    }, [selectedStatuses, date, id]);

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    const [project, setProject] = useState<Project>();

    useEffect(() => {

        const fetchProject = async () => {
            const response = await getProject({ projectId: id });

            if (response.success && response.project) {
                setProject(response.project);
            } else {
                toast.error(response.error?.message || "Failed to fetch project");
            }

        };
        fetchProject();
    }, [id]);

    return (
        <>
            <div className="h-full flex flex-col p-3">
                <div className="flex items-center gap-2 mb-6 flex-shrink-0">
                    <div className="relative flex-1">
                        <GoBack
                            title={project?.attributes.name || ""}
                            description={""}
                            href="/dashboard/"
                            buttons={[
                                <DropdownMenu key="status-filter">
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center gap-2 px-3 h-9">
                                            <div className="flex items-center gap-1">
                                                {options.map((status) => (
                                                    <div
                                                        key={status.value}
                                                        className={`w-2 h-2 rounded-full ${selectedStatuses.includes(status.value)
                                                            ? status.color
                                                            : "bg-gray-600"
                                                            }`}
                                                    />

                                                ))}
                                            </div>
                                            <span className="hidden sm:inline text-sm font-medium">Status</span>
                                            <ChevronDown className="hidden sm:inline h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {options.map((status) => (
                                            <div
                                                key={status.value}
                                                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent dark:hover:bg-accent"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStatus(status.value);
                                                }}
                                            >
                                                <div className={`h-4 w-4 rounded border flex items-center justify-center ${selectedStatuses.includes(status.value)
                                                    ? "border-card bg-card"
                                                    : "border-border bg-card dark:border-border dark:bg-card"
                                                    }`}>
                                                    {selectedStatuses.includes(status.value) && (
                                                        <Check className="h-3 w-3 text-foreground" />
                                                    )}
                                                </div>
                                                <div className={`w-2 h-2 rounded-full ${selectedStatuses.includes(status.value) ? status.color : "bg-gray-600"
                                                    }`} />
                                                <span className="text-sm">{status.label}</span>
                                            </div>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>,
                                <Popover key="date-filter">
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="flex items-center justify-start gap-2 px-3 h-9">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span className="hidden sm:inline text-sm font-medium">
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                                                        </>
                                                    ) : (
                                                        format(date.from, "MMM d")
                                                    )
                                                ) : (
                                                    "Select Date"
                                                )}
                                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="range"
                                            defaultMonth={new Date()}
                                            selected={date}
                                            onSelect={setDate}
                                            className="rounded-lg shadow-sm"
                                        />
                                    </PopoverContent>
                                </Popover>,
                                <StartCampaignModal key="start-campaign" projectId={id} onCampaignCreated={handleCampaignCreated} />
                            ]} />
                    </div>
                </div>
                <ScrollArea className="hidden lg:block h-[calc(100vh-18rem)]">
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <Spinner variant="default" className="text-muted-foreground" />
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">No campaigns found.</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-0">
                                {campaigns.map((campaign, index) => {
                                    const isFirst = index === 0;
                                    const isLast = index === campaigns.length - 1;
                                    const durationInSeconds = campaign.attributes.result.total_duration;
                                    const durationMinutes = Math.floor(durationInSeconds / 60);
                                    const durationSeconds = durationInSeconds % 60;
                                    const durationDisplay = durationMinutes > 0
                                        ? `${durationMinutes}m ${durationSeconds}s`
                                        : `${durationSeconds}s`;

                                    const stateOption = options.find(opt => opt.value === campaign.attributes.state);
                                    const stateColor = stateOption?.color || 'bg-gray-400';

                                    return (
                                        <div
                                            key={campaign.id}
                                            className={`
                                                grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr_2fr_auto] gap-3 items-center px-3 py-4 border-x border-t bg-card cursor-pointer hover:bg-accent transition-colors
                                                ${isFirst ? 'rounded-t-md' : ''}
                                                ${isLast ? 'rounded-b-md border-b' : ''}
                                            `}
                                            onClick={() => router.push(`/project/${id}/campaign/${campaign.id}`)}
                                        >
                                            <div className="text-sm">
                                                {campaign.id.substring(0, 8)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${stateColor}`} />
                                                <span className="text-sm text-muted-foreground">
                                                    {stateOption?.label || campaign.attributes.state}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <GitBranch className="h-4 w-4" />
                                                {campaign.attributes.settings.execution.branch}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {durationDisplay}
                                            </div>
                                            <div className="text-sm text-muted-foreground whitespace-nowrap">
                                                {format(new Date(campaign.attributes.created_at), "MMM d, yyyy")}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Clear any existing timeout
                                                        if (copyTimeoutRef.current) {
                                                            clearTimeout(copyTimeoutRef.current);
                                                        }

                                                        navigator.clipboard.writeText(`${window.location.origin}/project/${id}/campaign/${campaign.id}`);
                                                        toast.success("Campaign link copied to clipboard");
                                                        setCopiedCampaignId(campaign.id);

                                                        // Set new timeout
                                                        copyTimeoutRef.current = setTimeout(() => {
                                                            setCopiedCampaignId(null);
                                                            copyTimeoutRef.current = null;
                                                        }, 2000);
                                                    }}
                                                    className="hover:bg-accent rounded-md transition-colors"
                                                    title="Copy campaign link"
                                                >
                                                    {copiedCampaignId === campaign.id ? (
                                                        <Check className="h-4 w-4 text-muted-foreground animate-in fade-in duration-200" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-muted-foreground animate-in fade-in duration-200" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {hasMore && (
                                <div className="flex justify-center mt-4 mb-2">
                                    <Button
                                        variant="outline"
                                        onClick={loadMore}
                                        disabled={loadingMore}
                                        className="gap-2"
                                    >
                                        {loadingMore ? (
                                            <>
                                                <Spinner variant="default" className="h-4 w-4" />
                                                Loading...
                                            </>
                                        ) : (
                                            "Load More"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </ScrollArea>

                {/* Mobile Cards View */}
                <div className="lg:hidden space-y-3 pb-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <Spinner variant="default" className="text-muted-foreground" />
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">No campaigns found.</p>
                        </div>
                    ) : (
                        <>
                            {campaigns.map((campaign) => {
                                const durationInSeconds = campaign.attributes.result.total_duration;
                                const durationMinutes = Math.floor(durationInSeconds / 60);
                                const durationSeconds = durationInSeconds % 60;
                                const durationDisplay = durationMinutes > 0
                                    ? `${durationMinutes}m ${durationSeconds}s`
                                    : `${durationSeconds}s`;

                                const stateOption = options.find(opt => opt.value === campaign.attributes.state);
                                const stateColor = stateOption?.color || 'bg-gray-400';

                                return (
                                    <div
                                        key={campaign.id}
                                        className="bg-card border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-accent/50 transition-colors"
                                        onClick={() => router.push(`/project/${id}/campaign/${campaign.id}`)}
                                    >
                                        {/* Header with ID and Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">
                                                {campaign.id.substring(0, 8)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (copyTimeoutRef.current) {
                                                            clearTimeout(copyTimeoutRef.current);
                                                        }

                                                        navigator.clipboard.writeText(`${window.location.origin}/project/${id}/campaign/${campaign.id}`);
                                                        toast.success("Campaign link copied to clipboard");
                                                        setCopiedCampaignId(campaign.id);

                                                        copyTimeoutRef.current = setTimeout(() => {
                                                            setCopiedCampaignId(null);
                                                            copyTimeoutRef.current = null;
                                                        }, 2000);
                                                    }}
                                                    className="hover:bg-accent rounded-md p-1.5 transition-colors"
                                                    title="Copy campaign link"
                                                >
                                                    {copiedCampaignId === campaign.id ? (
                                                        <Check className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <Copy className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${stateColor}`} />
                                            <span className="text-sm text-muted-foreground">
                                                {stateOption?.label || campaign.attributes.state}
                                            </span>
                                        </div>

                                        {/* Branch */}
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <GitBranch className="h-4 w-4" />
                                            {campaign.attributes.settings.execution.branch}
                                        </div>

                                        {/* Duration and Date */}
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>{durationDisplay}</span>
                                            <span>{format(new Date(campaign.attributes.created_at), "MMM d, yyyy")}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            {hasMore && (
                                <div className="flex justify-center pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={loadMore}
                                        disabled={loadingMore}
                                        className="gap-2"
                                    >
                                        {loadingMore ? (
                                            <>
                                                <Spinner variant="default" className="h-4 w-4" />
                                                Loading...
                                            </>
                                        ) : (
                                            "Load More"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}