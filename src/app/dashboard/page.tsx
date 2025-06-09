import CallLogTableClient from "@/components/dashboard/CallLogTableClient";
import { mockCalls } from "@/lib/data";
import type { Call } from "@/lib/types";

async function getCalls(): Promise<Call[]> {
  // In a real app, fetch this from an API
  return new Promise(resolve => setTimeout(() => resolve(mockCalls), 50));
}

export default async function DashboardPage() {
  const calls = await getCalls();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-headline font-semibold tracking-tight text-foreground">
          Call Log Overview
        </h2>
        <p className="text-muted-foreground">
          Browse, filter, and manage all recorded calls.
        </p>
      </div>
      <CallLogTableClient initialCalls={calls} />
    </div>
  );
}
