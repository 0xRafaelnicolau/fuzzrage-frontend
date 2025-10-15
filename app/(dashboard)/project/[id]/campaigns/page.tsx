"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CalendarIcon, ChevronDown, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useParams } from 'next/navigation';
import { useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    // Calendar picker
    const [isDateExpanded, setIsDateExpanded] = useState(false);
    const [date, setDate] = useState<DateRange | undefined>(undefined);


    return (
        <>
            <div className="p-3">
                <div className="flex flex-col lg:flex-row relative">
                    <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-0">
                            <div className="">
                                <h2 className="text-lg font-semibold">Filters</h2>
                            </div>
                            <div className="mt-4">
                                {/* Mobile version - no scroll */}
                                <div className="lg:hidden">
                                    <div className="space-y-3">
                                        <Collapsible className="border border-border rounded-md">
                                            <CollapsibleTrigger
                                                onClick={() => setIsDateExpanded(!isDateExpanded)}
                                                className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Date</span>
                                                </div>
                                                {isDateExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <div className="border-t bg-background">
                                                    <div className="flex justify-center text-sm text-muted-foreground">
                                                        <Calendar
                                                            mode="range"
                                                            defaultMonth={new Date()}
                                                            selected={date}
                                                            onSelect={setDate}
                                                            className="rounded-lg w-full h-full"
                                                        />
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </div>
                                </div>
                                {/* Desktop version - scrollable */}
                                <ScrollArea className="hidden lg:block h-[calc(100vh-16rem)]">
                                    <div className="space-y-3">
                                        <Collapsible className="border border-border rounded-md">
                                            <CollapsibleTrigger
                                                onClick={() => setIsDateExpanded(!isDateExpanded)}
                                                className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Date</span>
                                                </div>
                                                {isDateExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <div className="border-t bg-background">
                                                    <div className="flex justify-center text-sm text-muted-foreground">
                                                        <Calendar
                                                            mode="range"
                                                            defaultMonth={new Date()}
                                                            selected={date}
                                                            onSelect={setDate}
                                                            className="w-full h-full"
                                                        />
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/4 lg:pl-4">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Campaigns</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}