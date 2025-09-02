import { getProjects } from "@/lib/actions/projects";
import { GetProjectsRequest } from "@/lib/actions/types";
import ProjectsClient from "@/components/dashboard/projects/project-view";

interface PageProps {
    searchParams: Promise<{
        search?: string;
        layout?: string;
        from?: string;
        to?: string;
    }>;
}

export default async function Page({ searchParams }: PageProps) {
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

    return <ProjectsClient projects={projects} />;
}