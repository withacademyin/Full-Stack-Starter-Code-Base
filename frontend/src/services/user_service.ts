import { api_client } from '@/lib/api_client';
import type { User } from '@/types/api_types';

export type Create_user_payload = {
  email: string;
  full_name: string;
};

export const fetch_users = async (): Promise<User[]> => {
  return api_client<User[]>('/users');
};

export const create_user = async (payload: Create_user_payload): Promise<User> => {
  return api_client<User>('/users', {
    method: 'POST',
    body: payload,
  });
};
