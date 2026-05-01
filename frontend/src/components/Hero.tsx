'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, ChevronDown, Cpu, Activity, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#05070a]">
      
      {/* Structural Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content: Authority & Precision */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="h-px w-8 bg-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                Industry Intelligence Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight"
            >
              The Next Era of <br />
              <span className="text-indigo-500">Career Sync.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-xl mb-12 leading-relaxed"
            >
              Nimma-MITra provides professional-grade intelligence roadmaps and real-time domain briefings for the global semiconductor and electronics workforce.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <a href="#upload" className="btn-primary">
                Analyze My Resume
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/roadmap" className="btn-secondary">
                View Career Roadmaps
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex items-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Real-time</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Visual Column */}
          <div className="relative perspective-[2000px] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full aspect-square flex items-center justify-center"
            >
              {/* The "Intelligence Core" - 3D Floating Structure */}
              <div className="relative w-96 h-96 animate-float">
                
                {/* Main Card */}
                <div className="absolute inset-0 card-3d flex flex-col p-10 justify-between bg-gradient-to-br from-[#111420] to-[#0a0c14] border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                      <Cpu className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        SYNCED
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-4xl font-black mb-4 tracking-tighter">98%</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Market Alignment Quotient</p>
                    <div className="space-y-3">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "98%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-indigo-500" 
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-black text-slate-600">
                        <span>BASELINE</span>
                        <span>TARGET ATTAINED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Satellite Card 1 */}
                <motion.div
                  animate={{ 
                    translateZ: [20, 60, 20], 
                    rotateY: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 w-48 h-32 card-3d bg-indigo-500 p-6 flex flex-col justify-between shadow-2xl shadow-indigo-500/20"
                >
                  <Zap className="w-6 h-6 text-white animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-white/80 leading-tight">Instant Pulse <br /> Detection</span>
                </motion.div>

                {/* Orbiting Satellite Card 2 */}
                <motion.div
                  animate={{ 
                    translateZ: [60, 20, 60], 
                    rotateX: [0, -10, 10, 0],
                    y: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-6 -left-10 w-56 h-40 card-3d p-8 border-white/10 bg-[#111420]/80 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Domain Feed</span>
                  </div>
                  <div className="space-y-2">
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-2 w-full bg-white/10 rounded-full" 
                    />
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="h-2 w-2/3 bg-white/10 rounded-full" 
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

    </section>
  );
}
