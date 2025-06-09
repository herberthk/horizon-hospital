import ChartCard from "@/components/dashboard/charts/ChartCard";
import CallVolumeChart from "@/components/dashboard/charts/CallVolumeChart";
import CallCostChart from "@/components/dashboard/charts/CallCostChart";
import CallStatusDistributionChart from "@/components/dashboard/charts/CallStatusDistributionChart";
import { mockCallTrendData, mockStatusDistribution } from "@/lib/data";
import { BarChartBig, TrendingUp, PieChart as PieChartIcon } from "lucide-react";

export default async function AnalyticsPage() {
  // In a real app, fetch this data
  const callTrendData = mockCallTrendData;
  const statusDistributionData = mockStatusDistribution;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-semibold tracking-tight text-foreground">
          Call Analytics
        </h2>
        <p className="text-muted-foreground">
          Visual insights into call trends, costs, and status distributions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <ChartCard 
          title="Call Volume Over Time" 
          description="Number of calls processed daily."
          icon={BarChartBig}
          className="xl:col-span-2"
        >
          <CallVolumeChart data={callTrendData} />
        </ChartCard>
        
        <ChartCard 
          title="Average Call Cost" 
          description="Trend of average cost per call."
          icon={TrendingUp}
        >
          <CallCostChart data={callTrendData} />
        </ChartCard>

        <ChartCard 
          title="Call Status Distribution" 
          description="Breakdown of calls by their current status."
          icon={PieChartIcon}
        >
          <CallStatusDistributionChart data={statusDistributionData} />
        </ChartCard>
      </div>
    </div>
  );
}
