import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement> & {className?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <g fill="currentColor" stroke="none">
        {/* Base */}
        <rect x="47" y="80" width="6" height="10" rx="2" />
        <rect x="30" y="90" width="40" height="5" rx="2" />

        {/* Vertical Beam */}
        <rect x="47" y="10" width="6" height="75" rx="2" />

        {/* Horizontal Beam */}
        <rect x="10" y="10" width="80" height="6" rx="2" />

        {/* Left Scale */}
        <path d="M 15 20 L 15 30 L 25 45 L 35 30 L 35 20 Z" stroke="currentColor" strokeWidth="4" fill="none" />
        <circle cx="25" cy="13" r="3" fill="currentColor" />

        {/* Right Scale */}
        <path d="M 65 20 L 65 30 L 75 45 L 85 30 L 85 20 Z" stroke="currentColor" strokeWidth="4" fill="none" />
        <circle cx="75" cy="13" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}


export function ChatbotLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      {/* Speech bubble body */}
      <path
        d="M85.9,7.5H14.1C10.2,7.5,7,10.7,7,14.6v53.8c0,3.9,3.2,7.1,7.1,7.1h53.6l19.1,12V14.6 C86.8,10.7,85.9,7.5,85.9,7.5z"
        fill="#F3F4F6" /* Equivalent to Tailwind's gray-100 */
      />

      {/* Main robot head outline */}
      <path
        d="M74,21.3H26c-3.9,0-7,3.1-7,7v32.4c0,3.9,3.1,7,7,7h48c3.9,0,7-3.1,7-7V28.3C81,24.4,77.9,21.3,74,21.3z"
        fill="#E5E7EB" /* Equivalent to Tailwind's gray-200 */
      />

      {/* Screen */}
      <path
        d="M72,26.5H28c-2.2,0-4,1.8-4,4v28c0,2.2,1.8,4,4,4h44c2.2,0,4-1.8,4-4v-28C76,28.3,74.2,26.5,72,26.5z"
        fill="#1E293B" /* Dark blue, slate-800 */
      />

      {/* Ears */}
      <path d="M19,40.5h-4c-1.1,0-2-0.9-2-2v-8c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v8C21,39.6,20.1,40.5,19,40.5z" fill="#3B82F6" />
      <path d="M85,40.5h-4c-1.1,0-2-0.9-2-2v-8c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v8C87,39.6,86.1,40.5,85,40.5z" fill="#3B82F6" />

      {/* Antenna */}
      <path d="M52,21.3h-4c-1.1,0-2-0.9-2-2v-5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v5C54,20.4,53.1,21.3,52,21.3z" fill="#3B82F6" />
      <circle cx="50" cy="9.8" r="4.5" fill="#3B82F6" />

      {/* Face features */}
      <path d="M43,37.5c-1.1,0-2-0.9-2-2v-11c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2v11c0,1.1-0.9,2-2,2H43z" fill="#60A5FA" />
      <path d="M65.4,36.6c-0.8-0.8-0.8-2,0-2.8l5-5c0.8-0.8,2-0.8,2.8,0c0.8,0.8,0.8,2,0,2.8l-5,5 C67.4,37.4,66.2,37.4,65.4,36.6z" fill="#60A5FA" />
      <path d="M59.2,36.6c-0.8-0.8-0.8-2,0-2.8l5-5c0.8-0.8,2-0.8,2.8,0c0.8,0.8,0.8,2,0,2.8l-5,5 C61.2,37.4,60,37.4,59.2,36.6z" fill="#60A5FA" />
      <path d="M57.5,53.5c-5.5,0-10-4.5-10-10h20C67.5,49,63,53.5,57.5,53.5z" fill="#60A5FA" />
    </svg>
  );
}