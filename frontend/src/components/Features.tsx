'use client';

import { motion } from 'framer-motion';
import {
  Target, User, Compass, Code2, FolderKanban,
  Briefcase, AlertTriangle, Lightbulb, GitCompare,
} from 'lucide-react';

const features = [
  { icon: GitCompare,   title: 'JD Comparison',      description: 'Upload a job description alongside your resume to get a match score, skill gap analysis, missing keywords, and recruiter-grade fit rating — instantly.',  gradient: 'from-[#a855f7] to-[#8b5cf6]', glow: 'rgba(192,132,252,0.4)',  isNew: true  },
  { icon: Target,       title: 'ATS Score',          description: 'Comprehensive score out of 100 showing how your resume performs in ATS systems.',                                                                           gradient: 'from-[#8b5cf6] to-[#7c3aed]', glow: 'rgba(139,92,246,0.3)',  isNew: false },
  { icon: User,         title: 'Candidate Profile',   description: 'Automatically extract and verify contact information, name, email and phone.',                                                                             gradient: 'from-[#7c3aed] to-[#9b7ef7]', glow: 'rgba(168,85,247,0.3)',  isNew: false },
  { icon: Compass,      title: 'Domain Detection',    description: 'AI detects your primary job domain — IT, Data, Marketing, Finance, and more.',                                                                            gradient: 'from-[#10b981] to-[#34d399]', glow: 'rgba(52,211,153,0.3)',  isNew: false },
  { icon: Code2,        title: 'Skills Analysis',     description: 'Comprehensive breakdown of technical skills, frameworks, tools and soft skills.',                                                                          gradient: 'from-[#f59e0b] to-[#fbbf24]', glow: 'rgba(251,191,36,0.3)',  isNew: false },
  { icon: FolderKanban, title: 'Projects Review',     description: 'Analyze project descriptions, technologies used and impact statements for strength.',                                                                     gradient: 'from-[#ec4899] to-[#f472b6]', glow: 'rgba(236,72,153,0.3)',  isNew: false },
  { icon: Briefcase,    title: 'Experience Analysis', description: 'Evaluate work experience quality, action verbs usage and quantifiable achievements.',                                                                     gradient: 'from-[#6366f1] to-[#818cf8]', glow: 'rgba(99,102,241,0.3)',  isNew: false },
  { icon: AlertTriangle,title: 'Issue Detection',     description: 'Identify formatting issues, missing sections and ATS compatibility problems fast.',                                                                       gradient: 'from-[#f43f5e] to-[#fb7185]', glow: 'rgba(244,63,94,0.3)',   isNew: false },
  { icon: Lightbulb,    title: 'Smart Suggestions',   description: 'Get actionable recommendations to improve your resume and boost your ATS score.',                                                                         gradient: 'from-[#a855f7] to-[#38bdf8]', glow: 'rgba(192,132,252,0.3)',  isNew: false },
];

const techBadges = [
  { label: 'Next.js 14', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.25)', color: 'var(--accent-ice)'       },
  { label: 'FastAPI',    bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)', color: 'var(--emerald-neon)'     },
  { label: 'AI/ML',      bg: 'rgba(155,126,247,0.1)', border: 'rgba(155,126,247,0.25)',color: 'var(--violet-electric)'  },
  { label: 'TypeScript', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.25)', color: '#fde68a'                 },
  { label: 'Tailwind',   bg: 'rgba(192,132,252,0.1)',  border: 'rgba(192,132,252,0.25)', color: 'var(--accent-ice)'       },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24"
      style={{ background: 'var(--surface-overlay)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{
              background: 'rgba(155,126,247,0.08)',
              borderColor: 'rgba(155,126,247,0.2)',
              color: 'var(--violet-electric)',
            }}
          >
            9 Powerful Modules
          </div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">Comprehensive Resume Analysis</h2>
          <p className="section-subtitle max-w-2xl mx-auto mb-6">
            Our AI-powered analyzer examines every aspect of your resume to provide
            recruiter-level insights. Blazingly fast, ridiculously accurate. ⚡
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {techBadges.map(b => (
              <span
                key={b.label}
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ background: b.bg, borderColor: b.border, color: b.color }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* JD Comparison hero card — full width */}
        {(() => {
          const jd = features[0];
          return (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <div
                className="card-hover p-7 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(139,92,246,0.07) 100%)',
                  borderColor: 'rgba(192,132,252,0.2)',
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(192,132,252,0.12), transparent 70%)',
                    transform: 'translate(30%, -30%)',
                  }}
                />

                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${jd.gradient} flex items-center justify-center flex-shrink-0`}
                    style={{ boxShadow: `0 0 28px ${jd.glow}` }}
                  >
                    <jd.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        {jd.title}
                      </h3>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-bold tracking-wide"
                        style={{
                          background: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
                          color: '#fff',
                          boxShadow: '0 0 12px rgba(192,132,252,0.4)',
                        }}
                      >
                        NEW
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--text-muted)' }}>
                      {jd.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="#upload"
                    className="btn-secondary text-sm px-5 py-2.5 flex-shrink-0 whitespace-nowrap"
                  >
                    Try it now →
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Remaining feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.slice(1).map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card-hover p-6 group"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-4`}
                style={{ boxShadow: `0 0 20px ${feat.glow}` }}
              >
                <feat.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

