"use client";

import { LoginCard } from "@/components/auth/login-card"
import { Navbar } from "@/components/ui/navigation/navbar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Load from "@/components/ui/load/load";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        const auth = searchParams.get("auth_success");
        if (auth) {
            if (auth === "true") {
                setIsAuthenticating(true);
                router.push("/dashboard");
            } else {
                toast.error("Failed to authenticate");
            }
        }
    }, [router, searchParams]);

    const auth = searchParams.get("auth_success");
    if (auth === "true" || isAuthenticating) {
        return (
            <main>
                <Load header="Authenticating..." paragraph="" />
            </main>
        );
    }

    return (
        <main>
            <Navbar />
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