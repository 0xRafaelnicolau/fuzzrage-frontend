import { getUser } from "@/lib/actions/user";
import { MobileDrawer } from "@/components/ui/mobile-drawer";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserMenu from "@/components/ui/user-menu";

export async function HomeHeader() {
    const response = await getUser();
    const user = response.user && response.success ? response.user : null;

    return (
        <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
            <div className="flex justify-between items-center container mx-auto p-2">
                <Link
                    href="/"
                    title="brand-logo"
                    className="relative mr-6 flex items-center space-x-2"
                >
                    <Icon className="w-auto" />
                </Link>
                <div className="hidden lg:block">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "text-primary-foreground group tracking-tight font-medium"
                            )}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "text-primary-foreground group tracking-tight font-medium"
                            )}
                        >
                            Login
                        </Link>
                    )}
                </div>
                <div className="mt-2 px-2 cursor-pointer block lg:hidden">
                    <MobileDrawer />
                </div>
            </div>
            <hr className="absolute w-full bottom-0" />
        </header>
    );
}
