'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Lock, Trash2, Code } from 'lucide-react';

const cards = [
  {
    icon: Database,
    title: 'No Database',
    desc: "Zero databases = zero data breaches. It's called 'serverless security' (and being frugal) 💰",
    color: 'var(--emerald-neon)',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.15)',
  },
  {
    icon: Lock,
    title: 'Stateless API',
    desc: "Each request is a fresh start. Your resume goes in, analysis comes out, nothing stays behind. Clean AF. ✨",
    color: 'var(--accent-ice)',
    bg: 'rgba(192,132,252,0.08)',
    border: 'rgba(192,132,252,0.15)',
  },
  {
    icon: Trash2,
    title: 'Auto-Purged',
    desc: "Your file gets analyzed and immediately yeeted into the void. We couldn't recover it even if we tried. 🗑️",
    color: 'var(--violet-electric)',
    bg: 'rgba(155,126,247,0.08)',
    border: 'rgba(155,126,247,0.15)',
  },
  {
    icon: Code,
    title: 'Transparent Flow',
    desc: "Clear request handling, no hidden storage layer, and no account system between you and the analysis.",
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.15)',
  },
];

export default function PrivacyBanner() {
  return (
    <section
      className="py-20"
      style={{ background: 'var(--surface-base)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-5"
            style={{
              background: 'rgba(52,211,153,0.08)',
              borderColor: 'rgba(52,211,153,0.2)',
              color: 'var(--emerald-neon)',
            }}
          >
            <Shield className="w-4 h-4" />
            Privacy-First Architecture
          </div>

          <h2 className="section-title text-3xl sm:text-4xl mb-3">
            Your Data? We Don&apos;t Want It 🙅‍♂️
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Real talk: we literally don&apos;t store your resume data. Not because we&apos;re saints,
            but because we don&apos;t have that kind of storage budget. Your privacy is secure by poverty. 😅
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <c.icon className="w-7 h-7 mb-4" style={{ color: c.color }} />
              <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

