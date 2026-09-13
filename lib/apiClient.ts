const API_BASE_PATH = '/api/v1';

export const API_BASE_URL =
  typeof window !== 'undefined'
    ? API_BASE_PATH
    : process.env.NEXT_PUBLIC_API_URL || `http://localhost:${process.env.PORT || 9000}${API_BASE_PATH}`;

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
