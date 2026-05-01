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
  BookOpen, ExternalLink, GraduationCap
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
  course_link?: string;
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
    
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1800));
    
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
        throw new Error('Failed to synchronize career data.');
      }

      const data = await response.json();
      setRoadmap(data);
      setActiveTab('beginner');
    } catch (err: any) {
      setError(err.message || 'An unexpected anomaly occurred.');
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
      <section className={`relative transition-all duration-1000 ${roadmap ? 'h-[35vh] min-h-[300px]' : 'h-screen'} flex flex-col justify-center border-b border-white/10 overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/roadmap-hero.png" 
            alt="Career Intelligence"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/#ece-hub" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md w-max">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Hub
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-4 text-white tracking-tight">
              {roadmap ? <span className="text-indigo-400">{roadmap.domain}</span> : 'Career Matrix'}
            </h1>
            
            {!roadmap && (
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mt-8">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Cpu className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="block w-full pl-11 pr-10 py-4 text-base border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl bg-black/50 text-white cursor-pointer"
                  >
                    {ECE_DOMAINS.map(d => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
                  </select>
                </div>
                
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
                >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Launch'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <AnimatePresence mode="wait">
        {roadmap && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left: Roadmap Timeline (2/3) */}
                <div className="lg:col-span-2 space-y-12">
                  
                  {/* Tri-Path Nav */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                          activeTab === tab 
                            ? 'bg-white text-black shadow-lg' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab === 'beginner' ? 'Phase 1: Engine' : tab === 'intermediate' ? 'Phase 2: Accelerator' : 'Phase 3: Mastery'}
                      </button>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-6 w-px bg-white/10" />
                    
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      {getActiveSteps().map((step, index) => (
                        <div key={index} className="relative flex items-start gap-8 ml-[1.35rem]">
                          <div className={`absolute -left-[1.35rem] w-3 h-3 rounded-full border-2 border-black z-10 mt-2 ${
                            activeTab === 'beginner' ? 'bg-emerald-400' : activeTab === 'intermediate' ? 'bg-blue-400' : 'bg-purple-400'
                          }`} />
                          
                          <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors group">
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                              <div>
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{step.title}</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {step.key_skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="text-[10px] font-bold text-gray-500 uppercase tracking-tight px-2 py-0.5 border border-white/5 rounded bg-white/5">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {step.course_link && (
                                <a 
                                  href={step.course_link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all text-xs font-bold h-max"
                                >
                                  <GraduationCap className="w-4 h-4" />
                                  Coursera Plus Course
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Right: Social Pulse Sidebar (1/3) */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Rocket className="w-4 h-4 text-indigo-400" />
                      </div>
                      Social Intelligence
                    </h3>
                    <SocialPulse domain={roadmap.domain} />
                  </div>
                </div>

              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
