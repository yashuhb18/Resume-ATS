'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Loader2, CheckCircle2, WifiOff, RefreshCw } from 'lucide-react';
import { isBackendReachable } from '@/utils/api';

interface WakeUpScreenProps {
  onVerified: () => void;
}

export default function WakeUpScreen({ onVerified }: WakeUpScreenProps) {
  const [status, setStatus] = useState<'idle' | 'waking' | 'success' | 'error'>('idle');
  const [dots,   setDots]   = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (status !== 'waking') return;
    const iv = setInterval(() => setDots(d => (d.length >= 3 ? '' : d + '.')), 500);
    return () => clearInterval(iv);
  }, [status]);

  const pingBackend = useCallback(async (): Promise<boolean> => {
    return isBackendReachable(30000);
  }, []);

  const handleVerify = async () => {
    setStatus('waking');
    setAttempt(0);
    for (let i = 0; i < 5; i++) {
      setAttempt(i + 1);
      if (await pingBackend()) {
        setStatus('success');
        setTimeout(() => onVerified(), 800);
        return;
      }
      if (i < 4) await new Promise(r => setTimeout(r, 3000));
    }
    setStatus('error');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'var(--surface-base)' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="blob blob-brand absolute w-[480px] h-[480px] top-[-100px] left-[-100px] opacity-20" />
        <div className="blob blob-violet absolute w-[380px] h-[380px] bottom-[-80px] right-[-80px] opacity-15" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative w-full max-w-md mx-4">
        <div
          className="card-glass rounded-3xl p-8 sm:p-10 text-center border"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {/* Logo */}
          <div className="mb-6">
            <img src="/images/logo.png" alt="Nimma-MITra Logo" className="w-16 h-16 mx-auto rounded-2xl mb-4 shadow-brand bg-white object-contain" />
            <h1 className="text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
              Nimma-<span className="text-gradient-brand">MITra</span>
            </h1>
          </div>

          {/* ── IDLE ── */}
          {status === 'idle' && (
            <>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Welcome to Nimma-MITra!
              </p>
              <p className="text-xs mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Your personalized ECE/EEE career companion. Get daily domain updates, curated learning resources, and smart resume analysis—all in one place. Click below to wake up your assistant!
              </p>

              <button
                onClick={handleVerify}
                className="group relative w-full rounded-2xl p-5 transition-all duration-300 cursor-pointer border text-left"
                style={{
                  background: 'var(--surface-subtle)',
                  borderColor: 'var(--surface-border2)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: 'var(--text-faint)' }}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ background: 'transparent' }} />
                  </div>
                  <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                    I&apos;m not a robot
                  </span>
                </div>
              </button>

              <p className="text-xs mt-6" style={{ color: 'var(--text-faint)' }}>
                This wakes up our analysis server so you can use the tool
              </p>
            </>
          )}

          {/* ── WAKING ── */}
          {status === 'waking' && (
            <>
              <Loader2
                className="w-10 h-10 mx-auto mb-5 animate-spin"
                style={{ color: 'var(--brand-glow-core)' }}
              />
              <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                Waking up server{dots}
              </p>
              <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
                Free-tier servers sleep when inactive. This may take up to 30–60 seconds.
              </p>

              {/* Attempt dots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(n => (
                  <div
                    key={n}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      background:
                        n < attempt  ? 'var(--brand-glow-core)' :
                        n === attempt ? 'var(--accent-ice)' :
                        'var(--surface-muted)',
                    }}
                  />
                ))}
              </div>
              <p className="text-xs mb-5" style={{ color: 'var(--text-faint)' }}>
                Attempt {attempt} of 5
              </p>

              <div
                className="p-3 rounded-xl border text-xs italic"
                style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)', color: 'var(--text-faint)' }}
              >
                💡 Tip: Grab a coffee while the server wakes up!
              </div>
            </>
          )}

          {/* ── SUCCESS ── */}
          {status === 'success' && (
            <>
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(52,211,153,0.12)' }}
              >
                <CheckCircle2 className="w-9 h-9" style={{ color: 'var(--emerald-neon)' }} />
              </div>
              <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Server is online!</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Redirecting you to the analyzer...</p>
            </>
          )}

          {/* ── ERROR ── */}
          {status === 'error' && (
            <>
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(251,113,133,0.10)' }}
              >
                <WifiOff className="w-9 h-9" style={{ color: '#fb7185' }} />
              </div>
              <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Server is unavailable</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                The server couldn&apos;t be reached after multiple attempts. It may be undergoing maintenance.
              </p>
              <button onClick={handleVerify} className="btn-primary inline-flex items-center gap-2 px-6 py-3">
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={onVerified}
                className="block mx-auto mt-4 text-sm underline transition-colors"
                style={{ color: 'var(--text-faint)' }}
              >
                Continue anyway →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

