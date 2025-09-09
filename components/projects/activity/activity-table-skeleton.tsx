import { Skeleton } from "@/components/ui/skeleton";

export function ActivityTableSkeleton() {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Activity</h2>
            <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                            <div className="flex items-center gap-2 min-w-0">
                                <Skeleton className="h-4 w-48 sm:block" />
                            </div>
                        </div>
                        <Skeleton className="h-3 w-20 flex-shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}