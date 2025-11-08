/* eslint-disable @next/next/no-img-element */
"use client";

import {
    Reasoning,
    ReasoningContent,
    ReasoningResponse,
} from "@/components/ui/reasoning";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import SherlockImage from "@/public/icons/sherlock.png";
import CoverageImage from "@/public/icons/coverage.svg";

export function ReasoningBasic() {
    const reasoningText = `Since Token.sol is an ERC20 token the consider testing the following invariant: The balance of each holder should be equal to the total supply of the token.`

    return (
        <Reasoning>
            <ReasoningContent className="text-xs md:text-sm">
                <ReasoningResponse text={reasoningText} />
            </ReasoningContent>
        </Reasoning>
    );
}

export function AiCardAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isInView) {
            timeoutId = setTimeout(() => {
                setShouldAnimate(true);
            }, 1000);
        } else {
            setShouldAnimate(false);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isInView]);

    return (
        <div
            ref={ref}
            className="w-full h-full p-4 flex flex-col items-center justify-center gap-5 relative"
        >
            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
            <motion.div
                className="max-w-sm mx-auto w-full flex flex-col gap-1.5"
                animate={{
                    y: shouldAnimate ? -60 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
            >
                <div className="flex items-end justify-end gap-3">
                    <motion.div
                        className="max-w-[240px] bg-primary text-white p-3 rounded-2xl ml-auto shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <p className="text-xs md:text-sm">
                            Hey, can you help me find new invariants for my smart contracts?
                        </p>
                    </motion.div>
                    <div className="flex items-center bg-background rounded-full w-fit border border-border flex-shrink-0">
                        <img
                            src={SherlockImage.src}
                            alt="User Avatar"
                            className="size-8 rounded-full flex-shrink-0"
                        />
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <div className="flex items-center bg-background rounded-full w-fit border border-border flex-shrink-0">
                        <img
                            src={CoverageImage.src}
                            alt="Coverage Icon"
                            className="size-8 rounded-full flex-shrink-0"
                        />
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {!shouldAnimate ? (
                                <motion.div
                                    key="dots"
                                    className="absolute left-0 top-0 bg-background p-3 rounded-2xl border border-border"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((index) => (
                                            <motion.div
                                                key={index}
                                                className="w-2 h-2 bg-primary/50 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: index * 0.2,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="response"
                                    layout
                                    className="absolute left-0 top-0 md:min-w-[240px] min-w-[200px] p-3 bg-accent border border-border rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                >
                                    <ReasoningBasic />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
