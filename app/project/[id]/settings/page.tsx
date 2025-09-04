import { UpdateProject } from "@/components/projects/settings/update-project";
import { getProject } from "@/lib/actions/projects";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    const response = await getProject({ projectId: id });
    if (!response.success || !response.project) {
        notFound();
    }

    const project = response.project;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">General</h2>
            </div>

            <UpdateProject project={project} />
        </main>
    );
}   