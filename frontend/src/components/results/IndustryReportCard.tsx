'use client';

import { IndustryReport } from '@/types';
import { AlertTriangle, CheckCircle2, ChevronDown, FileCheck2, ShieldCheck, Target, TextSearch } from 'lucide-react';

interface IndustryReportCardProps {
  report: IndustryReport;
}

const iconMap: Record<string, typeof TextSearch> = {
  Content: TextSearch,
  Sections: FileCheck2,
  'ATS Essentials': ShieldCheck,
  Tailoring: Target,
};

function statusColor(score: number) {
  if (score >= 82) return { color: 'var(--emerald-neon)', bg: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.18)' };
  if (score >= 62) return { color: '#fbbf24', bg: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.18)' };
  return { color: '#fb7185', bg: 'rgba(251,113,133,0.10)', border: 'rgba(251,113,133,0.18)' };
}

export default function IndustryReportCard({ report }: IndustryReportCardProps) {
  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Industry Screener Report</h2>
          <p className="text-xs mt-1 max-w-2xl" style={{ color: 'var(--text-faint)' }}>{report.benchmark}</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full font-semibold self-start" style={{ background: 'rgba(139,92,246,0.12)', color: 'var(--accent-ice)' }}>
          {report.model}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {report.categories.map(category => {
          const Icon = iconMap[category.name] ?? TextSearch;
          const cfg = statusColor(category.score);
          return (
            <div key={category.name} className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: cfg.border }}>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: cfg.bg }}>
                    <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{category.name}</span>
                </div>
                <span className="text-lg font-bold" style={{ color: cfg.color }}>{category.score}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'var(--surface-muted)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${category.score}%`, background: cfg.color }} />
              </div>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                {category.issue_count === 0 ? 'No issues' : `${category.issue_count} issue${category.issue_count === 1 ? '' : 's'}`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {report.categories.map(category => (
          <details key={category.name} className="rounded-2xl border p-4 group" style={{ background: 'var(--surface-overlay)', borderColor: 'var(--surface-border)' }}>
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{category.name} Checks</span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" style={{ color: 'var(--text-muted)' }} />
            </summary>
            <div className="mt-4 space-y-3">
              {category.checks.map(check => {
                const cfg = statusColor(check.score);
                const StatusIcon = check.status === 'Pass' ? CheckCircle2 : AlertTriangle;
                return (
                  <div key={check.name} className="rounded-xl p-3 border" style={{ background: 'var(--surface-subtle)', borderColor: cfg.border }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <StatusIcon className="w-4 h-4 flex-shrink-0" style={{ color: cfg.color }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{check.name}</span>
                      </div>
                      <span className="text-xs font-bold flex-shrink-0" style={{ color: cfg.color }}>{check.score}%</span>
                    </div>
                    {check.findings.length > 0 && (
                      <div className="space-y-1 mb-2">
                        {check.findings.slice(0, 2).map(finding => (
                          <p key={finding} className="text-xs" style={{ color: 'var(--text-muted)' }}>{finding}</p>
                        ))}
                      </div>
                    )}
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-faint)' }}>{check.recommendation}</p>
                  </div>
                );
              })}
            </div>
          </details>
        ))}
      </div>

      {report.top_actions.length > 0 && (
        <div className="mt-5 rounded-2xl p-4 border" style={{ background: 'rgba(139,92,246,0.06)', borderColor: 'rgba(139,92,246,0.16)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Top Fixes</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {report.top_actions.slice(0, 4).map(action => (
              <div key={action} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--emerald-neon)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
