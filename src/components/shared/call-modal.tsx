"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import RingingAnimation from "./ringing-animation";
import { useVapi } from "@/hooks/useVapi";
import VolumeLevel from "./VolumeLevel";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const {
    callStatus,
    assistantIsSpeaking,
    audioLevel,
    messages,
    start,
    stop,
    callId,
  } = useVapi();
  const [lastMessage, setLastMessage] = useState<string>("");
  const audioRef = useRef(new Audio("/assets/phone-ring.mp3"));

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (callStatus === "LOADING") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [callStatus]);

  useEffect(() => {
    if (isOpen) {
      start(); // Start the call using the vapi instance
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      stop(); // Stop the call when the modal is closed
    }
  }, [isOpen]);

  useEffect(() => {
    if (callStatus === "FINISHED") {
      onClose(); // Call the onClose function when the call is finished
    }
  }, [callStatus]);

  const handleClose = () => {
    stop(); // Stop the call using the vapi instance
    onClose();
  };

  // console.log("callId", callId);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground rounded-lg shadow-xl">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-center text-lg italic font-semibold text-foreground">
            {callStatus === "LOADING"
              ? "Calling ai assistant..."
              : callStatus === "ERROR"
              ? "Something went wrong"
              : assistantIsSpeaking
              ? "AI assistant is speaking..."
              : "You're speaking with AI assistant"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground italic px-4">
            {callStatus === "LOADING"
              ? "Getting things ready, please wait a moment."
              : callStatus === "ERROR"
              ? "Something strange has happened, please try again later."
              : "You're in call with our AI assistant."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-8 flex flex-col items-center justify-center min-h-[150px]">
          {
            // callStatus === "LOADING" && (<Loader2 className="h-16 w-16 animate-spin text-primary" />)
            callStatus === "LOADING" && <RingingAnimation />
          }

          {callStatus === "ACTIVE" && (
            <div className="flex items-center justify-center w-full h-20">
              <p className="text-center text-base italic p-4">{lastMessage}</p>
            </div>
          )}
          {callStatus === "ACTIVE" && <VolumeLevel volume={audioLevel} />}
          {callStatus === "ACTIVE" && (
            <Button
              size="lg"
              className="bg-red-500 text-white rounded-full p-6 hover:bg-red-400 shadow-md transition-transform hover:scale-105"
              onClick={handleClose}
            >
              <Phone className="h-7 w-7 mr-3" />
              End Call
            </Button>
          )}
        </div>
        {callStatus === "INACTIVE" && ( // Show cancel button if not loading or not in the middle of "calling"
          <DialogFooter className="pb-6 px-6">
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogFooter>
        )}
        {/* If you want to allow closing during the "calling" state, adjust the condition above or add another close button */}
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;
