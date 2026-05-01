'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap, ChevronDown, Rocket, Compass, Cpu } from 'lucide-react';
import Link from 'next/link';

const intelligenceItems = [
  { icon: Cpu,           label: 'Domain Intelligence 🧠', color: 'var(--accent-ice)' },
  { icon: Rocket,        label: 'Career Accelerator 🚀',  color: 'var(--emerald-neon)' },
  { icon: Compass,       label: 'Real-time Guidance 🧭',   color: 'var(--violet-electric)' },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero min-h-[90vh] flex flex-col justify-center">

      {/* Morphing blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="blob blob-brand absolute w-[600px] h-[600px] -top-32 -left-24 opacity-20" />
        <div className="blob blob-violet absolute w-[500px] h-[500px] -bottom-16 -right-20 opacity-15" style={{ animationDelay: '2s' }} />
        <div className="blob blob-accent absolute w-[300px] h-[300px] top-1/3 right-1/4 opacity-10" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full mb-8 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--emerald-neon)] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Intelligence Engine v2.0
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display mb-6 text-6xl md:text-8xl font-black tracking-tighter"
            style={{ color: 'var(--text-primary)' }}
          >
            Engineering Your
            <br />
            <span className="text-gradient">Hardware Mastery</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Welcome to <span className="text-white font-bold">Nimma-MITra</span>. Beyond the ATS lens—we provide real-time ECE intelligence, live career roadmaps, and a direct pulse on the global hardware market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex justify-center mb-10"
          >
            <a 
              href="#ece-hub" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border bg-indigo-500/5 backdrop-blur-xl hover:bg-indigo-500/10 transition-all group border-indigo-500/30"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-sm font-bold text-indigo-200 uppercase tracking-widest">
                Optimized for Semiconductor & Embedded Ecosystems
              </span>
              <ChevronDown className="w-4 h-4 text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#upload" className="btn-primary text-xl px-10 py-5 inline-flex items-center gap-3 group shadow-2xl shadow-indigo-500/20">
              Start Intelligence Scan
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/roadmap" className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
              Initialize Roadmap
            </Link>
          </motion.div>

          {/* New Intelligence Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-10 mt-16"
          >
            {intelligenceItems.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-3 group cursor-default" style={{ color: 'var(--text-secondary)' }}>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5">
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Privacy & Trust */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200/60">
              Ephemeral Security: Your data is never persisted.
            </span>
          </motion.div>
        </div>

        {/* Dashboard Mockup - Refined */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-indigo-500/10 rounded-[2.5rem] blur-[80px]" />
          <div className="relative bg-black/40 border border-white/10 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden backdrop-blur-md">
             <div className="bg-[#050505] rounded-[2.25rem] p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                         <span className="text-3xl font-black text-white tracking-tighter">88</span>
                      </div>
                      <div>
                         <h4 className="text-2xl font-bold text-white tracking-tight">Intelligence Quotient</h4>
                         <p className="text-indigo-400 font-mono text-xs uppercase tracking-widest">VLSI Engineer // Level 4</p>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-black uppercase tracking-widest">Matched</div>
                      <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 text-[10px] font-black uppercase tracking-widest">Ready</div>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   {[1,2,3,4].map(i => (
                      <div key={i} className="h-24 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
                   ))}
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
