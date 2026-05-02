'use client';

import { 
  Zap, Github, Twitter, 
  Linkedin, Shield, Radio,
  Activity, Layers
} from 'lucide-react';
import Link from 'next/link';

export default function MatrixFooter() {
  return (
    <footer className="bg-[#020308] pt-32 pb-12 relative overflow-hidden">
      
      {/* ── Top Glow ── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand & Mission */}
          <div className="space-y-8 lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
                Nimma <span className="text-blue-500">MITra.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
              "Redefining Electronics & Communication Engineering careers through autonomous intelligence and real-time matrix analytics."
            </p>
          </div>

          {/* Neural Links */}
          <div className="space-y-8">
            <h4 className="text-tactical text-blue-400">Intelligence Nodes</h4>
            <ul className="space-y-4">
              {['Global Matrix', 'Neural Trajectory', 'DNA Scanning', 'Career Oracle', 'Talent Pipeline'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-slate-500 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Protocol */}
          <div className="space-y-8">
            <h4 className="text-tactical text-blue-400">Core Protocol</h4>
            <ul className="space-y-4">
              {['Security Layer', 'Privacy Shield', 'Data Ethics', 'System Status', 'API Access'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-slate-500 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Status */}
          <div className="space-y-8">
            <h4 className="text-tactical text-blue-400">Operational Status</h4>
            <div className="hologram-card p-6 bg-[#0a0c14]/50 space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-600 uppercase">Core Link</span>
                 <span className="text-emerald-500 font-black text-[10px] uppercase">STABLE</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-600 uppercase">Intelligence Nodes</span>
                 <span className="text-white font-black text-[10px] uppercase">1,240 Online</span>
               </div>
               <div className="h-px w-full bg-white/5" />
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Global Sync in Progress...</span>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">End-to-End Encryption Active</span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Neural Sync 4.2.0</span>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            © 2026 Nimma-Mitra Tactical Systems. Built for Engineers.
          </div>
        </div>
      </div>
    </footer>
  );
}
