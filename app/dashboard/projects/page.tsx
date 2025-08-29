"use client"

import Link from "next/link";
import ProjectCard from "@/components/dashboard/project-card";
import { Input } from "@/components/ui/input"
import { Search, CirclePlus, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { getProjects, Project, GetProjectsParams } from "@/lib/data";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {
    const [open, setOpen] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

    useEffect(() => {
        const fetchProjects = async () => {
            const params: GetProjectsParams = {};

            if (dateRange?.from) {
                const fromDate = new Date(dateRange.from);
                fromDate.setHours(0, 0, 0, 0);
                params.created_at_gte = fromDate.toISOString();
            }

            if (dateRange?.to) {
                const toDate = new Date(dateRange.to);
                toDate.setHours(23, 59, 59, 999);
                params.created_at_lte = toDate.toISOString();
            }

            const projects = await getProjects(params);

            if (projects) {
                setProjects(projects);
            }
        };
        fetchProjects();
    }, [dateRange]);

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <div className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Search projects..." className="pl-10" />
                    </div>
                    <div className="relative">
                        <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
                            <CalendarIcon className="h-4 w-4" />
                        </Button>
                        {open && (
                            <div className="absolute top-full right-0 mt-2 z-50">
                                <Calendar
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    className="rounded-lg border shadow-sm"
                                />
                            </div>
                        )}
                    </div>
                    <Link href="/dashboard/projects/new">
                        <Button variant="default" className="gap-1.25">
                            <CirclePlus className="h-4 w-4" />
                            <span className="hidden md:inline">Add Project</span>
                        </Button>
                    </Link>
                </div>

                {!projects || projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No projects found.</p>
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