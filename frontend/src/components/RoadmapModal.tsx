'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Loader2, Compass, CheckCircle2 } from 'lucide-react';
import { apiUrl } from '@/utils/api';

const ECE_DOMAINS = [
  "VLSI & ASIC Design",
  "Embedded Systems & Firmware",
  "Digital Signal Processing (DSP)",
  "Telecommunications & 5G",
  "RF & Microwave Engineering",
  "Power Electronics & Drives",
  "Robotics & Automation",
  "Control Systems",
  "Photonics & Optical Networks",
  "Nanoelectronics",
  "Automotive Electronics",
  "Biomedical Engineering (Hardware)",
  "Aerospace & Avionics",
  "FPGA & Hardware Acceleration"
];

const YEARS_OF_STUDY = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "Final Year",
  "Graduate / Working Professional"
];

const SKILL_LEVELS = [
  "Absolute Beginner",
  "Basic Knowledge",
  "Intermediate",
  "Advanced"
];

interface RoadmapStep {
  title: string;
  description: string;
  key_skills: string[];
}

interface RoadmapResponse {
  domain: string;
  steps: RoadmapStep[];
}

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoadmapModal({ isOpen, onClose }: RoadmapModalProps) {
  const [selectedDomain, setSelectedDomain] = useState(ECE_DOMAINS[0]);
  const [selectedYear, setSelectedYear] = useState(YEARS_OF_STUDY[1]);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LEVELS[1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [error, setError] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setRoadmap(null);

    try {
      const response = await fetch(apiUrl('/api/generate-roadmap'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          domain: selectedDomain,
          year_of_study: selectedYear,
          current_skill_level: selectedSkill
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap. Please try again.');
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-3xl border border-white/10 shadow-2xl flex flex-col"
              style={{ background: 'var(--surface-base)', boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)' }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Compass className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Custom Roadmap Generator</h3>
                    <p className="text-sm text-purple-300/70">Powered by AI</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1">
                <div className="mb-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Your Profile</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Domain */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-purple-300">Target Domain</label>
                      <div className="relative">
                        <select
                          value={selectedDomain}
                          onChange={(e) => setSelectedDomain(e.target.value)}
                          className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-white/10 bg-black/20 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                        >
                          {ECE_DOMAINS.map(domain => (
                            <option key={domain} value={domain} className="bg-gray-900">{domain}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                    {/* Year of Study */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-purple-300">Current Status</label>
                      <div className="relative">
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-white/10 bg-black/20 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                        >
                          {YEARS_OF_STUDY.map(year => (
                            <option key={year} value={year} className="bg-gray-900">{year}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                    {/* Skill Level */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-purple-300">Skill Level</label>
                      <div className="relative">
                        <select
                          value={selectedSkill}
                          onChange={(e) => setSelectedSkill(e.target.value)}
                          className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-white/10 bg-black/20 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                        >
                          {SKILL_LEVELS.map(skill => (
                            <option key={skill} value={skill} className="bg-gray-900">{skill}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 shrink-0"
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Compass className="w-5 h-5" />}
                      {isGenerating ? 'Generating Blueprint...' : 'Generate AI Roadmap'}
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
                </div>

                {/* Loading State */}
                {isGenerating && (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
                      <div className="absolute inset-2 rounded-full border-r-2 border-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    </div>
                    <p className="text-purple-300 animate-pulse font-medium">Crafting the perfect roadmap for {selectedDomain}...</p>
                  </div>
                )}

                {/* Result State */}
                {roadmap && !isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <h4 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
                      Your {roadmap.domain} Blueprint
                    </h4>
                    
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500/50 before:to-transparent">
                      {roadmap.steps.map((step, index) => (
                        <div key={index} className="relative flex items-start gap-6 md:justify-between group">
                          {/* Timeline dot */}
                          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                            <span className="text-sm font-bold text-purple-400">{index + 1}</span>
                          </div>

                          {/* Content */}
                          <div className={`w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:ml-auto md:pl-10'}`}>
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                              <h5 className="text-lg font-bold text-white mb-2">{step.title}</h5>
                              <p className="text-sm leading-relaxed text-gray-400 mb-4">{step.description}</p>
                              <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                {step.key_skills.map((skill, sIdx) => (
                                  <span key={sIdx} className="px-2.5 py-1 text-xs font-medium rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
