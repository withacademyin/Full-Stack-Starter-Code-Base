import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Site_header } from '@/components/layout/site_header';
import { APP_NAME } from '@/constants/app_config';
import './globals.css';

const geist_sans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geist_mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Next.js TypeScript Tailwind frontend for the full-stack starter',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geist_sans.variable} ${geist_mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <Site_header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
