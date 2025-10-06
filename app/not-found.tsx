import { Button } from "@/components/ui/button"
import FlickeringGrid from "@/components/ui/flickering-grid"
import Link from "next/link"

export default function Page() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute inset-0 w-full overflow-hidden rounded-lg bg-background">
                <FlickeringGrid
                    className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                    color="#0B54C7"
                    maxOpacity={0.5}
                    flickerChance={0.5}
                    squareSize={4}
                    gridGap={4}
                />
            </div>
            <div className="relative z-10 flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="w-full space-y-6 text-center">
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">404</h1>
                        <p className="text-muted-foreground">Looks like you&apos;ve ventured into the unknown digital realm.</p>
                    </div>
                    <Link href="/" >
                        <Button variant="outline" size="lg">
                            Go to homepage
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}