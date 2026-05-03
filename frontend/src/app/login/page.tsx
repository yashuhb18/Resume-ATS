'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, GraduationCap, UserPlus, LogIn } from 'lucide-react';
import { saveAuth, isLoggedIn } from '@/utils/auth';
import { apiUrl } from '@/utils/api';

type Tab = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Login form
  const [loginUsn, setLoginUsn] = useState('');
  const [loginPass] = useState('ece@25');

  // Register form
  const [regUsn,  setRegUsn]  = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail,setRegEmail]= useState('');

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn()) router.replace('/');
  }, [router]);

  if (!mounted) return null;

  /* ── Login ──────────────────────────────────────────────────────────── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!loginUsn.trim()) { setError('Please enter your USN.'); return; }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('usn', loginUsn.trim().toUpperCase());
      form.append('password', loginPass);

      const res = await fetch(apiUrl('/api/auth/login'), { method: 'POST', body: form });
      let data;
      try {
        data = await res.json();
      } catch {
        setError('Backend is offline or starting up. Please wait a moment.');
        return;
      }
      if (!res.ok) { setError(data.detail || 'Login failed.'); return; }

      saveAuth(data.token, { usn: data.usn, name: data.name, role: 'student' });
      setSuccess('Welcome back! Redirecting...');
      setTimeout(() => router.replace('/'), 800);
    } catch (err) {
      console.error('Login network error:', err);
      setError('Network error: Cannot reach the backend. Please ensure the Railway server is online at https://resume-ats-backend-production.up.railway.app');
    } finally {
      setLoading(false);
    }
  };

  /* ── Register ────────────────────────────────────────────────────────── */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!regUsn.trim() || !regName.trim()) {
      setError('USN and Name are required.'); return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('usn',   regUsn.trim().toUpperCase());
      form.append('name',  regName.trim());
      form.append('email', regEmail.trim());

      const res = await fetch(apiUrl('/api/auth/register'), { method: 'POST', body: form });
      let data;
      try {
        data = await res.json();
      } catch {
        setError('Backend is offline or starting up. Please wait a moment.');
        return;
      }
      if (!res.ok) { setError(data.detail || 'Registration failed.'); return; }

      saveAuth(data.token, { usn: data.usn, name: data.name, role: 'student' });
      setSuccess('Registered successfully! Welcome to Nimma-MITra 🎉');
      setTimeout(() => router.replace('/'), 1000);
    } catch (err) {
      console.error('Registration network error:', err);
      setError('Network error: Cannot reach the backend. Please ensure the Railway server is online at https://resume-ats-backend-production.up.railway.app');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
         style={{ background: 'var(--surface-base)' }}>

      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="blob blob-brand absolute w-[500px] h-[500px] top-[-120px] left-[-150px] opacity-20" />
        <div className="blob blob-violet absolute w-[400px] h-[400px] bottom-[-100px] right-[-100px] opacity-15"
             style={{ animationDelay: '3s' }} />
        <div className="blob blob-brand absolute w-[300px] h-[300px] bottom-[80px] left-[30%] opacity-10"
             style={{ animationDelay: '6s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
           aria-hidden />

      <div className="relative w-full max-w-md mx-4 z-10">

        {/* Card */}
        <div className="card-glass rounded-3xl border overflow-hidden"
             style={{ borderColor: 'rgba(255,255,255,0.08)' }}>

          {/* Header */}
          <div className="relative px-8 pt-8 pb-6 text-center"
               style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.10))' }}>
            <div className="absolute inset-0 opacity-5"
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 11px)' }} />

            <div className="relative">
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                   style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight mb-1"
                  style={{ color: 'var(--text-primary)' }}>
                Nimma-<span className="text-indigo-400">MITra</span>
              </h1>
              <p className="text-xs font-semibold uppercase tracking-widest"
                 style={{ color: 'var(--text-muted)' }}>
                Dept. of Electronics &amp; Communication
              </p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--text-faint)' }}>
                MITM · Batch 2023–27
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex mx-8 mt-6 rounded-xl overflow-hidden border"
               style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            {(['login', 'register'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); setSuccess(''); }}
                      className="flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all"
                      style={{
                        background: tab === t ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'transparent',
                        color: tab === t ? '#fff' : 'var(--text-muted)',
                      }}>
                {t === 'login' ? <><LogIn className="w-3.5 h-3.5 inline mr-1.5" />Login</> : <><UserPlus className="w-3.5 h-3.5 inline mr-1.5" />Register</>}
              </button>
            ))}
          </div>

          {/* Forms */}
          <div className="px-8 py-6">

            {/* Alert */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl mb-5 border"
                   style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)', color: '#f87171' }}>
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-3 p-4 rounded-xl mb-5 border"
                   style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.25)', color: '#34d399' }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                         style={{ color: 'var(--text-muted)' }}>
                    University Seat Number (USN)
                  </label>
                  <input id="login-usn"
                    type="text"
                    value={loginUsn}
                    onChange={e => setLoginUsn(e.target.value)}
                    placeholder="e.g. 4MH23EC001"
                    maxLength={10}
                    autoFocus
                    className="w-full rounded-xl px-4 py-3.5 text-sm font-mono tracking-widest border outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.10)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-faint)' }}>
                    Format: 4MH23EC001 – 4MH23EC125
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                         style={{ color: 'var(--text-muted)' }}>
                    Password
                  </label>
                  <div className="relative">
                    <input id="login-password"
                      type={showPass ? 'text' : 'password'}
                      value={loginPass}
                      readOnly
                      className="w-full rounded-xl px-4 py-3.5 pr-12 text-sm border outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        color: 'var(--text-muted)',
                        cursor: 'default',
                      }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-faint)' }}>
                    Department password — same for all students
                  </p>
                </div>

                <button id="btn-login"
                  type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Logging in...</> : 'Enter Nimma-MITra →'}
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                         style={{ color: 'var(--text-muted)' }}>
                    University Seat Number (USN) *
                  </label>
                  <input id="reg-usn"
                    type="text"
                    value={regUsn}
                    onChange={e => setRegUsn(e.target.value)}
                    placeholder="e.g. 4MH23EC042"
                    maxLength={10}
                    autoFocus
                    className="w-full rounded-xl px-4 py-3.5 text-sm font-mono tracking-widest border outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.10)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-faint)' }}>
                    Only ECE 2023 batch USNs (4MH23EC001–125) are accepted
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                         style={{ color: 'var(--text-muted)' }}>
                    Full Name *
                  </label>
                  <input id="reg-name"
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl px-4 py-3.5 text-sm border outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.10)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                         style={{ color: 'var(--text-muted)' }}>
                    College Email (optional)
                  </label>
                  <input id="reg-email"
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="4mh23ec001@mitm.edu"
                    className="w-full rounded-xl px-4 py-3.5 text-sm border outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.10)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div className="p-3 rounded-xl border text-xs"
                     style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.20)', color: 'var(--text-muted)' }}>
                  🔑 Password is pre-set to <span className="font-mono font-bold text-indigo-400">ece@25</span> for all department students
                </div>

                <button id="btn-register"
                  type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Registering...</> : 'Create My Account →'}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
              HOD Portal?{' '}
              <a href="/hod" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">
                HOD Login →
              </a>
            </p>
          </div>

        </div>

        {/* Bottom badge */}
        <p className="text-center mt-6 text-xs" style={{ color: 'var(--text-faint)' }}>
          Powered by Nimma-MITra · AI Career Platform for ECE/EEE
        </p>
      </div>
    </div>
  );
}
