import React from "react";
import { Phone, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
const numBars = 10;
type VolumeLevelProps = {
  volume?: number; // Volume level between 0 and 1
};

const VolumeLevel: React.FC<VolumeLevelProps> = ({ volume = 10 }) => {
  return (
    <div className="mb-7 flex items-center justify-center gap-3">
      {/* <Button
        className="h-16 w-16 rounded-full shadow-xl z-50 flex items-center justify-center bg-primary text-white"
        aria-label="Call indicator"
      >
        <Phone className="h-8 w-8" />
      </Button> */}
      <PhoneCall size={50} className="mr-2" color="#2563eb" strokeWidth={3} />
      {/* <div className="relative flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div> */}
      <div className="volume-bars">
        {Array.from({ length: numBars }, (_, i) => {
          return (
            <div
              key={i}
              className={`volume-bar ${i / numBars < volume ? "active" : ""}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default VolumeLevel;
