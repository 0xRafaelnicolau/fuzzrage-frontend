"use client";

import { SignupCard } from "@/components/ui/signup-card";
import { Navbar } from "@/components/ui/navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
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
            <ThemeToggle />
        </>
    );

    const auth = searchParams.get("auth_success");
    if (auth === "true" || isAuthenticating) {
        return (
            <main>
                <Navbar buttons={buttons} />
                <div className="h-screen overflow-hidden h-full flex items-center justify-center relative">
                    <div className="relative z-10 -mt-32 flex flex-col items-center space-y-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Authenticating...</h2>
                            <p className="text-muted-foreground">Please wait while we set up your account</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

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
