import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="space-y-4">
        <p className="text-emerald-400 text-xs sm:text-sm font-mono tracking-widest uppercase">
          Home
        </p>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic">
          Games + Blogs
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Play Tic-Tac-Toe and read the demo MDX blog posts with SSR and SEO.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/games/tic-tac-toe"
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Play Tic-Tac-Toe
          </Link>
          <Link
            href="/blog"
            className="rounded-2xl border border-zinc-800 px-5 py-3 font-bold text-zinc-100 hover:bg-zinc-900/50 transition-colors"
          >
            Browse Blogs
          </Link>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">
          Games
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h3 className="text-xl sm:text-2xl font-black">Tic-Tac-Toe</h3>
            <p className="text-zinc-400 mt-2">
              Quick rounds, responsive UI, and smooth animations.
            </p>
            <div className="mt-4">
              <Link
                href="/games/tic-tac-toe"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-100 px-4 py-2 font-bold text-zinc-950 hover:bg-white transition-colors"
              >
                Play now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">
          Blogs
        </h2>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h3 className="text-xl sm:text-2xl font-black">Demo Blog</h3>
          <p className="text-zinc-400 mt-2">
            Visit the SSR blog page: <code className="text-zinc-200">/blog/first-blog</code>
          </p>
          <div className="mt-4">
            <Link
              href="/blog/first-blog"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              Read the post
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

