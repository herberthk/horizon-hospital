import React from 'react'
import { PhoneCall } from 'lucide-react';
const numBars = 10;
type VolumeLevelProps = {
  volume?: number; // Volume level between 0 and 1
}

const VolumeLevel: React.FC<VolumeLevelProps> = ({ volume = 10 }) => {
   return (
    <div className="volume-level mb-7 flex items-center justify-center">
        <PhoneCall size={50} className='mr-2' color="#16a085" strokeWidth={3} />
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
    </div>)
}

export default VolumeLevel