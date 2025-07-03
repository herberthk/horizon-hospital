"use client";

import { useEffect, useState } from "react";
import { vapi } from "@/ai/vapi";
import { processCall } from "@/lib/actions/process.action";
import { squadMembers } from "@/constants";

export enum CALL_STATUS {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  LOADING = "LOADING",
  FINISHED = "FINISHED",
  ERROR = "ERROR",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export function useVapi() {
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [callStatus, setCallStatus] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE
  );
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [callId, setCallId] = useState("");

  const sendInfo = async (id: string) => {
    console.log("Call ID:", id);
    try {
      const assessment = await processCall(id);
      console.log("assessment", assessment);
    } catch (error) {
      console.error("Error processing call:", error);
    }
  };

  useEffect(() => {
    const onSpeechStart = () => setAssistantIsSpeaking(true);
    const onSpeechEnd = () => {
      console.log("Speech has ended");
      setIsSpeechActive(false);
      setAssistantIsSpeaking(false);
    };

    const onCallStartHandler = () => {
      console.log("Call has started");
      setCallStatus(CALL_STATUS.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("Call has stopped");
      setCallStatus(CALL_STATUS.FINISHED);
      sendInfo(callId);
    };

    const onVolumeLevel = (volume: number) => {
      setAudioLevel(volume);
    };

    const onMessage = (message: Message) => {
      if (
        message.type === "transcript" &&
        message.transcriptType === "partial"
      ) {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onError = (e: Error) => {
      setCallStatus(CALL_STATUS.ERROR);
      console.error("Error:", e);
    };

    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("call-start", onCallStartHandler);
    vapi.on("call-end", onCallEnd);
    vapi.on("volume-level", onVolumeLevel);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("call-start", onCallStartHandler);
      vapi.off("call-end", onCallEnd);
      vapi.off("volume-level", onVolumeLevel);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
    };
  }, [callId]);

  const start = async () => {
    setCallStatus(CALL_STATUS.LOADING);
    // const res = await vapi.start('2d2fa13b-60d3-4945-916f-3fc8f62f6981');
    const res = await vapi.start(undefined, undefined, {
      name: "Horizon call center",
      //@ts-ignore
      members: squadMembers,
    });
    console.log("call", res?.id);
    if (res?.id) {
      setCallId(res.id);
    }
  };

  const stop = () => {
    setCallStatus(CALL_STATUS.FINISHED);
    vapi.stop();
    sendInfo(callId);
  };

  const toggleCall = () => {
    if (callStatus == CALL_STATUS.ACTIVE) {
      stop();
    } else {
      start();
    }
  };

  return {
    isSpeechActive,
    callStatus,
    audioLevel,
    messages,
    start,
    stop,
    toggleCall,
    assistantIsSpeaking,
    callId,
  };
}
