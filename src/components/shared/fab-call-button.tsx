
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import CallModal from './call-modal';

const FabCallButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFabClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full hover:bg-primary/80 shadow-xl z-50 flex items-center justify-center bg-primary text-white"
        onClick={handleFabClick}
        aria-label="Call Customer Care"
      >
        <Phone className="h-8 w-8" />
      </Button>
      <CallModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default FabCallButton;
