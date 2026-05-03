'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Activity, BarChart3, Search,
  RefreshCw, X, Eye, ChevronRight,
  GraduationCap, TrendingUp, Filter,
  ArrowUpRight, Download, Mail
} from 'lucide-react';
import { apiUrl } from '@/utils/api';
import HodSidebar from '@/components/hod/HodSidebar';

/* ── Types ──────────────────────────────────────────────────────────────── */
interface StudentRow {
  usn: string;
  name: string;
  email: string | null;
  registered_at: string | null;
  last_active: string | null;
  activity_count: number;
}

interface ActivityEntry {
  id: number;
  action_type: string;
  data: Record<string, unknown>;
  timestamp: string | null;
}

interface StudentDetail {
  usn: string;
  name: string;
  email: string | null;
  registered_at: string | null;
  last_active: string | null;
  activities: ActivityEntry[];
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const actionLabel: Record<string, string> = {
  register:        '📝 Registered',
  login:           '🔑 Logged In',
  resume_analyze:  '📄 Analyzed Resume',
  roadmap_view:    '🗺️ Viewed Roadmap',
  compare:         '🔍 Compared Resume to JD',
  interview_chat:  '🤖 Used Interview Coach',
};

function fmt(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { dateStyle: 'medium' });
}

function getHodToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('hod_token') || '';
}

export default function HodDashboard() {
  const router = useRouter();
  const [students,   setStudents]   = useState<StudentRow[]>([]);
  const [filtered,   setFiltered]   = useState<StudentRow[]>([]);
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selected,   setSelected]   = useState<StudentDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = getHodToken();
    if (!token) { router.replace('/hod'); return; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 <= Date.now() || payload.role !== 'hod') {
        router.replace('/hod');
      }
    } catch { router.replace('/hod'); }
  }, [router]);

  const fetchStudents = useCallback(async () => {
    try {
      const res  = await fetch(apiUrl('/api/hod/students'), {
        headers: { Authorization: `Bearer ${getHodToken()}` },
      });
      if (res.status === 401 || res.status === 403) { router.replace('/hod'); return; }
      const data = await res.json();
      setStudents(data.students || []);
      setFiltered(data.students || []);
    } catch { /* ignore */ }
    finally { setLoading(false); setRefreshing(false); }
  }, [router]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q ? students.filter(s => s.usn.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
        : students
    );
  }, [search, students]);

  const openDetail = async (usn: string) => {
    setLoadingDetail(true);
    try {
      const res  = await fetch(apiUrl(`/api/hod/students/${usn}/activity`), {
        headers: { Authorization: `Bearer ${getHodToken()}` },
      });
      const data = await res.json();
      setSelected(data);
    } catch { /* ignore */ }
    finally { setLoadingDetail(false); }
  };

  const logout = () => {
    localStorage.removeItem('hod_token');
    router.replace('/hod');
  };

  const totalActivities = students.reduce((s, r) => s + r.activity_count, 0);
  const activeToday = students.filter(s => {
    if (!s.last_active) return false;
    const d = new Date(s.last_active);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020308] text-white flex">
      {/* ── Sidebar ── */}
      <HodSidebar onLogout={logout} />

      {/* ── Main Content ── */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Institutional <span className="text-violet-500">Overview</span></h1>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em]">Electronics & Communication Department</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setRefreshing(true); fetchStudents(); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Sync_Cloud
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-xs font-black uppercase tracking-widest hover:bg-violet-500 shadow-lg shadow-violet-600/20 transition-all">
              <Download className="w-3.5 h-3.5" />
              Export_Report
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Users, label: 'Enrolled Students', value: students.length, color: 'from-blue-600 to-indigo-600', trend: '+12%' },
            { icon: Activity, label: 'Current Velocity', value: activeToday, color: 'from-emerald-600 to-teal-600', trend: 'Live' },
            { icon: BarChart3, label: 'System Engagements', value: totalActivities, color: 'from-violet-600 to-purple-600', trend: '+240' },
            { icon: GraduationCap, label: 'Current Batch', value: '2023-27', color: 'from-amber-600 to-orange-600', trend: 'ECE' },
          ].map((stat) => (
            <div key={stat.label} className="inst-card group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend === 'Live' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Main Table ── */}
        <div className="inst-card !p-0 overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-500" />
                <h2 className="text-lg font-black tracking-tight">Academic Records</h2>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Filter by USN or Name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent border-none outline-none pl-10 text-sm text-slate-300 w-64 placeholder:text-slate-600"
                />
              </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Advanced_Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  {['Student Identity', 'Email Matrix', 'Joined', 'Last Presence', 'Engagements', ''].map(h => (
                    <th key={h} className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((student) => (
                  <tr 
                    key={student.usn} 
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    onClick={() => openDetail(student.usn)}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center font-black text-violet-500 text-xs">
                          {student.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{student.name}</p>
                          <p className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">{student.usn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-400">{student.email || '—'}</td>
                    <td className="px-8 py-5 text-xs text-slate-500">{fmtDate(student.registered_at)}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${new Date(student.last_active || 0).getTime() > Date.now() - 3600000 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                        <span className="text-xs text-slate-400">{fmt(student.last_active)}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                        {student.activity_count} Units
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-violet-600 group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── Detailed Ledger Overlay ── */}
      {(selected || loadingDetail) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020308]/80 backdrop-blur-md" onClick={() => setSelected(null)}>
          <div className="w-full max-w-4xl max-h-[85vh] bg-[#0a0c14] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            {loadingDetail ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
                <RefreshCw className="w-10 h-10 animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest">Compiling Records...</p>
              </div>
            ) : selected && (
              <>
                {/* Header */}
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-violet-600/10 to-transparent">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-indigo-600/20">
                      {selected.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tight text-white mb-2">{selected.name}</h3>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-lg bg-white/5 text-sm font-mono font-bold text-violet-400 border border-white/10">
                          {selected.usn}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                          <Mail className="w-3.5 h-3.5" />
                          {selected.email || 'No Email Record'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelected(null)}
                    className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-violet-500" />
                        Engagement Metrics
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Registered', value: fmtDate(selected.registered_at) },
                          { label: 'Last Presence', value: fmt(selected.last_active) },
                          { label: 'Total Units', value: selected.activities.length },
                        ].map(m => (
                          <div key={m.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                            <span className="text-xs font-black text-white">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Activity Stream */}
                  <div className="lg:col-span-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                      <Activity className="w-3 h-3 text-violet-500" />
                      Neural Activity Stream
                    </h4>
                    
                    <div className="space-y-4">
                      {selected.activities.length === 0 ? (
                        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">Zero Activity Recorded</p>
                        </div>
                      ) : (
                        selected.activities.map((act) => (
                          <div key={act.id} className="flex gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center shrink-0 text-xl">
                              {(actionLabel[act.action_type] || '⚡').split(' ')[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-black text-white uppercase tracking-tight">
                                  {(actionLabel[act.action_type] || '⚡ ' + act.action_type).split(' ').slice(1).join(' ')}
                                </p>
                                <span className="text-[10px] font-bold text-slate-600">{fmt(act.timestamp)}</span>
                              </div>
                              {act.data && Object.keys(act.data).length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {Object.entries(act.data).map(([k, v]) => (
                                    <span key={k} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5">
                                      {k}: <span className="text-slate-300">{String(v)}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
