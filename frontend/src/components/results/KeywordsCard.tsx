'use client';

import { KeywordsAnalysis } from '@/types';
import { Search, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface KeywordsCardProps { keywords: KeywordsAnalysis; }

export default function KeywordsCard({ keywords }: KeywordsCardProps) {
  return (
    <div className="card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(192,132,252,0.12)' }}>
          <Search className="w-5 h-5" style={{ color: 'var(--accent-ice)' }} />
        </div>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Keywords Analysis</h2>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>Important keywords for ATS</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Found */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--emerald-neon)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Found Keywords ({keywords.found.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.found.length > 0 ? keywords.found.map(kw => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{
                  background: 'rgba(52,211,153,0.08)',
                  borderColor: 'rgba(52,211,153,0.2)',
                  color: 'var(--emerald-neon)',
                }}
              >
                {kw}
              </span>
            )) : (
              <span className="text-sm" style={{ color: 'var(--text-faint)' }}>No matching keywords found</span>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4" style={{ color: '#fb7185' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Missing Keywords ({keywords.missing.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.missing.length > 0 ? keywords.missing.map(kw => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{
                  background: 'rgba(251,113,133,0.08)',
                  borderColor: 'rgba(251,113,133,0.2)',
                  color: '#fb7185',
                }}
              >
                {kw}
              </span>
            )) : (
              <span className="text-sm" style={{ color: 'var(--emerald-neon)' }}>All important keywords present! ✓</span>
            )}
          </div>
        </div>

        {/* Recommended */}
        {keywords.recommended.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--brand-glow-core)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Recommended to Add</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.recommended.map(kw => (
                <span
                  key={kw}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border border-dashed"
                  style={{
                    background: 'rgba(139,92,246,0.06)',
                    borderColor: 'rgba(139,92,246,0.28)',
                    color: 'var(--accent-ice)',
                  }}
                >
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

