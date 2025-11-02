'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Corpus } from "@/lib/actions/corpus";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { GetCorpusRequest, getCorpus } from "@/lib/actions/corpus";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Calendar as CalendarIcon, CirclePlus, Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // Corpus
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [corpus, setCorpus] = useState<Corpus[]>([]);

    const loadMore = async () => {
        setLoadingMore(true);
        setPage(page + 1);

        let from: Date | undefined;
        let to: Date | undefined;
        if (date?.from && date?.to) {
            from = new Date(date.from);
            to = new Date(date.to);

            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
        }

        const request: GetCorpusRequest = {
            project_id: id,
            page: page,
            size: 20,
            sort: "-created_at",
            name_like: debouncedSearch,
            created_at_gte: from?.toISOString(),
            created_at_lte: to?.toISOString(),
        }

        const response = await getCorpus(request);
        if (response.success && response.corpus) {
            setCorpus(prevCorpus => [...prevCorpus, ...response.corpus!]);
            setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
        } else {
            setPage(page);
            toast.error(response.error?.message || "Failed to fetch corpus");
        }

        setLoadingMore(false);
    }

    useEffect(() => {
        const fetchCorpus = async () => {
            setLoading(true);
            setPage(1);

            let from: Date | undefined;
            let to: Date | undefined;
            if (date?.from && date?.to) {
                from = new Date(date.from);
                to = new Date(date.to);

                from.setHours(0, 0, 0, 0);
                to.setHours(23, 59, 59, 999);
            }

            const request: GetCorpusRequest = {
                project_id: id,
                page: page,
                size: 20,
                sort: "-created_at",
                name_like: debouncedSearch,
                created_at_gte: from?.toISOString(),
                created_at_lte: to?.toISOString(),
            }

            const response = await getCorpus(request);
            if (response.success && response.corpus) {
                setCorpus(response.corpus);
                setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
            } else {
                toast.error(response.error?.message || "Failed to fetch corpus");
            }

            setLoading(false);
        }

        fetchCorpus();
    }, [debouncedSearch, date]);

    return (
        <div className="h-full flex flex-col p-3">
            <div className="flex items-center gap-2 mb-6 flex-shrink-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search corpus..."
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
            </div>
            <ScrollArea className="flex-1 min-h-0">
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <Spinner variant="default" className="text-muted-foreground" />
                    </div>
                ) : corpus.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">No corpus found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {corpus.map((corpus) => (
                                <span key={corpus.corpus_id}>{corpus.name}</span>
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