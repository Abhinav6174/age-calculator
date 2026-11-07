import React from 'react';

export function Logo({ className = 'h-11 w-11' }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md transition-transform hover:scale-105 duration-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Background Squircle */}
        <rect x="4" y="4" width="92" height="92" rx="22" fill="url(#logoBg)" />
        
        {/* Border shine */}
        <rect x="5" y="5" width="90" height="90" rx="21" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />

        {/* Calendar page silhouette */}
        <path
          d="M26 30 C26 26, 28 24, 32 24 L68 24 C72 24, 74 26, 74 30 L74 72 C74 76, 72 78, 68 78 L32 78 C28 78, 26 76, 26 72 Z"
          fill="#FFFFFF"
          fillOpacity="0.12"
        />

        {/* Calendar top pins */}
        <rect x="34" y="19" width="6" height="9" rx="3" fill="#FFFFFF" />
        <rect x="60" y="19" width="6" height="9" rx="3" fill="#FFFFFF" />

        {/* Clock circle */}
        <circle cx="50" cy="54" r="22" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

        {/* Clock ticks */}
        <line x1="50" y1="36" x2="50" y2="39" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="54" x2="65" y2="54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="72" x2="50" y2="69" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="54" x2="35" y2="54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* Clock hands pointing to 10:10 */}
        <line x1="50" y1="54" x2="40" y2="44" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="50" y1="54" x2="63" y2="47" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="50" cy="54" r="3.5" fill="#FFFFFF" />

        {/* Golden Celebration Sparkle */}
        <path d="M76 21 Q76 27 82 27 Q76 27 76 33 Q76 27 70 27 Q76 27 76 21 Z" fill="#FDE047" />
      </svg>
    </div>
  );
}
