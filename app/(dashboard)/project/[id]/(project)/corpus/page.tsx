'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Corpus } from "@/lib/actions/corpus";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { DeleteCorpusRequest, deleteCorpus, GetCorpusRequest, getCorpus, UpdateCorpusRequest, updateCorpus } from "@/lib/actions/corpus";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Calendar as CalendarIcon, Trash2, Search, AlertTriangle, Edit, Check, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTitle, AlertDialogHeader, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // Delete dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteCorpusId, setDeleteCorpusId] = useState<Corpus | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState<string>("");
    const [editingDescription, setEditingDescription] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Corpus
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [corpus, setCorpus] = useState<Corpus[]>([]);

    const fetchCorpus = async (pageNum: number = 1, append: boolean = false) => {
        if (append) {
            setLoadingMore(true);
        } else {
            setLoading(true);
            setPage(pageNum);
        }

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
            page: pageNum,
            size: 20,
            sort: "-created_at",
            name_like: debouncedSearch,
            created_at_gte: from?.toISOString(),
            created_at_lte: to?.toISOString(),
        }

        const response = await getCorpus(request);
        if (response.success && response.corpus) {
            if (append) {
                setCorpus(prevCorpus => [...prevCorpus, ...response.corpus!]);
            } else {
                setCorpus(response.corpus);
            }
            setHasMore(response.meta ? response.meta.current_page < response.meta.total_pages : false);
        } else {
            if (append) {
                setPage(pageNum - 1);
            }
            toast.error(response.error?.message || "Failed to fetch corpus");
        }

        if (append) {
            setLoadingMore(false);
        } else {
            setLoading(false);
        }
    }

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchCorpus(nextPage, true);
    }

    const handleDelete = async (corpusId: string) => {
        setIsDeleting(true);

        const request: DeleteCorpusRequest = {
            project_id: id,
            corpus_id: corpusId
        }

        const response = await deleteCorpus(request);
        if (response.success) {
            toast.success("Corpus deleted successfully");
            // Refetch the corpus list after successful deletion
            await fetchCorpus(1, false);
        } else {
            toast.error(response.error?.message || "Failed to delete corpus");
        }

        setDeleteDialogOpen(false);
        setDeleteCorpusId(null);
        setIsDeleting(false);
    }

    const handleEdit = (corpus: Corpus) => {
        setEditingId(corpus.corpus_id);
        setEditingName(corpus.name);
        setEditingDescription(corpus.content || "");
    }

    const handleSaveEdit = async (corpusId: string) => {
        setIsUpdating(true);

        const request: UpdateCorpusRequest = {
            project_id: id,
            corpus_id: corpusId,
            data: {
                attributes: {
                    name: editingName,
                    description: editingDescription
                }
            }
        }

        const response = await updateCorpus(request);
        if (response.success) {
            toast.success("Corpus updated successfully");
            setEditingId(null);
            setEditingName("");
            setEditingDescription("");
            // Refetch the corpus list after successful update
            await fetchCorpus(1, false);
        } else {
            toast.error(response.error?.message || "Failed to update corpus");
        }

        setIsUpdating(false);
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingName("");
        setEditingDescription("");
    }

    useEffect(() => {
        fetchCorpus(1, false);
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
                    <div className="space-y-2">
                        {corpus.map((corpusItem, index) => {
                            const isEditing = editingId === corpusItem.corpus_id;
                            return (
                                <div key={corpusItem.corpus_id}>
                                    <div className="flex items-center justify-between p-3 rounded-md border bg-card">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="text-sm min-w-0 flex-1">
                                                {isEditing ? (
                                                    <Input
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                        className="w-full"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span>{corpusItem.name}</span>
                                                )}
                                            </div>
                                        </div>
                                        {!isEditing && (
                                            <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 px-3">
                                                {new Date(corpusItem.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {isEditing ? (
                                                <>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleSaveEdit(corpusItem.corpus_id)}
                                                        disabled={isUpdating}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={handleCancelEdit}
                                                        disabled={isUpdating}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => handleEdit(corpusItem)}
                                                        size="icon"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setDeleteDialogOpen(true);
                                                            setDeleteCorpusId(corpusItem);
                                                        }}
                                                        size="icon"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <div className="p-3 pt-0">
                                            <textarea
                                                value={editingDescription}
                                                onChange={(e) => setEditingDescription(e.target.value)}
                                                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Description"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {hasMore && (
                            <div className="flex justify-center mt-4 mb-2">
                                <Button
                                    variant="outline"
                                    onClick={handleLoadMore}
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
                    </div>
                )}
            </ScrollArea>
            {deleteDialogOpen && (
                <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => setDeleteDialogOpen(open)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Are you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete <strong>{deleteCorpusId?.name}</strong>. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleDelete(deleteCorpusId?.corpus_id || "")}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <Spinner variant="default" className="h-4 w-4" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}