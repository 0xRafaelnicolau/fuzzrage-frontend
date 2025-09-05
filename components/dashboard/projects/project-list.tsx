import { Project } from "@/lib/actions/projects";
import { Card } from "@/components/ui/cards/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { BarChart3, Activity, FileText, Settings, Bug } from "lucide-react";

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
        <Link href={`/project/${project.id}`} className="block mb-3 last:mb-0">
            <Card className="hover:shadow-md transition-shadow w-full py-4">
                <div className="flex items-center justify-between px-6">
                    <div>
                        <h3 className="font-medium text-sm">{project.attributes.name}</h3>
                        <p className="text-xs text-muted-foreground">{formatDate(project.attributes.created_at)}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
            </Card>
        </Link>
    );
}
