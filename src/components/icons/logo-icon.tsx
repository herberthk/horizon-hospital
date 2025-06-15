import React from 'react';

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  // You can add specific props here if needed
}

const LogoIcon: React.FC<LogoIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    width="150"
    height="37.5"
    aria-label="Horizon Hospital Logo"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M10 40 Q15 10 20 40 Q25 10 30 40" stroke="url(#logoGradient)" fill="none" strokeWidth="3" />
    <path d="M20 25 H40 M30 15 V35" stroke="url(#logoGradient)" fill="none" strokeWidth="3" />
    <text
      x="50"
      y="35"
      fontFamily="var(--font-geist-sans), Arial, sans-serif"
      fontSize="30"
      fontWeight="bold"
      fill="currentColor"
    >
      Horizon
    </text>
  </svg>
);

export default LogoIcon;
