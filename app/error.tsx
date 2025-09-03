'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/ui/flickering-grid'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="relative min-h-screen">
            <div className="absolute inset-0 w-full overflow-hidden rounded-lg bg-background">
                <FlickeringGrid
                    className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                    squareSize={4}
                    gridGap={6}
                    color="#0B54C7"
                    maxOpacity={0.5}
                    flickerChance={2}
                />
            </div>
            <div className="relative z-10 flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="w-full space-y-6 text-center">
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">Error</h1>
                        <p className="text-muted-foreground">
                            {error.message || 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={reset}
                            variant="default"
                            size="lg"
                        >
                            Try Again
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/'}
                            variant="outline"
                            size="lg"
                        >
                            Go to homepage
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
