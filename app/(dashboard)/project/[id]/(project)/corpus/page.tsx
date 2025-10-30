'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Corpus } from "@/lib/actions/corpus";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { GetCorpusRequest, getCorpus } from "@/lib/actions/corpus";
import { toast } from "sonner";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    // Corpus
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [corpus, setCorpus] = useState<Corpus[]>([]);

    // Calendar picker
    const [isDateExpanded, setIsDateExpanded] = useState(false);
    const [date, setDate] = useState<DateRange | undefined>(undefined);

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
                created_at_gte: from?.toISOString(),
                created_at_lte: to?.toISOString(),
            }

            const response = await getCorpus(request);
            if (response.success && response.corpus) {
                setCorpus(response.corpus);
            } else {
                toast.error(response.error?.message || "Failed to fetch corpus");
            }

            setLoading(false);
        }

        fetchCorpus();
    }, [date]);

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-0">
                        <div className="">
                            <h2 className="text-lg font-semibold">Filters</h2>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-3/4 lg:pl-4">
                    <h2 className="text-lg font-semibold">Corpus</h2>
                    <ScrollArea className="lg:h-[calc(100vh-16rem)]">

                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}   