import { Card } from "@/components/ui/cards/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectListSkeleton() {
    return (
        <div className="block mb-3 last:mb-0">
            <Card className="w-full py-4">
                <div className="flex items-center justify-between px-6">
                    <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-8 w-15" />
                </div>
            </Card>
        </div>
    );
}
