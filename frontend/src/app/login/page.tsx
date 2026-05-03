'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, GraduationCap, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { saveAuth, isLoggedIn } from '@/utils/auth';
import { apiUrl } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';

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
    if (!loginUsn.trim()) { setError('Please enter your credentials.'); return; }

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
        setError('Service synchronization in progress. Please wait.');
        return;
      }
      if (!res.ok) { setError(data.detail || 'Access denied.'); return; }

      saveAuth(data.token, { usn: data.usn, name: data.name, role: 'student' });
      setSuccess('Verification successful. Redirecting...');
      setTimeout(() => router.replace('/'), 800);
    } catch (err) {
      setError('Network communication failure. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Register ────────────────────────────────────────────────────────── */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!regUsn.trim() || !regName.trim()) {
      setError('Identity verification requires USN and Name.'); return;
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
        setError('Service synchronization in progress. Please wait.');
        return;
      }
      if (!res.ok) { setError(data.detail || 'Registration encountered an issue.'); return; }

      saveAuth(data.token, { usn: data.usn, name: data.name, role: 'student' });
      setSuccess('Profile initialized successfully. Welcome to Nimma-MITra.');
      setTimeout(() => router.replace('/'), 1000);
    } catch (err) {
      setError('Network communication failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#02040a]">
      
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-lg mx-4 z-10"
      >
        {/* The Glass Container */}
        <div className="bg-[#0a0c14]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 shadow-2xl shadow-black/50 overflow-hidden">
          
          {/* Header Section */}
          <div className="relative px-12 pt-16 pb-10 text-center border-b border-white/5">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative inline-block mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white flex items-center justify-center shadow-2xl shadow-indigo-500/10 relative group border border-white/5">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <img src="/images/logo.png" alt="Nimma-MITra Logo" className="w-16 h-16 object-contain relative z-10" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-indigo-300 animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 text-white">
                Nimma-<span className="text-indigo-500">MITra</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                Career Intelligence Platform
              </p>
            </motion.div>
          </div>

          {/* Form Content */}
          <div className="px-12 py-10">
            
            {/* Tab Switcher - Pill Style */}
            <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-10 relative">
              {(['login', 'register'] as Tab[]).map(t => (
                <button 
                  key={t} 
                  onClick={() => { setTab(t); setError(''); setSuccess(''); }}
                  className={`flex-1 relative py-3 text-xs font-black uppercase tracking-widest transition-all z-10 ${
                    tab === t ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {t === 'login' ? 'Authentication' : 'Registration'}
                  {tab === t && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-indigo-600 rounded-xl -z-10 shadow-lg shadow-indigo-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === 'login' ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tab === 'login' ? 10 : -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Alerts */}
                {error && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium overflow-hidden"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium overflow-hidden"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {success}
                  </motion.div>
                )}

                {/* LOGIN FORM */}
                {tab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        Access Identification
                      </label>
                      <input 
                        type="text"
                        value={loginUsn}
                        onChange={e => setLoginUsn(e.target.value)}
                        placeholder="Enter your USN"
                        className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl px-6 py-4 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                        autoFocus
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        Secure Key
                      </label>
                      <div className="relative">
                        <input 
                          type={showPass ? 'text' : 'password'}
                          value={loginPass}
                          readOnly
                          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-slate-400 outline-none cursor-default"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                          {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <button 
                      type="submit" disabled={loading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm uppercase tracking-widest disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Initialize Access</>}
                    </button>
                  </form>
                )}

                {/* REGISTER FORM */}
                {tab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        University Seat Number
                      </label>
                      <input 
                        type="text"
                        value={regUsn}
                        onChange={e => setRegUsn(e.target.value)}
                        placeholder="e.g. 4MH23EC042"
                        className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl px-6 py-4 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        Legal Name
                      </label>
                      <input 
                        type="text"
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl px-6 py-4 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        Communication Interface
                      </label>
                      <input 
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl px-6 py-4 text-white outline-none transition-all placeholder:text-slate-600 font-medium"
                      />
                    </div>

                    <button 
                      type="submit" disabled={loading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm uppercase tracking-widest disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5" /> Deploy Profile</>}
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div className="px-12 pb-12 text-center">
            <div className="h-px w-full bg-white/5 mb-8" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">
              Authorized Institutional Personnel Only
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="/hod" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest border border-indigo-400/20 px-4 py-2 rounded-full hover:bg-indigo-400/5">
                Admin Console
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700"
        >
          Powered by Nimma-MITra · Career Intelligence
        </motion.p>
      </motion.div>
    </div>
  );
}
