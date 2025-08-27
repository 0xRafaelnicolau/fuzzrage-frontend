"use client";

import { LoginCard } from "@/components/ui/cards/login-card"
import { Navbar } from "@/components/ui/navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        const auth = searchParams.get("auth_success");

        if (auth === "true") {
            setIsAuthenticating(true);
            router.push("/dashboard");
        }
    }, [router, searchParams]);

    const buttons = (
        <>
            {/* <ThemeToggle /> */}
        </>
    );

    const auth = searchParams.get("auth_success");
    if (auth === "true" || isAuthenticating) {
        return (
            <main>
                <Navbar buttons={buttons} />
                <div className="h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center relative">
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Authenticating...</h2>
                            <p className="text-muted-foreground">Please wait while we log you in</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Navbar buttons={buttons} />
            <div className="h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center relative">
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
                <div className="relative z-10">
                    <LoginCard />
                </div>
            </div>
        </main>
    )
}

export default function Page() {
    return (
        <Suspense fallback={
            <main>
                <Navbar buttons={<ThemeToggle />} />
                <div className="h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center relative">
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Loading...</h2>
                        </div>
                    </div>
                </div>
            </main>
        }>
            <LoginContent />
        </Suspense>
    )
}
