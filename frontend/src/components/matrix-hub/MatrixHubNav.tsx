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
        isScrolled ? 'h-20 bg-[#020308]/80 border-b border-white/5' : 'h-24 bg-transparent'
      }`}
    >
      <div className="container mx-auto h-full px-6 flex items-center justify-between">
        
        {/* ── Brand ── */}
        <div className="w-48" aria-hidden />

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-8">
           {[
             { label: 'Global Field', id: '#global' },
             { label: 'Academics',    id: '#academics' },
             { label: 'Placements',   id: '#placements' },
             { label: 'Nimma-AI',     id: '#ai' }
           ].map((item) => (
             <a 
               key={item.label} 
               href={item.id} 
               className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
             >
               {item.label}
             </a>
           ))}
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-4 mr-16">
          <Link 
            href="/"
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
          >
            Exit Matrix
          </Link>
        </div>
      </div>
    </nav>
  );
}
