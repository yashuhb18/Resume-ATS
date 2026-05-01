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
  Youtube, Monitor, Terminal, ShieldCheck
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {!roadmap ? (
          /* GOD-LEVEL INITIALIZATION PORTAL */
          <motion.section 
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10"
          >
            <div className="absolute inset-0 z-0">
               <Image 
                src="/images/roadmap-hero.png" 
                alt="Intelligence"
                fill
                className="object-cover opacity-10 mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="max-w-5xl w-full relative z-10 text-center">
              <Link href="/#ece-hub" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-12 group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Command Center
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  Core Processor Active
                </div>
                <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-tight">
                  Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">Matrix</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                  Initialize a 3-tier adaptive neural roadmap designed for elite ECE engineering. Bridging the gap from zero to architectural mastery.
                </p>
              </motion.div>

              {/* Terminal-style Selector */}
              <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-mono text-gray-500 tracking-widest">RESQ_OS // SELECT_DOMAIN</span>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="block w-full px-6 py-4 text-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-xl bg-black/50 text-white cursor-pointer appearance-none"
                    >
                      {ECE_DOMAINS.map(d => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-5 bg-white text-black font-black text-lg rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> SYNCHRONIZING...</>
                    ) : (
                      <>INITIALIZE MATRIX <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="mt-6 text-red-400 font-mono text-sm">{error}</p>}
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
                   <button onClick={() => setRoadmap(null)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                   </button>
                   <h2 className="text-xl font-bold tracking-tight text-indigo-400">{roadmap.domain}</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Neural Path Validated</span>
                </div>
              </div>
            </header>

            <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Roadmap Column */}
                <div className="lg:col-span-2 space-y-12">
                  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 px-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all ${
                          activeTab === tab 
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
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
                          
                          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.02] pointer-events-none uppercase italic">Step 0{index + 1}</div>
                            
                            <div className="flex flex-col xl:flex-row justify-between gap-6 mb-8 relative z-10">
                              <div>
                                <h4 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors">{step.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {step.key_skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest px-3 py-1.5 border border-indigo-500/20 rounded-lg bg-indigo-500/5">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-3">
                                {step.course_link && (
                                  <a 
                                    href={step.course_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-indigo-500 hover:border-indigo-400 transition-all text-[11px] font-black uppercase tracking-widest"
                                  >
                                    <GraduationCap className="w-4 h-4" />
                                    Coursera Plus
                                  </a>
                                )}
                                {step.youtube_link && (
                                  <a 
                                    href={step.youtube_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest"
                                  >
                                    <Youtube className="w-4 h-4" />
                                    Masterclass
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-gray-400 leading-relaxed max-w-3xl relative z-10 font-medium">
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
                      <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                        <Monitor className="w-4 h-4 text-indigo-500" />
                        Domain Pulse
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
