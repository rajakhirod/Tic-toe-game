import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost } from '@/lib/blog';
import type { ReactNode } from 'react';

// Ensure this page is rendered on the server per request.
// This avoids 404s caused by stale static params in dev.
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const post = await getPost(resolved.slug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-black tracking-tighter">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="mt-8 mb-2 text-xl sm:text-2xl font-black tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-zinc-300 leading-relaxed">{children}</p>
  ),
  a: ({
    href,
    children,
  }: {
    href?: string;
    children: ReactNode;
  }) => (
    <Link
      href={href ?? '#'}
      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc pl-6 text-zinc-300 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal pl-6 text-zinc-300 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  const post = await getPost(resolved.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center gap-3 text-zinc-500 text-sm">
        <Link href="/blog" className="hover:text-zinc-200 underline underline-offset-4">
          Blogs
        </Link>
        <span>/</span>
        <span className="text-zinc-200">{post.slug}</span>
      </div>

      <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tighter">
        {post.frontmatter.title}
      </h1>

      {post.frontmatter.date ? (
        <p className="mt-2 text-zinc-500">
          {new Date(post.frontmatter.date).toLocaleDateString()}
        </p>
      ) : null}

      <div className="mt-8 space-y-4">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </div>
  );
}

