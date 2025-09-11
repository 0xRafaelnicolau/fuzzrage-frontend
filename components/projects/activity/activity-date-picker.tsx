'use client'

import { ChevronDown, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface ActivityDatePickerProps {
    projectId: string;
    from?: string;
    to?: string;
}

export function ActivityDatePicker({ projectId, from, to }: ActivityDatePickerProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDataPicker = (Range: DateRange | undefined) => {
        const params = new URLSearchParams(window.location.search);

        if (Range?.from && Range?.to) {
            params.set('from', Range.from.toISOString());
            params.set('to', Range.to.toISOString());
            params.delete('page');
        } else {
            params.delete('from');
            params.delete('to');
        }

        router.push(`/project/${projectId}/activity?${params.toString()}`);
    }

    const formatDateRange = () => {
        if (from && to) {
            const fromDate = new Date(from);
            const toDate = new Date(to);
            return `${fromDate.toLocaleDateString('en-GB')} - ${toDate.toLocaleDateString('en-GB')}`;
        }
        return 'Date';
    }

    return (
        <div className="border rounded-md bg-card">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formatDateRange()}</span>
                </div>
                {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </button>

            {isExpanded && (
                <div className="border-t space-y-3">
                    <div className="flex justify-center text-sm text-muted-foreground">
                        <Calendar
                            mode="range"
                            defaultMonth={new Date()}
                            selected={{
                                from: from ? new Date(from) : undefined,
                                to: to ? new Date(to) : undefined
                            }}
                            onSelect={handleDataPicker}
                            className="rounded-lg w-full h-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}