'use client';

import { useState } from 'react';
import { Check, Clipboard, FileText, Sparkles } from 'lucide-react';
import { ResumeRewrite } from '@/types';

interface OptimizedResumeCardProps {
  rewrite: ResumeRewrite;
}

export default function OptimizedResumeCard({ rewrite }: OptimizedResumeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rewrite.ats_safe_resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.12)' }}>
            <Sparkles className="w-5 h-5" style={{ color: 'var(--emerald-neon)' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Optimized Resume Draft</h2>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>ATS-safe, industry-standard structure</p>
          </div>
        </div>
        <button onClick={handleCopy} className="btn-secondary inline-flex items-center gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Draft'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="space-y-4">
          <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}>
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--text-faint)' }}>Headline</p>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{rewrite.headline}</p>
          </div>
          <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}>
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--text-faint)' }}>Summary</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rewrite.summary}</p>
          </div>
          {Object.keys(rewrite.skills).length > 0 && (
            <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}>
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-faint)' }}>Skills</p>
              <div className="space-y-3">
                {Object.entries(rewrite.skills).map(([group, values]) => (
                  <div key={group}>
                    <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {values.slice(0, 10).map(value => (
                        <span key={value} className="badge-info text-xs">{value}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--surface-border)', background: 'var(--surface-overlay)' }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}>
            <FileText className="w-4 h-4" />
            <span className="text-sm font-semibold">Updated Resume Preview</span>
          </div>
          <pre className="p-5 text-sm leading-relaxed whitespace-pre-wrap overflow-auto max-h-[620px]" style={{ color: 'var(--text-secondary)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
            {rewrite.ats_safe_resume}
          </pre>
        </div>
      </div>

      {rewrite.notes.length > 0 && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {rewrite.notes.map(note => (
            <div key={note} className="rounded-xl px-3 py-2 text-xs border" style={{ background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.16)', color: 'var(--text-muted)' }}>
              {note}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
