'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Loader2, AlertCircle, GraduationCap, Lock, Sparkles } from 'lucide-react';
import { apiUrl } from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';

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
    if (!password.trim()) { setError('Authentication required. Please enter the secure key.'); return; }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('password', password);

      const res  = await fetch(apiUrl('/api/hod/login'), { method: 'POST', body: form });
      const data = await res.json();

      if (!res.ok) { setError(data.detail || 'Access denied. Invalid credentials.'); return; }

      localStorage.setItem('hod_token', data.token);
      router.replace('/hod/dashboard');
    } catch {
      setError('System communication failure. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#02040a]">
      
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
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
          <div className="relative px-12 pt-16 pb-10 text-center border-b border-white/5 bg-gradient-to-b from-violet-600/5 to-transparent">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative inline-block mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white flex items-center justify-center shadow-2xl shadow-violet-500/10 relative group border border-white/5">
                <div className="absolute inset-0 bg-violet-500/5 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <Shield className="w-10 h-10 text-violet-600 relative z-10" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-violet-300 animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-black tracking-tighter mb-3 text-white">
                Admin <span className="text-violet-500">Console</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Institutional Access Node
              </p>
            </motion.div>
          </div>

          {/* Form Content */}
          <div className="px-12 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Alerts */}
                {error && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-8 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium overflow-hidden"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">
                      Secure Access Key
                    </label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input 
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter admin credentials"
                        autoFocus
                        className="w-full bg-white/5 border border-white/5 focus:border-violet-500/50 rounded-2xl px-14 py-5 text-white outline-none transition-all placeholder:text-slate-700 font-medium tracking-widest"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                              className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Synchronize Dashboard →</>}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div className="px-12 pb-12 text-center">
            <div className="h-px w-full bg-white/5 mb-8" />
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  ECE Dept · MITM · 2023 Batch
                </span>
              </div>
              <a href="/login" className="text-[10px] font-black text-slate-600 hover:text-violet-400 transition-colors uppercase tracking-[0.3em]">
                ← Back to Student Access
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-800"
        >
          Institutional Security Protocol · Nimma-MITra
        </motion.p>
      </motion.div>
    </div>
  );
}
