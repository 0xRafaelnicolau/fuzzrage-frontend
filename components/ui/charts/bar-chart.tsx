"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart showing fuzzing minutes"

const chartData = [
    { date: "2024-04-01", minutes: 222 },
    { date: "2024-04-02", minutes: 97 },
    { date: "2024-04-03", minutes: 167 },
    { date: "2024-04-04", minutes: 242 },
    { date: "2024-04-05", minutes: 373 },
    { date: "2024-04-06", minutes: 301 },
    { date: "2024-04-07", minutes: 245 },
    { date: "2024-04-08", minutes: 409 },
    { date: "2024-04-09", minutes: 59 },
    { date: "2024-04-10", minutes: 261 },
    { date: "2024-04-11", minutes: 327 },
    { date: "2024-04-12", minutes: 292 },
    { date: "2024-04-13", minutes: 342 },
    { date: "2024-04-14", minutes: 137 },
    { date: "2024-04-15", minutes: 120 },
    { date: "2024-04-16", minutes: 138 },
    { date: "2024-04-17", minutes: 446 },
    { date: "2024-04-18", minutes: 364 },
    { date: "2024-04-19", minutes: 243 },
    { date: "2024-04-20", minutes: 89 },
    { date: "2024-04-21", minutes: 137 },
    { date: "2024-04-22", minutes: 224 },
    { date: "2024-04-23", minutes: 138 },
    { date: "2024-04-24", minutes: 387 },
    { date: "2024-04-25", minutes: 215 },
    { date: "2024-04-26", minutes: 75 },
    { date: "2024-04-27", minutes: 383 },
    { date: "2024-04-28", minutes: 122 },
    { date: "2024-04-29", minutes: 315 },
    { date: "2024-04-30", minutes: 454 },
    { date: "2024-05-01", minutes: 165 },
    { date: "2024-05-02", minutes: 293 },
    { date: "2024-05-03", minutes: 247 },
    { date: "2024-05-04", minutes: 385 },
    { date: "2024-05-05", minutes: 481 },
    { date: "2024-05-06", minutes: 498 },
    { date: "2024-05-07", minutes: 388 },
    { date: "2024-05-08", minutes: 149 },
    { date: "2024-05-09", minutes: 227 },
    { date: "2024-05-10", minutes: 293 },
    { date: "2024-05-11", minutes: 335 },
    { date: "2024-05-12", minutes: 197 },
    { date: "2024-05-13", minutes: 197 },
    { date: "2024-05-14", minutes: 448 },
    { date: "2024-05-15", minutes: 473 },
    { date: "2024-05-16", minutes: 338 },
    { date: "2024-05-17", minutes: 499 },
    { date: "2024-05-18", minutes: 315 },
    { date: "2024-05-19", minutes: 235 },
    { date: "2024-05-20", minutes: 177 },
    { date: "2024-05-21", minutes: 82 },
    { date: "2024-05-22", minutes: 81 },
    { date: "2024-05-23", minutes: 252 },
    { date: "2024-05-24", minutes: 294 },
    { date: "2024-05-25", minutes: 201 },
    { date: "2024-05-26", minutes: 213 },
    { date: "2024-05-27", minutes: 420 },
    { date: "2024-05-28", minutes: 233 },
    { date: "2024-05-29", minutes: 78 },
    { date: "2024-05-30", minutes: 340 },
    { date: "2024-05-31", minutes: 178 },
    { date: "2024-06-01", minutes: 178 },
    { date: "2024-06-02", minutes: 470 },
    { date: "2024-06-03", minutes: 103 },
    { date: "2024-06-04", minutes: 439 },
    { date: "2024-06-05", minutes: 88 },
    { date: "2024-06-06", minutes: 294 },
    { date: "2024-06-07", minutes: 323 },
    { date: "2024-06-08", minutes: 385 },
    { date: "2024-06-09", minutes: 438 },
    { date: "2024-06-10", minutes: 155 },
    { date: "2024-06-11", minutes: 92 },
    { date: "2024-06-12", minutes: 492 },
    { date: "2024-06-13", minutes: 81 },
    { date: "2024-06-14", minutes: 426 },
    { date: "2024-06-15", minutes: 307 },
    { date: "2024-06-16", minutes: 371 },
    { date: "2024-06-17", minutes: 475 },
    { date: "2024-06-18", minutes: 107 },
    { date: "2024-06-19", minutes: 341 },
    { date: "2024-06-20", minutes: 408 },
    { date: "2024-06-21", minutes: 169 },
    { date: "2024-06-22", minutes: 317 },
    { date: "2024-06-23", minutes: 480 },
    { date: "2024-06-24", minutes: 132 },
    { date: "2024-06-25", minutes: 141 },
    { date: "2024-06-26", minutes: 434 },
    { date: "2024-06-27", minutes: 448 },
    { date: "2024-06-28", minutes: 149 },
    { date: "2024-06-29", minutes: 103 },
    { date: "2024-06-30", minutes: 446 },
]

const chartConfig = {
    minutes: {
        label: "Minutes",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export function ChartBarInteractive() {
    const total = React.useMemo(
        () => chartData.reduce((acc, curr) => acc + curr.minutes, 0),
        []
    )

    return (
        <Card className="py-0 border-[border-color:var(--border-light)] dark:border-input">
            <CardHeader className="flex flex-col items-stretch border-b border-[border-color:var(--border-light)] !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle className="text-xl">Total Minutes Fuzzed</CardTitle>
                    <CardDescription className="text-sm">
                        Total minutes fuzzed in the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">
                    <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-[border-color:var(--border-light)] px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
                        <span className="text-muted-foreground text-xs">
                            Total Minutes
                        </span>
                        <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[200px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tick={{
                                fill: "var(--muted-foreground)",
                                fontSize: 12,
                                fontFamily: "var(--font-sans)",
                            }}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="minutes"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey="minutes"
                            fill="var(--primary)"
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
