import React from 'react';

const ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.36 4.42a2.2 2.2 0 0 1 2.07 0l6.32 3.2c.81.41 1.25 1.3 1.25 2.24v5.28a2.2 2.2 0 0 1-1.25 2.24l-6.32 3.2a2.2 2.2 0 0 1-2.07 0l-6.32-3.2A2.2 2.2 0 0 1 3 15.14V9.86a2.2 2.2 0 0 1 1.25-2.24Z" />
    <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);

export default ToothIcon;
