import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { Project } from "@/lib/data";
import { Calendar, GitBranch, Clock, Settings } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Link href={`/project/${project.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4" />
                        {project.attributes.name}
                    </CardTitle>
                    <CardDescription>
                        Project ID: {project.id}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {formatDate(project.attributes.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Updated: {formatDate(project.attributes.updated_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Settings className="h-4 w-4" />
                        <span>Installation: {project.attributes.installation_id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GitBranch className="h-4 w-4" />
                        <span>Repository: {project.attributes.repository_id}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
