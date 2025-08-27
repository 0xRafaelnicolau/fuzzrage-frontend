import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProjects } from "@/lib/data";
import ProjectCard from "@/components/dashboard/project-card";

export default async function Page() {
    const projects = await getProjects();

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <div className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Search projects..." className="pl-10" />
                    </div>
                    <Link href="/dashboard/projects/new">
                        <Button variant="default" >
                            Add Project
                        </Button>
                    </Link>
                </div>

                {!projects || projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No projects found. Create your first project to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}