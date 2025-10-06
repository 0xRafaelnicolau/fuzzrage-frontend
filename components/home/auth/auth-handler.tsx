"use client";

import { Load } from "@/components/ui/load";
import { useEffect } from "react";
import { setToken } from "@/lib/helpers";
import { redirect, useRouter } from "next/navigation";

export function AuthHandler({ auth }: { auth?: string }) {
    const router = useRouter();

    useEffect(() => {
        const handleAuth = async () => {
            const hash = window.location.hash.substring(1);
            const token = hash?.startsWith("jwt=") ? hash.replace("jwt=", "") : undefined;

            if (auth) {
                if (auth === "true" && token) {
                    await setToken(token);
                    redirect("/dashboard");
                } else {
                    redirect("/");
                }
            }
        }

        handleAuth();
    }, [router, auth]);

    return (
        <main>
            <Load header="Authenticating..." paragraph="" />
        </main>
    )
}
