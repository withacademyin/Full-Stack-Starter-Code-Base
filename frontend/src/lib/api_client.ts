import { API_BASE_URL } from '@/constants/app_config';
import type { Api_error_response, Api_success_response } from '@/types/api_types';

type Request_options = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: HeadersInit;
};

export class Api_error extends Error {
  status_code: number;
  errors: unknown;

  constructor(message: string, status_code: number, errors: unknown = null) {
    super(message);
    this.name = 'Api_error';
    this.status_code = status_code;
    this.errors = errors;
  }
}

export const api_client = async <T>(
  path: string,
  options: Request_options = {},
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  const payload = (await response.json()) as Api_success_response<T> | Api_error_response;

  if (!response.ok || payload.success === false) {
    throw new Api_error(
      payload.message || 'Request failed',
      response.status,
      'errors' in payload ? payload.errors : null,
    );
  }

  return payload.data;
};
