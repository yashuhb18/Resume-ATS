'use client';

import { motion } from 'framer-motion';
import { 
  Fingerprint, Cpu, Activity,
  Globe, Shield
} from 'lucide-react';
import { useRef } from 'react';

export default function MatrixHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020308]">
      
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020308]/50 to-[#020308] z-10" />
        <img 
          src="/hero_semiconductor_fab_1777720047115.png" 
          alt="Semiconductor Fab"
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ── Floating Tactical Widgets ── */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] p-6 hologram-card group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-tactical text-blue-400">Nodes Active</span>
              <p className="text-white font-black">12,402</p>
            </div>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[40, 70, 45, 90, 65, 80].map((h, i) => (
              <div key={i} className="w-1 bg-blue-500/30 rounded-full" style={{ height: `${h}%` }} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[10%] p-6 hologram-card group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <span className="text-tactical text-purple-400">Market Intel</span>
              <p className="text-white font-black">VLSI_UP +18%</p>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ['0%', '68%'] }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-purple-500 shadow-[0_0_10px_#8b5cf6]" 
            />
          </div>
        </motion.div>
      </div>

      {/* ── Core Narrative ── */}
      <div className="container mx-auto px-6 relative z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,241,0.3)] relative"
            >
              <Fingerprint className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
              Student Intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Hub.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight leading-relaxed">
              Welcome to the centralized intelligence architecture for MITM students. 
              Deploying career trajectories with absolute technical precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button className="px-12 py-5 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95">
              Explore Intelligence Core
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
