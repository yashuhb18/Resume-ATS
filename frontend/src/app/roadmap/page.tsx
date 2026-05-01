'use client';

import { useState } from 'react';
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
  Layers, Share2, Zap, Target
} from 'lucide-react';

const ECE_DOMAINS = [
  "VLSI & ASIC Design",
  "Embedded Systems & Firmware",
  "Robotics & Automation",
  "Digital Signal Processing (DSP)",
  "Telecommunications & 5G"
];

interface RoadmapStep {
  title: string;
  description: string;
  key_skills: string[];
  course_link?: string;
  youtube_link?: string;
}

interface RoadmapResponse {
  domain: string;
  news_headline: string;
  beginner_steps: RoadmapStep[];
  intermediate_steps: RoadmapStep[];
  advanced_steps: RoadmapStep[];
}

export default function RoadmapPage() {
  const [selectedDomain, setSelectedDomain] = useState(ECE_DOMAINS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const responsePromise = fetch(apiUrl('/api/generate-roadmap'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: selectedDomain })
      });

      const [response] = await Promise.all([responsePromise, minLoadTime]);

      if (!response.ok) {
        throw new Error('Intelligence Matrix Synchronization Failed.');
      }

      const data = await response.json();
      setRoadmap(data);
      setActiveTab('beginner');
    } catch (err: any) {
      setError(err.message || 'Quantum Anomaly detected.');
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
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {!roadmap ? (
          /* GOD-LEVEL INITIALIZATION PORTAL */
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                   <div>
                      <div className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        The Matrix Engine v2.4
                      </div>
                      <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                        Intelligence <br />
                        <span className="text-indigo-500">Matrix.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
                        Initialize a self-adapting neural roadmap. Our matrix synchronizes your profile with the tri-path architectural standards of the hardware industry.
                      </p>

                      {/* Matrix Logic Bento */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <Layers className="w-6 h-6 text-indigo-400 mb-4" />
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-2">01 // Neural Synthesis</h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">Analyzing 500+ verified hardware toolchains to build your unique path.</p>
                         </div>
                         <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <Share2 className="w-6 h-6 text-emerald-400 mb-4" />
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-2">02 // Adaptive Forking</h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">Tri-path architecture: Beginner, Accelerator, and Mastery tiers.</p>
                         </div>
                      </div>
                   </div>

                   {/* Terminal-style Selector */}
                   <div className="relative group">
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-[3rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                        <div className="bg-[#050505] rounded-[2.9rem] p-10 md:p-14">
                           <div className="flex items-center gap-3 mb-10 opacity-40">
                              <Terminal className="w-5 h-5 text-indigo-500" />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em]">RESQ_OS // SECURE_INIT</span>
                           </div>

                           <div className="space-y-8">
                              <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Select Target Domain</label>
                                <div className="relative">
                                  <select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    className="block w-full px-8 py-5 text-xl font-bold border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-2xl bg-white/5 text-white cursor-pointer appearance-none transition-all"
                                  >
                                    {ECE_DOMAINS.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                                  </select>
                                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 rotate-90 pointer-events-none" />
                                </div>
                              </div>

                              <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full py-6 bg-indigo-600 text-white font-black text-xl rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl shadow-indigo-500/20 active:scale-95"
                              >
                                {isGenerating ? (
                                  <><Loader2 className="w-6 h-6 animate-spin" /> SYNCHRONIZING...</>
                                ) : (
                                  <>INITIALIZE MATRIX <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                              </button>

                              <div className="pt-8 border-t border-white/5 flex items-center gap-6 justify-center opacity-30 grayscale">
                                 <ShieldCheck className="w-6 h-6" />
                                 <Target className="w-6 h-6" />
                                 <Zap className="w-6 h-6" />
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Explanation Section: How the Matrix Works */}
                <div className="mt-32 pt-32 border-t border-white/5">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                      <div className="space-y-6">
                         <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                            <Layers className="w-7 h-7 text-indigo-400" />
                         </div>
                         <h3 className="text-2xl font-black tracking-tight text-white">Multilayer Synthesis</h3>
                         <p className="text-slate-500 font-medium leading-relaxed">Our matrix doesn&apos;t just list topics. It analyzes cross-functional dependencies between hardware tools (e.g., how RTL links to Physical Design) to build a logical learning sequence.</p>
                      </div>
                      <div className="space-y-6">
                         <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <Share2 className="w-7 h-7 text-emerald-400" />
                         </div>
                         <h3 className="text-2xl font-black tracking-tight text-white">Bimodal Resources</h3>
                         <p className="text-slate-500 font-medium leading-relaxed">Every node in the matrix provides a dual-resource fork: a theoretical masterclass (Coursera Plus) and a practical, hands-on technical workshop (YouTube).</p>
                      </div>
                      <div className="space-y-6">
                         <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                            <Target className="w-7 h-7 text-purple-400" />
                         </div>
                         <h3 className="text-2xl font-black tracking-tight text-white">Domain Hardening</h3>
                         <p className="text-slate-500 font-medium leading-relaxed">The roadmap adapts its difficulty based on your initial DNA scan, ensuring you are neither overwhelmed nor bored, but constantly challenged.</p>
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            {/* Minimal Header */}
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
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Path Validated</span>
                </div>
              </div>
            </header>

            <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Roadmap Column */}
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
                            activeTab === 'beginner' ? 'bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : activeTab === 'intermediate' ? 'bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                          }`} />
                          
                          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.04] transition-all group relative overflow-hidden">
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
                                  <a 
                                    href={step.course_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20"
                                  >
                                    <GraduationCap className="w-5 h-5" />
                                    Coursera Plus
                                  </a>
                                )}
                                {step.youtube_link && (
                                  <a 
                                    href={step.youtube_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest"
                                  >
                                    <Youtube className="w-5 h-5 text-red-500" />
                                    Masterclass
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl relative z-10 font-medium">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="sticky top-24 space-y-12">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                        <Monitor className="w-5 h-5 text-indigo-500" />
                        Live Domain Pulse
                      </h3>
                      <SocialPulse domain={roadmap.domain} />
                    </div>
                  </div>
                </div>

              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
