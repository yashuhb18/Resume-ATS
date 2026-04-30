'use client';

import { ScoreBreakdown } from '@/types';
import { Target, FileCheck, Layout, Code2, Briefcase, FolderKanban } from 'lucide-react';

interface ScoreBreakdownCardProps { breakdown: ScoreBreakdown; }

const items = [
  { key: 'formatting_score',    label: 'ATS Parseability',      icon: Layout,       grad: 'from-[#10b981] to-[#34d399]', glow: 'rgba(52,211,153,0.35)'  },
  { key: 'keyword_relevance',   label: 'Role Keywords',         icon: Target,       grad: 'from-[#8b5cf6] to-[#7c3aed]', glow: 'rgba(139,92,246,0.35)'  },
  { key: 'skill_relevance',     label: 'Evidence Skills',       icon: Code2,        grad: 'from-[#f59e0b] to-[#fbbf24]', glow: 'rgba(251,191,36,0.35)'  },
  { key: 'experience_clarity',  label: 'Recruiter Readability', icon: Briefcase,    grad: 'from-[#ec4899] to-[#f472b6]', glow: 'rgba(236,72,153,0.35)'  },
  { key: 'section_completeness',label: 'Section Completeness',  icon: FileCheck,    grad: 'from-[#7c3aed] to-[#9b7ef7]', glow: 'rgba(168,85,247,0.35)'  },
  { key: 'project_impact',      label: 'Project Impact',        icon: FolderKanban, grad: 'from-[#6366f1] to-[#818cf8]', glow: 'rgba(99,102,241,0.35)'  },
];

function getBarColor(s: number) {
  if (s >= 80) return 'var(--emerald-neon)';
  if (s >= 60) return '#fbbf24';
  return '#fb7185';
}

export default function ScoreBreakdownCard({ breakdown }: ScoreBreakdownCardProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Score Breakdown</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => {
          const score = breakdown[item.key as keyof ScoreBreakdown];
          return (
            <div key={item.key} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.grad} flex items-center justify-center`}
                    style={{ boxShadow: `0 0 14px ${item.glow}` }}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: getBarColor(score) }}>{score}</span>
              </div>

              {/* Track */}
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--surface-muted)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${score}%`,
                    background: `linear-gradient(90deg, ${getBarColor(score)}88, ${getBarColor(score)})`,
                    boxShadow: `0 0 8px ${getBarColor(score)}55`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

