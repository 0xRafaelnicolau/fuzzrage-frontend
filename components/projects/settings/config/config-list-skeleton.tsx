import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ConfigListSkeleton() {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>
                        <Skeleton className="h-5 w-52" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-4 w-64" />
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-4">
                <Skeleton className="h-5 w-64" />
            </CardContent>
        </Card>
    );
}