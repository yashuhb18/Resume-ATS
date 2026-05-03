'use client';

import React from 'react';

export default function LogoOverlay() {
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[100] px-6 py-4 flex justify-between items-start">
      {/* College Logo - Top Left */}
      <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-transform hover:scale-105 pointer-events-auto">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
          <img 
            src="/images/college_logo.png" 
            alt="College Logo" 
            className="w-10 h-10 object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
        <div className="hidden sm:block">
          <p className="text-[10px] font-black uppercase tracking-wider text-white leading-tight">
            MIT Mysore
          </p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            Institutional Partner
          </p>
        </div>
      </div>

      {/* Dept Logo - Top Right */}
      <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-transform hover:scale-105 pointer-events-auto">
        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-black uppercase tracking-wider text-white leading-tight">
            ECE Dept
          </p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            Academic Excellence
          </p>
        </div>
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
          <img 
            src="/images/dept_logo.png" 
            alt="Department Logo" 
            className="w-10 h-10 object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      </div>
    </div>
  );
}
