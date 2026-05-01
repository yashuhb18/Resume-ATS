const configuredApiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || '';

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

export function apiUrl(path: string) {
  const normalizedPath = normalizePath(path);

  if (!configuredApiBase) {
    return normalizedPath;
  }

  return `${configuredApiBase}${normalizedPath}`;
}

export function healthUrl() {
  return apiUrl('/health');
}
