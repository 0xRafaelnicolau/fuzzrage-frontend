import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Project } from "@/lib/actions/projects";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="py-0">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-medium text-base">{project.attributes.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(project.attributes.created_at)}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/campaigns`}>
                                    Campaigns
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/statistics`}>
                                    Statistics
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/activity`}>
                                    Activity
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/corpus`}>
                                    Corpus
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/settings`}>
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className=""></CardContent>

            <CardFooter className="px-6 py-0">
                <Link href={`/project/${project.id}`} className="w-full">
                    <Button variant="default" className="w-full">
                        View more
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}