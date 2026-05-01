'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, ChevronRight, GraduationCap, Github, 
  ExternalLink, Cpu, Sparkles, BookOpen, 
  Trophy, ArrowLeft, Target, Layout,
  Zap, Globe, TrendingUp, Briefcase, 
  MapPin, DollarSign, Fingerprint, Upload,
  Search, ShieldCheck, Brain, MessageCircle
} from 'lucide-react';
import { apiUrl } from '@/utils/api';
import SocialPulse from '@/components/SocialPulse';
import IntelligenceSidebar from '@/components/roadmap/IntelligenceSidebar';

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

const MarketTrendChart = ({ trend }: { trend: number[] }) => {
  if (!trend || trend.length < 2) return null;
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
    </div>
  );
};

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [activeTab, setActiveTab] = useState<StepType>('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOracleOpen, setIsOracleOpen] = useState(false);
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
    } catch (err: any) {
      setError(err.message || 'Quantum Anomaly.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleGenerateFromResume(file);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500 selection:text-white overflow-hidden flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <AnimatePresence mode="wait">
        {!roadmap ? (
          <motion.main 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10"
          >
            <div className="relative mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-24 border border-indigo-500/10 rounded-full border-dashed"
              />
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)] mx-auto relative z-10"
              >
                <Fingerprint className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30 uppercase leading-none">
              Neural Career<br />Matrix
            </h1>
            
            <p className="text-xl text-slate-400 font-medium max-w-2xl mb-12 leading-relaxed tracking-tight">
              Initiate a high-fidelity DNA scan. Our universal intelligence autonomously architectures 
              your global trajectory with absolute technical precision.
            </p>

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating}
              className="group relative bg-[#0a0a0a] px-12 py-6 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative flex items-center gap-4">
                {isGenerating ? <Sparkles className="w-6 h-6 text-indigo-500 animate-spin" /> : <Upload className="w-6 h-6 text-indigo-400" />}
                <span className="text-xl font-black uppercase tracking-[0.2em]">{isGenerating ? 'Analyzing DNA...' : 'Drop DNA Matrix'}</span>
              </div>
            </button>
            <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.txt,.doc,.docx" />

            {error && <p className="mt-8 text-red-500 font-black tracking-widest uppercase text-xs animate-pulse">Error: {error}</p>}
          </motion.main>
        ) : (
          <motion.main 
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col relative z-10 overflow-hidden"
          >
            {/* Header / Top Control Bar */}
            <header className="h-20 border-b border-white/10 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-8 shrink-0">
              <div className="flex items-center gap-8">
                <button onClick={() => setRoadmap(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-0.5 block">Trajectory Locked</span>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">{roadmap.domain}</h2>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-4">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Neural Sync</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">100% Optimized</span>
                </div>
                <button 
                  onClick={() => setIsOracleOpen(!isOracleOpen)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
                    isOracleOpen ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-indigo-400 hover:bg-white/10'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Consult Oracle</span>
                </button>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
              {/* Main Viewport */}
              <div className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                  {/* Left: Tactical Intelligence */}
                  <div className="xl:col-span-8 space-y-12">
                    <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
                      {STEPS.map((step) => (
                        <button
                          key={step}
                          onClick={() => setActiveTab(step)}
                          className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                            activeTab === step ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:text-white'
                          }`}
                        >
                          {step}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-8">
                      {(roadmap[`${activeTab}_steps` as keyof RoadmapResponse] as RoadmapStep[]).map((step, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative bg-[#050505] border border-white/10 rounded-[3rem] p-12 hover:border-indigo-500/30 transition-all overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target className="w-32 h-32 text-indigo-400" />
                          </div>
                          
                          <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                            <div className="shrink-0">
                              <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl font-black text-indigo-400">
                                0{idx + 1}
                              </div>
                            </div>
                            
                            <div className="flex-1 space-y-6">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{step.title}</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {step.key_skills.map((skill, sIdx) => (
                                      <span key={sIdx} className="px-3 py-1 bg-indigo-500/10 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/20">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {step.course_link && (
                                  <a href={step.course_link} target="_blank" className="p-4 bg-white/5 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all">
                                    <ExternalLink className="w-6 h-6" />
                                  </a>
                                )}
                              </div>
                              
                              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-3xl">{step.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                {step.projects.map((proj, pIdx) => (
                                  <a key={pIdx} href={proj.github_repo} target="_blank" className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all flex items-center justify-between group/proj">
                                    <div>
                                      <span className="text-[8px] font-black text-indigo-400/50 uppercase tracking-[0.4em] mb-1 block">Project Alpha</span>
                                      <h4 className="text-sm font-black text-white uppercase tracking-tight">{proj.title}</h4>
                                    </div>
                                    <Github className="w-5 h-5 text-white/20 group-hover/proj:text-white transition-colors" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Operational Awareness */}
                  <div className="xl:col-span-4 space-y-8">
                    <div className="bg-[#050505] border border-white/10 rounded-[3rem] p-10 space-y-8">
                      <div>
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 block">Market Weightage</span>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-6xl font-black text-white tracking-tighter">
                            {roadmap.market_demand_trend[roadmap.market_demand_trend.length - 1]}%
                          </span>
                          <span className="text-emerald-400 text-sm font-black uppercase tracking-widest flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" /> Strong
                          </span>
                        </div>
                        <MarketTrendChart trend={roadmap.market_demand_trend} />
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 block">DNA Briefing</span>
                        <p className="text-lg font-bold text-white leading-relaxed italic">"{roadmap.role_suitability}"</p>
                      </div>
                    </div>

                    <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                        <Sparkles className="w-24 h-24" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-8">Direct Apply<br />Access Portal</h3>
                      <div className="space-y-4">
                        {roadmap.job_openings.map((job, jIdx) => (
                          <a key={jIdx} href={job.apply_link} target="_blank" className="block p-5 bg-black/20 rounded-2xl border border-white/10 hover:bg-black/40 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-black uppercase tracking-tight">{job.title}</h4>
                              <ExternalLink className="w-4 h-4 opacity-50" />
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold opacity-60 uppercase tracking-widest">
                              <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {job.location}</span>
                              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary_range}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    <SocialPulse domain={roadmap.domain} />
                  </div>
                </div>
              </div>

              {/* Collapsible Sidebar */}
              <AnimatePresence>
                {isOracleOpen && (
                  <IntelligenceSidebar 
                    roadmapContext={roadmap} 
                    onClose={() => setIsOracleOpen(false)} 
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating Status Bar */}
      <footer className="h-12 border-t border-white/5 bg-black/80 flex items-center justify-center shrink-0">
        <div className="flex items-center gap-8 text-[8px] font-black uppercase tracking-[0.5em] text-white/20">
          <span>ResQ v4.0.0 Stable</span>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <span>Neural Net Online</span>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <span>Oracle Ready</span>
        </div>
      </footer>
    </div>
  );
}
