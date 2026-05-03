/**
 * Nimma-MITra authentication utilities.
 * Stores JWT token in localStorage and provides helpers for auth state.
 */

const TOKEN_KEY = 'ece_hub_token';
const USER_KEY  = 'ece_hub_user';

export interface EceUser {
  usn:  string;
  name: string;
  email?: string;
  role:  'student' | 'hod';
}

// ── Storage helpers ────────────────────────────────────────────────────────

export function saveAuth(token: string, user: EceUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): EceUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as EceUser; } catch { return null; }
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;
  // Quick JWT expiry check (no signature verify — backend handles that)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// ── API helpers ────────────────────────────────────────────────────────────

export function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Log a student activity to the backend (fire-and-forget). */
export async function logActivity(actionType: string, data: Record<string, unknown> = {}) {
  const token = getToken();
  if (!token) return;
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    await fetch(`${apiBase}/api/activity/log`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action_type: actionType, data }),
    });
  } catch {
    // Never crash the app for a logging failure
  }
}
