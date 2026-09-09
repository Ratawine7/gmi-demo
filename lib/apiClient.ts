export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
