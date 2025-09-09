import { ActivitySideNavigation } from "@/components/projects/activity/activity-side-navigation";
import { ActivityTable } from "@/components/projects/activity/activity-table";
import { ActivityTableSkeleton } from "@/components/projects/activity/activity-table-skeleton";
import { getProjectActivity } from "@/lib/actions/activity";
import { Suspense } from "react";

async function ActivityTableContent({ id, searchParams }: { id: string; searchParams: { [key: string]: string | string[] | undefined } }) {
    const params = await searchParams;
    const currentPage = params.page ? parseInt(params.page as string) : 1;
    const pageSize = 20;
    const totalItemsToFetch = currentPage * pageSize;

    const response = await getProjectActivity({
        project_id: id,
        page: 1,
        size: totalItemsToFetch + 1,
        sort: params.sort as string,
        name_like: params.name_like as string,
        created_at_gte: params.created_at_gte as string,
        created_at_lte: params.created_at_lte as string,
    });

    if (response.success && response.activity) {
        const hasMore = response.activity.length > totalItemsToFetch;
        const displayActivity = hasMore ? response.activity.slice(0, totalItemsToFetch) : response.activity;

        return (
            <ActivityTable
                activity={displayActivity}
                currentPage={currentPage}
                hasMore={hasMore}
                projectId={id}
            />
        );
    } else {
        throw new Error(response.error?.message || 'Failed to fetch activity');
    }
}

export default async function Page({
    params,
    searchParams
}: {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { id } = await params;

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 h-fit pt-6">
                            <ActivitySideNavigation />
                        </div>
                    </div>

                    {/* Horizontal separator line for mobile - full width */}
                    <div className="lg:hidden border-b [border-color:var(--border-light)] dark:border-input -mx-4 sm:-mx-6 lg:mx-0"></div>

                    {/* Vertical separator line for desktop */}
                    <div className="hidden lg:block border-r [border-color:var(--border-light)] dark:border-input self-stretch"></div>

                    <div className="lg:w-3/4 pt-0 lg:pt-6">
                        <Suspense fallback={<ActivityTableSkeleton />}>
                            <ActivityTableContent id={id} searchParams={searchParams} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    );
}