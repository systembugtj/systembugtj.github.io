import type { CollectionEntry } from 'astro:content';

/**
 * Sort blog entries by date descending (newest first).
 * Use with getCollection('blog'): (await getCollection('blog')).sort(sortBlogByDateDesc)
 */
export function sortBlogByDateDesc(
  a: CollectionEntry<'blog'>,
  b: CollectionEntry<'blog'>
): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}
