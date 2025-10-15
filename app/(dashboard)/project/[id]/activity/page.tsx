'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, getProjectActivity, GetProjectActivityRequest } from "@/lib/actions/activity";
import { ChevronDown, ChevronRight, Filter, Search, Check, Calendar as CalendarIcon, PlayCircle, CheckCircle2, XCircle } from "lucide-react";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

const TYPES = [
    { value: 'campaign', label: 'Campaigns', description: 'Campaigns that were started, stopped, or finished.' },
    { value: 'corpus', label: 'Corpus', description: 'Corpus items that were created, updated, or deleted.' },
    { value: 'config', label: 'Configs', description: 'Configuration files that were added, updated, or deleted.' },
];

const getActionLabel = (action: string, targetId: string) => {
    switch (action) {
        case "CONFIG_ADDED":
            return {
                prefix: 'added config ',
                suffix: ' to ',
                targetDisplay: targetId,
                href: ''
            };
        case "CONFIG_UPDATED":
            return {
                prefix: 'updated config ',
                suffix: ' in ',
                targetDisplay: targetId,
                href: ''
            };
        case "CONFIG_DELETED":
            return {
                prefix: 'deleted config ',
                suffix: ' from ',
                targetDisplay: targetId,
                href: ''
            };
        case "CORPUS_RENAMED":
            return {
                prefix: 'renamed corpus ',
                suffix: ' in ',
                targetDisplay: targetId,
                href: ''
            };
        case "CORPUS_DELETED":
            return {
                prefix: 'deleted corpus ',
                suffix: ' from ',
                targetDisplay: targetId,
                href: ''
            };
        case "CAMPAIGN_CREATED":
            return {
                prefix: 'created campaign ',
                suffix: ' in ',
                targetDisplay: targetId.substring(0, 8),
                href: `/campaign/${targetId}`
            };
        case "CAMPAIGN_CANCELED":
            return {
                prefix: 'Campaign ',
                suffix: ' canceled executing in ',
                targetDisplay: targetId.substring(0, 8),
                href: `/campaign/${targetId}`
            };
        case "CAMPAIGN_FINISHED":
            return {
                prefix: 'Campaign ',
                suffix: ' finished executing in ',
                targetDisplay: targetId.substring(0, 8),
                href: `/campaign/${targetId}`
            };
        case "CAMPAIGN_STARTED":
            return {
                prefix: 'Campaign ',
                suffix: ' started executing in ',
                targetDisplay: targetId.substring(0, 8),
                href: `/campaign/${targetId}`
            };
        default:
            return {
                prefix: '',
                suffix: '',
                targetDisplay: targetId,
                href: ''
            };
    }
}

const getActionIcon = (action: string) => {
    switch (action) {
        case "CAMPAIGN_STARTED":
            return PlayCircle;
        case "CAMPAIGN_FINISHED":
            return CheckCircle2;
        case "CAMPAIGN_CANCELED":
            return XCircle;
        default:
            return null;
    }
}

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // Activity
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);

    // Calendar picker
    const [isDateExpanded, setIsDateExpanded] = useState(false);
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // Type picker
    const [isTypeExpanded, setTypeExpanded] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>(TYPES.map(type => type.value));

    const filteredTypes = TYPES.filter(type =>
        type.label.toLowerCase().includes(searchType.toLowerCase()) ||
        type.description.toLowerCase().includes(searchType.toLowerCase())
    );

    const handleLoadMore = async () => {
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

        const request: GetProjectActivityRequest = {
            project_id: id,
            page: page + 1,
            size: 20,
            sort: "-created_at",
            target_type_in: selectedTypes.join(","),
            created_at_gte: from?.toISOString(),
            created_at_lte: to?.toISOString(),
        };

        const response = await getProjectActivity(request)

        if (response.success && response.activity) {
            setActivities(prevActivities => [...prevActivities, ...response.activity!]);
            setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
        } else {
            setPage(page);
            toast.error(response.error?.message || "Failed to fetch project activity");
        }

        setLoadingMore(false);
    };

    const handleTypeSelect = (typeValue: string) => {
        setSelectedTypes(prev =>
            prev.includes(typeValue)
                ? prev.filter(type => type !== typeValue)
                : [...prev, typeValue]
        );
    };

    useEffect(() => {
        const fetchActivity = async () => {
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

            const request: GetProjectActivityRequest = {
                project_id: id,
                page: 1,
                size: 20,
                sort: "-created_at",
                target_type_in: selectedTypes.join(","),
                created_at_gte: from?.toISOString(),
                created_at_lte: to?.toISOString(),
            };

            const response = await getProjectActivity(request)

            if (response.success && response.activity) {
                setActivities(response.activity!);
                setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
            } else {
                setPage(page);
                toast.error(response.error?.message || "Failed to fetch project activity");
            }

            setLoading(false);
        };
        fetchActivity();
    }, [selectedTypes, date]);

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-0">
                        <div className="">
                            <h2 className="text-lg font-semibold">Filters</h2>
                        </div>
                        <div className="mt-4">
                            {/* Mobile version - no scroll */}
                            <div className="lg:hidden">
                                <div className="border border-border rounded-md">
                                    <Collapsible>
                                        <CollapsibleTrigger
                                            onClick={() => setIsDateExpanded(!isDateExpanded)}
                                            className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/50 transition-colors rounded-t-md"
                                        >
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Date</span>
                                            </div>
                                            {isDateExpanded ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <div className="border-t bg-background">
                                                <div className="flex justify-center text-sm text-muted-foreground">
                                                    <Calendar
                                                        mode="range"
                                                        defaultMonth={new Date()}
                                                        selected={date}
                                                        onSelect={setDate}
                                                        className="rounded-lg w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>

                                    {/* Type Picker */}
                                    <Collapsible>
                                        <CollapsibleTrigger
                                            onClick={() => setTypeExpanded(!isTypeExpanded)}
                                            className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/50 transition-colors border-t border-border"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Type</span>
                                            </div>
                                            {isTypeExpanded ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <div className="p-3 border-t bg-background">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        placeholder="Search types..."
                                                        value={searchType}
                                                        onChange={(e) => setSearchType(e.target.value)}
                                                        className="pl-9 h-9 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1 mt-2">
                                                    {filteredTypes.map((type) => {
                                                        const isSelected = selectedTypes.includes(type.value);
                                                        return (
                                                            <div
                                                                key={type.value}
                                                                className="flex items-start gap-3 p-1.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                                                                onClick={() => handleTypeSelect(type.value)}
                                                            >
                                                                <div className="flex-shrink-0 mt-1">
                                                                    {isSelected ? (
                                                                        <div className="h-4 w-4 rounded border border-primary bg-primary flex items-center justify-center">
                                                                            <Check className="h-3 w-3 text-primary-foreground" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="text-sm font-medium text-foreground">
                                                                        {type.label}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {type.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            </div>

                            {/* Desktop version - scrollable */}
                            <ScrollArea className="hidden lg:block h-[calc(100vh-16rem)]">
                                <div className="border border-border rounded-md">
                                    <Collapsible>
                                        <CollapsibleTrigger
                                            onClick={() => setIsDateExpanded(!isDateExpanded)}
                                            className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/50 transition-colors rounded-t-md"
                                        >
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Date</span>
                                            </div>
                                            {isDateExpanded ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <div className="border-t bg-background">
                                                <div className="flex justify-center text-sm text-muted-foreground">
                                                    <Calendar
                                                        mode="range"
                                                        defaultMonth={new Date()}
                                                        selected={date}
                                                        onSelect={setDate}
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>

                                    {/* Type Picker */}
                                    <Collapsible>
                                        <CollapsibleTrigger
                                            onClick={() => setTypeExpanded(!isTypeExpanded)}
                                            className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/50 transition-colors border-t border-border"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Type</span>
                                            </div>
                                            {isTypeExpanded ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <div className="p-3 border-t bg-background">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        placeholder="Search types..."
                                                        value={searchType}
                                                        onChange={(e) => setSearchType(e.target.value)}
                                                        className="pl-9 h-9 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1 mt-2">
                                                    {filteredTypes.map((type) => {
                                                        const isSelected = selectedTypes.includes(type.value);
                                                        return (
                                                            <div
                                                                key={type.value}
                                                                className="flex items-start gap-3 p-1.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                                                                onClick={() => handleTypeSelect(type.value)}
                                                            >
                                                                <div className="flex-shrink-0 mt-1">
                                                                    {isSelected ? (
                                                                        <div className="h-4 w-4 rounded border border-primary bg-primary flex items-center justify-center">
                                                                            <Check className="h-3 w-3 text-primary-foreground" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="text-sm font-medium text-foreground">
                                                                        {type.label}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {type.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-3/4 lg:pl-4">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Activity</h2>
                        <ScrollArea className="lg:h-[calc(100vh-16rem)]">
                            {loading ? (
                                <div className="flex justify-center items-center py-16">
                                    <Spinner variant="default" className="text-muted-foreground" />
                                </div>
                            ) : activities.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-muted-foreground">No activity found.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        {activities.map((item, index) => {
                                            const ActionIcon = getActionIcon(item.action);
                                            return (
                                                <div key={index} className="flex items-center justify-between p-3 rounded-md border bg-card">
                                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                                        {ActionIcon ? (
                                                            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full border border-border bg-muted">
                                                                <ActionIcon className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                        ) : (
                                                            <Avatar className="h-8 w-8 flex-shrink-0 border border-border">
                                                                <AvatarImage src={item.user_avatar} alt={item.user_name} />
                                                                <AvatarFallback className="bg-gradient-to-br from-muted to-accent backdrop-blur-sm">
                                                                    <div className="w-full h-full bg-gradient-to-br from-accent/50 to-border/50 rounded-full blur-sm"></div>
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div className="text-sm min-w-0">
                                                            <span className="font-medium truncate sm:inline">{item.user_name} </span>
                                                            <span className="text-muted-foreground">
                                                                {(() => {
                                                                    const actionLabel = getActionLabel(item.action, item.target_id);
                                                                    return (
                                                                        <>
                                                                            {actionLabel.prefix}
                                                                            {actionLabel.href ? (
                                                                                <span
                                                                                    className="text-white cursor-pointer hover:underline"
                                                                                    onClick={() => router.push(actionLabel.href)}
                                                                                >
                                                                                    {actionLabel.targetDisplay}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="text-white">
                                                                                    {actionLabel.targetDisplay}
                                                                                </span>
                                                                            )}
                                                                            {actionLabel.suffix}
                                                                        </>
                                                                    );
                                                                })()}
                                                            </span>
                                                            <span className="font-medium truncate sm:inline">{item.project_name + "."}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {hasMore && (
                                        <div className="flex justify-center mt-6">
                                            <Button
                                                variant="outline"
                                                onClick={handleLoadMore}
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
                    </div>
                </div>
            </div>
        </div >
    );
}       