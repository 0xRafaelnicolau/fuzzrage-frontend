'use client';

import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
    header?: string;
    paragraph?: string;
}

export function Load({ header = "Loading...", paragraph }: LoadingProps) {
    return (
        <div className="h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center relative">
            <div className="relative z-10 flex flex-col items-center space-y-6">
                <Spinner variant="default" />
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold text-foreground">{header}</h2>
                    {paragraph && <p className="text-muted-foreground">{paragraph}</p>}
                </div>
            </div>
        </div>
    )
}