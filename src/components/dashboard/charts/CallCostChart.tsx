"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartTooltipContent, ChartStyle, type ChartConfig } from "@/components/ui/chart"
import type { CallTrendData } from "@/lib/types";

interface CallCostChartProps {
  data: CallTrendData[];
}

const chartConfig = {
  averageCost: {
    label: "Avg. Cost ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function CallCostChart({ data }: CallCostChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
          tickFormatter={(value) => `$${value.toFixed(2)}`}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          stroke="hsl(var(--foreground))"
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Legend />
        <Line type="monotone" dataKey="averageCost" stroke="var(--color-averageCost)" strokeWidth={2} dot={{ r: 4 }} name="Average Cost" />
        <ChartStyle config={chartConfig} id="call-cost-chart" />
      </LineChart>
    </ResponsiveContainer>
  )
}
