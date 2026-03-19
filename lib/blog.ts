import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

export type BlogFrontmatter = {
  title: string;
  description?: string;
  date?: string;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function isValidSlug(slug: string) {
  return /^[a-zA-Z0-9-]+$/.test(slug);
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const entries = await fs.readdir(BLOG_DIR);
  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'));

  const posts: BlogPostSummary[] = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(BLOG_DIR, filename);
      const raw = await fs.readFile(fullPath, 'utf8');
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        description: data.description ? String(data.description) : undefined,
        date: data.date ? String(data.date) : undefined,
      };
    }),
  );

  // Sort by date descending (fallback to filename order).
  posts.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    if (ad !== bd) return bd - ad;
    return a.slug.localeCompare(b.slug);
  });

  return posts;
}

export async function getPost(slug: string): Promise<BlogPost> {
  if (!isValidSlug(slug)) notFound();

  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(fullPath, 'utf8');
  } catch {
    notFound();
  }

  const parsed = matter(raw);
  const title = String(parsed.data.title ?? slug);
  const description = parsed.data.description
    ? String(parsed.data.description)
    : undefined;
  const date = parsed.data.date ? String(parsed.data.date) : undefined;

  return {
    slug,
    frontmatter: { title, description, date },
    content: parsed.content,
  };
}

