import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-zinc-800/60 bg-zinc-950/40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-black tracking-tighter italic text-emerald-500"
        >
          Tic-Tac-Toe
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/blog"
            className="rounded-xl px-3 py-2 text-sm font-bold text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-50 transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/games"
            className="rounded-xl px-3 py-2 text-sm font-bold text-zinc-200 hover:bg-zinc-900/80 hover:text-zinc-50 transition-colors"
          >
            Games
          </Link>
        </nav>
      </div>
    </header>
  );
}

