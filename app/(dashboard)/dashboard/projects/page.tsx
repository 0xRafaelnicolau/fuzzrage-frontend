"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, CirclePlus, Search } from "lucide-react";
import { GetProjectsRequest, getProjects, Project } from "@/lib/actions/projects";
import { ProjectCard } from "@/components/dashboard/projects/project-card";
import { DateRange } from "react-day-picker";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";

export default function Page() {
    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // Projects
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    const loadMore = async () => {
        // Set the loading more state to true.
        setLoadingMore(true);
        // Set the page to the next page.
        setPage(page + 1);

        // Get the from and to selected dates,
        // convert them to ISO strings and set the hours 
        // to 00:00:00 and 23:59:59.
        let from: Date | undefined;
        let to: Date | undefined;
        if (date?.from && date?.to) {
            from = new Date(date.from);
            to = new Date(date.to);

            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
        }

        // Create the request to get the projects.
        const request: GetProjectsRequest = {
            page: page + 1,
            name_like: debouncedSearch,
            size: 9,
            sort: "-created_at",
            created_at_gte: from?.toISOString(),
            created_at_lte: to?.toISOString(),
        }

        // Execute the request to get the projects.
        const [result] = await Promise.all([
            getProjects(request),
            new Promise(resolve => setTimeout(resolve, 200))
        ]);

        if (result.success && result.projects) {
            // If the request was successful, add the projects to the state.
            setProjects(prevProjects => [...prevProjects, ...result.projects!]);
            // If there are more pages set the has more state to true.
            setHasMore(result.meta ? result.meta.current_page < result.meta.total_pages : false);
        } else {
            // If the request was not successful, set the page to the previous page.
            setPage(page);

            // If the request was not successful, show an error toast.
            toast.error(result.error?.message || "Failed to load more projects");
        }

        // Set the loading more state to false.
        setLoadingMore(false);
    }

    useEffect(() => {
        const fetchProjects = async () => {
            // Set the initial loading state to true.
            setLoading(true);
            // Set the page to 1.
            setPage(1);

            // Get the from and to selected dates,
            // convert them to ISO strings and set the hours 
            // to 00:00:00 and 23:59:59.
            let from: Date | undefined;
            let to: Date | undefined;
            if (date?.from && date?.to) {
                from = new Date(date.from);
                to = new Date(date.to);

                from.setHours(0, 0, 0, 0);
                to.setHours(23, 59, 59, 999);
            }

            // Create the request to get the projects.
            const request: GetProjectsRequest = {
                page: 1,
                name_like: debouncedSearch,
                size: 9,
                sort: "-created_at",
                created_at_gte: from?.toISOString(),
                created_at_lte: to?.toISOString(),
            }

            // Execute the request to get the projects.
            const [result] = await Promise.all([
                getProjects(request),
                new Promise(resolve => setTimeout(resolve, 200))
            ]);
            if (result.success && result.projects) {
                // If the request was successful, store the projects in the state.
                setProjects(result.projects);
                // If there are more pages set the has more state to true.
                setHasMore(result.meta ? result.meta.current_page < result.meta.total_pages : false);
            } else {
                // If the request was not successful, show an error toast.
                toast.error(result.error?.message || "Failed to fetch projects");
            }

            // Set the loading state to false.
            setLoading(false);
        }

        fetchProjects();
    }, [debouncedSearch, date]);

    return (
        <div className="h-full flex flex-col p-3">
            <div className="flex items-center gap-2 mb-6 flex-shrink-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10"
                        defaultValue={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                            <CalendarIcon className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0">
                        <Calendar
                            mode="range"
                            defaultMonth={new Date()}
                            selected={date}
                            onSelect={setDate}
                            className="rounded-lg shadow-sm"
                        />
                    </PopoverContent>
                </Popover>
                <Link href="/dashboard/projects/new">
                    <Button variant="default" className="gap-1.25 hidden md:inline-flex">
                        <CirclePlus className="h-4 w-4" />
                        Add Project
                    </Button>
                    <Button variant="default" size="icon" className="gap-1.25 md:hidden">
                        <CirclePlus className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <ScrollArea className="flex-1 min-h-0">
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <Spinner variant="default" className="text-muted-foreground" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">No projects found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                        {hasMore && (
                            <div className="flex justify-center mt-4 mb-2">
                                <Button
                                    variant="outline"
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className="gap-2"
                                >
                                    {loadingMore ? (
                                        <>
                                            <Spinner variant="default" className="h-4 w-4" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Load More"
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </ScrollArea>
        </div>
    )
}