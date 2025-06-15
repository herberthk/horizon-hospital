
import React from 'react';

const WaveAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-end space-x-1.5 h-12">
      <div className="w-2.5 h-4 !bg-primary rounded-full animate-wave-ping" style={{ animationDelay: '0s' }}></div>
      <div className="w-2.5 h-6 !bg-primary rounded-full animate-wave-ping" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2.5 h-8 !bg-primary rounded-full animate-wave-ping" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2.5 h-6 !bg-primary rounded-full animate-wave-ping" style={{ animationDelay: '0.3s' }}></div>
      <div className="w-2.5 h-4 !bg-primary rounded-full animate-wave-ping" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default WaveAnimation;
