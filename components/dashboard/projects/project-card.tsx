import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/cards/card";
import { Project } from "@/lib/actions/projects";
import { MoreHorizontal, BarChart3, Activity, FileText, Settings, Bug } from "lucide-react";
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

export default function ProjectCard({ project }: ProjectCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
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
                                    <Bug className="h-4 w-4" />
                                    Campaigns
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/statistics`}>
                                    <BarChart3 className="h-4 w-4" />
                                    Statistics
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/activity`}>
                                    <Activity className="h-4 w-4" />
                                    Activity
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/corpus`}>
                                    <FileText className="h-4 w-4" />
                                    Corpus
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={`/project/${project.id}/settings`}>
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="py-2"></CardContent>

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