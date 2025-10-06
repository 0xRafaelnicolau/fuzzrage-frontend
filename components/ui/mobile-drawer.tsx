import { buttonVariants } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function MobileDrawer() {
    return (
        <Drawer>
            <DrawerTrigger>
                <Menu className="text-2xl" />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="px-6 text-center">
                    <Link
                        href="/"
                        title="brand-logo"
                        className="relative flex items-center justify-center space-x-2"
                    >
                        <Logo className="w-auto h-[40px]" />
                        <DrawerTitle>{""}</DrawerTitle>
                    </Link>
                    <DrawerDescription>{siteConfig.description}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Link
                        href="/signup"
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "text-white rounded-full group"
                        )}
                    >
                        {siteConfig.cta}
                    </Link>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
