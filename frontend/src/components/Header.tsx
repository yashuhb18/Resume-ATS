'use client';

import { FileText, Menu, X, Zap, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChatClick = () => {
    // Find and trigger the floating chat button
    const chatButton = document.querySelector('[aria-label="Open virtual interviewer"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
      // Scroll to bring it into view
      chatButton.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(4,7,15,0.88)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(139,92,246,0.10)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="Nimma-MITra Logo" className="w-10 h-10 rounded-xl shadow-brand-sm bg-white object-contain" />
            <span className="text-lg font-bold font-display" style={{ color: 'var(--text-primary)' }}>
              Nimma-<span className="text-gradient-brand">MITra</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { href: '#how-it-works', label: 'How It Works' },
              { href: '#features',     label: 'Features'     },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
              >
                {label}
              </a>
            ))}
            
            {/* Chat Icon Button */}
            <button
              onClick={handleChatClick}
              className="p-2.5 rounded-lg transition-all hover:scale-105"
              style={{ color: 'var(--text-secondary)' }}
              title="Open Virtual HR Interviewer"
              aria-label="Open virtual interviewer chat"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            
            <a href="#upload" className="btn-primary text-sm px-5 py-2.5">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Analyze Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-all"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-4 border-t backdrop-blur-xl rounded-b-2xl"
            style={{ background: 'rgba(4,7,15,0.96)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex flex-col gap-1 px-2">
              {[
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#features',     label: 'Features'     },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="font-medium px-4 py-3 rounded-xl transition-all"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleChatClick();
                }}
                className="font-medium px-4 py-3 rounded-xl transition-all flex items-center gap-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <MessageCircle className="w-4 h-4" />
                Virtual Interviewer
              </button>
              <a
                href="#upload"
                className="btn-primary text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analyze Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

