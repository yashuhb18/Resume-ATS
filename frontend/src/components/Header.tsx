'use client';

import { Menu, X, Zap, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChatClick = () => {
    const chatButton = document.querySelector('[aria-label="Open virtual interviewer"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
      chatButton.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4'
          : 'py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div 
          className={`flex items-center justify-between transition-all duration-500 rounded-[2rem] px-8 h-16 ${
            scrolled 
              ? 'bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl' 
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
              <img src="/images/logo.png" alt="Nimma-MITra Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              Nimma-<span className="text-indigo-400">MITra</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { href: '/roadmap',      label: 'Matrix' },
              { href: '#ece-hub',      label: 'Pulse'     },
              { href: '#how-it-works', label: 'Cycle'        },
            ].map(({ href, label }) => (
              href.startsWith('/') ? (
                <Link
                  key={href}
                  href={href}
                  className="text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-400 opacity-70 hover:opacity-100"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={href}
                  href={href}
                  className="text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-400 opacity-70 hover:opacity-100"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {label}
                </a>
              )
            ))}
            
            <div className="w-px h-4 bg-white/10 mx-2" />
            
            <button
              onClick={handleChatClick}
              className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="Open virtual interviewer chat"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            
            <a href="#upload" className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              Sync DNA
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 card-glass rounded-3xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {[
                { href: '/roadmap',      label: 'Intelligence Matrix' },
                { href: '#ece-hub',      label: 'Community Pulse'     },
                { href: '#how-it-works', label: 'How It Works'        },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-6 py-4 rounded-2xl bg-white/5 font-bold text-slate-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <a
                href="#upload"
                className="mt-4 w-full py-5 btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Intelligence Scan
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
