
"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { StatusDistributionData, CallStatus } from "@/lib/types";

interface CallStatusDistributionChartProps {
  data: StatusDistributionData[];
}

const statusColors: Record<CallStatus, string> = {
  "Completed": "hsl(var(--chart-1))",
  "Pending": "hsl(var(--chart-2))",
  "Failed": "hsl(var(--chart-3))",
  "Flagged by AI": "hsl(var(--chart-4))",
  "Reviewed": "hsl(var(--chart-5))",
};

const chartConfig = Object.fromEntries(
  Object.entries(statusColors).map(([status, color]) => [
    status.toLowerCase().replace(/\s+/g, ''), 
    { label: status, color }
  ])
) as ChartConfig;


export default function CallStatusDistributionChart({ data }: CallStatusDistributionChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[350px]">
      <PieChart margin={{ top: 5, right: 20, bottom: 5, left: 20 }} accessibilityLayer>
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={80} // For donut chart
          labelLine={false}
          // label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Optional: labels on slices
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={statusColors[entry.status]} />
          ))}
        </Pie>
        <Legend 
          verticalAlign="bottom" 
          height={48} 
          iconSize={12}
          formatter={(value, entry) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
        />
      </PieChart>
    </ChartContainer>
  )
}
