'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Terminal, 
  Cpu, 
  Zap, 
  Shield, 
  Rocket,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const semesters = [
  { id: 3, title: '3rd Semester', icon: Terminal, color: 'blue', desc: 'Foundational Engineering' },
  { id: 4, title: '4th Semester', icon: Cpu, color: 'indigo', desc: 'Digital Logic & Architecture' },
  { id: 5, title: '5th Semester', icon: Zap, color: 'purple', desc: 'Power & Signals' },
  { id: 6, title: '6th Semester', icon: Shield, color: 'violet', desc: 'Embedded Systems' },
  { id: 7, title: '7th Semester', icon: Rocket, color: 'emerald', desc: 'Advanced Research & Projects' },
];

export default function MatrixAcademicFacilities() {
  return (
    <section id="academic-facilities" className="relative py-32 bg-[#020308] overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-tactical text-indigo-400 tracking-[0.3em] uppercase">Intelligence Repository</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            Academic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">Facilities.</span>
          </motion.h2>
        </div>

        {/* Semester Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {semesters.map((sem, idx) => (
            <motion.div
              key={sem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-[#0a0c14]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-indigo-500/30 transition-all duration-500 group-hover:-translate-y-2">
                
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-${sem.color}-500/10 flex items-center justify-center mb-8 border border-${sem.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <sem.icon className={`w-7 h-7 text-${sem.color}-400`} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {sem.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {sem.desc}
                  </p>
                </div>

                {/* Coming Soon / Link Placeholder */}
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    Drive Sync Pending
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                  </div>
                </div>

                {/* Decorative Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Resource Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-tight">Centralized Knowledge Base</h4>
              <p className="text-slate-400 text-sm">All academic materials are being indexed for global access.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-[0.2em]">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            Live Synchronization active
          </div>
        </motion.div>

      </div>
    </section>
  );
}
