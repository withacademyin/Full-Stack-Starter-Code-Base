import { APP_NAME } from '@/constants/app_config';

export const Site_header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <p className="text-lg font-semibold tracking-tight text-slate-900">{APP_NAME}</p>
        <p className="text-sm text-slate-500">Next.js + Tailwind starter</p>
      </div>
    </header>
  );
};
