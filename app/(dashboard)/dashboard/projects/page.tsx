import { Suspense } from "react";
import ProjectCard from "@/components/dashboard/projects/project-card";
import ProjectList from "@/components/dashboard/projects/project-list";
import ProjectsView from "@/components/dashboard/projects/project-view";
import ProjectsViewSkeleton from "@/components/dashboard/projects/projects-view-skeleton";
import { GetProjectsRequest, getProjects } from "@/lib/actions/projects";

interface PageProps {
    searchParams: Promise<{
        search?: string;
        layout?: string;
        from?: string;
        to?: string;
    }>;
}

async function ProjectsContent({ searchParams }: { searchParams: PageProps['searchParams'] }) {
    const params: GetProjectsRequest = {};
    const resolved = await searchParams;

    if (resolved.search) {
        params.name_like = resolved.search;
    }

    if (resolved.from && resolved.to) {
        const from = new Date(resolved.from);
        const to = new Date(resolved.to);

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        params.created_at_gte = from.toISOString();
        params.created_at_lte = to.toISOString();
    }

    const response = await getProjects(params);
    const projects = response.success ? response.projects || [] : [];

    return (
        <>
            {projects.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects found.</p>
                </div>
            ) : (
                resolved.layout !== 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <>
                        {projects.map((project) => (
                            <ProjectList key={project.id} project={project} />
                        ))}
                    </>
                )
            )}
        </>
    );
}

export default async function Page({ searchParams }: PageProps) {
    const resolved = await searchParams;
    const isGridView = resolved.layout !== 'list';

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <ProjectsView
                    defaultSearch={resolved.search || ''}
                    isGridView={isGridView}
                    selectedDateRange={resolved.from && resolved.to ? {
                        from: new Date(resolved.from),
                        to: new Date(resolved.to)
                    } : undefined}
                />

                <Suspense fallback={<ProjectsViewSkeleton isGridView={isGridView} />}>
                    <ProjectsContent searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    );
}