"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Headphones, Info, Clock, DollarSign, User, Tag, ShieldAlert, AlertCircle } from "lucide-react";
import type { Call, FlagRiskyCallsOutput } from "@/lib/types";
import { flagRiskyCalls } from "@/ai/flows/flag-risky-calls";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDuration } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface CallDetailsClientProps {
  call: Call;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HighlightedContent: React.FC<{ text: string; highlights: string[]; baseClass?: string; highlightClass: string }> = ({ text, highlights, baseClass, highlightClass }) => {
  if (!highlights || highlights.length === 0) {
    return <span className={baseClass}>{text}</span>;
  }

  const regex = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={baseClass}>
      {parts.map((part, index) =>
        highlights.some(h => h.toLowerCase() === part.toLowerCase()) ? (
          <mark key={index} className={highlightClass}>
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </span>
  );
};


export default function CallDetailsClient({ call }: CallDetailsClientProps) {
  const [riskAssessment, setRiskAssessment] = useState<FlagRiskyCallsOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAnalyzeCall = async () => {
    setIsLoadingAi(true);
    try {
      const assessment = await flagRiskyCalls({ transcript: call.transcript });
      setRiskAssessment(assessment);
    } catch (error) {
      console.error("Error analyzing call:", error);
      // Handle error display to user, e.g., via toast
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    // Automatically analyze call on load if transcript is available
    if (call.transcript) {
      handleAnalyzeCall();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call.transcript]); // Only re-run if transcript changes (though it shouldn't for a given call)

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/2" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-64 md:col-span-1" />
          <Skeleton className="h-96 md:col-span-2" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  const getStatusBadgeVariant = (status: Call["status"]) => {
    switch (status) {
      case "Completed": return "default";
      case "Pending": return "secondary";
      case "Failed": return "destructive";
      case "Flagged by AI": return "destructive";
      case "Reviewed": return "outline";
      default: return "default";
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-headline font-semibold tracking-tight text-foreground">
            Call Details: {call.id}
          </h2>
          <p className="text-muted-foreground">
            Comprehensive information for call ID {call.id}.
          </p>
        </div>
         <Badge variant={getStatusBadgeVariant(call.status)} className="text-sm px-3 py-1">
          {call.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center font-headline">
              <Info className="mr-2 h-6 w-6 text-primary" /> Call Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center">
              <Tag className="mr-3 h-5 w-5 text-muted-foreground" />
              <strong>Type:</strong> <span className="ml-2">{call.type}</span>
            </div>
             <div className="flex items-center">
              <User className="mr-3 h-5 w-5 text-muted-foreground" />
              <strong>Patient:</strong> <span className="ml-2">{call.patientName || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-3 h-5 w-5 text-muted-foreground" />
              <strong>Agent ID:</strong> <span className="ml-2">{call.agentId}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
              <strong>Timestamp:</strong> <span className="ml-2">{new Date(call.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
              <strong>Duration:</strong> <span className="ml-2">{formatDuration(call.duration)}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
              <strong>Cost:</strong> <span className="ml-2">{formatCurrency(call.cost)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center font-headline">
              <FileText className="mr-2 h-6 w-6 text-primary" /> Call Summary & Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{call.summary}</p>
            {call.notes && (
              <>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-2">Agent Notes:</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{call.notes}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {riskAssessment && riskAssessment.isRisky && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-destructive">
              <ShieldAlert className="mr-2 h-6 w-6" /> AI Risk Assessment
            </CardTitle>
            <CardDescription className="text-destructive/80">
              This call has been flagged for potential risks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-1">Summary: <span className="font-normal">{riskAssessment.summary}</span></p>
            <p className="font-semibold">Identified Risk Factors:</p>
            <ul className="list-disc list-inside ml-4">
              {riskAssessment.riskFactors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {isLoadingAi && !riskAssessment && (
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center font-headline">
              <AlertCircle className="mr-2 h-6 w-6 text-primary animate-spin" /> AI Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Analyzing call for risks...</p>
            <Skeleton className="h-4 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </CardContent>
        </Card>
      )}


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-headline">
            <FileText className="mr-2 h-6 w-6 text-primary" /> Full Transcript
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/20">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
               <HighlightedContent 
                text={call.transcript} 
                highlights={riskAssessment?.isRisky ? riskAssessment.riskFactors : []}
                highlightClass="bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-50 px-1 rounded font-semibold"
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-headline">
            <Headphones className="mr-2 h-6 w-6 text-primary" /> Audio Recording
          </CardTitle>
        </CardHeader>
        <CardContent>
          {call.audioUrl ? (
            <audio controls src={call.audioUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-muted-foreground">Audio recording not available for this call.</p>
          )}
        </CardContent>
      </Card>

      {!riskAssessment && !isLoadingAi && (
        <div className="text-center py-4">
         <Button onClick={handleAnalyzeCall} disabled={isLoadingAi} variant="outline">
            {isLoadingAi ? "Analyzing..." : "Re-analyze Call with AI"}
          </Button>
        </div>
      )}
    </div>
  );
}
