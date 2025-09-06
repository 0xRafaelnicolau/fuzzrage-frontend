import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/cards/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="py-0">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded" />
                </div>
            </CardHeader>

            <CardContent className="py-2"></CardContent>

            <CardFooter className="px-6 py-0">
                <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
}