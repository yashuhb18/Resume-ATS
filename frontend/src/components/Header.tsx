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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0c14]/90 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand: Authority & Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <img src="/images/logo.png" alt="Nimma-MITra" className="w-7 h-7 object-contain" />
          </div>
          <span className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            NIMMA-<span className="text-indigo-500">MITRA</span>
          </span>
        </Link>

        {/* Professional Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { href: '/roadmap',      label: 'Intelligence Matrix' },
            { href: '#ece-hub',      label: 'Community Pulse'     },
            { href: '#how-it-works', label: 'Process'        },
          ].map(({ href, label }) => (
            href.startsWith('/') ? (
              <Link
                key={href}
                href={href}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ) : (
              <a
                key={href}
                href={href}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                {label}
              </a>
            )
          ))}
          
          <div className="w-px h-4 bg-white/10 mx-2" />
          
          <button
            onClick={handleChatClick}
            className="text-slate-400 hover:text-indigo-400 transition-colors"
            title="Interview Coach"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          
          <a href="#upload" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-md shadow-indigo-500/10">
            Analyze Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </nav>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#111420] border-b border-white/5 p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {[
              { href: '/roadmap',      label: 'Intelligence Matrix' },
              { href: '#ece-hub',      label: 'Community Pulse'     },
              { href: '#how-it-works', label: 'Our Process'        },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-lg font-bold text-slate-300 py-2 border-b border-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a
              href="#upload"
              className="mt-4 w-full py-4 bg-indigo-600 rounded-xl text-center font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Resume Analysis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
