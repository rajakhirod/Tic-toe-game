import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Read demo MDX blog posts.',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const resolved = await searchParams;
  const q = (resolved?.q ?? '').trim().toLowerCase();
  const posts = await getAllPosts();

  const filtered = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q),
      )
    : posts;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-black tracking-tighter">
        Blogs
      </h1>
      <p className="text-zinc-400 mt-2 max-w-2xl">
        Each post is stored as MDX and rendered on the server for SEO.
      </p>

      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
        <form method="get" className="flex flex-col sm:flex-row gap-3">
          <input
            name="q"
            defaultValue={resolved?.q ?? ''}
            placeholder="Search blogs..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
          <button
            type="submit"
            className="sm:w-auto w-full rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {filtered.length === 0 ? (
          <p className="text-zinc-400">No posts found.</p>
        ) : (
          filtered.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-5"
            >
              <h2 className="text-xl sm:text-2xl font-black">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-zinc-400 mt-2">
                {post.description ?? 'Read the full post.'}
              </p>
              <div className="mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-800 px-4 py-2 font-bold text-zinc-100 hover:bg-zinc-900/60 transition-colors"
                >
                  Read
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

