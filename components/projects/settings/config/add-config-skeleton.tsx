import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function AddConfigSkeleton() {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>
                        <Skeleton className="h-5 w-34" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-4 w-62" />
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-10" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-24 w-full rounded-md" />
                    </div>

                    <div className="-mx-6 border-t border-border"></div>

                    <div className="flex items-center justify-between -mb-2">
                        <div className="space-y-1 flex-1 min-w-0">
                            <Skeleton className="h-3 w-full max-w-64" />
                            <Skeleton className="h-3 w-3/4 sm:hidden" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-10 md:w-20" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}