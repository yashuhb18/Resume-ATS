'use client';

import { motion } from 'framer-motion';
import { Upload, Cpu, BarChart3, Rocket, Compass, Zap } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Input Profile',
    description: 'Upload your resume. Our engine instantly extracts your technical DNA and hardware competencies.',
    gradient: 'from-[#8b5cf6] to-[#7c3aed]',
    glow: 'rgba(139,92,246,0.35)',
    num: '01',
  },
  {
    icon: Cpu,
    title: 'Intelligence Sync',
    description: 'Nimma-MITra cross-references your profile with the live semiconductor and electronics job market.',
    gradient: 'from-[#7c3aed] to-[#9b7ef7]',
    glow: 'rgba(168,85,247,0.35)',
    num: '02',
  },
  {
    icon: Rocket,
    title: 'Accelerate Mastery',
    description: 'Get an Intelligence Matrix roadmap, live industry pulses, and mock interview coaching.',
    gradient: 'from-[#a855f7] to-[#38bdf8]',
    glow: 'rgba(192,132,252,0.35)',
    num: '03',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--surface-base)' }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5 border"
            style={{
              background: 'rgba(139,92,246,0.08)',
              borderColor: 'rgba(139,92,246,0.2)',
              color: 'var(--accent-ice)',
            }}
          >
            <Zap className="w-3 h-3" />
            Neural Synchronization
          </div>
          <h2 className="section-title text-4xl sm:text-5xl mb-4 font-black tracking-tighter">The Intelligence Cycle</h2>
          <p className="section-subtitle max-w-xl mx-auto text-gray-400 font-medium">
            Bridging the gap between your current skills and global hardware mastery in three atomic steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines (desktop) */}
          <div
            className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              <div className="card-hover p-8 text-center h-full bg-white/[0.02] border border-white/5 rounded-3xl group-hover:border-indigo-500/30 transition-all">
                {/* Step number */}
                <div
                  className="absolute top-6 right-8 text-xs font-black font-mono text-indigo-500/40"
                >
                  {step.num}
                </div>

                {/* Icon */}
                <div
                  className={`w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: `0 0 40px ${step.glow}` }}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
