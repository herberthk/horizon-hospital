import CallDetailsClient from "@/components/dashboard/CallDetailsClient";
import { getCallById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCallInformation } from "@/lib/actions/process.action";

const CallDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const call = await getCallInformation(id); // In a real app, this would be an async fetch

  if (!call) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Call Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              The call with ID "{params.id}" could not be found. It might have been deleted or the ID is incorrect.
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Call Log
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Button asChild variant="outline" className="mb-6">
        <Link href="/dashboard" className="hover:bg-white hover:text-black">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Call Log
        </Link>
      </Button>
      <CallDetailsClient call={call} />
    </div>
  );
}

export default CallDetailPage;
