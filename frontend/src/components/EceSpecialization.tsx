'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Zap, Code2, CircuitBoard, 
  TrendingUp, Compass, Target, 
  Briefcase, CheckCircle2, ChevronRight, ExternalLink
} from 'lucide-react';
import TrendingJobModal from './TrendingJobModal';
import Link from 'next/link';

const domains = [
  {
    title: 'VLSI & ASIC Design',
    desc: 'Master the atomic level of computing with Digital Logic, Verilog, and physical design methodologies.',
    icon: Cpu,
    color: 'var(--brand-glow-core)',
    slug: 'vlsi'
  },
  {
    title: 'Embedded Systems & IoT',
    desc: 'Bridge hardware and software with RTOS, microcontrollers, and edge communication protocols.',
    icon: CircuitBoard,
    color: 'var(--emerald-neon)',
    slug: 'embedded-iot'
  },
  {
    title: 'Signal Processing',
    desc: 'Analyze, filter, and transmit real-world signals using MATLAB, DSP, and advanced algorithms.',
    icon: Zap,
    color: 'var(--violet-electric)',
    slug: 'signal-processing'
  }
];

const trendingJobs = [
  'ASIC Verification Engineer',
  'Embedded Firmware Developer',
  'IoT Solutions Architect',
  'Automation & Control Engineer',
  'Hardware Systems Designer'
];

const hotSkills = [
  { name: 'Verilog / VHDL', slug: 'verilog-vhdl' },
  { name: 'SystemVerilog', slug: 'systemverilog' },
  { name: 'MATLAB', slug: 'matlab' },
  { name: 'C / C++', slug: 'cpp' },
  { name: 'Python', slug: 'python' },
  { name: 'ROS', slug: 'ros' },
  { name: 'Altium Designer', slug: 'altium' },
  { name: 'I2C / SPI / UART', slug: 'protocols' },
  { name: 'RTOS', slug: 'rtos' },
  { name: 'FPGA Prototyping', slug: 'fpga' }
];

const roadmapSteps = [
  {
    title: 'Core Fundamentals',
    desc: 'Network Theory, Digital Logic Design, and Microprocessors.'
  },
  {
    title: 'Hardware & Software Symbiosis',
    desc: 'Mastering C/C++ alongside bare-metal microcontroller programming.'
  },
  {
    title: 'Practical Portfolios',
    desc: 'Build at least 2 hardware/software integration projects (e.g., IoT weather station, FPGA traffic controller).'
  },
  {
    title: 'Industry Standard Protocols',
    desc: 'Deep dive into standard communication protocols (SPI, I2C, UART) and RTOS concepts.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function EceSpecialization() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleJobClick = (job: string) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  return (
    <section id="ece-hub" className="relative py-24 overflow-hidden border-t border-white/5" style={{ background: 'var(--surface-base)' }}>
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-500/10 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Compass className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300 tracking-wide uppercase">
              The Engineering Hub
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display mb-6" style={{ color: 'var(--text-primary)' }}>
            Why We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Different</span>.
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Generic ATS tools treat everyone like software engineers. ResQ is built from the ground up 
            with a deep understanding of Electronics and Electrical domains, ensuring your specialized 
            hardware and firmware skills get the exact recognition they deserve.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          
          {/* Domains Column */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-white/70" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Top Domains</h3>
            </motion.div>

            {domains.map((domain, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Link href={`/domains/${domain.slug}`} className="block">
                  <div 
                    className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
                    style={{ background: 'var(--surface-overlay)', borderColor: 'var(--surface-border)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${domain.color}15` }}>
                        <domain.icon className="w-6 h-6" style={{ color: domain.color }} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                          {domain.title}
                          <ExternalLink className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {domain.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Middle Column: Skills & Jobs */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div variants={itemVariants} className="card p-6 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden h-full">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Hot Skills</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {hotSkills.map((skill, i) => (
                  <Link 
                    key={i} 
                    href={`/skills/${skill.slug}`}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-500/20 bg-indigo-500/10 text-indigo-200 hover:border-indigo-500/50 hover:bg-indigo-500/20 hover:text-white transition-all cursor-pointer"
                  >
                    {skill.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Trending Roles</h3>
              </div>

              <ul className="space-y-3">
                {trendingJobs.map((job, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleJobClick(job)}
                      className="w-full text-left flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-emerald-500/10 transition-colors group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium group-hover:text-emerald-300 transition-colors" style={{ color: 'var(--text-secondary)' }}>{job}</span>
                      <ChevronRight className="w-4 h-4 text-emerald-500/0 group-hover:text-emerald-500/50 ml-auto -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Fresher Roadmap */}
          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="card p-6 border-purple-500/20 bg-purple-500/5 h-full relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>The Fresher Roadmap</h3>
                  <p className="text-xs mt-1 text-purple-300/70">What you need to land your first role</p>
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500/50 before:to-transparent">
                {roadmapSteps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center flex-shrink-0 z-10 mt-1">
                      <span className="text-xs font-bold text-purple-300">{i + 1}</span>
                    </div>
                    <div className="pt-1 pb-4">
                      <h4 className="text-base font-bold text-purple-200 mb-1">{step.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                href="/roadmap"
                className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition-colors text-white font-semibold group shadow-lg shadow-purple-500/25"
              >
                Launch Intelligence Matrix
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </div>

      <TrendingJobModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} jobName={selectedJob} />
    </section>
  );
}
