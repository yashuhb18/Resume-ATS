'use client';

import { FileText } from 'lucide-react';

const productLinks = ['Features', 'How It Works', 'Pricing', 'FAQ'];
const legalLinks   = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: 'var(--surface-raised)',
        borderColor: 'var(--surface-border)',
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand col */}
          <div className="col-span-1 md:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center shadow-brand-sm">
                <span className="text-white text-xl font-bold font-display">NM</span>
              </div>
              <span className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                Nimma-<span className="text-gradient-brand">MITra</span>
              </span>
            </div>

            <p className="max-w-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Nimma-MITra is your personalized career companion for ECE/EEE domains—offering daily updates, genuine learning resources, and smart resume analysis to help you grow and succeed.
            </p>

            {/* Privacy glass box */}
            <div
              className="rounded-xl p-3.5 mb-5 border"
              style={{
                background: 'rgba(52,211,153,0.04)',
                borderColor: 'rgba(52,211,153,0.14)',
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--emerald-neon)' }}>
                🔒 Zero Data Storage Policy
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                We don&apos;t store your resume data. Seriously, we couldn&apos;t even if we wanted to —
                have you seen cloud storage prices? 💸
              </p>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map(l => (
                <li key={l}>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map(l => (
                <li key={l}>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'var(--surface-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} ResQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

