'use client';

import { useState } from 'react';
import { Send, Building2, CheckCircle, Loader2 } from 'lucide-react';

const perks = [
  { title: 'Custom ATS Development',  desc: 'Tailored applicant tracking systems built for your workflow'           },
  { title: 'Resume Parsing APIs',      desc: 'Integrate AI-powered resume parsing into your existing systems'        },
  { title: 'White-label Solutions',    desc: 'Rebrand and customize this tool for your organization'                 },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid var(--surface-border2)',
    background: 'var(--surface-overlay)',
    color: 'var(--text-primary)',
    fontSize: '0.9375rem',
    fontFamily: 'Outfit, system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  } as React.CSSProperties;

  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: 'var(--surface-raised)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left content ── */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-6"
              style={{
                background: 'rgba(139,92,246,0.08)',
                borderColor: 'rgba(139,92,246,0.2)',
                color: 'var(--accent-ice)',
              }}
            >
              <Building2 className="w-4 h-4" />
              For Enterprises &amp; Businesses
            </div>

            <h2
              className="text-4xl lg:text-5xl font-bold font-display mb-6"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
            >
              Need a{' '}
              <span className="text-gradient">Custom ATS</span>
              {' '}Solution?
            </h2>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Looking to build a customized Applicant Tracking System or resume parsing solution
              for your company? Create tailored solutions that fit your specific
              hiring workflow and requirements.
            </p>

            <div className="space-y-5 mb-10">
              {perks.map(p => (
                <div key={p.title} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(139,92,246,0.12)' }}
                  >
                    <CheckCircle className="w-4.5 h-4.5" style={{ color: 'var(--brand-glow-core)' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right form ── */}
          <div
            className="card-glass rounded-3xl p-8 lg:p-10 border"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Get in Touch
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(52,211,153,0.12)' }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: 'var(--emerald-neon)' }} />
                </div>
                <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Request Captured
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Thanks for sharing the details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name',    label: 'Your Name *',       type: 'text',  placeholder: 'John Doe',          required: true  },
                  { id: 'email',   label: 'Email Address *',   type: 'email', placeholder: 'john@company.com',  required: true  },
                  { id: 'company', label: 'Company Name',      type: 'text',  placeholder: 'Acme Inc.',         required: false },
                ].map(f => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      id={f.id}
                      name={f.id}
                      required={f.required}
                      value={(formData as any)[f.id]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = 'var(--brand-glow-core)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.16)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'var(--surface-border2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project requirements..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--brand-glow-core)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.16)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--surface-border2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>
                  ) : (
                    <><Send className="w-5 h-5" /><span>Send Message</span></>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-faint)' }}>
                  This form does not store resume files.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

