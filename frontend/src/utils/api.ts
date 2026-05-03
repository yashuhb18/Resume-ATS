const configuredApiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || '';
const useDirectApi = process.env.NEXT_PUBLIC_USE_DIRECT_API === 'true';

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

export function apiUrl(path: string) {
  const normalizedPath = normalizePath(path);

  if (typeof window !== 'undefined' && !useDirectApi) {
    return normalizedPath;
  }

  if (!configuredApiBase) {
    return normalizedPath;
  }

  return `${configuredApiBase}${normalizedPath}`;
}

export function healthUrl() {
  return apiUrl('/api/health');
}

export async function isBackendReachable(timeoutMs = 8000) {
  const probePaths = ['/api/health', '/api/analyze'];

  for (const path of probePaths) {
    const ctrl = new AbortController();
    const timeout = window.setTimeout(() => ctrl.abort(), timeoutMs);

    try {
      const response = await fetch(apiUrl(path), { signal: ctrl.signal });
      if (response.ok || response.status === 405 || response.status === 422) {
        return true;
      }
    } catch {
      // Try the next probe path before reporting offline.
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return false;
}
