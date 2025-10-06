import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function TeamInviteSkeleton() {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <CardTitle>
                            <Skeleton className="h-5 w-44" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-66" />
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-10 sm:w-32" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mb-2">
                    <div className="flex flex-col md:flex-row md:gap-4 space-y-4 md:space-y-0">
                        <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-4 w-10" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>

                        <div className="w-full md:w-48 space-y-1.5">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}