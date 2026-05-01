'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

const trustItems = [
  { icon: Zap,           label: 'Blazingly Fast ⚡',   color: 'var(--accent-ice)' },
  { icon: Shield,        label: 'Zero Data Stored 🔒',  color: 'var(--emerald-neon)' },
  { icon: CheckCircle2,  label: '100% Open Source',     color: 'var(--violet-electric)' },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero">

      {/* Morphing blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="blob blob-brand absolute w-[520px] h-[520px] -top-32 -left-24 opacity-25" />
        <div className="blob blob-violet absolute w-[420px] h-[420px] -bottom-16 -right-20 opacity-18" style={{ animationDelay: '2s' }} />
        <div className="blob blob-accent absolute w-[280px] h-[280px] top-1/3 right-1/4 opacity-12" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 card-glass rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--emerald-neon)] animate-pulse" />
            <Zap className="w-3.5 h-3.5 text-[var(--accent-ice)]" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              AI-Powered Resume Intelligence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            See Your Resume Through
            <br />
            <span className="text-gradient">an ATS Lens</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Upload your resume and get an ATS score, skills analysis, and recruiter-level
            insights in seconds. No signup required.
            <br />
            <span className="font-semibold block mt-3" style={{ color: 'var(--accent-ice)' }}>
              Premium Career Intelligence tailored for Electronics, Communication, and Electrical Engineers.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#upload" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group">
              Analyze Your Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Supports PDF &amp; DOCX • Max 5MB • Free forever
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-14"
          >
            {trustItems.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Humour privacy badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 card-glass rounded-full"
            style={{ borderColor: 'rgba(52,211,153,0.15)' }}
          >
            <Shield className="w-4 h-4" style={{ color: 'var(--emerald-neon)' }} />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Your data? We literally can&apos;t afford the storage to keep it 😅
            </span>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(139,92,246,0.2)] to-[rgba(168,85,247,0.2)] rounded-3xl blur-3xl" />
            <div className="relative card-glass rounded-2xl p-8">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-[rgba(251,113,133,0.7)]" />
                <span className="w-3 h-3 rounded-full bg-[rgba(251,191,36,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[rgba(52,211,153,0.7)]" />
                <div className="ml-3 flex-1 h-5 rounded-full max-w-xs" style={{ background: 'var(--surface-muted)' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score */}
                <div className="col-span-1 space-y-4">
                  <div className="h-32 rounded-xl flex items-center justify-center bg-gradient-to-br from-[var(--brand-glow-core)] to-[var(--violet-deep)] shadow-brand">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-white block">85</span>
                      <span className="text-white/70 text-xs font-medium">ATS Score</span>
                    </div>
                  </div>
                  <div className="h-3 rounded-full" style={{ background: 'var(--surface-muted)' }} />
                  <div className="h-3 rounded-full w-2/3" style={{ background: 'var(--surface-muted)' }} />
                </div>

                {/* Details */}
                <div className="col-span-2 space-y-3">
                  <div className="h-5 rounded-full w-1/2" style={{ background: 'var(--surface-muted)' }} />
                  <div className="h-3 rounded-full" style={{ background: 'var(--surface-muted)' }} />
                  <div className="h-3 rounded-full w-5/6" style={{ background: 'var(--surface-muted)' }} />
                  <div className="h-3 rounded-full w-4/6" style={{ background: 'var(--surface-muted)' }} />
                  <div className="flex gap-2 mt-5 flex-wrap">
                    {['Python', 'React', 'FastAPI', 'Docker'].map(s => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgba(139,92,246,0.12)',
                          border: '1px solid rgba(139,92,246,0.2)',
                          color: 'var(--accent-ice)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 progress-bar">
                    <div className="progress-fill" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

