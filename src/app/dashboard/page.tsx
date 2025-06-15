import CallLogTableClient from "@/components/dashboard/CallLogTableClient";
import { getAllCalls } from "@/lib/actions/process.action";
import { mockCalls } from "@/lib/data";

async function getCalls(): Promise<Call[]> {
  // In a real app, fetch this from an API
  return new Promise(resolve => setTimeout(() => resolve(mockCalls), 50));
}

const DashboardPage = async ()=> {
  const calls = await getAllCalls();

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

export default DashboardPage;