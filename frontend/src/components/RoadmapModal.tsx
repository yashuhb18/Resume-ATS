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
      const response = await fetch(`${apiUrl}/api/generate-roadmap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: selectedDomain })
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
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Select your target domain:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-white/10 bg-black/20 text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer font-medium"
                      >
                        {ECE_DOMAINS.map(domain => (
                          <option key={domain} value={domain} className="bg-gray-900">{domain}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                    </div>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="px-8 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 shrink-0"
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Compass className="w-5 h-5" />}
                      {isGenerating ? 'Generating...' : 'Generate AI Roadmap'}
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
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
