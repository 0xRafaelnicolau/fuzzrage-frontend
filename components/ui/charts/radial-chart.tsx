"use client"

import { TrendingUp } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart showing storage usage"

const chartData = [
    { usage: 150, total: 2048, fill: "var(--primary)" },
]

const chartConfig = {
    usage: {
        label: "Usage",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export function ChartRadialShape() {
    const usageMB = chartData[0].usage
    const totalGB = chartData[0].total / 1024
    const usagePercentage = (usageMB / (totalGB * 1024)) * 100

    const formatUsage = (mb: number) => {
        if (mb >= 1024) {
            return `${(mb / 1024).toFixed(1)}GB`
        }
        return `${mb}MB`
    }

    return (
        <Card className="flex flex-col border-[border-color:var(--border-light)] dark:border-input">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl">Storage Usage</CardTitle>
                <CardDescription className="text-sm">
                    Current month usage
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={100}
                        innerRadius={80}
                        outerRadius={140}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="usage" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {formatUsage(usageMB)}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-sm"
                                                >
                                                    / {totalGB.toFixed(1)}GB
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {usagePercentage.toFixed(1)}% of total storage used <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing current storage usage
                </div>
            </CardFooter>
        </Card>
    )
}
