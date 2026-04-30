'use client';

import { motion } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(4,7,15,0.80)', backdropFilter: 'blur(12px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="card-glass rounded-3xl p-12 max-w-md w-full mx-4 text-center border"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {/* Animated icon ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full animate-pulse-glow"
            style={{ border: '2px solid rgba(139,92,246,0.2)' }}
          />
          {/* Spinning gradient ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="44" fill="none" stroke="url(#spinGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="120 180" />
            <defs>
              <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#9b7ef7" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center icon */}
          <div
            className="absolute inset-3 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(139,92,246,0.12)' }}
          >
            <FileText className="w-8 h-8" style={{ color: 'var(--brand-glow-core)' }} />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Analyzing Your Resume
        </h3>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Our AI is parsing your resume and calculating your ATS score...
        </p>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {[
            'Extracting text content',
            'Identifying skills & keywords',
            'Analyzing experience sections',
            'Calculating ATS score',
          ].map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="flex items-center gap-3"
            >
              <Loader2
                className="w-4 h-4 flex-shrink-0 animate-spin"
                style={{ color: 'var(--brand-glow-core)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

