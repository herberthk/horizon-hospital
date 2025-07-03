"use server";

import axios from "axios";
import { db } from "@/firebase/admin";
import { flagRiskyCalls } from "@/ai/flows/flag-risky-calls";
import { config } from "dotenv";
import { getCallDuration } from "..";

config();

/** Base URL for the VAPI API calls */
const BASE_URL = "https://api.vapi.ai/call";

/**
 * Utility function to create a delay in milliseconds
 * @param ms - Number of milliseconds to delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Extended Call type with additional timing properties */
type ModifiedCall = Call & { endedAt: string; startedAt: string };

/** Interface for call trend analytics data */
export interface CallTrendData {
  date: string;
  count: number;
  averageCost: number;
}

/**
 * Fetches a specific call by its ID from the VAPI API
 * @param id - The unique identifier of the call
 * @returns Promise containing call data or undefined
 */
const getCallById = async (id: string): Promise<Call | undefined> => {
  const API_KEY = process.env.VAPI_PRIVATE_KEY;
  //  console.log("VAPI_PRIVATE_KEY", API_KEY);
  console.log("getCallById", id);

  if (!API_KEY || !id) {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = res.data as ModifiedCall;
    return {
      id: data.id,
      type: data.type,
      transcript: data.transcript,
      recordingUrl: data.recordingUrl,
      summary: data.summary,
      timestamp: data.startedAt,
      cost: data.cost,
      status: data.status,
      endedAt: data.endedAt,
      endedReason: data.endedReason,
      duration: getCallDuration(data.startedAt, data?.endedAt),
    };
  } catch (error) {
    console.log("Error fetching call:", error);
    throw new Error("Call not found");
  }
};

/**
 * Polls for call results until completion or timeout
 * @param id - Call ID to poll for
 * @param maxAttempts - Maximum number of polling attempts
 * @returns Promise containing call data or undefined
 */
const pollForCallResults = async (
  id: string,
  maxAttempts = 10
): Promise<Call | undefined> => {
  const API_KEY = process.env.VAPI_PRIVATE_KEY;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      if (!API_KEY || !id) {
        return;
      }
      const call = await getCallById(id);
      if (call && call.endedAt) {
        return call;
      }
    } catch (error) {
      console.error(`Error on attempt ${attempts + 1}:`, error);
    }

    attempts++;
    console.log("Attempts", attempts);
    await delay(2500);
  }

  throw new Error("Max polling attempts reached. Call processing timeout.");
};

/**
 * Processes a call and saves it to the database
 * @param callId - ID of the call to process
 * @returns Processed call data
 */
export const processCall = async (callId: string) => {
  try {
    const call = await pollForCallResults(callId);
    if (!call) {
      return;
    }

    // check if call exists in db
    const callRecord = await db.collection("calls").doc(callId).get();
    if (callRecord.exists) {
      return;
    }
    // save user to db
    await db
      .collection("calls")
      .doc(callId)
      .set({
        ...call,
      });
    console.log("Call successfully saved to database");

    //Save cost trend
    await db.collection("callTrends").add({
      date: call.timestamp.split("T")[0],
      cost: call.cost,
    });
    console.log("Call trend saved to database");
    // console.log("Call retrieved:", call);
    return call;
  } catch (error) {
    console.error("Failed to process call:", error);
    throw error;
  }
};

/**
 * Retrieves call information from the database
 * @param callId - ID of the call to retrieve
 * @returns Promise containing call data
 */
export const getCallInformation = async (callId: string): Promise<Call> => {
  try {
    const callRecord = await db.collection("calls").doc(callId).get();
    if (!callRecord.exists) {
      throw new Error("Call not found");
    }
    return callRecord.data() as Call;
  } catch (error) {
    console.error("Failed to get call information:", error);
    throw error;
  }
};

/**
 * Retrieves all calls from the database, ordered by timestamp
 * @returns Array of all calls
 */
export const getAllCalls = async () => {
  try {
    const calls = await db
      .collection("calls")
      .orderBy("timestamp", "desc")
      .get();
    return calls.docs.map(
      (call) => ({ ...call.data(), id: call.data().id } as Call)
    );
  } catch (error) {
    console.error("Failed to get all calls:", error);
    throw error;
  }
};

/**
 * Fetches and calculates call trend data
 * @returns Array of trend data including dates, counts, and average costs
 */
export const fetchCallTrendData = async (): Promise<CallTrendData[]> => {
  const snapshot = await db.collection("callTrends").get();

  const trendMap: Record<string, { count: number; totalCost: number }> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const date = data.date;
    const cost = data.cost;

    if (!date || typeof cost !== "number") return;

    if (!trendMap[date]) {
      trendMap[date] = { count: 0, totalCost: 0 };
    }

    trendMap[date].count++;
    trendMap[date].totalCost += cost;
  });

  const trendData: CallTrendData[] = Object.entries(trendMap)
    .map(([date, { count, totalCost }]) => ({
      date,
      count,
      averageCost: parseFloat((totalCost / count).toFixed(2)),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return trendData;
};

/**
 * Updates the status of a call in the database
 * @param callId - ID of the call to update
 * @param status - New status to set
 */
export const updateCallStatus = async (callId: string, status: CallStatus) => {
  try {
    await db.collection("calls").doc(callId).update({
      status,
    });
    console.log("Call status updated");
  } catch (error) {
    console.error("Failed to update call status:", error);
    throw error;
  }
};

/**
 * Fetches and calculates the distribution of call statuses
 * @returns Array of status counts
 */
export const fetchCallStatusDistribution = async () => {
  const statusCounts: Record<string, number> = {
    Completed: 0,
    Pending: 0,
    Failed: 0,
    "Flagged by AI": 0,
    Reviewed: 0,
    ended: 0,
  };

  try {
    const snapshot = await db.collection("calls").get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      const status = data.status;
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status] += 1;
      }
    });

    const result = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));

    return result;
  } catch (error) {
    console.error("Error fetching status distribution:", error);
    throw error;
  }
};
