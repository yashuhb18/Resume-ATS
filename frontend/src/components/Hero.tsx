'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, Cpu, 
  Layers, Zap, 
  Terminal, ShieldCheck,
  ChevronRight, Network, 
  Activity, Radio, CircuitBoard
} from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#05070a]">
      
      {/* Background Signal Traces */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <path d="M100,200 L300,200 L350,250 L600,250 L650,300 L900,300" stroke="white" fill="none" strokeWidth="1" className="animate-pulse" />
          <path d="M100,500 L400,500 L450,450 L700,450 L750,500 L900,500" stroke="white" fill="none" strokeWidth="1" opacity="0.5" />
          <circle cx="900" cy="300" r="3" fill="#6366f1" />
          <circle cx="900" cy="500" r="3" fill="#6366f1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Hero Content: Authority Driven */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Activity className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Industry Standard Intelligence</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl lg:text-9xl font-black tracking-tight mb-8 leading-[0.9]"
            >
              Hardware <br />
              <span className="text-indigo-500">Mastery.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-400 font-medium leading-relaxed mb-12 max-w-2xl"
            >
              The definitive AI career architect for ECE/EEE professionals. From RTL design to RTOS mastery, we synchronize your DNA with the semiconductor industry.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/roadmap" className="btn-primary">
                Initialize Matrix
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#ece-hub" className="btn-secondary">
                Explore Domains
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual: Logic Gate / SOC Animation (The "Photo" Re-animation) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square rounded-[4rem] bg-[#0a0c14] border border-white/5 shadow-2xl overflow-hidden flex items-center justify-center group"
            >
               {/* Animated Logic Schematic */}
               <svg className="w-3/4 h-3/4" viewBox="0 0 200 200">
                  {/* Gate 1 */}
                  <motion.path 
                    d="M20,50 L60,50 L70,70 L100,70" 
                    stroke="#6366f1" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                  />
                  <rect x="100" y="60" width="30" height="20" rx="4" fill="#6366f1" fillOpacity="0.1" stroke="#6366f1" strokeWidth="1" />
                  <text x="115" y="74" textAnchor="middle" fill="#6366f1" fontSize="8" fontWeight="bold">AND</text>
                  
                  {/* Gate 2 */}
                  <motion.path 
                    d="M20,150 L60,150 L70,130 L100,130" 
                    stroke="#6366f1" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
                  />
                  <rect x="100" y="120" width="30" height="20" rx="4" fill="#6366f1" fillOpacity="0.1" stroke="#6366f1" strokeWidth="1" />
                  <text x="115" y="134" textAnchor="middle" fill="#6366f1" fontSize="8" fontWeight="bold">OR</text>

                  {/* Convergence */}
                  <motion.path 
                    d="M130,70 L150,70 L160,100 L180,100" 
                    stroke="#6366f1" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2 }}
                  />
                  <motion.path 
                    d="M130,130 L150,130 L160,100" 
                    stroke="#6366f1" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2.5 }}
                  />
                  
                  {/* Output Node */}
                  <motion.circle 
                    cx="185" cy="100" r="4" fill="#6366f1" 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
               </svg>

               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
               <div className="absolute bottom-10 left-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">SOC Logic Analysis</div>
                  <div className="text-xl font-bold">Hardware Synthesis Active</div>
               </div>
            </motion.div>
            
            {/* Float Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
               <CircuitBoard className="w-8 h-8 text-indigo-400" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
