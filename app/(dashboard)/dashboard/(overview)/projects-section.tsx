"use client";

import { Project } from "@/lib/actions/projects";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "@/app/(dashboard)/dashboard/projects/project-card";

interface ProjectsSectionProps {
    projects: Project[];
    loading: boolean;
}

export function ProjectsSection({ projects, loading }: ProjectsSectionProps) {
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Spinner variant="default" className="text-muted-foreground" />
                </div>
            ) : (
                <>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                    <ScrollArea className="hidden lg:block h-[calc(100vh-15rem)]">
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </ScrollArea>
                </>
            )}
        </>
    );
}

