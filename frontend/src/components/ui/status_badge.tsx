type Status_badge_props = {
  label: string;
  tone?: 'ok' | 'warn' | 'error' | 'neutral';
};

const tone_class_map: Record<NonNullable<Status_badge_props['tone']>, string> = {
  ok: 'bg-emerald-100 text-emerald-800',
  warn: 'bg-amber-100 text-amber-800',
  error: 'bg-rose-100 text-rose-800',
  neutral: 'bg-slate-100 text-slate-700',
};

export const Status_badge = ({ label, tone = 'neutral' }: Status_badge_props) => {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${tone_class_map[tone]}`}
    >
      {label}
    </span>
  );
};
