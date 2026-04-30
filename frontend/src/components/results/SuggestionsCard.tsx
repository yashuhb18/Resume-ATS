'use client';

import { Suggestion } from '@/types';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

interface SuggestionsCardProps { suggestions: Suggestion[]; }

const priorityCfg: Record<string, { borderColor: string; bg: string; labelBg: string; labelColor: string }> = {
  High:   { borderColor: 'var(--brand-glow-core)',   bg: 'rgba(139,92,246,0.05)',  labelBg: 'rgba(139,92,246,0.12)',  labelColor: 'var(--accent-ice)'     },
  Medium: { borderColor: 'var(--violet-electric)',   bg: 'rgba(155,126,247,0.05)', labelBg: 'rgba(155,126,247,0.12)', labelColor: 'var(--violet-electric)' },
  Low:    { borderColor: 'var(--surface-border2)',   bg: 'var(--surface-subtle)',   labelBg: 'var(--surface-muted)',   labelColor: 'var(--text-muted)'      },
};

export default function SuggestionsCard({ suggestions }: SuggestionsCardProps) {
  return (
    <div className="card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.12)' }}>
          <Lightbulb className="w-5 h-5" style={{ color: '#fbbf24' }} />
        </div>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>AI Improvement Suggestions</h2>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{suggestions.length} suggestions</p>
        </div>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
          {suggestions.map((s, i) => {
            const cfg = priorityCfg[s.priority] ?? priorityCfg.Low;
            return (
              <div
                key={i}
                className="p-4 rounded-xl border-l-4"
                style={{ background: cfg.bg, borderLeftColor: cfg.borderColor, border: `1px solid ${cfg.borderColor}22`, borderLeft: `4px solid ${cfg.borderColor}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--surface-overlay)' }}>
                    <Sparkles className="w-4 h-4" style={{ color: cfg.labelColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{s.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cfg.labelBg, color: cfg.labelColor }}>
                        {s.category}
                      </span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{s.description}</p>

                    {s.examples.length > 0 && (
                      <div className="space-y-2">
                        {s.examples.slice(0, 3).map((ex, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-sm rounded-lg px-3 py-2"
                            style={{ background: 'var(--surface-overlay)' }}
                          >
                            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-glow-core)' }} />
                            <span style={{ color: 'var(--text-secondary)' }}>{ex}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.10)' }}>
            <Lightbulb className="w-8 h-8" style={{ color: 'var(--emerald-neon)' }} />
          </div>
          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Your resume is well-optimized!</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>No major improvements needed 🎉</p>
        </div>
      )}
    </div>
  );
}

