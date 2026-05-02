'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Globe, Shield, 
  Terminal, LayoutGrid, Brain,
  Activity, Zap, Search
} from 'lucide-react';
import Link from 'next/link';

export default function MatrixHubNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'h-20 bg-[#020308]/80 backdrop-blur-2xl border-b border-white/5' : 'h-24 bg-transparent'
      }`}
    >
      <div className="container mx-auto h-full px-6 flex items-center justify-between">
        
        {/* ── Brand ── */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter uppercase leading-none italic">
              Nimma <span className="text-blue-500">MITra.</span>
            </span>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">
              Matrix_OS_v4.2.0
            </span>
          </div>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-8">
           {['Matrix', 'Trajectory', 'DNA_Scan', 'Oracle'].map((item) => (
             <Link 
               key={item} 
               href="#" 
               className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
             >
               {item}
             </Link>
           ))}
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
          >
            Exit Matrix
          </Link>
          <button className="matrix-btn !px-6 !py-3 !text-[10px] hidden sm:flex">
            Initialize_Sync
          </button>
        </div>
      </div>
    </nav>
  );
}
