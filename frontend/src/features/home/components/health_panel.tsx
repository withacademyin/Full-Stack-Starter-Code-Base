'use client';

import { Status_badge } from '@/components/ui/status_badge';
import { useHealthStatus } from '@/hooks/use_health_status';
import { format_date } from '@/utils/format_date';

export const Health_panel = () => {
  const { data, error, is_loading } = useHealthStatus();

  if (is_loading) {
    return <p className="text-sm text-slate-500">Checking API health...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        <p className="font-medium">Could not reach the API</p>
        <p className="mt-1">{error}</p>
        <p className="mt-2 text-rose-600">
          Ensure the backend is running and `NEXT_PUBLIC_API_BASE_URL` is correct.
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const tone = data.status === 'ok' ? 'ok' : 'warn';

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">API health</h2>
        <Status_badge label={data.status} tone={tone} />
      </div>
      <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <div>
          <dt className="text-slate-400">Database</dt>
          <dd className="mt-1 font-medium text-slate-800">{data.database}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Uptime</dt>
          <dd className="mt-1 font-medium text-slate-800">{data.uptime_seconds}s</dd>
        </div>
        <div>
          <dt className="text-slate-400">Checked at</dt>
          <dd className="mt-1 font-medium text-slate-800">{format_date(data.timestamp)}</dd>
        </div>
      </dl>
    </div>
  );
};
