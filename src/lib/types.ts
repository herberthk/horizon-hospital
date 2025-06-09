export type CallType = "Emergency" | "Enquiry" | "Appointment" | "Follow-up" | "Complaint";
export type CallStatus = "Completed" | "Pending" | "Failed" | "Flagged by AI" | "Reviewed";

export interface Call {
  id: string;
  type: CallType;
  status: CallStatus;
  cost: number; // in USD
  timestamp: string; // ISO string
  duration: number; // in seconds
  summary: string;
  transcript: string;
  audioUrl: string; // path to mock audio or placeholder
  agentId: string;
  patientName?: string; // optional
  notes?: string;
}

export interface FlagRiskyCallsOutput {
  isRisky: boolean;
  riskFactors: string[];
  summary: string;
}

export interface CallTrendData {
  date: string;
  count?: number;
  averageCost?: number;
}

export interface StatusDistributionData {
  status: CallStatus;
  count: number;
}
