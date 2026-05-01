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

// --- Professional Interactive Card ---
function InteractiveCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
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
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
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
    slug: 'vlsi'
  },
  {
    title: 'Embedded & Firmware',
    desc: 'Bare-metal C, RTOS, and hardware-software synchronization for IoT.',
    icon: CircuitBoard,
    slug: 'embedded-iot'
  },
  {
    title: 'DSP & Signal Intel',
    desc: 'Real-time algorithm deployment on DSPs and high-speed FPGA processing.',
    icon: Zap,
    slug: 'signal-processing'
  }
];

export default function EceSpecialization() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleJobClick = (job: string) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  return (
    <section id="ece-hub" className="relative py-32 overflow-hidden bg-[#05070a]">
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
          >
            Specialized Hardware Intelligence
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Engineered for <span className="text-indigo-500">Authority.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Nimma-MITra provides professional-grade career acceleration strategies for the next generation of semiconductor engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-3 mb-8">
              <Network className="w-5 h-5" /> Core Sectors
            </h3>
            {domains.map((domain, i) => (
              <InteractiveCard key={i}>
                <Link href={`/domains/${domain.slug}`} className="block">
                  <div className="card-pro p-8 hover:border-indigo-500/30 group">
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

          <div className="lg:col-span-4 flex flex-col gap-6">
            <InteractiveCard className="h-full">
              <div className="card-pro h-full p-8 bg-gradient-to-br from-[#0a0c14] to-[#05070a]">
                <div className="flex items-center gap-3 mb-8">
                  <Activity className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-xl font-black uppercase tracking-widest">Skill Sync</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {['Verilog', 'SystemVerilog', 'MATLAB', 'C / C++', 'Python', 'RTOS'].map((skill, i) => (
                    <div key={i} className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Trending Roles</h4>
                  <ul className="space-y-4">
                    {['ASIC Verification Engineer', 'Embedded Firmware Dev', 'Hardware Systems Lead'].map((job, i) => (
                      <li key={i}>
                        <button 
                          onClick={() => handleJobClick(job)}
                          className="w-full text-left flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-indigo-400 transition-colors group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {job}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InteractiveCard>
          </div>

          <div className="lg:col-span-4">
            <InteractiveCard className="h-full">
              <div className="card-pro h-full p-10 bg-indigo-600 border-indigo-400 text-white shadow-2xl shadow-indigo-500/20">
                <div className="flex items-center gap-4 mb-12">
                  <Layers className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-black tracking-tight uppercase">The Matrix</h3>
                </div>

                <div className="space-y-10 mb-12">
                  {[
                    { t: 'DNA Scan', d: 'Analyzing hardware toolchain proficiency.' },
                    { t: 'Path Forking', d: 'Tri-tier roadmap synchronization.' },
                    { t: 'Resource Sync', d: 'Project-centric technical mastery.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black flex-shrink-0 text-xs">{i+1}</div>
                      <p className="text-sm font-medium leading-relaxed"><span className="font-black uppercase tracking-widest block mb-1">{item.t}</span>{item.d}</p>
                    </div>
                  ))}
                </div>

                <Link href="/roadmap" className="w-full py-5 bg-white rounded-2xl text-indigo-600 font-black text-xl flex items-center justify-center gap-3 group shadow-2xl transition-transform active:scale-95">
                  INITIALIZE
                  <Share2 className="w-6 h-6" />
                </Link>
              </div>
            </InteractiveCard>
          </div>

        </div>
      </div>

      <TrendingJobModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} jobName={selectedJob} />
    </section>
  );
}
