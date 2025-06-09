import type { Call, CallType, CallStatus, CallTrendData, StatusDistributionData } from './types';

const mockTranscript = `
Agent: Thank you for calling Horizon Hospital, this is Sarah speaking. How can I help you today?
Caller: Hi Sarah, I'd like to schedule an appointment with Dr. Evans.
Agent: Certainly. Dr. Evans is a cardiologist. Is this a follow-up or a new patient visit?
Caller: It's a new patient visit. I've been having some chest pain lately. Sometimes it feels like a legal issue is brewing with my neighbor too.
Agent: I see. I'm sorry to hear about the chest pain. We should get you scheduled as soon as possible. How about next Tuesday at 10 AM?
Caller: That works for me.
Agent: Alright, can I get your full name and date of birth, please?
Caller: My name is John Doe, and my date of birth is January 15, 1975. I must say, patient safety is my top concern.
Agent: Thank you, Mr. Doe. Your appointment for next Tuesday at 10 AM with Dr. Evans is confirmed. You'll receive a confirmation email shortly. Is there anything else I can assist you with?
Caller: No, that's all. Thank you for your help. Mentioning patient safety issues, I once had a bad experience elsewhere.
Agent: You're welcome. Have a good day.
`;

const mockSummary = "Caller John Doe scheduled a new patient appointment with Dr. Evans for next Tuesday at 10 AM due to chest pain. Caller also mentioned legal issues and concerns about patient safety.";

export const mockCalls: Call[] = [
  {
    id: "C001",
    type: "Appointment",
    status: "Completed",
    cost: 2.50,
    timestamp: "2024-07-29T10:15:00Z",
    duration: 300,
    summary: mockSummary,
    transcript: mockTranscript,
    audioUrl: "/audio/mock_call_1.mp3",
    agentId: "A012",
    patientName: "John Doe"
  },
  {
    id: "C002",
    type: "Enquiry",
    status: "Completed",
    cost: 1.20,
    timestamp: "2024-07-29T11:05:00Z",
    duration: 120,
    summary: "Caller enquired about visiting hours for the ICU.",
    transcript: "Agent: Horizon Hospital, Emily speaking. Caller: Hi, what are the ICU visiting hours? Agent: ICU visiting hours are from 11 AM to 1 PM and 4 PM to 6 PM daily, for two visitors at a time. Caller: Okay, thank you.",
    audioUrl: "/audio/mock_call_2.mp3",
    agentId: "A015",
  },
  {
    id: "C003",
    type: "Emergency",
    status: "Flagged by AI",
    cost: 5.80,
    timestamp: "2024-07-28T23:30:00Z",
    duration: 650,
    summary: "Caller reported severe allergic reaction and potential malpractice concerns from a previous visit.",
    transcript: "Caller: Help! I think I'm having a severe allergic reaction. My throat is closing up! This is worse than the malpractice I experienced last time I was at a clinic. Agent: Stay calm, sir. I'm dispatching an ambulance to your location immediately. What's your address? Caller: 123 Main Street. Please hurry!",
    audioUrl: "/audio/mock_call_3.mp3",
    agentId: "A007",
    patientName: "Jane Smith"
  },
  {
    id: "C004",
    type: "Follow-up",
    status: "Pending",
    cost: 0.00, // Pending calls might not have a cost yet
    timestamp: "2024-07-30T09:00:00Z",
    duration: 0,
    summary: "Scheduled follow-up call for lab results discussion.",
    transcript: "N/A - Pending automated call.",
    audioUrl: "",
    agentId: "SYSTEM",
    patientName: "Robert Brown"
  },
  {
    id: "C005",
    type: "Complaint",
    status: "Reviewed",
    cost: 3.10,
    timestamp: "2024-07-27T14:22:00Z",
    duration: 350,
    summary: "Caller complained about long wait times in the ER.",
    transcript: "Caller: I want to file a complaint. I was in the ER yesterday and waited for 5 hours! Agent: I'm very sorry to hear about your experience, ma'am. Can I get some details to forward to our patient advocacy department?",
    audioUrl: "/audio/mock_call_5.mp3",
    agentId: "A012",
  },
  {
    id: "C006",
    type: "Appointment",
    status: "Failed",
    cost: 0.50,
    timestamp: "2024-07-30T13:00:00Z",
    duration: 30,
    summary: "Attempted to call patient for appointment reminder, call failed.",
    transcript: "Automated system: Calling patient... Call failed to connect.",
    audioUrl: "",
    agentId: "SYSTEM",
    patientName: "Lisa White"
  },
];

export const getCallById = (id: string): Call | undefined => {
  return mockCalls.find(call => call.id === id);
};

export const callTypes: CallType[] = ["Emergency", "Enquiry", "Appointment", "Follow-up", "Complaint"];
export const callStatuses: CallStatus[] = ["Completed", "Pending", "Failed", "Flagged by AI", "Reviewed"];


export const mockCallTrendData: CallTrendData[] = [
  { date: "2024-07-24", count: 15, averageCost: 2.10 },
  { date: "2024-07-25", count: 22, averageCost: 2.35 },
  { date: "2024-07-26", count: 18, averageCost: 1.90 },
  { date: "2024-07-27", count: 25, averageCost: 2.55 },
  { date: "2024-07-28", count: 30, averageCost: 2.80 },
  { date: "2024-07-29", count: 20, averageCost: 2.05 },
  { date: "2024-07-30", count: 12, averageCost: 1.80 },
];

export const mockStatusDistribution: StatusDistributionData[] = [
  { status: "Completed", count: 65 },
  { status: "Pending", count: 15 },
  { status: "Failed", count: 5 },
  { status: "Flagged by AI", count: 10 },
  { status: "Reviewed", count: 5 },
];

// Helper to format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper to format duration from seconds to MM:SS
export const formatDuration = (seconds: number) => {
  if (seconds === 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};
