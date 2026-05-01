'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, ChevronDown, Rocket, Compass, Cpu, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* Dynamic Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 text-left">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-intelligence mb-8 inline-block"
            >
              Hardware Intelligence Engine // v2.4
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gradient mb-8 leading-[0.9] tracking-[-0.06em]"
            >
              Design Your <br />
              <span className="text-white italic">Hardware</span> <br />
              Legacy.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 font-medium leading-relaxed"
            >
              Nimma-MITra is the world&apos;s first autonomous career architect for ECE & EEE pioneers. We don&apos;t just analyze—we synchronize your skills with the global silicon pulse.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <a href="#upload" className="btn-primary group">
                <span className="flex items-center gap-3">
                  Scan Technical DNA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <Link href="/roadmap" className="btn-secondary group">
                <span className="flex items-center gap-3">
                  Generate Roadmap
                  <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8"
            >
              {[
                { label: 'Domains', val: '5+', icon: Cpu },
                { label: 'Resources', val: '500+', icon: Zap },
                { label: 'Security', val: '100%', icon: Shield },
              ].map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-indigo-400 mb-1">
                    <s.icon className="w-4 h-4" />
                    <span className="text-xl font-bold text-white">{s.val}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative"
            >
              {/* Intelligence Core Visual */}
              <div className="w-[480px] h-[480px] relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-[4rem] blur-[100px] animate-pulse" />
                
                {/* Floating Glass Panels */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-64 h-80 card-glass rounded-[3rem] p-8 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-bold mb-2">VLSI Arch</h4>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-indigo-500" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-10 left-0 w-56 h-64 card-glass rounded-[2.5rem] p-8 border-indigo-500/20"
                >
                   <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 leading-tight uppercase tracking-widest">Real-time Pulse Detected</p>
                  <h3 className="text-white text-2xl font-black mt-2">ACTIVE</h3>
                </motion.div>

                {/* Central Orbit */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-indigo-600/30 blur-2xl animate-ping" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Initialize Dive</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>

    </section>
  );
}
