"use client";

import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/components/home/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroTitles() {
    return (
        <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
            <motion.h1
                className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter"
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    ease,
                    staggerChildren: 0.2,
                }}
            >
                <motion.span
                    className="inline-block text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease,
                    }}
                >
                    <span className="leading-normal font-bold">{siteConfig.name}</span>
                </motion.span>
            </motion.h1>
            <motion.p
                className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.6,
                    duration: 0.8,
                    ease,
                }}
            >
                {siteConfig.hero.description}
            </motion.p>
        </div>
    );
}

function HeroCTA() {
    return (
        <div className="relative mt-6">
            <motion.div
                className="flex w-full max-w-2xl flex-row items-start justify-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease }}
            >
                <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "flex-1 flex gap-2 rounded-lg"
                    )}
                >
                    {siteConfig.hero.cta}
                </Link>
                <Link
                    href="/docs"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "flex-1 flex gap-2 rounded-lg"
                    )}
                >
                    {siteConfig.hero.docs}
                </Link>
            </motion.div>
            <motion.p
                className="mt-3 text-sm text-muted-foreground text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
            >
                {siteConfig.hero.info}
            </motion.p>
        </div>
    );
}

export function Hero() {

    return (
        <Section id="hero">
            <div className="relative w-full p-6 lg:p-12 border-x overflow-hidden">
                <div className="flex flex-col justify-start items-start">
                    <HeroTitles />
                    <HeroCTA />
                </div>
            </div>
        </Section>
    );
}
