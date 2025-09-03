"use client";

import { LoginCard } from "@/components/auth/login-card"
import { Navbar } from "@/components/ui/navigation/navbar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const auth = searchParams.get("auth_success");
        if (auth) {
            if (auth === "true") {
                router.push("/dashboard");
                toast.success("Authenticated successfully");
            } else {
                toast.error("Failed to authenticate");
            }
        }
    }, [router, searchParams]);

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