'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, BookOpen, 
  BarChart3, Settings, LogOut, 
  Shield, GraduationCap, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export default function HodSidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard',  href: '/hod/dashboard' },
    { icon: Users,           label: 'Students',   href: '/hod/students'  },
    { icon: BookOpen,        label: 'Resources',  href: '/hod/resources' },
    { icon: BarChart3,       label: 'Analytics',  href: '/hod/analytics' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-50 bg-[#0a0c14] border-r border-white/5 flex flex-col p-6">
      {/* ── Brand ── */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/20">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black text-white tracking-tight uppercase leading-none">
            HOD <span className="text-violet-500">Admin</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            MITM Portal
          </span>
        </div>
      </div>

      {/* ── Menu ── */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-violet-600/10 border border-violet-500/20 text-white' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-violet-500' : 'group-hover:text-slate-300'}`} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Institutional Badge ── */}
      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">ECE Dept</span>
          </div>
          <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">
            Maharaja Institute of Technology Mysore
          </p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Logout System</span>
        </button>
      </div>
    </aside>
  );
}
