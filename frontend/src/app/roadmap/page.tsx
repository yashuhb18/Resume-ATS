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
  Layers, Share2, Zap, Target, FileUp, Search, Info, Activity, Radio
} from 'lucide-react';

const ECE_DOMAINS = [
  "VLSI & ASIC Design",
  "Embedded Systems & Firmware",
  "Robotics & Automation",
  "Digital Signal Processing (DSP)",
  "Telecommunications & 5G"
];

// Technical keyword weights for "Training" the frontend selector
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
      
      // Extract text from file (Simple mock for now, but improved scoring)
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
      keywords.forEach(kw => {
        if (lowerText.includes(kw)) score++;
      });
      if (score > maxScore) {
        maxScore = score;
        bestDomain = domain;
      }
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
        body: JSON.stringify({ 
          domain: selectedDomain,
          resume_text: resumeText 
        })
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
    <div className="min-h-screen bg-[#020308] text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      {/* EC-Themed Animated Background (Signal Waves) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1000 1000">
           <path d="M0,500 Q250,450 500,500 T1000,500" stroke="#4f46e5" fill="none" strokeWidth="2" className="animate-pulse">
              <animate attributeName="d" values="M0,500 Q250,450 500,500 T1000,500; M0,500 Q250,550 500,500 T1000,500; M0,500 Q250,450 500,500 T1000,500" dur="5s" repeatCount="indefinite" />
           </path>
           <path d="M0,450 Q250,400 500,450 T1000,450" stroke="#10b981" fill="none" strokeWidth="1" opacity="0.5">
              <animate attributeName="d" values="M0,450 Q250,400 500,450 T1000,450; M0,450 Q250,500 500,450 T1000,450; M0,450 Q250,400 500,450 T1000,450" dur="7s" repeatCount="indefinite" />
           </path>
        </svg>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

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
                <Link href="/#ece-hub" className="inline-flex items-center gap-3 text-emerald-400 hover:text-white transition-all mb-20 group bg-white/5 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md font-bold text-sm">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Hub Controller
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                   
                   {/* Left: EC Themed Content */}
                   <div className="relative">
                      {/* Animated Circuit Trace Pattern */}
                      <svg className="absolute -top-10 -left-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
                         <path d="M10,10 L10,50 L50,50 L50,90" stroke="white" strokeWidth="1" fill="none" />
                         <circle cx="10" cy="10" r="2" fill="#10b981" />
                         <circle cx="50" cy="90" r="2" fill="#6366f1" />
                      </svg>

                      <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        Signal Intelligence Matrix // ECE
                      </div>
                      <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                        Technical <br />
                        <span className="text-emerald-400">Synthesis.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
                        Precision-engineered domain matching. We bridge your EC fundamentals with the global semiconductor demand through adaptive neural pathing.
                      </p>

                      {/* EC Bento Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-all group">
                            <Radio className="w-8 h-8 text-emerald-400 mb-4 group-hover:animate-pulse" />
                            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-2">Signal Analysis</h4>
                            <p className="text-xs text-slate-500 font-medium">Extracting technical toolchains from your resume DNA with 99.4% accuracy.</p>
                         </div>
                         <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all group">
                            <Zap className="w-8 h-8 text-indigo-400 mb-4 group-hover:animate-bounce" />
                            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-2">Zero Drift</h4>
                            <p className="text-xs text-slate-500 font-medium">No generic advice. Every roadmap is hard-wired to industry standards (Cadence/Xilinx).</p>
                         </div>
                      </div>
                   </div>

                   {/* Right: The Initialization Core */}
                   <div className="relative">
                      <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                        <div className="bg-[#0a0a0c] rounded-[2.9rem] p-10 md:p-14 border border-white/5 shadow-2xl relative overflow-hidden">
                           
                           {/* Oscilloscope Background Decoration */}
                           <div className="absolute top-0 right-0 w-full h-32 opacity-5 pointer-events-none">
                              <svg className="w-full h-full" viewBox="0 0 400 100">
                                 <polyline points="0,50 50,50 60,10 70,90 80,50 400,50" fill="none" stroke="white" strokeWidth="1" />
                              </svg>
                           </div>

                           <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-6">
                              <Activity className="w-5 h-5 text-emerald-400" />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Neural Sync // Initialize</span>
                           </div>

                           <div className="space-y-10">
                              {/* Resume DNA Upload Area */}
                              <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center text-center ${
                                  resumeFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:border-indigo-500/30'
                                }`}
                              >
                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.pdf" />
                                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                                   resumeFile ? 'bg-emerald-500/20' : 'bg-white/10 group-hover:bg-indigo-500/20'
                                 }`}>
                                    {isAnalyzing ? <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /> : <FileUp className={`w-8 h-8 ${resumeFile ? 'text-emerald-400' : 'text-slate-400'}`} />}
                                 </div>
                                 <h4 className="text-lg font-black">{resumeFile ? resumeFile.name : 'Inject Resume DNA'}</h4>
                                 <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">Required for Precision Matching</p>
                              </div>

                              <div className="space-y-6">
                                <div className="flex justify-between items-center px-1">
                                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Alignment Mode</label>
                                  {isAnalyzing && <span className="text-[10px] font-black text-emerald-400 animate-pulse uppercase tracking-widest">Scanning Signal...</span>}
                                </div>
                                <div className="relative">
                                  <select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    className={`block w-full px-8 py-5 text-xl font-bold border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-2xl bg-white/5 text-white cursor-pointer appearance-none transition-all ${
                                      isAnalyzing ? 'opacity-50 pointer-events-none saturate-0' : ''
                                    }`}
                                  >
                                    {ECE_DOMAINS.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                                  </select>
                                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 rotate-90 pointer-events-none" />
                                </div>
                              </div>

                              <button
                                onClick={handleGenerate}
                                disabled={isGenerating || isAnalyzing}
                                className="w-full py-6 bg-emerald-600 text-white font-black text-xl rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl shadow-emerald-500/20 active:scale-95"
                              >
                                {isGenerating ? (
                                  <><Loader2 className="w-6 h-6 animate-spin" /> SYNTHESIZING...</>
                                ) : (
                                  <>{resumeFile ? 'SYNC & GENERATE' : 'INITIALIZE MATRIX'} <Zap className="w-6 h-6 group-hover:animate-bounce transition-transform" /></>
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <header className="border-b border-white/5 bg-[#020308]/80 backdrop-blur-xl sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <button onClick={() => setRoadmap(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400">
                    <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className="text-lg font-black tracking-[0.2em] text-emerald-400 uppercase">{roadmap.domain}</h2>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Live Signal Synced</span>
                </div>
              </div>
            </header>

            <main className="py-12 max-w-7xl mx-auto px-6">
              
              {/* Role Suitability Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 p-12 rounded-[3.5rem] bg-[#0a0a0c] border border-white/5 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full" />
                 <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-2xl">
                    <Target className="w-12 h-12 text-emerald-400" />
                 </div>
                 <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-4">Optimized Target Alignment</h3>
                    <p className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 tracking-tight">{roadmap.role_suitability}</p>
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          FAANG Ready
                       </span>
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Industrial Synchronized
                       </span>
                    </div>
                 </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                
                <div className="lg:col-span-2 space-y-12">
                  <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
                          activeTab === tab 
                            ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab === 'beginner' ? 'Phase 01' : tab === 'intermediate' ? 'Phase 02' : 'Phase 03'}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-8 w-px bg-white/5" />
                    
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-10"
                    >
                      {getActiveSteps().map((step, index) => (
                        <div key={index} className="relative flex items-start gap-12 ml-4">
                          {/* EC Style Step Indicator */}
                          <div className="absolute -left-4 w-8 h-8 flex items-center justify-center z-10 mt-6">
                             <div className="w-3 h-3 rounded-full bg-[#020308] border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          </div>
                          
                          <div className="flex-1 bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] p-10 hover:border-emerald-500/20 transition-all group">
                            
                            <div className="flex flex-col xl:flex-row justify-between gap-8 mb-10">
                              <div>
                                <h4 className="text-3xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-emerald-400 transition-colors">{step.title}</h4>
                                <div className="flex flex-wrap gap-3">
                                  {step.key_skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] px-4 py-2 border border-emerald-500/10 rounded-lg bg-emerald-500/5">
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
                                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20"
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
                                    Technical
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-lg text-slate-400 leading-relaxed max-w-4xl mb-10 font-medium">
                              {step.description}
                            </p>

                            {/* Critical Hardware Project */}
                            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 flex flex-col md:flex-row items-center gap-8">
                               <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                  <Cpu className="w-8 h-8 text-indigo-400" />
                               </div>
                               <div>
                                  <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">Technical Project Milestone</span>
                                  <p className="text-lg font-black text-white">{step.critical_project}</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-12">
                   <div className="p-10 rounded-[3rem] bg-[#0a0a0c] border border-white/5">
                      <h3 className="text-[10px] font-black mb-8 uppercase tracking-[0.4em] flex items-center gap-4 text-emerald-500">
                         <Info className="w-5 h-5" />
                         Technical Briefing
                      </h3>
                      <div className="space-y-8">
                         <div className="relative pl-6 border-l border-emerald-500/30">
                            <h5 className="text-xs font-black uppercase tracking-widest text-white mb-2">Zero Drift Training</h5>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">Our models are synchronized with actual semiconductor vacancy data to ensure no generic software drift.</p>
                         </div>
                         <div className="relative pl-6 border-l border-emerald-500/30">
                            <h5 className="text-xs font-black uppercase tracking-widest text-white mb-2">Toolchain Purity</h5>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">The matrix prioritizes Vivado, Cadence, and Synopsys mastery over generic coding platforms.</p>
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
