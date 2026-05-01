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
  Layers, Share2, Zap, Target, FileUp, Search, Info, Activity, Radio, Github
} from 'lucide-react';

const ECE_DOMAINS = [
  "VLSI & ASIC Design",
  "Embedded Systems & Firmware",
  "Robotics & Automation",
  "Digital Signal Processing (DSP)",
  "Telecommunications & 5G"
];

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  "VLSI & ASIC Design": ["verilog", "vhdl", "rtl", "asic", "fpga", "vivado", "quartus", "cadence", "virtuoso", "cmos", "physical design", "sta"],
  "Embedded Systems & Firmware": ["embedded", "rtos", "firmware", "stm32", "arduino", "esp32", "microcontroller", "bare metal", "i2c", "spi", "uart", "arm"],
  "Robotics & Automation": ["ros", "ros2", "robotics", "lidar", "opencv", "automation", "plc", "control systems", "servo", "kinematics", "uav"],
  "Digital Signal Processing (DSP)": ["dsp", "matlab", "fourier", "filtering", "signal", "fft", "sampling", "nyquist", "noise", "audio", "video"],
  "Telecommunications & 5G": ["5g", "lte", "antenna", "rf", "telecom", "modulation", "ofdm", "wireless", "satellite", "cellular", "microwave"]
};

interface RoadmapStep {
  title: string;
  description: string;
  key_skills: string[];
  course_link?: string;
  youtube_link?: string;
  github_repo?: string;
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
  const [resumeText, setResumeText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setResumeText(text);
        analyzeResumePrecision(text);
      };
      reader.readAsText(file);
    }
  };

  const analyzeResumePrecision = async (text: string) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const lowerText = text.toLowerCase();
    let bestDomain = selectedDomain;
    let maxScore = 0;
    Object.entries(DOMAIN_KEYWORDS).forEach(([domain, keywords]) => {
      let score = 0;
      keywords.forEach(kw => { if (lowerText.includes(kw)) score++; });
      if (score > maxScore) { maxScore = score; bestDomain = domain; }
    });
    setSelectedDomain(bestDomain);
    setIsAnalyzing(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const response = await fetch(apiUrl('/api/generate-roadmap'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: selectedDomain, resume_text: resumeText })
      });
      if (!response.ok) throw new Error('Intelligence Matrix Failed.');
      const data = await response.json();
      setRoadmap(data);
      setActiveTab('beginner');
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
    <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      <AnimatePresence mode="wait">
        {!roadmap ? (
          <motion.section 
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen z-10 py-24"
          >
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                <Link href="/#ece-hub" className="inline-flex items-center gap-3 text-indigo-400 hover:text-white transition-all mb-20 group bg-white/5 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md font-bold text-sm">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Return to Dashboard
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                   <div className="relative">
                      <div className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        Intelligence Matrix Core
                      </div>
                      <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                        Target <br />
                        <span className="text-indigo-500">Alignment.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
                        Professional domain synchronization for ECE students. Upload your resume for a high-precision toolchain scan.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="p-8 card-pro">
                            <Radio className="w-8 h-8 text-indigo-400 mb-4" />
                            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-2">DNA Analysis</h4>
                            <p className="text-xs text-slate-500 font-medium">Extracting hardware toolchains with professional-grade accuracy.</p>
                         </div>
                         <div className="p-8 card-pro">
                            <Zap className="w-8 h-8 text-indigo-400 mb-4" />
                            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-2">Zero Drift</h4>
                            <p className="text-xs text-slate-500 font-medium">Aligned with FAANG semiconductor hiring benchmarks.</p>
                         </div>
                      </div>
                   </div>

                   <div className="relative">
                      <div className="bg-[#0a0c14] rounded-[3rem] p-10 md:p-14 border border-white/5 shadow-2xl">
                           <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-6">
                              <Activity className="w-5 h-5 text-indigo-400" />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">INITIALIZATION_PORTAL</span>
                           </div>

                           <div className="space-y-10">
                              <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center text-center ${
                                  resumeFile ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 bg-white/5 hover:border-indigo-500/30'
                                }`}
                              >
                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.pdf" />
                                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                                   resumeFile ? 'bg-indigo-500/20' : 'bg-white/10 group-hover:bg-indigo-500/20'
                                 }`}>
                                    {isAnalyzing ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" /> : <FileUp className={`w-8 h-8 ${resumeFile ? 'text-indigo-400' : 'text-slate-400'}`} />}
                                 </div>
                                 <h4 className="text-lg font-black">{resumeFile ? resumeFile.name : 'Scan Resume DNA'}</h4>
                              </div>

                              <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Target Sector</label>
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
                                disabled={isGenerating || isAnalyzing}
                                className="btn-primary w-full text-xl py-6"
                              >
                                {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin" /> SYNCING...</> : <>Initialize Matrix</>}
                              </button>
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 pb-24"
          >
            <header className="border-b border-white/5 bg-[#05070a]/80 backdrop-blur-xl sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <button onClick={() => setRoadmap(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                    <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className="text-sm font-black tracking-widest text-indigo-400 uppercase">{roadmap.domain}</h2>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">DNA Synchronized</span>
                </div>
              </div>
            </header>

            <main className="py-12 max-w-7xl mx-auto px-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 p-12 rounded-[3.5rem] bg-[#0a0c14] border border-white/5 flex flex-col lg:flex-row items-center gap-12"
              >
                 <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-12 h-12 text-indigo-400" />
                 </div>
                 <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-4">Role Suitability</h3>
                    <p className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">{roadmap.role_suitability}</p>
                 </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                  <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        {tab === 'beginner' ? 'Phase 01' : tab === 'intermediate' ? 'Phase 02' : 'Phase 03'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-10">
                    {getActiveSteps().map((step, index) => (
                      <div key={index} className="bg-[#0a0c14] border border-white/5 rounded-[2.5rem] p-10 hover:border-indigo-500/20 transition-all group">
                        <div className="flex flex-col xl:flex-row justify-between gap-8 mb-10">
                          <div className="flex-1">
                            <h4 className="text-3xl font-black text-white mb-6 leading-tight tracking-tight">{step.title}</h4>
                            <div className="flex flex-wrap gap-3 mb-8">
                              {step.key_skills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-4 py-2 border border-indigo-500/10 rounded-lg bg-indigo-500/5">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 h-fit">
                            {step.course_link && (
                              <a href={step.course_link} target="_blank" className="btn-primary text-xs h-14">
                                <GraduationCap className="w-5 h-5" />
                                Coursera Plus
                              </a>
                            )}
                            {step.github_repo && (
                              <a href={step.github_repo} target="_blank" className="btn-secondary text-xs h-14 bg-white/5">
                                <Github className="w-5 h-5" />
                                View Source
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-lg text-slate-400 leading-relaxed max-w-4xl mb-10 font-medium">
                          {step.description}
                        </p>

                        {/* MASTER THIS PROJECT: Highlighted Focus */}
                        <div className="project-highlight">
                           <div className="flex flex-col md:flex-row items-center gap-8">
                              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                 <Cpu className="w-8 h-8 text-indigo-400" />
                              </div>
                              <div>
                                 <h5 className="text-lg font-black text-white mb-2">Master This Project</h5>
                                 <p className="text-sm font-medium text-slate-400">{step.critical_project}</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-12">
                   <div className="p-10 card-pro">
                      <h3 className="text-[10px] font-black mb-8 uppercase tracking-widest flex items-center gap-4 text-indigo-400">
                         <Info className="w-5 h-5" />
                         Technical Briefing
                      </h3>
                      <div className="space-y-8">
                         <div className="relative pl-6 border-l border-indigo-500/30">
                            <h5 className="text-xs font-black uppercase tracking-widest text-white mb-2">Toolchain Purity</h5>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">Prioritizing Vivado, Cadence, and Synopsys mastery.</p>
                         </div>
                      </div>
                   </div>
                   <SocialPulse domain={roadmap.domain} />
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
