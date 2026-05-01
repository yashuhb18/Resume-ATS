'use client';

import { useState, useEffect, useCallback } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { healthUrl } from '@/utils/api';

const POLL_INTERVAL = 30000;

export default function BackendStatusBanner() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const checkHealth = useCallback(async () => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(healthUrl(), { signal: ctrl.signal });
      clearTimeout(t);
      setIsOnline(res.ok);
    } catch {
      setIsOnline(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const iv = setInterval(checkHealth, POLL_INTERVAL);
    return () => clearInterval(iv);
  }, [checkHealth]);

  const cfg =
    isOnline === null
      ? { bg: 'rgba(26,40,64,0.85)',   border: 'rgba(22,32,53,0.8)',    text: 'var(--text-muted)',     dot: 'var(--text-faint)',   icon: null,    label: 'Checking server...' }
      : isOnline
      ? { bg: 'rgba(1,31,13,0.85)',    border: 'rgba(52,211,153,0.2)',  text: 'var(--emerald-neon)',   dot: 'var(--emerald-neon)', icon: Wifi,    label: 'Server Online'     }
      : { bg: 'rgba(28,4,7,0.85)',     border: 'rgba(251,113,133,0.2)', text: '#fb7185',               dot: '#fb7185',             icon: WifiOff, label: 'Server Offline'    };

  return (
    <div className="fixed top-[68px] left-1/2 -translate-x-1/2 z-40">
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg transition-all duration-500"
        style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
      >
        {cfg.icon && <cfg.icon className="w-3.5 h-3.5" />}
        <span>{cfg.label}</span>
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: cfg.dot,
            boxShadow: isOnline === null ? 'none' : `0 0 6px ${cfg.dot}`,
            animation: isOnline !== false ? 'pulse 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
}
