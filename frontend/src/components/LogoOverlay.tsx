'use client';

import React from 'react';

export default function LogoOverlay() {
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[100] p-4 flex justify-between items-start">
      {/* College Logo - Top Left */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform hover:scale-110 pointer-events-auto">
        <img 
          src="/images/college_logo.png" 
          alt="College Logo" 
          width={96}
          height={96}
          className="w-full h-full object-contain drop-shadow-2xl"
          loading="eager"
        />
      </div>

      {/* Dept Logo - Top Right */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform hover:scale-110 pointer-events-auto">
        <img 
          src="/images/dept_logo.png" 
          alt="Department Logo" 
          width={96}
          height={96}
          className="w-full h-full object-contain drop-shadow-2xl"
          loading="eager"
        />
      </div>
    </div>
  );
}
