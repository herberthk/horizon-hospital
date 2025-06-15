'use server';

import { db } from '@/firebase/admin';
type mockData = {
    date: string
    cost: number;
}

// Create a mock dataset with at least 3 items on same date
const mockCallTrendData: mockData[] = [
    { date: "2024-07-24", cost: 2.10 },
    { date: "2024-07-24", cost: 2.10 },
    { date: "2024-07-24", cost: 2.10 },
    { date: "2024-07-25", cost: 2.35 },
    { date: "2024-07-25", cost: 2.35 },
    { date: "2024-07-26", cost: 1.90 },
    { date: "2024-07-26", cost: 1.90 },
    { date: "2024-07-27", cost: 2.55 },
    { date: "2024-07-27", cost: 2.55 },
    { date: "2024-07-27", cost: 2.55 },
    { date: "2024-07-28", cost: 2.80 },
    { date: "2024-07-28", cost: 2.80 },
    { date: "2024-07-28", cost: 2.80 },
    { date: "2024-07-29", cost: 2.05 },
    { date: "2024-07-29", cost: 2.05 },
    { date: "2024-07-29", cost: 2.05 },
    { date: "2024-07-30", cost: 1.80 },
    { date: "2024-07-30", cost: 1.80 },
    { date: "2024-07-30", cost: 1.80 },
    
];

export const seedCallTrendData = async () => {
    try {
    const batch = db.batch();

    mockCallTrendData.forEach((data) => {
        const docRef = db.collection("callTrends").doc();
        batch.set(docRef, data);
    });

    await batch.commit();
    console.log('Call trend data seeded');
    } catch (error) {
        console.error('Failed to seed call trend data:', error);
        throw error;
    }
};

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

 const mockCalls: Call[] = [
  {
    id: "C001",
    type: "phoneCall",
    status: "Completed",
    cost: 2.50,
    timestamp: "2024-07-29T10:15:00Z",
    duration: "00:05:00",
    summary: mockSummary,
    transcript: mockTranscript,
    recordingUrl: "/audio/mock_call_1.mp3",
    endedReason: "customer-ended-call",
    endedAt: "2024-07-29T10:20:00Z"
    // agentId: "A012",
    // patientName: "John Doe"
  },
  {
    id: "C002",
    type: "Enquiry",
    status: "Completed",
    cost: 1.20,
    timestamp: "2024-07-29T11:05:00Z",
    duration:   "00:02:00",
    summary: "Caller enquired about visiting hours for the ICU.",
    transcript: "Agent: Horizon Hospital, Emily speaking. Caller: Hi, what are the ICU visiting hours? Agent: ICU visiting hours are from 11 AM to 1 PM and 4 PM to 6 PM daily, for two visitors at a time. Caller: Okay, thank you.",
    recordingUrl: "/audio/mock_call_2.mp3",
    endedReason: "customer-ended-call",
    endedAt: "2024-07-29T11:07:00Z"
    // agentId: "A015",
  },
  {
    id: "C003",
    type: "phoneCall",
    status: "Flagged by AI",
    cost: 5.80,
    timestamp: "2024-07-28T23:30:00Z",
    duration: "00:10:50",
    summary: "Caller reported severe allergic reaction and potential malpractice concerns from a previous visit.",
    transcript: "Caller: Help! I think I'm having a severe allergic reaction. My throat is closing up! This is worse than the malpractice I experienced last time I was at a clinic. Agent: Stay calm, sir. I'm dispatching an ambulance to your location immediately. What's your address? Caller: 123 Main Street. Please hurry!",
    recordingUrl: "/audio/mock_call_3.mp3",
    endedReason: "customer-ended-call",
    endedAt: "2024-07-28T23:40:50Z"
    // agentId: "A007",
    // patientName: "Jane Smith"
  },
  {
    id: "C004",
    type: "Follow-up",
    status: "Pending",
    cost: 0.00, // Pending calls might not have a cost yet
    timestamp: "2024-07-30T09:00:00Z",
    duration: "00:00:00",
    summary: "Scheduled follow-up call for lab results discussion.",
    transcript: "N/A - Pending automated call.",
    recordingUrl: "",
    endedReason: "customer-ended-call",
    endedAt: "2024-07-30T09:00:00Z"
    // agentId: "SYSTEM",
    // patientName: "Robert Brown"
  },
  {
    id: "C005",
    type: "phoneCall",
    status: "Reviewed",
    cost: 3.10,
    timestamp: "2024-07-27T14:22:00Z",
    duration: "00:05:50",
    summary: "Caller complained about long wait times in the ER.",
    transcript: "Caller: I want to file a complaint. I was in the ER yesterday and waited for 5 hours! Agent: I'm very sorry to hear about your experience, ma'am. Can I get some details to forward to our patient advocacy department?",
    recordingUrl: "/audio/mock_call_5.mp3",
    agentId: "A012",
    endedReason: "customer-ended-call",
    endedAt: "2024-07-27T14:27:50Z"
  },
  {
    id: "C006",
    type: "webCall",
    status: "Failed",
    cost: 0.50,
    timestamp: "2024-07-30T13:00:00Z",
    duration: "00:00:30",
    summary: "Attempted to call patient for appointment reminder, call failed.",
    transcript: "Automated system: Calling patient... Call failed to connect.",
    recordingUrl: "",
    endedReason: "customer-ended-call",
    endedAt: "2024-07-30T13:00:30Z"
    // agentId: "SYSTEM",
    // patientName: "Lisa White"
  },
];

export const seedCalls = async () => {
    try {
        const batch = db.batch();

        mockCalls.forEach((call) => {
            const docRef = db.collection("calls").doc();
            batch.set(docRef, call);
        });

        await batch.commit();
        console.log('Calls seeded');
    } catch (error) {
        console.error('Failed to seed calls:', error);
        throw error;
    }
};