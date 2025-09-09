'use client'

import { Activity } from "@/lib/actions/activity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/navigation/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    projectId: string;
}

export function ActivityTable({ activity, currentPage, hasMore, projectId }: ActivityTableProps) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLoadMore = () => {
        const url = `/project/${projectId}/activity?page=${currentPage + 1}&size=10`;
        window.history.replaceState(null, '', url);
        setTimeout(() => {
            router.refresh();
        }, 0);
    };

    return (
        <div className="space-y-4 pb-6">
            <h2 className="text-lg font-semibold">Activity</h2>
            <div className="space-y-3">
                {activity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card">
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
                            {isClient ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }) : 'Loading...'}
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center pt-4">
                    <Button variant="outline" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
}