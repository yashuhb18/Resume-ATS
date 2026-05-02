'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Zap, CheckCircle2, 
  Target, Rocket, Shield,
  Brain, Cpu, Terminal,
  ExternalLink, Github, Youtube,
  BookOpen, Building2, ChevronRight,
  Sparkles, Layers
} from 'lucide-react';
import { useState } from 'react';

interface Resource {
  title: string;
  link: string;
  type: 'course' | 'video' | 'project';
}

interface RoadmapPhase {
  title: string;
  desc: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  milestones: string[];
  companies: string[];
  resources: Resource[];
}

interface RoadmapData {
  id: string;
  title: string;
  phases: RoadmapPhase[];
}

import { roadmaps } from './roadmapData';

export default function MatrixRoadmapView({ domainId, onClose }: { domainId: string, onClose: () => void }) {
  const data = roadmaps[domainId] || roadmaps['vlsi'];
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#020308] overflow-hidden flex flex-col font-inter"
    >
      {/* ── Cinematic Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,241,0.05)_0%,transparent_70%)]" />
        <div className="scanline-overlay opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] font-michroma">Neural Trajectory Map</span>
               <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 uppercase tracking-widest">v4.2 PRO</div>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter font-michroma">{data.title}</h2>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Market Priority</span>
              <span className="text-xs font-bold text-white uppercase tracking-tighter">Silicon Valley & Bangalore Sync</span>
           </div>
           <div className="w-px h-8 bg-white/10" />
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020308] flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Expert" className="w-full h-full object-cover grayscale opacity-50" />
                   </div>
                 ))}
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">1.2k Mastered</span>
           </div>
        </div>
      </header>

      {/* Main Content: Tree Layout */}
      <main className="flex-1 relative overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Tree Navigation */}
        <div className="w-full lg:w-[450px] border-r border-white/5 p-8 overflow-y-auto custom-scrollbar relative z-10 bg-black/20">
           <div className="space-y-4">
              <div className="flex items-center gap-3 mb-10">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Layers className="w-5 h-5 text-blue-400" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-white uppercase font-michroma">Sector Progression</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Root to Mastery Protocol</p>
                 </div>
              </div>

              {/* Tree Nodes */}
              <div className="relative pl-6 space-y-12">
                 {/* Vertical Connector Line */}
                 <div className="absolute left-[33px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
                 
                 {data.phases.map((phase, i) => (
                   <motion.div 
                    key={i}
                    onClick={() => setSelectedPhase(i)}
                    className={`relative group cursor-pointer transition-all ${selectedPhase === i ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
                   >
                      {/* Node Circle */}
                      <div className={`absolute -left-[37px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 z-20 flex items-center justify-center transition-all ${selectedPhase === i ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,241,0.5)]' : 'bg-[#0a0c14] border-white/10 group-hover:border-blue-500/50'}`}>
                         {selectedPhase > i ? (
                           <CheckCircle2 className="w-4 h-4 text-white" />
                         ) : (
                           <span className="text-[10px] font-black text-white">{i + 1}</span>
                         )}
                      </div>

                      {/* Content Card */}
                      <div className={`p-6 rounded-2xl border transition-all ${selectedPhase === i ? 'bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-500/5' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}>
                         <div className="flex items-center justify-between mb-2">
                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${selectedPhase === i ? 'text-blue-400' : 'text-slate-500'}`}>{phase.level}</span>
                            {selectedPhase === i && <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />}
                         </div>
                         <h5 className="text-sm font-black text-white uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors">{phase.title}</h5>
                         <p className="text-[10px] text-slate-500 font-medium line-clamp-1 italic">"{phase.desc}"</p>
                      </div>
                   </motion.div>
                 ))}

                 {/* Final Mastery Node */}
                 <div className="relative pt-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(59,130,241,0.3)] border border-white/20 mb-4">
                       <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Level: Grandmaster</span>
                    <h6 className="text-xs font-black text-white uppercase tracking-widest mt-1">Matrix Mastery</h6>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Phase Details */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10">
           <AnimatePresence mode="wait">
             <motion.div
               key={selectedPhase}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="max-w-4xl mx-auto space-y-16"
             >
                {/* Phase Hero */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-[2rem] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                         <Rocket className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Checkpoint_{selectedPhase+1}</span>
                            <div className="h-px w-12 bg-blue-500/30" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">{data.phases[selectedPhase].level} STRATEGY</span>
                         </div>
                         <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none font-michroma">{data.phases[selectedPhase].title}</h3>
                      </div>
                   </div>
                   <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl italic border-l-4 border-blue-500/30 pl-8">
                     "{data.phases[selectedPhase].desc}"
                   </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   
                   {/* Milestones & Skills */}
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <Target className="w-5 h-5 text-blue-400" />
                         <h4 className="text-xs font-black text-white uppercase tracking-widest">Key Milestones</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                         {data.phases[selectedPhase].milestones.map((ms, i) => (
                           <div key={i} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-5 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all">
                              <div className="w-10 h-10 rounded-xl bg-[#0a0c14] border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                                 <Terminal className="w-5 h-5" />
                              </div>
                              <div>
                                 <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{ms}</span>
                                 <div className="mt-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Verified Proficiency</span>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Company Intel */}
                   <div className="space-y-8">
                      <div className="flex items-center gap-3">
                         <Building2 className="w-5 h-5 text-purple-400" />
                         <h4 className="text-xs font-black text-white uppercase tracking-widest">Hiring Intel (10+ Top Firms)</h4>
                      </div>
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/5 space-y-6">
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                            These industry titans actively hunt for candidates with the {data.phases[selectedPhase].level} skills outlined in this phase:
                         </p>
                         <div className="flex flex-wrap gap-3">
                            {data.phases[selectedPhase].companies.map((company, i) => (
                              <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-300 hover:text-white hover:border-purple-500/50 transition-all cursor-default">
                                 {company}
                              </div>
                            ))}
                            <div className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-[10px] font-black text-purple-400 italic">
                               +5 More in Cluster
                            </div>
                         </div>
                         <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                               <Zap className="w-5 h-5" />
                            </div>
                            <div>
                               <span className="text-[10px] font-black text-white uppercase tracking-widest">Entry Probability</span>
                               <div className="flex items-center gap-2 mt-1">
                                  <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                                     <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: selectedPhase === 0 ? '85%' : selectedPhase === 1 ? '70%' : '45%' }}
                                      className="h-full bg-emerald-500" 
                                     />
                                  </div>
                                  <span className="text-[10px] font-black text-emerald-400">{selectedPhase === 0 ? 'High' : selectedPhase === 1 ? 'Moderate' : 'Elite Only'}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                </div>

                {/* Learning Vault */}
                <div className="pt-16 border-t border-white/5">
                   <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-emerald-400" />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-white uppercase italic font-michroma tracking-tight">Phase Learning Vault</h4>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.3em]">Curated Free Mastery Resources</p>
                         </div>
                      </div>
                      <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol:</span>
                         <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">ZERO_COST_MASTER</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {data.phases[selectedPhase].resources.map((res, i) => (
                        <a 
                          key={i}
                          href={res.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-6 rounded-2xl bg-[#0a0c14] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between h-48"
                        >
                           <div>
                              <div className="flex items-center justify-between mb-6">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${res.type === 'course' ? 'bg-blue-500/10 text-blue-400' : res.type === 'video' ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400'}`}>
                                    {res.type === 'course' ? <ExternalLink className="w-5 h-5" /> : res.type === 'video' ? <Youtube className="w-5 h-5" /> : <Github className="w-5 h-5" />}
                                 </div>
                                 <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">{res.type}</span>
                              </div>
                              <h5 className="text-xs font-black text-white uppercase leading-relaxed group-hover:text-emerald-400 transition-colors">{res.title}</h5>
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                              <span>Initialize</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </div>
                        </a>
                      ))}
                   </div>
                </div>

                {/* Next Steps Prompt */}
                <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 text-center space-y-6">
                   <div className="w-16 h-16 rounded-3xl bg-blue-500 mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(59,130,241,0.3)]">
                      <Brain className="w-8 h-8 text-white" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black text-white uppercase italic tracking-tight font-michroma">Ready for next synchronization?</h4>
                      <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">Master the milestones above to unlock Checkpoint_{selectedPhase+2}</p>
                   </div>
                   {selectedPhase < data.phases.length - 1 && (
                     <button 
                      onClick={() => setSelectedPhase(selectedPhase + 1)}
                      className="matrix-btn !px-12 !py-5 !text-xs !bg-blue-600 hover:!bg-blue-500 transition-all"
                     >
                       Proceed to {data.phases[selectedPhase + 1].level} Phase
                     </button>
                   )}
                </div>

             </motion.div>
           </AnimatePresence>
        </div>

      </main>

      {/* Footer / Status Bar */}
      <footer className="relative z-20 px-8 py-4 border-t border-white/5 bg-black/60 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
         <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Neural Link Active
            </span>
            <span className="hidden md:block">Protocol: GLOBAL_ATS_v4.2</span>
         </div>
         <div className="flex items-center gap-8">
            <span className="hidden lg:block text-slate-800 italic">"Design the future, layer by layer"</span>
            <div className="flex items-center gap-4">
               <span>System Load: 12%</span>
               <div className="w-px h-4 bg-white/5" />
               <span className="text-blue-500">Node Sync: 100%</span>
            </div>
         </div>
      </footer>
    </motion.div>
  );
}
