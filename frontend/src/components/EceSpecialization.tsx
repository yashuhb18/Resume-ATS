'use client';

import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Cpu, Zap, Code2, CircuitBoard, 
  TrendingUp, Compass, Target, 
  Briefcase, CheckCircle2, ChevronRight, ExternalLink,
  Layers, ShieldCheck, Share2, Network, Activity
} from 'lucide-react';
import TrendingJobModal from './TrendingJobModal';
import Link from 'next/link';

// --- 3D Interactive Card Component ---
function InteractiveCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

const domains = [
  {
    title: 'VLSI & ASIC Design',
    desc: 'Deep silicon architecture, RTL coding, and high-performance physical design.',
    icon: Cpu,
    color: '#6366f1',
    slug: 'vlsi'
  },
  {
    title: 'Embedded & Firmware',
    desc: 'Bare-metal C, RTOS, and hardware-software synchronization for IoT.',
    icon: CircuitBoard,
    color: '#10b981',
    slug: 'embedded-iot'
  },
  {
    title: 'DSP & Signal Intel',
    desc: 'Real-time algorithm deployment on DSPs and high-speed FPGA processing.',
    icon: Zap,
    color: '#8b5cf6',
    slug: 'signal-processing'
  }
];

const hotSkills = [
  { name: 'Verilog / VHDL', slug: 'verilog-vhdl' },
  { name: 'SystemVerilog', slug: 'systemverilog' },
  { name: 'MATLAB', slug: 'matlab' },
  { name: 'C / C++', slug: 'cpp' },
  { name: 'Python', slug: 'python' },
  { name: 'ROS2', slug: 'ros' },
  { name: 'Altium Designer', slug: 'altium' },
  { name: 'FPGA Prototyping', slug: 'fpga' }
];

export default function EceSpecialization() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleJobClick = (job: string) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  return (
    <section id="ece-hub" className="relative py-32 overflow-hidden bg-[#05070a] border-t border-white/5">
      
      {/* Structural Background Visuals */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 50 50 M 50 0 L 50 50 M 50 50 L 100 50 M 50 50 L 50 100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
            <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header: Authority */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="badge-intelligence mb-8 inline-block"
          >
            Specialized Hardware Intelligence
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Engineered for <span className="text-indigo-500">Excellence.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Generic platforms fail because they treat silicon as software. <strong>Nimma-MITra</strong> is built by engineers, for engineers—ensuring your architectural mastery gets the precision it demands.
          </p>
        </div>

        {/* The Hub Grid: Asymmetrical & Immersive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Core Domains (Exploded View) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-widest text-slate-500 flex items-center gap-3 mb-8">
              <Network className="w-6 h-6" /> Core Sectors
            </h3>
            {domains.map((domain, i) => (
              <InteractiveCard key={i}>
                <Link href={`/domains/${domain.slug}`} className="block">
                  <div className="card-3d p-8 bg-[#0a0c14] border-white/5 hover:border-indigo-500/30 group">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <domain.icon className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                          {domain.title}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </h4>
                        <p className="text-sm text-slate-500 leading-snug">{domain.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </InteractiveCard>
            ))}
          </div>

          {/* Center: Live Pulse & Skills */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <InteractiveCard className="h-full">
              <div className="card-3d h-full p-8 bg-gradient-to-br from-[#111420] to-[#0a0c14] border-indigo-500/10">
                <div className="flex items-center gap-3 mb-8">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-black uppercase tracking-widest">Skill Synchronization</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {hotSkills.map((skill, i) => (
                    <Link 
                      key={i} 
                      href={`/skills/${skill.slug}`}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-slate-400 hover:bg-indigo-500 hover:text-white transition-all text-center uppercase tracking-widest"
                    >
                      {skill.name}
                    </Link>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Trending Sector Roles</h4>
                  <ul className="space-y-4">
                    {['ASIC Verification Engineer', 'Embedded Firmware Developer', 'IoT Solutions Architect', 'Hardware Systems Designer'].map((job, i) => (
                      <li key={i}>
                        <button 
                          onClick={() => handleJobClick(job)}
                          className="w-full text-left flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                          {job}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InteractiveCard>
          </div>

          {/* Right: The Matrix Logic */}
          <div className="lg:col-span-4">
            <InteractiveCard className="h-full">
              <div className="card-3d h-full p-8 bg-indigo-600 border-indigo-400 shadow-2xl shadow-indigo-500/20 text-white">
                <div className="flex items-center gap-4 mb-10">
                  <Layers className="w-8 h-8 text-white" />
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">The Matrix Engine</h3>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Self-Adapting Roadmap Logic</p>
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black flex-shrink-0">1</div>
                    <p className="text-sm font-medium leading-relaxed"><span className="font-black">Dynamic DNA Scan:</span> The matrix analyzes your resume for deep-tier hardware keywords and tool-chain proficiency.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black flex-shrink-0">2</div>
                    <p className="text-sm font-medium leading-relaxed"><span className="font-black">Tri-Path Forking:</span> Based on your 'Initial IQ', the matrix splits into <strong>Beginner</strong>, <strong>Intermediate</strong>, or <strong>Lead</strong> paths.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black flex-shrink-0">3</div>
                    <p className="text-sm font-medium leading-relaxed"><span className="font-black">Resource Symbiosis:</span> Every step provides a Coursera Plus masterclass and a YouTube technical deep-dive, automatically synchronized.</p>
                  </div>
                </div>

                <Link 
                  href="/matrix"
                  className="w-full py-5 bg-white rounded-2xl text-indigo-600 font-black text-xl flex items-center justify-center gap-3 group transition-transform active:scale-95 shadow-2xl shadow-black/20"
                >
                  INITIALIZE MATRIX
                  <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </InteractiveCard>
          </div>

        </div>

        {/* Matrix Technical Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 card-glass rounded-[4rem] text-center border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="space-y-4">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-black">Zero Hallucination</h4>
                <p className="text-sm text-slate-500 font-medium">Unlike generic AI, our matrix uses pre-verified industry toolchains (Vivado, Quartus, Keil) ensuring practical validity.</p>
             </div>
             <div className="space-y-4">
                <Compass className="w-12 h-12 text-indigo-400 mx-auto" />
                <h4 className="text-xl font-black">Live Pulse Sync</h4>
                <p className="text-sm text-slate-500 font-medium">The matrix updates daily with job market trends, adjusting the priority of skills based on live semiconductor vacancies.</p>
             </div>
             <div className="space-y-4">
                <Target className="w-12 h-12 text-purple-400 mx-auto" />
                <h4 className="text-xl font-black">Role-Targeted</h4>
                <p className="text-sm text-slate-500 font-medium">Whether it's RTL design or Firmware architecture, the matrix targets specific ECE roles, not just generic skills.</p>
             </div>
          </div>
        </motion.div>
      </div>

      <TrendingJobModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} jobName={selectedJob} />
    </section>
  );
}
