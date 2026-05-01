'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, ChevronRight, GraduationCap, Github, 
  ExternalLink, Cpu, Sparkles, BookOpen, 
  Trophy, ArrowLeft, Target, Layout,
  Zap, Globe, TrendingUp, Briefcase, 
  MapPin, DollarSign, Fingerprint, Upload,
  Search, ShieldCheck
} from 'lucide-react';
import { apiUrl } from '@/utils/api';
import SocialPulse from '@/components/SocialPulse';

interface ProjectDetail {
  title: string;
  github_repo?: string;
}

interface JobOpening {
  title: string;
  company?: string;
  location?: string;
  apply_link: string;
  salary_range?: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  key_skills: string[];
  course_link?: string;
  youtube_link?: string;
  projects: ProjectDetail[];
}

interface RoadmapResponse {
  domain: string;
  role_suitability: string;
  news_headline: string;
  market_demand_trend: number[];
  job_openings: JobOpening[];
  beginner_steps: RoadmapStep[];
  intermediate_steps: RoadmapStep[];
  advanced_steps: RoadmapStep[];
}

const STEPS = ['beginner', 'intermediate', 'advanced'] as const;
type StepType = typeof STEPS[number];

// High-End SVG Line Chart Component
const MarketTrendChart = ({ trend }: { trend: number[] }) => {
  const points = trend.map((v, i) => `${(i / (trend.length - 1)) * 100},${100 - v}`).join(' ');
  
  return (
    <div className="w-full h-32 relative mt-4 group">
      <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M ${points}`}
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          d={`M 0,100 L ${points} L 100,100 Z`}
          fill="url(#chartGradient)"
        />
        {trend.map((v, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            cx={(i / (trend.length - 1)) * 100}
            cy={100 - v}
            r="1.5"
            fill="#818cf8"
            className="group-hover:r-2 transition-all cursor-crosshair"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex justify-between items-end px-1 pointer-events-none">
        <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">-6mo</span>
        <span className="text-[8px] font-black text-indigo-500/40 uppercase tracking-tighter">Live Market Pulse</span>
        <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">Today</span>
      </div>
    </div>
  );
};

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [activeTab, setActiveTab] = useState<StepType>('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portalComplete, setPortalComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateFromResume = async (file: File) => {
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(apiUrl('/api/roadmap-from-file'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Global Engine Failure.');
      const data = await response.json();
      
      setRoadmap(data);
      setActiveTab('beginner');
      setPortalComplete(true);

    } catch (err: any) {
      setError(err.message || 'Quantum Anomaly.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleGenerateFromResume(file);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12">
        <AnimatePresence mode="wait">
          {!roadmap ? (
            <motion.section 
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
              className="flex flex-col items-center justify-center min-h-[80vh] text-center"
            >
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute -z-10 opacity-20"
               >
                 <div className="w-[600px] h-[600px] border border-dashed border-indigo-500/30 rounded-full" />
               </motion.div>

               <div className="relative mb-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)] mx-auto relative z-10"
                  >
                    <Fingerprint className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 blur-3xl bg-indigo-500/20 scale-150" />
               </div>

               <h1 className="text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">
                 GLOBAL INTELLIGENCE<br />MATRIX
               </h1>
               
               <p className="text-xl text-slate-400 font-medium max-w-2xl mb-12 leading-relaxed">
                 Drop your professional DNA. Our universal engine autonomously classifies your domain, 
                 analyzes global market weightage, and locks on to your ultimate career trajectory.
               </p>

               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                 
                 <button 
                   onClick={() => fileInputRef.current?.click()}
                   disabled={isGenerating}
                   className="relative flex items-center gap-4 bg-[#0a0a0a] px-12 py-6 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all active:scale-95 disabled:opacity-50"
                 >
                   {isGenerating ? (
                     <>
                       <Sparkles className="w-6 h-6 text-indigo-500 animate-spin" />
                       <span className="text-xl font-black uppercase tracking-[0.2em] animate-pulse">Synchronizing...</span>
                     </>
                   ) : (
                     <>
                       <Upload className="w-6 h-6 text-indigo-400" />
                       <span className="text-xl font-black uppercase tracking-[0.2em]">Drop DNA Matrix</span>
                     </>
                   )}
                 </button>
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   onChange={handleFileUpload}
                   className="hidden" 
                   accept=".pdf,.txt,.doc,.docx"
                 />
               </div>

               <div className="mt-12 flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Autonomous Classification
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-indigo-500" />
                    Market Weightage Tracking
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-purple-500" />
                    Direct Apply Portal
                  </div>
               </div>

               {error && (
                 <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-red-400 font-black tracking-widest uppercase text-xs">
                   Error: {error}
                 </motion.p>
               )}
            </motion.section>
          ) : (
            /* ACTIVE GLOBAL MATRIX VIEW */
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 pb-24"
            >
              <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between py-6">
                   <div className="flex items-center gap-6">
                      <button onClick={() => setRoadmap(null)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400">
                         <ArrowLeft className="w-6 h-6" />
                      </button>
                      <div>
                         <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-1 block">Industry Lock Confirmed</span>
                         <h2 className="text-2xl font-black text-white uppercase tracking-tight">{roadmap.domain}</h2>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-3">
                      <div className="text-right hidden md:block">
                         <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block">Status</span>
                         <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Global Master Synced</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                         <Target className="w-5 h-5 text-indigo-500" />
                      </div>
                   </div>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                 {/* Left Column: Market Intelligence */}
                 <div className="lg:col-span-4 space-y-8">
                    {/* Market Demand Card */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                          <TrendingUp className="w-16 h-16 text-indigo-400" />
                       </div>
                       <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <Zap className="w-4 h-4 fill-indigo-400" />
                          Market Weightage
                       </h3>
                       <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-5xl font-black text-white tracking-tighter">
                             {roadmap.market_demand_trend[roadmap.market_demand_trend.length - 1]}%
                          </span>
                          <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Bullish</span>
                       </div>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                          Daily demand intensity for {roadmap.domain} based on global workforce fluctuations.
                       </p>
                       <MarketTrendChart trend={roadmap.market_demand_trend} />
                    </div>

                    {/* Suitability Analysis */}
                    <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 rounded-[2.5rem] p-8">
                       <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-4">DNA Compatibility</h3>
                       <p className="text-lg font-bold text-white leading-relaxed tracking-tight italic">
                          "{roadmap.role_suitability}"
                       </p>
                    </div>

                    {/* Social Pulse Feed */}
                    <SocialPulse domain={roadmap.domain} />
                 </div>

                 {/* Center Column: Technical Mastery */}
                 <div className="lg:col-span-5 space-y-8">
                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-8">
                      {STEPS.map((step) => (
                        <button
                          key={step}
                          onClick={() => setActiveTab(step)}
                          className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                            activeTab === step 
                            ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20' 
                            : 'text-slate-500 hover:text-white'
                          }`}
                        >
                          {step}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-6">
                      {(roadmap[`${activeTab}_steps` as keyof RoadmapResponse] as RoadmapStep[]).map((step, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.04] transition-all group/step"
                        >
                          <div className="flex items-start justify-between mb-8">
                             <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl font-black text-indigo-400 group-hover/step:bg-indigo-500 group-hover/step:text-white transition-all duration-500">
                                   0{idx + 1}
                                </div>
                                <div>
                                   <h4 className="text-2xl font-black text-white uppercase tracking-tighter group-hover/step:text-indigo-400 transition-colors">
                                      {step.title}
                                   </h4>
                                   <div className="flex gap-2 mt-2">
                                      {step.key_skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="text-[8px] font-black uppercase tracking-widest text-indigo-400/60">{skill}</span>
                                      ))}
                                   </div>
                                </div>
                             </div>
                             {step.course_link && (
                               <a 
                                 href={step.course_link} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                               >
                                  <GraduationCap className="w-6 h-6" />
                               </a>
                             )}
                          </div>

                          <p className="text-slate-400 font-medium leading-relaxed mb-10 text-lg">
                            {step.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {step.projects?.map((project, pIdx) => (
                               <div key={pIdx} className="relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/[0.02] transition-all group/project shadow-2xl hover:shadow-indigo-500/10">
                                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-indigo-500/0 group-hover/project:from-indigo-500/[0.05] transition-all rounded-[2.5rem]" />
                                  <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                                     <div>
                                        <div className="flex items-center justify-between mb-4">
                                           <span className="text-[9px] font-black text-indigo-400/60 uppercase tracking-[0.4em]">Project Alpha 0{pIdx + 1}</span>
                                           <Cpu className="w-5 h-5 text-indigo-500 opacity-20 group-hover/project:opacity-100 group-hover/project:rotate-90 transition-all duration-500" />
                                        </div>
                                        <h5 className="text-2xl font-black text-white leading-[1.1] mb-2 uppercase tracking-tighter group-hover/project:text-indigo-400 transition-colors">
                                           {project.title}
                                        </h5>
                                     </div>
                                     {project.github_repo && (
                                       <a 
                                         href={project.github_repo} 
                                         target="_blank" 
                                         rel="noopener noreferrer"
                                         className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-all bg-white/5 hover:bg-indigo-500 px-5 py-3 rounded-2xl border border-white/10 w-fit"
                                       >
                                          <Github className="w-4 h-4" />
                                          Sync Repository
                                          <ExternalLink className="w-3 h-3 opacity-40" />
                                       </a>
                                     )}
                                  </div>
                               </div>
                             ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                 </div>

                 {/* Right Column: Direct Apply Portal */}
                 <div className="lg:col-span-3 space-y-8">
                    <div className="bg-indigo-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-20">
                          <Sparkles className="w-12 h-12" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block opacity-60">Global Strategy</span>
                       <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-6">
                          Direct Apply<br />Access Portal
                       </h3>
                       <div className="space-y-4">
                          {roadmap.job_openings.map((job, jIdx) => (
                            <motion.a
                              key={jIdx}
                              whileHover={{ x: 5 }}
                              href={job.apply_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-5 bg-black/20 rounded-2xl border border-white/10 hover:bg-black/40 transition-all"
                            >
                               <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-black uppercase tracking-tight">{job.title}</h4>
                                  <ExternalLink className="w-4 h-4 opacity-50" />
                               </div>
                               <div className="flex items-center gap-3 text-[10px] font-bold opacity-60">
                                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {job.location}</span>
                                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary_range}</span>
                               </div>
                            </motion.a>
                          ))}
                       </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8">
                       <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Global News Flash</h4>
                       <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-full" />
                          <p className="text-sm font-bold text-white leading-relaxed italic">
                             "{roadmap.news_headline}"
                          </p>
                       </div>
                    </div>

                    <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem]">
                       <div className="flex items-center gap-3 mb-4 text-emerald-400">
                          <ShieldCheck className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Verified Analysis</span>
                       </div>
                       <p className="text-xs text-emerald-200/60 font-medium leading-relaxed">
                          Our Universal Intelligence Engine has verified this career matrix against current global recruitment metadata and technical mastery requirements.
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5 mt-24">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">
               Powered by Global Universal Intelligence Engine v4.0
            </span>
         </div>
      </footer>
    </div>
  );
}
