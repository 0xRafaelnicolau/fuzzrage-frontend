import type React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressCircleProps extends React.ComponentProps<'svg'> {
    value: number
    className?: string
}

function clamp(input: number, a: number, b: number): number {
    return Math.max(Math.min(input, Math.max(a, b)), Math.min(a, b))
}

const size = 24
const strokeWidth = 2
const total = 100

export const ProgressCircle = ({ value, className, ...restSvgProps }: ProgressCircleProps) => {
    const normalizedValue = clamp(value, 0, total)

    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const progress = (normalizedValue / total) * circumference
    const halfSize = size / 2

    const commonParams = {
        cx: halfSize,
        cy: halfSize,
        r: radius,
        fill: 'none',
        strokeWidth,
    }

    return (
        <svg
            role="progressbar"
            viewBox={`0 0 ${size} ${size}`}
            className={cn('size-6 text-primary', className)}
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            {...restSvgProps}
        >
            <circle {...commonParams} className="stroke-current/25" />
            <circle
                {...commonParams}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                transform={`rotate(-90 ${halfSize} ${halfSize})`}
                className="stroke-current"
            />
            <text
                x={halfSize}
                y={halfSize}
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize="9"
                fontWeight="600"
                className="fill-white"
            >
                {Math.round(normalizedValue)}
            </text>
        </svg>
    )
}