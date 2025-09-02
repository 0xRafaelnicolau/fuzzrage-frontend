"use client"

import Link from "next/link";
import ProjectCard from "@/components/dashboard/projects/project-card";
import ProjectList from "@/components/dashboard/projects/project-list";
import { Input } from "@/components/ui/input"
import { Search, CirclePlus, LayoutGrid, List, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Project } from "@/lib/actions/types";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface ProjectsViewProps {
    projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const isGridView = searchParams.get('layout') !== 'list';

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleDataPicker = (range: DateRange | undefined) => {
        const params = new URLSearchParams(searchParams);

        if (range?.from && range?.to) {
            params.set('from', range.from.toISOString());
            params.set('to', range.to.toISOString());
        } else {
            params.delete('from');
            params.delete('to');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    const handleLayoutToggle = () => {
        const params = new URLSearchParams(searchParams);

        if (isGridView) {
            params.set('layout', 'list');
        } else {
            params.delete('layout');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <div className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-10"
                            defaultValue={searchParams.get('search') || ''}
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                        />
                    </div>
                    <div className="relative flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleLayoutToggle}>
                            {isGridView ? (
                                <LayoutGrid className="h-4 w-4" />
                            ) : (
                                <List className="h-4 w-4" />
                            )}
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
                            <CalendarIcon className="h-4 w-4" />
                        </Button>
                        {open && (
                            <div className="absolute top-full right-0 mt-2 z-50">
                                <Calendar
                                    mode="range"
                                    defaultMonth={new Date()}
                                    selected={searchParams.get('from') && searchParams.get('to') ? {
                                        from: new Date(searchParams.get('from')!),
                                        to: new Date(searchParams.get('to')!)
                                    } : undefined}
                                    onSelect={handleDataPicker}
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

                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No projects found.</p>
                    </div>
                ) : (
                    isGridView ? (
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
            </div>
        </main>
    );
}