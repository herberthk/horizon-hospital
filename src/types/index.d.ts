enum MessageTypeEnum {
    TRANSCRIPT = "transcript",
    FUNCTION_CALL = "function-call",
    FUNCTION_CALL_RESULT = "function-call-result",
    ADD_MESSAGE = "add-message",
    PARTIAL = "partial",
    FINAL = "final",
    ERROR = "error",
  }
  
  enum MessageRoleEnum {
    USER = "user",
    SYSTEM = "system",
    ASSISTANT = "assistant",
  }
  
  enum TranscriptMessageTypeEnum {
    PARTIAL = "partial",
    FINAL = "final",
  }
  
  interface BaseMessage {
    type: MessageTypeEnum;
  }
  
  interface TranscriptMessage extends BaseMessage {
    type: MessageTypeEnum.TRANSCRIPT;
    role: MessageRoleEnum;
    transcriptType: TranscriptMessageTypeEnum;
    transcript: string;
  }
  
  interface FunctionCallMessage extends BaseMessage {
    type: MessageTypeEnum.FUNCTION_CALL;
    functionCall: {
      name: string;
      parameters: unknown;
    };
  }
  
  interface FunctionCallResultMessage extends BaseMessage {
    type: MessageTypeEnum.FUNCTION_CALL_RESULT;
    functionCallResult: {
      forwardToClientEnabled?: boolean;
      result: unknown;
      [a: string]: unknown;
    };
  }
  
  type Message =
    | TranscriptMessage
    | FunctionCallMessage
    | FunctionCallResultMessage;

// type CallType = "Emergency" | "Enquiry" | "Appointment" | "Follow-up" | "Complaint";
type CallType = "webCall" | "phoneCall" | "Enquiry" | "Follow-up";
type CallStatus = "Completed" | "Pending" | "Failed" | "Flagged by AI" | "Reviewed" | "ended";

interface Call {
  id: string;
  type: CallType;
  status: CallStatus;
  cost: number; // in USD
  timestamp: string; // ISO string
  duration: string; // in seconds
  summary: string;
  transcript: string;
  recordingUrl: string; // path to mock audio or placeholder
  agentId?: string;
  patientName?: string; // optional
  notes?: string;
  endedReason?: string;
  endedAt: string;
}

interface FlagRiskyCallsOutput {
  isRisky: boolean;
  riskFactors: string[];
  summary: string;
}

interface CallTrendData {
  date: string;
  count?: number;
  averageCost?: number;
}

interface StatusDistributionData {
  status: CallStatus;
  count: number;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}