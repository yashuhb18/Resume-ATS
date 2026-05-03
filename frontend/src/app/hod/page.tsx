'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Loader2, AlertCircle, GraduationCap } from 'lucide-react';
import { saveAuth, isLoggedIn } from '@/utils/auth';
import { apiUrl } from '@/utils/api';

export default function HodLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('hod_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now() && payload.role === 'hod') {
          router.replace('/hod/dashboard');
        }
      } catch { /* ignore */ }
    }
  }, [router]);

  if (!mounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password.trim()) { setError('Please enter the HOD password.'); return; }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('password', password);

      const res  = await fetch(apiUrl('/api/hod/login'), { method: 'POST', body: form });
      const data = await res.json();

      if (!res.ok) { setError(data.detail || 'Incorrect password.'); return; }

      localStorage.setItem('hod_token', data.token);
      router.replace('/hod/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
         style={{ background: 'var(--surface-base)' }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="blob blob-violet absolute w-[500px] h-[500px] top-[-100px] left-[-100px] opacity-20" />
        <div className="blob blob-brand  absolute w-[400px] h-[400px] bottom-[-80px] right-[-80px] opacity-15"
             style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative w-full max-w-sm mx-4 z-10">
        <div className="card-glass rounded-3xl border overflow-hidden"
             style={{ borderColor: 'rgba(255,255,255,0.08)' }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center"
               style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.20),rgba(99,102,241,0.12))' }}>
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                 style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)' }}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
              HOD <span className="text-violet-400">Admin Portal</span>
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Restricted Access · Department Head Only
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>ECE Dept · MITM · 2023 Batch</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 py-6 space-y-5">
            {error && (
              <div className="flex items-center gap-3 p-3 rounded-xl border text-sm"
                   style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)', color: '#f87171' }}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                     style={{ color: 'var(--text-muted)' }}>
                HOD Password
              </label>
              <div className="relative">
                <input id="hod-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter HOD password"
                  autoFocus
                  className="w-full rounded-xl px-4 py-3.5 pr-12 text-sm border outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.10)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button id="btn-hod-login" type="submit" disabled={loading}
                    className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', color: '#fff' }}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : 'Access Dashboard →'}
            </button>
          </form>

          <div className="px-8 pb-6 text-center">
            <a href="/login" className="text-xs transition-colors"
               style={{ color: 'var(--text-faint)' }}>
              ← Student Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
