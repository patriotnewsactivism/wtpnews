import postsData from "./posts.json";
import pagesData from "./pages.json";

export type ContentItem = {
  slug: string;
  url: string;
  title: string;
  content: string;
  excerpt: string;
  date?: string | null;
  author?: string | null;
  categories: string[];
  tags: string[];
};

export type Post = ContentItem & {
  publishedAt?: string | null;
};

export type Page = ContentItem;

const toIsoString = (value?: string | null): string | null => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed.toISOString();
};

const normalizeItem = <T extends ContentItem>(item: T): T => ({
  ...item,
  date: item.date ?? null,
  author: item.author ?? null,
  categories: item.categories ?? [],
  tags: item.tags ?? [],
});

const posts: Post[] = (postsData as ContentItem[]).map((item) => {
  const normalized = normalizeItem(item);
  return {
    ...normalized,
    publishedAt: toIsoString(normalized.date),
  };
});

const pages: Page[] = (pagesData as ContentItem[]).map((item) => normalizeItem(item));

const bySlug = <T extends ContentItem>(collection: T[]): Map<string, T> => {
  return new Map(collection.map((item) => [item.slug, item]));
};

const postLookup = bySlug(posts);
const pageLookup = bySlug(pages);

export const getPosts = (): Post[] =>
  [...posts].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : -Infinity;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : -Infinity;
    return bTime - aTime;
  });

export const getLatestPosts = (count: number): Post[] => getPosts().slice(0, count);

export const getPostBySlug = (slug: string): Post | undefined => postLookup.get(slug);

export const getPages = (): Page[] => [...pages];

export const getPageBySlug = (slug: string): Page | undefined => pageLookup.get(slug);

export const pageSlugs = (): string[] => pages.map((page) => page.slug);
