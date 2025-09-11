'use client'

import { Activity } from "@/lib/actions/activity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

function formatAction(action: string): string {
    if (action === "CONFIG_ADDED") {
        return "added a new config to ";
    }
    if (action === "CONFIG_UPDATED") {
        return "updated a config in ";
    }
    if (action === "CONFIG_DELETED") {
        return "deleted a config from ";
    } else {
        return action;
    }
}

interface ActivityTableProps {
    activity: Activity[];
    currentPage: number;
    hasMore: boolean;
}

export function ActivityTable({ activity, currentPage, hasMore }: ActivityTableProps) {
    const router = useRouter();

    const handlePageChange = (page: number) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', page.toString());
        window.history.replaceState(null, '', currentUrl.toString());
        setTimeout(() => {
            router.refresh();
        }, 0);
    };

    return (
        <div className="space-y-4 pb-6">
            <h2 className="text-lg font-semibold">Activity</h2>
            <div className="space-y-3">
                {activity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-md border bg-card">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Avatar className="h-8 w-8 flex-shrink-0 border border-border">
                                <AvatarImage src={item.user_avatar} alt={item.user_name} />
                                <AvatarFallback>{item.user_name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm min-w-0">
                                <span className="font-medium truncate sm:inline">{item.user_name} </span>
                                <span className="text-muted-foreground">{formatAction(item.action)}</span>
                                <span className="font-medium truncate sm:inline">{item.project_name}</span>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                            {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                        </div>
                    </div>
                ))}
            </div>
            {(currentPage > 1 || hasMore) && (
                <div className="flex justify-center pt-4">
                    <Pagination>
                        <PaginationContent>
                            {currentPage > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                    />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink isActive>
                                    {currentPage}
                                </PaginationLink>
                            </PaginationItem>

                            {hasMore && (
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}