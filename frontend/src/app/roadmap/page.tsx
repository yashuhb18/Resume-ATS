'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Cpu, Code2, Zap, Radio, Server,
  TrendingUp, Newspaper, ChevronRight, CheckCircle2,
  Loader2, Rocket, Trophy, Compass
} from 'lucide-react';

const ECE_DOMAINS = [
  "VLSI & ASIC Design",
  "Embedded Systems & Firmware",
  "Digital Signal Processing (DSP)",
  "Telecommunications & 5G",
  "RF & Microwave Engineering",
  "FPGA & Hardware Acceleration",
  "Robotics & Automation",
  "Control Systems",
  "Photonics & Optical Networks",
  "Nanoelectronics",
  "Automotive Electronics",
  "Biomedical Engineering (Hardware)",
  "Aerospace & Avionics"
];

interface RoadmapStep {
  title: string;
  description: string;
  key_skills: string[];
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
    
    // Simulate a slightly longer loading state to emphasize the "God Level" AI work
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
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
        throw new Error('Failed to synchronize career data. Please retry.');
      }

      const data = await response.json();
      setRoadmap(data);
      setActiveTab('beginner'); // Reset to beginner tab on new generation
    } catch (err: any) {
      setError(err.message || 'An unexpected anomaly occurred in the intelligence matrix.');
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
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      
      {/* Dynamic Hero Section */}
      <section className={`relative transition-all duration-1000 ${roadmap ? 'h-[40vh] min-h-[350px]' : 'h-screen'} flex flex-col justify-center border-b border-white/10 overflow-hidden`}>
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/roadmap-hero.png" 
            alt="Career Intelligence"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/#ece-hub" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md w-max">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Hub
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 text-white tracking-tight">
              Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Matrix</span>
            </h1>
            
            {roadmap ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md inline-block max-w-2xl"
              >
                <Newspaper className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Live Industry Pulse</h3>
                  <p className="text-sm text-indigo-100 font-medium leading-relaxed">{roadmap.news_headline}</p>
                </div>
              </motion.div>
            ) : (
              <p className="text-xl md:text-2xl text-gray-400 font-light mb-12 max-w-2xl leading-relaxed">
                Generate a dynamic, 3-tier masterclass roadmap tailored to the bleeding edge of the industry.
              </p>
            )}

            {!roadmap && (
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mt-8">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Cpu className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="block w-full pl-11 pr-10 py-4 text-base border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 sm:text-sm rounded-xl bg-black/50 text-white appearance-none cursor-pointer hover:bg-white/5 transition-colors backdrop-blur-sm"
                  >
                    {ECE_DOMAINS.map(d => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
                  </select>
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Synchronizing...</>
                  ) : (
                    <>Initialize <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            )}
            
            {error && <p className="mt-4 text-red-400 text-sm font-medium">{error}</p>}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Matrix */}
      <AnimatePresence mode="wait">
        {roadmap && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="py-12 relative"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Domain Header (If they want to change it) */}
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold font-display text-white drop-shadow-md">
                  {roadmap.domain}
                </h2>
                <button 
                  onClick={() => setRoadmap(null)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Regenerate
                </button>
              </div>

              {/* Tri-Path Navigation */}
              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  onClick={() => setActiveTab('beginner')}
                  className={`flex-1 min-w-[200px] p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                    activeTab === 'beginner' 
                      ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/30'
                  }`}
                >
                  {activeTab === 'beginner' && <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />}
                  <Compass className={`w-8 h-8 mb-4 ${activeTab === 'beginner' ? 'text-emerald-400' : 'text-gray-500 group-hover:text-emerald-400/50'}`} />
                  <h3 className={`text-xl font-bold mb-1 ${activeTab === 'beginner' ? 'text-white' : 'text-gray-400'}`}>The Engine</h3>
                  <p className="text-sm text-gray-500 font-medium">Phase 1: Absolute Beginner</p>
                </button>

                <button 
                  onClick={() => setActiveTab('intermediate')}
                  className={`flex-1 min-w-[200px] p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                    activeTab === 'intermediate' 
                      ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30'
                  }`}
                >
                  {activeTab === 'intermediate' && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />}
                  <Rocket className={`w-8 h-8 mb-4 ${activeTab === 'intermediate' ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400/50'}`} />
                  <h3 className={`text-xl font-bold mb-1 ${activeTab === 'intermediate' ? 'text-white' : 'text-gray-400'}`}>The Accelerator</h3>
                  <p className="text-sm text-gray-500 font-medium">Phase 2: Intermediate Bridge</p>
                </button>

                <button 
                  onClick={() => setActiveTab('advanced')}
                  className={`flex-1 min-w-[200px] p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                    activeTab === 'advanced' 
                      ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30'
                  }`}
                >
                  {activeTab === 'advanced' && <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />}
                  <Trophy className={`w-8 h-8 mb-4 ${activeTab === 'advanced' ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400/50'}`} />
                  <h3 className={`text-xl font-bold mb-1 ${activeTab === 'advanced' ? 'text-white' : 'text-gray-400'}`}>The Mastery</h3>
                  <p className="text-sm text-gray-500 font-medium">Phase 3: Advanced Architect</p>
                </button>
              </div>

              {/* Timeline Matrix */}
              <div className="relative">
                {/* Connecting Line */}
                <div className={`absolute top-0 bottom-0 left-8 w-1 rounded-full ${
                  activeTab === 'beginner' ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-500/10 to-transparent' :
                  activeTab === 'intermediate' ? 'bg-gradient-to-b from-blue-500/50 via-blue-500/10 to-transparent' :
                  'bg-gradient-to-b from-purple-500/50 via-purple-500/10 to-transparent'
                }`} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    {getActiveSteps().map((step, index) => (
                      <div key={index} className="relative flex items-start gap-8 ml-[1.35rem]">
                        {/* Node */}
                        <div className={`absolute -left-[1.35rem] w-6 h-6 rounded-full border-4 border-black flex-shrink-0 z-10 ${
                          activeTab === 'beginner' ? 'bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]' :
                          activeTab === 'intermediate' ? 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]' :
                          'bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]'
                        }`} />
                        
                        {/* Content Card */}
                        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors group">
                          <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between mb-6">
                            <div>
                              <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${
                                activeTab === 'beginner' ? 'text-emerald-500' :
                                activeTab === 'intermediate' ? 'text-blue-500' :
                                'text-purple-500'
                              }`}>
                                Step 0{index + 1}
                              </span>
                              <h4 className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors">{step.title}</h4>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-4xl">
                            {step.description}
                          </p>

                          <div className="space-y-3">
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Required Arsenal</h5>
                            <div className="flex flex-wrap gap-2">
                              {step.key_skills.map((skill, sIdx) => (
                                <span 
                                  key={sIdx} 
                                  className="px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-sm text-gray-300 font-medium flex items-center gap-2"
                                >
                                  <CheckCircle2 className={`w-3.5 h-3.5 ${
                                    activeTab === 'beginner' ? 'text-emerald-500' :
                                    activeTab === 'intermediate' ? 'text-blue-500' :
                                    'text-purple-500'
                                  }`} />
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
