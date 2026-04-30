'use client';

import { SkillsData } from '@/types';
import { Code2 } from 'lucide-react';

interface SkillsCardProps { skills: SkillsData; }

const strengthStyle: Record<string, { bg: string; border: string; color: string }> = {
  Strong:   { bg: 'rgba(52,211,153,0.08)',   border: 'rgba(52,211,153,0.22)',   color: 'var(--emerald-neon)'    },
  Moderate: { bg: 'rgba(251,191,36,0.08)',   border: 'rgba(251,191,36,0.22)',   color: '#fbbf24'                },
  Weak:     { bg: 'rgba(251,113,133,0.08)',  border: 'rgba(251,113,133,0.22)',  color: '#fb7185'                },
};

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(251,191,36,0.12)' }}
        >
          <Code2 className="w-5 h-5" style={{ color: '#fbbf24' }} />
        </div>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Skills &amp; Tech Stack</h2>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{skills.total_count} skills detected</p>
        </div>
      </div>

      <div className="space-y-6">
        {skills.skill_categories.map(cat => {
          const s = strengthStyle[cat.strength] ?? strengthStyle.Weak;
          return (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{cat.name}</h3>
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                  style={s}
                >
                  {cat.strength}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'var(--surface-subtle)',
                      borderColor: 'var(--surface-border2)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {skills.soft_skills.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2.5" style={{ color: 'var(--text-secondary)' }}>Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft_skills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                  style={{
                    background: 'rgba(155,126,247,0.08)',
                    borderColor: 'rgba(155,126,247,0.2)',
                    color: 'var(--violet-electric)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
