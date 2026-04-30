'use client';

import { ATSIssue } from '@/types';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface IssuesCardProps { issues: ATSIssue[]; }

const sevCfg: Record<string, { icon: typeof AlertTriangle; bg: string; border: string; iconColor: string; badgeBg: string; badgeColor: string; }> = {
  High:   { icon: AlertTriangle, bg: 'rgba(251,113,133,0.06)', border: 'rgba(251,113,133,0.18)', iconColor: '#fb7185',             badgeBg: 'rgba(251,113,133,0.12)', badgeColor: '#fb7185'             },
  Medium: { icon: AlertCircle,   bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.18)',  iconColor: '#fbbf24',             badgeBg: 'rgba(251,191,36,0.12)',  badgeColor: '#fbbf24'             },
  Low:    { icon: Info,          bg: 'rgba(192,132,252,0.06)',  border: 'rgba(192,132,252,0.18)',  iconColor: 'var(--accent-ice)',   badgeBg: 'rgba(192,132,252,0.12)',  badgeColor: 'var(--accent-ice)'   },
};

export default function IssuesCard({ issues }: IssuesCardProps) {
  const high   = issues.filter(i => i.severity === 'High');
  const medium = issues.filter(i => i.severity === 'Medium');
  const sorted = [...high, ...medium, ...issues.filter(i => i.severity === 'Low')];

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251,113,133,0.12)' }}>
            <AlertTriangle className="w-5 h-5" style={{ color: '#fb7185' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>ATS Issues Detected</h2>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{issues.length} issues found</p>
          </div>
        </div>
        <div className="flex gap-2">
          {high.length > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(251,113,133,0.12)', color: '#fb7185' }}>
              {high.length} High
            </span>
          )}
          {medium.length > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>
              {medium.length} Med
            </span>
          )}
        </div>
      </div>

      {sorted.length > 0 ? (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {sorted.map((issue, i) => {
            const cfg = sevCfg[issue.severity] ?? sevCfg.Low;
            return (
              <div
                key={i}
                className="p-4 rounded-xl border"
                style={{ background: cfg.bg, borderColor: cfg.border }}
              >
                <div className="flex items-start gap-3">
                  <cfg.icon className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" style={{ color: cfg.iconColor }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{issue.description}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cfg.badgeBg, color: cfg.badgeColor }}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{issue.suggestion}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.10)' }}>
            <AlertTriangle className="w-8 h-8" style={{ color: 'var(--emerald-neon)' }} />
          </div>
          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>No major issues detected!</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Your resume looks ATS-friendly ✅</p>
        </div>
      )}
    </div>
  );
}

