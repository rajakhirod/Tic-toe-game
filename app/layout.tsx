import type { ReactNode } from 'react';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="w-full border-t border-zinc-800/60">
            <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-zinc-500">
              Built with Next.js + MDX. Enjoy!
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

