import { api_client } from '@/lib/api_client';
import type { Health_status } from '@/types/api_types';

export const fetch_health_status = async (): Promise<Health_status> => {
  return api_client<Health_status>('/health');
};
