"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";

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
        <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
            <motion.div
                variants={containerVariants}
                initial="initial"
                whileHover="whileHover"
                className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
            >
                <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b">
                    <div className="relative flex flex-col items-center justify-center gap-y-2 p-10">

                    </div>
                </div>
                <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Lorem ipsum
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

const Card2 = () => {
    return (
        <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
            <motion.div
                variants={containerVariants}
                initial="initial"
                whileHover="whileHover"
                className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
            >
                <div className="border-b items-center justify-center overflow-hidden bg-transparent rounded-t-xl h-4/5 w-full flex ">
                    <motion.div className="p-5 rounded-t-md cursor-pointer overflow-hidden h-[270px] flex flex-col gap-y-3.5 w-full">

                    </motion.div>
                </div>
                <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Lorem ipsum
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const Card3 = () => {
    return (
        <div className="p-0 min-h-[500px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 -z-0">
            <div className="relative flex flex-col gap-y-5 items-center justify-between h-full w-full">
                <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex">

                </div>
                <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Lorem ipsum
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
