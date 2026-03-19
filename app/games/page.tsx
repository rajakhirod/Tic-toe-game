import Link from 'next/link';

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-black tracking-tighter">
        Games
      </h1>
      <p className="text-zinc-400 mt-3 max-w-2xl">
        Pick a game to play. Tic-Tac-Toe is included as a demo.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-xl sm:text-2xl font-black">Tic-Tac-Toe</h2>
          <p className="text-zinc-400 mt-2">
            Smooth UI and responsive layout for mobile devices.
          </p>
          <Link
            href="/games/tic-tac-toe"
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
}

