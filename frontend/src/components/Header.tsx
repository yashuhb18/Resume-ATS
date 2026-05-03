'use client';

import { Menu, X, MessageCircle, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser, clearAuth } from '@/utils/auth';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [user,           setUser]           = useState<{ usn: string; name: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const u = getUser();
    if (u) setUser({ usn: u.usn, name: u.name });
  }, []);

  const handleChatClick = () => {
    const chatButton = document.querySelector('[aria-label="Open virtual interviewer"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
      chatButton.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.replace('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0c14]/90 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <img src="/images/logo.png" alt="ECE Hub" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
              ECE <span className="text-indigo-500">Hub</span>
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
              Nimma-MITra · MSRIT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/matrix',       label: 'Career Matrix' },
            { href: '#ece-hub',      label: 'ECE Hub'       },
            { href: '#how-it-works', label: 'Process'       },
          ].map(({ href, label }) => (
            href.startsWith('/') ? (
              <Link key={href} href={href}
                    className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                {label}
              </Link>
            ) : (
              <a key={href} href={href}
                 className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                {label}
              </a>
            )
          ))}

          <div className="w-px h-4 bg-white/10" />

          <button onClick={handleChatClick}
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                  title="Interview Coach">
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Logged-in user chip */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
                   style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.20)' }}>
                <User className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
                <div>
                  <p className="text-[10px] font-black leading-none" style={{ color: 'var(--text-primary)' }}>
                    {user.name.split(' ')[0]}
                  </p>
                  <p className="text-[9px] font-mono" style={{ color: 'var(--text-faint)' }}>
                    {user.usn}
                  </p>
                </div>
              </div>
              <button onClick={handleLogout}
                      title="Logout"
                      className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                <LogOut className="w-3.5 h-3.5" style={{ color: '#f87171' }} />
              </button>
            </div>
          )}

          <a href="#upload"
             className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-md shadow-indigo-500/10">
            Analyze Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#111420] border-b border-white/5 p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {user && (
              <div className="flex items-center justify-between p-3 rounded-xl border"
                   style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.15)' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#818cf8' }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                    <p className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{user.usn}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="p-1.5 rounded-lg" style={{ color: '#f87171' }}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            {[
              { href: '/matrix',       label: 'Career Matrix' },
              { href: '#ece-hub',      label: 'ECE Hub'       },
              { href: '#how-it-works', label: 'Our Process'   },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                    className="text-lg font-bold text-slate-300 py-2 border-b border-white/5"
                    onClick={() => setMobileMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <a href="#upload"
               className="mt-4 w-full py-4 bg-indigo-600 rounded-xl text-center font-bold"
               onClick={() => setMobileMenuOpen(false)}>
              Start Resume Analysis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
