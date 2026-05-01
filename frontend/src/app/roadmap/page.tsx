'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import SocialPulse from '@/components/SocialPulse';
import { 
  ArrowLeft, Cpu, 
  ChevronRight, CheckCircle2,
  Loader2, Rocket, Trophy, Compass,
  BookOpen, ExternalLink, GraduationCap,
  Youtube, Monitor, Terminal, ShieldCheck,
  Layers, Share2, Zap, Target, FileUp, Search, Info, Github
} from 'lucide-react';

const ECE_DOMAINS = [
  "VLSI & ASIC Design",
  "Embedded Systems & Firmware",
  "Robotics & Automation",
  "Digital Signal Processing (DSP)",
  "Telecommunications & 5G"
];

interface ProjectDetail {
  title: string;
  github_repo?: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  key_skills: string[];
  course_link?: string;
  youtube_link?: string;
  projects?: ProjectDetail[]; // Updated: Multi-project support
  critical_project?: string;
}

interface RoadmapResponse {
  domain: string;
  role_suitability: string;
  news_headline: string;
  beginner_steps: RoadmapStep[];
  intermediate_steps: RoadmapStep[];
  advanced_steps: RoadmapStep[];
}

export default function RoadmapPage() {
  const [selectedDomain, setSelectedDomain] = useState(ECE_DOMAINS[0]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPortalAnimation, setShowPortalAnimation] = useState(false);
  const [portalComplete, setPortalComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      analyzeResumeForDomain(e.target.files[0]);
    }
  };

  const analyzeResumeForDomain = async (file: File) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    const name = file.name.toLowerCase();
    if (name.includes('vlsi') || name.includes('verilog')) setSelectedDomain("VLSI & ASIC Design");
    else if (name.includes('embed') || name.includes('iot')) setSelectedDomain("Embedded Systems & Firmware");
    else if (name.includes('robot')) setSelectedDomain("Robotics & Automation");
    setIsAnalyzing(false);
  };

  const handleGenerateWithAnimation = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const response = await fetch(apiUrl('/api/generate-roadmap'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: selectedDomain, has_resume: !!resumeFile })
      });

      if (!response.ok) throw new Error('Intelligence Matrix Failed.');
      const data = await response.json();
      
      // Start "Goated" Animation
      setShowPortalAnimation(true);
      setPortalComplete(false);
      
      setTimeout(() => {
        setRoadmap(data);
        setActiveTab('beginner');
        // Portal finishes after the flash
        setTimeout(() => {
          setShowPortalAnimation(false);
          setPortalComplete(true);
        }, 300);
      }, 2500);

    } catch (err: any) {
      setError(err.message || 'Quantum Anomaly.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getActiveSteps = () => {
    if (!roadmap) return [];
    if (activeTab === 'beginner') return roadmap.beginner_steps;
    if (activeTab === 'intermediate') return roadmap.intermediate_steps;
    return roadmap.advanced_steps;
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {!roadmap ? (
          <motion.section 
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative min-h-screen z-10 py-24"
          >
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                <Link href="/#ece-hub" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-20 group bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md font-bold text-sm">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Return to Hub
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                   <div>
                      <div className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        The Matrix Engine v3.0
                      </div>
                      <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                        Intelligence <br />
                        <span className="text-indigo-500">Matrix.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
                        Specialized for EC/EEE. Upload your resume for an autonomous domain scan, or select your target sector manually.
                      </p>

                      <div className="grid grid-cols-1 gap-4">
                         <div 
                           onClick={() => fileInputRef.current?.click()}
                           className={`p-10 rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer group ${
                            resumeFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:border-indigo-500/30'
                           }`}
                         >
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                            <div className="flex items-center gap-6">
                               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                                 resumeFile ? 'bg-emerald-500/20' : 'bg-white/10 group-hover:bg-indigo-500/20'
                               }`}>
                                  {isAnalyzing ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" /> : <FileUp className={`w-8 h-8 ${resumeFile ? 'text-emerald-400' : 'text-slate-400'}`} />}
                               </div>
                               <div>
                                  <h4 className="text-xl font-black">{resumeFile ? resumeFile.name : 'Scan Resume DNA'}</h4>
                                  <p className="text-sm text-slate-500 font-medium">{resumeFile ? 'Resume Synced. Algorithm recommending domain...' : 'Recommended for EC students for automatic domain matching.'}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="relative group">
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-[3rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                        <div className="bg-[#050505] rounded-[2.9rem] p-10 md:p-14">
                           <div className="flex items-center gap-3 mb-10 opacity-40">
                              <Terminal className="w-5 h-5 text-indigo-500" />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em]">MATRIX_OS // CONFIGURATION</span>
                           </div>

                           <div className="space-y-8">
                              <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                                  {isAnalyzing ? 'Analyzing Alignment...' : 'Target Domain Alignment'}
                                </label>
                                <div className="relative">
                                  <select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    className={`block w-full px-8 py-5 text-xl font-bold border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-2xl bg-white/5 text-white cursor-pointer appearance-none transition-all ${
                                      isAnalyzing ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                                  >
                                    {ECE_DOMAINS.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                                  </select>
                                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 rotate-90 pointer-events-none" />
                                </div>
                              </div>

                              <button
                                onClick={handleGenerateWithAnimation}
                                disabled={isGenerating || isAnalyzing}
                                className="w-full py-6 bg-indigo-600 text-white font-black text-xl rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl shadow-indigo-500/20 active:scale-95"
                              >
                                {isGenerating ? (
                                  <><Loader2 className="w-6 h-6 animate-spin" /> SYNCHRONIZING...</>
                                ) : (
                                  <>{resumeFile ? 'SYNC & INITIALIZE' : 'INITIALIZE MATRIX'} <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                              </button>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          /* ACTIVE INTELLIGENCE MATRIX VIEW */
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 2, rotateX: 45, filter: "brightness(0) blur(20px)" }}
            animate={portalComplete ? { opacity: 1, scale: 1, rotateX: 0, filter: "brightness(1) blur(0px)" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 pb-24"
          >
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <button onClick={() => setRoadmap(null)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400">
                    <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className="text-xl font-black tracking-tight text-indigo-400 uppercase tracking-widest">{roadmap.domain}</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">DNA Synced</span>
                </div>
              </div>
            </header>

            <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 p-10 rounded-[3rem] bg-indigo-500 text-white shadow-2xl shadow-indigo-500/20 flex flex-col md:flex-row items-center gap-10"
              >
                 <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-10 h-10 text-white" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Optimized Career Path</h3>
                    <p className="text-lg font-medium text-white/90 leading-relaxed">{roadmap.role_suitability}</p>
                 </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                          activeTab === tab 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab === 'beginner' ? '01 // Engine' : tab === 'intermediate' ? '02 // Accelerator' : '03 // Mastery'}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-gradient-to-b from-indigo-500/50 via-white/5 to-transparent" />
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-10"
                    >
                      {getActiveSteps().map((step, index) => (
                        <div key={index} className="relative flex items-start gap-10 ml-[1.35rem]">
                          <div className={`absolute -left-[1.35rem] w-4 h-4 rounded-full border-4 border-black z-10 mt-3 ${
                            activeTab === 'beginner' ? 'bg-emerald-400' : activeTab === 'intermediate' ? 'bg-indigo-400' : 'bg-purple-400'
                          }`} />
                          
                          <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 text-6xl font-black text-white/[0.02] pointer-events-none uppercase italic">Step 0{index + 1}</div>
                            
                            <div className="flex flex-col xl:flex-row justify-between gap-6 mb-8 relative z-10">
                              <div>
                                <h4 className="text-3xl font-black text-white mb-6 tracking-tight group-hover:text-indigo-400 transition-colors">{step.title}</h4>
                                <div className="flex flex-wrap gap-3">
                                  {step.key_skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] px-4 py-2 border border-indigo-500/20 rounded-xl bg-indigo-500/5">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-4">
                                {step.course_link && (
                                  <a href={step.course_link} target="_blank" className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-xs font-black uppercase tracking-widest">
                                    <GraduationCap className="w-5 h-5" />
                                    Coursera Plus
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mb-10 font-medium">{step.description}</p>

                            {/* BOLD MULTI-PROJECT MASTERY SECTION */}
                            <div className="space-y-6">
                               <div className="flex items-center gap-3 opacity-60">
                                  <div className="h-[1px] flex-1 bg-white/10" />
                                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Core Project Milestones</span>
                                  <div className="h-[1px] flex-1 bg-white/10" />
                               </div>
                               
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

                               {/* Legacy Fallback */}
                               {(!step.projects || step.projects.length === 0) && step.critical_project && (
                                 <div className="relative p-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 overflow-hidden">
                                   <div className="flex flex-col md:flex-row items-center gap-6">
                                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                                         <Cpu className="w-7 h-7 text-indigo-400" />
                                      </div>
                                      <div>
                                         <h5 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Master This Project</h5>
                                         <p className="text-md font-extrabold text-indigo-400 leading-snug">{step.critical_project}</p>
                                      </div>
                                   </div>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                   <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10">
                      <h3 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                         <Info className="w-5 h-5 text-indigo-400" />
                         Pro Tips
                      </h3>
                      <ul className="space-y-6">
                         <li className="text-sm font-medium text-slate-400 leading-relaxed">
                            <strong className="text-white block mb-1 uppercase tracking-widest text-[10px]">Project Priority</strong>
                            Don&apos;t just code; simulate. Companies value Vivado/Quartus screenshots in portfolios.
                         </li>
                      </ul>
                   </div>
                   <SocialPulse domain={roadmap.domain} />
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPortalAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 pointer-events-none perspective-[1000px]">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ z: -500, opacity: 0, scale: 0.1 }}
                    animate={{ z: [ -500, 1000 ], opacity: [ 0, 1, 0 ], scale: [ 0.1, 4 ] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05, ease: "circIn" }}
                    className="absolute top-1/2 left-1/2 w-1 h-20 bg-indigo-500/40 blur-[1px] rounded-full"
                    style={{ transform: `rotate(${i * 7.2}deg) translateY(-200px)` }}
                  />
                ))}
             </div>
             <motion.div animate={{ opacity: [0, 0.8, 0], scale: [1, 1.1, 1], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }} transition={{ duration: 0.2, repeat: Infinity }} className="absolute inset-0 pointer-events-none bg-indigo-500/5 mix-blend-screen" />
             <div className="text-center relative z-10">
                <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12 }} className="mb-12 relative">
                   <div className="absolute inset-0 blur-3xl bg-indigo-500/50 animate-pulse" />
                   <Layers className="w-32 h-32 text-white mx-auto relative z-10" />
                </motion.div>
                <div className="space-y-4">
                  <h2 className="text-5xl font-black tracking-[0.8em] text-white uppercase italic animate-pulse">Synchronizing</h2>
                  <div className="flex items-center justify-center gap-4">
                     <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-indigo-500" />
                     <span className="text-indigo-400 font-mono text-sm tracking-[0.3em]">DNA_SCAN_ACTIVE</span>
                     <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-indigo-500" />
                  </div>
                </div>
             </div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 2.2, duration: 0.3 }} className="absolute inset-0 bg-white z-[110]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
