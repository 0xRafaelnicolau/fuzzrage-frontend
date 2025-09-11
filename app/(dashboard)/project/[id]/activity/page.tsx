import { ActivitySideNavigation } from "@/components/projects/activity/activity-side-navigation";
import { ActivityTable } from "@/components/projects/activity/activity-table";
import { ActivityTableSkeleton } from "@/components/projects/activity/activity-table-skeleton";
import { getProjectActivity } from "@/lib/actions/activity";
import { Suspense } from "react";

async function ActivityTableContent({ id, searchParams }: { id: string; searchParams: { [key: string]: string | string[] | undefined } }) {
    const currentPage = Number(searchParams?.page) || 1;
    const pageSize = 10;

    if (searchParams.from && searchParams.to) {
        const from = new Date(searchParams.from as string);
        const to = new Date(searchParams.to as string);

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        searchParams.from = from.toISOString();
        searchParams.to = to.toISOString();
    }

    const response = await getProjectActivity({
        project_id: id,
        page: currentPage,
        size: pageSize,
        sort: searchParams.sort as string,
        target_type: searchParams.target_type as string,
        created_at_gte: searchParams.from as string,
        created_at_lte: searchParams.to as string,
    });

    if (response.success && response.result) {
        return (
            <ActivityTable
                activity={response.result.activity}
                currentPage={response.result.currentPage}
                hasMore={response.result.hasMore}
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
    const resolved = await searchParams;

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 h-fit pt-6">
                            <ActivitySideNavigation projectId={id} from={resolved.from as string} to={resolved.to as string} />
                        </div>
                    </div>

                    {/* Horizontal separator line for mobile - full width */}
                    <div className="lg:hidden border-b [border-color:var(--border-light)] dark:border-input -mx-4 sm:-mx-6 lg:mx-0"></div>

                    {/* Vertical separator line for desktop */}
                    <div className="hidden lg:block border-r [border-color:var(--border-light)] dark:border-input self-stretch"></div>

                    <div className="lg:w-3/4 pt-0 lg:pt-6">
                        <Suspense fallback={<ActivityTableSkeleton />}>
                            <ActivityTableContent id={id} searchParams={resolved} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    );
}