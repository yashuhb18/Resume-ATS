'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LogoOverlay() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on HOD Dashboard to prevent overlapping with admin UI
  if (pathname?.startsWith('/hod/dashboard')) return null;

  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[110] transition-all duration-500">
      <div className={`flex justify-between items-center px-6 transition-all duration-500 ${
        isScrolled ? 'pt-4' : 'pt-6'
      }`}>
        {/* College Logo - Top Left */}
        <div className={`transition-all duration-500 flex items-center justify-center pointer-events-auto ${
          isScrolled 
            ? 'w-10 h-10 sm:w-12 sm:h-12' 
            : 'w-24 h-24 sm:w-32 sm:h-32 translate-y-4'
        }`}>
          <img 
            src="/images/college_logo.png" 
            alt="College Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            loading="eager"
          />
        </div>

        {/* Dept Logo - Top Right */}
        <div className={`transition-all duration-500 flex items-center justify-center pointer-events-auto ${
          isScrolled 
            ? 'w-10 h-10 sm:w-12 sm:h-12' 
            : 'w-24 h-24 sm:w-32 sm:h-32 translate-y-4'
        }`}>
          <img 
            src="/images/dept_logo.png" 
            alt="Department Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
