'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, User, Mail, Phone, MapPin,
  Linkedin, Github, Target, Compass, Briefcase,
  AlertTriangle, Lightbulb, Loader2,
  Gauge, LayoutDashboard, Rocket
} from 'lucide-react';
import { AnalysisResult, ComparisonResult } from '@/types';
import ScoreCircle        from './results/ScoreCircle';
import ScoreBreakdownCard from './results/ScoreBreakdownCard';
import SkillsCard         from './results/SkillsCard';
import ExperienceCard     from './results/ExperienceCard';
import ProjectsCard       from './results/ProjectsCard';
import IssuesCard         from './results/IssuesCard';
import SuggestionsCard    from './results/SuggestionsCard';
import KeywordsCard       from './results/KeywordsCard';
import IndustryReportCard from './results/IndustryReportCard';
import OptimizedResumeCard from './results/OptimizedResumeCard';
import ProjectRecommendationsCard from './results/ProjectRecommendationsCard';
import AssessmentDashboard from './results/AssessmentDashboard';
import { apiUrl } from '@/utils/api';

interface ResultsDashboardProps {
  results?: AnalysisResult;
  comparisonResults?: ComparisonResult;
  resumeFile?: File | null;
  jdFile?: File | null;
  onReset: () => void;
}

/* ─── Score colour helpers ─── */
function scoreBg(s: any) {
  const score = typeof s === 'number' ? s : (s?.total_score || s?.score || 0);
  if (score >= 80) return { bg: 'rgba(52,211,153,0.07)',  border: 'rgba(52,211,153,0.20)'  };
  if (score >= 60) return { bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.20)'  };
  return                  { bg: 'rgba(251,113,133,0.07)', border: 'rgba(251,113,133,0.20)' };
}
function categoryBadge(cat: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Excellent:          { bg: 'rgba(52,211,153,0.10)',  color: 'var(--emerald-neon)'   },
    Good:               { bg: 'rgba(139,92,246,0.10)',  color: 'var(--accent-ice)'     },
    'Needs Improvement':{ bg: 'rgba(251,191,36,0.10)',  color: '#fbbf24'               },
  };
  return map[cat] ?? { bg: 'rgba(251,113,133,0.10)', color: '#fb7185' };
}

/* ─── Animated stat number ─── */
function StatNum({ value, suffix = '%', color }: { value: number; suffix?: string; color: string }) {
  return (
    <span className="text-3xl font-bold font-display" style={{ color }}>
      {value}{suffix}
    </span>
  );
}

export default function ResultsDashboard({ results, comparisonResults, onReset }: ResultsDashboardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'career'>('analysis');
  const isComparison = !!comparisonResults && !results;
  const data = results || comparisonResults;

  if (!data) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(apiUrl('/api/download-report'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to generate report');
      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = isComparison
        ? `jd-comparison-${data.candidate.name?.replace(/\s+/g, '-') || 'analysis'}.pdf`
        : `resq-resume-report-${data.candidate.name?.replace(/\s+/g, '-') || 'analysis'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const sBg  = scoreBg(data.ats_score);
  const sCat = results && 'score_category' in results ? (results as AnalysisResult).score_category : 'Analysis';
  const catB = categoryBadge(sCat);

  return (
    <div
      className="min-h-screen pt-20 pb-16"
      style={{ background: 'var(--surface-base)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="p-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'var(--surface-raised)',
                borderColor: 'var(--surface-border2)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                {isComparison ? 'Resume vs JD Comparison' : 'Resume Analysis Results'}
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {data.candidate?.name || 'Your Resume'} • Analyzed just now
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isDownloading ? 'Generating...' : 'Download Report'}
          </button>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex mb-8 bg-black/20 p-1 rounded-2xl w-fit border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'analysis'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Analysis Report
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === 'career'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Rocket className="w-4 h-4" />
            Career Hub
          </button>
        </div>

        {activeTab === 'analysis' ? (
          <>
            {/* ── Hero score row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* ATS Score card */}
          <div
            className="card p-8 border-2"
            style={{ background: sBg.bg, borderColor: sBg.border }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  ATS Score
                </h2>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={catB}
                >
                  {sCat}
                </span>
              </div>
              <ScoreCircle score={data.ats_score} size={120} />
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {data.ats_score >= 80
                ? 'Excellent! Your resume is well-optimized for ATS systems.'
                : data.ats_score >= 60
                ? 'Good start, but there\'s room for improvement.'
                : 'Your resume needs significant optimization for ATS.'}
            </p>

            {data.parsing_method === 'ocr' && (
              <div
                className="mt-4 p-3 rounded-xl border"
                style={{
                  background: 'rgba(192,132,252,0.06)',
                  borderColor: 'rgba(192,132,252,0.18)',
                }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-ice)' }}>
                  Scanned Document Detected
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  OCR was used to extract text. Confidence: {data.ocr_confidence || 'unknown'}
                </p>
              </div>
            )}
          </div>

          {/* Comparison: match % card */}
          {isComparison && comparisonResults && (
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Match Percentage</h2>
                  <span className="badge-info text-xs">Resume vs JD</span>
                </div>
                {/* Mini circle */}
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="var(--surface-muted)" strokeWidth="8" />
                    <circle
                      cx="48" cy="48" r="40" fill="none"
                      stroke="var(--brand-glow-core)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(comparisonResults.match_percentage / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                      style={{ transition: 'stroke-dasharray 1s ease-out', filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.5))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: 'var(--brand-glow-core)' }}>
                      {comparisonResults.match_percentage}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {comparisonResults.match_percentage >= 80
                  ? 'Excellent match! Your resume aligns well with the job description.'
                  : comparisonResults.match_percentage >= 60
                  ? 'Good match! Some improvements recommended.'
                  : 'Moderate match. Consider addressing the identified gaps.'}
              </p>
            </div>
          )}

          {/* Candidate profile card */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.12)' }}>
                <User className="w-5 h-5" style={{ color: 'var(--brand-glow-core)' }} />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Candidate Profile</h2>
            </div>
            <div className="space-y-3">
              {[
                { icon: User,     val: data.candidate?.name     },
                { icon: Mail,     val: data.candidate?.email    },
                { icon: Phone,    val: data.candidate?.phone    },
                { icon: MapPin,   val: data.candidate?.location },
                { icon: Linkedin, val: data.candidate?.linkedin },
                { icon: Github,   val: data.candidate?.github   },
              ].filter(r => r.val).map(({ icon: Icon, val }) => (
                <div key={val} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
                  <span className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Domain / Fit rating */}
          {isComparison && comparisonResults ? (
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(155,126,247,0.12)' }}>
                  <Briefcase className="w-5 h-5" style={{ color: 'var(--violet-electric)' }} />
                </div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Fit Rating</h2>
              </div>
              <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {comparisonResults?.recruiter_report?.fit_rating || 'Analysis Pending'}
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                {comparisonResults?.recruiter_report?.overall_summary || 'Reviewing your profile compatibility...'}
              </p>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Recommendation:</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {comparisonResults?.recruiter_report?.recommendation || 'Optimizing candidate alignment...'}
              </p>
            </div>
          ) : results ? (
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(155,126,247,0.12)' }}>
                  <Compass className="w-5 h-5" style={{ color: 'var(--violet-electric)' }} />
                </div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Detected Domain</h2>
              </div>
              <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{results?.domain?.primary || 'General'}</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-muted)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(results?.domain?.confidence || 0) * 100}%`,
                      background: 'linear-gradient(90deg, var(--violet-deep), var(--violet-electric))',
                      boxShadow: '0 0 8px rgba(155,126,247,0.5)',
                    }}
                  />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  {Math.round((results?.domain?.confidence || 0) * 100)}%
                </span>
              </div>
              {results.domain.secondary && (
                <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Secondary: </span>
                  {results.domain.secondary}
                </p>
              )}
              {results.domain.keywords_matched.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {results.domain.keywords_matched.slice(0, 5).map(kw => (
                    <span key={kw} className="badge-info text-xs">{kw}</span>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </motion.div>

        {/* ── Score breakdown / Match breakdown ── */}
        {isComparison && comparisonResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Match Breakdown</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Skill Match',      val: comparisonResults.match_breakdown.skill_match,      color: 'var(--accent-ice)'     },
                { label: 'Keyword Match',    val: comparisonResults.match_breakdown.keyword_match,    color: '#fbbf24'               },
                { label: 'Experience Match', val: comparisonResults.match_breakdown.experience_match, color: 'var(--emerald-neon)'   },
                { label: 'Overall Match',    val: comparisonResults.match_breakdown.overall_match,    color: 'var(--brand-glow-core)'},
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <StatNum value={val} color={color} />
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : results ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <ScoreBreakdownCard breakdown={results.score_breakdown} />
          </motion.div>
        ) : null}

        {data.score_methodology?.weights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.12)' }}>
                <Gauge className="w-5 h-5" style={{ color: 'var(--brand-glow-core)' }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Scoring Model
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  {data.score_methodology.model}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {Object.entries(data.score_methodology.weights).map(([label, weight]) => (
                <div
                  key={label}
                  className="rounded-xl p-3 border"
                  style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}
                >
                  <p className="text-xs mb-1" style={{ color: 'var(--text-faint)' }}>{label}</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{weight}%</p>
                </div>
              ))}
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {data.score_methodology.note}
            </p>
          </motion.div>
        )}

        {/* ── Analysis grid ── */}
        {data.industry_report && data.industry_report.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mb-8"
          >
            <IndustryReportCard report={data.industry_report} />
          </motion.div>
        )}

        {data.optimized_resume && data.optimized_resume.ats_safe_resume && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <OptimizedResumeCard rewrite={data.optimized_resume} />
          </motion.div>
        )}

        {results && !isComparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[
              { C: SkillsCard,     props: { skills: results.skills },               delay: 0.3 },
              { C: ExperienceCard, props: { experience: results.experience },        delay: 0.35 },
              { C: ProjectsCard,   props: { projects: results.projects },            delay: 0.4 },
              { C: KeywordsCard,   props: { keywords: results.keywords_analysis },   delay: 0.45 },
            ].map(({ C, props, delay }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
                <C {...(props as any)} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Comparison: missing skills / keywords ── */}
        {isComparison && comparisonResults && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {Object.keys(comparisonResults.missing_skills).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <AlertTriangle className="w-5 h-5" style={{ color: '#fbbf24' }} />
                  Missing Skills
                </h3>
                <div className="space-y-4">
                  {Object.entries(comparisonResults.missing_skills).map(([cat, skills]) => (
                    <div key={cat}>
                      <p className="text-sm font-semibold capitalize mb-2" style={{ color: 'var(--text-secondary)' }}>
                        {cat.replace(/_/g, ' ')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(skills as string[]).map(s => (
                          <span key={s} className="badge-warning text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {comparisonResults.missing_keywords.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Target className="w-5 h-5" style={{ color: 'var(--accent-ice)' }} />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {comparisonResults.missing_keywords.map(kw => (
                    <span key={kw} className="badge-info text-xs">{kw}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ── Issues & suggestions ── */}
        {results && !isComparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <IssuesCard issues={results.issues} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              <SuggestionsCard suggestions={results.suggestions} />
            </motion.div>
          </div>
        )}

        {/* ── Comparison suggestions ── */}
        {isComparison && comparisonResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 mb-8"
          >
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Lightbulb className="w-5 h-5" style={{ color: '#fbbf24' }} />
              Suggestions to Improve Match
            </h3>
            <div className="space-y-3">
              {comparisonResults.suggestions.slice(0, 5).map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border-l-4"
                  style={{
                    background: 'var(--surface-overlay)',
                    borderLeftColor: 'var(--brand-glow-core)',
                    border: '1px solid var(--surface-border)',
                    borderLeft: '4px solid var(--brand-glow-core)',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{s.title}</h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{
                        background:
                          s.priority === 'High'   ? 'rgba(251,113,133,0.12)' :
                          s.priority === 'Medium' ? 'rgba(251,191,36,0.12)' :
                          'rgba(139,92,246,0.12)',
                        color:
                          s.priority === 'High'   ? '#fb7185' :
                          s.priority === 'Medium' ? '#fbbf24' :
                          'var(--accent-ice)',
                      }}
                    >
                      {s.priority}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
          </>
        ) : (
          <>
            {/* ── ECE Features: Project Recommendations & Mock Assessment ── */}
            {data.project_recommendations && data.project_recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <ProjectRecommendationsCard recommendations={data.project_recommendations} />
              </motion.div>
            )}

            {data.assessment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <AssessmentDashboard assessment={data.assessment} />
              </motion.div>
            )}
          </>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button onClick={onReset} className="btn-primary">
              Analyze Another Resume
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isDownloading ? 'Generating...' : 'Download Full Report'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

