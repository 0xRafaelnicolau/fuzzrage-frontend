import { Project } from "@/lib/actions/projects";
import { Card } from "@/components/ui/cards/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectListProps {
    project: Project;
}

export default function ProjectList({ project }: ProjectListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card className="hover:shadow-md transition-shadow w-full py-4">
            <div className="flex items-center justify-between px-6">
                <div>
                    <h3 className="font-medium text-sm">{project.attributes.name}</h3>
                    <p className="text-xs text-muted-foreground">{formatDate(project.attributes.created_at)}</p>
                </div>
                <Button variant="default" size="sm" asChild>
                    <Link href={`/project/${project.id}`}>
                        View
                    </Link>
                </Button>
            </div>
        </Card>
    );
}
