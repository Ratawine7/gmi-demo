import { apiUrl } from '@/lib/apiClient';

export type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function adminRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(apiUrl(path), {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const result = (await response.json().catch(() => ({ success: false, error: 'Invalid server response.' }))) as ApiResult<T>;
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Request failed.');
  }

  return result.data as T;
}
