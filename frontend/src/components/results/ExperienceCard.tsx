'use client';

import { ExperienceSummary } from '@/types';
import { Briefcase, TrendingUp, Hash, Zap } from 'lucide-react';

interface ExperienceCardProps { experience: ExperienceSummary; }

function qualityStyle(q: number) {
  if (q >= 70) return { bg: 'rgba(52,211,153,0.10)',  color: 'var(--emerald-neon)' };
  if (q >= 50) return { bg: 'rgba(251,191,36,0.10)',  color: '#fbbf24'             };
  return             { bg: 'rgba(251,113,133,0.10)', color: '#fb7185'             };
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const qs = qualityStyle(experience.overall_quality);

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>
            <Briefcase className="w-5 h-5" style={{ color: '#818cf8' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Work Experience</h2>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
              {experience.total_years > 0 ? `${experience.total_years} years total` : 'Experience detected'}
            </p>
          </div>
        </div>
        <span
          className="px-3 py-1.5 rounded-lg text-sm font-semibold"
          style={qs}
        >
          Quality: {experience.overall_quality}%
        </span>
      </div>

      {experience.positions.length > 0 ? (
        <div className="space-y-4">
          {experience.positions.map((pos, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border"
              style={{ background: 'var(--surface-overlay)', borderColor: 'var(--surface-border)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{pos.role || 'Role not detected'}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{pos.company || 'Company not detected'}</p>
                </div>
                {pos.duration && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium"
                    style={{ background: 'var(--surface-muted)', color: 'var(--text-muted)' }}
                  >
                    {pos.duration}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Bullet Quality: {pos.bullet_quality}%</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Action Verbs: {pos.action_verbs_count}</span>
                </div>
                {pos.has_metrics && (
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--emerald-neon)' }}>
                    <Hash className="w-3.5 h-3.5" />
                    <span>Has Metrics ✓</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Briefcase className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No work experience entries detected</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Make sure your experience section is clearly labeled</p>
        </div>
      )}
    </div>
  );
}
