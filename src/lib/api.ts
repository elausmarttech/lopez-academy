/**
 * API client for Rails backend. Token in localStorage; 401 clears token and redirects to login.
 */

const TOKEN_KEY = 'lopez_academy_jwt';

const DEFAULT_API_URL = 'https://lopez-university-db.onrender.com';

function getBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL;
  if (!url || typeof url !== 'string') {
    return DEFAULT_API_URL;
  }
  return url.replace(/\/$/, '');
}

export function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown
  ) {
    super(`API error ${status}`);
    this.name = 'ApiError';
  }
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  skipAuthRedirect?: boolean;
  skipForbiddenRedirect?: boolean;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, skipAuthRedirect = false, skipForbiddenRedirect = false } = options;
  const base = getBaseUrl();
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;

  const h: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  if (body !== undefined && body !== null && method !== 'GET') {
    h['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    h['Authorization'] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method,
    headers: h,
  };
  if (body !== undefined && body !== null && method !== 'GET') {
    init.body = JSON.stringify(body);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  const res = await fetch(url, { ...init, signal: controller.signal });
  clearTimeout(timeoutId);

  if (res.status === 401 && !skipAuthRedirect) {
    clearToken();
    window.location.href = '/';
    throw new ApiError(401, { error: 'Unauthorized' });
  }

  const contentType = res.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  let responseBody: unknown = null;
  if (isJson && res.body) {
    try {
      responseBody = await res.json();
    } catch {
      responseBody = null;
    }
  }

  if (!res.ok) {
    if (res.status === 403 && path.startsWith('/admin') && !skipForbiddenRedirect) {
      window.location.href = '/admin/forbidden';
      throw new ApiError(403, { error: 'Forbidden' });
    }
    throw new ApiError(res.status, responseBody);
  }

  return responseBody as T;
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' });
}

export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body });
}

export function patch<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: 'PATCH', body });
}

export function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' });
}
