"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Section } from "@/components/ui/section";
import SherlockImage from "@/public/icons/sherlock.png";
import NinjaImage from "@/public/icons/ninja.png";
import BuilderImage from "@/public/icons/builder.png";
import { cubicBezier, motion } from "framer-motion";
import { AiCardAnimation } from "@/components/ui/ai-card-animation";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { GitHubIcon } from "@/components/ui/github-icon";
import { GitLabIcon } from "@/components/ui/gitlab-icon";
import { BitbucketIcon } from "@/components/ui/bitbucket-icon";

const containerVariants = {
    initial: {},
    whileHover: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function Card1() {
    return (
        <div className="p-0 min-h-[400px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 lg:border-r">
            <motion.div
                variants={containerVariants}
                initial="initial"
                whileHover="whileHover"
                className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
            >
                <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b">
                    <AiCardAnimation />
                </div>
                <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Identify invariants with AI
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Use AI to identify invariants in your smart contracts.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

const Card2 = () => {
    const logs = [
        {
            id: 1,
            type: "zegarcao",
            timestamp: "2025-11-08",
            message: "Created a campaign in protocol-v2.",
            icon: (
                <>
                    <Avatar className="h-8 w-8 flex-shrink-0 border border-border">
                        <AvatarImage src={BuilderImage.src} alt="@0xrafaelnicolau" />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-accent backdrop-blur-sm">
                            <div className="w-full h-full bg-gradient-to-br from-accent/50 to-border/50 rounded-full blur-sm"></div>
                        </AvatarFallback>
                    </Avatar>
                </>
            )
        },
        {
            id: 2,
            type: "0xrafaelnicolau",
            timestamp: "2025-11-08",
            message: "Deleted corpus from protocol-v2.",
            icon: (
                <>
                    <Avatar className="h-8 w-8 flex-shrink-0 border border-border">
                        <AvatarImage src={SherlockImage.src} alt="@0xrafaelnicolau" />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-accent backdrop-blur-sm">
                            <div className="w-full h-full bg-gradient-to-br from-accent/50 to-border/50 rounded-full blur-sm"></div>
                        </AvatarFallback>
                    </Avatar>
                </>
            ),
        },
        {
            id: 3,
            type: "0xrebelo",
            timestamp: "2025-11-07",
            message: "Updated a config in hook-v1.",
            icon: (
                <>
                    <Avatar className="h-8 w-8 flex-shrink-0 border border-border">
                        <AvatarImage src={NinjaImage.src} alt="@0xrafaelnicolau" />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-accent backdrop-blur-sm">
                            <div className="w-full h-full bg-gradient-to-br from-accent/50 to-border/50 rounded-full blur-sm"></div>
                        </AvatarFallback>
                    </Avatar>
                </>
            ),
        },
        {
            id: 4,
            type: "0xrebelo",
            timestamp: "2025-11-06",
            message: "Canceled a campaign in hook-v1.",
            icon: (
                <>
                    <Avatar className="h-8 w-8 flex-shrink-0 border border-border">
                        <AvatarImage src={NinjaImage.src} alt="@0xrafaelnicolau" />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-accent backdrop-blur-sm">
                            <div className="w-full h-full bg-gradient-to-br from-accent/50 to-border/50 rounded-full blur-sm"></div>
                        </AvatarFallback>
                    </Avatar>
                </>
            ),
        },
    ];
    return (
        <div className="p-0 min-h-[400px] overflow-hidden border-b lg:border-b-0 lg:border-r">
            <motion.div
                variants={containerVariants}
                initial="initial"
                whileHover="whileHover"
                className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
            >
                <div className="border-b items-center justify-center overflow-hidden bg-transparent rounded-t-xl h-4/5 w-full flex ">
                    <motion.div className="p-5 rounded-t-md cursor-pointer overflow-hidden h-[270px] flex flex-col gap-y-3.5 w-full">
                        {logs.map((log, index) => (
                            <motion.div
                                key={log.id}
                                className="p-4 bg-transparent backdrop-blur-md shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] border border-border origin-right w-full rounded-md flex items-center"
                                custom={index}
                                variants={{
                                    initial: (index: number) => ({
                                        y: 0,
                                        scale: index === 4 ? 0.9 : 1,
                                        opacity: 1,
                                        transition: {
                                            delay: 0.05,
                                            duration: 0.2,
                                            ease: cubicBezier(0.22, 1, 0.36, 1),
                                        },
                                    }),
                                    whileHover: (index: number) => ({
                                        y: -85,
                                        opacity: index === 4 ? 1 : 0.6,
                                        scale: index === 0 ? 0.85 : index === 4 ? 1.1 : 1,
                                        transition: {
                                            delay: 0.05,
                                            duration: 0.2,
                                            ease: cubicBezier(0.22, 1, 0.36, 1),
                                        },
                                    }),
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 40,
                                    stiffness: 600,
                                }}
                            >
                                <div className="mr-3">{log.icon}</div>
                                <div className="flex-grow">
                                    <p className="text-foreground text-xs font-medium">
                                        [{log.timestamp}] {log.type}
                                    </p>
                                    <p className="text-muted-foreground text-xs">{log.message}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Monitor campaign activity
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Track and analyze your team activity with detailed campaign
                        logs.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const Card3 = () => {
    return (
        <div className="p-0 min-h-[400px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 -z-0">
            <div className="relative flex flex-col gap-y-5 items-center justify-between h-full w-full">
                <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex">
                    <div className="relative flex items-center justify-center h-full w-full">
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle,hsl(var(--accent)/0.3)_0%,transparent_100%)]"></div>
                        <OrbitingCircles duration={15} delay={0} radius={40} reverse>
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <GitHubIcon />
                            </div>
                        </OrbitingCircles>
                        <OrbitingCircles duration={20} delay={10} radius={80}>
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <GitLabIcon />
                            </div>
                        </OrbitingCircles>
                        <OrbitingCircles duration={35} delay={50} radius={120} reverse>
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <BitbucketIcon />
                            </div>
                        </OrbitingCircles>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Integrate into your CI/CD
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Test your invariants on every commit and pull request.
                    </p>
                </div>
            </div>
        </div>
    );
};

export function UseCases() {
    return (
        <Section id="use-cases" title="Use Cases">
            <div className="grid lg:grid-cols-3 h-full border border-b-0">
                <Card1 />
                <Card2 />
                <Card3 />
            </div>
        </Section>
    );
}
