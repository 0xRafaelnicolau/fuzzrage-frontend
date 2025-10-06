import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function UpdateProjectSkeleton() {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                            <Skeleton className="h-5 w-28" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-46" />
                        </CardDescription>
                    </div>
                    <Skeleton className="h-9 w-22 sm:w-26" />
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-9 w-full rounded-md" />
            </CardContent>
        </Card>
    );
}