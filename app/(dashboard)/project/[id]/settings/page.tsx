import { Suspense } from "react";
import { UpdateProject } from "@/components/projects/settings/general/update-project";
import { UpdateProjectSkeleton } from "@/components/projects/settings/general/update-project-skeleton";
import { getProject } from "@/lib/actions/projects";
import { notFound } from "next/navigation";

async function UpdateProjectContent({ id }: { id: string }) {
    const response = await getProject({ projectId: id });
    if (!response.success || !response.project) {
        notFound();
    }

    return <UpdateProject project={response.project} />;
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">General</h2>
            </div>

            <Suspense fallback={<UpdateProjectSkeleton />}>
                <UpdateProjectContent id={id} />
            </Suspense>
        </main>
    );
}