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
          <stop offset="0%" stopColor="hsl(180, 50%, 70%)" />
          <stop offset="100%" stopColor="hsl(220, 50%, 40%)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Olive Branch */}
        <path d="M14 48 C 22 46, 32 52, 44 48" />
        <path d="M42,48 C 48 46, 50 42, 46 40" fill="url(#logo-gradient)"/>
        <path d="M38,45 C 44 43, 46 39, 42 37" fill="url(#logo-gradient)"/>
        <path d="M34,43 C 40 41, 42 37, 38 35" fill="url(#logo-gradient)"/>
        <path d="M28,48 C 32 46, 34 42, 30 40" fill="url(#logo-gradient)"/>
        <path d="M24,50 C 28 48, 30 44, 26 42" fill="url(#logo-gradient)"/>
        {/* berries */}
        <circle cx="20" cy="52" r="2.2" fill="url(#logo-gradient)" />
        <circle cx="25" cy="54" r="2.2" fill="url(#logo-gradient)" />
        <circle cx="31" cy="53" r="2.2" fill="url(#logo-gradient)" />
        <circle cx="37" cy="51" r="2.2" fill="url(#logo-gradient)" />
        
        {/* Scale */}
        <path d="M12 18 H 52" strokeWidth="2" />
        <path d="M32 18 V 40" strokeWidth="2" />
        <path d="M32 12 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0" fill="url(#logo-gradient)" stroke="none"/>
        <circle cx="12" cy="18" r="2" fill="url(#logo-gradient)" stroke="none" />
        <circle cx="52" cy="18" r="2" fill="url(#logo-gradient)" stroke="none" />

        {/* Left Pan */}
        <path d="M12 20 V 24 L 6 28 L 22 28 L 18 24" strokeWidth="1.5" />
        <path d="M6 28 A 12 12 0 0 0 18 28" fill="url(#logo-gradient)" strokeWidth="1.5" />
        
        {/* Right Pan */}
        <path d="M52 20 V 24 L 46 28 L 62 28 L 58 24" strokeWidth="1.5"/>
        <path d="M46 28 A 12 12 0 0 0 58 28" fill="url(#logo-gradient)" strokeWidth="1.5" />

        {/* Centerpiece (Rod of Asclepius inspired) */}
        <path d="M28,26 C 36,22 36,34 28,38" />
        <path d="M36,26 C 28,22 28,34 36,38" />
      </g>
    </svg>
  );
}