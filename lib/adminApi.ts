import { apiUrl } from '@/lib/apiClient';

export type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function adminRequest<T>(path: string, init?: RequestInit) {
  const url = apiUrl(path);
  const response = await fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const responseText = await response.text();
  let result: ApiResult<T>;

  try {
    result = responseText
      ? JSON.parse(responseText) as ApiResult<T>
      : { success: false, error: `Empty server response (${response.status}).` };
  } catch {
    throw new Error(`Invalid server response (${response.status}) from ${url}.`);
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Request failed.');
  }

  return result.data as T;
}
