import { SignupCard } from "@/components/ui/signup-card";
import { Navbar } from "@/components/ui/navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default async function Page() {
    const buttons = (
        <>
            <ThemeToggle />
        </>
    );

    return (
        <main>
            <Navbar buttons={buttons} />
            <div className="h-screen overflow-hidden h-full flex items-center justify-center relative">
                <div className="absolute inset-0 w-full overflow-hidden rounded-lg bg-background">
                    <FlickeringGrid
                        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                        squareSize={4}
                        gridGap={6}
                        color="#0B54C7"
                        maxOpacity={0.5}
                        flickerChance={1}
                    />
                </div>
                <div className="relative z-10 -mt-32">
                    <SignupCard />
                </div>
            </div>
        </main>
    );
}
