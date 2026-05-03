'use client';

import { motion } from 'framer-motion';
import { 
  Globe, Zap, Activity, 
  MapPin, Shield, Radio,
  TrendingUp, BarChart3
} from 'lucide-react';
import MatrixIntelligenceFeed from './MatrixIntelligenceFeed';

export default function MatrixGlobalGrid() {
  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden">
      
      {/* ── Background Grid Infrastructure ── */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Tactical Readout */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-tactical text-blue-400 uppercase tracking-widest">Global Field</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                The World's <br />
                <span className="text-blue-500 text-6xl md:text-8xl italic">EC Matrix.</span>
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Nimma Mitra's global intelligence engine tracks semiconductor hiring across 42 countries, 
                detecting high-momentum clusters before they hit traditional job boards.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'USA - Silicon Valley', status: 'CRITICAL DEMAND', val: 94 },
                { label: 'Germany - Munich Lab', status: 'STEADY GROWTH', val: 78 },
                { label: 'India - Bangalore Hub', status: 'HYPER EXPANSION', val: 98 },
                { label: 'Taiwan - Hsinchu Fab', status: 'TALENT SHORTAGE', val: 92 },
              ].map((loc, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-all cursor-default">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">{loc.label}</span>
                    <span className="text-xs font-black text-blue-400">{loc.status}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-white">{loc.val}% Match</span>
                    <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${loc.val}%` }}
                        className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,241,0.5)]" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Immersive World Visualizer */}
          <div className="lg:col-span-7 relative">
            <div className="hologram-card p-12 bg-[#0a0c14]/40 relative overflow-hidden group">
              
              <div className="relative z-10 h-[600px]">
                <MatrixIntelligenceFeed />
              </div>

              {/* Data Overlays */}
              <div className="absolute bottom-6 left-6 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-tactical text-slate-600">Sync Status</span>
                  <span className="text-emerald-400 font-bold text-xs uppercase">Encrypted_Link_Active</span>
                </div>
                <div className="h-8 w-px bg-white/5" />
                <div className="flex flex-col">
                  <span className="text-tactical text-slate-600">Baud Rate</span>
                  <span className="text-white font-bold text-xs">1,240 Gbit/s</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
