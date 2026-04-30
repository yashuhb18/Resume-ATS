'use client';

import { Project } from '@/types';
import { FolderKanban, Code, Star } from 'lucide-react';

interface ProjectsCardProps { projects: Project[]; }

function scoreStyle(s: number) {
  if (s >= 70) return { bg: 'rgba(52,211,153,0.10)',  color: 'var(--emerald-neon)' };
  if (s >= 50) return { bg: 'rgba(251,191,36,0.10)',  color: '#fbbf24'             };
  return             { bg: 'rgba(251,113,133,0.10)', color: '#fb7185'             };
}

export default function ProjectsCard({ projects }: ProjectsCardProps) {
  return (
    <div className="card p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(236,72,153,0.12)' }}>
          <FolderKanban className="w-5 h-5" style={{ color: '#f472b6' }} />
        </div>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Projects</h2>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{projects.length} projects detected</p>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((proj, i) => {
            const ss = scoreStyle(proj.score);
            return (
              <div
                key={i}
                className="p-4 rounded-xl border"
                style={{ background: 'var(--surface-overlay)', borderColor: 'var(--surface-border)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold line-clamp-2 text-sm" style={{ color: 'var(--text-primary)' }}>{proj.title}</h3>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0"
                    style={ss}
                  >
                    <Star className="w-3 h-3" />
                    {proj.score}
                  </div>
                </div>

                {proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.technologies.slice(0, 5).map(tech => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: 'rgba(139,92,246,0.10)',
                          color: 'var(--accent-ice)',
                        }}
                      >
                        <Code className="w-2.5 h-2.5" />
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {proj.description && (
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{proj.description}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <FolderKanban className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No projects detected</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Add a Projects section to showcase your work</p>
        </div>
      )}
    </div>
  );
}

