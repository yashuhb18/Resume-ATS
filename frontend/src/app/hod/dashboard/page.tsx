'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Activity, BookOpen, BarChart3, Search, LogOut,
  Shield, ChevronRight, Clock, RefreshCw, X, Eye,
  GraduationCap, Cpu, TrendingUp, Calendar
} from 'lucide-react';
import { apiUrl } from '@/utils/api';

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
  unknown:         '⚡ Activity',
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

/* ── Main Component ─────────────────────────────────────────────────────── */
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

  /* Auth guard */
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

  /* Search filter */
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

  /* Stat counts */
  const totalActivities  = students.reduce((s, r) => s + r.activity_count, 0);
  const activeToday = students.filter(s => {
    if (!s.last_active) return false;
    const d = new Date(s.last_active);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-base)' }}>

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b"
              style={{ background: 'rgba(10,12,20,0.92)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>HOD Admin Portal</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
                ECE Dept · MSRIT · 2023 Batch
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setRefreshing(true); fetchStudents(); }}
                    className="p-2 rounded-lg transition-colors hover:bg-white/5"
                    title="Refresh">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} style={{ color: 'var(--text-muted)' }} />
            </button>
            <button onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                    style={{ background: 'rgba(239,68,68,0.10)', color: '#f87171', border: '1px solid rgba(239,68,68,0.20)' }}>
              <LogOut className="w-3.5 h-3.5" />Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats Row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users,       label: 'Total Students',  value: students.length,  color: '#6366f1' },
            { icon: Activity,    label: 'Active Today',    value: activeToday,      color: '#34d399' },
            { icon: BarChart3,   label: 'Total Actions',   value: totalActivities,  color: '#f59e0b' },
            { icon: GraduationCap, label: 'ECE 2023 Batch', value: '4MH23EC', color: '#8b5cf6' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card-glass rounded-2xl p-5 border"
                 style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                     style={{ background: `${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Student Table ──────────────────────────────────────────────── */}
        <div className="card-glass rounded-2xl border overflow-hidden"
             style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

          {/* Table Header */}
          <div className="px-6 py-5 border-b flex items-center justify-between gap-4"
               style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" style={{ color: '#6366f1' }} />
              <h2 className="text-base font-black" style={{ color: 'var(--text-primary)' }}>
                Registered Students
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                {filtered.length}
              </span>
            </div>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-faint)' }} />
              <input
                type="text"
                placeholder="Search USN or name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3" style={{ color: 'var(--text-muted)' }}>
              <RefreshCw className="w-5 h-5 animate-spin" />Loading students...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center" style={{ color: 'var(--text-muted)' }}>
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">{search ? 'No students match your search.' : 'No students registered yet.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['USN', 'Name', 'Email', 'Registered', 'Last Active', 'Actions', ''].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: 'var(--text-faint)', background: 'rgba(255,255,255,0.02)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.usn}
                        className="transition-colors hover:bg-white/[0.02] cursor-pointer"
                        style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                        onClick={() => openDetail(s.usn)}>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg"
                              style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
                          {s.usn}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {s.name}
                      </td>
                      <td className="px-6 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {s.email || '—'}
                      </td>
                      <td className="px-6 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {fmtDate(s.registered_at)}
                      </td>
                      <td className="px-6 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {fmt(s.last_active)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                              style={{ background: 'rgba(52,211,153,0.10)', color: '#34d399' }}>
                          {s.activity_count} actions
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-1 text-xs font-bold transition-colors"
                                style={{ color: 'var(--text-faint)' }}>
                          <Eye className="w-3.5 h-3.5" />View
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Student Detail Modal ──────────────────────────────────────────── */}
      {(selected || loadingDetail) && (
        <div className="fixed inset-0 z-50 flex items-start justify-end"
             style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
             onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-lg overflow-y-auto shadow-2xl"
               style={{ background: 'var(--surface-base)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
               onClick={e => e.stopPropagation()}>

            {loadingDetail ? (
              <div className="flex items-center justify-center h-64 gap-3" style={{ color: 'var(--text-muted)' }}>
                <RefreshCw className="w-5 h-5 animate-spin" />Loading...
              </div>
            ) : selected && (
              <>
                {/* Drawer Header */}
                <div className="sticky top-0 z-10 px-6 py-5 border-b flex items-center justify-between"
                     style={{ background: 'var(--surface-base)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div>
                    <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{selected.name}</p>
                    <p className="text-xs font-mono font-bold" style={{ color: '#818cf8' }}>{selected.usn}</p>
                  </div>
                  <button onClick={() => setSelected(null)}
                          className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Profile info */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: BookOpen, label: 'Email', value: selected.email || 'Not provided' },
                      { icon: Calendar, label: 'Registered', value: fmtDate(selected.registered_at) },
                      { icon: Clock,    label: 'Last Active', value: fmt(selected.last_active) },
                      { icon: Activity, label: 'Total Actions', value: `${selected.activities.length}` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="p-4 rounded-xl border"
                           style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="w-3.5 h-3.5" style={{ color: '#6366f1' }} />
                          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>{label}</p>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4" style={{ color: '#6366f1' }} />
                      <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
                        Activity Timeline
                      </h3>
                    </div>

                    {selected.activities.length === 0 ? (
                      <p className="text-sm text-center py-8" style={{ color: 'var(--text-faint)' }}>
                        No activities recorded yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {selected.activities.map(a => (
                          <div key={a.id} className="flex gap-4 p-4 rounded-xl border"
                               style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base"
                                 style={{ background: 'rgba(99,102,241,0.12)' }}>
                              {(actionLabel[a.action_type] || '⚡').split(' ')[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {(actionLabel[a.action_type] || '⚡ ' + a.action_type).split(' ').slice(1).join(' ')}
                              </p>
                              {a.data && Object.keys(a.data).length > 0 && (
                                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                                  {Object.entries(a.data).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                                </p>
                              )}
                              <p className="text-[10px] mt-1" style={{ color: 'var(--text-faint)' }}>
                                {fmt(a.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
