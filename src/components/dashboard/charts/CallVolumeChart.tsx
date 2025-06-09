
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart" 
import type { CallTrendData } from "@/lib/types";

interface CallVolumeChartProps {
  data: CallTrendData[];
}

const chartConfig = {
  calls: {
    label: "Calls",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export default function CallVolumeChart({ data }: CallVolumeChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[350px]">
      <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="date" 
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          stroke="hsl(var(--foreground))"
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          stroke="hsl(var(--foreground))"
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Legend />
        <Bar dataKey="count" fill="var(--color-calls)" radius={4} name="Call Volume" />
      </BarChart>
    </ChartContainer>
  )
}
