'use client';

import { useEffect, useState } from 'react';
import { fetch_health_status } from '@/services/health_service';
import type { Health_status } from '@/types/api_types';

type Health_state = {
  data: Health_status | null;
  error: string | null;
  is_loading: boolean;
};

/**
 * React requires custom hook function names to match /^use[A-Z]/
 * (file stays snake_case: use_health_status.ts).
 */
export const useHealthStatus = (): Health_state => {
  const [data, set_data] = useState<Health_status | null>(null);
  const [error, set_error] = useState<string | null>(null);
  const [is_loading, set_is_loading] = useState(true);

  useEffect(() => {
    let is_mounted = true;

    const load = async () => {
      try {
        const result = await fetch_health_status();
        if (is_mounted) {
          set_data(result);
          set_error(null);
        }
      } catch (err) {
        if (is_mounted) {
          set_error(err instanceof Error ? err.message : 'Failed to load health status');
        }
      } finally {
        if (is_mounted) {
          set_is_loading(false);
        }
      }
    };

    void load();

    return () => {
      is_mounted = false;
    };
  }, []);

  return { data, error, is_loading };
};
