"use client";

import { ShowUserCard } from "@/app/(dashboard)/dashboard/settings/(account)/view-user-card";
import { DeleteUserCard } from "@/app/(dashboard)/dashboard/settings/(account)/delete-user-card";
import { User, getUser } from "@/lib/actions/user";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
    const [user, setUser] = useState<User>();
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);

            const response = await getUser();

            if (response.success && response.user) {
                setUser(response.user);
            } else {
                notFound();
            }

            setIsLoading(false);
        }

        fetchUser();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Account</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Spinner variant="default" className="text-muted-foreground" />
                </div>
            ) : (
                user && (
                    <>
                        <ShowUserCard user={user} />
                        <DeleteUserCard user={user} />
                    </>
                )
            )}
        </>
    )
}