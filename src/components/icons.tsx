import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'hsl(180, 50%, 70%)'}} />
          <stop offset="100%" style={{stopColor: 'hsl(220, 50%, 40%)'}} />
        </linearGradient>
      </defs>
      <g fill="url(#logo-gradient)" stroke="url(#logo-gradient)" strokeWidth="1.5">
        {/* Olive Branch */}
        <path 
          d="M18 52 C 28 50, 40 54, 50 46"
          fill="none"
          strokeLinecap="round"
          strokeWidth="2"
        />
        {/* leaves */}
        <path d="M48,46 C 52 44, 54 40, 50 38" fill="url(#logo-gradient)" />
        <path d="M44,43 C 48 41, 50 37, 46 35" fill="url(#logo-gradient)" />
        <path d="M40,41 C 44 39, 46 35, 42 33" fill="url(#logo-gradient)" />
        <path d="M36,39 C 40 37, 42 33, 38 31" fill="url(#logo-gradient)" />
        <path d="M30,44 C 34 42, 36 38, 32 36" fill="url(#logo-gradient)" />
        <path d="M26,46 C 30 44, 32 40, 28 38" fill="url(#logo-gradient)" />
        <path d="M22,48 C 26 46, 28 42, 24 40" fill="url(#logo-gradient)" />
        {/* berries */}
        <circle cx="21" cy="53" r="2.5" />
        <circle cx="27" cy="55" r="2.5" />
        <circle cx="33" cy="54" r="2.5" />
        <circle cx="39" cy="52" r="2.5" />

        {/* Scale */}
        <path d="M12 10 H 52" strokeLinecap="round" strokeWidth="2.5" />
        <path d="M32 10 V 45" strokeWidth="2.5" />
        <path d="M30 45 h 4" strokeWidth="2.5" />
        
        {/* Left Pan */}
        <path d="M12 12 L 18 28" />
        <path d="M24 12 L 18 28" />
        <path d="M10 30 L 26 30" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Right Pan */}
        <path d="M40 12 L 46 28" />
        <path d="M52 12 L 46 28" />
        <path d="M38 30 L 54 30" strokeWidth="2" strokeLinecap="round"/>

        {/* Centerpiece */}
        <path d="M32 20 C 36 24, 36 30, 32 34 S 28 38, 32 42" fill="none" strokeWidth="2" />
        <circle cx="12" cy="10" r="2.5" fill="url(#logo-gradient)" />
        <circle cx="52" cy="10" r="2.5" fill="url(#logo-gradient)" />
        <circle cx="32" cy="7" r="3" fill="url(#logo-gradient)" />
      </g>
    </svg>
  );
}