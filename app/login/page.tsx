import { LoginCard } from "@/components/ui/login-card"
import { Navbar } from "@/components/ui/navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const store = await cookies();
    const token = store.get('jwt')?.value;

    if (token) {
        redirect('/dashboard');
    }

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
                    <LoginCard />
                </div>
            </div>
        </main>
    )
}
