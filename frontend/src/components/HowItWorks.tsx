'use client';

import { motion } from 'framer-motion';
import { Upload, Cpu, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Resume',
    description: 'Drag & drop your PDF or DOCX resume file. We accept any ATS-format document.',
    gradient: 'from-[#8b5cf6] to-[#7c3aed]',
    glow: 'rgba(139,92,246,0.35)',
    num: '01',
  },
  {
    icon: Cpu,
    title: 'AI Analyzes',
    description: 'Our AI parser dissects every section and scores your resume in seconds.',
    gradient: 'from-[#7c3aed] to-[#9b7ef7]',
    glow: 'rgba(168,85,247,0.35)',
    num: '02',
  },
  {
    icon: BarChart3,
    title: 'Get Insights',
    description: 'Receive your ATS score, skill gaps, issues and recruiter-grade improvements.',
    gradient: 'from-[#a855f7] to-[#38bdf8]',
    glow: 'rgba(192,132,252,0.35)',
    num: '03',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24"
      style={{ background: 'var(--surface-base)' }}
    >
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{
              background: 'rgba(139,92,246,0.08)',
              borderColor: 'rgba(139,92,246,0.2)',
              color: 'var(--accent-ice)',
            }}
          >
            Simple 3-Step Process
          </div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">How It Works</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Get your ATS score in three simple steps. No signup, no hassle, no data stored.
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
              <div className="card-hover p-8 text-center h-full">
                {/* Step number */}
                <div
                  className="absolute top-4 right-4 text-xs font-bold font-mono"
                  style={{ color: 'var(--text-faint)' }}
                >
                  {step.num}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
                  style={{ boxShadow: `0 0 28px ${step.glow}` }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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

