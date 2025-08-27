"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Logo } from "./icons/logo";

interface NavbarProps {
    buttons?: ReactNode;
}

export function Navbar({ buttons }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b border-background border-t border-background">
            <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex">
                    <Link
                        href="/"
                        className="flex items-center font-medium text-lg tracking-tighter -ml-2 sm:-ml-3"
                    >
                        <Logo />
                    </Link>
                </div>

                <div className="flex">
                    <nav className="flex items-center gap-2">
                        {buttons}
                    </nav>
                </div>
            </div>
        </header >
    );
}