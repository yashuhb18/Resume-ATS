'use client';

import React from 'react';

export default function LogoOverlay() {
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[100] p-6 flex justify-between items-start">
      {/* College Logo - Top Left */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center transition-transform hover:scale-110 pointer-events-auto">
        <img 
          src="/images/college_logo.png" 
          alt="College Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          loading="eager"
        />
      </div>

      {/* Dept Logo - Top Right */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center transition-transform hover:scale-110 pointer-events-auto">
        <img 
          src="/images/dept_logo.png" 
          alt="Department Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          loading="eager"
        />
      </div>
    </div>
  );
}
