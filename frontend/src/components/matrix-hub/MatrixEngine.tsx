'use client';

import { motion } from 'framer-motion';
import { 
  Database, Brain, Activity, 
  Terminal, Shield, Zap, 
  Layers, Search, Sparkles
} from 'lucide-react';

export default function MatrixEngine() {
  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden">
      
      {/* ── Neural Stream Background ── */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 1000, opacity: [0, 0.2, 0] }}
            transition={{ 
              duration: Math.random() * 5 + 3, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-px h-24 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-tactical text-blue-400 block mb-6">Cognitive Processing Core</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-8 italic">
            The Matrix <br />
            <span className="text-blue-500">Engine.</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            A self-adapting intelligence pipeline that autonomously captures, clusters, and delivers career data with zero human friction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Step 1: Ingestion */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="hologram-card p-10 bg-[#0d0f1a]/80 group"
          >
            <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-colors">
              <Database className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Data Ingestion</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Autonomous scraping of 50,000+ sources including RSS feeds, LinkedIn patterns, and semiconductor patent filings.
            </p>
            <div className="space-y-3">
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-1/3 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
               </div>
               <span className="text-tactical text-slate-700">Protocol: HTTPS_STREAM_4.0</span>
            </div>
          </motion.div>

          {/* Step 2: Synthesis */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="hologram-card p-10 bg-[#0d0f1a]/80 group"
          >
            <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 group-hover:bg-purple-500/20 transition-colors">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">AI Synthesis</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Gemini 1.5 Flash processing layer filters noise, extracts skills, and ranks importance with 99.4% accuracy.
            </p>
            <div className="flex flex-wrap gap-2">
               {['Summarizing', 'Ranking', 'Tagging'].map(s => (
                 <span key={s} className="px-3 py-1 rounded bg-purple-500/10 text-[8px] font-black text-purple-400 uppercase tracking-widest border border-purple-500/20">
                   {s}
                 </span>
               ))}
            </div>
          </motion.div>

          {/* Step 3: Visualization */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="hologram-card p-10 bg-[#0d0f1a]/80 group"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:bg-emerald-500/20 transition-colors">
              <Activity className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Matrix Delivery</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Real-time delivery to your dashboard via low-latency WebSocket streams and vector-mapped visuals.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <span className="text-tactical text-emerald-500">Rendering_Buffer...</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
